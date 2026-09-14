import { RULEBOOK } from "./rulebook.js";
import { PRICE_ACTION_RULEBOOK } from "./price-action-rulebook.js";
import { CHART_PATTERN_RULEBOOK } from "./chart-pattern-rulebook.js";
import { VOLUME_RULEBOOK } from "./volume-rulebook.js";
import { WYCKOFF_RULEBOOK } from "./wyckoff-rulebook.js";

const DEFAULT_VISION_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";
const DEFAULT_JSON_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const ENGINE_VERSION = "cf-ai-v2-two-pass";
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
      return json({
        ok: true,
        service: "chartlab-ai",
        provider: "cloudflare-workers-ai",
        engineVersion: ENGINE_VERSION,
        visionModel: env.VISION_MODEL || DEFAULT_VISION_MODEL,
        jsonModel: env.JSON_MODEL || DEFAULT_JSON_MODEL,
        freeTier: true
      }, 200, cors);
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

    const visionModel = env.VISION_MODEL || DEFAULT_VISION_MODEL;
    const jsonModel = env.JSON_MODEL || DEFAULT_JSON_MODEL;
    const timeoutMs = positiveInt(env.AI_TIMEOUT_MS, DEFAULT_AI_TIMEOUT_MS);

    let visionRaw;
    let vision;
    try {
      visionRaw = await withTimeout(
        env.AI.run(visionModel, {
          messages: [
            { role: "system", content: VISION_SYSTEM_PROMPT },
            { role: "user", content: buildVisionPrompt(symbol, timeframe) }
          ],
          image: imageDataUrl,
          max_tokens: 1400,
          temperature: 0
        }),
        timeoutMs
      );
      vision = parseVisionReport(extractWorkersAIText(visionRaw));
    } catch (error) {
      const mapped = mapWorkersAIError(error);
      return json(mapped.body, mapped.status, cors);
    }

    let structuredRaw;
    try {
      structuredRaw = await withTimeout(
        env.AI.run(jsonModel, {
          messages: [
            { role: "system", content: SYNTHESIS_SYSTEM_PROMPT },
            { role: "user", content: buildSynthesisPrompt(symbol, timeframe, vision) }
          ],
          response_format: {
            type: "json_schema",
            json_schema: ANALYSIS_SCHEMA
          },
          max_tokens: 3000,
          temperature: 0.05
        }),
        timeoutMs
      );
    } catch (error) {
      const mapped = mapWorkersAIError(error);
      return json(mapped.body, mapped.status, cors);
    }

    try {
      const parsedRaw = parseWorkersAIJson(structuredRaw);
      const parsed = normalizeAnalysis(parsedRaw, symbol, timeframe);
      applyVisionQuality(parsed, vision);
      validatePatternIds(parsed);
      enforceQualityGate(parsed);
      return json({
        ok: true,
        result: parsed,
        provider: "cloudflare-workers-ai",
        engineVersion: ENGINE_VERSION,
        models: { vision: visionModel, structured: jsonModel },
        usage: {
          vision: visionRaw?.usage || null,
          structured: structuredRaw?.usage || null
        }
      }, 200, cors);
    } catch (error) {
      return json({ error: "AI trả kết quả không đọc được.", detail: String(error?.message || error) }, 502, cors);
    }
  }
};

