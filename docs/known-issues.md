# Known issues — ghi nhận ngoài phạm vi các gói đã làm

Ghi nhận ngày 2026-11-14 trên nhánh `feature/anime-effects`. Mục 1–3 là issue **hiện có từ trước** nhánh này, đã được xử lý trong đợt fix cùng ngày (commit "Fix 3 known issues" trên nhánh này — xem "Trạng thái" từng mục). Mục 4–5 là phát hiện mới trong đợt fix, **chưa xử lý**.

## 1) `Grammar/same-word-different-parts-of-speech.html` — đáp án của từ "the" không có trong pool option

- **Trạng thái (2026-11-14)**: ✅ Đã xử lý theo phương án đã duyệt — thêm 3 nhánh vào `norm()`: `startsWith('Mạo từ') → 'Determiner'`, `startsWith('Từ nối so sánh') → 'Liên từ'` (as), `startsWith('Relative marker cổ') → 'Đại từ'` (but); không sửa dữ liệu `E(...)`. Thêm test `tests/learning/same-word-parts-of-speech.test.js` assert mọi `data-answer` của short + full quiz đều nằm trong pool, kèm 3 pin regression. Bằng chứng Playwright: short quiz "Hiện đáp án" fill 30/30 và chấm 30/30 (100%); full quiz fill đủ và chấm 164/164 (100%), bộ đáp án sinh ra đúng bằng 9 nhãn pool; `pos-progress` ghi bình thường; motion feedback hook vẫn gọi (30 lần sau chấm bài).
- **Mô tả**: Câu hỏi của từ `the` (và 2 use khác, xem dưới) có `data-answer` là chuỗi type gốc, nhưng danh sách option của `<select>` chỉ gồm 9 nhãn chung `['Determiner','Đại từ','Danh từ','Động từ','Tính từ','Trạng từ','Giới từ','Liên từ','Thán từ']`. Hệ quả: (a) không thể chọn đáp án đúng cho câu đó (chấm bài luôn tính sai); (b) nút "Hiện đáp án" chỉ fill được 29/30 câu ở short quiz vì gán `select.value` bằng chuỗi không khớp option nào thì giá trị giữ rỗng.
- **Bằng chứng đã xác minh (đọc dữ liệu trong file, không sửa)**:
  - Dòng 51: `{w:'the',u:[E('Mạo từ xác định / determiner',…),E('Trạng từ trong so sánh tương liên',…)]}` — hàm `norm()` (dòng 63) không có nhánh `startsWith('Mạo từ')` nên fall-through trả nguyên chuỗi `'Mạo từ xác định / determiner'` làm `data-answer`; chuỗi này **không** có trong `pool` → câu `the` của short quiz (chọn use 0 vì `u.length=2`) không có option đúng.
  - Cùng nguyên nhân fall-through, full quiz (mọi use) còn 2 câu không có option đúng: `as` — use "Từ nối so sánh/relative marker" (dòng 17) và `but` — use "Relative marker cổ" (dòng 21). Short quiz của `as`/`but` không bị vì use được chọn (index 1) thuộc pool.
- **Đề xuất hướng xử lý**: thêm mapping `startsWith('Mạo từ') → 'Determiner'` vào `norm()` (hoặc thêm nhãn tương ứng vào `pool`), quyết định nhãn đích cho 2 label đặc biệt của `as`/`but`; kèm test nhỏ assert "mọi `data-answer` sinh ra đều nằm trong `pool`".

## 2) Favicon 404 trên các trang không khai báo `<link rel="icon">`

- **Trạng thái (2026-11-14)**: ✅ Đã xử lý cho **cả 6 trang Grammar** — đề xuất gốc nêu "4 trang" nhưng không chỉ rõ là 4 trang nào, trong khi cả 6 trang Grammar đều đăng ký trong catalogue và cùng thiếu icon, nên áp dụng đồng loạt trong folder. Đã thêm `<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">` vào `<head>` từng trang. Bằng chứng: console 6/6 trang Grammar không còn lỗi `favicon.ico` 404; `curl /assets/favicon.svg` → 200; `catalogue.test.js` pass. **Còn lại**: 21 trang tracked khác vẫn thiếu icon (ghi tại mục 5) — chờ quyết định làm hàng loạt.
- **Mô tả**: Chỉ `index.html` và `viewer.html` khai báo `<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">`. Các trang còn lại (trong phạm vi đã kiểm: cả 4 trang Grammar) không khai báo icon nào nên trình duyệt fallback request `/favicon.ico` — file này không tồn tại ở root → 404 trong console mỗi lần mở các trang đó.
- **Bằng chứng đã xác minh**:
  - `grep rel="icon"` toàn repo `*.html`: chỉ `index.html` và `viewer.html` có; 4 trang Grammar không có.
  - `assets/favicon.svg` tồn tại (180 byte); `favicon.ico` ở root **không tồn tại**.
  - curl qua static server (`python -m http.server`): `/favicon.ico` → **404**, `/assets/favicon.svg` → 200, trang Grammar → 200.
  - Khớp báo cáo kiểm thử đợt 2: console phiên kiểm chỉ có đúng 1 lỗi `favicon.ico` 404 (issue có sẵn của site).
