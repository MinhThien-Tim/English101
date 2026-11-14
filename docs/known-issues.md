# Known issues — các task ngoài phạm vi, chưa sửa

Ghi nhận ngày 2026-11-14 trên nhánh `feature/anime-effects`. Ba mục dưới đây là issue **hiện có từ trước** nhánh này, nằm ngoài phạm vi các gói motion đã làm; chỉ ghi task, chưa xử lý.

## 1) `Grammar/same-word-different-parts-of-speech.html` — đáp án của từ "the" không có trong pool option

- **Mô tả**: Câu hỏi của từ `the` (và 2 use khác, xem dưới) có `data-answer` là chuỗi type gốc, nhưng danh sách option của `<select>` chỉ gồm 9 nhãn chung `['Determiner','Đại từ','Danh từ','Động từ','Tính từ','Trạng từ','Giới từ','Liên từ','Thán từ']`. Hệ quả: (a) không thể chọn đáp án đúng cho câu đó (chấm bài luôn tính sai); (b) nút "Hiện đáp án" chỉ fill được 29/30 câu ở short quiz vì gán `select.value` bằng chuỗi không khớp option nào thì giá trị giữ rỗng.
- **Bằng chứng đã xác minh (đọc dữ liệu trong file, không sửa)**:
  - Dòng 51: `{w:'the',u:[E('Mạo từ xác định / determiner',…),E('Trạng từ trong so sánh tương liên',…)]}` — hàm `norm()` (dòng 63) không có nhánh `startsWith('Mạo từ')` nên fall-through trả nguyên chuỗi `'Mạo từ xác định / determiner'` làm `data-answer`; chuỗi này **không** có trong `pool` → câu `the` của short quiz (chọn use 0 vì `u.length=2`) không có option đúng.
  - Cùng nguyên nhân fall-through, full quiz (mọi use) còn 2 câu không có option đúng: `as` — use "Từ nối so sánh/relative marker" (dòng 17) và `but` — use "Relative marker cổ" (dòng 21). Short quiz của `as`/`but` không bị vì use được chọn (index 1) thuộc pool.
- **Đề xuất hướng xử lý**: thêm mapping `startsWith('Mạo từ') → 'Determiner'` vào `norm()` (hoặc thêm nhãn tương ứng vào `pool`), quyết định nhãn đích cho 2 label đặc biệt của `as`/`but`; kèm test nhỏ assert "mọi `data-answer` sinh ra đều nằm trong `pool`".

## 2) Favicon 404 trên các trang không khai báo `<link rel="icon">`

- **Mô tả**: Chỉ `index.html` và `viewer.html` khai báo `<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">`. Các trang còn lại (trong phạm vi đã kiểm: cả 4 trang Grammar) không khai báo icon nào nên trình duyệt fallback request `/favicon.ico` — file này không tồn tại ở root → 404 trong console mỗi lần mở các trang đó.
- **Bằng chứng đã xác minh**:
  - `grep rel="icon"` toàn repo `*.html`: chỉ `index.html` và `viewer.html` có; 4 trang Grammar không có.
  - `assets/favicon.svg` tồn tại (180 byte); `favicon.ico` ở root **không tồn tại**.
  - curl qua static server (`python -m http.server`): `/favicon.ico` → **404**, `/assets/favicon.svg` → 200, trang Grammar → 200.
  - Khớp báo cáo kiểm thử đợt 2: console phiên kiểm chỉ có đúng 1 lỗi `favicon.ico` 404 (issue có sẵn của site).
- **Đề xuất hướng xử lý**: thêm `favicon.ico` ở root (hoặc thêm thẻ `<link rel="icon" href="assets/favicon.svg">` vào các trang learning; cân nhắc thêm vào template head chung nếu về sau có nguồn head chung).

## 3) Font "Inter" khai báo nhưng không được nạp trong `Grammar/tense-exercises-answer-key-quiz.html`

- **Mô tả**: Trang tense dùng stack `font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif` (dòng 8) nhưng không có `@font-face` hay thẻ link webfont nào nạp Inter → trình duyệt không tìm được font "Inter" và fallback về system stack; nguồn cảnh báo font Inter mà người dùng thấy bắt nguồn từ tham chiếu này (theo báo cáo kiểm thử, hook impeccable đã flag font này ở đợt 2).
- **Bằng chứng đã xác minh**: `grep "Inter"` trong file: đúng 1 chỗ — dòng 8 (font stack của `body`); không có `fonts.googleapis`/`@font-face` nào trong trang; các trang Grammar khác và `home.css` không tham chiếu Inter (chỉ trang tense đặc biệt này). Chưa tái hiện lại warning bằng trình duyệt trong phiên này (không chạy lại kiểm thử trình duyệt theo phạm vi); mô tả cảnh báo dựa trên báo cáo đã khôi phục.
- **Đề xuất hướng xử lý**: hoặc nạp Inter thật (webfont + `display=swap`, có preconnect sẵn theo pattern §2 `docs/animations.md`), hoặc bỏ "Inter" khỏi font stack để dùng thuần system-ui (khớp các trang Grammar khác và tránh cảnh báo/dự kiến tải font không cần thiết).