const VISION_SYSTEM_PROMPT = `Bạn là bộ đọc ảnh chart kỹ thuật. Nhiệm vụ ở bước này CHỈ là nhìn screenshot và ghi nhận dữ liệu nhìn thấy, chưa viết khuyến nghị.

BẮT BUỘC trả đúng dạng text sau, mỗi cờ một dòng:
QUALITY=GOOD hoặc QUALITY=USABLE hoặc QUALITY=POOR
CANDLES=YES hoặc CANDLES=NO
PRICE_AXIS=YES hoặc PRICE_AXIS=NO
VOLUME=YES hoặc VOLUME=NO
INDICATORS=YES hoặc INDICATORS=NO
HISTORY=YES hoặc HISTORY=NO
OBSERVATIONS:
- ...

Quy tắc quality gate:
- UI của TradingView, thanh công cụ, logo hoặc khoảng trắng KHÔNG phải lý do đánh ảnh POOR.
- Nếu nhìn thấy rõ nhiều nến và hình học tổng thể của chart, CANDLES=YES.
- Nếu chart có đủ nhiều swing/nến để nhận xét cấu trúc ngắn-trung hạn, HISTORY=YES.
- Nếu trục giá bên phải nhìn thấy các mốc dù chữ hơi nhỏ, PRICE_AXIS=YES.
- Nếu histogram volume nhìn thấy ở dưới, VOLUME=YES.
- Nếu có MA/Bollinger/indicator nhìn thấy, INDICATORS=YES.
- QUALITY=POOR chỉ khi vùng chart thực sự mờ, quá nhỏ, crop mất phần lớn nến hoặc không thể đọc cấu trúc.
- QUALITY=USABLE khi phân tích được nhưng một số số liệu/nhãn không đủ nét.
- QUALITY=GOOD khi nến, cấu trúc và các panel chính rõ.

Trong OBSERVATIONS hãy ghi cụ thể những gì nhìn thấy: xu hướng/cấu trúc, vị trí giá hiện tại so với swing gần nhất, vùng giá đọc được nếu rõ, hình dạng vài nến cuối, volume, MA/BB nếu có, breakout/rejection/compression nếu thực sự thấy. Không suy diễn vĩ mô hay cơ bản.`;

const SYNTHESIS_SYSTEM_PROMPT = `Bạn là ChartLab Chart Analyzer. Bạn nhận báo cáo quan sát từ một model vision đã nhìn ảnh chart. Hãy biến các quan sát đó thành phân tích kỹ thuật thuần chart có cấu trúc JSON.

NGUYÊN TẮC:
- Chỉ dùng dữ liệu trong VISION REPORT và symbol/timeframe người dùng cung cấp.
- Không nói vĩ mô, tin tức, cơ bản, định giá hay catalyst.
- Không bịa mức giá. Nếu không đọc được số, mô tả tương đối.
- Không đưa lệnh mua/bán trực tiếp và không đảm bảo lợi nhuận.
- Confidence là độ tự tin của nhận diện từ ảnh, không phải xác suất giá tăng/giảm.
- Pattern nến phải đặt trong context; không coi một nến đơn lẻ là tín hiệu giao dịch.
- Classical chart pattern chỉ gọi tên khi hình học multi-swing đủ rõ; reversal pattern cần prior trend và xác nhận cấu trúc.
- Volume chỉ phân tích khi VOLUME=YES; volume spike không tự động là climax.
- Wyckoff chỉ gọi khi đủ prior trend + trading range + price-volume context; Spring/UTAD không bắt buộc.
- Mọi value/note phải là nhận xét CỤ THỂ VỀ CHART, tuyệt đối không được chép lại schema, hướng dẫn, comment code, dấu ngoặc, hoặc câu kiểu "0.0-1.0".
- Nếu không có pattern rõ: value mô tả "Chưa có mẫu hình đủ rõ", note giải thích ngắn, confidence="Insufficient", patternId="".
- clientShort 45–90 từ; clientText 90–150 từ, tiếng Việt, trung tính.

CATALOG ID HỢP LỆ (được sinh trực tiếp từ rulebook production):
CANDLESTICK: ${compactCatalog(RULEBOOK)}
PRICE_ACTION: ${compactCatalog(PRICE_ACTION_RULEBOOK)}
CHART_PATTERN: ${compactCatalog(CHART_PATTERN_RULEBOOK)}
PRICE_VOLUME: ${compactCatalog(VOLUME_RULEBOOK)}
WYCKOFF: ${compactCatalog(WYCKOFF_RULEBOOK)}
`;

function buildVisionPrompt(symbol, timeframe) {
  return `Hãy quan sát screenshot chart của ${symbol}, timeframe người dùng chọn là ${timeframe}. Tập trung vào vùng chart, không đánh rớt quality chỉ vì giao diện phần mềm xuất hiện trong ảnh.`;
}

