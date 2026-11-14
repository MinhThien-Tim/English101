# Kế hoạch làm mới 28 trang phụ English101 — "Bàn học" mở rộng về các phòng học

Trạng thái: **chờ duyệt** · Ngày lập: 2026-11-14 · Pre-work: Y1 (tách dataset) đã thực hiện ngày 14-11 theo chỉ thị trực tiếp
Tài liệu này CHỈ là kế hoạch: ngoài pre-work Y1 đã thực hiện và kiểm chứng (xem hai bullet Hiệu đính/Pre-work bên dưới), chưa có batch nào được thực thi — mọi batch dưới đây đều phải được duyệt rồi mới làm.

## Phạm vi

28 trang phụ của English101 — toàn bộ trang học liệu **trừ trang chủ `index.html` (không đụng)**, kèm khung `viewer.html` vì nó là chrome chung của catalogue. Danh sách đầy đủ:

- **Blog (1):** `Blog/tu-biet-den-dung-duoc.html`
- **Grammar (6):** `Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html`, `Grammar/conjunctions-theory-practice.html`, `Grammar/english-suffix-lab.html`, `Grammar/prepositions-theory-practice.html`, `Grammar/same-word-different-parts-of-speech.html`, `Grammar/tense-exercises-answer-key-quiz.html`
- **Verb (4):** `Verb/english-verbs.html`, `Verb/five-forms-of-verbs-with-3rd-person.html`, `Verb/paraphrase-80-flashcards.html`, `Verb/phrasal-verbs.html`
- **Vocabulary — nhóm Vòng 1–6 (5):** `Vocabulary/vong-1-2-vocabulary-complete-examples.html`, `Vocabulary/vong-3-4-vocabulary-complete-examples.html`, `Vocabulary/vong-5-6-vocabulary-complete-examples.html`, `Vocabulary/tu-vung-vong-1-6-rut-gon-luyen-viet.html`, `Vocabulary/vocabulary-practice.html`
- **Vocabulary — khác (9):** `Vocabulary/c1-vocabulary.html`, `Vocabulary/confusing-words.html`, `Vocabulary/ielts-collocations-topic-table-with-dictation.html`, `Vocabulary/ielts_hiking_collocations_full_with_dictation.html`, `Vocabulary/personal-flashcards.html`, `Vocabulary/root-atlas.html`, `Vocabulary/toeic-600.html`, `Vocabulary/vocabulary-atlas.html`, `Vocabulary/vocabulary-reading-translation-v1-6.html`
- **Writing (2):** `Writing/guide.html`, `Writing/meaning-to-english-pipeline-v1-6.html`
- **Khung (1):** `viewer.html` (kèm `viewer.js`/`viewer-meta` khi việc nằm đúng lỗi đã ghi)

> Ghi chú điều chỉnh: yêu cầu gốc ghi nhóm "Vocabulary khác ×7" nhưng danh sách 28 trang có 14 trang Vocabulary; 2 trang còn lại (`vocabulary-atlas.html`, `vocabulary-reading-translation-v1-6.html`) được xếp vào nhóm này để phủ đủ 28 trang. Tổng nhóm: 1 + 6 + 4 + 5 + 9 + 2 + 1 = 28.

KHÔNG đổi trong đợt này: `index.html`, `data/documents.js` (catalogue là nguồn sự thật, không có finding nào đòi sửa catalogue), các PDF/Article (nội dung binary/external), nội dung học nằm ngoài các lỗi dữ liệu đã liệt kê ở P0.

**Dữ liệu nền của kế hoạch** (mọi con số dưới đây lấy từ nguồn này, không bịa):

- Finding hệ thống đã gộp: 33 nhóm finding; tổng 398 finding — 388 verified, 10 unconfirmed, 13 high (số liệu đợt chạy).
- File chi tiết `docs/redesign/secondary-pages/secondary-pages-findings.md` ghi tổng 384 finding — 374 verified, 10 unconfirmed, 13 high (bảng category: design 69, ux 47, interaction 47, a11y 89, code 72, content 32, copy 21, perf 7). Chênh lệch 14 so với số đợt chạy do cách gộp; cần đồng bộ khi chốt danh mục (xem việc còn mở).
- 6 chủ đề lỗi: token/font/chất liệu (10), a11y trạng thái động (9), hợp đồng tương tác (6), tiến độ & độ bền lưu trữ (5), tái sử dụng module dùng chung (7), nội dung dữ liệu & điều hướng/bố cục (9).
- Ma trận nền tĩnh từng trang (styles/webfont/favicon/viewport/lang/homeLink/sharedAssets) và tóm tắt audit từng trang (28 bản).
- File đọc trực tiếp trong phiên để đối chiếu: `assets/styles/tokens.css`, `assets/styles/primitives.css`, `assets/styles/learning.css`, `Vocabulary/toeic-600.html` (head + topline), danh sách file `assets/learning/` + `assets/ui/`, grep consumer `tokens.css`/`learning.css`, export các module dùng chung.
- **Hiệu đính sau phản biện (2026-11-14):** các số liệu dữ liệu trong bảng P9 và batch P0 được đo lại bằng node/grep trực tiếp trong phiên này; nơi đo lại khác bản ghi gốc được ghi tường minh ngay tại chỗ (toeic-600 3 cặp exact thay vì 4 — bản ghi gốc đếm nhóm trùng nhãn; ielts-collocations 19 phrase chuẩn hóa / 17 exact thay vì 17; five-forms trùng vi, không phải trùng entry; 9 consumer keyboard.js thay vì 5; class body theo set đã có từ `vocabulary-rounds-bootstrap.js:73`; reading-translation có 1 keydown input-scoped; suffix-lab:474 đã operable). **Hiệu đính lần 2 (cùng ngày):** "3 câu trắc nghiệm chỉ còn 1 lựa chọn" là lỗi code `choicePool` (toeic-600.js:179-180, đo node 3 entry pool=0 + 8 entry pool≤2) — fix code ở P0 mục 9, bỏ khỏi Mốc 0; guard MCQ chỉ áp mode `forward` (mode `synonym` có ô gõ, không chặn). File `secondary-pages-findings.md` giữ nguyên như bản ghi audit; số hiệu đính nằm trong kế hoạch này kèm nguồn đo.
- **Hiệu đính lần 3 (2026-11-14 — xác minh mã nguồn từng sửa của lần 1–2):** guard `composing`/`emptyInput`/`answered` của `keyboard.js` nằm ở :10/:17/:19 — P1 mục 4 đã trích đúng (đọc lại file); `check()` của app Vòng đọc `$('#typed')` cho mode `synonym` và `drawQuestion` chỉ mode `forward` render choices — P0 mục 1b đã mô tả đúng; `choicePool` (toeic-600.js:180-181) lọc `partOfSpeech` chính xác từng ký tự — P0 mục 9 đã đúng bản chất code; `.filters details{display:none}` nằm ở `ielts-vocabulary-focus.css:6` — P2.4 đã trích đúng; test pin `SUBMIT` ở `platform.test.js:65` — đã đối chiếu. Tiêu chí §7.9 đã đổi thành "0 prompt trùng **chưa xử lý** — five-forms biệt lập hóa 15 nhóm", hết mâu thuẫn với P0 8b; breakdown P0 8a đã tách đúng 3 cặp exact (productive, register, constantly) + 1 cặp khác từ cùng nhãn (location/position).
- **Pre-work Y1 — tách dataset inline (2026-11-14, làm theo chỉ thị trực tiếp, không phải batch):** 4 dòng dataset khổng lồ được tách thành file riêng, giữ nguyên hành vi: `Vocabulary/vocabulary-atlas.data.js` (958KB — dòng 8 cũ), `Writing/meaning-to-english-pipeline-v1-6.data.js` (1.369KB — dòng 140 cũ), `Verb/five-forms-of-verbs-with-3rd-person.data.js` (76KB — dòng 171 cũ), `Grammar/tense-exercises-answer-key-quiz.data.js` (40KB — dòng 119 cũ). Mỗi trang: chèn một dòng `<script src="…?v=20261114-data1"></script>` ngay trước block script và xóa dòng giant → **số dòng mỗi file giữ nguyên 100%** (92/400/324/231), nên mọi trích dẫn `:NNN` trong kế hoạch vẫn đúng; các số dòng baseline trong bảng §1 (atlas dòng 8, pipeline dòng 140…) là số đo TRƯỚC khi tách. Kiểm chứng: `node --check` ×4 đạt; Playwright trước/sau trên http server: DATA 966 / RAW_ITEMS 6.784 / DATA 462 / META 13 không đổi, tag nạp 200, console 0 lỗi cả 4 trang. `same-word` (JS 3,8KB + CSS 4,6KB một dòng) dưới ngưỡng gây tràn context → để nguyên, tách khi chạm trang ở P2.2.

## 1. Bối cảnh và vấn đề hệ thống

Trang chủ đã redesign theo hệ "Bàn học" (hướng A, đã ship ở `index.html` + `home.css`). 28 trang phụ thì chưa: mỗi trang tự dựng một hệ màu, một kiểu hero, một trình chấm và một kho lưu tiến độ riêng. Kết quả là cùng mở từ một catalogue nhưng mỗi phòng học một kiến trúc — và nhiều lỗi dùng được đo bằng grep/đo tương phản, không phải sở thích thẩm mỹ.

Bảng dưới gộp 33 finding hệ thống thành 10 vấn đề P1–P10. Chi tiết từng trang nằm ở `docs/redesign/secondary-pages/secondary-pages-findings.md`.

