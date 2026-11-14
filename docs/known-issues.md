# Known issues — ghi nhận ngoài phạm vi các gói đã làm

Ghi nhận ngày 2026-11-14 trên nhánh `feature/anime-effects`. Mục 1–3 đã xử lý trong đợt fix sáng cùng ngày (commit "Fix 3 known issues"); mục 4–5 đã xử lý trong đợt fix chiều cùng ngày (commit "Fix remaining known issues") — xem "Trạng thái" từng mục. Mục 6 là phát hiện mới trong đợt fix thứ hai, **chưa xử lý**.

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

## 4) `Grammar/english-suffix-lab.html` — token "Inter" khai báo nhưng không được nạp

- **Trạng thái (2026-11-14)**: ✅ Đã xử lý — bỏ đúng token `Inter,` trong `font-family` của body (dòng 15, giờ bắt đầu bằng `ui-sans-serif`), phần còn lại của stack nguyên vẹn. Bằng chứng Playwright: computed `font-family` của body bắt đầu bằng `ui-sans-serif`; console 0 lỗi; `docWidth` 390px trước/sau cùng bằng 838 và ảnh chụp identical; tương tác nhẹ (click radio `exam-73`, gõ vào text input) hoạt động bình thường. Grep `Inter,` toàn repo sau đó còn tìm thấy 4 trang dùng Inter chưa nạp → ghi thành mục 6 mới.
- **Mô tả**: Body style dùng `font-family:Inter,ui-sans-serif,...` giống hệt issue 3 trước đây, nhưng trang không có `@font-face` hay thẻ link webfont nào nạp Inter. Nằm ngoài phạm vi đợt fix đầu (issue 3 chỉ áp cho trang tense).
- **Đề xuất hướng xử lý**: áp dụng cùng phương án đã duyệt của issue 3 — bỏ token "Inter" khỏi stack, dùng thuần system-ui. *(Đã áp dụng.)*

## 5) 21 trang tracked còn thiếu `<link rel="icon">`

- **Trạng thái (2026-11-14)**: ✅ Đã xử lý hàng loạt cả 21 trang — chèn `<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">` ngay trong `<head>`: 11 trang head own-line được chèn thuần +1 dòng; 10 trang head inline được chèn inline trên dòng head (numstat 1+/1−, cùng kiểu đợt Grammar). Hai trang nặng (vocabulary-atlas 1.0MB, meaning-to-english-pipeline 1.4MB) chèn bằng thay thế chuỗi byte-level, diff đúng 1 dòng. Bằng chứng: `git diff --numstat` đúng 21 file × 1 dòng; `node --test` 54/54; quét lại `git ls-files '*.html'` thiếu icon = rỗng; Playwright mở 4 trang mẫu (Blog/Verb/Vocabulary/Writing) + 2 trang nặng — console 0 lỗi favicon.
- **Mô tả**: Sau khi 6 trang Grammar có icon, quét toàn repo `*.html` còn 21 trang tracked thiếu icon: Blog (1): tu-biet-den-dung-duoc; Verb (4): english-verbs, five-forms-of-verbs-with-3rd-person, paraphrase-80-flashcards, phrasal-verbs; Vocabulary (14): c1-vocabulary, confusing-words, ielts-collocations-topic-table-with-dictation, ielts_hiking_collocations_full_with_dictation, personal-flashcards, root-atlas, toeic-600, tu-vung-vong-1-6-rut-gon-luyen-viet, vocabulary-atlas, vocabulary-practice, vocabulary-reading-translation-v1-6, vong-1-2-vocabulary-complete-examples, vong-3-4-vocabulary-complete-examples, vong-5-6-vocabulary-complete-examples; Writing (2): guide, meaning-to-english-pipeline-v1-6. Ngoài ra 1 file prototype chưa track trong `docs/redesign/homepage/prototype/` cũng thiếu nhưng là working artifact — bỏ qua theo chỉ định.
- **Đề xuất hướng xử lý**: nếu làm hàng loạt, thêm cùng thẻ icon với đường dẫn tương đối đúng theo độ sâu từng thư mục (`../assets/favicon.svg` hoặc `assets/favicon.svg` cho file ở root); cân nhắc template head dùng chung về sau. *(Đã áp dụng cho 21 trang.)*

## 6) 4 trang dùng "Inter" trong font stack nhưng không nạp webfont (phát hiện mới 2026-11-14 khi grep Finding 4, chưa xử lý)

- **Mô tả**: Grep `Inter,` toàn repo (`*.html`, `*.css`) sau khi xử lý mục 4 còn 4 trang tham chiếu Inter mà không có `@font-face`/`fonts.googleapis`/`fonts.gstatic` nào nạp Inter:
  - `Vocabulary/ielts-collocations-topic-table-with-dictation.html` — dòng 14, body: `font-family:Inter,system-ui,...`
  - `Writing/guide.html` — dòng 11, 2 chỗ: body `font:16px/1.7 Inter,...` và `.tag{font:700 12px/1.5 Inter,sans-serif}`
  - `Vocabulary/vocabulary-reading-translation-v1-6.html` — dòng 9 body `font-family:Inter,"Segoe UI",...` và dòng 10 `.mini-meta{font:700 10px Inter,sans-serif}`
  - `Writing/meaning-to-english-pipeline-v1-6.html` — dòng 18, body: `font-family:Inter,ui-sans-serif,...`
  Cùng pattern với mục 3/4: trình duyệt không tìm được "Inter" và rơi về fallback; nếu máy người dùng cài Inter cục bộ thì render lệch so với máy không cài.
- **Đề xuất hướng xử lý**: áp dụng cùng phương án đã duyệt của mục 3/4 — bỏ token "Inter" khỏi stack (ưu tiên, khớp system-ui của các trang khác) hoặc nạp webfont nếu muốn Inter làm font nhận diện. Chờ Josh duyệt. *(Đã áp dụng cho 21 trang.)*