function buildSynthesisPrompt(symbol, timeframe, vision) {
  return `SYMBOL=${symbol}\nTIMEFRAME=${timeframe}\n\nVISION FLAGS:\nQUALITY=${vision.quality}\nCANDLES=${flagText(vision.candlesticks)}\nPRICE_AXIS=${flagText(vision.priceAxis)}\nVOLUME=${flagText(vision.volume)}\nINDICATORS=${flagText(vision.indicators)}\nHISTORY=${flagText(vision.enoughHistory)}\n\nVISION REPORT:\n${vision.observations}\n\nHãy trả đúng JSON schema đã yêu cầu. imageQuality phải phản ánh đúng VISION FLAGS. Nếu CANDLES=YES thì không được dùng NeedsBetterImage chỉ vì một vài nhãn nhỏ; dùng Limited khi thiếu một phần dữ liệu.`;
}

function parseVisionReport(text) {
  const source = String(text || "").trim();
  if (!source) throw new Error("Vision model không trả nội dung.");
  const qualityRaw = readMarker(source, "QUALITY");
  const quality = ["GOOD", "USABLE", "POOR"].includes(qualityRaw) ? qualityRaw : "USABLE";
  const observationsMatch = source.match(/OBSERVATIONS\s*:\s*([\s\S]*)/i);
  return {
    quality,
    candlesticks: readYesNo(source, "CANDLES"),
    priceAxis: readYesNo(source, "PRICE_AXIS"),
    volume: readYesNo(source, "VOLUME"),
    indicators: readYesNo(source, "INDICATORS"),
    enoughHistory: readYesNo(source, "HISTORY"),
    observations: cleanText(observationsMatch?.[1] || source, "Không có mô tả chi tiết từ vision model.", 7000)
  };
}

function readMarker(text, key) {
  const m = text.match(new RegExp(`(?:^|\\n)\\s*${key}\\s*=\\s*([A-Z_]+)`, "i"));
  return m ? m[1].toUpperCase() : "";
}

function readYesNo(text, key) {
  const value = readMarker(text, key);
  if (value === "YES") return true;
  if (value === "NO") return false;
  return null;
}

function flagText(value) {
  return value === true ? "YES" : value === false ? "NO" : "UNKNOWN";
}

function extractWorkersAIText(response) {
  const candidate = response?.response ?? response?.result ?? response;
  if (typeof candidate === "string") return candidate;
  if (candidate && typeof candidate === "object" && typeof candidate.response === "string") return candidate.response;
  if (typeof response?.choices?.[0]?.message?.content === "string") return response.choices[0].message.content;
  if (candidate && typeof candidate === "object") return JSON.stringify(candidate);
  return "";
}

function parseWorkersAIJson(response) {
  const candidate = response?.response ?? response?.result ?? response;
  if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
    if (candidate.symbol || candidate.analysisStatus || candidate.advisorView) return candidate;
  }
  let text = extractWorkersAIText(response).trim();
  if (!text) throw new Error("Workers AI không trả nội dung JSON.");
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    return JSON.parse(text);
  } catch {
    const extracted = extractBalancedJson(text);
    if (!extracted) throw new Error("Không tìm thấy JSON object hoàn chỉnh trong phản hồi AI.");
    return JSON.parse(extracted);
  }
}

function extractBalancedJson(text) {
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (start < 0) {
      if (ch === "{") { start = i; depth = 1; }
      continue;
    }
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return "";
}