| # | Vấn đề hệ thống | Bằng chứng | Hệ quả |
|---|---|---|---|
| P1 | Lesson không có lối về thư viện | 23/28 trang phụ không có href nào tới `index.html`/`viewer.html` (grep hệ thống; chỉ 5 trang có: viewer, Blog/tu-biet, c1-vocabulary, toeic-600, personal-flashcards). Trái Open Door Rule coi "back to library" là phần cố định của lesson (DESIGN.md:251) | Mở trực tiếp bằng bookmark/URL chia sẻ là dead-end, chỉ còn nút Back của trình duyệt |
| P2 | Hệ token phân mảnh: nhiều hệ màu song song | 13/28 trang có `:root` riêng nhưng KHÔNG nạp `assets/styles/tokens.css`; 19/28 có `:root` inline; 7/28 nạp tokens.css (đối chiếu grep trong phiên: đúng 7 file). Lệch đại diện: lesson-accent #1c5b53 (chuẩn) vs #155e52 (tự chế), lesson-paper #fffefa vs #faf9f5; 57 hex cứng ở `Verb/english-verbs.html` | Không trang nào nhất quán với hệ "Bàn học"; mỗi lần thêm trang lại nhân thêm một bảng màu |
| P3 | Vòng focus không theo Focus Gold | 19/28 trang tự chế màu focus hoặc không có rule `:focus` nào (5 trang grep `:focus` = 0). Đo contrast: #8bc2b7 = 1.88:1, #00b2ff = 2.38:1, #3d91bd đè bằng `!important`; Focus Gold #b8883f = 3.17:1. Finding status: unconfirmed (cần tái đo trên từng trang khi thực thi) | Người dùng bàn phím không nhìn thấy mình đang ở đâu; vi phạm "visible focus" của CONTEXT.md Accessibility |
| P4 | Chất liệu sai chuẩn lesson: gradient + bóng đậm | 11/28 trang có hero/band gradient nhiều lớp và bóng resting alpha 8–22%, ví dụ tense gradient 135° #102a43→#155eef, five-forms bóng `0 10px 28px .14`, ielts-vocabulary-focus.css `.learning-card` `0 16px 36px .22` — trong khi chuẩn lesson là band phẳng một màu và bóng whisper `0 8px 26px rgba(32,59,58,.03)` (Flat-At-Rest Rule, DESIGN.md:307,369) | Trang trông "slop" so với trang chủ; bóng đậm không có ý nghĩa chức năng |
| P5 | A11y trạng thái động và điều khiển | Khối kết quả chấm không nằm trong live region nào ở 16/28 trang (7 trang grep `aria-live`/`role="status"` toàn file = 0: conjunctions, prepositions, same-word, tense, suffix-lab, english-verbs, reading-translation); trạng thái chọn chỉ là class `.active` ở 15/28 trang (grep `aria-pressed`/`aria-current` = 0; 1 trang còn dùng `aria-selected` trên `<button>` không có `role=tab` — confusing-words:556); control thiếu accessible name ở 8/28 (194 select same-word không `<label>`; nút icon-only ⛶ `#fullDetail` không có aria-label — vocabulary-practice.html:6, app vòng dùng chung 4 set; nút ⛶ của atlas và pipeline :61 đã có aria-label; nút ↑ conjunctions/prepositions); thẻ flashcard là div chỉ click được ở 2 trang (paraphrase-80:418, phrasal-verbs:551 — `<div class="card" id="card">` không tabindex/role; suffix-lab:474 đã operable `<article tabindex="0" role="button">` — bản ghi gốc liệt kê nhầm, ở đó còn thiếu chỉ là aria-hidden mặt sau, xử lý ở P2.2); màn cấu hình là div chỉ click được ở `Verb/english-verbs.html:190-243` (15 div) và `Vocabulary/confusing-words.html:603-623` (3 div, severity high); tap target < 44px ở 5 vị trí (keyboard-pronunciation.js:97 cao ~34–38px; `.back` 42×42 ở 3 lesson; viewer-back 13px); skip-link chỉ có 3/28; 4 trang có `<dialog>` nhưng 2 tự quản | Người dùng bàn phím/switch không thiết lập được phiên; screen reader không biết mục nào bật, không được thông báo kết quả chấm |
| P6 | Hợp đồng tương tác học vi phạm (CONTEXT.md:101–114) | Enter: 12/28 trang vi phạm — conjunctions và prepositions không có keydown nào (grep = 0); reading-translation có đúng 1 keydown input-scoped (:417, Enter có guard isComposing/repeat) chỉ phục vụ tab coverage quiz, 12 bài biên tập còn lại không có luồng Enter (handler phím 1–4 toàn cục thuộc meaning-to-english-pipeline — finding bổ sung đã verify); Enter chấm SAI câu MCQ chưa trả lời (root-atlas, atlas và 4 set Vòng qua runtime chung — getContext chỉ đọc `#typed` (:97) nên mode forward không có ô gõ bị coi là hợp lệ và `check()` (:55) chấm `v=''` thành sai); pipeline Enter không guard IME; toeic-600 Enter tự đánh "Đã nhớ" không được quảng bá. Chấm điểm: 10/28 chấp nhận quá rộng — `'n'` → ĐÚNG (english-verbs:845), `'c'` khớp 'Chăm sóc' (phrasal-verbs), gõ 4 từ đầu câu dịch → ĐÚNG (ielts-hiking-modern.js:43). Đáp án lộ: 5 trang — phrasal-verbs đọc term trước SUBMIT, confusing-words `speak(item.w + item.en)` không rẽ nhánh chiều, atlas auto-pronounce ở reverse/listen/cloze, hiking hint 'Unit · w · pos' lộ đáp án ở 363/442 item, pipeline `span.blank` nằm trong DOM (severity high). Reveal nhiễm tiến độ: 3 trang (same-word revealActive tính vào n/N; prepositions revealSet điền + save(); personal-flashcards SUBMIT assisted → nhãn "Incorrect" đỏ). Feedback sai không giải thích: 10/28 (245 câu prepositions chỉ 2 trường giải thích; 142/234 conjunctions không note; 145/198 tense rỗng; usageNote template '…ngữ cảnh pharmacy.' 236/600 toeic-600) | Việc luyện tập mất tính tự kiểm tra và độ tin cậy; Enter có lúc hành động ngoài mong đợi |
| P7 | Tiến độ ghi sai chuẩn và runtime thiếu bền | 9/28 trang ghi localStorage key thô ngoài `assets/learning/persistence.js`: 'conjunction-progress', 'prep-progress', 'pos-progress', 'suffixLabProgressV2'+'suffixLabKnownV1', 'tenseQuizHistoryV1', 'bi-kip-grammar-v2', 'essay-lab-v1:*', 'reading-translation-v1-6-completed'; 5 trang đọc/ghi không try/catch (suffix-lab:933 parse không guard trong khi :935 có; tense:167 recordHistory chạy trước showStored; conjunctions save() chết trước progress()); 4 trang lưu mảng bám index DOM (conjunctions 258 blanks, prepositions 308, same-word 194 select, reading-translation markDone(i)) không có version; 6 trang ghi đĩa mỗi giây/keystroke không debounce (app.js save() mỗi 1000ms + stats Set trên 4205 mục; toeic-600 rebuild 600 thẻ mỗi keystroke; root-atlas save+render mỗi phím); crash `assets/learning/vocabulary-rounds-app.js:39` — getContext() gọi `q()` khi `state.session` là null, ném TypeError mỗi keydown ngoài phiên, chết bàn phím cả 4 set Vòng (severity high) | Tiến độ người học có thể âm thầm gán nhầm câu hoặc mất khi storage bị chặn; một lỗi 1 dòng làm chết phím 4 trang |
| P8 | Tự viết lại module dùng chung + vệ sinh code | 7 trang tự dựng engine phiên/flashcard/chấm riêng (bi-kip:23-46 progress store riêng; paraphrase-80:356 và phrasal-verbs:529 gọi `createFlashSession` lại sau MỖI next/prev/shuffle nên attempts/ratings vừa ghi bị vứt); 8 trang tự viết keydown dù `assets/learning/keyboard.js` (IME/repeat/interactive guard) đã có (bi-kip:139+149, suffix-lab:1014, tense:216, english-verbs:641+918, five-forms:287+322, meaning-to-english:352, reading-translation:417, c1-vocabulary.js:486); cache-bust thiếu/không nhất quán ở 11/28 (media-helper song song '?v=20260916-p2' ×4 và '?v=20260916' ×2; viewer 3/3 file không version); dataset inline một dòng khổng lồ 5 trang (atlas dòng 8 = 913.888 ký tự, file 1,04MB; pipeline dòng 140 = 1.315.344 ký tự, file 1,46MB; five-forms 76KB; tense 41KB; same-word JS+CSS ~8,4KB); CSS/JS chết 8 trang (guide 4,86KB/26 class; ielts-collocations 159 dòng + hiking 249 dòng if(false); confusing-words Fraunces 5 rule chết + 2 :root); engine phát âm 2 luồng (11 trang nạp helper nhưng c1-vocabulary en-GB cứng rate .84, reading-translation en-GB .9, atlas 3 nguồn cấu hình, focus.js đăng ký khi #accent/#rate chưa tồn tại → luôn fallback); lesson nhúng iframe viewer hiện double chrome (viewer.js:19-20 gán frame.src, grep `window.top/self/parent` trong lesson = 0); skin `ielts-vocabulary-focus.css` display:none các tab chức năng ở 3/3 trang dùng (ẩn '≋ Đồng nghĩa', '⌁ Tiến độ', xuất/nhập tiến độ — severity high) | Cùng một hành vi tồn tại 2–3 bản sao lệch nhau; trình duyệt có thể chạy bản cũ sau khi cập nhật; chức năng trang bị khóa sau CSS |
| P9 | Nội dung dữ liệu và copy lệch | Dữ liệu trùng/nhiễu 11 trang: toeic-600 — **3 cặp entry trùng nguyên word+vietnamese+POS** (mục tiêu dedupe) + **1 cặp khác từ cùng nhãn Việt** (location/position 'Vị trí') — 4 nhóm gây 2 lựa chọn trùng nhãn nếu rơi cùng câu, xử lý phần trùng nhãn bằng bộ lọc nhãn ở mục 9 P0 (đo lại node trong phiên hiệu đính; bản ghi gốc "4 cặp trùng nguyên từ–nghĩa–POS" là đếm nhóm trùng nhãn, không tái lập được theo nghĩa chữ; 5 nhóm trùng theo word nếu tính cả khác nghĩa — thêm express, basis); **lỗi CODE pool distractor** (severity high): `choicePool` (toeic-600.js:179-180) lọc POS chính xác từng ký tự → 3 entry pool=0 (follow up, due to, escort) + 8 entry pool≤2 — đo node, fix code ở mục 9 P0; five-forms — **15 cặp prompt VI trùng** (khác từ Anh — mơ hồ đề, không phải trùng entry; DATA 462 dòng (nay ở `Verb/five-forms-of-verbs-with-3rd-person.data.js`) chỉ có present/past/pp/ing/inf/vi/type/alts/third, không có trường giải thích); phrasal-verbs 'Tiếp tục'×3; confusing-words 16 nhóm promptMain trùng; conjunctions 3, prepositions 1, tense 2, english-verbs 4, ielts-collocations **19 phrase trùng khi chuẩn hóa case/khoảng trắng** (17 exact — đo node), c1-vocabulary 2 cặp, root-atlas spect/vid-vis. Định dạng dữ liệu: ielts-collocations lỗi khoảng trắng đo theo câu ví dụ làm ground truth — auditor ghi 48 row nghi/42 lỗi phrase + ~5 lỗi sentence (findings.md:2448); bộ đếm chưa có trong repo, heuristic khác cho 27–34/411 nên số chốt khi viết bộ đếm (mục 8c P0); tense 'an story' và 'I ..... ...(look)'. Copy sai số liệu: lỗi thật là **hard-code số liệu của một set trong runtime dùng chung 4 set** (app.js:34 '4.205 mục và 36 chủ đề' đúng cho vong-3-4 theo pin tests/learning/vocabulary-rounds.test.js:9, sai cho vong-1-2 1299/29 :8 và vong-5-6 1280/44 :10); ngoài đó: hero 7.419 vs RAW_ITEMS 6.784; counter 58 thẻ/~150 mục vs 151 nhóm/398 từ; bi-kip '6 phút đọc' vs 434 từ; conjunctions '13 phần' vs 12; lộ dấu vết biên soạn 3 trang (root-atlas '82 mục trong tệp bạn gửi'; guide footer trích artifact; vong-5-6:5 stub dùng thuật ngữ kỹ thuật); nhãn HOA tiếng Việt 8 trang; title/head lệch chuẩn cả 28 trang (3 kiểu separator, 22/28 không nhãn brand, c1-vocabulary thiếu hẳn `<title>`) | Đề mơ hồ chấm sai dù trả lời đúng; người học thấy hai con số mâu thuẫn; tab trình duyệt hiện URL thay vì tên bài |
| P10 | Bố cục và thiết bị: mobile, icon, font, motion | Emoji làm icon điều khiển ở 15/28 (🔊 trong 10 file; 7 nút nav suffix-lab) thay vì SVG glyph hộp 0 0 24 24 stroke 1.9 (DESIGN.md:326); hệ font lệch 9/28 (4 lesson nạp Google Fonts riêng mỗi trang một bộ; 2 trang tham chiếu Inter mà không trang nào nạp; chuẩn lesson là system-ui — DESIGN.md:258); transition/motion cứng không guard reduced-motion 10/28 (tokens.css:19-21 đã hạ `--duration-interaction` về 0ms nhưng các trang dùng .15s/.5s cứng); chữ nhấn dưới AA 4 trang (coral/paper 2.70:1; #aab1a9/#f3f7f8 2.03:1; #2f8f5b/#e5f4ec 3.55:1); bảng tràn ngang mobile 3 trang — tense đo trình duyệt 390px: scrollWidth 923 vs clientWidth 375 (gốc `.tense-table min-width:850px`, severity high; 2 trang còn lại phân tích tĩnh); phần tử fixed/sticky chồng lấn 8 trang — 2 xác nhận bằng trình duyệt (vong-1-2: 36×36px giữa ⚙ và Tập trung, cùng z-index 1000; personal-flashcards: đè nút 'Cách hoạt động'), 3 instance chưa tái hiện được; `viewer.html` chạy stylesheet legacy `style.css` trong khi trang chủ đã chuyển home.css (grep `href="…style.css` toàn repo chỉ khớp viewer.html:5); meta theme-color thiếu ở 27/28, 2 trang có lại khác nhau (#0b1220 vs #0b1013, còn lệch cả `--navy #131416` của chính viewer-bar) | 360/390px tràn ngang hoặc bị che; icon đa sắc lệch hệ; chuyển động vẫn chạy khi người dùng đã bật giảm chuyển động |

## 2. Mục tiêu (MUST / SHOULD / MAY)

**MUST**

- M1. Giữ nguyên toàn bộ nội dung học: dữ liệu bài, câu hỏi, đáp án, giải thích, số lượng mục. Đợt này chỉ đụng dữ liệu ở đúng các lỗi đã liệt kê (entry trùng thật, distractor trùng nhãn, lỗi định dạng) theo chiến lược được duyệt ở Mốc 0; đề chỉ mơ hồ (five-forms: cùng nghĩa vi, khác từ) được biệt lập hóa chứ không xóa mục; mọi nội dung thay thế/bổ sung (toeic-600) phải được duyệt trước.
- M2. Giữ nguyên compatibility surfaces: Resource ID trong `data/documents.js`, liên kết `viewer.html?id=...`, đường dẫn tương đối + casing tên file, filename, và mọi key `localStorage` hiện có. Nếu phải đổi cách lưu, dùng migration có chủ ý (đọc key cũ) — không đổi im lặng.
- M3. Site tĩnh, không backend, không bước build, không framework; mọi tài nguyên nạp bằng đường dẫn tương đối, hoạt động trên subpath GitHub Pages và `python -m http.server 8000`.
- M4. Hợp đồng Enter + Answer handling + Feedback theo CONTEXT.md: submit câu trả lời không rỗng → hiện kết quả → Enter mới cho sang câu tiếp; không submit khi IME đang gõ; không nhảy câu chưa trả lời; Enter không kích hoạt control ngoài mong đợi; normalize chỉ những khác biệt Activity tuyên bố; feedback khi sai phải nêu đúng đáp án và lý do/quy tắc phân biệt.
- M5. 360px và 390px: `scrollWidth === clientWidth` (không tràn ngang), không phần tử `position: fixed/sticky` nào che nút hành động hoặc nội dung cuối.
- M6. Tiến độ người học không mất: key cũ vẫn đọc được qua migration; storage bị chặn thì trang vẫn chấm và hiển thị ghi chú rõ ràng, không crash vòng học.
- M7. Tiêu chí người dùng "dễ dùng, không slop, đại trà": mẫu hình phổ thông quen thuộc, nhất quán với hệ "Bàn học" của trang chủ, không phô trương — không gradient trang trí, không emoji làm icon, không nhãn HOA tiếng Việt, không bóng lơ lửng lúc nghỉ.
- M8. `index.html` và `data/documents.js` không đổi. Toàn bộ thay đổi nằm trong 28 trang phụ + tài sản dùng chung được liệt kê ở từng batch.

**SHOULD**

- S1. 28 trang nạp cùng một lớp dùng chung (`tokens.css` → `primitives.css` → `learning.css`) trước CSS riêng; hex cứng dời về var(--…); accent riêng có chủ đích được ghi là accent world trong DESIGN.md.
- S2. Mọi trang phụ có: skip-link tiếng Việt, topline "← English 101" về `../index.html` (mẫu `Vocabulary/toeic-600.html:17`), `<title>` dạng "Tên bài · English101" + meta description 1 dòng, meta theme-color thống nhất.
- S3. Pattern a11y chung áp đủ: một live region polite cho khối kết quả mỗi Activity; `aria-pressed`/`aria-selected` cho trạng thái chọn; accessible name cho mọi input/select/nút icon-only; tap target ≥ 44px; `<html lang="vi">`.
- S4. Trang nào tự viết keydown/flashcard engine migrate sang `createKeyboardDispatcher` / `createLearningSession` (namespace `English101Learning`, đã xác nhận export tại `assets/learning/keyboard.js:52`, `assets/learning/session.js:156`); key localStorage thô bọc bằng `createPersistence` + `migrateLegacy` (export tại `assets/learning/persistence.js:63`).
- S5. Giới hạn selector ẩn toàn cục của skin `ielts-vocabulary-focus.css` (nav `data-tab="synonyms"/"progress"/"audit"/"guide"` và `.filters details`) theo `body` class từng set: class **đã được gắn sẵn** từ `vocabulary-rounds-bootstrap.js:73` (`document.body.classList.add(\`vocabulary-${set}\`)` — template literal nên grep chuỗi tĩnh không thấy; không cần thêm JS), việc cần làm là thêm selector `body.vocabulary-vong-1-2/3-4/5-6` trong CSS theo tiền lệ `body.vocabulary-vong-1-6` (css:34-35) để mở lại tab Đồng nghĩa/Tiến độ/Hướng dẫn.
- S6. Sửa dữ liệu trùng/lỗi định dạng theo đúng danh sách P0; mỗi sửa kèm bộ đếm xác nhận 0 lỗi còn lại.

**MAY**

- ~~Y1. Tách dataset inline khổng lồ (5 trang, 41KB–1,33MB một dòng) ra file JS riêng có `?v=` cache-bust~~ — ĐÃ LÀM 14-11 (4 trang ≥41KB, xem Pre-work; `same-word` ~8KB tách khi chạm ở P2.2).
- Y2. Chuyển 2 trang `<dialog>` tự quản sang `createDialogController` (export tại `assets/ui/dialog.js:38`) + bổ sung `aria-labelledby`/`aria-describedby`.
- Y3. Script `tools/` sinh/đồng bộ `?v=` cho file dùng chung (quy ước một chuỗi version duy nhất mỗi file).
- Y4. Viết lại usageNote TOEIC ngoài nhóm liên quan lỗi chấm/dedupe (236/600 entry hiện là template).
- Y5. Thêm token accent IELTS đỏ (CONTEXT.md:134 nêu "IELTS: red") cho nhóm ielts-collocations/hiking — nếu duyệt, lấy giá trị từ token đỏ lesson đã có (#a13736) và ghi nhận trong DESIGN.md; mặc định đợt này nhóm IELTS dùng accent chủ đề catalogue (Vocabulary violet).

## 3. Hướng thiết kế đề xuất cho hệ giao diện trang phụ

**Nguyên tắc: một tòa nhà, nhiều phòng học.** Trang chủ là bàn học; 28 trang phụ là các phòng học trong cùng tòa nhà. Mỗi nhóm được đổi màu accent chủ đề, nhưng lớp xây dựng — giấy, mực, bo góc, vòng focus, band tiêu đề — là một. Đây chính là Open Door Rule (DESIGN.md:251) áp cho chiều ngược: lesson giữ quyền "đổi phòng", không giữ quyền "đổi tòa nhà".

### 3.1 Lớp dùng chung và thứ tự nạp CSS

Mọi trang phụ nạp theo thứ tự cố định, trước CSS riêng (nếu còn cần):

```html
<link rel="stylesheet" href="../assets/styles/tokens.css">
<link rel="stylesheet" href="../assets/styles/primitives.css">
<link rel="stylesheet" href="../assets/styles/learning.css">
<!-- CSS riêng của trang, chỉ phần còn thật sự riêng -->
```

- `tokens.css` (đã có: `--focus #b8883f`, `--text-primary #202e32`, `--surface #fffefa`, `--duration-interaction 220ms` kèm reduce-motion): bổ sung **thêm biến mới** họ `lesson-*` (lesson-paper/ink/muted/border/accent/soft/gold/danger) và `--font-lesson: system-ui,…` — chỉ additive, không đổi giá trị biến hiện có để 7 trang đang nạp không bị đổi hành vi.
- `primitives.css` (đã có rule `:focus-visible` 3px `var(--focus)` offset 3px — đúng fixHint của P3): thêm (a) media query `prefers-reduced-motion` tắt animation/transition cứng + `scroll-behavior: auto`; (b) class `.skip-link` (lấy pattern từ `index.html:18` và c1-vocabulary.css); (c) class `.visually-hidden` cho live region.
- `learning.css` (hiện chỉ 1 consumer: vocabulary-practice.html — rủi ro hồi quy thấp, kiểm riêng): thêm lớp chung mới mà không đụng selector hiện có: `.topline` (back-link + nhãn), variant band header, `.fact-pill`, `.live-status` (live region khối kết quả), `.icon-btn` (min-height/width 44px), nâng `#toast` trên cụm FAB.
- CSS riêng của trang còn lại chỉ chứa khác biệt có chủ đích của phòng học đó; mọi giá trị lặp lại dời về var(--…).

### 3.2 Header và topline chung

- Mỗi trang phụ có một **band tiêu đề phẳng** màu `#203b3a` (learning.css:1 đã định nghĩa `header` như vậy; khớp DESIGN.md:369 "full-bleed dark band #203b3a in the shared shell") chứa: topline `← English 101` → `../index.html` (mẫu toeic-600.html:17), tiêu đề ở scale lesson-display, một hàng fact-pill (số mục/chủ đề — **đếm động từ DATA, không ghi cứng**, khắc phục P9-copy).
- Skip-link "Bỏ qua tới nội dung" → `#main`, đặt đầu `<body>`.
- **Khi nhúng trong viewer:** lesson tự nhận biết bằng snippet chung nhỏ (`assets/learning/lesson-frame.js`: `window.top !== window.self` → thêm class `is-embedded` lên `<html>`) để ẩn band lesson, khỏi double chrome với viewer-bar (P8). Viewer giữ nguyên viewer-bar "← Thư viện" — lối về vẫn đảm bảo bằng một trong hai chrome, không bao giờ cả hai cùng hiện.
- Bài nhúng nhưng cần lối về: viewer-bar đã có; bài mở trực tiếp có topline. Không bài nào dead-end (khắc phục P1).

### 3.3 Ba layout mẫu

| Layout | Dành cho | Cấu trúc |
|---|---|---|
| **L1 — Bài đọc** | Blog/tu-biet, Writing/guide, phần tra cứu của bi-kip/suffix-lab/root-atlas | Band phẳng → cột đọc 860px (`.study` của learning.css) → mục lục/khối nội dung dạng card hairline → footer một dòng (về thư viện + ghi chú lưu cục bộ). Không hero gradient; dùng tint chủ đề cho blockquote/eyebrow |
| **L2 — Bài luyện có Activity** | conjunctions, prepositions, same-word, tense, five-forms, english-verbs, ielts-collocations, ielts_hiking, meaning-to-english, reading-translation, root-atlas (quiz), c1/toeic (quiz), vocabulary-practice/atlas (mode luyện) | Band → toolbar (tab/chip có aria-pressed + đếm kết quả live) → card `.study`: prompt clamp(27px,4vw,42px), choice full-width 10px radius, feedback block đúng/đ sai + giải thích, progress 5px teal, **một live region polite duy nhất cho khối kết quả** → footer |
| **L3 — Flashcard / ôn tập** | paraphrase-80, phrasal-verbs (tab flashcard), personal-flashcards, mode flashcard của atlas/vòng/toeic/c1 | Band → deck toolbar (shuffle/range có aria) → thẻ lật: `role="button"` + `tabindex="0"` + `aria-pressed`, mặt chưa hiển thị nhận `aria-hidden` động khi lật; Space/Enter lật qua dispatcher/session dùng chung; hết deck có trạng thái rỗng + nút học lại |

Ba layout chỉ là **mẫu hình CSS + pattern JS**, không phải khung bắt buộc từng pixel: trang giữ mật độ và hành vi riêng của mình (ví dụ c1-vocabulary glass, toeic-600 desk được giữ như bản sắc phòng học) miễn là neo đúng lớp token và hợp đồng tương tác.

### 3.4 Màu chủ đề theo nhóm

Accent chủ đề dùng ở tint nền block/dot/eyebrow và `*-ink` cho chữ đọc được trên tint; **accent hành động giữ study teal `#1c5b53`** của shell lesson; focus giữ Focus Gold `#b8883f` cố định (DESIGN.md:241). Bảng lấy từ DESIGN.md:222–229 và bảng semantic của CONTEXT.md:125–136:

| Nhóm trang | Accent | Ink đọc được | Tint |
|---|---|---|---|
| Vocabulary (mọi trang Vocabulary) | #6f5ac8 | #54429f | #efedf5 |
| Grammar | #1f8a63 | #13684b | #eaf1e8 |
| Writing | #b8467f | #8c2f5d | #faebeb |
| Verb | #b07a12 | #7c560c | #f7f0e3 |
| Guide | #3f6cc9 | #2b4f9c | #ebeff5 |
| Blog | #138397 | #0d6170 | #eaf1ee |

Ghi chú: CONTEXT.md liệt kê thêm IELTS đỏ — nhóm ielts-collocations/hiking thuộc category Vocabulary trong catalogue nên đợt này dùng violet (Y5 có phương án đỏ nếu duyệt). **Xung đột nhỏ giữa hai tài liệu hợp đồng màu:** CONTEXT.md:132 ghi "Writing: orange" trong khi DESIGN.md:226 chốt Writing · Magenta #b8467f — kế hoạch theo DESIGN.md (hệ đã ship trên trang chủ); khi nhóm P2.6 thực thi, cập nhật CONTEXT.md:132 trong một việc tài liệu nhỏ. Palette riêng chưa có chủ đích — ví dụ indigo tự chế của suffix-lab (P2) — không được công nhận là accent world: chỉ những accent đã ghi trong DESIGN.md được giữ, phần còn lại chuyển về hệ chung. Ngoại lệ đã có trong lớp dùng chung: pill `.pos` của learning.css:1 dùng gradient nhẹ + inset highlight — được làm phẳng ở P2.4 (consumer duy nhất là vocabulary-practice); ngoài trường hợp đã ghi này, không gradient trang trí mới nào được thêm vào lớp dùng chung.

### 3.5 Những gì BỎ

- Emoji làm icon điều khiển (🔊 ⚙ ▶ ✎ ◐ ▮ ■…) → thay SVG glyph hộp `0 0 24 24`, stroke 1.9 (DESIGN.md:326) hoặc nhãn chữ thuần nhất quán.
- Gradient trang trí nhiều lớp trên hero/band/card → band phẳng một màu theo token.
- Bóng resting alpha 8–22% → mức whisper `0 8px 26px rgba(32,59,58,.03)` hoặc chỉ viền 1px.
- `:root` palette tự chế + hex cứng → var(--…) của lớp chung; vòng focus tự chế dưới 3:1 → Focus Gold.
- Google Fonts riêng từng trang (Be Vietnam Pro, Nunito Sans, Fraunces+IBM Plex…) và webfont chết → system-ui Lesson Font (DESIGN.md:258) qua `--font-lesson`.
- Nhãn HOA toàn bộ tiếng Việt có dấu ("KIỂM TRA 5 DẠNG", "DANH TỪ") → sentence case, nhấn bằng font-weight (DESIGN.md:269).
- Khối CSS/JS chết (if(false) 159–249 dòng, 4,86KB CSS guide, Fraunces 5 rule chết, 2 `:root` trùng) → xóa.
- Ghi cứng số liệu/copy quảng cáo điều không có ("Ưu tiên Vòng 3" khi bộ chỉ có V1/V2) → đếm động từ DATA.
- Chuỗi UI tiếng Anh giữa UI tiếng Việt ("✓ Known", "Skip to content", `lang="en"`) → labels[locale] tiếng Việt, `lang="vi"`.

### 3.6 Những gì GIỮ

- Toàn bộ dữ liệu học, số mục, tên bài, thứ tự chương — trừ đúng các lỗi trùng/định dạng đã liệt kê P0.
- Bản sắc phòng học mạnh đã có chủ đích: c1-vocabulary (glass, skip-link, live region sẵn có), toeic-600 (desk, topline mẫu), root-atlas (header band + token đã khớp phần lõi) — chỉ neo về lớp chung, không phá layout.
- Action màu teal, feedback block đúng/sai, progress bar 5px, dialog gốc `<dialog>`, trợ giúp phát âm `assets/keyboard-pronunciation.js` (đã 11 trang nạp), cơ chế `?v=`, module `assets/learning/` + `assets/ui/`.
- Viewer-bar và hợp đồng viewer (DESIGN.md:198) — viewer chỉ sửa đúng 4 lỗi đã ghi ở batch P2.7.

### 3.7 Ràng buộc kỹ thuật chung

- Không framework, không build step, không dependency mới; JS theo mẫu IIFE namespace `English101Learning` hiện có.
- Văn bản lấy từ DATA/catalogue phải qua `escapeHTML` trước khi chèn (giữ pattern hiện có của các trang đạt).
- Giữ UTF-8 + dấu tiếng Việt; đặt Vietnamese copy line-height 1.6–1.65, không tightening tracking.
- Mọi module dùng chung thêm mới/bổ sung giữ backward-compatible; chạy `node --test tests/learning/*.test.js tests/catalogue.test.js` sau mỗi lần đụng `assets/learning/`.
- Motion 180–260ms qua `--duration-interaction`; reduced-motion tắt chuyển động; overlay dismissible + focus-safe + khôi phục cuộn.

## 4. Danh mục thành phần trang phụ và việc cần làm

| Thành phần | Hiện tại | Kế hoạch |
|---|---|---|
| Head/meta | 3 kiểu separator, 22/28 title không nhãn brand, c1-vocabulary thiếu `<title>`, 27/28 thiếu theme-color, personal-flashcards `lang="en"`, 6/28 có description | Quy ước `<Tên bài> · English101` + meta description 1 dòng + theme-color #203b3a + `lang="vi"`; sửa đồng loạt theo danh sách từ tools/ (hoặc tay theo bảng trong batch P2) |
| Skip-link | 3/28 có; 1 trang text tiếng Anh | Thêm cho mọi trang thiếu, text "Bỏ qua tới nội dung", target `#main`, class từ primitives.css |
| Topline / back-link | 23/28 dead-end | `.topline` "← English 101" theo mẫu toeic-600.html:17, cùng vị trí mọi nhóm; snippet `lesson-frame.js` ẩn band khi nhúng iframe |
| Band tiêu đề / hero | Gradient nhiều lớp (11/28) hoặc `:root` tự chế | Band phẳng #203b3a + lesson-display + fact-pill đếm động từ DATA |
| Token / nền trang | 13/28 không tokens.css, 19/28 `:root` inline, 57 hex cứng english-verbs | Nạp lớp chung; dời hex về var(--…); accent world nhóm ghi trong DESIGN.md |
| Vòng focus | 19/28 lệch/thiếu, contrast 1.88–2.38:1 | primitives.css `:focus-visible` 3px var(--focus); bỏ mọi override tự chế và `!important` đè màu |
| Nút / chip / tab / filter | `.active` chỉ đổi màu (15/28); nhãn HOA (8/28) | Nút chuẩn learning.css; `aria-pressed`/`aria-selected` trong tablist đúng APG; sentence case |
| Trường nhập (input/select/textarea) | 194 select same-word không label; placeholder-only; nút icon-only ⛶ ♫ ↑ | Cặp for/id hoặc aria-label tiếng Việt cho mọi control; nút icon-only bắt buộc aria-label |
| Khối Activity (prompt, choice, feedback, progress) | Mỗi trang một kiểu, feedback thiếu giải thích (10/28) | Layout L2: prompt clamp(27–42px), choice full-width, feedback block + giải thích ít nhất cho các cặp dễ nhầm, progress 5px teal |
| Khối kết quả động | innerHTML không live region (16/28) | Một live region `aria-live="polite"` cố định trong DOM, chỉ đổi nội dung; không gắn live lên từng feedback câu |
| Thẻ flashcard | Div chỉ click (3 trang); cả 2 mặt trong accessibility tree | `role="button"` + tabindex + `aria-pressed`; `aria-hidden` động lên mặt chưa hiện; lật được bằng Space/Enter |
| Bảng dữ liệu nhiều cột | Tràn ngang 390px (tense đo 923 vs 375) | Bọc `.tablewrap` overflow:auto (learning.css đã có) + tabindex + chỉ dẫn cuộn, hoặc stack thành danh sách ở breakpoint hẹp |
| Trợ giúp phát âm | 2 luồng utterance tự tạo lang/rate cứng; helper < 44px | `EnglishPronunciation` nhận override lang/rate per-call; utterance tự tạo chuyển sang helper; target ≥ 44px |
| Dialog | 4 trang có `<dialog>`, 2 tự quản showModal/focus | `createDialogController` + `aria-labelledby`/`aria-describedby`; Esc/backdrop đóng, focus trả về |
| Trạng thái rỗng | 3 trang thiếu (0 kết quả ẩn hết, pool rỗng im lặng) | Dòng "Không tìm thấy" + nút xóa lọc/tìm kiếm; pool rỗng có lý do + gợi ý chọn chủ đề khác |
| Tiến độ | 9 key thô; lưu theo index DOM; ghi mỗi giây/keystroke; 5 trang không guard | `createPersistence` + `migrateLegacy`; khóa ổn định theo id/slug + version; commit khi đổi trạng thái câu; debounce 150–300ms cho search/ghi chú; try/catch read/write |
| Cấu hình phiên (chọn phạm vi/chiều/số câu) | Div chỉ click được bằng chuột (english-verbs 15, confusing-words 3) | `<button type="button">` + `aria-pressed` + Enter/Space; kiểm bằng chỉ bàn phím |
| Footer | Một số trang không có | Một dòng: về thư viện + ghi chú "tiến độ lưu trên thiết bị" |
| Icon | Emoji 15/28 | SVG glyph hộp 0 0 24 24 stroke 1.9 theo hệ |
| Tiêu đề tab/head | Lệch chuẩn cả 28 | Bảng title/description thống nhất, sửa theo batch |

## 5. Phân batch công việc

Mức L theo AGENTS.md: sửa từng trang = L1 (L0 khi chỉ đụng dữ liệu), đụng file dùng chung = L2. Không batch nào trong đợt này là L3/L4 trừ khi người duyệt yêu cầu commit (L4 làm riêng sau khi batch ổn). Mỗi batch kết thúc bằng review scoped diff theo "Working sequence" bước 6 của AGENTS.md.

**Mốc 0 (cần duyệt trước khi thực thi):** (1) duyệt kế hoạch này; (2) xác nhận điều chỉnh nhóm Vocabulary khác ×9; (3) quyết định Y5 (accent IELTS đỏ) và việc viewer rời `style.css` legacy — Y1 (tách dataset) đã thực hiện ngoài kế hoạch ngày 14-11 (xem Pre-work ở Phạm vi); (4) chốt chuỗi `?v=` mới cho đợt bump; (5) chiến lược dedupe toeic-600: giữ 600 entry bằng thay thế-in-place (nội dung thay thế cần duyệt, làm qua generator `tools/build_toeic_600_data.py`) HOẶC xóa entry (khi đó đồng bộ `tests/learning/toeic-600-data.test.js` pin 600/ordinal, copy toeic-600.html:17, và quyết định riêng cho mô tả catalogue vì §8 cấm đụng documents.js); (6) cách biệt lập hóa đề five-forms (hiện từ loại/chữ cái đầu hoặc chấp nhận `alts`). Phần "3 câu trắc nghiệm chỉ còn 1 lựa chọn" KHÔNG cần Mốc 0 — đó là lỗi code `choicePool`, xử lý ở P0 mục 9.

### Batch P0 — Fix nhanh lỗi chặn và a11y nghiêm trọng (L0–L1, một trang một nhánh)

**Phạm vi file:** `assets/learning/vocabulary-rounds-app.js` (fix chặn, bề mặt dùng chung), `Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html`, `Verb/phrasal-verbs.html`, `Vocabulary/confusing-words.html`, `Vocabulary/vocabulary-atlas.html` (+ `ielts-vocabulary-focus.js`), `Vocabulary/ielts_hiking_collocations_full_with_dictation.html`, `Writing/meaning-to-english-pipeline-v1-6.html`, `Verb/english-verbs.html`, `Vocabulary/root-atlas.html`, `Grammar/tense-exercises-answer-key-quiz.html`, `Grammar/prepositions-theory-practice.html`, `Grammar/same-word-different-parts-of-speech.html`, `Verb/five-forms-of-verbs-with-3rd-person.html` (DATA đã tách ra `Verb/five-forms-of-verbs-with-3rd-person.data.js` ngày 14-11 — xem Pre-work Y1), `Vocabulary/ielts-collocations-topic-table-with-dictation.html` (DATA dòng 215), `Grammar/conjunctions-theory-practice.html`, `Grammar/english-suffix-lab.html`, `Vocabulary/toeic-600.js` (runtime, cho mục 9), `data/vocabulary/toeic-600.js` (dữ liệu — file GENERATED từ `tools/build_toeic_600_data.py`, sửa qua generator hoặc ghi chú regenerate), `tests/learning/toeic-600-data.test.js` (nếu chọn chiến lược xóa entry — xem mục 8a), và dữ liệu inline tương ứng (dataset five-forms/tense giờ nằm trong file `.data.js` đã tách — xem Pre-work Y1).

**Việc cụ thể (thứ tự khuyến nghị trong batch):**

1. **Crash phím 4 set Vòng + guard MCQ chưa chọn (L2-nhỏ):** (a) `vocabulary-rounds-app.js` getContext (:94-95) → `answered: state.session?.q?.answered` và `revealed: state.session?.q?.revealed` — optional chaining sau `q()` không cứu được vì `q()` (:39) tự deref `state.session`; (b) **guard MCQ chưa chọn**: chỉ mode `forward` không có ô gõ — mode `synonym` CÓ render `<input id="typed" aria-label="Từ phù hợp">` trong drawQuestion (luồng gõ tay của synonym đang chạy đúng qua `check()` :55, không được chặn oan) — nên `emptyInput` (:97) ở forward luôn false, Enter → SUBMIT → `check()` chấm `v=''` thành `grade(false)` và ghi lượt sai; guard = `q().mode==='forward' && !q().answered` trong getContext (KHÔNG sửa lõi `resolveKeyboardAction`: tests/learning/platform.test.js:65 pin `answered:false → 'SUBMIT'`). Kiểm Enter trên cả 4 set vong-1-2/3-4/5-6 và vocabulary-practice.
2. **Crash nút ∅ bi-kip:131 (L1):** optional chaining hoặc ẩn nút "Không dùng mạo từ (∅)" cho câu match — quiz match phải trả lời được hết mọi câu.
3. **Chặn lộ đáp án (L1 ×5):** phrasal-verbs — nút Nghe/phím L không đọc term ở chiều Nghĩa→Phrasal trước SUBMIT; confusing-words — `speak(item.w + item.en)` rẽ nhánh theo direction; vocabulary-atlas (`ielts-vocabulary-focus.js:89`) — tắt auto-pronounce ở reverse/listen/cloze trước khi trả lời; ielts_hiking (`ielts-hiking-modern.js` hint) — hint không hiển thị `w` ở chiều cần gõ; meaning-to-english (`:115`) — `span.blank` thay bằng placeholder + `aria-hidden`.
4. **Màn cấu hình operable (L1 ×2, severity high):** english-verbs `:190-243` (15 div) và confusing-words `:603-623` (3 div) → `<button type="button">` + `aria-pressed` + Enter/Space; đối chứng `#libTierRow` của chính confusing-words đã làm đúng.
5. **Guard Enter cho MCQ chưa trả lời (L1 ×2):** root-atlas và vocabulary-atlas mở rộng guard ô rỗng/MC chưa chọn trong getContext riêng của từng trang (hiện chỉ đọc `#typed`); phần runtime dùng chung 4 set Vòng nằm ở mục 1b.
6. **Guard storage (L1 ×5):** conjunctions save() (chết trước progress()), tense recordHistory TRƯỚC showStored trong `#check`, suffix-lab `:933` parse — bọc try/catch với fallback an toàn giống chiều đã guard trong cùng trang (đối chứng suffix-lab:935).
7. **Bảng tràn ngang (L1 ×3):** tense bọc `.tense-table` (min-width:850px) trong `.tablewrap` overflow:auto + tabindex + chỉ dẫn cuộn; prepositions và same-word stack bảng 3 cột ở breakpoint hẹp.
8. **Dữ liệu (L0, làm sau cùng trong batch vì cần bộ đếm):**
   - **8a — toeic-600:** số đo lại bằng node trong phiên hiệu đính trên `data/vocabulary/toeic-600.js`: **3 cặp entry trùng nguyên word+vietnamese+POS** (productive, register, constantly — mục tiêu dedupe), 5 nhóm trùng theo word (thêm express, basis — khác nghĩa, không dedupe), và **1 cặp khác từ cùng nhãn Việt** (location toeic-05-07 / position toeic-47-10, nhãn 'Vị trí') — cả 4 nhóm nhãn đều gây 2 lựa chọn trùng nhãn nếu rơi vào cùng một câu trắc nghiệm; xử lý phần trùng nhãn bằng bộ lọc nhãn ở mục 9 (bản ghi gốc '4 cặp trùng nguyên từ–nghĩa–POS' là đếm nhóm trùng nhãn, không phải entry). **Chiến lược chờ duyệt (Mốc 0):** giữ 600 entry bằng thay thế-in-place (nội dung mới, soạn qua generator `tools/build_toeic_600_data.py`) HOẶC xóa entry (khi đó phải đồng bộ `tests/learning/toeic-600-data.test.js` pin `entryCount: 600` + ordinal 1–600 ở :13,15,17-18, copy "600 mục · 10 nhóm chủ đề" ở toeic-600.html:17, và quyết định riêng cho mô tả catalogue data/documents.js:20 "600 từ theo 50 Lesson" vì §8 cấm đụng catalogue). File dữ liệu là file generated — không sửa tay mà không ghi chú regenerate.
   - **8b — five-forms (khử mơ hồ đề, KHÔNG dedupe/xóa):** đo node: 15 cặp prompt trùng nằm ở **trường vi** (thu thập, hướng dẫn, giữ…), 0 trùng trên mọi trường tiếng Anh; DATA 462 dòng (nay ở `Verb/five-forms-of-verbs-with-3rd-person.data.js`) chỉ có present/past/pp/ing/inf/vi/type/alts/third — **không có trường giải thích** nên quy tắc "giữ bản có giải thích" không áp dụng được, và xóa 15 dòng = mất từ thật, trái M1/§8. Chữa đúng: giữ đủ 462 mục, khi prompt vi trùng thì biệt lập hóa đề (hiện từ loại/chữ cái đầu của từ cần gọi) hoặc chấp nhận nhiều từ đồng nghĩa qua trường `alts` — quyết định chốt ở Mốc 0.
   - **8c — ielts-collocations:** bộ đếm "cloze-unmatched" **chưa tồn tại trong repo** (grep toàn repo chỉ khớp 2 file docs; tools/ chỉ có 5 script khác) → thêm deliverable: viết bộ đếm với định nghĩa tường minh "phrase không xuất hiện trong câu ví dụ của chính row". Auditor ghi 48 row nghi ngờ / 42 lỗi phrase + ~5 lỗi sentence theo phương pháp ground-truth (findings.md:2448); heuristic khác cho kết quả khác (đo trong phiên: 34/411 kiểu fragment) nên con số chốt khi chạy bộ đếm. Chữa cả ~5 lỗi cột sentence, không chỉ cột phrase. Trùng lặp: **19 phrase trùng khi chuẩn hóa case/khoảng trắng** (17 exact — đo node), 0 trùng trong cùng chủ đề.
   - **8d — còn lại:** phrasal-verbs 'Tiếp tục'×3; confusing-words 16 nhóm promptMain trùng; tense 'an story' → 'a story' + chuỗi 'I ..... ...(look)'.
9. **Lỗi CODE pool distractor toeic-600 (L1, không đụng nội dung):** `choicePool` (Vocabulary/toeic-600.js:179-180) lọc distractor theo `partOfSpeech` chính xác từng ký tự; đo node trong phiên: phân bố POS {v:229, n:240, adj:81, adv:39, 'phr.v.':3, 'v/n':1, 'n/v':3, 'phr.v':2, prep:1, 'n.phr':1} → đúng 3 entry pool=0 (follow up v/n, due to prep, escort n.phr) và 8 entry pool≤2 (bring in, come up with, look forward to, refund, bring up, lease, mix, pick up). Fix theo gợi ý của findings #30, dùng entry hiện có (sampling runtime — M1 bảo vệ dữ liệu bài, không phải thuật toán chọn): (a) fallback nhóm POS tương đương — gộp phr.v./phr.v, n.phr→n, v/n và n/v dùng cả hai từ loại gốc; (b) loại ứng candidate có vietnamese trùng nhãn với entry (khắc phục luôn 4 nhóm 2 lựa chọn trùng nhãn ở mục 8a); (c) fallback pool toàn bộ entries khi vẫn <3. Không "rút câu khỏi pool quiz" — phương án này làm giảm phạm vi luyện tập.

**Rủi ro:** dedupe đổi số/thứ tự câu có thể làm key lưu theo index (conjunctions/prepositions/same-word lưu theo index DOM) gán nhầm — quy tắc: trong P0 không đảo/xóa phần tử của trang lưu theo index DOM (4 trang đó chuyển khóa ổn định ở batch nhóm trước khi dedupe sâu); toeic-600 xóa entry đụng test pin 600/ordinal và copy ":17" (nên ưu tiên thay thế-in-place nếu được duyệt soạn); five-forms tuyệt đối không xóa dòng; fix guard MC có thể đổi hành vi Enter hiện có — thử cả luồng đúng lẫn luồng chưa trả lời.

**Tiêu chí nghiệm thu đo được:**

- 4 set Vòng: nhấn Enter/mũi tên ở màn setup và trong phiên → console 0 TypeError, phím được điều phối.
- 4 set Vòng: mode forward (Anh→Việt chọn nghĩa) — Enter khi chưa chọn → không ghi lượt, không chuyển câu, không hiện khối "Cần ôn lại"; mode synonym — Enter với ô gõ có chữ vẫn chấm bình thường (không bị guard mới chặn oan).
- bi-kip quiz match: trả lời được câu có nút ∅, không crash.
- 5 trang lộ đáp án: chơi 1 lượt mỗi chiều — nút Nghe/hint/tự phát âm không đọc/hiện đáp án trước SUBMIT; span.blank không chứa đáp án trong DOM.
- english-verbs + confusing-words: Tab tới được mọi lựa chọn cấu hình, Enter/Space đổi lựa chọn, `aria-pressed` đúng.
- Node/grep: 0 entry trùng nguyên từ–nghĩa–POS trong toeic-600 (3 cặp đã xử lý theo chiến lược được duyệt; giữ 600 entry và test `node --test tests/learning/toeic-600-data.test.js` vẫn đạt); toeic-600 chạy vòng trắc nghiệm trên 11 entry pool=0/pool≤2 đã đo (follow up, due to, escort + 8 entry) → mọi câu có ≥3 lựa chọn phân biệt nhãn; five-forms giữ đủ 462 mục và 15 nhóm đề mơ hồ được biệt lập hóa; confusing-words 16 nhóm + phrasal-verbs 'Tiếp tục'×3 đã xử lý; bộ đếm khoảng trắng ielts-collocations (định nghĩa như mục 8c) chạy được và kết quả ghi số cụ thể — mục tiêu 0 lỗi phrase + ~5 lỗi sentence nếu duyệt chữa đủ; grep 'an story' tense = 0.
- tense ở 390px: `document.documentElement.scrollWidth === clientWidth`.
- 5 trang storage: mô phỏng localStorage chặn/giá trị hỏng → vòng chấm vẫn chạy, feedback hiện, có ghi chú tiến độ không lưu.

### Batch P1 — Hệ giao diện dùng chung (L2)

**Phạm vi file:** `assets/styles/tokens.css`, `assets/styles/primitives.css`, `assets/styles/learning.css`, `assets/learning/keyboard.js`, file mới `assets/learning/lesson-frame.js`, bảng quy ước cache-bust (ghi trong file này hoặc README phần thực thi).

**Việc cụ thể:**

1. `tokens.css`: bổ sung biến mới họ `lesson-*` (paper #fffefa, canvas #f2f0ea, ink #202e32, muted #56676b, border #cfd7d1, accent #1c5b53, soft #e3eee8, gold #966027, danger #a13736) + `--font-lesson`. Chỉ additive; giá trị lấy từ DESIGN.md:26–35 và learning.css:1 (đã đọc trong phiên) — không đổi biến hiện có.
2. `primitives.css`: thêm media `prefers-reduced-motion` (duration ~0ms, `scroll-behavior: auto`), `.skip-link`, `.visually-hidden`.
3. `learning.css`: thêm `.topline`, band variant + `.fact-pill`, `.live-status`, `.icon-btn` (≥44px), nâng `#toast` trên FAB — không sửa selector hiện có (ngoại lệ duy nhất: `.pos` làm phẳng ở P2.4, consumer duy nhất của learning.css).
4. `keyboard.js`: IME (`composing` — :10), ô rỗng (`emptyInput` — :17) và answered-trước-NEXT (:19) **đã có sẵn** (đối chiếu code trong phiên hiệu đính); việc còn thiếu chỉ là: (a) nhận `keyCode 229` như composing (dispatcher hiện chỉ đọc `event.isComposing` ở :35); (b) trạng thái MC-chưa-chọn — qua **getContext/dispatcher context của trang**, không sửa lõi `resolveKeyboardAction` vì tests/learning/platform.test.js:65 pin `answered:false → 'SUBMIT'`. Backward compatible (chỉ siết thêm); thêm test cho 2 guard mới vào `tests/learning/platform.test.js` trong cùng batch; chạy `node --test tests/learning/*.test.js` và thử từng Activity của consumer.
5. `lesson-frame.js` (mới, có 23 consumer thật nên đạt invariant "second real consumer"): nhận biết iframe → `is-embedded`; các batch P2 gắn 1 dòng script này vào từng trang.
6. Quy ước cache-bust: một chuỗi version duy nhất mỗi file dùng chung; bump đồng loạt khi đụng file trong batch P2 (media-helper đang 2 phiên bản: '?v=20260916-p2' ×4 trang, '?v=20260916' ×2 trang → về 1).

**Consumer cần kiểm (L2):** **9 trang nạp `learning/keyboard.js`** (grep trong phiên hiệu đính: `Verb/paraphrase-80-flashcards.html`, `Verb/phrasal-verbs.html`, `Vocabulary/ielts-collocations-topic-table-with-dictation.html`, `Vocabulary/ielts_hiking_collocations_full_with_dictation.html`, `Vocabulary/personal-flashcards.html`, `Vocabulary/root-atlas.html`, `Vocabulary/toeic-600.html`, `Vocabulary/vocabulary-atlas.html`, `Vocabulary/vocabulary-practice.html`); 7 trang nạp tokens.css (`paraphrase-80`, `phrasal-verbs`, `ielts-collocations`, `ielts_hiking`, `root-atlas`, `vocabulary-practice`, `vocabulary-atlas` — grep xác nhận trong phiên); vocabulary-practice.html (consumer duy nhất của learning.css); 4 set Vòng qua runtime chung; `index.html` + `viewer.html` (chỉ kiểm không phá).

**Rủi ro:** learning.css/tokens.css dùng chung — mọi bổ sung phải additive và kiểm hồi quy 7 trang trên; guard keyboard.js siết thêm có thể làm trang từng chạy "được" nay bị chấm khác — cân nhắc từng Activity và ghi vào kết quả batch.

**Tiêu chí nghiệm thu đo được:**

- `node --test tests/learning/*.test.js tests/catalogue.test.js` đạt.
- 7 trang nạp tokens.css: screenshot trước/sau 1440 + 390 không đổi bố cục (additive check).
- Bật `prefers-reduced-motion: reduce` (Playwright emulate) trên 1 trang dùng chung: mọi transition computed ≈ 0ms, cuộn không smooth.
- `.topline` + skip-link render đúng trên 1 trang mẫu mỗi layout L1/L2/L3.
- Grep: không selector hiện có nào của learning.css bị sửa giá trị trong P1 (diff chỉ thêm; ngoại lệ `.pos` nằm ở P2.4 và được kiểm riêng).

### Batch P2 — Redesign từng nhóm trang (L1 mỗi trang; đụng lớp chung chỉ khi gắn class mới)

Thứ tự khuyến nghị cả đợt: **P0 → P1 → P2.4 → P2.2 → P2.3 → P2.5 → P2.6 → P2.1 → P2.7**. Lý do: nhóm Vòng (P2.4) hưởng ngay fix P0/P1 trên runtime dùng chung 1 thay 5 trang; Grammar nhiều lỗi hệ nhất và nền shell learning phù hợp nhất; viewer cuối vì cần các lesson đã có `lesson-frame.js` để kiểm double chrome thật.

#### P2.1 — Blog ×1: `Blog/tu-biet-den-dung-duoc.html`

- **Việc:** dời 7 biến `:root` tự chế về token; eyebrow coral 2.70:1 → coral-strong #a8401d; link về trang chủ 3.74:1 → đậm đạt AA; thời gian đọc tính từ nội dung thật (~434 từ ≈ 2 phút, không phóng đại); Cambria → `--font-lesson`; nhãn "Bài mở đầu" bỏ hoặc đổi cho đúng (Blog chỉ có 1 bài); focus ring theo token; layout mẫu L1.
- **Rủi ro:** thấp — trang tĩnh không JS (grep `<script` = 0 theo audit).
- **Nghiệm thu:** contrast mọi chữ nhấn ≥ 4.5:1 (đo); 360px scrollWidth = clientWidth; topline + skip-link + theme-color có; console sạch.

#### P2.2 — Grammar ×6: bi-kip, conjunctions, english-suffix-lab, prepositions, same-word, tense

- **Việc:** nạp lớp token (hiện 0/6 nạp tokens.css theo ma trận sharedAssets trống); band phẳng thay gradient/`:root` tự chế (tense gradient #102a43→#155eef bỏ); `.topline` + skip-link (6/6 hiện dead-end); **migrate keydown tự viết → dispatcher**: bi-kip:139+149, suffix-lab:1014, tense:216; **nối dispatcher mới** cho conjunctions/prepositions (hiện không keydown nào — thiếu hẳn handler Enter) và same-word; live region cho khối kết quả (7 trang grep = 0 gồm conjunctions/prepositions/same-word/tense/suffix-lab); `aria-pressed` cho chip/tab; label for/id cho mọi select (194 select same-word); key localStorage → `createPersistence` + `migrateLegacy` ('conjunction-progress', 'prep-progress', 'pos-progress', 'suffixLabProgressV2'+'suffixLabKnownV1', 'tenseQuizHistoryV1', 'bi-kip-grammar-v2') và chuyển khóa lưu theo index DOM sang khóa ổn định theo câu + version (conjunctions 258 blanks, prepositions 308, same-word 194 select); same-word/prepositions: reveal không tính vào progress; feedback sai giải thích: thêm trường ngắn cho các cặp dễ nhầm (prepositions 245 câu chỉ 2 trường; conjunctions 142/234 không note; tense 145/198 rỗng; bi-kip 31/31 match lặp đề — nội dung sửa tối thiểu theo fixHint, không viết lại bài); emoji icon suffix-lab (7 nút nav) → SVG; nhãn HOA suffix-lab trong đề → sentence case; tense: chú thích quy ước câu 2 chỗ trống dấu '/' (7 câu).
- **Rủi ro:** đổi khóa lưu theo câu là migration — phải đọc key cũ, khớp được thì giữ, không khớp thì bỏ qua an toàn (theo fixHint P7); migrate keydown có thể đổi hành vi Enter hiện đúng của bi-kip (audit ghi đạt IME) — giữ nguyên hành vi, chỉ chuyển executor.
- **Nghiệm thu:** mỗi trang: Enter submit→reveal→continue đúng hợp đồng (test bằng tay liệt kê scenario); reload giữ tiến độ (key cũ và mới); live region thông báo kết quả (kiểm screen reader hoặc `aria-live` có trong DOM và đổi text); 390px không tràn; contrast focus ≥ 3:1; dedupe conjunctions 3 prompt trùng đã xử lý (P0 chung).

#### P2.3 — Verb ×4: english-verbs, five-forms, paraphrase-80, phrasal-verbs

- **Việc:** english-verbs: dời 57 hex cứng, bỏ theme tối chết, gradient/bóng → token; dispatcher (:641+918); live region; nút tab expose active; **chấm điểm siết về nguyên từ theo ranh giới từ** ('n' → ĐÚNG hiện tại); five-forms: bỏ 2 `:root` + webfont Nunito → `--font-lesson`; dispatcher (:287+322, giữ IME guard hiện đạt); topline (grep `<a ` = 0); bóng 0 10px 28px .14 → whisper; nhãn HOA 8 nút → sentence case; paraphrase-80 + phrasal-verbs: **một `createFlashSession` cho cả deck**, dispatch NEXT/PREVIOUS/RATE (hiện gọi lại sau mỗi thao tác, attempts/ratings bị vứt — paraphrase-80:356, phrasal-verbs:529); flashcard div → operable (paraphrase-80:418, phrasal-verbs:551); phrasal-verbs: bỏ cặp font Fraunces/IBM Plex (đang nạp tokens.css mà không dùng biến nào); nhãn HOA h1/tab; tab flashcard rò rỉ ngữ cảnh bàn phím chính tả (finding bổ sung của audit) — gate theo tab active.
- **Rủi ro:** siết bộ chấm english-verbs/phrasal-verbs làm tỉ lệ đúng của tiến độ cũ khác trước — cân nhắc ghi version vào key khi đổi bộ chấm; flashcard operable phải giữ hành vi chuột/swipe.
- **Nghiệm thu:** node script: 'n' và chuỗi 1 ký tự không còn PASS; flashcard lật được bằng bàn phím, SR chỉ nghe mặt đang hiển thị; session attempts/ratings đếm đúng sau 3 lượt next (đọc state); contrast nút đánh giá ≥ 4.5:1 (paraphrase-80 4.28:1, 3.55:1 hiện tại); topline về index có mặt 4/4.

#### P2.4 — Vocabulary nhóm Vòng 1–6 ×5: vong-1-2, vong-3-4, vong-5-6, tu-vung-vong-1-6-rut-gon-luyen-viet, vocabulary-practice

- **Việc:** 4 trang redirect stub (3 nén 1 dòng + 1 stub 17 dòng): sửa đoạn dự phòng theo lời người học + link về `index.html` (vong-5-6:5 hiện dead-end dự phòng, thuật ngữ 'runtime chung'); vocabulary-practice (shell thật): `.topline` + skip-link; live region + `aria-pressed` (qua app.js dùng chung — đã fix P0); **copy đếm động từ DATA thay số ghi cứng của MỘT set trong runtime dùng chung 4 set** (app.js:34 'Giữ 4.205 dòng dữ liệu…36 chủ đề' đúng cho vong-3-4 — pin tại tests/learning/vocabulary-rounds.test.js:9 — nhưng sai cho vong-1-2 1299/29 và vong-5-6 1280/44, pin :8,:10; không được "sửa" copy thành số của một set khác) và bỏ lời hứa 'Ưu tiên Vòng 3' (:34) khi bộ chỉ có V1/V2; màn hình đầu tĩnh: thêm trạng thái đang tải + `<noscript>`; emoji 🔊/♫ → SVG + aria-label; nút icon-only `#fullDetail` ⛶ (vocabulary-practice.html:6, không có aria-label — atlas đã có `aria-label="Phóng to"` làm mẫu) thêm aria-label; gradient/bóng skin → token; skin `ielts-vocabulary-focus.css`: skin chỉ được **2 trang** nạp (vocabulary-practice.html — shell của 4 set Vòng — và vocabulary-atlas.html); selector ẩn hiện toàn cục (css:4-6: header p/.emblem/.stats/footer, nav data-tab synonyms/progress/audit/guide, .filters details) → chuyển thành selector có body class theo set (class đã có sẵn từ bootstrap:73 — xem S5), mở lại '≋ Đồng nghĩa', '⌁ Tiến độ', .filters details; cache-bust cho skin/css/js (đang thiếu '?v='); hai nút fixed ⚙/Tập trung gom thành hàng flex có gap (đo chồng 36×36px z-index 1000 hiện tại); toast đáy nâng lên trên FAB; **bỏ gradient trang trí của `.pos`** trong learning.css:1 (`linear-gradient(135deg,#eaf4ef,#dfeee6)` + inset highlight) về phẳng study-soft — vocabulary-practice là consumer duy nhất của learning.css nên rủi ro hồi quy thấp.
- **Rủi ro:** app.js dùng chung 4 set — mọi sửa phải thử cả 4 set; mở lại tab đã ẩn làm lộ chức năng chưa được audit kỹ (Tiến độ/Hướng dẫn) — kiểm luồng xuất/nhập tiến độ trước khi mở.
- **Nghiệm thu:** 4 stub: redirect thành công + fallback có link về thư viện hoạt động; vocabulary-practice: Enter ở màn setup không lỗi console; copy số liệu = node count(DATA) đúng từng set; tab Đồng nghĩa/Tiến độ nhìn thấy và hoạt động; 360px không có phần tử fixed đè nhau (đo hình chữ nhật giao nhau).

#### P2.5 — Vocabulary khác ×9: c1-vocabulary, confusing-words, ielts-collocations, ielts_hiking, personal-flashcards, root-atlas, toeic-600, vocabulary-atlas, vocabulary-reading-translation-v1-6

- **Việc:** c1-vocabulary: thêm `<title>` (duy nhất trong 30 trang thiếu), chuỗi render động tiếng Anh → `labels[locale]`, `aria-label` tiếng Việt, `applyLocale` cập nhật `documentElement.lang`, en-GB cứng rate .84 → helper nhận override, dialog → `createDialogController`; confusing-words: 2 `:root` → 1 bộ token, Fraunces 5 rule chết bỏ, speak rẽ nhánh chiều (P0), `aria-selected` trên button không role → `aria-pressed` hoặc tablist đúng APG (:556), 3 div cấu hình → button (P0); ielts-collocations + hiking: emoji → SVG, ô đáp án `#qAnswer` + select/input có accessible name (6 select + 3 input / 4 select), skin → token layer (đang nạp tokens.css), phần giải thích thêm cho cụm dễ nhầm (19 phrase trùng chuẩn hóa / 17 exact — xử lý ở P0 8c); personal-flashcards: `lang="vi"` + mọi chuỗi Anh cứng (~15 chuỗi) qua labels, "Show answer" → phản hồi trung tính không nhãn Incorrect đỏ + không tính attempt (qua personal-flashcards.js dispatch SUBMIT assisted), 2 dialog → controller, 7/8 script thêm `?v=`, helper phát âm ≥44px + bottom-sheet dưới breakpoint sheet; root-atlas: pool nhiễu spect/vid-vis tách, copy 'tệp bạn gửi'/'bản gửi đã được sửa' → lời người học ('danh sách gốc từ phổ biến, đối chiếu Etymonline'), palette/focus/type dời nốt về token đã nạp, save+render mỗi phím → debounce; toeic-600: usageNote viết lại nhóm liên quan lỗi/dedupe (236/600 template — phần còn lại là Y4), live region `#count`, tablist ARIA đúng pattern + giữ focus khi toggle, media bổ sung imageQuery, Enter 'Đã nhớ' quảng bá rõ hoặc bỏ; vocabulary-atlas: FAB/toast 360 (unconfirmed — đo khi thực thi), dispatcher Enter MCQ, 8 badge HOA → sentence case, skin ẩn 2 tab → theo body class; vocabulary-reading-translation: trang có đúng 1 keydown (input-scoped :417, Enter có guard isComposing/repeat — giữ nguyên, không cần migrate dispatcher); nối luồng Enter/continue cho 12 bài biên tập ngoài tab coverage (handler phím 1–4 toàn cục thuộc pipeline — xem P2.6); 🔊 double-handler 4 nút (:412/:415) → 1 handler qua helper; key 'reading-translation-v1-6-completed' → `createPersistence` + khóa theo id bài; nhãn '✓ Đã học' hiện ngay trên bài vừa xong; tab 'Phủ kín toàn bộ Vòng 1–6' chết oan → ẩn hoặc nối đúng dataset bootstrap; live region cho khối kết quả.
- **Rủi ro:** nhóm lớn nhất và nhiều engine riêng nhất — mỗi trang là một nhánh L1 độc lập, làm lần lượt từng trang, không batch gộp diff; personal-flashcards dùng IndexedDB `english101-learning` — không đụng schema; skin IELTS có chủ đích về màu — chỉ neo token, không redesign tổng thể (giữ "IELTS desk" nếu người duyệt muốn).
- **Nghiệm thu:** mỗi trang: 0 lỗi console khi tải + luồng chính; mọi select/input/nút icon-only có accessible name (grep for=/aria-label = đủ số); lang="vi" và UI không còn chuỗi Anh cứng (grep '✓ Known|Skip to content' = 0); live region khối kết quả có; 390px không tràn; key cũ đọc được sau migration (thử preset localStorage giá trị cũ → tiến độ hiện).

#### P2.6 — Writing ×2: guide.html, meaning-to-english-pipeline-v1-6.html

- **Việc:** guide: dời palette 'đảo' tự chế về token layer, hero gradient → band phẳng, 4,86KB CSS chết (26 class) xóa, placeholder `\n\n` đen sửa, live region cho kết quả phân tích, reduced-motion guard, topline (mở trực tiếp bị kẹt); key 'essay-lab-v1:*' → `createPersistence` (giữ tiền tố per-essay); meaning-to-english: Enter không isComposing + chiếm nút đánh giá/summary → dispatcher; phím 1–4 toàn cục chiếm ô tìm kiếm → guard focus (finding mới verified); span.blank (P0); dataset 1,33MB đã tách ra `meaning-to-english-pipeline-v1-6.data.js` (pre-work 14-11, biến `RAW_ITEMS` giờ nằm ở file data); copy hero 7.419 vs RAW_ITEMS 6.784 → đếm động; nhãn 'Đáp án' mode forward hiển thị đúng nghĩa (không hiển thị chính chữ trong đề).
- **Rủi ro:** pipeline là trang lớn nhất (1,46MB) — mọi sửa JS cẩn thận không đụng makeCloze ngoài scope; dataset đã tách (pre-work 14-11) — đụng data thì sửa file `.data.js`, không dán lại vào HTML.
- **Nghiệm thu:** Enter tại ô tìm kiếm không kích hoạt đánh giá; 1–4 khi focus trong ô tìm kiếm chỉ gõ chữ; node đếm RAW_ITEMS khớp copy hiển thị; guide: grep class chết = 0, placeholder hiển thị đúng; key essay cũ đọc được.

#### P2.7 — viewer ×1: viewer.html (+ viewer.js khi liên quan)

- **Việc (đúng 4 lỗi đã ghi, không redesign tổng thể — hợp đồng viewer giữ hành vi hiện có theo DESIGN.md:198):** chuyển stylesheet legacy `style.css` (viewer.html:5 — grep toàn repo chỉ khớp đây) sang token/home.css hoặc tách phần viewer cần thiết; thống nhất theme-color một giá trị (hiện #0b1220 vs #0b1013 của index, lệch cả `--navy #131416` của viewer-bar); `.viewer-actions` tràn thanh 64px ở ≤720px (ảnh hưởng 'Tải xuống' của 3 PDF) → xếp lại hàng; link '←' viewer-back 13px → target ≥ 44px; thêm `?v=` cho 3 file không version; sau khi lesson có `is-embedded` (P1), kiểm double chrome hết.
- **Rủi ro:** đụng khung catalogue — 29/29 đường dẫn catalogue phải còn mở đúng (kiểm filesystem loop như audit); đổi stylesheet có thể đổi chroma viewer — so ảnh trước/sau.
- **Nghiệm thu:** `viewer.html?id=toeic-600` và `viewer.html?id=deep-reading` hiển thị đúng trước/sau (so ảnh); lỗi ?id= có overlay + link về thư viện; 390px: hàng action không tràn; 29 path catalogue tồn tại.

### Bảng ánh xạ P1–P10 → batch

| Vấn đề | Batch xử lý chính | Ghi chú |
|---|---|---|
| P1 Dead-end 23 trang | P1 (class `.topline`) + P2.1–P2.6 (gắn từng nhóm) | viewer có sẵn viewer-bar; stub Vòng sửa fallback |
| P2 Token phân mảnh | P1 (bổ sung biến) + P2 mọi nhóm (nạp + dời hex) | accent world ghi DESIGN.md sau mỗi nhóm |
| P3 Focus ring | P1 (primitives đã có rule; thêm guard) + P2 (bỏ override/`!important`) | tái đo contrast khi thực thi (finding unconfirmed) |
| P4 Gradient/bóng | P2.2, P2.3, P2.4, P2.5, P2.6 | chuẩn whisper + band phẳng |
| P5 A11y trạng thái/điều khiển | P0 (div cấu hình ×2) + P1 (pattern live/aria class) + P2 mọi nhóm | tap target trong P2.5 (helper) và P1 (`.icon-btn`) |
| P6 Hợp đồng tương tác | P0 (guard nhanh, lộ đáp án ×5) + P1 (keyboard.js guard) + P2 (migrate dispatcher, feedback giải thích, chấm siết) | trong nhóm tương ứng từng trang |
| P7 Tiến độ/bền | P0 (guard try/catch, crash app.js) + P2.2/P2.5/P2.6 (`createPersistence`, khóa ổn định, debounce) | migration đọc key cũ bắt buộc |
| P8 Tái sử dụng/vệ sinh | P1 (guard, cache-bust, lesson-frame.js) + P2 (migrate keydown/engine, xóa CSS chết) | dataset inline đã tách (pre-work Y1, 14-11) |
| P9 Nội dung/copy | P0 (dedupe + định dạng) + P2 (copy đếm động, provenance, HOA, title) | giữ nguyên nội dung ngoài danh sách lỗi |
| P10 Bố cục/thiết bị | P0 (bảng tràn ×3) + P2.4/P2.5 (FAB, emoji, font) + P2.7 (viewer) | theme-color trong head/meta bảng thành phần |

## 6. Trạng thái cần thiết kế

| Khu vực | Bình thường | Rỗng | Lỗi / biên |
|---|---|---|---|
| Topline / back-link | "← English 101" + nhãn bài, vị trí cố định mọi nhóm | — | Nhúng iframe → band lesson ẩn (`is-embedded`), viewer-bar đảm nhiệm lối về; storage chặn không ảnh hưởng |
| Khối kết quả chấm (live region) | "Đúng rồi" / "Chưa đúng — đáp án X vì…" + giải thích ngắn | Trước khi chấm: trống, không chiếm chỗ | Storage chặn → vẫn chấm, ghi chú "tiến độ không lưu được"; feedback không bao giờ chỉ có màu |
| Thẻ flashcard | Mặt trước hiển thị; mặt sau `aria-hidden` | Hết deck → "Bạn đã hết thẻ" + nút học lại | Focus rời thẻ không mất trạng thái; Space/Enter lật, không kích hoạt control khác |
| Tìm kiếm / lọc | Đếm kết quả qua live region | "Không tìm thấy…" + nút xóa tìm kiếm/lọc | Gõ không dấu vẫn khớp (giữ normalize NFD hiện có) |
| Pool phiên | Đếm mục/chủ đề động từ DATA | Pool rỗng → thông báo lý do + gợi ý chọn chủ đề/dạng khác (không im lặng) | IME đang gõ → Enter không submit |
| Tiến độ | Lưu khi grade/next/pause/visibilitychange; hiển thị n/N | Chưa có dữ liệu → 0 và không hiển thị lỗi | Key cũ không khớp version → bỏ qua an toàn; localStorage chặn → ghi chú rõ, trang chạy |
| Dialog | Mở bằng nút; Esc/backdrop đóng; focus trả về nút mở; body không cuộn | — | Nội dung hỏng → đóng an toàn, không kẹt focus |
| Pronunciation helper | 2 nút ≥44px góc phải-dưới; popover 300px | speechSynthesis thiếu → nút ẩn/State "không có giọng đọc" | Gate theo chiều bài: không đọc đáp án trước khi trả lời |
| Reduced motion | Motion 180–260ms qua `--duration-interaction` | — | `prefers-reduced-motion` → ~0ms, cuộn auto, không lật/vuốt động |
| Redirect stub Vòng | Chuyển trang tức thì | — | Redirect thất bại → câu chữ người học + link "Mở Vocabulary Atlas"/về thư viện |

## 7. Tiêu chí nghiệm thu (đo được) cho cả đợt

Áp cho **từng trang trong 28** (checklist một trang ~15–20 phút bằng Playwright + grep + node):

1. **Không tràn ngang:** 360px và 390px: `document.documentElement.scrollWidth === clientWidth`; không phần tử `position: fixed/sticky` có hình chữ nhật giao nhau với nút hành động chính hoặc footer (đo bằng `getBoundingClientRect`).
2. **Enter đúng hợp đồng:** với mỗi Activity chính của trang: (a) ô rỗng/MC chưa chọn → Enter không chấm, không âm thầm qua câu; (b) IME composing → không submit; (c) sau khi kết quả hiện → Enter sang câu tiếp; (d) Shift+Enter trong textarea xuống dòng. Ghi scenario từng trang vào kết quả batch.
3. **Focus nhìn thấy:** mọi control Tab tới được và có ring `:focus-visible` 3px `var(--focus)`; không control nào mất focus sau toggle; tap target ≥ 44px với nút fixed/icon-only.
4. **Lối về:** trang có link về `../index.html` (topline) hoặc đang nhúng viewer có viewer-bar; skip-link có và hoạt động; `<title>` dạng "Tên bài · English101".
5. **Console sạch:** tải trang + chạy luồng chính (setup → luyện 3 câu → kết thúc) = 0 lỗi, 0 warning JS.
6. **Dùng đúng token:** nạp đủ `tokens.css` + `primitives.css` (+ `learning.css` với nhóm Activity); grep `:root` inline tự chế = 0 ngoài lớp chung; không hex cứng mới; focus không bị đè màu tự chế.
7. **A11y trạng thái:** live region `aria-live="polite"` cho khối kết quả; `aria-pressed`/`aria-selected` cho mọi trạng thái chọn; mọi input/select/nút icon-only có accessible name; `lang="vi"` và không chuỗi UI Anh cứng.
8. **Tiến độ:** set tiến độ cũ (key hiện có) → reload → tiến độ còn; storage chặn (mô phỏng) → trang vẫn chấm, có ghi chú; nếu đổi cách lưu, migrate được chứng minh bằng 1 preset key cũ.
9. **Nội dung:** node count khớp copy hiển thị; 0 prompt trùng chưa xử lý — five-forms giữ đủ 462 mục với 15 nhóm đề mơ hồ đã biệt lập hóa (kiểm: đề hiển thị yếu tố phân biệt — từ loại/chữ cái đầu — cho đúng 15 nhóm đã đo); 0 lỗi định dạng còn lại theo bộ đếm mục 8c P0 (phrase + sentence), grep mạo từ; toeic-600 mọi câu trắc nghiệm có ≥3 lựa chọn phân biệt nhãn.
10. **Hồi quy dùng chung:** `node --test tests/learning/*.test.js tests/catalogue.test.js` đạt; 7 trang nạp tokens.css không đổi bố cục; `viewer.html?id=toeic-600` và `?id=deep-reading` so ảnh trước/sau không lệch ngoài phần đã sửa.
11. **Reduced motion:** bật `prefers-reduced-motion` → mọi chuyển động ~0ms, không scroll smooth.
12. **Diff scoped:** mỗi batch chỉ chứa file trong phạm vi đã khai báo; không thay đổi ngoài danh sách (review theo AGENTS.md bước 6).

## 8. Không làm trong đợt này

- **Viết lại nội dung học** ngoài đúng các lỗi dữ liệu đã liệt kê (entry trùng thật, distractor trùng nhãn, lỗi khoảng trắng, 'an story', giải thích rỗng cho các cặp dễ nhầm) và các nội dung thay thế được duyệt riêng ở Mốc 0 (5): không soạn lại bài, không thêm/bớt chương, không đổi số mục chủ đích (five-forms giữ đủ 462); fix `choicePool` ở P0 mục 9 là code, không phải nội dung.
- **Đổi catalogue** `data/documents.js`, Resource ID, đường dẫn, tên file, casing — kể cả khi title trang lệch catalogue (sửa title của trang, không sửa catalogue).
- **Đổi `index.html`** và bất kỳ phần nào đã ship của trang chủ (`home.css`, `home-icons.js`, `script.js`).
- **Migration sâu toàn hệ:** không gộp toàn bộ engine chấm/progress thành một API mới beyond `createPersistence`/dispatcher/session hiện có; không đổi schema IndexedDB của personal-flashcards; không đụng module ngoài danh sách batch.
- **Không thêm** framework, build step, dependency, analytics, SRS, backend, tài khoản.
- **Không sửa** các PDF/Article và nội dung external; không chuyển đổi định dạng tài liệu.
- **Không làm** commit/push/deploy trong đợt này (L4 chỉ khi được yêu cầu riêng); không bump version các file không đụng tới.
- **Không tự ý mở** các chức năng ngoài việc bỏ selector ẩn của skin IELTS đã liệt kê; các tính năng mới (script tools sinh `?v=`, accent IELTS đỏ) chỉ làm khi được duyệt (Y3/Y5); tách dataset (Y1) đã thực hiện ngày 14-11 với chỉ thị trực tiếp và đã kiểm chứng.

## 9. Việc còn mở cần quyết định

1. Nhóm "Vocabulary khác" xếp 9 trang (điều chỉnh từ ×7) — xác nhận.
2. ~~Y1 tách dataset inline~~ — ĐÃ LÀM 2026-11-14 (4 trang ≥41KB; `same-word` ~8KB/dòng để nguyên, tách khi chạm ở P2.2).
3. Viewer rời `style.css` legacy — chạm hợp đồng "viewer retains existing styles" (DESIGN.md:198), cần duyệt.
4. Accent IELTS đỏ (Y5) cho ielts-collocations/hiking hay giữ violet Vocabulary.
5. Đồng bộ số finding giữa số liệu đợt chạy (398/388) và file chi tiết (384/374) khi chốt danh mục nghiệm thu.
6. Vi phạm focus P3 đang unconfirmed — xác nhận bằng đo lại từng trang khi thực thi batch tương ứng.
7. Chiến lược dedupe toeic-600 (thay thế-in-place hay xóa entry) và cách biệt lập hóa đề five-forms — xem Mốc 0 (5)–(6). Phần "3 câu trắc nghiệm chỉ còn 1 lựa chọn" đã chuyển thành fix code `choicePool` ở P0 mục 9, không còn là quyết định nội dung.
