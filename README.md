# chartlab.phuongtuan v1.1 deploy-ready

Website học phân tích kỹ thuật thuần chart + AI Chart Analyzer.

## Frontend
- Static HTML/CSS/JS, deploy trực tiếp GitHub Pages.
- Level 01–09, Pattern Library, hover preview, trang chi tiết, Compare và source audit.
- Analyzer upload screenshot, local signature, local history, bản gửi khách hàng ngắn/chi tiết, copy/share/export PNG.
- Tổng thư viện: **139 bài/setup/rule** = 61 Candlestick + 14 Price Action + 19 Classical Chart Patterns + 14 Price & Volume + 31 Wyckoff.

## AI backend — free-tier first
Thư mục `worker/` chứa Cloudflare Worker serverless:
- Dùng **Cloudflare Workers AI** qua binding `env.AI`; không cần OpenAI API key.
- Model mặc định: `@cf/meta/llama-4-scout-17b-16e-instruct` có Vision để đọc screenshot chart.
- Nhận screenshot đã được frontend resize/nén.
- Dùng JSON schema/guided JSON để giữ output theo cấu trúc cố định.
- Prompt nhúng 5 rulebook ChartLab để phần học và Analyzer dùng chung nguồn.
- Quality Gate cưỡng chế `Ready / Limited / NeedsBetterImage` và chặn pattern khi ảnh thiếu dữ liệu.
- Không có database trong Worker; screenshot không được chủ động lưu bởi code ChartLab.
- Có access code tùy chọn cho beta nội bộ.

## Deployment hiện tại
- GitHub repository: `PhuongTuanChungkhoanAgribank/chartlab.phuongtuan`
- Frontend: `https://phuongtuanchungkhoanagribank.github.io/chartlab.phuongtuan/`
- Worker: `https://chartlab-phuongtuan-ai.tuanntp0407.workers.dev`
- Analyzer endpoint: `/analyze`
- Health endpoint: `/health`
- CORS chỉ cho origin GitHub Pages ở production config.

## Chế độ
- `config.js -> apiEndpoint: ""`: Demo mode.
- `config.js -> apiEndpoint: "https://...workers.dev/analyze"`: AI live.

## CI/CD
- `.github/workflows/pages.yml`: build + deploy GitHub Pages.
- `.github/workflows/worker-check.yml`: restore rulebooks + syntax check Worker.
- Cloudflare kết nối trực tiếp repo GitHub và tự deploy Worker khi `worker/` thay đổi.

## Lưu ý
Analyzer chỉ phân tích những gì hiển thị trên screenshot. Nếu trục giá, volume hoặc context không đủ rõ, output được thiết kế để hạ confidence hoặc trả “không đủ dữ liệu” thay vì đoán.
