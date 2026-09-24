# IE104_DO_AN
Website tra cứu và khuyến nghị hội nghị khoa học theo chủ đề nghiên cứu

ConfGuide — Website Demo
Giao diện được xây dựng dựa trên ảnh tham chiếu người dùng cung cấp (1607×979 px).
Cấu trúc
`index.html` — giao diện chính
`css/style.css` — toàn bộ CSS, responsive + dark mode
`js/data.js` — dữ liệu mẫu hội nghị
`js/script.js` — tìm kiếm, lọc, modal chi tiết, dark mode
`assets/logo.svg` — logo SVG
Chạy project
Cách đơn giản nhất:
Giải nén project.
Mở thư mục bằng VS Code.
Cài extension Live Server.
Chuột phải `index.html` → Open with Live Server.
Hoặc mở trực tiếp `index.html` bằng trình duyệt.
Các chức năng đã có
Thanh điều hướng
Hero section giống bố cục ảnh mẫu
Tìm kiếm hội nghị theo tên/từ khóa/lĩnh vực
Bộ lọc A*, A, B, Việt Nam, Quốc tế
Danh sách hội nghị dạng card
Xem chi tiết bằng modal
Nút từ khóa gợi ý
Responsive cho laptop/tablet/mobile
Dark mode và lưu trạng thái bằng LocalStorage
Lưu ý
Dữ liệu hội nghị trong `js/data.js` chỉ là dữ liệu demo giao diện. Khi làm đồ án thật, nên thay bằng dữ liệu từ CSDL/backend và hệ thống crawler/scraper của nhóm.