import baseWorker from "./worker-v2_1.js";

const ENGINE_VERSION = "cf-ai-v2.2-skills";
const DEFAULT_JSON_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const SKILLS = {
  overview: { label: "Phân tích toàn diện", directive: "Tổng hợp toàn bộ các lớp phân tích, nhưng chỉ nêu những gì có bằng chứng đủ rõ." },
  quick: { label: "Đọc nhanh chart", directive: "Chọn 2–3 điểm kỹ thuật quan trọng nhất trên chart; ưu tiên ngắn gọn, dễ dùng ngay." },
  structure: { label: "Cấu trúc giá", directive: "Chỉ tập trung cấu trúc đỉnh/đáy, xu hướng, thay đổi cấu trúc và vị trí giá hiện tại. Không sa đà vào mẫu hình nến." },
  levels: { label: "Hỗ trợ & kháng cự", directive: "Tập trung các vùng hỗ trợ/kháng cự, swing high/low và phản ứng giá. Chỉ nêu mức số khi dữ liệu gốc thực sự đọc được; MA/Bollinger không được thay thế vùng giá." },
  pattern: { label: "Mẫu hình kỹ thuật", directive: "Tập trung Candlestick, Price Action và Classical Chart Pattern. Bắt buộc đặt mẫu hình trong bối cảnh xu hướng/vùng giá; không ép gọi tên khi hình học chưa đủ rõ." },
  volume: { label: "Giá & khối lượng", directive: "Tập trung quan hệ giá–khối lượng: xác nhận, phân kỳ, co hẹp/mở rộng và nỗ lực so với kết quả. Nếu ảnh không có volume thì phải nói không đủ dữ liệu." },
  wyckoff: { label: "Wyckoff", directive: "Tập trung prior trend, trading range, phase/event và quan hệ giá–khối lượng. Không gán phase/event nếu bằng chứng chưa đủ." },
  breakout: { label: "Kiểm tra Breakout", directive: "Tập trung vùng phá vỡ, trạng thái đóng cửa/giữ trên dưới mức phá, khối lượng xác nhận, retest và rủi ro false breakout. Không tự coi chạm cản là breakout." }
};

const FOCUS_SCHEMA = {
  type: "object",
  properties: {
    headline: { type: "string" },
    watch: { type: "string" },
    confirmation: { type: "string" },
    invalidation: { type: "string" },
    conclusion: { type: "string" },
    clientShort: { type: "string" },
    clientText: { type: "string" }
  },
  required: ["headline", "watch", "confirmation", "invalidation", "conclusion", "clientShort", "clientText"],
  additionalProperties: false
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let requestMeta = { skill: "overview", customRequest: "" };

    if (request.method === "POST" && url.pathname === "/analyze") {
      try {
        const body = await request.clone().json();
        requestMeta.skill = normalizeSkill(body?.skill);
        requestMeta.customRequest = sanitizeText(body?.customRequest, 300);
      } catch {}
    }

    const response = await baseWorker.fetch(request, env, ctx);
    const contentType = response.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) return response;

    let payload;
    try { payload = await response.clone().json(); }
    catch { return response; }

    if (request.method === "GET" && url.pathname === "/health" && payload?.ok) {
      payload.engineVersion = ENGINE_VERSION;
      payload.skills = Object.entries(SKILLS).map(([id, x]) => ({ id, label: x.label }));
      return rewriteJson(response, payload);
    }

    if (request.method === "POST" && url.pathname === "/analyze" && payload?.ok && payload?.result) {
      const skill = requestMeta.skill;
      const skillConfig = SKILLS[skill];
      payload.result.analysisMeta = {
        skill,
        skillLabel: skillConfig.label,
        customRequest: requestMeta.customRequest,
        analyzedAt: new Date().toISOString()
      };

      // Only spend the extra text-only pass when a focused skill or custom request is selected.
      if ((skill !== "overview" || requestMeta.customRequest) && env.AI) {
        try {
          const focused = await refineForSkill(env, payload.result, skill, requestMeta.customRequest);
          if (focused) applyFocusedCopy(payload.result, focused);
        } catch {
          // Keep the valid base analysis if the refinement pass fails or quota is unavailable.
        }
      }

      payload.engineVersion = ENGINE_VERSION;
      return rewriteJson(response, payload);
    }

    return response;
  }
};

