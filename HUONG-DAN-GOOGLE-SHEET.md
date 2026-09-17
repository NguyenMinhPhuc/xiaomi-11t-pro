# HƯỚNG DẪN KẾT NỐI FORM ĐẶT HÀNG VỚI GOOGLE SHEETS

Để thông tin khách hàng đặt mua tự động đổ về file Google Sheet của bạn (hoàn toàn miễn phí 100%, không cần cài đặt server), bạn chỉ cần làm theo 4 bước cực kỳ đơn giản sau:

---

### BƯỚC 1: Tạo file Google Sheets mới
1. Truy cập [sheets.new](https://sheets.new) để mở một bảng tính Google mới.
2. Đổi tên file theo ý bạn (ví dụ: Đơn Hàng Xiaomi 11T Pro).

---

### BƯỚC 2: Mở Apps Script và Dán Mã
1. Trên thanh menu trên cùng của Google Sheet, chọn: **Tiện ích mở rộng (Extensions)** > **Apps Script**.
2. Một tab mới sẽ mở ra với trình soạn thảo mã.
3. **Xóa sạch** đoạn mã mẫu có sẵn trong đó.
4. Mở file [google-apps-script.js](file:///d:/Pro-Giang-Day/pro-mk111/google-apps-script.js) trong dự án này, copy toàn bộ nội dung và **Dán vào trình soạn thảo Apps Script**.
5. Nhấn tổ hợp phím **Ctrl + S** (hoặc bấm biểu tượng Đĩa mềm) để lưu lại.

---

### BƯỚC 3: Triển khai ứng dụng Web (Deploy)
1. Ở góc trên bên phải màn hình Apps Script, bấm nút màu xanh **Triển khai (Deploy)** > Chọn **Tùy chọn triển khai mới (New deployment)**.
2. Nhấn vào biểu tượng **Bánh răng** (Chọn loại) bên cạnh dòng 'Chọn loại' > Chọn **Ứng dụng web (Web app)**.
3. Điền các mục như sau:
   - **Mô tả**: Nhận đơn hàng Xiaomi
   - **Thực thi dưới dạng (Execute as)**: Chọn **Tôi (Me / địa chỉ Gmail của bạn)**
   - **Ai có quyền truy cập (Who has access)**: Chọn **Bất kỳ ai (Anyone)**  *(RẤT QUAN TRỌNG: Phải chọn mục này để khách hàng trên web có thể gửi dữ liệu vào bảng tính của bạn)*.
4. Bấm nút **Triển khai (Deploy)**.
5. Nếu Google hiển thị cửa sổ yêu cầu cấp quyền:
   - Bấm **Ủy quyền truy cập (Authorize access)** > Chọn tài khoản Gmail của bạn.
   - Bấm vào dòng chữ nhỏ **Nâng cao (Advanced)** ở góc dưới > Chọn **Đi tới ... (Không an toàn) / Go to ... (unsafe)**.
   - Bấm **Cho phép (Allow)**.
6. Sau khi triển khai xong, Google sẽ cung cấp cho bạn một **URL ứng dụng web** (Web app URL có đuôi dạng /exec). **Hãy copy URL này!**

---

### BƯỚC 4: Dán URL vào file index.html
1. Mở file index.html.
2. Tìm tới dòng khoảng 1276:
   `javascript
   const GOOGLE_SHEET_URL = '';
   `
3. Dán URL bạn vừa copy vào giữa hai dấu nháy đơn, ví dụ:
   `javascript
   const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   `
4. Lưu file lại. Từ bây giờ, mỗi khi khách hàng điền form và bấm **XÁC NHẬN ĐẶT MUA**, thông tin gồm:
   - Thời gian đặt
   - Họ và tên
   - Số điện thoại (giữ nguyên số 0 đầu)
   - Địa chỉ giao hàng
   - Phiên bản máy
   - Giá bán
   - Phương thức thanh toán (COD / Trả góp)
   - Màu sắc đã chọn
   - Trạng thái đơn hàng

Sẽ được tự động thêm vào Google Sheets theo thời gian thực!

> **Đặc biệt:** Hệ thống còn tích hợp sẵn tính năng tự động sao lưu vào **LocalStorage** của trình duyệt, đảm bảo an toàn tuyệt đối ngay cả khi mạng chập chờn.