- **Đề xuất hướng xử lý**: thêm `favicon.ico` ở root (hoặc thêm thẻ `<link rel="icon" href="assets/favicon.svg">` vào các trang learning; cân nhắc thêm vào template head chung nếu về sau có nguồn head chung).

## 3) Font "Inter" khai báo nhưng không được nạp trong `Grammar/tense-exercises-answer-key-quiz.html`

- **Trạng thái (2026-11-14)**: ✅ Đã xử lý theo phương án bỏ "Inter" khỏi stack (đã duyệt): dòng 8 giờ là `font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif` — chỉ mất đúng token `Inter,`, phần còn lại của stack nguyên vẹn. Bằng chứng Playwright: computed `font-family` của body bắt đầu bằng `ui-sans-serif`; console 0 lỗi/cảnh báo; ảnh 390px trước/sau giống hệt nhau (máy không có Inter cục bộ nên render vốn đã rơi về system stack); contract Enter-key của trang nguyên vẹn (Enter lần 1: kiểm tra + hiện đáp án, lần 2: câu tiếp theo). **Phát hiện mới**: `Grammar/english-suffix-lab.html` (dòng 11) có cùng token Inter — ghi tại mục 4.
- **Mô tả**: Trang tense dùng stack `font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif` (dòng 8) nhưng không có `@font-face` hay thẻ link webfont nào nạp Inter → trình duyệt không tìm được font "Inter" và fallback về system stack; nguồn cảnh báo font Inter mà người dùng thấy bắt nguồn từ tham chiếu này (theo báo cáo kiểm thử, hook impeccable đã flag font này ở đợt 2).
- **Bằng chứng đã xác minh**: `grep "Inter"` trong file: đúng 1 chỗ — dòng 8 (font stack của `body`); không có `fonts.googleapis`/`@font-face` nào trong trang; các trang Grammar khác và `home.css` không tham chiếu Inter (chỉ trang tense đặc biệt này). Chưa tái hiện lại warning bằng trình duyệt trong phiên này (không chạy lại kiểm thử trình duyệt theo phạm vi); mô tả cảnh báo dựa trên báo cáo đã khôi phục.
- **Đề xuất hướng xử lý**: hoặc nạp Inter thật (webfont + `display=swap`, có preconnect sẵn theo pattern §2 `docs/animations.md`), hoặc bỏ "Inter" khỏi font stack để dùng thuần system-ui (khớp các trang Grammar khác và tránh cảnh báo/dự kiến tải font không cần thiết).

## 4) `Grammar/english-suffix-lab.html` — token "Inter" khai báo nhưng không được nạp (phát hiện mới 2026-11-14, chưa xử lý)

- **Mô tả**: Dòng 11 dùng `font-family:Inter,ui-sans-serif,...` giống hệt issue 3 trước đây, nhưng trang không có `@font-face` hay thẻ link webfont nào nạp Inter. Nằm ngoài phạm vi đợt fix (issue 3 chỉ áp cho trang tense) nên chưa sửa.
- **Đề xuất hướng xử lý**: áp dụng cùng phương án đã duyệt của issue 3 — bỏ token "Inter" khỏi stack, dùng thuần system-ui.

## 5) 21 trang tracked còn thiếu `<link rel="icon">` (phát hiện lại khi quét repo 2026-11-14, chưa xử lý)

- **Mô tả**: Sau khi 6 trang Grammar có icon, quét toàn repo `*.html` còn 21 trang tracked thiếu icon: Blog (1): tu-biet-den-dung-duoc; Verb (4): english-verbs, five-forms-of-verbs-with-3rd-person, paraphrase-80-flashcards, phrasal-verbs; Vocabulary (14): c1-vocabulary, confusing-words, ielts-collocations-topic-table-with-dictation, ielts_hiking_collocations_full_with_dictation, personal-flashcards, root-atlas, toeic-600, tu-vung-vong-1-6-rut-gon-luyen-viet, vocabulary-atlas, vocabulary-practice, vocabulary-reading-translation-v1-6, vong-1-2-vocabulary-complete-examples, vong-3-4-vocabulary-complete-examples, vong-5-6-vocabulary-complete-examples; Writing (2): guide, meaning-to-english-pipeline-v1-6. Ngoài ra 1 file prototype chưa track trong `docs/redesign/homepage/prototype/` cũng thiếu nhưng là working artifact.
- **Đề xuất hướng xử lý**: nếu làm hàng loạt, thêm cùng thẻ icon với đường dẫn tương đối đúng theo độ sâu từng thư mục (`../assets/favicon.svg` hoặc `assets/favicon.svg` cho file ở root); cân nhắc template head dùng chung về sau.
