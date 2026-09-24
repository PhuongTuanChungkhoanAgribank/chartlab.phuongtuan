# ChartLab Analyzer Skills v1

## Mục tiêu

Chuyển Analyzer từ một luồng "phân tích tất cả" sang các kỹ năng có phạm vi rõ để giảm kết quả lan man, giúp tư vấn viên chọn đúng mục tiêu trước khi đọc chart.

Thiết kế lấy cảm hứng từ workflow kỹ năng của tài liệu FiinAI được người dùng cung cấp, nhưng ChartLab chỉ giữ phạm vi phân tích kỹ thuật.

## Kỹ năng hiện có

1. Phân tích toàn diện
2. Đọc nhanh chart
3. Cấu trúc giá
4. Hỗ trợ & kháng cự
5. Mẫu hình kỹ thuật
6. Giá & khối lượng
7. Wyckoff
8. Kiểm tra Breakout

## Luồng xử lý

- Frontend gửi: ảnh, mã, khung thời gian, `skill`, `customRequest`.
- Worker v2.2 vẫn dùng Analyzer hai bước hiện tại để tạo BASE ANALYSIS.
- Nếu chọn kỹ năng chuyên biệt hoặc có yêu cầu bổ sung, một lượt text-only nhỏ sẽ biên tập phần Advisor Snapshot + kết luận + bản gửi khách theo đúng phạm vi.
- Nếu lượt biên tập thất bại hoặc hết quota, hệ thống giữ BASE ANALYSIS hợp lệ thay vì làm hỏng kết quả.
- Frontend chỉ hiển thị các section có liên quan tới kỹ năng đã chọn.
- Kỹ năng và yêu cầu bổ sung được lưu trong `result.analysisMeta`, vì vậy History mở lại đúng context cũ.

## Nguyên tắc

- Thuần chart: không bổ sung BCTC, định giá, tin tức hay vĩ mô.
- Không bịa mức giá khi ảnh không đọc được.
- Không ép gọi tên mẫu hình.
- Confidence là độ tin cậy nhận diện, không phải xác suất tăng/giảm.
- Không tạo khuyến nghị mua/bán trực tiếp.
- `overview` không chạy thêm lượt biên tập để tiết kiệm quota.

## Phiên bản

- Frontend: Analyzer Skills v1
- Worker: `cf-ai-v2.2-skills`
