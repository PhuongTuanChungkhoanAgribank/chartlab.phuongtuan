import baseWorker from "./worker.js";

const ENGINE_VERSION = "cf-ai-v2.1-advisor-guardrails";
const LINKED_BLOCKS = ["candlestick", "priceAction", "chartPattern", "volume", "wyckoff"];

export default {
  async fetch(request, env, ctx) {
    const response = await baseWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    const contentType = response.headers.get("Content-Type") || "";

    if (!contentType.includes("application/json")) return response;

    let payload;
    try {
      payload = await response.clone().json();
    } catch {
      return response;
    }

    if (request.method === "GET" && url.pathname === "/health" && payload?.ok) {
      payload.engineVersion = ENGINE_VERSION;
      payload.guardrails = ["pattern-confidence", "key-levels-role", "advisor-copy"];
      return rewriteJson(response, payload);
    }

    if (request.method === "POST" && url.pathname === "/analyze" && payload?.ok && payload?.result) {
      hardenAdvisorOutput(payload.result);
      payload.engineVersion = ENGINE_VERSION;
      return rewriteJson(response, payload);
    }

    return response;
  }
};

function hardenAdvisorOutput(result) {
  enforcePatternConfidence(result);
  enforceKeyLevelsRole(result);
  sanitizeAdvisorSnapshot(result);
  capOverconfidence(result);
}

function enforcePatternConfidence(result) {
  for (const key of LINKED_BLOCKS) {
    const block = result?.[key];
    if (!block) continue;
    const text = `${block.value || ""} ${block.note || ""}`;
    if (looksLikeNoPattern(text)) {
      block.patternId = "";
      block.confidence = "Insufficient";
    }
  }
}

function enforceKeyLevelsRole(result) {
  const block = result?.keyLevels;
  if (!block) return;
  const text = `${block.value || ""} ${block.note || ""}`;
  const mentionsIndicator = /\bma\b|moving average|bollinger|indicator|chỉ báo/i.test(text);
  const mentionsActualLevel = /hỗ trợ|kháng cự|support|resistance|đỉnh|đáy|vùng giá|mốc giá|swing|\b\d{3,5}(?:[.,]\d+)?\b/i.test(text);

  if (mentionsIndicator && !mentionsActualLevel) {
    block.value = "Chưa chốt được vùng hỗ trợ/kháng cự đủ tin cậy từ ảnh";
    block.note = "Ảnh có chỉ báo MA/Bollinger nhưng các chỉ báo này không thay thế Key Levels. Chỉ chốt vùng giá khi thấy mốc hoặc swing hỗ trợ/kháng cự đủ rõ.";
    block.confidence = "Low";
  }
}

function sanitizeAdvisorSnapshot(result) {
  const view = result?.advisorView;
  if (!view) return;

  view.watch = replacePlaceholder(view.watch, "Theo dõi phản ứng giá tại vùng hỗ trợ/kháng cự gần nhất và sức mạnh của các nến kế tiếp.");
  view.confirmation = replacePlaceholder(view.confirmation, "Cần giá tạo phản ứng xác nhận rõ hơn: giữ được vùng hỗ trợ gần nhất hoặc vượt lại vùng cản gần nhất với follow-through.");
  view.invalidation = replacePlaceholder(view.invalidation, "Nhận định suy yếu nếu giá phá cấu trúc gần nhất theo hướng ngược lại và không nhanh chóng lấy lại vùng vừa mất.");
}

function capOverconfidence(result) {
  const noNamedPattern = LINKED_BLOCKS.every(key => !result?.[key]?.patternId);
  const keyLevelsWeak = ["Low", "Insufficient"].includes(result?.keyLevels?.confidence);

  if (noNamedPattern && result?.advisorView?.confidence === "High") {
    result.advisorView.confidence = "Moderate";
  }
  if (keyLevelsWeak && result?.marketStructure?.confidence === "High") {
    result.marketStructure.confidence = "Moderate";
  }
  if (keyLevelsWeak && result?.advisorView?.confidence === "High") {
    result.advisorView.confidence = "Moderate";
  }
}

function looksLikeNoPattern(text) {
  return /chưa\s+(có|thấy|đủ).*mẫu hình|không\s+(có|thấy).*mẫu hình|no clear pattern|insufficient.*pattern/i.test(String(text || ""));
}

function replacePlaceholder(value, fallback) {
  const text = String(value || "").trim();
  if (!text) return fallback;
  if (/^(partial|yes|no|n\/a|na|unknown|tbd|none)$/i.test(text)) return fallback;
  return text;
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
