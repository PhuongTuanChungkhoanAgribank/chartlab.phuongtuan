import { RULEBOOK } from "./rulebook.js";
import { PRICE_ACTION_RULEBOOK } from "./price-action-rulebook.js";
import { CHART_PATTERN_RULEBOOK } from "./chart-pattern-rulebook.js";
import { VOLUME_RULEBOOK } from "./volume-rulebook.js";
import { WYCKOFF_RULEBOOK } from "./wyckoff-rulebook.js";

const DEFAULT_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";
const DEFAULT_MAX_DATA_URL_CHARS = 8_000_000;
const DEFAULT_AI_TIMEOUT_MS = 60_000;

const CONFIDENCE = ["High", "Moderate", "Low", "Insufficient"];
const ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    symbol: { type: "string" },
    timeframe: { type: "string" },
    analysisStatus: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["Ready", "Limited", "NeedsBetterImage"] },
        message: { type: "string" },
        missing: { type: "array", items: { type: "string" } }
      },
      required: ["status", "message", "missing"],
      additionalProperties: false
    },
    imageQuality: {
      type: "object",
      properties: {
        grade: { type: "string", enum: ["Good", "Usable", "Poor"] },
        note: { type: "string" },
        candlesticks: { type: "boolean" },
        priceAxis: { type: "boolean" },
        volume: { type: "boolean" },
        indicators: { type: "boolean" },
        enoughHistory: { type: "boolean" }
      },
      required: ["grade", "note", "candlesticks", "priceAxis", "volume", "indicators", "enoughHistory"],
      additionalProperties: false
    },
    advisorView: {
      type: "object",
      properties: {
        bias: { type: "string", enum: ["Positive", "Neutral", "Cautious", "Insufficient"] },
        confidence: { type: "string", enum: CONFIDENCE },
        headline: { type: "string" },
        watch: { type: "string" },
        confirmation: { type: "string" },
        invalidation: { type: "string" }
      },
      required: ["bias", "confidence", "headline", "watch", "confirmation", "invalidation"],
      additionalProperties: false
    },
    marketStructure: analysisBlockSchema(),
    keyLevels: analysisBlockSchema(),
    candlestick: linkedPatternBlockSchema(),
    priceAction: linkedPatternBlockSchema(),
    chartPattern: linkedPatternBlockSchema(),
    volume: linkedPatternBlockSchema(),
    wyckoff: linkedPatternBlockSchema(),
    conclusion: { type: "string" },
    clientShort: { type: "string" },
    clientText: { type: "string" },
    warnings: { type: "array", items: { type: "string" } }
  },
  required: ["symbol", "timeframe", "analysisStatus", "imageQuality", "advisorView", "marketStructure", "keyLevels", "candlestick", "priceAction", "chartPattern", "volume", "wyckoff", "conclusion", "clientShort", "clientText", "warnings"],
  additionalProperties: false
};

function linkedPatternBlockSchema() {
  return {
    type: "object",
    properties: {
      value: { type: "string" },
      note: { type: "string" },
      confidence: { type: "string", enum: CONFIDENCE },
      patternId: { type: "string" }
    },
    required: ["value", "note", "confidence", "patternId"],
    additionalProperties: false
  };
}

