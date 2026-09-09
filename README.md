# chartlab.phuongtuan v1.1 deploy-ready

Website học phân tích kỹ thuật thuần chart + AI Chart Analyzer.

## Frontend
- Static HTML/CSS/JS, deploy trực tiếp GitHub Pages.
- 61 candlestick patterns từ Master Table đã audit.
- Level 01–09, Pattern Library, hover preview, trang chi tiết, Compare và source audit.
- Analyzer upload screenshot, signature localStorage, bản gửi khách hàng có thể chỉnh sửa/copy.
- `config.js` quyết định Analyzer chạy Demo hay gọi backend AI.

## AI backend
Thư mục `worker/` chứa Cloudflare Worker serverless:
- Giữ `OPENAI_API_KEY` ở server-side.
- Nhận screenshot đã được frontend resize/nén.
- Gọi OpenAI Responses API với image input.
- Structured Outputs ép kết quả về schema cố định.
- Prompt nhúng 5 rulebook ChartLab (Candlestick, Price Action, Chart Patterns, Price & Volume, Wyckoff) để phần học và Analyzer dùng chung nguồn.
- Không lưu ảnh trong code của Worker.

Xem `worker/README.md` để deploy backend và `DEPLOY_GITHUB_PAGES.md` để deploy frontend.

## Chế độ
- `config.js -> apiEndpoint: ""`: Demo mode, không gửi ảnh tới AI.
- `config.js -> apiEndpoint: "https://...workers.dev/analyze"`: AI live.

## Lưu ý
Analyzer chỉ phân tích những gì hiển thị trên screenshot. Nếu trục giá, volume hoặc context không đủ rõ, output được thiết kế để hạ confidence hoặc trả “không đủ dữ liệu” thay vì đoán.

## Tổng thư viện
- 61 Candlestick
- 14 Price Action
- 19 Classical Chart Patterns
- 14 Price & Volume
- 31 Wyckoff
- **139 bài/setup/rule**

## v1.1 – Deploy-ready & backend hardening
- Thêm GitHub Actions workflow tự deploy GitHub Pages từ `main`.
- Pages artifact chỉ chứa frontend; Worker và tài liệu audit không bị publish vào `_site`.
- Worker thêm `store: false`, timeout upstream, `MAX_IMAGE_CHARS` cấu hình được và access code tùy chọn.
- Frontend tự hỏi access code khi Worker yêu cầu và lưu cục bộ trên thiết bị.
- Thêm `scripts/preflight.sh`, `DEPLOY_V11.md` và `SECURITY_V11.md`.

## Locked beta deployment target
- GitHub repository: `PhuongTuanChungkhoanAgribank/chartlab.phuongtuan`
- Expected site: `https://phuongtuanchungkhoanagribank.github.io/chartlab.phuongtuan/`
- Cloudflare Worker CORS origin is prepared for `https://phuongtuanchungkhoanagribank.github.io`.