function normalizeAnalysis(input, symbol, timeframe) {
  const src = input && typeof input === "object" ? input : {};
  return {
    symbol: cleanText(src.symbol || symbol, symbol, 24).toUpperCase(),
    timeframe: cleanText(src.timeframe || timeframe, timeframe, 24),
    analysisStatus: {
      status: enumValue(src?.analysisStatus?.status, ["Ready", "Limited", "NeedsBetterImage"], "Limited"),
      message: cleanText(src?.analysisStatus?.message, "Ảnh đủ để phân tích ở mức giới hạn.", 500),
      missing: stringArray(src?.analysisStatus?.missing, 8, 120)
    },
    imageQuality: {
      grade: enumValue(src?.imageQuality?.grade, ["Good", "Usable", "Poor"], "Usable"),
      note: cleanText(src?.imageQuality?.note, "Đánh giá dựa trên vùng chart nhìn thấy.", 500),
      candlesticks: boolValue(src?.imageQuality?.candlesticks, false),
      priceAxis: boolValue(src?.imageQuality?.priceAxis, false),
      volume: boolValue(src?.imageQuality?.volume, false),
      indicators: boolValue(src?.imageQuality?.indicators, false),
      enoughHistory: boolValue(src?.imageQuality?.enoughHistory, false)
    },
    advisorView: {
      bias: enumValue(src?.advisorView?.bias, ["Positive", "Neutral", "Cautious", "Insufficient"], "Neutral"),
      confidence: enumValue(src?.advisorView?.confidence, CONFIDENCE, "Low"),
      headline: cleanText(src?.advisorView?.headline, "Chưa có kết luận rõ", 500),
      watch: cleanText(src?.advisorView?.watch, "Theo dõi phản ứng giá tại vùng gần nhất.", 700),
      confirmation: cleanText(src?.advisorView?.confirmation, "Cần thêm xác nhận từ giá.", 700),
      invalidation: cleanText(src?.advisorView?.invalidation, "Nhận định suy yếu nếu cấu trúc hiện tại bị phủ nhận.", 700)
    },
    marketStructure: normalizeBlock(src.marketStructure),
    keyLevels: normalizeBlock(src.keyLevels),
    candlestick: normalizeLinkedBlock(src.candlestick),
    priceAction: normalizeLinkedBlock(src.priceAction),
    chartPattern: normalizeLinkedBlock(src.chartPattern),
    volume: normalizeLinkedBlock(src.volume),
    wyckoff: normalizeLinkedBlock(src.wyckoff),
    conclusion: cleanText(src.conclusion, "Chưa đủ dữ liệu để kết luận thêm.", 1200),
    clientShort: cleanText(src.clientShort, "Chart hiện cần thêm xác nhận trước khi đưa ra nhận định rõ hơn.", 1200),
    clientText: cleanText(src.clientText, "Chart hiện cần thêm xác nhận trước khi đưa ra nhận định rõ hơn. Ưu tiên theo dõi cấu trúc giá và phản ứng tại các vùng gần nhất thay vì suy diễn tín hiệu khi bằng chứng chưa đủ.", 2200),
    warnings: stringArray(src.warnings, 10, 300)
  };
}

function normalizeBlock(src) {
  return {
    value: cleanText(src?.value, "Chưa đủ dữ liệu", 1000),
    note: cleanText(src?.note, "Chưa có xác nhận rõ từ chart.", 1200),
    confidence: enumValue(src?.confidence, CONFIDENCE, "Insufficient")
  };
}

function normalizeLinkedBlock(src) {
  return {
    value: cleanText(src?.value, "Chưa có mẫu hình đủ rõ", 1000),
    note: cleanText(src?.note, "Chưa đủ bằng chứng để gắn mẫu hình cụ thể.", 1200),
    confidence: enumValue(src?.confidence, CONFIDENCE, "Insufficient"),
    patternId: sanitizePatternId(src?.patternId)
  };
}

function cleanText(value, fallback, max = 1600) {
  const text = String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ").trim();
  if (!text) return fallback;
  const metaGarbage = /(additionalproperties|json[_ ]?schema|patternid\s*[:=]|\/\/|0\.0\s*-\s*1\.0|insufficient nếu|properties\s*[:=]|required\s*[:=])/i;
  if (metaGarbage.test(text)) return fallback;
  return text.slice(0, max);
}

function stringArray(value, maxItems, maxLen) {
  if (!Array.isArray(value)) return [];
  return value.map(v => cleanText(v, "", maxLen)).filter(Boolean).slice(0, maxItems);
}

function enumValue(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function boolValue(value, fallback) {
  if (value === true || value === false) return value;
  if (String(value).toLowerCase() === "true") return true;
  if (String(value).toLowerCase() === "false") return false;
  return fallback;
}

function sanitizePatternId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 80);
}