function analysisBlockSchema() {
  return {
    type: "object",
    properties: {
      value: { type: "string" },
      note: { type: "string" },
      confidence: { type: "string", enum: CONFIDENCE }
    },
    required: ["value", "note", "confidence"],
    additionalProperties: false
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGINS || "*");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "chartlab-ai", provider: "cloudflare-workers-ai", model: env.WORKERS_AI_MODEL || DEFAULT_MODEL, freeTier: true }, 200, cors);
    }

    if (request.method !== "POST" || url.pathname !== "/analyze") {
      return json({ error: "Not found" }, 404, cors);
    }

    if (!originAllowed(origin, env.ALLOWED_ORIGINS || "*")) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }

    if (!env.AI) {
      return json({ error: "Backend chưa có Workers AI binding.", code: "AI_BINDING_MISSING" }, 503, cors);
    }

    if (env.AI_ACCESS_CODE) {
      const supplied = request.headers.get("X-ChartLab-Access") || "";
      if (!constantTimeEqual(supplied, env.AI_ACCESS_CODE)) {
        return json({ error: "Cần mã truy cập AI.", code: "ACCESS_REQUIRED" }, 401, cors);
      }
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "JSON body không hợp lệ." }, 400, cors);
    }

    const imageDataUrl = String(body.imageDataUrl || "");
    const symbol = sanitize(body.symbol || "CỔ PHIẾU", 24).toUpperCase();
    const timeframe = sanitize(body.timeframe || "Daily", 24);

    if (!/^data:image\/(png|jpeg|webp);base64,/i.test(imageDataUrl)) {
      return json({ error: "Ảnh phải là PNG, JPG hoặc WEBP dạng data URL." }, 400, cors);
    }
    const maxImageChars = positiveInt(env.MAX_IMAGE_CHARS, DEFAULT_MAX_DATA_URL_CHARS);
    if (imageDataUrl.length > maxImageChars) {
      return json({ error: "Ảnh quá lớn. Hãy dùng ảnh nhỏ hơn hoặc để frontend nén ảnh trước khi gửi." }, 413, cors);
    }

    const model = env.WORKERS_AI_MODEL || DEFAULT_MODEL;
    const prompt = buildPrompt(symbol, timeframe);
    const timeoutMs = positiveInt(env.AI_TIMEOUT_MS, DEFAULT_AI_TIMEOUT_MS);

    let raw;
    try {
      raw = await withTimeout(
        env.AI.run(model, {
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt }
          ],
          image: imageDataUrl,
          guided_json: ANALYSIS_SCHEMA,
          max_tokens: 2200,
          temperature: 0.1
        }),
        timeoutMs
      );
    } catch (error) {
      const mapped = mapWorkersAIError(error);
      return json(mapped.body, mapped.status, cors);
    }

    try {
      const parsed = parseWorkersAIJson(raw);
      const validIds = new Set(RULEBOOK.map(p => p.id));
      const validPriceActionIds = new Set(PRICE_ACTION_RULEBOOK.map(p => p.id));
      const validChartPatternIds = new Set(CHART_PATTERN_RULEBOOK.map(p => p.id));
      const validVolumeIds = new Set(VOLUME_RULEBOOK.map(p => p.id));
      const validWyckoffIds = new Set(WYCKOFF_RULEBOOK.map(p => p.id));
      if (!validIds.has(parsed?.candlestick?.patternId)) parsed.candlestick.patternId = "";
      if (!validPriceActionIds.has(parsed?.priceAction?.patternId)) parsed.priceAction.patternId = "";
      if (!validChartPatternIds.has(parsed?.chartPattern?.patternId)) parsed.chartPattern.patternId = "";
      if (!validVolumeIds.has(parsed?.volume?.patternId)) parsed.volume.patternId = "";
      if (!validWyckoffIds.has(parsed?.wyckoff?.patternId)) parsed.wyckoff.patternId = "";
      enforceQualityGate(parsed);
      return json({ ok: true, result: parsed, provider: "cloudflare-workers-ai", model, usage: raw?.usage || null }, 200, cors);
    } catch (error) {
      return json({ error: "AI trả kết quả không đọc được.", detail: String(error?.message || error) }, 502, cors);
    }
  }
};

