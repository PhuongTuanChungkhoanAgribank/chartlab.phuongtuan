# ChartLab AI Worker — Cloudflare Workers AI

Backend serverless cho AI Chart Analyzer của `chartlab.phuongtuan`.

## Kiến trúc
GitHub Pages frontend → Cloudflare Worker → Cloudflare Workers AI.

Không cần OpenAI API key. Worker dùng AI binding `env.AI` từ `wrangler.toml`.

## Model mặc định
`@cf/meta/llama-4-scout-17b-16e-instruct`

Model có Vision để đọc screenshot chart. Có thể đổi bằng biến `WORKERS_AI_MODEL` trong `wrangler.toml`.

## Deploy
Cloudflare project đang kết nối trực tiếp GitHub repo.

Build command:
```bash
cd worker && npm install
```

Deploy command:
```bash
cd worker && npx wrangler deploy
```

`npm install` tự chạy `postinstall` để phục hồi 5 rulebook từ `worker/bundles/`.

## Endpoints
- `GET /health`: kiểm tra backend/model.
- `POST /analyze`: nhận `imageDataUrl`, `symbol`, `timeframe` và trả JSON phân tích.

## Cấu hình
- `[ai] binding = "AI"`: Workers AI binding.
- `WORKERS_AI_MODEL`: model vision.
- `MAX_IMAGE_CHARS`: giới hạn data URL ảnh.
- `AI_TIMEOUT_MS`: timeout ứng dụng.
- `ALLOWED_ORIGINS`: origin frontend được phép gọi Worker.

## Access code tùy chọn
Nếu muốn giới hạn beta nội bộ, tạo secret `AI_ACCESS_CODE`. Frontend sẽ hỏi mã khi Worker trả `ACCESS_REQUIRED`.

## Reliability
- Quality Gate: `Ready / Limited / NeedsBetterImage`.
- Không đọc volume nếu panel volume không đủ rõ.
- Không ép Classical Pattern/Wyckoff khi chart thiếu lịch sử/context.
- Mọi `patternId` đều được whitelist bằng 5 rulebook production.
- Khi hết quota free hoặc Workers AI hết capacity, Worker trả error code riêng để frontend không bịa kết quả.