function applyVisionQuality(parsed, vision) {
  const q = parsed.imageQuality;
  if (vision.candlesticks !== null) q.candlesticks = vision.candlesticks;
  if (vision.priceAxis !== null) q.priceAxis = vision.priceAxis;
  if (vision.volume !== null) q.volume = vision.volume;
  if (vision.indicators !== null) q.indicators = vision.indicators;
  if (vision.enoughHistory !== null) q.enoughHistory = vision.enoughHistory;
  q.grade = vision.quality === "GOOD" ? "Good" : vision.quality === "POOR" ? "Poor" : "Usable";
  q.note = cleanText(vision.observations, q.note, 500);

  const missing = [];
  if (q.candlesticks === false) missing.push("nến");
  if (q.priceAxis === false) missing.push("trục giá");
  if (q.volume === false) missing.push("khối lượng");
  if (q.enoughHistory === false) missing.push("đủ lịch sử giá");

  if (q.candlesticks === false || q.grade === "Poor") {
    parsed.analysisStatus.status = "NeedsBetterImage";
    parsed.analysisStatus.message = "Vùng chart chưa đủ rõ để đọc hình học nến đáng tin cậy.";
  } else if (q.priceAxis === false || q.enoughHistory === false || q.grade === "Usable") {
    parsed.analysisStatus.status = "Limited";
    parsed.analysisStatus.message = "Ảnh đủ để phân tích nhưng còn một số giới hạn dữ liệu.";
  } else {
    parsed.analysisStatus.status = "Ready";
    parsed.analysisStatus.message = "Ảnh đủ rõ để phân tích kỹ thuật từ những gì đang hiển thị.";
  }
  parsed.analysisStatus.missing = missing;
}

function validatePatternIds(parsed) {
  const catalogs = {
    candlestick: new Set(RULEBOOK.map(p => p.id)),
    priceAction: new Set(PRICE_ACTION_RULEBOOK.map(p => p.id)),
    chartPattern: new Set(CHART_PATTERN_RULEBOOK.map(p => p.id)),
    volume: new Set(VOLUME_RULEBOOK.map(p => p.id)),
    wyckoff: new Set(WYCKOFF_RULEBOOK.map(p => p.id))
  };
  for (const [key, ids] of Object.entries(catalogs)) {
    if (!ids.has(parsed[key]?.patternId)) parsed[key].patternId = "";
  }
}

function enforceQualityGate(parsed) {
  const q = parsed.imageQuality || {};
  const mustReject = parsed.analysisStatus.status === "NeedsBetterImage";
  if (mustReject) {
    for (const key of ["candlestick", "priceAction", "chartPattern", "volume", "wyckoff"]) {
      parsed[key].patternId = "";
      parsed[key].confidence = "Insufficient";
    }
    parsed.marketStructure.confidence = "Insufficient";
    parsed.keyLevels.confidence = "Insufficient";
    parsed.advisorView.bias = "Insufficient";
    parsed.advisorView.confidence = "Insufficient";
    parsed.advisorView.headline = "Ảnh chưa đủ rõ để đưa ra góc nhìn kỹ thuật";
    parsed.advisorView.watch = "Chụp lại chart với vùng nến rộng hơn và rõ hơn.";
    parsed.advisorView.confirmation = "Phân tích lại sau khi ảnh đạt quality gate.";
    parsed.advisorView.invalidation = "Không áp dụng nhận định kỹ thuật từ ảnh hiện tại.";
    parsed.conclusion = "Ảnh hiện tại chưa đủ rõ để tạo nhận định kỹ thuật đáng tin cậy.";
    parsed.clientShort = "Ảnh chart hiện tại chưa đủ rõ để mình đưa ra nhận định kỹ thuật đáng tin cậy. Anh/chị vui lòng gửi lại ảnh có vùng nến rộng hơn và nhìn rõ cấu trúc giá, mình sẽ kiểm tra lại ngay.";
    parsed.clientText = parsed.clientShort;
  }
  if (q.volume === false) {
    parsed.volume.patternId = "";
    parsed.volume.confidence = "Insufficient";
    parsed.volume.value = "Không đủ dữ liệu volume";
    parsed.volume.note = "Panel khối lượng không đủ rõ hoặc không xuất hiện trong ảnh.";
  }
  if (q.enoughHistory === false) {
    for (const key of ["chartPattern", "wyckoff"]) {
      parsed[key].patternId = "";
      parsed[key].confidence = "Insufficient";
    }
  }
}

function compactCatalog(items) {
  return items.map(item => {
    const name = item.name || item.title || item.viName || item.id;
    const vi = item.viName && item.viName !== name ? `/${item.viName}` : "";
    return `${item.id}=${name}${vi}`;
  }).join("; ");
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
  if (lowered.includes("json mode couldn't be met") || lowered.includes("json mode")) {
    return { status: 502, body: { error: "AI chưa tạo được kết quả có cấu trúc. Hãy thử phân tích lại.", code: "JSON_MODE_FAILED" } };
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