function enforceQualityGate(parsed) {
  const status = parsed?.analysisStatus?.status;
  const q = parsed?.imageQuality || {};
  const mustReject = status === "NeedsBetterImage" || q.grade === "Poor" || q.candlesticks === false;
  if (mustReject) {
    parsed.analysisStatus = {
      status: "NeedsBetterImage",
      message: parsed?.analysisStatus?.message || "Ảnh chưa đủ rõ để đưa ra nhận định kỹ thuật đáng tin cậy.",
      missing: Array.isArray(parsed?.analysisStatus?.missing) ? parsed.analysisStatus.missing : []
    };
    for (const key of ["candlestick", "priceAction", "chartPattern", "volume", "wyckoff"]) {
      if (parsed[key]) {
        parsed[key].patternId = "";
        parsed[key].confidence = "Insufficient";
      }
    }
    for (const key of ["marketStructure", "keyLevels"]) {
      if (parsed[key]) parsed[key].confidence = "Insufficient";
    }
    if (parsed.advisorView) {
      parsed.advisorView.bias = "Insufficient";
      parsed.advisorView.confidence = "Insufficient";
      parsed.advisorView.headline = "Ảnh chưa đủ rõ để đưa ra góc nhìn kỹ thuật";
      parsed.advisorView.watch = "Chụp lại chart với vùng nến rộng hơn và rõ trục giá.";
      parsed.advisorView.confirmation = "Phân tích lại sau khi ảnh đạt quality gate.";
      parsed.advisorView.invalidation = "Không áp dụng nhận định kỹ thuật từ ảnh hiện tại.";
    }
    parsed.conclusion = "Ảnh hiện tại chưa đủ rõ hoặc thiếu context để tạo nhận định kỹ thuật đáng tin cậy.";
    parsed.clientShort = "Ảnh chart hiện tại chưa đủ rõ để mình đưa ra nhận định kỹ thuật đáng tin cậy. Anh/chị vui lòng gửi lại ảnh có vùng nến rộng hơn, nhìn rõ trục giá và khối lượng (nếu có), mình sẽ kiểm tra lại ngay.";
    parsed.clientText = parsed.clientShort;
  }
  if (q.volume === false && parsed.volume) {
    parsed.volume.patternId = "";
    parsed.volume.confidence = "Insufficient";
  }
  if (q.enoughHistory === false) {
    for (const key of ["chartPattern", "wyckoff"]) {
      if (parsed[key]) {
        parsed[key].patternId = "";
        parsed[key].confidence = "Insufficient";
      }
    }
  }
}

