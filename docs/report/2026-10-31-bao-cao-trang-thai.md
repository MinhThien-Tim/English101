# Báo cáo trạng thái — English101

**Ngày:** 2026-10-31 · **HEAD:** `0a5aea3` *("Style flashcards with glass and refresh theme")*
**Trạng thái:** hoàn tất đợt tinh chỉnh portal trong phạm vi cho phép. Chưa commit, chưa push. Các thay đổi hình ảnh lớn vẫn chờ duyệt (mục 4).

---

## 1. Tóm tắt một phút

Đợt này chỉ tinh chỉnh lớp portal dùng chung (`index.html`, `script.js`, `style.css`) theo hướng "Quiet Reading Room" hiện có, không thiết kế lại. Trọng tâm là các lỗi tiếp cận và bàn phím còn sót sau đợt 2026-10-26:

- Giữ focus sau khi bấm bộ lọc, chủ đề, nhóm từ vựng và bộ lọc nhanh (trước đây focus rơi về `<body>`).
- Đưa các điều khiển trong mục lục nhanh và footer lên tối thiểu 44px.
- Sửa accessible name của logo, thêm `aria-live` cho bộ đếm kết quả, bổ sung Blog vào meta description.

Không có thay đổi nào đụng vào nội dung bài học, catalogue, storage hay cấu trúc thư mục. 51/51 test pass.

---

## 2. Thay đổi đã thực hiện

| Tệp | Thay đổi | Lý do |
|---|---|---|
| `script.js` | Thêm `focusToken()` / `restoreControlFocus()`; `setLibraryState()` và `selectCategory()` nhận token; áp dụng cho `[data-filter]`, `[data-category]`, `[data-toggle-group]`, `[data-quick-category]` | Re-render thay thế nút đang được bấm làm focus rơi về `<body>`. Focus được chuyển sang nút thay thế với `preventScroll: true` để không phá cuộn mượt. |
| `script.js` | Timer 150ms của `setQuickIndex(true)` bỏ qua nếu focus đã ở trong panel | Tránh việc ô tìm kiếm cướp focus nếu người dùng bấm chip ngay sau khi mở mục lục. |
| `index.html` | Bỏ `aria-label` khỏi `.brand`, thêm `<span class="sr-only">Trang chủ</span>`, thêm khoảng trắng trước `<small>` (header + footer) | Accessible name cũ ("English 101 - Trang chủ") không chứa nhãn hiển thị. Tên mới: "English 101 Learn with clarity Trang chủ". |
| `index.html` | `#quick-count` có `aria-live="polite"` | Bộ đếm kết quả thay đổi khi lọc/tìm mà trước đây không được thông báo. |
| `index.html` | Meta description thêm "Blog" | Mô tả đủ 6 category của catalogue. |
| `index.html` | Cache-busting: `style.css?v=20261031-focus-1`, `script.js?v=20261031-focus-1` | Tránh trình duyệt dùng bản cũ sau khi sửa. |
| `style.css` | Nút đóng mục lục 34→44px; chip lọc nhanh `min-height:44px`; ô tìm kiếm nhanh 42→44px; link footer mục lục và link footer trang `min-height:44px` | Vùng chạm tối thiểu 44×44. |
| `style.css` | Eyebrow "LESSON LIBRARY" và `kbd` 10→11px; eyebrow `#43806c`→`#3d7a66`; `kbd` `#6b7673`→`#5f6b67` | Chữ 10px quá nhỏ; contrast cũ 4.41:1 và 4.49:1, nay 4.80:1 và 5.29:1 trên `#f8faf9`. |

Tổng diff: 3 tệp, +46/−16 dòng.

---

## 3. Kiểm chứng

### Tự động

| Kiểm tra | Kết quả |
|---|---|
| `node --check script.js` | Pass |
| `node --test tests/learning/*.test.js tests/catalogue.test.js` | **51/51 pass** |
| `git diff --check` | Không lỗi whitespace |
| Impeccable detector (`index.html style.css script.js`) | **79 findings**, giảm từ 82. 12 `low-contrast` còn lại đều là false positive của nền gradient hero (detector lấy màu nền fallback). Không có finding mới từ các dòng đã sửa. |

### Trình duyệt (Chrome DevTools, server tĩnh `python -m http.server 8123`)

Đã chạy các kịch bản sau, không có lỗi console:

| Kịch bản | Kết quả |
|---|---|
| Bấm chip lọc "Ngữ pháp" | Focus ở nút "Ngữ pháp" mới, `aria-pressed="true"` |
| Bấm thẻ chủ đề "Kỹ năng viết" | Focus ở thẻ "Kỹ năng viết" mới |
| Bấm header nhóm từ vựng | Focus giữ ở header nhóm; `aria-expanded` chuyển `true → false` |
| Mở mục lục nhanh, bấm chip "Ngữ pháp" rồi "Kỹ năng viết" | Focus lần lượt ở hai chip; chỉ một chip `aria-pressed="true"` |
| Nhập vào ô tìm kiếm nhanh | Focus vẫn ở input; `#quick-count` cập nhật |
| Mở rồi đóng mục lục bằng `Escape` | Focus trả về `#index-launcher`; `aria-hidden="true"`; body hết `overflow:hidden` |
| Đo vùng chạm sau sửa | Đóng 44×44, chip 44px, ô tìm 44px, link chân mục lục 44px, link footer trang 44px |
| Tràn ngang | 390/390, 360/360, 1440/1440 (`scrollWidth === innerWidth`) |
| Footer desktop và 390px | Bố cục giữ nguyên, link cao 44px, không tràn |

Ghi chú: khi kiểm tra cuộn, tôi tạm đặt `scroll-behavior: auto` trong phiên trình duyệt để nhảy tới footer ngay; không đưa thay đổi đó vào tệp.

---

## 4. Thay đổi hình ảnh lớn — chờ duyệt

Chưa thực hiện. Cần quyết định trước khi làm:

1. **Đồng bộ bảng màu mục lục nhanh** (mint `#2f765f`, `#eaf4f0`…) với hệ charcoal/lime trong `DESIGN.md`.
2. **Thiết kế lại launcher mobile** để không che nội dung (C1: nút 58×58 ở góc dưới phải đè lên mô tả thẻ đầu tiên và một phần dòng copyright ở 390px).
3. **Thêm điều hướng mục/khoá dính hoặc nút "về đầu trang"** cho trang mobile dài.
4. **Giảm mật độ dấu coral** để đúng One Lamp Rule.
5. **Thay link README thô ở footer bằng bề mặt trợ giúp dễ đọc.**
6. **Tạo lại `.impeccable/design.json`** (bản 2026-10-26 còn dùng navy `#0b1220`, trong khi code hiện tại là `#131416`).

Ngoài ra, `DESIGN.md` chưa ghi bảng màu mint của mục lục nhanh; nếu duyệt hướng (1) thì nên cập nhật tài liệu cùng lúc.

---

## 5. Ghi chú

- Không commit/push vì chưa có yêu cầu L4.
- Ba tệp đã sửa nằm ngoài mọi thay đổi nội dung bài học; test learning vẫn xanh.
- D1 (nạp dataset theo set) vẫn như cũ: chỉ `set=vong-1-6` nạp cả ba bộ dữ liệu.
- C2 (chồng lấn nút phát âm) đã ổn định ở trạng thái hiện tại; không cần sửa thêm.