async function refineForSkill(env, result, skill, customRequest) {
  const model = env.JSON_MODEL || DEFAULT_JSON_MODEL;
  const source = compactResult(result);
  const system = `Bạn là lớp biên tập cuối của ChartLab. Bạn KHÔNG nhìn ảnh gốc; chỉ được dùng dữ liệu phân tích đã có trong BASE ANALYSIS.\n\nMục tiêu: viết lại phần tóm tắt theo đúng KỸ NĂNG người dùng chọn. Không bịa thêm mức giá, mẫu hình hay dữ liệu. Không đưa khuyến nghị mua/bán. Viết hoàn toàn bằng tiếng Việt, chỉ giữ tên riêng/mẫu hình tiếng Anh khi cần.\n\nKỸ NĂNG: ${SKILLS[skill].label}\nPHẠM VI: ${SKILLS[skill].directive}\n\nNếu BASE ANALYSIS thiếu dữ liệu cho kỹ năng đã chọn, phải nói rõ không đủ dữ liệu thay vì suy đoán. clientShort khoảng 45–90 từ; clientText khoảng 90–150 từ.`;
  const user = `BASE ANALYSIS:\n${JSON.stringify(source)}\n\nYÊU CẦU BỔ SUNG CỦA NGƯỜI DÙNG:\n${customRequest || "Không có."}\n\nHãy trả JSON đúng schema.`;
  const raw = await env.AI.run(model, {
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    response_format: { type: "json_schema", json_schema: FOCUS_SCHEMA },
    max_tokens: 1100,
    temperature: 0.05
  });
  return parseJson(raw);
}

function compactResult(r) {
  return {
    symbol: r.symbol,
    timeframe: r.timeframe,
    analysisStatus: r.analysisStatus,
    imageQuality: r.imageQuality,
    marketStructure: r.marketStructure,
    keyLevels: r.keyLevels,
    candlestick: r.candlestick,
    priceAction: r.priceAction,
    chartPattern: r.chartPattern,
    volume: r.volume,
    wyckoff: r.wyckoff,
    advisorView: r.advisorView,
    conclusion: r.conclusion,
    warnings: r.warnings
  };
}

function applyFocusedCopy(result, focused) {
  const view = result.advisorView || (result.advisorView = {});
  view.headline = clean(focused.headline, view.headline);
  view.watch = clean(focused.watch, view.watch);
  view.confirmation = clean(focused.confirmation, view.confirmation);
  view.invalidation = clean(focused.invalidation, view.invalidation);
  result.conclusion = clean(focused.conclusion, result.conclusion);
  result.clientShort = clean(focused.clientShort, result.clientShort);
  result.clientText = clean(focused.clientText, result.clientText);
}

function normalizeSkill(value) {
  const id = String(value || "overview").trim().toLowerCase();
  return SKILLS[id] ? id : "overview";
}

function sanitizeText(value, max = 300) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function clean(value, fallback = "") {
  const text = sanitizeText(value, 1200);
  return text || fallback || "";
}

function parseJson(raw) {
  if (raw && typeof raw === "object") {
    if (raw.response && typeof raw.response === "object") return raw.response;
    if (raw.result && typeof raw.result === "object") return raw.result;
    if (raw.response && typeof raw.response === "string") return JSON.parse(stripFence(raw.response));
  }
  const text = typeof raw === "string" ? raw : raw?.response || raw?.text || raw?.output_text || "";
  return JSON.parse(stripFence(String(text)));
}

function stripFence(text) {
  return String(text || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}

function rewriteJson(response, payload) {
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(payload), {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