const SYSTEM_PROMPT = `Bạn là ChartLab Chart Analyzer, trợ lý đọc BIỂU ĐỒ kỹ thuật thuần chart.

NGUYÊN TẮC BẮT BUỘC:
- Chỉ dùng những gì nhìn thấy trong screenshot và symbol/timeframe người dùng cung cấp.
- Không nói về vĩ mô, tin tức, cơ bản doanh nghiệp, định giá hay catalyst ngoài chart.
- Không bịa giá, support/resistance hoặc chỉ báo nếu nhãn/trục không đọc rõ.
- Bước 1 luôn là QUALITY GATE: đánh giá ảnh có đủ để dùng cho tư vấn viên hay không.
- analysisStatus = "Ready" chỉ khi candle geometry đọc rõ và chart đủ context; "Limited" khi vẫn phân tích được nhưng thiếu một phần như trục giá/volume; "NeedsBetterImage" khi ảnh mờ, crop quá sát, không đọc được nến hoặc thiếu context nghiêm trọng.
- Khi analysisStatus = "NeedsBetterImage": không gọi tên pattern, mọi patternId để rỗng, confidence = "Insufficient", và bản gửi khách hàng chỉ nên đề nghị chụp lại ảnh rõ hơn.
- Nếu dữ liệu không đủ, dùng confidence = "Insufficient" và nói rõ thiếu gì.
- Pattern nến phải đặt trong context. Không viết "thấy Hammer = mua".
- Price Action phải phân biệt compression, expansion, rejection và false breakout. Inside Bar/Outside Bar đọc theo full high-low range; Engulfing đọc theo real body.
- Không gọi Fakey nếu chưa thấy rõ Inside Bar setup + false breakout. Không gọi Outside Key Reversal chỉ vì thấy Outside Bar.
- Phân biệt candlestick pattern, price-action setup và classical chart pattern.
- Classical chart pattern chỉ được gọi tên khi multi-swing geometry đủ rõ. Với reversal patterns, phải xét prior trend; với Double/Triple Top-Bottom và Head & Shoulders phải yêu cầu neckline/support-resistance break để gọi pattern hoàn tất.
- Với Triangle/Rectangle, không đoán hướng breakout nếu source pattern là neutral. Flag/Pennant chỉ được gọi khi có prior sharp move/flagpole rõ.
- Volume là mức độ participation/effort, không tự mang hướng bullish/bearish. Chỉ đọc volume khi panel volume đủ rõ.
- Khi đánh giá trend: ưu tiên logic price move theo xu hướng đi cùng volume mở rộng, còn retracement đi với volume co lại. New high/new low trên volume suy giảm chỉ là non-confirmation/cảnh báo, không tự là reversal.
- Breakout/breakdown có volume expansion được xem là xác nhận mạnh hơn; low-volume breakout là conviction thấp hơn chứ không tự đồng nghĩa false breakout.
- Với Effort vs Result: high volume + wide price result có thể là participation mạnh; high volume + narrow result là cảnh báo absorption/opposition và phải đọc context + follow-through.
- Không gọi Volume Climax chỉ vì thấy một volume spike. Cần trend extreme và phản ứng giá/follow-through phù hợp.
- Wyckoff chỉ được gọi tên phase/schematic/event khi chart đủ dài và price-volume context đủ rõ; nếu không thì ghi chưa đủ dữ liệu. Spring và UTAD đều không bắt buộc; không ép mọi trading range vào schematic.
- Bản gửi khách hàng phải ngắn, chuyên nghiệp, trung tính; không dùng ngôn ngữ đảm bảo lợi nhuận và không đưa lệnh mua/bán trực tiếp.
- advisorView là snapshot dành cho tư vấn viên: Bias → Điểm cần theo dõi → Điều kiện xác nhận → Điều kiện làm nhận định suy yếu. Bias chỉ là góc nhìn kỹ thuật, KHÔNG phải khuyến nghị giao dịch.
- clientShort viết 45–90 từ, ưu tiên 3 ý: trạng thái hiện tại, điều kiện tích cực hơn, điều kiện cần thận trọng. clientText viết 90–150 từ và có thể copy gửi khách hàng.
- Kết luận nên theo cấu trúc: xu hướng/cấu trúc → vùng hoặc tín hiệu đáng chú ý → điều kiện xác nhận → điều kiện làm nhận định suy yếu.
- Confidence là độ tự tin của NHẬN DIỆN từ ảnh, không phải xác suất thắng giao dịch.

CANDLESTICK RULEBOOK CHARTLAB (nguồn production):
${JSON.stringify(RULEBOOK)}

PRICE ACTION RULEBOOK CHARTLAB (Level 06):
${JSON.stringify(PRICE_ACTION_RULEBOOK)}

CLASSICAL CHART PATTERN RULEBOOK CHARTLAB (Level 07):
${JSON.stringify(CHART_PATTERN_RULEBOOK)}

PRICE & VOLUME RULEBOOK CHARTLAB (Level 08):
${JSON.stringify(VOLUME_RULEBOOK)}

WYCKOFF RULEBOOK CHARTLAB (Level 09):
${JSON.stringify(WYCKOFF_RULEBOOK)}
`;

