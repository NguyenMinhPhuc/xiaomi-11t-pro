/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - TỰ ĐỘNG LƯU ĐƠN HÀNG VÀO GOOGLE SHEET
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH (Chỉ mất 1-2 phút):
 * 1. Mở trang Google Sheets mới: https://sheets.new
 * 2. Đổi tên Sheet (ví dụ: "Đơn Hàng Xiaomi 11T Pro")
 * 3. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script
 * 4. Xóa toàn bộ code mặc định trong trình soạn thảo, copy toàn bộ nội dung file này dán vào.
 * 5. Bấm icon Lưu (Save - Ctrl + S).
 * 6. Bấm nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 7. Bấm icon Bánh răng cạnh "Chọn loại" -> Chọn "Ứng dụng web" (Web app).
 *    - Mô tả: "Nhận đơn hàng"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) -> QUAN TRỌNG: Phải chọn "Bất kỳ ai".
 * 8. Bấm "Triển khai" (Deploy) -> Cấp quyền truy cập nếu Google yêu cầu (Bấm Advanced -> Go to ... (unsafe) -> Allow).
 * 9. Copy "URL ứng dụng web" (Web app URL có dạng: https://script.google.com/macros/s/.../exec)
 * 10. Dán URL vừa copy vào biến GOOGLE_SHEET_URL trong file index.html!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Tự động tạo hàng tiêu đề màu cam Xiaomi nếu trang tính đang trống
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Thời Gian",
        "Họ và Tên",
        "Số Điện Thoại",
        "Địa Chỉ Giao Hàng",
        "Phiên Bản",
        "Giá Tiền",
        "Hình Thức Thanh Toán",
        "Màu Sắc",
        "Trạng Thái"
      ];
      sheet.appendRow(headers);
      
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FF6900");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      headerRange.setFontFamily("Roboto");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var timestamp = data.time || Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || "";
    var phone = "'" + (data.phone || "").toString().replace(/['"]/g, '');
    var address = data.address || "";
    var variant = data.variant || "";
    var price = data.price || "";
    var payment = data.payment || "";
    var color = data.color || "";
    var status = "Mới nhận";

    sheet.appendRow([
      timestamp,
      name,
      phone,
      address,
      variant,
      price,
      payment,
      color,
      status
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Đơn hàng đã được ghi nhận!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