function buildPrompt(symbol, timeframe) {
  return `Phân tích screenshot chart này cho ${symbol}, timeframe do người dùng chọn: ${timeframe}.
Trả đúng JSON schema. Với candlestick.patternId chỉ dùng id có trong candlestick rulebook. Với priceAction.patternId chỉ dùng id có trong Price Action rulebook. Với chartPattern.patternId chỉ dùng id có trong Classical Chart Pattern rulebook. Với volume.patternId chỉ dùng id có trong Price & Volume rulebook và phải để chuỗi rỗng nếu imageQuality.volume = false hoặc không đủ bằng chứng. Với wyckoff.patternId chỉ dùng id có trong Wyckoff rulebook; nếu chart không đủ prior trend + trading range + price-volume context thì patternId phải để chuỗi rỗng và confidence = "Insufficient". Nếu không đủ bằng chứng hãy để chuỗi rỗng.
Trong keyLevels, nếu đọc được mức giá thì nêu số; nếu không đọc rõ, mô tả tương đối như "đỉnh gần nhất" hoặc "vùng hỗ trợ gần nhất" thay vì đoán.
Nếu ảnh chỉ đủ một phần, analysisStatus phải là "Limited" và liệt kê thiếu gì trong analysisStatus.missing. Nếu candle geometry không đủ rõ, dùng "NeedsBetterImage".
advisorView phải súc tích, tránh thuật ngữ khó nếu không cần thiết. clientShort 45–90 từ; clientText 90–150 từ. Cả hai viết tiếng Việt và không chứa lệnh mua/bán trực tiếp.`;
}

function parseWorkersAIJson(response) {
  const candidate = response?.response ?? response?.result ?? response;
  if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
    if (candidate.symbol || candidate.analysisStatus || candidate.advisorView) return candidate;
  }
  let text = typeof candidate === "string" ? candidate : "";
  if (!text && typeof response?.choices?.[0]?.message?.content === "string") {
    text = response.choices[0].message.content;
  }
  if (!text) throw new Error("Workers AI không trả nội dung JSON.");
  text = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(text);
}

function withTimeout(promise, timeoutMs) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const error = new Error("Workers AI timeout");
      error.code = "AI_TIMEOUT";
      reject(error);
    }, timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function mapWorkersAIError(error) {
  const message = String(error?.message || error || "Workers AI error");
  const lowered = message.toLowerCase();
  if (error?.code === "AI_TIMEOUT" || lowered.includes("timeout")) {
    return { status: 504, body: { error: "AI phản hồi quá lâu. Hãy thử lại.", code: "AI_TIMEOUT" } };
  }
  if (lowered.includes("3036") || lowered.includes("daily free allocation") || lowered.includes("10,000 neurons")) {
    return { status: 429, body: { error: "Đã dùng hết quota AI miễn phí hôm nay. Hãy thử lại sau khi quota được làm mới.", code: "FREE_QUOTA_EXHAUSTED" } };
  }
  if (lowered.includes("3040") || lowered.includes("out of capacity")) {
    return { status: 503, body: { error: "Workers AI đang hết năng lực tạm thời. Hãy thử lại sau ít phút.", code: "AI_CAPACITY" } };
  }
  if (lowered.includes("5035") || lowered.includes("paid plan")) {
    return { status: 503, body: { error: "Model hiện yêu cầu gói trả phí. ChartLab chưa bật chế độ trả phí.", code: "PAID_MODEL_REQUIRED" } };
  }
  return { status: 502, body: { error: "Workers AI trả lỗi.", detail: message, code: "AI_PROVIDER_ERROR" } };
}

function sanitize(value, max) {
  return String(value).replace(/[<>\u0000-\u001F]/g, "").trim().slice(0, max) || "N/A";
}

function originAllowed(origin, allowed) {
  if (!origin || allowed === "*") return true;
  const list = allowed.split(",").map(x => x.trim()).filter(Boolean);
  return list.includes(origin);
}

function corsHeaders(origin, allowed) {
  const allowOrigin = allowed === "*" ? "*" : (originAllowed(origin, allowed) ? origin : "null");
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-ChartLab-Access",
    "Vary": "Origin",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8"
  };
}

function positiveInt(value, fallback) {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function constantTimeEqual(a, b) {
  const x = String(a || "");
  const y = String(b || "");
  const len = Math.max(x.length, y.length);
  let diff = x.length ^ y.length;
  for (let i = 0; i < len; i++) {
    diff |= (x.charCodeAt(i) || 0) ^ (y.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers });
}
