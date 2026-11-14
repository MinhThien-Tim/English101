# English101 — Danh mục finding các trang phụ (secondary pages)

- **Ngày:** 2026-11-14
- **Phạm vi:** 28 trang phụ của English101 — toàn bộ các trang học liệu trừ trang chủ `index.html`, kèm các phát hiện liên quan đến tài sản dùng chung (`assets/…`) và `viewer.html`.
- **Tổng số finding:** 384 — 374 verified, 10 unconfirmed.

## Tóm tắt theo category và severity

| Category | High | Medium | Low | Tổng |
| --- | ---: | ---: | ---: | ---: |
| design | 3 | 35 | 31 | 69 |
| ux | 1 | 22 | 24 | 47 |
| interaction | 3 | 31 | 13 | 47 |
| a11y | 2 | 39 | 48 | 89 |
| code | 3 | 25 | 44 | 72 |
| content | 1 | 18 | 13 | 32 |
| copy | 0 | 3 | 18 | 21 |
| perf | 0 | 3 | 4 | 7 |
| **Tổng** | **13** | **176** | **195** | **384** |

## Danh mục chi tiết

Các finding được nhóm theo 8 category (thứ tự: design, ux, interaction, a11y, code, content, copy, perf); trong từng category giữ nguyên thứ tự xuất hiện của dữ liệu gốc. Mỗi finding ghi đủ: vị trí (where), mô tả (what), severity, status, evidence, gợi ý sửa; dòng "Nguồn" là trang/file được rà soát của finding đó.

## design (69 finding)

### 1. Blog/tu-biet-den-dung-duoc.html:10
- **What:** Toàn bộ palette của trang là bảng màu tự chế: cả 7 biến màu ở :root không khớp token nào trong DESIGN.md (paper/ink/muted/line/navy/coral đều lệch giá trị), link dùng #377cf6 là illustration-blue (DESIGN.md:231 giới hạn cho hình minh họa le
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc lại: :root{--ink:#111827;--muted:#647084;--paper:#fbfaf7;--navy:#0b1220;--coral:#ff6b4a;--blue:#377cf6;--line:#e7e4de} (dòng 10) — grep toàn bộ 7 giá trị trong DESIGN.md: không giá trị nào tồn
- **Gợi ý sửa:** Thay :root bằng đúng token DESIGN.md (paper #f6f3ec, ink #16191b, muted #625c53, line #e4ddce, navy #0b1013) và dùng accent Blog cyan #13839
- **Nguồn:** Blog/tu-biet-den-dung-duoc.html

### 2. Blog/tu-biet-den-dung-duoc.html:15,20
- **What:** h1/h2/blockquote dùng stack serif tự chọn Cambria,"Times New Roman",serif — không thuộc bộ giọng chữ nào trong DESIGN.md (Bricolage Grotesque/Be Vietnam Pro/JetBrains Mono cho portal, system-ui cho lesson, DESIGN.md:255-258), vi phạm điều c
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc lại: h1,h2{font-family:Cambria,"Times New Roman",serif;...} (dòng 15); blockquote lặp lại stack này (dòng 20); DESIGN.md:406 (mục Don't) đúng nguyên văn như dẫn.
- **Gợi ý sửa:** Nếu cố ý chọn giọng editorial cho Blog thì bổ sung Cambria thành quy tắc chính thức trong DESIGN.md; nếu không, chuyển về system-ui theo spe
- **Nguồn:** Blog/tu-biet-den-dung-duoc.html

### 3. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:4 (CSS focus-visible)
- **What:** Vòng focus dùng màu tự chế #bc6b13 thay vì token Focus Gold chung của hệ bài học mà DESIGN.md quy định giữ cố định giữa các phòng học (#b8883f; bản đậm #9c6f26 cho nền rất sáng).
- **Severity:** low — **Status:** verified
- **Evidence:** Xác nhận :4 có đúng `outline:3px solid #bc6b13`; DESIGN.md:35 định nghĩa focus-gold `#b8883f`, :241 ghi 'keyboard ring across the shared lesson layer' và cho tối màu thành `#9c6f26` trên nền rất sáng
- **Gợi ý sửa:** Đổi outline sang #b8883f hoặc #9c6f26 (nền --paper #faf9f5 thuộc nhóm nền rất sáng).
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 4. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:4
- **What:** Palette và font viết inline tự chế, lệch token lesson trong DESIGN.md: paper #faf9f5 (vs lesson-paper #fffefa), ink #1b252d (vs lesson-ink #202e32), line #dcded6 (vs lesson-border #cfd7d1); h1 và brand dùng Cambria/'Times New Roman' serif t
- **Severity:** low — **Status:** verified
- **Evidence:** So trực tiếp :4 với DESIGN.md:26–33 (lesson-paper #fffefa :26, lesson-ink #202e32 :28, lesson-muted #56676b :29, lesson-border #cfd7d1 :30) và :88–98 (lesson-body, lesson-display đều system-ui); Open
- **Gợi ý sửa:** Cân chỉnh giá trị trung tính về token lesson, hoặc ghi nhận trang này là một accent world riêng trong DESIGN.md để hợp thức hóa.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 5. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:4 (--blue:#234f83)
- **What:** Màu nhấn chính của trang là xanh cobalt #234f83 trong khi mapping chủ đề Grammar là xanh lá (#1f8a63 / ink #13684b / tint #eaf1e8) theo CONTEXT.md và DESIGN.md; xanh lá ở trang này chỉ còn dùng cho trạng thái đáp án đúng.
- **Severity:** low — **Status:** verified
- **Evidence:** CONTEXT.md:129 '- Grammar: green'; DESIGN.md:225 bảng 'Grammar · Green | #1f8a63 | #13684b | #eaf1e8'; :4 dùng --blue cho .navlink[aria-current=page], .primary, .global-progress>span (cả .eyebrow, .ca
- **Gợi ý sửa:** Nếu muốn bám semantic mapping, đổi accent chính sang green-ink #13684b; nếu giữ blue thì ghi nhận như accent world riêng.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 6. Grammar/conjunctions-theory-practice.html:1-2
- **What:** Trang không nạp file token dùng chung nào (không có <link rel=stylesheet> nào, chỉ <style> inline) mà tự chế lại palette lesson bằng biến inline lệch khỏi hệ lesson trong learning.css/DESIGN.md — lệch nặng nhất ở neutral 'tòa nhà' phải giữ
- **Severity:** medium — **Status:** verified
- **Evidence:** So :root dòng 2 với learning.css:1 (--bg #f2f0ea, --ink #202e32, --muted #56676b, --line #cfd7d1, --accent #1c5b53, --gold #966027, --bad #a13736) và DESIGN.md:31-34 (lesson-accent/lesson-danger/lesso
- **Gợi ý sửa:** Nạp assets/styles/tokens.css (hoặc bám đúng giá trị lesson-*) để các phòng học nhất quán với hệ 'Bàn học'.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 7. Grammar/english-suffix-lab.html:190-196
- **What:** 7 nút điều hướng chính của sidebar dùng emoji làm icon (📖 📚 🧠 ✍️ 🏁 🔗 ⚠️), nhãn thành thạo dùng ký tự ✓ (:484, :988) — trái chuẩn thẩm mỹ "không emoji làm icon"; hệ glyph chuẩn của design system là SVG.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc lại: cả 7 nút nav tại :190-196 mở đầu bằng emoji; nhãn '✓ Đã thuộc' tại :484 và :988. DESIGN.md:326 (grep -n đã chạy) đúng như dẫn: 'glyphs use their separate `0 0 24 24` box'.
- **Gợi ý sửa:** Thay bằng glyph SVG mảnh theo hệ glyph/illustration của DESIGN.md hoặc bỏ icon, giữ nhãn chữ.
- **Nguồn:** Grammar/english-suffix-lab.html

### 8. Grammar/english-suffix-lab.html:42,48,73,124-127,141-143,150,157
- **What:** Một họ tím/indigo và xanh dương lẻ tự chế (#4054c7, #3d4ed8, #2f4bc6, #3448b8, #3547b4, #3048b8, #667eea, #1f5f99…) dùng cho badge, tag, callout, link lý thuyết, blank — không thuộc :root của trang (teal #136c72) lẫn token DESIGN.md; accent
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã kiểm từng dòng: :42 .kind{background:#eef2ff;color:#4054c7}; :48 .tag #3d4ed8; :73 .type-tag.noun #1f5f99 (là xanh dương, không phải indigo — đã nêu lại what); :124-127 gradient #eef2ff→#f8fafc + #
- **Gợi ý sửa:** Quy các điểm nhấn này về teal của trang hoặc cặp ink/tint Grammar xanh theo DESIGN.md; xoá hex lẻ.
- **Nguồn:** Grammar/english-suffix-lab.html

### 9. Grammar/english-suffix-lab.html:12,29,66,170
- **What:** Bóng nghỉ dày hơn chuẩn lesson (0 10px 30px .09 áp cho .panel/.hero, 0 16px 36px .12 cho mặt thẻ, 0 10px 28px .12 cho thanh thi) so với "whisper" 0 8px 26px .03 của DESIGN.md, kèm 3 gradient trang trí: hero 3 mốc (:29), mặt trước thẻ (:67),
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc lại: :12 --shadow:0 10px 30px rgba(17,43,48,.09) áp cho .hero (:29) và .panel (:36); :66 box-shadow:0 16px 36px rgba(17,43,48,.12); :170 box-shadow:0 10px 28px rgba(15,23,42,.12). 3 gradient đú
- **Gợi ý sửa:** Hạ bóng nghỉ về mức lesson (~.03 alpha), phẳng hoá hero và mặt thẻ bằng màu đơn + viền 1px.
- **Nguồn:** Grammar/english-suffix-lab.html

### 10. Grammar/english-suffix-lab.html:65
- **What:** Chỉ thẻ lật có focus ring chuẩn (3px #9c6f26 — đúng gold đã làm đậm cho nền #edf3f4 theo DESIGN.md:241); toàn bộ button/input/link còn lại chỉ dựa vào outline mặc định của trình duyệt, không đạt spec "3px focus-gold ring" cho lesson control
- **Severity:** low — **Status:** verified
- **Evidence:** Tự chạy grep 'focus' toàn file: rule :focus-visible duy nhất trong khối <style> (dòng 8-182) là :65 .study-card:focus-visible{outline:3px solid #9c6f26;outline-offset:3px}; không có :focus-visible nào
- **Gợi ý sửa:** Thêm chung :focus-visible{outline:3px solid #9c6f26;outline-offset:3px} cho button, input, select, a.
- **Nguồn:** Grammar/english-suffix-lab.html

### 11. Grammar/prepositions-theory-practice.html:8-9
- **What:** Trang tự chế cả bộ token màu gần-mà-không-trùng token lesson trong DESIGN.md (green #155e52 vs lesson-accent #1c5b53; red #b33a3a vs lesson-danger #a13736; gold #a66817 vs lesson-gold #966027; body 16px vs lesson-body 17px) và focus ô trống
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 8 khai --green:#155e52/--red:#b33a3a/--gold:#a66817; đối chiếu trực tiếp DESIGN.md: lesson-accent #1c5b53 (:31), lesson-gold #966027 (:33), lesson-danger #a13736 (:34), focus-gold #b8883f (:35),
- **Gợi ý sửa:** Đổi các biến :root sang giá trị lesson-* của DESIGN.md và dùng focus-gold 3px cho mọi control.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 12. Grammar/prepositions-theory-practice.html:9
- **What:** Hero dùng gradient 135deg hai lớp xanh và bóng dày 0 12px 35px (~9% alpha) trên hero/side/nút fixed — lệch chuẩn lesson: hero bài học là band phẳng (DESIGN.md:369) và bóng card lesson chỉ "whisper" 0 8px 26px rgba(32,59,58,.03) (DESIGN.md:3
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 9: `.hero{background:linear-gradient(135deg,#123d37,#1f6659);…box-shadow:var(--shadow)}` với `--shadow:0 12px 35px #1e352817` (alpha 23/255 ≈ 9%) áp cho .hero/.side/.back. Đã đọc DESIGN.md:369: "
- **Gợi ý sửa:** Đổi hero sang màu band phẳng và hạ bóng card về mức whisper của chuẩn lesson.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 13. Grammar/same-word-different-parts-of-speech.html:2
- **What:** Palette và cỡ chữ tự khai báo inline thay vì dùng assets/styles/tokens.css dùng chung, với giá trị lệch nhẹ khỏi bảng token DESIGN.md: ink #24302f (lesson-ink #202e32), muted #68736f (#56676b), border #d9ddd7 (#cfd7d1), accent #155e52 (#1c5
- **Severity:** low — **Status:** verified
- **Evidence:** :2 ':root{--ink:#24302f;--muted:#68736f;--line:#d9ddd7;--green:#155e52;--green2:#deeee9;--amber:#a76816;--red:#b23b42…}' — đủ 7 màu + body 16px/h1 4rem/1.02 lệch như finding. Đối chiếu DESIGN.md:28-34
- **Gợi ý sửa:** Nạp tokens.css và map biến cục bộ về token lesson-*; chỉ giữ accent riêng nếu chủ ý đổi phòng theo Open Door Rule (DESIGN.md:251).
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 14. Grammar/same-word-different-parts-of-speech.html:2
- **What:** Hero dùng gradient 2 màu teal→navy trong khi chuẩn bài học là dải header phẳng một màu (#203b3a), và bóng resting dày hơn chuẩn lesson: 0 12px 35px ở ~8.6% ink trên hero+sidebar so với bóng whisper 0 8px 26px rgba(32,59,58,.03) của lesson c
- **Severity:** low — **Status:** verified
- **Evidence:** :2 '.hero{background:linear-gradient(135deg,#183d39,#2d5675);…box-shadow:var(--shadow)}' và '--shadow:0 12px 35px #22372c16' (alpha 0x16=22/255≈8.6%), .side cùng dùng var(--shadow); DESIGN.md:369 quy
- **Gợi ý sửa:** Đổi hero thành dải màu phẳng và hạ bóng về mức whisper của lesson card.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 15. Grammar/same-word-different-parts-of-speech.html:2
- **What:** html{scroll-behavior:smooth} không có guard prefers-reduced-motion — cuộn mượt cho anchor TOC vẫn chạy với người bật giảm chuyển động; file không có @media prefers-reduced-motion nào (chỉ animation.js tự guard phía JS).
- **Severity:** low — **Status:** verified
- **Evidence:** :2 'html{scroll-behavior:smooth}'; đã chạy grep -c 'prefers-reduced-motion' → 0 (media query duy nhất trong file là @880px); DESIGN.md:332 yêu cầu smooth CSS scrolling thành automatic khi reduce.
- **Gợi ý sửa:** Bọc scroll-behavior:smooth trong @media (prefers-reduced-motion: no-preference).
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 16. Grammar/tense-exercises-answer-key-quiz.html:8
- **What:** Trang dùng bộ token tự chế (accent cobalt #155eef, nền xám lạnh #f5f7fa, ok/bad tự đặt) thay cho token lesson trong DESIGN.md (Study Teal #1c5b53, lesson-soft, lesson-danger, focus-gold) và accent Grammar màu xanh lá theo CONTEXT.md.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 8: :root{--bg:#f5f7fa;…--accent:#155eef;--ok:#16803a;--bad:#b42318} đúng nguyên văn. ĐÃ CHỈNH evidence: bản gốc dẫn "DESIGN.md:241" SAI dòng — grep DESIGN.md cho thấy lesson-accent #1c5b53 ở dòng
- **Gợi ý sửa:** Ánh xạ biến hiện có sang token lesson (accent → lesson-accent, nền → lesson-canvas/paper, ok/bad → lesson-soft + lesson-danger) mà không đổi
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 17. Grammar/tense-exercises-answer-key-quiz.html:10
- **What:** Hero dùng gradient xanh 135° đậm (#102a43→#155eef) và thẻ review-hub cũng gradient (#fff→#f5f9ff) — kiểu banner marketing, trái ngôn ngữ phẳng/tĩnh lặng của hệ "Bàn học" và quy định header bài học là band phẳng màu tối.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 10: .hero{background:linear-gradient(135deg,#102a43,#155eef)…} và dòng 26: .review-hub{grid-column:1/-1;background:linear-gradient(145deg,#fff,#f5f9ff)} đúng nguyên văn. DESIGN.md:369 "Lesson: a
- **Gợi ý sửa:** Thay hero bằng band phẳng một màu tối (kiểu #203b3a) hoặc surface giấy phẳng, bỏ gradient ở review-hub.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 18. Grammar/tense-exercises-answer-key-quiz.html:7
- **What:** Khối <style> không định nghĩa bất kỳ rule :focus/:focus-visible nào nên trang phụ thuộc hoàn toàn outline mặc định của trình duyệt, thiếu vòng focus-gold chuẩn lesson theo DESIGN.md.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy: grep -n ':focus' trên file → 0 kết quả. DESIGN.md:390 "Never ship an interactive control without a visible indicator" đúng nguyên văn; DESIGN.md:340 cũng quy định lesson controls lấy ring foc
- **Gợi ý sửa:** Thêm :focus-visible chung với ring focus-gold 3px offset cho .btn, radio trong .choice, select, input, textarea.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 19. Verb/english-verbs.html:260
- **What:** Nút "🔊 Nghe cách đọc" dùng emoji làm icon (và pill "🔊 L" do file dùng chung keyboard-pronunciation.js:60 tự chèn thêm) — trong khi hệ icon của site được định nghĩa là glyph SVG, không phải emoji.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 260: `<button class="listen-btn" id="listenBtn">🔊 Nghe cách đọc</button>`; keyboard-pronunciation.js:60: `textContent = '🔊 L'` (gán lại ở dòng 148). Đã CHỈNH finding gốc: grep 'emoji' trong DES
- **Gợi ý sửa:** Thay emoji bằng glyph SVG inline cùng hệ icon của site (theo hệ glyph 0 0 24 24 ở DESIGN.md:326) hoặc ký tự văn bản như media-helper đã dùng
- **Nguồn:** Verb/english-verbs.html

### 20. Verb/english-verbs.html:79
- **What:** Mặt trước thẻ flashcard dùng linear-gradient hai sắc xanh (#17395f→#245b83) — dính mẫu hình chống "gradient lòe loẹt", đồng thời tông xanh navy này lệch với accent chủ đề Verb (hổ phách #b07a12 theo DESIGN.md) và với tông giấy/đỏ/ochre của
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 79: `.flip-front{background:linear-gradient(145deg,#17395f,#245b83);border-radius:8px;}` — đúng nguyên văn. DESIGN.md:227 bảng topic: 'Verb · Amber | #b07a12' (token topic-verbs dòng 40); DESIGN.
- **Gợi ý sửa:** Dùng màu phẳng một sắc (ochre hoặc giấy đậm) cho mặt trước thẻ, giữ viền thay vì gradient.
- **Nguồn:** Verb/english-verbs.html

### 21. Verb/english-verbs.html:11-15,19,153-160
- **What:** Toàn bộ màu sắc tự chế ngoài token: :root tự đặt 13 biến (--ink #1C2321, --paper #E9E5D6, --red #A63D40…) và file có tổng 57 mã hex cứng; ~20 dòng đầu viết hẳn một theme tối (dòng 19 cho body nền --ink) rồi bị dòng 153 đổi nền sang #f3f7f8
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại bằng đúng lệnh được dẫn: `grep -oE '#[0-9a-fA-F]{3,8}' | sort -u | wc -l` = 57 (đã soát danh sách, không có false positive). Đã CHỈNH: :root khai báo 13 biến chứ không phải 12 (đếm bằng grep '\
- **Gợi ý sửa:** Giữ một theme duy nhất, xóa các rule bị ghi đè (dòng 11–152 phần bị override) và map màu về token bài học trong DESIGN.md.
- **Nguồn:** Verb/english-verbs.html

### 22. Verb/english-verbs.html:8-9,19
- **What:** Trang nạp webfont Google "Be Vietnam Pro" (400–800) làm font toàn trang — DESIGN.md quy định lesson dùng system-ui ("Lesson Font: system-ui") và Homepage Voices Rule cấm chuyển font stack của trang chủ vào lesson; đây là một trong hai reque
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 9: `fonts.googleapis.com/css2?family=Be+Vietnam+Pro…`; dòng 19: `font-family:'Be Vietnam Pro',sans-serif`; DESIGN.md:258 '**Lesson Font:** system-ui (with -apple-system and Segoe UI fallbacks)',
- **Gợi ý sửa:** Bỏ request webfont, chuyển font-family sang system-ui stack theo chuẩn lesson.
- **Nguồn:** Verb/english-verbs.html

### 23. Verb/english-verbs.html:50,92,97,111,125
- **What:** Năm selector card (card, purpose-card, cf-card, setup, quiz-card) đều mang bóng đậm hơn chuẩn lesson — 3 chỗ bóng kép `0 1px 0 rgba(0,0,0,.25), 0 8px 18px -10px rgba(0,0,0,.5)` (dòng 50, 92, 97) và 2 chỗ bóng đơn nặng `0 8px 18px -10px rgba
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đối chiếu từng dòng: 50 (.card), 92 (.purpose-card), 97 (.cf-card) có bóng kép; 111 (.setup) và 125 (.quiz-card) chỉ có MỘT lớp `0 8px 18px -10px rgba(0,0,0,.5)` — đã chỉnh 'bóng kép ở 5 chỗ' của f
- **Gợi ý sửa:** Hạ về một lớp bóng rất nhẹ hoặc chỉ hairline border như chuẩn lesson card.
- **Nguồn:** Verb/english-verbs.html

### 24. Verb/five-forms-of-verbs-with-3rd-person.html:12,32,38
- **What:** Bộ màu tự chế hoàn toàn ngoài token layer của bài học: không nạp assets/styles/tokens.css + primitives.css trong khi các bài học Verb cùng loại nạp (Verb/phrasal-verbs.html:3, Verb/paraphrase-80-flashcards.html:3); :root bị định nghĩa 2 lần
- **Severity:** high — **Status:** verified
- **Evidence:** Dòng 12: --bg:#f1eee6…; dòng 32: --bg:#f4f7f9;--navy:#244b86 (đè dòng 12); grep -c 'tokens.css' → 0; grep '#b07a12' → 0 (exit 1); grep -c 'e5a74b' → 5. Node đo WCAG: #e5a74b trên #f4f7f9 = 1.96, trên
- **Gợi ý sửa:** Nạp assets/styles/tokens.css + primitives.css như phrasal-verbs.html, map --bg/--navy/--gold về lesson tokens, đổi focus ring sang focus-gol
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 25. Verb/five-forms-of-verbs-with-3rd-person.html:34,61,15
- **What:** Gradient trang trí và bóng đày hơn spec bài học: hero và mặt trước thẻ dùng linear-gradient, bóng card/hero đậm (rgba .14) trong khi DESIGN.md:307 định lesson card chỉ 'whisper' 0 8px 26px rgba(32,59,58,.03) và Flat-At-Rest Rule (DESIGN.md:
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 34: .hero{background:linear-gradient(125deg,#173353,#285986)}; dòng 61: .verb-front{background:linear-gradient(145deg,#17395f,#245b83)}; dòng 15: box-shadow:0 10px 28px rgba(32,58,95,.14); thêm d
- **Gợi ý sửa:** Phẳng hoá hero và mặt thẻ theo Flat-At-Rest Rule (DESIGN.md:312), hạ bóng về mức whisper của lesson card (DESIGN.md:307).
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 26. Verb/five-forms-of-verbs-with-3rd-person.html:26,313
- **What:** Ô input bị tô màu nền+viền xanh/đỏ khi đúng/sai (5 ô data-f present/third/past/pp/ing — đã sửa '7 ô' của giám định viên trước vì .forms chỉ có 5 formbox), cả 5 ô được tô lại mỗi lần kiểm tra, trái quy tắc DESIGN.md:363 'wrong answers use th
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 26: .formbox.good{background:#edf7f1;border-color:#88b99f}.formbox.bad{background:#faefed;border-color:#d49b94}; dòng 313: document.querySelector(`.formbox[data-f="${k}"]`).classList.add(ok?'good
- **Gợi ý sửa:** Bỏ tô màu ô, chuyển toàn bộ nhận trạng vào khối feedback kèm liệt kê dạng sai bằng chữ.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 27. Verb/paraphrase-80-flashcards.html:8-20
- **What:** Trang tự chế cả một palette :root riêng (--navy #1b2a52, --red #b3261e, --accent #3a6df0, --paper #f5f3ee…) bỏ qua token DESIGN.md, dù chính trang này có nạp assets/styles/tokens.css; kèm màu hex rải rác ngoài mọi token: #9db4f5/#7d97e8/#e8
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc lại trang: dòng 8-20 đúng 11 biến màu riêng; hex rải rác đúng tại 124, 130, 134, 157-158; inline #3a6df0 đúng tại 197; grep 'accent' toàn trang chỉ ra đúng 1 dòng (12 — khai báo) → var(--accent
- **Gợi ý sửa:** Thay :root riêng bằng token lesson của DESIGN.md/tokens.css và dùng accent Verb amber (#b07a12/#7c560c/#f7f0e3) thay cho navy/red/blue.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 28. Verb/paraphrase-80-flashcards.html:24,32
- **What:** Hệ font tự chế ngoài spec bài học: body dùng serif 'Iowan Old Style','Georgia' và toàn bộ UI dùng 'Helvetica Neue',Arial, trong khi DESIGN.md:258/88-98 quy định Lesson Font là system-ui stack và DESIGN.md:406 cấm đưa font ngoài scoped spec
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 24 đúng 'Iowan Old Style','Georgia',serif; dòng 32 đúng 'Helvetica Neue',Arial,sans-serif và lặp tại 41 (.sub), 48 (.rangebar), 69 (.stats), 103 (.stt), 114 (.hint), 122 (.replace-label), 139 (.c
- **Gợi ý sửa:** Chuyển về system-ui, -apple-system, Segoe UI, sans-serif theo typography.lesson-body của DESIGN.md.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 29. Verb/paraphrase-80-flashcards.html:212
- **What:** Dùng emoji làm icon trong nút điều khiển: '🔀 Xáo trộn' (nút 'Đã thuộc ✓' dòng 207 cũng gắn ký tự ✓ vào nhãn) — trái chỉ tiêu chống 'emoji làm icon' của chuẩn thẩm mỹ; các nút còn lại ('← Trước', 'Tiếp →') đã dùng mũi tên chữ nhất quán.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 212 đúng '<button class="btn" id="btnShuffle">🔀 Xáo trộn</button>'; dòng 207 đúng 'Đã thuộc ✓'; dòng 211 '← Trước', 213 'Tiếp →' dùng mũi tên chữ. Phần sự kiện emoji/✓ tái hiện được; quy chiếu '
- **Gợi ý sửa:** Bỏ emoji, giữ nhãn chữ 'Xáo trộn' hoặc dùng SVG glyph mảnh theo hệ icon của site.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 30. Verb/paraphrase-80-flashcards.html:81-101,169-171
- **What:** Rủi ro mobile do cấu trúc: cả hai .face đều position:absolute;inset:0 (91) trên .card{min-height:300px} (84) nên hai mặt không đóng góp chiều cao — card không bao giờ giãn theo nội dung; ước lượng tĩnh với 80 entry hiện tại (mặt sau dài nhấ
- **Severity:** low — **Status:** verified
- **Evidence:** Cấu trúc đã kiểm: dòng 84 .card{min-height:300px}, dòng 91 .face{position:absolute;inset:0} → hai mặt không đóng góp chiều cao, card không giãn; không có overflow hay cơ chế giãn nào trong CSS; media
- **Gợi ý sửa:** Cho mặt trước xác định chiều cao (position:relative) và mặt sau absolute chỉ khi lật, hoặc tăng min-height/overflow an toàn.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 31. Verb/phrasal-verbs.html:11-22
- **What:** Trang tự định nghĩa bộ 10 biến màu tự chế (#16324f, #0c2138, #e0a72b, #f5f3ee, #e3e0d6, #2f8f5b, #c0463d…) lệch khỏi token DESIGN.md (paper #f6f3ec, line #e4ddce, topic-verbs #b07a12, lesson-danger #a13736, focus-gold #b8883f) và dù đã nạp
- **Severity:** medium — **Status:** verified
- **Evidence:** :root dòng 11-22 định nghĩa --paper:#f5f3ee, --gold:#e0a72b, --bad:#c0463d; grep trang: 0 tham chiếu var(--surface/--border/--focus/--duration…) dù tokens.css nạp ở dòng 3 (tokens.css:12-15 có --surfa
- **Gợi ý sửa:** Trỏ các biến cục bộ về giá trị token chung (--focus, topic-verbs ink/soft, lesson-danger) thay vì giữ bộ giá trị near-duplicate tự chế.
- **Nguồn:** Verb/phrasal-verbs.html

### 32. Verb/phrasal-verbs.html:9, 236-240
- **What:** Trang nạp và ép cặp font Fraunces + IBM Plex Sans cho toàn trang — không thuộc hệ chữ DESIGN.md (lesson dùng system-ui; trang chủ Bricolage/Be Vietnam Pro/JetBrains Mono), tạo một pairing tự chế thứ ba không có trong spec.
- **Severity:** medium — **Status:** verified
- **Evidence:** Google Fonts Fraunces/IBM Plex Sans (dòng 9); khối override `body,button,input,select,…{font-family:'IBM Plex Sans',…}` (236-238) và `.term,.meaning,.dict-prompt{font-family:'Fraunces',…}` (240). DESI
- **Gợi ý sửa:** Đổi phần thân về system-ui theo quy ước lesson trong DESIGN.md:258, chỉ giữ tối đa một serif display nếu thật cần cho term/prompt.
- **Nguồn:** Verb/phrasal-verbs.html

### 33. Verb/phrasal-verbs.html:34 (và 236-240)
- **What:** h1 không nằm trong danh sách selector của khối override font (236-238) và cũng không có trong dòng 240 nên vẫn giữ 'Helvetica Neue',Arial — trên Windows/Android thành Arial/Roboto, lệch hẳn với phần chữ còn lại của trang; 13 khai báo 'Helve
- **Severity:** low — **Status:** verified
- **Evidence:** h1 `font-family:'Helvetica Neue',Arial,sans-serif` (34) vắng mặt trong cả hai khối override (236-238, 240). Đã chỉnh so với bản gốc: danh sách dead declarations liệt kê 11 dòng nhưng thiếu 172 (.know-
- **Gợi ý sửa:** Bổ sung h1 vào khối override và xóa các khai báo font-family đã bị ghi đè để còn một hệ chữ duy nhất.
- **Nguồn:** Verb/phrasal-verbs.html

### 34. Verb/phrasal-verbs.html:291, 335
- **What:** Emoji dùng làm icon nút: "🔀 Xáo trộn" và "🔊 Nghe".
- **Severity:** low — **Status:** verified
- **Evidence:** `<button class="btn" id="btnShuffle">🔀 Xáo trộn</button>` (291); `<button class="btn" id="dictListen">🔊 Nghe</button>` (335) — đọc trực tiếp. Đã chỉnh so với bản gốc: bỏ mệnh đề "trái chuẩn thẩm mỹ
- **Gợi ý sửa:** Thay bằng SVG glyph mảnh cùng hệ (viewBox 0 0 24 24, stroke mảnh) hoặc nhãn chữ thuần.
- **Nguồn:** Verb/phrasal-verbs.html

### 35. Vocabulary/c1-vocabulary.css:47
- **What:** Vòng focus dùng màu tự chế #00b2ff thay vì Focus Gold #b8883f — điểm DESIGN.md liệt kê vào những thứ bài học KHÔNG được thay theo Open Door Rule; ring mới chỉ đạt tương phản ~2,4:1 trên nền trắng (dưới 3:1), gold đạt ~3,2:1.
- **Severity:** medium — **Status:** verified
- **Evidence:** css:47 `input:focus,select:focus,button:focus-visible,a:focus-visible{outline:3px solid #00b2ff;outline-offset:2px}`. DESIGN.md:241 "Focus Gold is the keyboard ring across the shared lesson layer" (to
- **Gợi ý sửa:** Đổi outline sang #b8883f, giữ 3px và offset hiện có.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 36. Vocabulary/c1-vocabulary.js:242,342 (và 78)
- **What:** Dùng emoji/ký tự làm icon: "🔊" trong 2 nút phát âm của quiz, "▶" nghe phát âm, "▮/▯" lưu từ — trong khi nút media trên chính trang này đã dùng inline SVG đúng chuẩn của hệ.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc: js:242 `🔊 Phát âm`, js:342 `🔊 Nghe từ`, js:78 nút lưu ▮/▯ và nút nghe ▶ (U+25B6 không kèm variation selector), trong khi mediaIcon là SVG (js:22) dùng cho nút media (js:73). Phần ghi chú ren
- **Gợi ý sửa:** Dùng lại pattern SVG của mediaIcon cho cả các nút này.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 37. Vocabulary/confusing-words.html:421-425,519
- **What:** Palette "Navy–thép" (#27577a, #183f60, #101c2d, #8b1e2d, #fff4df…) tự chế ngoài token DESIGN.md, và focus ring xanh rgba(119,164,197,.5) thay cho Focus Gold #b8883f mà Open Door Rule bắt buộc giữ nguyên; accent cũng không phải violet chủ đề
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :422 --red:#27577a;--red-dim:#183f60, #101c2d tại :426/:429-430, #8b1e2d và #fff4df tại :508, :519 outline:3px solid rgba(119,164,197,.5). ĐÃ CHỈNH: DESIGN.md:35 focus-gold:"#b8883f" đúng, nhưng t
- **Gợi ý sửa:** Đổi focus ring sang focus-gold và ánh xạ màu chính về token lesson/lesson-accent thay vì hex riêng.
- **Nguồn:** Vocabulary/confusing-words.html

### 38. Vocabulary/confusing-words.html:553,557,585,644
- **What:** Icon dựng bằng ký tự/emoji (▤, ✎, ⌕, 🔊) thay vì SVG glyph của hệ; 🔊 render màu emoji nền khác biệt trên giao diện navy, không nhất quán với "Bàn học".
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc :553 <span class="tab-icon" aria-hidden="true">▤</span>, :557 ✎, :585 ⌕, :644 <button …>🔊 Nghe cách đọc</button>; DESIGN.md:326 "nine UI glyphs; glyphs use their separate `0 0 24 24` box and 1.9
- **Gợi ý sửa:** Thay các ký tự bằng SVG glyph cùng hộp 24×24 theo hệ thống icon hiện có.
- **Nguồn:** Vocabulary/confusing-words.html

### 39. Vocabulary/ielts-collocations-modern.css:16
- **What:** Vòng focus dùng màu tự chế #3d91bd đè (!important) token vàng dùng chung --focus:#b8883f mà trang tự nạp (tokens.css/primitives.css) — DESIGN.md quy định focus ring dùng chung là phần cố định không được lesson tô lại (Focus Gold ở DESIGN.md
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện: modern.css:16 `input:focus,select:focus,button:focus-visible,a:focus-visible{outline:3px solid #3d91bd!important;…}`; tokens.css:15 `--focus: #b8883f`; primitives.css:1-2 `:where(button,a
- **Gợi ý sửa:** Bỏ override #3d91bd, để primitive.css áp var(--focus) (hoặc override bằng #b8883f nếu cần nền sáng).
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 40. Vocabulary/ielts-collocations-modern.css:1
- **What:** Toàn trang dùng bảng màu/bo góc tự chế ngoài token DESIGN.md (--modern-navy #263b52, --modern-gold #d8c98b, --modern-blue #376b8c, focus #3d91bd, border-radius:0 !important cho card/button/input/select), đè tokens.css và palette inline của
- **Severity:** medium — **Status:** verified
- **Evidence:** css:1 định nghĩa --modern-*; border-radius:0!important tại css:8,11,13,14,15,17-21,23,24,26 (gốc dẫn 13,23 đúng); css:16 outline #3d91bd trong khi tokens.css:15 --focus:#b8883f — primitives.css:1-3 dù
- **Gợi ý sửa:** Chuyển sang token lesson (lesson-paper/ink/border, radius 9–15px, focus-gold) hoặc tối thiểu map --modern-* vào biến tokens.css thay vì màu
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 41. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:207
- **What:** Dùng emoji 🔊 làm icon của nút NGHE — chống pattern 'emoji làm icon' trong chuẩn thẩm mỹ của site.
- **Severity:** low — **Status:** verified
- **Evidence:** html:207 nguyên văn `<button class="dict-btn secondary" id="dictListen" hidden>🔊 NGHE</button>`; các nút khác dùng ký tự mũi tên → thay vì icon thật.
- **Gợi ý sửa:** Thay bằng SVG speaker inline (hệ glyph 0 0 24 24 của DESIGN.md) hoặc bỏ emoji, giữ nhãn chữ.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 42. Vocabulary/root-atlas.html:2
- **What:** Trang tự định nghĩa lại palette/focus/type trong <style> nội tuyến với giá trị lệch token dù đã nạp tokens.css: --muted #59686c, --line #d2d8d4, --gold #996327, --soft #e4eee8, --bad #a43636 (khai báo nhưng không dùng — grep var(--bad)=0),
- **Severity:** medium — **Status:** verified
- **Evidence:** root-atlas.html:2 `:root{--muted:#59686c;--line:#d2d8d4;--gold:#996327;--bad:#a43636;--soft:#e4eee8}` và `outline:3px solid #b78338`; tokens.css:11-15 --text-muted:#56676b/--border:#cfd7d1/--focus:#b8
- **Gợi ý sửa:** Dùng lại biến tokens.css (hoặc chỉnh giá trị nội tuyến khớp DESIGN.md) và bỏ --bad nếu không dùng.
- **Nguồn:** Vocabulary/root-atlas.html

### 43. Vocabulary/c1-vocabulary.css:47
- **What:** Focus ring của trang là cyan #00b2ff thay vì Focus Gold #b8883f mà DESIGN.md ấn định là ring cố định của lớp bài học dùng chung (DESIGN.md:241, 251 Open Door Rule, 390); #00b2ff trên nền trắng chỉ đạt ≈2.4:1 (trên paper #f6f6f6 ≈2.2:1), dướ
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã xác minh: c1-vocabulary.css:47 'outline:3px solid #00b2ff'; tính contrast bằng node: #00b2ff = 2.38:1 vs #fff, 2.21:1 vs #f6f6f6, #b8883f = 3.17:1 (khớp số liệu gốc); grep -n DESIGN.md: 241 'Focus
- **Gợi ý sửa:** Đổi outline sang focus-gold #b8883f (nền rất sáng có thể dùng #9c6f26 theo ghi chú DESIGN.md:241).
- **Nguồn:** Vocabulary/toeic-600.html

### 44. Vocabulary/ielts-vocabulary-focus.css:3,4,7,8,11-13
- **What:** Hai hệ thị giác va chạm trên một trang: token bài học của trang (accent xanh #1c5b53, header #203b3a, bóng 'whisper') bị skin đè bằng nền gradient, header #1f1e1c viền đỏ #c43d35, serif Cambria/Georgia cho từ/prompt, card tối gradient với b
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại khớp 100%: css:3 `body{background:linear-gradient(145deg,#e6e2da 0%,#f0ede6 55%,#e9e5dc 100%)}`; :4 `header{background:#1f1e1c;border-bottom:4px solid var(--focus-accent)}` + h1 Cambria/Georgia; :7
- **Gợi ý sửa:** Chọn một accent-world duy nhất cho trang (giữ token lesson xanh của trang hoặc tách nhánh skin theo body class), bỏ nền gradient và giảm bón
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 45. Vocabulary/ielts-vocabulary-focus.css:20,23 + assets/keyboard-pronunciation.js:97 + Vocabulary/vocabulary-atlas.html:2
- **What:** Ở 360px, cạnh phải dồn 4 nút nổi cố định (Tự phát âm top:14/61, Tập trung bottom:11-18, Đọc từ bottom:65-72, Cài giọng right:76 bottom:18) trong khi toast giữa dưới (bottom:20, rộng tới 90vw, z-index 20) chắc chắn bị các nút z-index 1000 ch
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** Mọi giá trị CSS được dẫn đều khớp khi đọc lại: css:20 `.focus-toggle{right:18px;bottom:18px}` + `.pronunciation-shortcut{right:18px!important;bottom:72px!important}`; css:23 (≤580px) right:11/bottom:1
- **Gợi ý sửa:** Đặt toast cao hơn cụm FAB (ví dụ bottom:130px) hoặc hạ max-width/z-index theo thứ lớp đã định.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 46. Vocabulary/ielts-vocabulary-focus.js:82 + assets/keyboard-pronunciation.js:60
- **What:** Hai nút do skin/helper tạo dùng emoji làm icon ('🔊/🔈 Tự phát âm: Bật/Tắt' và '🔊 L') — đúng mẫu hình bị chống chỉ định, trong khi toàn bộ icon nội trang là ký hiệu đơn sắc nhất quán (▤ ⇄ ✎ ⋈ ★ ♫).
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại khớp: ielts-vocabulary-focus.js:82 `autoButton.textContent = enabled ? '🔊 Tự phát âm: Bật' : '🔈 Tự phát âm: Tắt'`; keyboard-pronunciation.js:60 `shortcutButton.textContent = '🔊 L'`. Icon nộ
- **Gợi ý sửa:** Thay emoji bằng glyph đơn sắc hoặc SVG cùng hệ stroke 1.9px của bộ icon bài học.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 47. Vocabulary/ielts-vocabulary-focus.js:82
- **What:** Nút cố định 'Tự phát âm' dùng emoji 🔊/🔈 làm icon trạng thái — vi phạm trực tiếp chuẩn 'không emoji làm icon' của trang; các glyph còn lại trên trang là ký hiệu đơn sắc nhất quán (♫, ⛶, ◷).
- **Severity:** medium — **Status:** verified
- **Evidence:** focus js:82 nguyên văn: "autoButton.textContent = enabled ? '🔊 Tự phát âm: Bật' : '🔈 Tự phát âm: Tắt'". Các glyph khác trên trang là đơn sắc (◷ ▤ ▱ ⇄ ✎ ≋ ⌁ ✳ ⛶ ♫ ở HTML:6).
- **Gợi ý sửa:** Thay emoji bằng glyph đơn sắc thống nhất (ví dụ ♪) hoặc SVG inline, giữ nhãn chữ 'Tự phát âm: Bật/Tắt'.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 48. Vocabulary/ielts-vocabulary-focus.css:7
- **What:** Nền body là gradient 145deg (focus css:3), .card dùng gradient + bóng nghỉ 0 12px 30px/14% và .learning-card bóng 0 16px 36px/22% (focus css:7-8) — nặng hơn nhiều 'whisper shadow' 0 8px 26px/3% và rule Flat-At-Rest mà DESIGN.md quy định cho
- **Severity:** medium — **Status:** verified
- **Evidence:** focus css:3 'body{background:linear-gradient(145deg,…)}'; :7 .card gradient + 'box-shadow:0 12px 30px rgba(50,43,36,.14)'; :8 .learning-card gradient + '0 16px 36px rgba(45,37,31,.22)'. DESIGN.md:307
- **Gợi ý sửa:** Bỏ gradient nền body/card, hạ bóng nghỉ về mức whisper của learning.css (--shadow).
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 49. Vocabulary/ielts-vocabulary-focus.css:26
- **What:** Cùng một URL đổi toàn bộ hệ màu/font/bo góc theo query param: skin đỏ IELTS (--focus-accent:#c43d35, font Cambria) cho set 1-2/3-4/5-6 và skin xanh Oxford (#002147, nút bo 4px, card bo 6px) cho set 1-6 — trong khi CONTEXT.md gán accent Voca
- **Severity:** low — **Status:** verified
- **Evidence:** focus css:2 '--focus-accent:#c43d35'; :26-33 body.vocabulary-vong-1-6 --oxford-blue:#002147, nav button bo 4px (:31), card bo 6px (:37); bootstrap:73 'document.body.classList.add(`vocabulary-${set}`)'
- **Gợi ý sửa:** Chọn một hệ accent duy nhất cho cả 4 set (ví dụ tím Vocabulary) hoặc ít nhất đồng bộ kiểu nút/bo góc giữa hai skin.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 50. Vocabulary/vocabulary-reading-translation-v1-6.html:9-12
- **What:** Toàn bộ màu và font tự chế inline (47 mã hex riêng trong khối <style> dòng 8-13, body Inter + heading/passage Cambria serif) thay vì dùng lớp token dùng chung đã tồn tại (assets/styles/tokens.css: --surface #fffefa, --text-primary #202e32,
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chỉnh so với bản gốc: đếm grep '#[0-9a-f]{3,6}' trong dòng 8-13 → 47 mã hex riêng (bản gốc ghi ~20); grep 'stylesheet' → 0 link CSS ngoài. :9 ':root{--bg:#edf1ec;--paper:#fbfcf8;--green:#356a58;…}'
- **Gợi ý sửa:** Nạp tokens.css/learning.css và dẫn xuất màu–font từ token lesson (lesson-paper/lesson-accent/focus-gold), giữ chỉ accent riêng của bài.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 51. Vocabulary/vocabulary-reading-translation-v1-6.html:9-10
- **What:** Band tiêu đề dùng gradient linear-gradient(135deg,#254f43,#487565) kèm bóng dài 0 12px 34px alpha .09, trong khi DESIGN.md quy định band tiêu đề lesson là dải màu phẳng (#203b3a trong shell dùng chung) và bóng lesson-card chỉ là 'whisper' .
- **Severity:** medium — **Status:** verified
- **Evidence:** :10 '.top{…background:linear-gradient(135deg,#254f43,#487565);…box-shadow:var(--shadow)}' với :9 --shadow '0 12px 34px rgba(32,55,44,.09)'; DESIGN.md:369 '- Lesson: a full-bleed dark band (#203b3a in
- **Gợi ý sửa:** Đổi band sang màu phẳng (kiểu #203b3a theo shell dùng chung) và giảm bóng về mức whisper.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 52. Vocabulary/vocabulary-reading-translation-v1-6.html:95,97,103,412,415
- **What:** Emoji/dingbat làm icon: '🔊 Nghe đoạn' xuất hiện 4 lần làm icon chính của nút audio, '■ Dừng' ở speak(), '✓ Đã học'/'✓ Đã ghi nhận gói này' — chống lại quy tắc không dùng emoji làm icon của chuẩn thẩm mỹ.
- **Severity:** low — **Status:** verified
- **Evidence:** grep -o '🔊' → 4 (tại :97 ×2, :412, :415), '■' → 1 (:103), '✓' → 2 (:95 '✓ Đã học', :412 '✓ Đã ghi nhận gói này') — đã tự chạy và khớp.
- **Gợi ý sửa:** Thay 🔊/■ bằng SVG glyph inline theo hệ icon dùng chung (assets/icons hoặc sprite của trang chủ).
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 53. Vocabulary/ielts-vocabulary-focus.css:20-21
- **What:** Hai nút position:fixed z-index:1000 — 'Tự phát âm' neo góc trên phải (top:14px desktop; ≤580px chuyển top:61px, vẫn trong dải header vì header mobile có padding-bottom 62px) đè lên vùng header/tiêu đề, 'Tập trung' neo góc dưới phải (bottom:
- **Severity:** medium — **Status:** verified
- **Evidence:** CSS:20 `.focus-toggle,.auto-pronounce-toggle{position:fixed;z-index:1000…}` + `.auto-pronounce-toggle{right:18px;top:14px}` + `.focus-toggle{right:18px;bottom:18px}`; CSS:23 (≤580px): main{padding:10p
- **Gợi ý sửa:** Thêm padding-bottom cho .study/.card hoặc neo nút trong luồng header như mẫu Pronunciation Helper của DESIGN.md.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 54. Vocabulary/ielts-vocabulary-focus.js:82
- **What:** Nhãn nút 'Tự phát âm' dùng emoji màu 🔊/🔈 làm icon, không nhất quán với các ký tự mono cùng trang (nav dùng ◷ ▤ ▱ ⇄ ✎ ≋ ⌁ ở practice:6, app dùng ♫ Nghe). Bản gốc dẫn 'chuẩn chống emoji làm icon' — đã grep DESIGN.md và CONTEXT.md, không có
- **Severity:** low — **Status:** verified
- **Evidence:** focus.js:82 `autoButton.textContent = enabled ? '🔊 Tự phát âm: Bật' : '🔈 Tự phát âm: Tắt'`; grep 'emoji|Emoji' DESIGN.md + CONTEXT.md → 0 dòng. ĐÃ CHỈNH what (bỏ khẳng định vi phạm chuẩn không tìm t
- **Gợi ý sửa:** Thay bằng glyph mono cùng hệ (♪/♫) hoặc SVG inline mảnh.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 55. Vocabulary/ielts-vocabulary-focus.css:2,4
- **What:** Bộ từ vựng Vòng 3–4 (chủ đề Vocabulary = tím #6f5ac8 theo bảng topic DESIGN.md:224) chạy trên accent thế giới IELTS đỏ #c43d35 với header đen viền đỏ 4px — kế thừa từ skin "IELTS vocabulary" dùng chung cho các trang vòng 1–2/3–4/5–6 (vong-1
- **Severity:** low — **Status:** verified
- **Evidence:** ielts-vocabulary-focus.css:2 "--focus-accent:#c43d35", :4 "background:#1f1e1c;border-bottom:4px solid var(--focus-accent)"; DESIGN.md:224 "| Vocabulary · Violet | #6f5ac8 |"; DESIGN.md:196 "Each lesso
- **Gợi ý sửa:** Nếu muốn nhất quán hệ accent chủ đề, định nghĩa lại --focus-accent theo tint tím Vocabulary cho body.vocabulary-vong-3-4.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 56. Vocabulary/ielts-vocabulary-focus.css:7-8
- **What:** Đổ bóng dày hơn spec lesson: mọi .card mang shadow 0 12px 30px/14% và learning-card 0 16px 36px/22%, trong khi DESIGN.md:307 định nghĩa bóng lesson là "whisper" 0 8px 26px rgba(32,59,58,.03); cùng lúc body và .card dùng gradient nền (near-f
- **Severity:** low — **Status:** verified
- **Evidence:** ielts-vocabulary-focus.css:7 ".card{background:linear-gradient(145deg,#fffefb,#f8f4ed);...box-shadow:0 12px 30px rgba(50,43,36,.14)}"; :8 "box-shadow:0 16px 36px rgba(45,37,31,.22)"; nền body gradient
- **Gợi ý sửa:** Hạ shadow về mức whisper theo DESIGN.md và thay gradient nền bằng màu phẳng từ token.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 57. Writing/guide.html:10
- **What:** Toàn bộ palette và font tự chế ngoài hệ token: :root định nghĩa --ink:#17213a, --paper:#f7f8fc, --blue:#3157d5, --gold:#f4a524… (khớp không một token nào), trong khi DESIGN.md:226 cho chủ đề Writing là magenta #b8467f và assets/styles/token
- **Severity:** medium — **Status:** verified
- **Evidence:** guide.html:10 `--ink:#17213a;--muted:#667085;--paper:#f7f8fc;…--blue:#3157d5;--cyan:#19a7a0;--gold:#f4a524` (đối chiếu trực tiếp); grep 'rel="stylesheet"|tokens.css' guide.html = NO MATCH → trang khôn
- **Gợi ý sửa:** Map các biến hiện có sang token lesson của tokens.css (lesson-paper/ink/border/focus-gold) và đổi accent sang topic-writing ink #8c2f5d/tint
- **Nguồn:** Writing/guide.html

### 58. Writing/guide.html:10,12
- **What:** Gradient trang trí + bóng dày trên card nghỉ: hero và brand-mark dùng linear-gradient 135deg, và --shadow 0 12px 34px rgba(20,33,61,.09) gắn trên MỌI .card khi chưa chạm — gấp ~3 lần chuẩn lesson 'whisper shadow' 0 8px 26px rgba(32,59,58,.0
- **Severity:** medium — **Status:** verified
- **Evidence:** guide.html:12 `.hero{…background:linear-gradient(135deg,#14213d,#243b6b 65%,#246b70)}`, `.brand-mark{…background:linear-gradient(135deg,#5f7cff,#19a7a0)}`; guide.html:10 `--shadow:0 12px 34px rgba(20,
- **Gợi ý sửa:** Bỏ gradient hero (nền phẳng dark-ink), hạ --shadow về mức whisper hoặc chỉ giữ border 1px như Flat-At-Rest Rule.
- **Nguồn:** Writing/guide.html

### 59. Writing/guide.html:33,54,94,102
- **What:** Dùng ký tự unicode làm icon thay cho SVG: ◐ (nút theme, dòng 33), ✎ (số thứ tự Planner, dòng 94), ✓ (3 thẻ thesis tốt dòng 54 + 1 số thứ tự Checklist dòng 102) và ✕ (thẻ thesis sai dòng 54) — lệch với hệ icon SVG của portal, dễ lệch baselin
- **Severity:** low — **Status:** verified
- **Evidence:** grep đếm từng ký tự trên guide.html: ◐ ×1 (dòng 33), ✎ ×1 (dòng 94), ✓ ×4 (3 ở dòng 54 + 1 ở dòng 102), ✕ ×1 (dòng 54). ĐÃ CHỈNH 'what': bản gốc viết '✓ (Checklist, 4 chỗ)' — sai mô tả vị trí; thực tế
- **Gợi ý sửa:** Thay bằng glyph SVG của assets/icons (hoặc shape CSS) cho các điểm đánh dấu này.
- **Nguồn:** Writing/guide.html

### 60. Writing/meaning-to-english-pipeline-v1-6.html:19
- **What:** Nền palette tự chế 18 màu lạnh (dòng 11-15) được phép theo "accent world" của lesson (DESIGN.md:196), nhưng kèm chi tiết ngược tinh thần "Bàn học": nền body gradient 3 lớp, thanh tiến trình gradient xanh→teal, bóng resting panel dày 0 16px
- **Severity:** low — **Status:** verified
- **Evidence:** Tái hiện: dòng 19: "background:linear-gradient(145deg,#e8eff7 0,#f7f9fc 48%,#edf3f8 100%);…font-family:Inter,…"; dòng 36: "background:linear-gradient(90deg,var(--blue),var(--teal))"; dòng 15/27: "--sh
- **Gợi ý sửa:** Bỏ gradient nền/progress, giảm bóng panel về mức lesson spec, và bỏ khai báo Inter để dùng system-ui theo DESIGN.md.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 61. style.css:3 + viewer.html:8
- **What:** Ở ≤720px, .viewer-bar đổi còn 2 cột grid (auto 1fr) nhưng vẫn có 3 phần tử con, nên .viewer-actions bị auto-place xuống hàng 2 bên trong thanh cao cố định 64px, không có overflow clipping — chip 'Tải xuống' (3 PDF có downloadable:true) tràn
- **Severity:** medium — **Status:** verified
- **Evidence:** style.css:3: `@media(max-width:720px){.viewer-bar{height:64px;grid-template-columns:auto 1fr;padding:0 13px}}` (grep -n viewer style.css); viewer.html:8 có 3 con (a.viewer-back, div tiêu đề, div.viewe
- **Gợi ý sửa:** Giữ 3 cột ở mobile (co gap/padding) hoặc cho hàng tiêu đề + actions dùng lại 1 hàng, hoặc bỏ height cố định cho .viewer-bar ở mobile.
- **Nguồn:** viewer.html

### 62. viewer.html:4
- **What:** theme-color #0b1220 không khớp màu thực của thanh viewer (--navy:#131416, style.css:1) — giá trị cũ sót lại, làm màu thanh địa chỉ trên mobile lệch với header thật.
- **Severity:** low — **Status:** verified
- **Evidence:** viewer.html:4 `<meta name="theme-color" content="#0b1220">`; style.css:1 `--navy:#131416` và `.viewer-bar{...background:var(--navy)}`; body.viewer-page nền #1a1c1f — #0b1220 không khớp màu nào cả.
- **Gợi ý sửa:** Đổi theme-color thành #131416 cho khớp nền viewer-bar.
- **Nguồn:** viewer.html

### 63. Grammar/tense-exercises-answer-key-quiz.html (390×844)
- **What:** Màn hình chính của trang quiz bị tràn ngang nghiêm trọng (~548px), nội dung bị cắt mất hơn nửa chiều rộng màn hình và phải cuộn ngang mới đọc được.
- **Severity:** high — **Status:** verified
- **Evidence:** browser_evaluate tại 390×844: documentElement.scrollWidth=923 vs clientWidth=375, 188 phần tử tràn; gốc là section.card.review-hub rộng 905px do table.tense-table có min-width:850px (dòng 30 file HTML
- **Gợi ý sửa:** Thêm min-width:0 cho các item grid/flex bao quanh .review-hub/.theory-body/.table-wrap (hoặc giảm/bỏ min-width:850px của .tense-table ở brea
- **Nguồn:** trình duyệt

### 64. Vocabulary/vong-1-2-vocabulary-complete-examples.html (1440×900 + 390×844)
- **What:** Nút fixed "⚙ Chọn giọng phát âm" đè lên nút fixed "Tập trung" ở góc dưới phải, che mất phần chữ "Tập " của nhãn nút.
- **Severity:** medium — **Status:** verified
- **Evidence:** browser_evaluate: button.focus-toggle rect [1296,837→1407,882], button.pronunciation-settings-button rect [1313,846→1349,882] → chồng lấn 36×36px, cả hai z-index=1000, không phải quan hệ cha–con; đo l
- **Gợi ý sửa:** Dịch nút bánh răng sang trái hoặc gom 3 nút fixed (⚙, 🔊L, Tập trung) thành một hàng flex có gap để không chồng lên nhau.
- **Nguồn:** trình duyệt

### 65. Vocabulary/personal-flashcards.html (390×844)
- **What:** Cụm nút fixed phát âm (⚙ và 🔊L) đè lên góc dưới-phải nút hành động "Cách hoạt động", che một phần vùng click của nút này.
- **Severity:** medium — **Status:** verified
- **Evidence:** browser_evaluate tại 390×844: nút "Cách hoạt động" rect [192,751→345,806]; gear chồng 36×16px, nút 🔊L chồng 45×16px. Ảnh evidence/pf-390.png cho thấy ⚙/🔊L nằm trên mép nút. Tại 1440×900 hai nút fixed nằm cạn
- **Gợi ý sửa:** Thêm padding-bottom cho khu hành động của panel ở breakpoint mobile hoặc nâng cụm nút fixed lên cao hơn để không trùng với nút cuối của danh
- **Nguồn:** trình duyệt

### 66. viewer.html (390×844)
- **What:** Ở khổ mobile, nút hành động "Mở tab mới" của viewer bị ẩn hoàn toàn (display:none), người dùng trên điện thoại mất hành động này.
- **Severity:** low — **Status:** verified
- **Evidence:** browser_evaluate tại 390×844: #open-original display="none", rect 0×0 (bar cao 64px không còn nút nào bên phải); tại 1440×900 nút hiển thị bình thường rect [1319,16,97,38] và nhận focus rõ (outline au
- **Gợi ý sửa:** Nếu không phải chủ đích responsive, hãy giữ nút ở dạng thu gọn (icon) thay vì ẩn hẳn ở mobile.
- **Nguồn:** trình duyệt

### 67. …13 trang
- **What:** 13/28 trang không nạp assets/styles/tokens.css mà tự khai báo :root token riêng, tạo nhiều hệ màu/token song song với giá trị lệch nhau dù cùng ngôn ngữ thiết kế.
- **Severity:** high — **Status:** verified
- **Evidence:** Đo lại từng trang (grep -c ':root' + grep -c 'styles/tokens.css'): 19/28 trang có :root inline, đúng 13 trang có :root nhưng KHÔNG nạp tokens.css; 7 trang nạp tokens.css (vocabulary-practice, root-atl
- **Gợi ý sửa:** Mở rộng tokens.css (hiện có --surface/--text-primary/--border/--focus, chưa có --ink/--line) thành bộ token chung rồi chuyển dần các trang i
- **Nguồn:** đối chiếu hệ thống

### 68. Verb/english-verbs.html:8-9, Verb/five-forms-of-verbs-with-3rd-person.html:8-10, Verb/phrasal-verbs.html:7-9, Vocabulary/confusing-words.html:8-9, index.html:14
- **What:** Nhiều hệ font sống đồng thời: 4 lesson tự nạp Google Fonts riêng (mỗi trang một bộ), trang chủ dùng bộ khác, 24/28 trang dùng font hệ thống, và 2 trang tham chiếu Inter mà không trang nào nạp.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại grep fonts.googleapis.com → đúng 4 lesson × 2 refs: english-verbs:8-9 (Be Vietnam Pro), five-forms:8-10 (Nunito Sans, preconnect gstatic :9), phrasal-verbs:7-9 (Fraunces+IBM Plex Sans), confusi
- **Gợi ý sửa:** Chốt một bộ font thương hiệu (hoặc token --font-* trong tokens.css) và thay các URL css2 riêng lẻ bằng một stylesheet dùng chung.
- **Nguồn:** đối chiếu hệ thống

### 69. viewer.html:4-5, index.html:7,15
- **What:** viewer.html vẫn chạy trên stylesheet legacy style.css trong khi trang chủ đã chuyển sang home.css và 28 lesson tự dựng CSS riêng → chroma trình xem tài liệu lệch cả hai phía.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại grep 'href="…style.css' toàn repo → chỉ viewer.html:5 khớp; index.html:15 nạp home.css?v=20261114-motion-1. theme-color lệch: viewer.html:4 #0b1220 vs index.html:7 #0b1013; viewer.html:5 title
- **Gợi ý sửa:** Cập nhật viewer.html sang home.css/tokens chung và thống nhất theme-color một giá trị.
- **Nguồn:** đối chiếu hệ thống

## ux (47 finding)

### 1. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:11, :75, :76
- **What:** Trang không có bất kỳ liên kết nào về thư viện/viewer trong UI của mình; khi mở trực tiếp (bookmark, mở file, lịch sử) người dùng chỉ còn nút Back của trình duyệt.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep toàn file: chỉ có 3 href — '#main' (skip link nội bộ), '../assets/favicon.svg' và link British Council bên ngoài; topbar :11 chỉ có nút Mục lục/A+/In; ch-nav :75 chỉ chuyển chương; footer :76 chỉ
- **Gợi ý sửa:** Thêm một liên kết nhỏ 'Về thư viện' (index.html/viewer) vào sidebar-footer hoặc topbar cho trường hợp mở trực tiếp.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 2. Grammar/conjunctions-theory-practice.html:3,32
- **What:** Khi mở trực tiếp (URL chia sẻ/bookmark) trang không có lối nào về trang chủ hay viewer: file không chứa link index.html/viewer.html nào, nút tròn cố định duy nhất chỉ là anchor cuộn lên đầu trang.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy lại: grep 'index.html|viewer.html' trên file = 0 khớp; dòng 32: `<a class="back" href="#top">↑</a>`; data/documents.js:25 đăng ký id 'conjunctions' với path này, và tôi tự kiểm tra viewer.js:3
- **Gợi ý sửa:** Thêm link 'Về thư viện' ở đầu mục lục hoặc cạnh badge hero (trỏ ../index.html hoặc ../viewer.html?id=conjunctions).
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 3. Grammar/conjunctions-theory-practice.html:31,52
- **What:** Ô tìm kiếm trong phần bài mở rộng không có trạng thái rỗng: gõ chuỗi không khớp ẩn toàn bộ câu hỏi mà không hiện thông báo 'không tìm thấy' hay lối xóa tìm kiếm, nhóm bài trông trống trơn không giải thích.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 52: `q.style.display=q.dataset.search.includes(t)?'block':'none'` — không có nhánh nào cho trường hợp 0 kết quả; tôi đọc lại docs/redesign/homepage/homepage-redesign-plan.md mục 6 ('Trạng
- **Gợi ý sửa:** Hiện một dòng 'Không tìm thấy câu nào' kèm nút xóa tìm kiếm khi bộ lọc cho 0 kết quả.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 4. Grammar/english-suffix-lab.html:186-217
- **What:** Không có lối nào về trang chủ/viewer trên trang (grep chỉ thấy favicon :7 và anchor nội trang :226); mở trực tiếp URL sẽ là dead-end. Giảm nhẹ: viewer.js:20 nhúng trang bằng iframe nên khi mở qua portal vẫn có thanh back của viewer, và 5 tr
- **Severity:** low — **Status:** verified
- **Evidence:** Tự chạy grep href= toàn file → chỉ :7 (../assets/favicon.svg) và :226 (8 anchor nội trang), không có href về ../index.html hay ../viewer.html. Đã đọc viewer.js:20 `frame.src = doc.path` (iframe). Kiểm
- **Gợi ý sửa:** Thêm một link "← Thư viện" ở sidebar/hero theo pattern coral→teal của Open Door Rule (DESIGN.md:251).
- **Nguồn:** Grammar/english-suffix-lab.html

### 5. Grammar/english-suffix-lab.html:170,597
- **What:** Thanh nộp bài position:sticky bottom:10px (z-index 4) trôi phủ phần dưới danh sách câu thi khi cuộn, trong khi #examList/#examResult không có padding-bottom bù — ở 360px lựa chọn cuối của câu đang đọc có thể bị che tạm thời.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc: :170 .exam-toolbar-bottom{position:sticky;bottom:10px;...;z-index:4}; .exam-list (:151) và #examList (:597) không có padding-bottom bù, 2 media query :171-180 cũng không bù. Thanh sticky-botto
- **Gợi ý sửa:** Thêm padding-bottom (~72px) cho khối thi, hoặc thu gọn thanh thành một hàng cuộn ngang trên mobile.
- **Nguồn:** Grammar/english-suffix-lab.html

### 6. Grammar/prepositions-theory-practice.html:43
- **What:** Trang không có bất kỳ lối nào về trang chủ/viewer: nút cố định duy nhất là anchor #top (lên đầu trang), footer chỉ có chữ, không link index.html hay viewer.html nào trong toàn file.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 43: <a class="back" href="#top" aria-label="Lên đầu">↑</a>; grep toàn file chỉ còn href đến favicon (dòng 6), CDN (dòng 11) và anchor trong trang (dòng 15). Đã đọc DESIGN.md:251 (Open Door Rule):
- **Gợi ý sửa:** Thêm một link "Về thư viện" (viewer.html/index.html) ở đầu trang hoặc footer theo Open Door Rule của DESIGN.md.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 7. Grammar/prepositions-theory-practice.html:9 (bảng tại 17,21,23,25,29,37)
- **What:** 6 bảng lý thuyết 3 cột không có chiến lược thay thế cho màn hình nhỏ (không overflow-x wrapper, không stack): ở 360px vùng nội dung card còn ≈296px, các token dài không có điểm ngắt ("ngày/thứ/ngày" ~13 ký tự ở dòng 23) sẽ đẩy bảng tràn nga
- **Severity:** medium — **Status:** unconfirmed
- **Evidence:** Dòng 9: `table{border-collapse:collapse;width:100%}`; grep 'overflow' = 2, đều là overflow:hidden trên .progress/.group — không có overflow-x wrapper nào; media ≤850px chỉ đổi padding/grid. ĐÃ CHỈNH d
- **Gợi ý sửa:** Bọc bảng trong div overflow-x:auto (kèm chỉ dẫn cuộn) hoặc chuyển bảng 3 cột sang danh sách định nghĩa ở ≤480px.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 8. Grammar/prepositions-theory-practice.html:73
- **What:** Tìm kiếm không có trạng thái rỗng: khi không còn câu khớp, toàn bộ .q bị display:none và panel chỉ còn hàng nút chấm — không có thông báo "không tìm thấy" hay lối xoá nhanh tìm kiếm.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 73: `q.style.display=q.dataset.search.includes(term)?'block':'none'` — không đếm kết quả, không nhánh rỗng; input#search (dòng 41) là text input thường, không có nút xoá.
- **Gợi ý sửa:** Đếm số câu khớp và hiện thông báo + nút "Xoá tìm kiếm" khi count = 0.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 9. Grammar/prepositions-theory-practice.html:9,43
- **What:** Nút fixed "↑" (42px, góc phải-dưới) đè lên chữ footer khi cuộn hết trang ở viewport hẹp: footer căn giữa, padding 20px, câu chữ dài sẽ chạy vào vùng 18px–60px tính từ mép phải nơi nút cố định chiếm chỗ.
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** Dòng 9: `.back{position:fixed;right:18px;bottom:18px;…width:42px;height:42px}` và `footer{text-align:center;padding:20px}` — code facts khớp finding gốc; footer dòng 43 dài ~85 ký tự. Chưa render được
- **Gợi ý sửa:** Thêm padding-bottom cho footer/body (≥56px) hoặc chuyển nút lên góc trên phải để không đè chữ.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 10. Grammar/prepositions-theory-practice.html:39 (so với 71,72)
- **What:** Nút "Làm lại" của bộ rút gọn không xoá điểm cũ: resetSet không đụng #compactScore nên sau khi xoá trắng toàn bộ ô, điểm và tỉ lệ của lần chấm trước vẫn hiển thị, trong khi nhánh bộ mở rộng resetActive() có xoá #extendedScore — hai nhánh xử
- **Severity:** low — **Status:** verified
- **Evidence:** Bổ sung mới khi đọc lại (finding gốc bỏ sót), đã tự xác minh bằng code: dòng 39: `onclick="resetSet('compactQs')"`; dòng 71 resetSet chỉ reset .blank và ẩn feedback, không đụng score; dòng 72: `functi
- **Gợi ý sửa:** Cho resetSet nhận scoreId (hoặc xoá span.score cùng set) để nút Làm lại của bộ rút gọn cũng xoá điểm như resetActive.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 11. Grammar/same-word-different-parts-of-speech.html:9
- **What:** Trang không có lối nào về trang chủ/viewer — mục lục bên (:3) và nút tròn nổi đều là anchor trong trang; người truy cập trực tiếp (không qua viewer) không thể quay lại thư viện, trong khi DESIGN.md (Open Door Rule) coi link back-to-library
- **Severity:** medium — **Status:** verified
- **Evidence:** :9 <a class="back" href="#top">↑</a> chỉ lên đầu trang. Đã chạy: grep -n 'index.html\|viewer.html' Grammar/*.html → 0/6 trang khớp; index.html và viewer.html đều tồn tại ở root; Open Door Rule tại DES
- **Gợi ý sửa:** Thêm link về thư viện (index.html hoặc viewer) ở đầu trang, giữ nút ↑ riêng cho cuộn lên.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 12. Grammar/same-word-different-parts-of-speech.html:5
- **What:** Các bảng 3 cột (phép thử nhận diện :5, đối chiếu cũ/mới :6) không có wrapper cuộn ngang hay điều chỉnh responsive — phân tích tĩnh ở 360px: sau khi trừ .wrap 12px×2 và .card 20px×2 (@880px) còn ~296px bảng, chia 3 cột với td padding 10px mỗ
- **Severity:** low — **Status:** verified
- **Evidence:** :5-6 bảng 3 cột 'Kiểm tra/Dấu hiệu/Ví dụ' và 'Tài liệu cũ/Hiện đại/Ví dụ', không wrapper overflow; media query duy nhất @880px (:2) không đụng bảng; th,td padding 10px (:2). ĐÃ CHỈNH phép tính: bản gố
- **Gợi ý sửa:** Bọc bảng trong wrapper overflow-x:auto với riêng tabindex, hoặc gộp cột ở ~480px.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 13. Grammar/tense-exercises-answer-key-quiz.html:40
- **What:** Trang không có bất kỳ liên kết nào về index.html/viewer.html; ai mở trực tiếp (Open original từ viewer hoặc công cụ tìm kiếm) chỉ còn nút back của trình duyệt để thoát.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy grep -o 'href="[^"]*"' → chỉ ../assets/favicon.svg (dòng 6) và https://cdn.jsdelivr.net (dòng 38); không anchor nào tới index/viewer; nút #back (dòng 105) chỉ ẩn/hiện section trong trang. data
- **Gợi ý sửa:** Thêm một link ghost "← Thư viện" trỏ ../index.html cạnh nút "← Chọn lại" cho các lượt mở trực tiếp.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 14. Verb/english-verbs.html:178 (toàn trang)
- **What:** Trang không có lối về trang chủ/thư viện: liên kết duy nhất trong body là link chéo sang Verb Transformation Lab; khi mở trực tiếp bằng URL (GitHub Pages) người dùng không có đường thoát — chỉ khi mở qua viewer (data/documents.js:34 đăng ký
- **Severity:** medium — **Status:** verified
- **Evidence:** grep href toàn file: anchor duy nhất trong body là dòng 178 → five-forms-of-verbs-with-3rd-person.html. data/documents.js:34 đăng ký 'english-verbs' (featured:true). Đã CHỈNH: chi tiết 'homeLink:false
- **Gợi ý sửa:** Thêm một link "← Về thư viện" (../index.html hoặc viewer.html) ở header/footer.
- **Nguồn:** Verb/english-verbs.html

### 15. Verb/five-forms-of-verbs-with-3rd-person.html:4
- **What:** Trang không có bất kỳ thẻ <a> nào (href duy nhất là favicon và Google Fonts) — không có lối về viewer/index.html; Open Door Rule (DESIGN.md:251) nêu 'back to library' link là phần cố định của lessons. Khi mở trực tiếp trên GitHub Pages, ngư
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -c '<a ' → 0; grep -n 'href=' → chỉ dòng 4 (favicon), 8-10 (preconnect + Google Fonts). Đã đọc DESIGN.md:251 nguyên văn: '…the coral-to-teal handoff at the "back to library" link stay fixed'. Lưu
- **Gợi ý sửa:** Thêm link '← Thư viện' ở đầu trang trỏ về ../index.html hoặc viewer theo mẫu các bài học khác.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 16. Verb/five-forms-of-verbs-with-3rd-person.html:291
- **What:** Không lưu tiến độ nào (grep -c 'localStorage' = 0): buổi luyện tới 100/tất cả câu mất sạch khi tải lại trang, trong khi các bài học Verb khác dùng assets/learning/persistence.js + session.js; trang cũng không hứa lưu nên không phá hợp đồng,
- **Severity:** low — **Status:** verified
- **Evidence:** grep -c localStorage → 0; dòng 291: let deck=[],i=0,score=0,wrong=[],answered=false chỉ là biến phiên; grep trực tiếp xác nhận Verb/phrasal-verbs.html:356-357 nạp persistence.js + session.js.
- **Gợi ý sửa:** Nếu thêm lưu tiến độ, dùng persistence.js với key ổn định thay vì tự chế key localStorage mới.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 17. Verb/paraphrase-80-flashcards.html:422-437
- **What:** Hai nút đánh giá hoạt động cả khi thẻ chưa lật: bấm 'Chưa thuộc'/'Đã thuộc' trên mặt trước là thẻ nhảy sang thẻ kế mà mặt sau (nghĩa + từ thay thế) chưa từng hiển thị — người học mất luôn nội dung cần học; code có dispatch REVEAL vào sessio
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại dòng 422-437: btnYes/btnNo chỉ dispatch REVEAL ở mức session (425, 433) rồi gọi next() (428, 436); next() (391-398) set flipped=false, remove class 'flipped', idx+1; không nhánh nào set flippe
- **Gợi ý sửa:** Khi bấm đánh giá trên mặt trước, lật hẳn thẻ hiển thị đáp án trước khi chuyển (hoặc vô hiệu nút đánh giá cho đến khi đã lật).
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 18. Verb/paraphrase-80-flashcards.html:217
- **What:** Khi mở trực tiếp (URL chia sẻ/bookmark) trang không có lối về trang chủ/viewer nào — footer (217) chỉ là chữ thường; kiểm tra grep: 0/4 trang Verb có link index/viewer nên đây là điểm yếu hệ thống, riêng trang này bớt nghiêm trọng vì đã đăn
- **Severity:** low — **Status:** verified
- **Evidence:** Chạy lại: grep -loE 'href="(\./|\.\./)?(index|viewer)\.html' Verb/*.html → không file nào khớp (exit=1) trên cả 4 trang Verb; dòng 217 đúng footer chỉ text 'The Real IELTS · 80+ Cụm chữa yếu Paraphras
- **Gợi ý sửa:** Thêm một link '← Thư viện' (index.html hoặc viewer) vào header/footer của trang, nhất quán với các trang học liệu khác.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 19. Verb/phrasal-verbs.html:248-251, 296
- **What:** Trang không có bất kỳ liên kết nào về index.html hay viewer.html (khớp dữ liệu nền homeLink:false) — mở trực tiếp URL thì bị dead-end; chỉ khi vào qua viewer.html?id=phrasal-verbs (data/documents.js:37) mới có thanh back của viewer.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep trang: 0 thẻ <a>; header chỉ có h1 + .sub (248-251); footer là text trần "66 Phrasal Verbs Cực Mạnh · …" (296). data/documents.js:37 = đúng entry phrasal-verbs; DESIGN.md:251 (Open Door Rule nêu
- **Gợi ý sửa:** Thêm một link "← Thư viện" ở đầu trang theo mẫu hình back-to-library của hệ (DESIGN.md:251).
- **Nguồn:** Verb/phrasal-verbs.html

### 20. Vocabulary/confusing-words.html (toàn trang; header :542-549)
- **What:** Toàn trang không có một anchor <a> nào — không lối về index.html/viewer; khi mở trực tiếp (không qua viewer.html) người dùng bị mắc kẹt, lệch với quy ước các trang Vocabulary chị em.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep '<a ' toàn file = 0 (đã chạy); đọc toeic-600.html:16 có <a href="../index.html">← English 101</a> và viewer.html:8 có viewer-back về index.html; DESIGN.md:251 Open Door Rule yêu cầu giữ handoff "
- **Gợi ý sửa:** Thêm topline "← Thư viện" như toeic-600.html; viewer.html:8 đã có back link nên chỉ cần cho luồng mở trực tiếp.
- **Nguồn:** Vocabulary/confusing-words.html

### 21. Vocabulary/ielts-collocations-topic-table-with-dictation.html:1-384
- **What:** Mở trực tiếp trang không có lối về trang chủ/viewer nào: grep toàn file cho 'viewer.html|index.html' = 0 match; người dùng vào bằng URL chia sẻ hoặc viewer mở tab mới không có header/back link (CSS còn sẵn selector body>header cho header kh
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện: `grep -c "viewer.html\|index.html" Vocabulary/ielts-collocations-topic-table-with-dictation.html` → 0; đọc toàn file không có <header> hay <a> điều hướng ngoài tab nội bộ. Trang chị em to
- **Gợi ý sửa:** Thêm link 'Về thư viện' (index.html) hoặc nút quay lại viewer (history.back nếu có ?ref) đầu trang, theo mẫu header mà modern.css đã chuẩn b
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 22. Vocabulary/ielts-c1-c2-modern.js:71
- **What:** Bắt đầu phiên khi pool rỗng thì im lặng: `if(!deck.length)return;` — nút 'Bắt đầu phiên mới →' không phản hồi gì, không thông báo; đã đo xác nhận có đúng 1/22 chủ đề ('Types of communication C1') mà mọi row đều cloze-unmatched nên chọn chủ
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện: js:71 `deck=shuffle(pool).slice(0,count);if(!deck.length)return;` không alert/message. Node đo: 'topics ALL unmatched: 1 ["Types of communication C1"]'.
- **Gợi ý sửa:** Khi deck rỗng, hiện thông báo trong quizSetup (theo what→why→how: không có câu phù hợp vì lý do X → chọn chủ đề/dạng khác) thay vì return lặ
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 23. assets/keyboard-pronunciation.js:96-97 + Vocabulary/ielts-collocations-modern.css:47
- **What:** Hai nút phát âm position:fixed (bottom/right 18px, z-index 1000, keyboard-pronunciation.js tự chèn) trôi phía trên nội dung ở góc dưới-phải; ở ≤720px quiz-actions thành nút full-width 1 cột (modern.css:47). Chưa tái hiện được việc 'che chữ
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** Đã xác nhận CSS: keyboard-pronunciation.js:96 `.pronunciation-shortcut,.pronunciation-settings-button{position:fixed;bottom:18px;z-index:1000;…}` + :97 `{right:18px;padding:9px 13px}` / settings-butto
- **Gợi ý sửa:** Kiểm tra trực quan ở 360px; nếu che thì thêm padding-bottom cho body/.quiz-card ở mobile hoặc chuyển nút phát âm thành bottom-sheet theo đún
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 24. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:101
- **What:** Không có lối về trang chủ/viewer nào trên trang (0 link tới index.html/viewer.html) — người vào trực tiếp từ GitHub Pages không có cách quay lại thư viện, chỉ có link sang trang C1–C2 Topic Bank.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -n "index\.html\|viewer\.html" trên toàn file → exit 1 (0 match); link duy nhất ra ngoài là header-stats:101 href="ielts-collocations-topic-table-with-dictation.html"; unit-nav (js:29) chỉ là anc
- **Gợi ý sửa:** Thêm link '← Thư viện' tới ../index.html (hoặc viewer.html) trong header-stats, theo mẫu 'back to library' của DESIGN.md:251.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 25. Vocabulary/root-atlas.html:3 (header và footer) — toàn trang
- **What:** Không có bất kỳ liên kết nào về index.html hay viewer.html trên toàn trang; người mở trực tiếp URL chỉ còn lùi bằng nút Back của trình duyệt, contrary tới quy ước 'back to library' cố định của hệ bài học.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -o 'index\.html\|viewer\.html' trên file → 0 kết quả; header (:3) và footer (:3) chỉ là chữ mô tả — các link duy nhất trong trang đều trỏ etymonline/merriam-webster (:14, :31); DESIGN.md:251 (Ope
- **Gợi ý sửa:** Thêm link '← Về thư viện' (index.html hoặc viewer.html?id=…) ở đầu header hoặc footer.
- **Nguồn:** Vocabulary/root-atlas.html

### 26. Vocabulary/root-atlas.html:2 (#toast) + assets/keyboard-pronunciation.js:96-97
- **What:** Toast fixed đáy giữa rộng tới 90vw (z-index:9) nằm cùng dãy đáy màn hình với 2 nút phát âm fixed bottom:18px (z-index:1000) — ở 360px hai cụm đè lên nhau trong 3,5s, chữ toast bị nút phát âm che mất góc phải.
- **Severity:** low — **Status:** verified
- **Evidence:** root-atlas.html:2 `#toast{position:fixed;bottom:20px;left:50%;…max-width:90vw;z-index:9}`, hiển thị 3500ms (:9); keyboard-pronunciation.js:96-97 hai nút fixed bottom:18px, right:18px/right:76px, z-ind
- **Gợi ý sửa:** Nâng toast lên trên cụm phát âm (ví dụ bottom:72px) hoặc thu maxWidth còn calc(100vw - 120px).
- **Nguồn:** Vocabulary/root-atlas.html

### 27. Vocabulary/c1-vocabulary.css:60,73 (qplay .prompt / .question-card .prompt)
- **What:** Prompt chế độ flashcard/practice không có overflow-wrap/word-break nào trong 2 file CSS, nhưng ước tính tràn ngang 360px của giám định ban đầu không tái hiện được: do cascade, font thực tế của prompt phiên là clamp(31px,5vw,52px) (line 73 đ
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** Đã chạy: grep 'overflow-wrap|word-break' c1-vocabulary.css + toeic-600.css → 0 match (exit 1); node: longest word 'inconsiderately' (15). Ước tính tĩnh 360px: wrap=340 (breakpoint ≤500px dùng 100%−20p
- **Gợi ý sửa:** Thêm overflow-wrap:anywhere cho .prompt (và .word) trong breakpoint hẹp.
- **Nguồn:** Vocabulary/toeic-600.html

### 28. Vocabulary/ielts-vocabulary-focus.css:4,5,6 → Vocabulary/vocabulary-atlas.html:6
- **What:** Skin dùng chung ielts-vocabulary-focus.css ẩn 2 tab riêng của trang ('Kết quả gộp' và 'Hướng dẫn' — nơi chứa phím tắt, cài giọng, xuất/nhập tiến độ) cùng hàng thống kê, đoạn mô tả hero '966 mục từ…', footer ghi chú tiến độ và khối 'Bộ lọc t
- **Severity:** high — **Status:** verified
- **Evidence:** Đọc lại khớp 100%: ielts-vocabulary-focus.css:5 `nav button[data-tab="synonyms"],…[data-tab="audit"],nav button[data-tab="guide"]{display:none}`; :4 `header p,.emblem,.stats,footer{display:none}`; :6
- **Gợi ý sửa:** Giới hạn các bộ chọn ẩn theo body class của từng trang (như tiền lệ body.vocabulary-vong-1-6 tại :26-45) thay vì ẩn toàn cục cho mọi trang n
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 29. Vocabulary/vocabulary-atlas.html:6 (grep toàn file)
- **What:** Không có lối về trang chủ, viewer hay trang từ vựng anh em nào (0 liên kết nội bộ ngoài tab nội trang) — lệch 'Open Door Rule' của DESIGN.md vốn giữ cố định handoff 'back to library' giữa portal và bài học.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tự chạy lại grep: 0 kết quả cho 'index.html' và 'viewer.html'; toàn bộ href là ../assets/* và link ngoài (Cambridge, Merriam-Webster ×5, GitHub). DESIGN.md:251 đúng nguyên văn: 'The Open Door Rule … t
- **Gợi ý sửa:** Thêm một link 'Về thư viện' (index.html hoặc viewer.html) ở header hoặc footer.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 30. Vocabulary/ielts-vocabulary-focus.css:4
- **What:** Không có chỉ báo tải khả kiến: 'Đang tải bộ từ vựng…' (header p), .stats và footer đều bị display:none trong khi phải tải 1,2–8,2MB JS dữ liệu trước khi render, để #content trống trơn; trang cũng không có <noscript> và eyebrow tĩnh 'VÒNG 1–
- **Severity:** medium — **Status:** verified
- **Evidence:** focus css:4 'header p,.emblem,.stats,footer{display:none}' — tôi rà cả 46 dòng focus css: không có rule nào hiện lại các phần tử này (learning.css chỉ đặt color cho header p) nên dòng 'Đang tải bộ từ
- **Gợi ý sửa:** Render skeleton/spinner vào #content ngay khi mở trang và không ẩn dòng trạng thái tải cho đến khi app render xong.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 31. Vocabulary/vocabulary-practice.html:6
- **What:** Không có lối về trang chủ/viewer: toàn trang chỉ link tới 3 file vòng và 1 URL ngoài (workers.dev), không có đường về index.html hay viewer.html, và trang không được đăng ký trong data/documents.js — người dùng vào sâu 2-3 tầng chỉ còn nút
- **Severity:** medium — **Status:** verified
- **Evidence:** Tôi chạy: grep -c 'vocabulary-practice' data/documents.js index.html viewer.html → 0/0/0. Khối 'Học tiếp' (HTML:6) chỉ chứa 3 link vong-* và 1 link ngoài workers.dev; header chỉ có hero, không có link
- **Gợi ý sửa:** Thêm link '← Về thư viện' (index.html hoặc viewer.html?id=…) ở header/khối Học tiếp và đăng ký Resource vào catalogue.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 32. assets/styles/learning.css:1
- **What:** Toast thông báo (fixed đáy giữa, max-width:90vw, z-index:20) có thể bị hai nút cố định 'Tập trung/Tự phát âm' (fixed phải, z-index:1000, bottom:11px ở ≤580px) đè một phần chữ ở màn hình 360px.
- **Severity:** low — **Status:** verified
- **Evidence:** learning.css:1 '#toast{position:fixed;bottom:20px;…max-width:90vw;z-index:20}' vs focus css:20 '.focus-toggle,.auto-pronounce-toggle{position:fixed;z-index:1000;…}.focus-toggle{right:18px;bottom:18px}
- **Gợi ý sửa:** Hạ z-index hai toggle dưới toast hoặc nâng toast lên trên/nới max-width tránh mép phải.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 33. Vocabulary/vocabulary-reading-translation-v1-6.html:17,25
- **What:** Trang không có lối về trang chủ/viewer (homeLink=false): header chỉ có eyebrow chữ, footer :25 chỉ chứa 3 link IELTS/Cambridge ngoài — mở trực tiếp qua URL sâu là dead-end (khi mở qua viewer.html thì có thanh back của viewer bù lại).
- **Severity:** low — **Status:** verified
- **Evidence:** grep '<a href' toàn trang → đúng 3 kết quả, tất cả tại :25 và đều ngoài (ielts.org ×2, cambridgeenglish.org); header :17 chỉ có eyebrow chữ, không anchor nào. DESIGN.md:251 Open Door Rule giữ 'the cor
- **Gợi ý sửa:** Thêm link 'Về thư viện' (index.html/viewer) ở đầu trang theo mô hình handoff coral→teal của hệ.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 34. Vocabulary/vocabulary-practice.html:6 (trang đích của redirect)
- **What:** Cả chuỗi trang (stub → vocabulary-practice.html) không có một đường nào về index.html hay viewer.html: ai mở trực tiếp URL của Resource này (catalogue đăng ký là vocab-1-2, data/documents.js:10) sẽ vào app học mà không có lối thoát ra cổng
- **Severity:** medium — **Status:** verified
- **Evidence:** grep 'index.html|viewer.html' trên vocabulary-practice.html, vocabulary-rounds-app.js, vocabulary-rounds-bootstrap.js, ielts-vocabulary-focus.js/.css → 0 kết quả (grep exit=1); card 'Học tiếp' (practi
- **Gợi ý sửa:** Thêm link 'Về thư viện' (index.html hoặc viewer.html?id=vocab-1-2) ở header hoặc footer của trang đích.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 35. Vocabulary/ielts-vocabulary-focus.css:5 (+ Vocabulary/vocabulary-practice.html:6, assets/learning/vocabulary-rounds-app.js:64,78)
- **What:** FINDING BỔ SUNG: Nav của skin này ẩn hẳn nút '≋ Đồng nghĩa' và '⌁ Tiến độ & cài đặt' (display:none), nên trang sao lưu/xuất-nhập tiến độ mà footer quảng cáo ('Xuất/Nhập để chuyển thiết bị · Giọng đọc tùy thiết bị') chỉ với tới được sau khi
- **Severity:** medium — **Status:** verified
- **Evidence:** CSS:5 `nav button[data-tab="synonyms"],nav button[data-tab="progress"],nav button[data-tab="audit"],nav button[data-tab="guide"]{display:none}` — chỉ body.vocabulary-vong-1-6 mở lại ở CSS:34; body cla
- **Gợi ý sửa:** Bật lại hai nút nav cho skin vòng 1–2 (như skin vong-1-6) hoặc đặt xuất/nhập/giọng đọc ở nơi luôn hiển thị.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 36. Vocabulary/vocabulary-practice.html:6
- **What:** Không có bất kỳ lối nào về trang chủ (index.html) hoặc viewer/catalogue trên cả stub lẫn trang practice — toàn bộ link trong card 'Học tiếp' chỉ sang 3 trang vòng (1–2/3–4/5–6) và 1 link external workers.dev; trái quy tắc Open Door Rule (DE
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc toàn bộ vocabulary-practice.html (14 dòng): card 'Học tiếp' chỉ có 3 link vòng + link workers.dev; không có link nào sang index.html/viewer.html (cả hai file tồn tại ở root — đã ls); router.js
- **Gợi ý sửa:** Thêm một link "← Về thư viện" (index.html hoặc viewer.html) trong header hoặc card Học tiếp.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 37. Vocabulary/ielts-vocabulary-focus.css:5-6
- **What:** CSS ẩn 2/7 tab điều hướng ("Đồng nghĩa", "Tiến độ & cài đặt") và cả khối bộ lọc nâng cao (vòng/từ loại/loại lỗi/sắp xếp) đã dựng trong HTML, khiến xuất/nhập tiến độ, cài đặt giọng đọc, legacy import và toàn bộ 47 bài luyện đồng nghĩa (53 nh
- **Severity:** medium — **Status:** verified
- **Evidence:** ielts-vocabulary-focus.css:5 "nav button[data-tab=\"synonyms\"],...[data-tab=\"progress\"],...{display:none}", :6 ".filters details{display:none}"; vocabulary-practice.html:6 có đủ 7 nút nav + footer
- **Gợi ý sửa:** Bỏ 2 selector display:none này hoặc thay bằng một nút phụ (vd. trong card Học tiếp) dẫn tới tab Tiến độ.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 38. Vocabulary/ielts-vocabulary-focus.js:93-95
- **What:** Tự phát âm tự động phát với lang/rate cứng 'en-GB'/0.86 và phím tắt phát âm đăng ký lang/rate một lần lúc tải trang (khi #accent/#rate chưa tồn tại trên DOM → luôn rơi fallback 'en-GB'/0.86), nên cài đặt "Giọng ưu tiên/Tốc độ" người học lưu
- **Severity:** low — **Status:** verified
- **Evidence:** ielts-vocabulary-focus.js:14-15 "lang: document.querySelector('#accent')?.value || 'en-GB', rate: Number(document.querySelector('#rate')?.value) || .86" — register() chỉ chạy một lần (:17,:23) khi pro
- **Gợi ý sửa:** Cho auto-pronounce đọc state.settings (biến global của app) và cho phép đăng ký lại lang/rate khi người dùng đổi cài đặt.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 39. Vocabulary/vong-5-6-vocabulary-complete-examples.html:5
- **What:** Đoạn dự phòng khi redirect thất bại không có lối nào về trang chủ/viewer: liên kết duy nhất trỏ chính tới đích redirect đã hỏng, người học bị kẹt lại trang trắng trống.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện: dòng 5 chỉ có đúng 1 <a> tới vocabulary-practice.html?set=vong-5-6 (trùng đích của meta refresh và location.replace). Lệnh tôi chạy: grep -c -E "index\.html|viewer\.html" Vocabulary/vong-
- **Gợi ý sửa:** Thêm một liên kết phụ về ../index.html (hoặc viewer.html?id=vocab-5-6) cạnh liên kết chính trong đoạn dự phòng của stub — đây là chỗ hợp lý
- **Nguồn:** Vocabulary/vong-5-6-vocabulary-complete-examples.html

### 40. Writing/guide.html:23,33
- **What:** Trang không có bất kỳ lối về trang chủ/viewer nào trong chính nó: grep 'index.html|viewer.html' = 0 lần; breadcrumb dòng 33 là <div> chữ trống ('Essay Lab / Bắt đầu'), brand 'Essay Guide' dòng 23 cũng là <div> không phải <a> — ai mở trang t
- **Severity:** medium — **Status:** verified
- **Evidence:** ĐÃ CHỈNH evidence so với bản gốc 2 điểm, ghi rõ tại đây: (1) bỏ claim 'homeLink:false' — grep -rn 'homeLink' toàn repo = 0 hit, entry thực tế data/documents.js:31 {id:'essay-guide', path:'Writing/guid
- **Gợi ý sửa:** Biến crumb/brand thành <a href="../index.html"> (hoặc viewer.html về đúng Resource) theo yêu cầu 'back to library' của Open Door Rule (DESIG
- **Nguồn:** Writing/guide.html

### 41. Writing/guide.html:12,13,116
- **What:** Chế độ tập trung không trọn vẹn trên mobile: body.focus chỉ ẩn .sidebar và .topbar (dòng 12), nên ở ≤920px thanh select fixed đáy màn (.mobile-nav, position:fixed bottom:10px — dòng 13) vẫn nổi trong chế độ 'viết không xao nhãng'.
- **Severity:** low — **Status:** verified
- **Evidence:** guide.html:12 `body.focus .sidebar,body.focus .topbar{display:none}`; guide.html:13 `@media(max-width:920px){…​.mobile-nav{display:block;position:fixed;z-index:10;…​bottom:10px…​}}`; guide.html:116 fo
- **Gợi ý sửa:** Thêm .mobile-nav (và .focus-exit đã xử lý) vào bộ chọn body.focus để ẩn luôn khi vào chế độ tập trung.
- **Nguồn:** Writing/guide.html

### 42. Writing/guide.html:13,30
- **What:** Ở ≤920px .sidebar{display:none} làm biến mất widget tiến độ checklist duy nhất (.side-progress 'x/12 mục hoàn thành' + thanh bar, dòng 30) — trên mobile người học không còn chỗ nào xem tổng tiến độ của mình.
- **Severity:** low — **Status:** verified
- **Evidence:** guide.html:13 `@media(max-width:920px){…​.sidebar{display:none}}`; guide.html:30 `<div class="side-progress"><small>Tiến độ checklist</small><div><strong id="progressText">0/12</strong> mục hoàn thành
- **Gợi ý sửa:** Thêm bản rút gọn của progress (chữ x/12) cạnh tiêu đề section #checklist hiển thị trên mobile.
- **Nguồn:** Writing/guide.html

### 43. Writing/meaning-to-english-pipeline-v1-6.html:59
- **What:** Không có bất kỳ lối nào về trang chủ/viewer: 0 link tới index.html/viewer.html trong cả trang; appbar chỉ có brand + pill tiến độ + nút fullscreen, màn tổng kết chỉ có "Bắt đầu buổi mới" — người vào trực tiếp chỉ còn nút Back của trình duyệ
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: tôi chạy grep -nE 'index\.html|viewer\.html' trên trang → 0 hit (exit 1); appbar dòng 59-62 chỉ có brand + coverage-pill + fullscreenBtn; summary chỉ render #againBtn (dòng 346-347); DESIGN.
- **Gợi ý sửa:** Thêm link "Về thư viện" (../index.html) vào appbar và/hoặc cuối màn tổng kết.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 44. style.css:3 + viewer.js:19-20
- **What:** Ở ≤720px, 'Mở tab mới' (a:first-child của .viewer-actions) bị ẩn hoàn toàn, nên trên mobile khi iframe không render được PDF (iOS Safari không nhúng PDF trong iframe) người học không còn lối thoát trong trang nào khác ngoài 'Tải xuống'.
- **Severity:** low — **Status:** verified
- **Evidence:** style.css:3: `.viewer-back span,.viewer-actions a:first-child{display:none}` — #open-original 'Mở tab mới' đúng là con đầu của .viewer-actions (viewer.html:8); đọc toàn bộ viewer.js (29 dòng): 19-20 c
- **Gợi ý sửa:** Ẩn nhãn chữ nhưng giữ nút icon 'Mở tab mới' với aria-label, hoặc giữ lại hành động này cho type PDF ở mobile.
- **Nguồn:** viewer.html

### 45. viewer.html (1440×900 + 390×844)
- **What:** Ở trạng thái lỗi (không có ?id= hoặc id không tồn tại), thanh header vẫn hiển thị nhãn "Đang mở tài liệu…" trong khi thân trang đã báo "Tài liệu không tồn tại hoặc đường dẫn đã thay đổi."
- **Severity:** low — **Status:** verified
- **Evidence:** browser_evaluate cả hai khổ: viewerTitle="Đang mở tài liệu…", errorMsg="Tài liệu không tồn tại hoặc đường dẫn đã thay đổi."; nhãn mặc định nằm ở viewer.html:8 (#viewer-title). Ảnh evidence/viewer-1440.png (khổ
- **Gợi ý sửa:** Khi vào nhánh lỗi, gán #viewer-title thành "Không thể hiển thị tài liệu" thay vì giữ nhãn đang tải.
- **Nguồn:** trình duyệt

### 46. viewer.js:19-20, data/documents.js …26 entry HTML-path
- **What:** Không trang lesson nào có code nhận biết đang được nhúng iframe (window.top/self/parent), trong khi viewer.js nhúng mọi entry HTML vào iframe → khi mở từ catalogue, header/sidebar của lesson hiện lồng bên dưới viewer-bar (double chrome).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại: viewer.js:19-20 `if (["PDF","HTML"].includes(doc.type)) frame.src = doc.path;` và nhánh else :26-27 cũng frame.src. data/documents.js có 29 id: 25 type:"HTML" + 3 PDF + 1 type:"Article" (Blog/
- **Gợi ý sửa:** Thêm một snippet chung nhỏ (assets/learning/) để lesson tự ẩn header/trong iframe, hoặc viewer chỉ iframe tài liệu không phải lesson HTML.
- **Nguồn:** đối chiếu hệ thống

### 47. Blog/tu-biet-den-dung-duoc.html:25, Vocabulary/c1-vocabulary.html:14, Vocabulary/personal-flashcards.html:11, Vocabulary/toeic-600.html:16, viewer.html:8
- **What:** Chỉ 5/28 trang có đường dẫn về index.html; 23 lesson không có cách nào quay về trang chủ khi người dùng vào trực tiếp bằng URL (không qua viewer).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại grep 'href="[^"]*index\.html' → đúng 5 trang: viewer.html:8 ('Thư viện'), Blog/tu-biet:25 (../index.html#blog), c1-vocabulary:14, toeic-600:16, personal-flashcards:11 — cả 5 đều '← English 101'
- **Gợi ý sửa:** Chuẩn hóa một topline/back-link chung (như toeic-600:16 đã làm) cho các lesson standalone, đặt cùng vị trí trên mọi nhóm.
- **Nguồn:** đối chiếu hệ thống

## interaction (47 finding)

### 1. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:81 (norm) so với :70 (guide)
- **What:** Bộ chuẩn hóa đáp án cắt toàn bộ dấu câu, hoa/thường và viết tắt (won't→will not, can't→can not, i'm→i am…) dù hướng dẫn của Activity không khai báo những khác biệt này là không quan trọng, ngược hợp đồng 'chỉ chuẩn hóa phần đã khai báo' của
- **Severity:** low — **Status:** verified
- **Evidence:** Đếm lại chuỗi :81: 12 lệnh replace (bản gốc ghi '8 bước' — đã chỉnh) gồm cắt [.!?,;:"()] và mở rộng won't→will not, can't→cannot→can not, i'm→i am…; guide :70 không khai báo chuẩn hóa nào; CONTEXT.md:
- **Gợi ý sửa:** Khai báo trong guide ('không phân biệt hoa/thường và dấu câu') hoặc thu hẹp norm về trim + case.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 2. Grammar/conjunctions-theory-practice.html:52
- **What:** Hoạt động điền liên từ không triển khai hợp đồng Enter trong CONTEXT.md (mục 'Enter key', dòng 101–109): trang không có bất kỳ handler keydown nào nên Enter trong ô trống không nộp bài, không hiện đáp án và không chuyển bước — chỉ click nút
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy lại: grep 'keydown|keypress|keyCode' trên file = 0 khớp; script dòng 52 chỉ gắn document.addEventListener('input',…) và onclick cho 6 nút chấm/hiện/làm lại (3 nút ở phần compact dòng 29, 3 nút
- **Gợi ý sửa:** Thêm keydown Enter trên .blank: khi ô có giá trị thì chấm nhóm hiện tại (bỏ qua khi e.isComposing để IME an toàn), giữ hành vi xuống dòng ch
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 3. Grammar/conjunctions-theory-practice.html:38-44
- **What:** 142/234 câu ở 4 bộ 'Cơ bản (36 câu)', 'Theo quan hệ nghĩa (44 câu)', 'Liên từ tương quan (30 câu)' và 'Dấu câu & nối câu (32 câu)' không có ghi chú giải thích: trả sai chỉ hiện '✗ Đáp án: X' mà không nói vì sao, đối lập với 92 câu còn lại (
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy lại bằng node trên data thật (eval lại const compact/sets từ file): 36+44+30+32 = 142 phần tử chỉ có [prompt, đáp án]; compact/dã chức năng/sửa lỗi đều có trường note thứ 3 (như dòng 35, 46-48
- **Gợi ý sửa:** Thêm ghi chú ngắn kiểu như bộ 'Sửa lỗi' (ví dụ 'Because + mệnh đề; because of + danh từ') cho 4 bộ còn lại.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 4. Grammar/english-suffix-lab.html:1088,1014,1066
- **What:** Hợp đồng Enter trong CONTEXT.md không được hiện thực: ô nhập Word Form không nộp bài bằng Enter, quiz "Suy từ đuôi" không có Enter→câu tiếp sau khi hiện kết quả; handler bàn phím duy nhất của trang (thẻ lật) cũng không kiểm tra isComposing
- **Severity:** medium — **Status:** verified
- **Evidence:** Tự chạy grep "addEventListener('keydown'" toàn file → đúng 1 hit tại :1014 (thẻ lật), handler không có isComposing; input #tr{i} :1088 và nút #nextInfer :1066 chỉ có click. Đã đọc CONTEXT.md:101-109:
- **Gợi ý sửa:** Dùng assets/learning/keyboard.js hoặc thêm keydown: Enter trong input → chấm dòng đó; sau khi reveal → Enter chuyển câu.
- **Nguồn:** Grammar/english-suffix-lab.html

### 5. Grammar/english-suffix-lab.html:1092
- **What:** normalized() hạ chữ thường + gộp khoảng trắng cho mọi đáp án Word Form dù UI không hề khai báo case/khoảng trắng là không quan trọng — CONTEXT.md chỉ cho normalize những khác biệt Activity tuyên bố.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc: :1092 `normalized(v){return v.trim().toLowerCase().replace(/\s+/g,' ')}`; ô nhập :1088 chỉ có placeholder "Dạng đúng...", không ghi chú nào về case/khoảng trắng. CONTEXT.md:113 (đã đọc lại): "
- **Gợi ý sửa:** Ghi chú "không phân biệt hoa/thường" dưới ô nhập, hoặc giữ nguyên case sau khi trim.
- **Nguồn:** Grammar/english-suffix-lab.html

### 6. Grammar/prepositions-theory-practice.html:64 (dữ liệu 51,53,55,57,59)
- **What:** Feedback cho đáp án sai ở toàn bộ 245 câu của 5 bộ bài mở rộng chỉ hiện "✗ Đáp án: X" mà không giải thích quy tắc, vì các mục trong `sets` chỉ có 2 trường (câu + đáp án) nên x[2] luôn rỗng.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 64: `<div class="feedback">${x[2]?esc(x[2]):''}</div>` — awk đếm câu: dòng 51=38, 53=60, 55=62, 57=40, 59=45 (tổng 245), đọc trực tiếp xác nhận mọi mục chỉ có 2 trường. CONTEXT.md:51: "For a wron
- **Gợi ý sửa:** Thêm trường giải thích ngắn cho từng câu mở rộng (ít nhất cho các cặp dễ nhầm như against/for, in/into).
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 7. Grammar/prepositions-theory-practice.html:44-77
- **What:** Không triển khai hợp đồng Enter của CONTEXT.md (submit → reveal → continue): toàn trang không có bất kỳ keydown handler hay <form> nào, Enter trong ô trống không làm gì cả; trong khi assets/learning/keyboard.js đã có createKeyboardDispatche
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -cE 'keydown|keypress|keyup|<form|isComposing' = 0; addEventListener chỉ 1 ('input', dòng 76). Hợp đồng Enter tại CONTEXT.md:101-109. Đọc keyboard.js: Enter xử lý ở dòng 16-20 (guard emptyInput d
- **Gợi ý sửa:** Nạp assets/learning/keyboard.js và nối action SUBMIT vào nút Chấm bài của set đang mở thay vì viết handler riêng.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 8. Grammar/prepositions-theory-practice.html:70 (kết hợp 76)
- **What:** "Hiện đáp án" ghi đè tiến độ đã lưu: revealSet điền đáp án vào ô rồi gọi save() mà mảng lưu không phân biệt đáp án người học với đáp án lộ, nên lần sau mở trang các đáp án lộ được phục hồi như người học tự làm, và chấm lại sau reveal cho 10
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 70: `e.value=e.dataset.answer.split('/')[0]; e.classList.add('correct'); … save()`; dòng 76: save() lưu thô mọi .blank, load() phục hồi `e.value=v[i]||''` — không có cờ phân biệt ô đã reveal.
- **Gợi ý sửa:** Đánh dấu các ô đã reveal (data-revealed) và loại/không tính chúng khi save/chấm, hoặc reset về trạng thái chưa làm sau reveal.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 9. Grammar/same-word-different-parts-of-speech.html:63
- **What:** Nút Hiện đáp án điền đáp án vào select, tô xanh như làm đúng, lưu vào localStorage và tính vào thanh tiến độ Đã làm n/N; sau đó Chấm bài chấm các câu đã reveal là đúng — làm nhiễm dữ liệu tiến độ của người học.
- **Severity:** medium — **Status:** verified
- **Evidence:** :63 revealActive(){x.value=x.dataset.answer;x.classList.add('correct')...;save();progress()}; checkActive tính ok khi x.value===x.dataset.answer nên câu reveal được đếm ✓ và vào n/N (progress() đếm mọ
- **Gợi ý sửa:** Đánh dấu câu revealed bằng trạng thái riêng không tính vào progress/điểm, hoặc xóa trạng thái đó khi Làm lại.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 10. Grammar/tense-exercises-answer-key-quiz.html:100
- **What:** 7 câu điền 2 chỗ trống (e32_90, 92, 93, 94, 99, 100, 101) bị chấm tự động theo dạng một chuỗi "X / Y" nhưng giao diện không ghi chú quy ước dấu '/', và ghi chú lại nói chấm tự động chỉ dành cho "câu điền một cụm động từ" — người học điền đú
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy: grep -o '"answer": \["[^"]*/[^"]*"\]' → đúng 7 kết quả, khớp 7 id (đều kind "text", answer dạng ["fell / was flying"]); dòng 100 ghi "Chấm tự động: MCQ, Error Detection và các câu điền một cụ
- **Gợi ý sửa:** Thêm hướng dẫn "câu 2 chỗ trống: nhập hai đáp án cách nhau bởi dấu /" vào note và placeholder, hoặc chuyển các câu này sang kind "self".
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 11. Verb/english-verbs.html:845
- **What:** Chấm điểm chiều Anh→Việt quá rộng: `userN.includes(a) || a.includes(userN)` khiến gõ một chữ cái có trong đáp án (vd "n" cho "nhận") hoặc một cụm chứa đáp án con (vd "di chuyển" cho "đi") vẫn được tính đúng; đồng thời normalizeVN (dòng 790-
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 845 đúng nguyên văn: `isCorrect = accepted.some(a => a.length>0 && (userN === a || userN.includes(a) || a.includes(userN)));`. Đã tái hiện bằng node với chính hàm normalizeVN (790-791): 'n' → ĐÚN
- **Gợi ý sửa:** Chỉ so khớp bằng nhau sau chuẩn hóa từng phương án trong split(/,;/), và ghi một dòng trong màn hình setup rằng dấu tiếng Việt không phân bi
- **Nguồn:** Verb/english-verbs.html

### 12. Verb/english-verbs.html:863-868 (và 911-914 khi Bỏ qua)
- **What:** Feedback khi sai chỉ nêu "✗ Chưa đúng. Đáp án: X" rồi lặp lại câu điền khuyết, không giải thích phân biệt — trong khi tip phân biệt của từng nhóm đã có sẵn trong CONFUSABLE_GROUPS và CLOZE_ITEMS đều mang trường `group` khớp đúng tên nhóm; C
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 865: `✗ Chưa đúng. Đáp án: <span class="correct-ans">…</span>`; nhánh Bỏ qua (911-914) cũng chỉ có `Đáp án: …`. `g.tip` chỉ được render ở tab Dễ nhầm (710-713), không xuất hiện ở bất kỳ nhánh fee
- **Gợi ý sửa:** Với chiều Điền từ, chèn thêm 1–2 câu tip của nhóm (tìm theo item.group) vào khối feedback khi sai.
- **Nguồn:** Verb/english-verbs.html

### 13. Verb/five-forms-of-verbs-with-3rd-person.html:316
- **What:** Feedback khi sai là một câu tĩnh giống hệt nhau cho mọi từ mọi câu (giải thích 3 quy tắc chung), không giải thích quy tắc cụ thể của dạng bị sai của từ đó (vd y→ied, gấp đôi phụ âm, bất quy tắc) và không hiển thị lại đáp án người học đã nhậ
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 316: fb.innerHTML=`✗ Đáp án: …<br>Ngôi thứ ba dùng he/she/it + V-s/es; quá khứ phân từ đi với have/has/had; -ing đi với be trong thì tiếp diễn.` — hằng số cho mọi câu sai; vals bắt ở dòng 311 khô
- **Gợi ý sửa:** Sinh giải thích theo từng ô sai bằng cách so input với accepted() (nhận diện quy tắc -ed/-ing/irregular) và in đáp án đã nhập cạnh đáp án đú
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 14. Verb/five-forms-of-verbs-with-3rd-person.html:174,298
- **What:** Chấm đáp án lower-case + gộp khoảng trắng (norm) áp dụng cho mọi dạng mà UI không hề khai báo chấp nhận sai khác hoa/thường — CONTEXT.md:113 nguyên văn 'Normalize only differences the Activity declares insignificant' chỉ cho normalize những
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 174: const norm=s=>String(s??'').toLowerCase().trim().replace(/\s+/g,' '); dòng 298: [...new Set(vals.map(norm))]; grep 'không phân biệt|chữ hoa|hoa/thường' → 0 — không dòng chú thích nào trong U
- **Gợi ý sửa:** Thêm một dòng khai báo dưới form ('Không phân biệt hoa/thường, bỏ qua khoảng trắng hai đầu') hoặc bỏ lower-case.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 15. Verb/phrasal-verbs.html:335, 675-680, 697-699
- **What:** Ở hướng luyện "Nghĩa → Phrasal verb", nút "🔊 Nghe" và phím tắt L đọc chính term — tức đáp án cần gõ — trước khi nộp bài, mà không đánh dấu ASSIST nên session vẫn chấm "Đúng".
- **Severity:** high — **Status:** verified
- **Evidence:** dictSpeak: `new SpeechSynthesisUtterance(dDeck[dIdx].term)` (678-679); register getCurrentText trả `dDeck[dIdx].term` khi dictPlay hiển thị (698); nút hiển thị cả 2 hướng (335). Phím L: keyboard-pronu
- **Gợi ý sửa:** Ở hướng meaning-term, chỉ cho nghe sau khi đã SUBMIT (hoặc đọc câu ví dụ đã che term) và dispatch ASSIST khi người nghe trước khi trả lời.
- **Nguồn:** Verb/phrasal-verbs.html

### 16. Verb/phrasal-verbs.html:602-607, 643
- **What:** Hướng "Phrasal verb → Nghĩa" chấp nhận mọi chuỗi con không rỗng của nghĩa (target.includes(ans)), nên gõ 1 ký tự khớp bất kỳ (vd "c" với "Chăm sóc") được chấm "✓ Đúng"; dNorm còn bỏ dấu tiếng Việt và dấu câu — mức nới lỏng vượt những gì Act
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy lại đúng logic dNorm+grading bằng node: 'Chăm sóc'→'cham soc', gõ 'c' → true (✓ Đúng); 'tôi chăm sóc em' cũng pass qua nhánh ans.includes(target). Code: `ok=ans.length>0&&(target.includes(ans)
- **Gợi ý sửa:** Chấm theo nguyên từ/ký tự ranh giới từ (hoặc tỉ lệ token khớp) và chỉ bỏ khoảng trắng/case theo hợp đồng Answer handling trong CONTEXT.md.
- **Nguồn:** Verb/phrasal-verbs.html

### 17. Verb/phrasal-verbs.html:653-657
- **What:** Feedback khi sai chỉ hiện "✗ Đáp án: <term> — <nghĩa>", không lặp lại câu trả lời của người học và không giải thích vì sao sai — trái định nghĩa Feedback trong CONTEXT.md (dòng 49-51: phải chỉ ra đúng + giải thích rule/distinction, không ch
- **Severity:** medium — **Status:** verified
- **Evidence:** `fb.innerHTML=`✗ Đáp án: <b>${x.term}</b> — ${x.meaning}`` (656); nhánh đúng (652) cũng chỉ echo đáp án; dictCheck (636-661) không có nội dung giải thích nào. Đã đối chiếu trực tiếp CONTEXT.md:49-51 (
- **Gợi ý sửa:** Thêm câu trả lời người học đã gõ + 1 ví dụ dùng đúng term (DATA đã có sẵn 3 ví dụ mỗi mục, chi phí gần bằng 0).
- **Nguồn:** Verb/phrasal-verbs.html

### 18. Verb/phrasal-verbs.html:690, 578-585
- **What:** [Bổ sung mới] Chuyển tab về FLASHCARDS giữa chừng phiên chính tả không vô hiệu hóa ngữ cảnh bàn phím: dictActive chỉ đọc dictPlay.style.display nên trên tab flashcards Space không lật được thẻ (kind còn là 'quiz'), còn Enter/→ vẫn SUBMIT/NE
- **Severity:** medium — **Status:** verified
- **Evidence:** getContext/dispatch (690) tính dictActive chỉ từ `dictSession&&dDeck[dIdx]&&dictPlay.style.display!=='none'`; handler tab (578-585) chỉ toggle class, không đụng dictPlay/dictSession. keyboard.js:16-19
- **Gợi ý sửa:** Trong getContext/dispatch, thêm điều kiện tab dictation đang active (dictActive = dictPlay hiển thị VÀ panel dictation active), hoặc reset/đ
- **Nguồn:** Verb/phrasal-verbs.html

### 19. Vocabulary/c1-vocabulary.js:486-489
- **What:** Trình xử lý Enter không kiểm tra event.isComposing nên có thể submit khi IME đang ghép chữ, vi phạm hợp đồng Enter trong CONTEXT.md.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc js:486-490: chỉ kiểm tra `event.key === 'Enter'` + qplay hiển thị + target không phải button. grep -c "isComposing\|composing" Vocabulary/c1-vocabulary.js → 0. CONTEXT.md:109 yêu cầu rõ 'must n
- **Gợi ý sửa:** Bỏ qua phím khi `event.isComposing` hoặc thay handler bằng createKeyboardDispatcher của assets/learning/keyboard.js.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 20. Vocabulary/c1-vocabulary.js:343,384-390,398-406
- **What:** Tạm dừng sau khi đã chấm một câu rồi "Tiếp tục đúng chỗ" sẽ hỏi lại đúng câu đó (answered bị reset, quizIndex không tăng) nên điểm correct và "Điểm tốt nhất" bị cộng hai lần cho cùng một câu.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã trace đủ: gradeAnswer tăng correct (js:336) rồi saveQuizSession (js:343) với quizIndex chưa tăng; saveQuizSession (js:161-164) không lưu cờ `answered`; pauseQuiz (js:384-390) lưu lại cùng trạng thá
- **Gợi ý sửa:** Khi lưu phiên sau khi chấm, lưu quizIndex+1 hoặc cờ "đã chấm" để resume chuyển thẳng sang câu kế.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 21. Vocabulary/c1-vocabulary.js:319-326
- **What:** Chấm đáp án tự gõ quá lỏng: mọi chuỗi con ≥4 ký tự của nghĩa được tính đúng, và normalize bỏ toàn bộ dấu tiếng Việt/dấu câu mà trang không khai báo cho người học — ngược hợp đồng "chỉ normalize phần Activity khai báo".
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc js:319-326: js:323 `return alternatives.includes(answer) || (answer.length >= 4 && normalize(item[4]).includes(answer));` — gõ "giam" (4 ký tự) khớp chuỗi con của normalize("giảm thiểu")="giam
- **Gợi ý sửa:** So khớp nguyên nghĩa (hoặc danh sách phương án tường minh) và nếu giữ chấp nhận không dấu thì ghi rõ trong giao diện.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 22. Vocabulary/confusing-words.html:1648-1651,1577-1584
- **What:** Chấm bài chiều Anh→Việt dùng khớp chuỗi con hai chiều và normalize bỏ cả dấu tiếng Việt — gõ 1–2 ký tự ("ảnh", "tác") cũng được tính đúng, không phải chỉ normalize khoảng trắng/chữ hoa như hợp đồng Answer handling (CONTEXT.md:111-113 "Norma
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :1651 isCorrect = accepted.some(a => a.length>0 && (userN===a || userN.includes(a) || a.includes(userN))); normalizeVN :1577-1584 strip NFD + đ→d. ĐÃ CHẠY script node tái lập đúng 2 hàm này: input
- **Gợi ý sửa:** Giới hạn khớp chuỗi con ở độ dài tối thiểu hợp lý và chỉ normalize những khác biệt Activity khai báo.
- **Nguồn:** Vocabulary/confusing-words.html

### 23. Vocabulary/ielts-c1-c2-modern.js:57
- **What:** Hàm substantial() chấm đúng quá rộng: với en-vi/sent-en-vi/sent-vi-en, bất kỳ chuỗi ≥4 từ là đoạn con (includes) của đáp án đều được tính ĐÚNG — dịch câu chỉ cần gõ 4 từ khớp trong bản dịch là qua, phá hợp đồng 'Normalize chỉ khác biệt Acti
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện bằng node (replicate js:57 trên DATA dòng 215): mode en-vi, target 'Tự do sáng tạo tuyệt đối' (row0) — gõ 4 từ đầu 'Tự do sáng tạo tuyệt' → true; gõ 'Tự do' → false. CHỈNH: ví dụ target 'C
- **Gợi ý sửa:** Chỉ nhận chuỗi con khi Activity khai báo (vd. mode cloze chấp nhận match[0]); với dạng dịch yêu cầu khớp đầy đủ hoặc so từ khoá theo tỉ lệ,
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 24. Vocabulary/ielts-c1-c2-modern.js:8,57
- **What:** norm() khi chấm đáp án tự xoá toàn bộ dấu tiếng Việt (NFD + bỏ \u0300-\u036f, đ→d) và mọi dấu câu cho MỌI dạng câu hỏi, dù trang không khai báo 'không dấu/không dấu câu là không quan trọng' — với bài dịch (sent-en-vi/sent-vi-en) thì chính t
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện bằng node: js:8 `toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9\s]/g,' ')…` — gõ toàn bộ bản dịch row0 ĐÃ XOÁ DẤU ('Nhieu nguoi
- **Gợi ý sửa:** Tách norm tìm kiếm (cho phép bỏ dấu) khỏi norm chấm điểm; chỉ bỏ khoảng trắng/case, giữ dấu tiếng Việt ở các dạng dịch trừ khi mode khai báo
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 25. Vocabulary/ielts-c1-c2-modern.js:73
- **What:** Feedback khi sai chỉ nêu lại đáp án + context ('Bạn viết… / Đáp án…' + hàng dữ liệu), không có dòng giải thích vì sao lựa chọn của người học sai (khác gì, quy tắc collocation nào) — DATA 5 cột cũng không có trường explanation để render; CON
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện: js:73 `$('#qFeedback').innerHTML=`<b>${esc(label)}</b>${raw&&!ok?`<p>Bạn viết: …</p>`:''}<p>Đáp án: <b>${esc(targetValue)}</b></p><div class="answer-context">…` — không có phần 'vì sao';
- **Gợi ý sửa:** Thêm cột ghi chú/giải thích ngắn vào dữ liệu (hoặc sinh từ chênh lệch từ khoá) và render 1 dòng 'Vì sao sai' trong feedback.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 26. Vocabulary/ielts-hiking-modern.js:43
- **What:** Chấm điểm chấp nhận bất kỳ đoạn ≥4 từ trùng liên tiếp trong đáp án mẫu là ĐÚNG cho cả 3 dạng en-vi, sent-en-vi (Dịch câu Anh→Việt) và sent-vi-en (Dịch câu Việt→Anh) — gõ 4 từ bất kỳ của câu mẫu là qua, làm mất ý nghĩa bài dịch câu hoàn chỉn
- **Severity:** medium — **Status:** verified
- **Evidence:** js:43 nguyên văn: `return['en-vi','sent-en-vi','sent-vi-en'].includes(currentMode)&&words.length>=4&&norm(expected).includes(norm(answer))`. ĐÃ TÁI HIỆN bằng Node (script tạm đã xóa, tái lập đúng help
- **Gợi ý sửa:** Áp dụng chứa-đoạn cho en-vi ngắn thôi; với sent-* yêu cầu độ phủ cao (ví dụ ≥80% từ của câu mẫu) hoặc so sánh số từ khớp.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 27. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:17
- **What:** Khi cuộn xuống, thanh toolbar (sticky top:0, z-index:5) bị thanh study-tabs (sticky top:0, z-index:20) đè lên che phần trên chứa các nút Mặt 1/2/3, select Unit và ô tìm kiếm, không bấm được cho tới khi cuộn về đầu trang.
- **Severity:** medium — **Status:** verified
- **Evidence:** html:17 `.toolbar{...position:sticky; top:0; ... z-index:5}`; ielts-collocations-modern.css:12 `.study-tabs{position:sticky;top:0;z-index:20;...background:#fff}` — không rule nào đổi position/top của
- **Gợi ý sửa:** Cho toolbar sticky top:52px (dưới tabs) hoặc bỏ sticky của toolbar và giữ chỉ tabs sticky.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 28. Vocabulary/root-atlas.html:38 + assets/learning/keyboard.js:16-19
- **What:** Ở chế độ Kiểm tra chiều Gốc → nghĩa (trắc nghiệm), nhấn Enter khi chưa chọn đáp án bị chấm là SAI ngay (grade(false)): tăng state.attempts, tăng vĩnh viễn item.wrong và đặt lịch ôn lại 10 phút — trong khi dòng gợi ý phiên lại hứa 'Enter: ki
- **Severity:** medium — **Status:** verified
- **Evidence:** keyboard.js:17 `if (context.emptyInput && context.kind !== 'flashcard') return null;` — forward quiz không có #typed nên getContext (root-atlas.html:38) trả emptyInput=false, :19 `return context.answe
- **Gợi ý sửa:** Khi quiz forward chưa trả lời, Enter phải là no-op hoặc đưa focus vào lựa chọn đầu thay vì grade(false).
- **Nguồn:** Vocabulary/root-atlas.html

### 29. Vocabulary/root-atlas.html:29
- **What:** Nhấn ArrowRight khi câu chưa trả lời: session.js từ chối NEXT nhưng advance() vẫn gọi nextCard() nên trang vẽ lại đúng câu đó, xáo lại thứ tự lựa chọn và reset answered/revealed — làm mất trạng thái câu đang làm.
- **Severity:** low — **Status:** verified
- **Evidence:** root-atlas.html:29 `const snapshot=learningSession.dispatch({type:'NEXT'});idx=snapshot.index;if(snapshot.status==='completed')finish();else nextCard()`; session.js:130-132 NEXT chỉ advance khi submit
- **Gợi ý sửa:** Chỉ gọi nextCard() khi snapshot.index thực sự đổi hoặc status==='completed'.
- **Nguồn:** Vocabulary/root-atlas.html

### 30. Vocabulary/toeic-600.js:180-181
- **What:** choicePool lấy distractor theo partOfSpeech chính xác từng ký tự nên 3 entry ('v/n', 'prep', 'n.phr' — mỗi loại chỉ có 1 mục trong 600) có 0 ứng viên → câu hỏi chỉ còn 1 lựa chọn duy nhất chính là đáp án; tổng 11 entry có pool < 4 lựa chọn;
- **Severity:** high — **Status:** verified
- **Evidence:** Đã xác minh bằng node: POS distribution {v:229, n:240, adj:81, adv:39, phr.v.:3, v/n:1, n/v:3, phr.v:2, prep:1, n.phr:1}; 11 entry có pool <4; đúng 3 entry chỉ còn 1 lựa chọn: follow up (v/n, toeic-12
- **Gợi ý sửa:** Fallback sang POS tương đương (gộp phr.v./phr.v, n.phr→n) hoặc bổ sung distractor từ toàn bộ entries khi pool cùng POS < 3.
- **Nguồn:** Vocabulary/toeic-600.html

### 31. Vocabulary/toeic-600.js:235 (feedback) + data usageNote template
- **What:** Feedback khi sai hiển thị usageNote làm phần 'giải thích', nhưng usageNote trong dataset là template máy generique ('Đây là danh từ. Chú ý mạo từ, số ít–số nhiều và động từ đi kèm khi dùng trong ngữ cảnh pharmacy.') nên không giải thích đượ
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã xác minh: toeic-600.js:235 chèn escapeHTML(entry.usageNote) vào feedback; node: entry cuối data (volunteer, :36698) có usageNote đúng mẫu '…ngữ cảnh pharmacy.'; 236/600 entry khớp pattern template
- **Gợi ý sửa:** Sinh giải thích theo loại lỗi (khác nghĩa nào của lựa chọn bị chọn) hoặc thay usageNote template bằng note cụ thể từng entry.
- **Nguồn:** Vocabulary/toeic-600.html

### 32. assets/learning/keyboard.js:16-18 → Vocabulary/toeic-600.js:302-303,171-177
- **What:** Sau khi lật flashcard, nhấn Enter tự động đánh dấu 'Đã nhớ' và ghi vào state.known (localStorage) — UI không hề quảng bá phím này (chỉ 'Lật thẻ ↵' có hint, 2 nút rate chỉ ghi '1 · Khó'/'2 · Đã nhớ'), nên học viên nhấn Enter với ý 'tiếp tục'
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh: keyboard.js:18 'context.kind === flashcard → revealed ? NEXT : REVEAL'; toeic-600.js:302 NEXT → rateFlash('good') → state.known.push (:174) + commit (:176); renderFlash (:167) chỉ hiện 'L
- **Gợi ý sửa:** Thêm keyhint sau lật thẻ ('Enter = Đã nhớ · 1 = Khó') hoặc đổi mapping Enter thành 'tiếp tục không chấm'.
- **Nguồn:** Vocabulary/toeic-600.html

### 33. Vocabulary/ielts-vocabulary-focus.js:89,100-104,118-123
- **What:** Nút 'Tự phát âm' (lưu localStorage 'vocabulary-auto-pronounce', mặc định tắt nhưng giữ vĩnh viễn) đọc to từ tiếng Anh ngay khi câu hỏi render: ở chế độ Việt→Anh tự gõ, Việt→Anh chọn từ (reverseMC), điền câu, gọi lại cụm và Nghe→gõ, từ được
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại khớp: :89 `word = window.current()?.w || word` — current() là hàm top-level của script classic nên tồn tại trên window; :100-104 schedulePronunciation setTimeout 160ms; :122 MutationObserver g
- **Gợi ý sửa:** Chỉ tự đọc khi prompt là chiều Anh (flashcard forward hoặc mode='forward'); với reverse/listen/cloze thì bỏ qua hoặc đọc sau khi đã trả lời.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 34. Vocabulary/vocabulary-atlas.html:85 + assets/learning/keyboard.js:17-19
- **What:** Ở dạng trắc nghiệm (Anh→Việt chọn nghĩa / Việt→Anh chọn từ), nhấn Enter khi chưa trả lời sẽ chấm sai ngay câu đó (đếm vào attempts, tăng wrong, hẹn ôn sau 10 phút) vì không có ô #typed để ràng buộc điều kiện 'chỉ submit khi có đáp án không
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại khớp: keyboard.js:17 chỉ chặn khi `context.emptyInput && context.kind!=='flashcard'` — MC không có #typed nên emptyInput=false → :19 trả 'SUBMIT'; vocabulary-atlas.html:85 `$('#typed')?check()
- **Gợi ý sửa:** Khi không có #typed, để Enter không làm gì hoặc ánh xạ sang 'Chưa biết — xem đáp án' một cách tường minh thay vì grade(false) ngầm.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 35. assets/learning/vocabulary-rounds-bootstrap.js:64
- **What:** Tham số ?mode= trên URL chỉ được khôi phục khi phần tử #mode tồn tại, mà #mode chỉ render cho tab flash/quiz/pipeline — mở URL có mode nhưng thiếu ?tab= thì chế độ học bị lặng lẽ bỏ qua, phiên bắt đầu bằng mode mặc định.
- **Severity:** low — **Status:** verified
- **Evidence:** bootstrap:63-65 'if(!route.mode)return; const mode=document.querySelector('#mode'); if(mode&&…)mode.value=route.mode'; app:36 chỉ setup() render #mode; app:11 tab mặc định 'today' (today() không có #m
- **Gợi ý sửa:** Đưa route.mode vào biến quizMode/flashMode của app và áp dụng khi render setup() thay vì phụ thuộc DOM.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 36. Vocabulary/vocabulary-reading-translation-v1-6.html:96-99,417
- **What:** Hợp đồng phím Enter của CONTEXT.md (mục 'Enter key') chỉ được cài cho quiz coverage, còn 12 bài 'biên tập sâu' không có handler Enter nào: chọn đáp án MCQ rồi Enter không kích hoạt nút chính 'Chấm đọc hiểu' hay 'Chấm & phân tích'.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep keydown toàn trang → duy nhất 1 khớp tại :417 (input coverage, guard đúng 'e.key===\'Enter\'&&!e.isComposing&&!e.repeat'); :96 render(), :97 showMode, :98 bindTask chỉ gắn click/toggle listener.
- **Gợi ý sửa:** Thêm keydown Enter cho hoạt động MCQ (submit khi đã chọn, không nhảy câu) tái dùng đúng điều kiện isComposing/repeat như :417.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 37. Vocabulary/vocabulary-reading-translation-v1-6.html:98,103,417
- **What:** Nút 🔊 hỏng chức năng dừng/phát lại: từ lần click thứ hai, cả listener speak() lẫn onclick hủy tiếng (gán trong speak()) cùng chạy tuần tự trên cùng nút nên âm thanh vừa phát lập tức bị cancel — không thể nghe lại sau khi dừng.
- **Severity:** medium — **Status:** verified
- **Evidence:** :98 'listen.addEventListener(\'click\',()=>speak(l.passage,listen))'; :103 speak() đặt nhãn '■ Dừng' rồi 'button.onclick=()=>{speechSynthesis.cancel();button.textContent=old}' — click 2 chạy cả hai ha
- **Gợi ý sửa:** Thay onclick bằng một cờ trạng thái trong listener duy nhất (toggle play/stop), hoặc đặt nhãn dừng lên nút riêng.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 38. Vocabulary/vocabulary-reading-translation-v1-6.html:101,418-419
- **What:** Ở quiz coverage, nhấn Enter/Kiểm tra khi ô trống bị tính thẳng 'Chưa đúng' và tiêu luôn câu (answerMatch trả false cho chuỗi rỗng, coverageAnswered=true, mục bị đánh dấu seen ngay cả khi chưa trả lời), trong khi mode dịch của 12 bài có guar
- **Severity:** low — **Status:** verified
- **Evidence:** :418 'const g=normalize(given)…if(!g)return false'; :419 'coverageAnswered=true;…coverageSeen.add(x.key);saveCoverageSeen();…f.className=…+(ok?\'ok\':\'bad\')' chạy bất kể given rỗng; so với :101 guar
- **Gợi ý sửa:** Chặn submit rỗng bằng thông báo 'chưa nhập' như mode dịch, không tínhAttempt.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 39. Vocabulary/vocabulary-reading-translation-v1-6.html:95,102
- **What:** Bổ sung (lỗi bỏ sót): hoàn thành một bài không cập nhật nhãn '✓ Đã học' trên bài đó — markDone chỉ ghi localStorage và đổi dòng tóm tắt, nhãn trong <summary> chỉ xuất hiện khi danh sách được render lại (bấm chip lọc hoặc gõ ô tìm kiếm), nên
- **Severity:** low — **Status:** verified
- **Evidence:** :95 nhãn '${completed.has(i)?…"✓ Đã học"…}' chỉ được render trong lessonHTML lúc render() (:96); :102 markDone chỉ 'completed.add(i); localStorage.setItem(…); document.getElementById(\'summary\').text
- **Gợi ý sửa:** Trong markDone, cập nhật ngay lesson-meta của bài i (thêm span.done-tag) thay vì chờ lần render() kế tiếp.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 40. assets/learning/keyboard.js:15 (+ assets/learning/vocabulary-rounds-app.js:101,63)
- **What:** Trong phiên học đang chạy, phím mũi tên phải được map thẳng thành NEXT và next() tăng chỉ số câu không điều kiện, nên có thể nhảy qua câu chưa trả lời (kể cả thẻ flashcard chưa lật) — ngược nguyên tắc trong CONTEXT.md:109 ('Enter must not …
- **Severity:** medium — **Status:** verified
- **Evidence:** keyboard.js:15 `if (context.key==='ArrowRight' && tagName!=='INPUT') return 'NEXT'` không kiểm tra answered/revealed (nhánh Enter ở :17-19 có guard); app:101 `else if(action==='NEXT')next();`, app:63
- **Gợi ý sửa:** Chỉ trả NEXT khi answered (quiz) hoặc revealed (flashcard), và thêm guard answered/revealed trong next().
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 41. assets/learning/keyboard.js:24
- **What:** Nhánh phím số 1–4 map thành CHOICE_N không loại trừ INPUT (khác nhánh mũi tên), kết hợp preventDefault chạy trước dispatch nên ký tự số không gõ được vào ô trả lời; bộ dữ liệu hiện tại không có đáp án chứa số (đã grep bằng node) nên tác độn
- **Severity:** low — **Status:** verified
- **Evidence:** keyboard.js:24 `if (context.kind!=='flashcard' && !context.answered && /^[1-4]$/.test(context.key))` không có điều kiện tagName (nhánh mũi tên :14-15 có); keyboard.js:41 `event.preventDefault()` trước
- **Gợi ý sửa:** Loại trừ INPUT/textarea cho nhánh phím số như đã làm với nhánh mũi tên.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 42. assets/learning/vocabulary-rounds-app.js:58
- **What:** Ở mode forward (trắc nghiệm Anh→Việt), dòng "Đáp án:" trong feedback hiển thị chính từ tiếng Anh đã có trong đề (target() trả về d.w) thay vì nghĩa Việt đúng; input cũng không được ghi khi bấm chọn nên thiếu dòng "Bạn viết", người học phải
- **Severity:** low — **Status:** verified
- **Evidence:** app.js:45 "return ['cloze','chunk'].includes(q().mode)?d.cloze.answer:d.w"; app.js:58 "expected=x.mode==='synonym'?...:x.mode==='englishText'?d.vi:target()" — forward → d.w, trùng chữ trong đề (prompt
- **Gợi ý sửa:** Với mode forward, hiển thị "Đáp án: d.vi" và đánh dấu nổi bật nút lựa chọn đúng.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 43. assets/learning/keyboard.js:17
- **What:** Ở mode forward (trắc nghiệm Anh→Việt, chỉ có nút chọn, không có ô input), phím Enter vẫn tạo action SUBMIT vì guard emptyInput chỉ đọc #typed vốn không tồn tại ở mode này, khiến check() chấm chuỗi rỗng → ghi 'sai', tăng lỗi 'meaning', reset
- **Severity:** medium — **Status:** verified
- **Evidence:** keyboard.js:17 "if (context.emptyInput && context.kind !== 'flashcard') return null" nhưng emptyInput tính ở app.js:97 "Boolean($('#typed')&&!$('#typed').value.trim())" → false khi không có #typed (mo
- **Gợi ý sửa:** Mở rộng guard trong getContext/resolveKeyboardAction: không map Enter thành SUBMIT khi câu hỏi dạng choice chưa được chọn (hoặc khi trang kh
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 44. Writing/meaning-to-english-pipeline-v1-6.html:353
- **What:** Handler Enter không có guard IME (không kiểm tra event.isComposing hay keyCode 229), nên Enter dùng để xác nhận cụm chữ đang ghép sẽ submit luôn đáp án/câu đang viết — vi phạm hợp đồng Enter trong CONTEXT.md:109.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: dòng 353: "if(event.key!=="Enter"||event.shiftKey)return;… event.preventDefault();primaryAction()"; tôi chạy grep -nE 'isComposing|keyCode' trên trang → 0 hit (exit 1); CONTEXT.md:109 đọc tr
- **Gợi ý sửa:** Bỏ qua sự kiện khi event.isComposing===true || event.keyCode===229 trước khi gọi primaryAction.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 45. Writing/meaning-to-english-pipeline-v1-6.html:353
- **What:** Enter bị preventDefault và đổi thành primaryAction khi focus đang ở control khác ô trả lời: nút tự đánh giá (dòng 312), "Đổi câu Việt" (286), "Kết thúc sớm" (126), <summary> nguồn (393) và ô tìm kiếm trong panel thiết lập vẫn hiện trong buổ
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện bằng đọc code: dòng 353 chỉ miễn trừ "tag==="BUTTON"&&document.activeElement?.dataset.choice"; nút rate dòng 312 chỉ có data-rate, editVi dòng 286, endSession dòng 126, details/summary dòng 3
- **Gợi ý sửa:** Chỉ chặn Enter khi focus là ô trả lời hoặc nút hành động chính; để mặc định cho nút đánh giá/đổi câu/summary và các control ở panel thiết lậ
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 46. Writing/meaning-to-english-pipeline-v1-6.html:352
- **What:** Bổ sung: ở bước 1 (chưa trả lời), handler keydown toàn cục bắt mọi phím 1–4 mà không kiểm tra focus đang ở đâu: gõ chữ số 1–4 vào ô tìm kiếm ở panel thiết lập (vẫn hiện trong buổi học) sẽ bị preventDefault và thay bằng việc chọn một đáp án
- **Severity:** low — **Status:** verified
- **Evidence:** Tái hiện bằng đọc code: dòng 352: "if(app.stage===0&&!app.stageAnswered&&/^[1-4]$/.test(event.key)){const choice=app.stageState.options?.[Number(event.key)-1];if(choice){event.preventDefault();chooseR
- **Gợi ý sửa:** Bỏ qua nhánh phím 1–4 khi event.target là input/select/textarea (hoặc kiểm tra document.activeElement) để không chiếm đoạt ký tự đang gõ.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 47. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:139,149, Grammar/english-suffix-lab.html:1014, Grammar/tense-exercises-answer-key-quiz.html:216, Verb/english-verbs.html:641,918, Verb/five-forms-of-verbs-with-3rd-person.html:287,322 …8 trang
- **What:** 8 trang tự viết lại trình xử lý keydown/Enter trong khi assets/learning/keyboard.js (hợp đồng Enter CONTEXT.md:101-109) đã có và các trang khác đang dùng chuẩn qua createKeyboardDispatcher.
- **Severity:** high — **Status:** verified
- **Evidence:** Đo lại: grep 'keydown' → đúng 10/28 trang có handler. 8 trang KHÔNG nạp keyboard.js nhưng tự addEventListener('keydown'), khớp từng dòng: bi-kip:139 (main) + :149 (document, Escape + Tab focus trap),
- **Gợi ý sửa:** Migrate dần 8 trang sang createKeyboardDispatcher với getContext phù hợp từng Activity, giữ hành vi Enter hiện tại theo CONTEXT.md.
- **Nguồn:** đối chiếu hệ thống

## a11y (89 finding)

### 1. Blog/tu-biet-den-dung-duoc.html:13-14 (á dụng dòng 25-26)
- **What:** Hai chữ nhấn thất bại tiêu chuẩn tương phản WCAG AA: eyebrow 12px/800 màu coral #ff6b4a trên nền paper #fbfaf7 đạt 2.70:1 và link duy nhất "← Trở về English 101" 17px/700 màu #377cf6 đạt 3.74:1 — đều dưới ngưỡng 4.5:1 cho chữ cỡ nhỏ (bold <
- **Severity:** medium — **Status:** verified
- **Evidence:** Tự đo lại bằng python -I (công thức WCAG, cùng cặp màu): "eyebrow coral/paper 2.70:1; blue back-link/paper 3.74:1; muted 4.80:1; lead 7.24:1; white/navy blockquote 18.72:1" — khớp hoàn toàn số của giá
- **Gợi ý sửa:** Dùng coral-strong #a8401d cho eyebrow và cobalt #2b4f9c cho link (cả hai đều vượt 4.5:1 trên nền trang; tránh #d4552e vì chỉ đạt 3.92:1).
- **Nguồn:** Blog/tu-biet-den-dung-duoc.html

### 2. Blog/tu-biet-den-dung-duoc.html:9-22 (toàn khối <style>)
- **What:** Không có bất kỳ quy tắc :focus/:focus-visible nào nên trang không có focus ring theo hệ (cobalt #2b4f9c cho portal theo DESIGN.md:243 hoặc focus-gold #b8883f theo Open Door Rule DESIGN.md:251); mục tiêu bàn phím duy nhất (link về trang chủ,
- **Severity:** low — **Status:** verified
- **Evidence:** Chạy lại: grep -c "focus" Blog/tu-biet-den-dung-duoc.html → 0; xác nhận dòng 25 là anchor duy nhất của trang (đã đọc toàn bộ file). DESIGN.md:243 ("Homepage focus is a 3px cobalt-ink ring (#2b4f9c)")
- **Gợi ý sửa:** Thêm .back:focus-visible{outline:3px solid <token focus>; outline-offset:3px} theo token focus của hệ.
- **Nguồn:** Blog/tu-biet-den-dung-duoc.html

### 3. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:93–94, :101, :108
- **What:** Khối feedback có role="status" được chèn mới cùng lúc với nội dung qua outerHTML nên một số cặp màn hình/AT có thể không đọc kết quả chấm; trang đã giảm nhẹ bằng cách focus nút 'Câu tiếp' và #stats aria-live cập nhật song song.
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** Đọc code xác nhận đủ mọi chi tiết: :94 `old.outerHTML=card(q)` thay cả card, :101 feedback mang role="status" sinh kèm nội dung trong cùng lần đổi DOM, :108 focus nút 'Câu tiếp' ngay sau, #stats :73 a
- **Gợi ý sửa:** Đặt một live region cố định (aria-live="polite") ngoài card và đẩy kết quả chấm vào đó thay vì chèn role="status" mới mỗi lần.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 4. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:11, :150
- **What:** Nút cỡ chữ giữ aria-label 'Tăng cỡ chữ' vĩnh viễn dù hành vi đảo chiều (hiển thị 'A−' khi đang ở 21px), nên tên truy cập không khớp hành động hiện tại của nút.
- **Severity:** low — **Status:** verified
- **Evidence:** Xác nhận :11 `aria-label="Tăng cỡ chữ"` tĩnh; :150 `el('font').textContent=state.font===21?'A−':'A+'` chỉ đổi nhãn nhìn thấy (lúc 21px hành vi là giảm về 17), không có lệnh nào cập nhật aria-label tro
- **Gợi ý sửa:** Cập nhật aria-label theo trạng thái ('Tăng cỡ chữ'/'Giảm cỡ chữ') hoặc bỏ aria-label để dùng nhãn hiển thị.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 5. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:15
- **What:** Dialog xác nhận không có aria-labelledby/aria-label dù tiêu đề bên trong đã có id="dialog-title", nên hộp thoại được mở mà không có tên truy cập cho trình đọc màn hình.
- **Severity:** low — **Status:** verified
- **Evidence:** Xác nhận :15 `<dialog id="confirm-dialog"><h2 id="dialog-title">Bắt đầu lượt mới?</h2>…` — không thuộc tính liên kết tên; JS (:119 ask, :155 cancel/accept) chỉ set textContent và showModal, không gắn
- **Gợi ý sửa:** Thêm aria-labelledby="dialog-title" (và aria-describedby="dialog-text") vào <dialog>.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 6. Grammar/conjunctions-theory-practice.html:2
- **What:** Vòng focus không theo token: .blank dùng outline tự chế 2px màu #8bc2b7 có tương phản chỉ 1.88–1.98:1 (dưới 3:1 cho chỉ báo focus), còn .btn/.tab/.side a không có style focus riêng (chỉ ring mặc định UA) — không đâu dùng vòng vàng 3px #b888
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại dòng 2: `.blank:focus{outline:2px solid #8bc2b7}` là rule :focus duy nhất trong trang (không có :focus cho .btn/.tab/.side a); đã đo lại bằng node: 1.88:1 trên nền #f7f8f6, 1.98:1 trên paper;
- **Gợi ý sửa:** Dùng outline 3px var(--focus) với offset 3px cho .blank, .btn, .tab và .side a.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 7. Grammar/conjunctions-theory-practice.html:29-31
- **What:** Kết quả động (2 ô điểm .score và khối .feedback) chỉ cập nhật bằng textContent/class mà trang không có aria-live hay role="status" nào, nên trình đọc màn hình không được thông báo kết quả sau khi chấm.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy lại: grep 'aria-live' = 0 và 'role="status"' = 0 khớp trên file; dòng 52 `document.getElementById(sid).textContent=…` cập nhật compactScore/extendedScore; CSS dòng 2 chỉ có `.feedback{display:
- **Gợi ý sửa:** Đặt aria-live="polite" cho 2 ô điểm; không đặt live lên từng khối feedback lẻ (234 khối) để tránh quấy rầy SR.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 8. Grammar/conjunctions-theory-practice.html:31,51
- **What:** Tab nhóm bài tập chỉ là button thường: không có role="tablist"/"tab", aria-selected hay aria-pressed, trạng thái nhóm đang mở chỉ tồn tại trong class .active nên SR không biết nhóm nào đang hiển thị.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 51: `tabs.insertAdjacentHTML('beforeend','<button class="tab ${i?'':'active'}" data-i="${i}">')` — không thuộc tính ARIA nào; tabs.onclick chỉ remove/add class active.
- **Gợi ý sửa:** Bọc tabs trong role="tablist", mỗi tab role="tab" + aria-selected cập nhật khi chuyển.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 9. Grammar/conjunctions-theory-practice.html:32
- **What:** Nút nổi '↑' không có tên truy cập có nghĩa (accessible name chỉ là ký tự mũi tên, không có aria-label) và kích thước 42px nhỏ hơn chuẩn 44px cho điều khiển cảm ứng.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 32: `<a class="back" href="#top">↑</a>`; CSS dòng 2 `.back{width:42px;height:42px}`; grep toàn file chỉ có 1 aria-label duy nhất nằm trên ô trống (aria-label="Chỗ trống ${j+1}" dòng 50);
- **Gợi ý sửa:** Thêm aria-label="Về đầu trang" và nâng kích thước lên 44px.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 10. Grammar/conjunctions-theory-practice.html:2,32
- **What:** Chữ footer dùng --muted #68727b trên nền --bg #f3f1eb đạt 4.34:1, dưới 4.5:1 cho chữ 16px thường (cùng màu trên nền paper thì đạt).
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 2: `footer{text-align:center;color:var(--muted)}` với --bg:#f3f1eb, footer nằm trên nền body; đã đo lại bằng node: #68727b trên #f3f1eb = 4.34:1 (trượt 4.5), trên paper #fffefa = 4.86:1 (
- **Gợi ý sửa:** Dùng màu đậm hơn từ token (ví dụ --text-muted #56676b) cho chữ footer.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 11. Grammar/english-suffix-lab.html:519,523,554,596,200
- **What:** Kết quả động (giải thích đáp án, điểm, kết quả thi, feedback từng dòng, tiến độ sidebar) không có aria-live/role="status" nào nên trình đọc màn hình không được thông báo khi nội dung thay đổi.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tự chạy grep 'aria-live|aria-atomic|role="status"|aria-pressed|aria-current|aria-hidden' → 0 hit; cả file chỉ có aria-label (tĩnh :451, :474; động :984). #examResult bị thay innerHTML tại :1194, giải
- **Gợi ý sửa:** Thêm aria-live="polite" (hoặc role="status") cho khối explain, score, examResult.
- **Nguồn:** Grammar/english-suffix-lab.html

### 12. Grammar/english-suffix-lab.html:23,60,91-92,946-954,1003-1004,1024-1027
- **What:** Trạng thái lựa chọn chỉ được thể hiện bằng class CSS: nút section nav (.active), chip trạng thái thư viện (.active), nút Đã thuộc/Chưa thuộc (.selected) — không có aria-current/aria-pressed nên trình đọc màn hình không biết mục nào đang chọ
- **Severity:** low — **Status:** verified
- **Evidence:** Tự chạy grep aria- → chỉ 3 aria-label (:451, :474 tĩnh; :984 setAttribute động), không có aria-pressed/aria-current. Trạng thái chọn chỉ qua class: .nav button.active :23 (toggle :946-954), .status-fi
- **Gợi ý sửa:** Thêm aria-pressed cho nút toggle và aria-current cho nav section.
- **Nguồn:** Grammar/english-suffix-lab.html

### 13. Grammar/english-suffix-lab.html:985-1001
- **What:** Mặt trước và mặt sau của thẻ lật cùng nằm trong DOM thường trực (backface-visibility :66 chỉ ẩn về thị giác) nên trình đọc màn hình đọc được cả đáp án khi thẻ chưa lật — mất tính năng tự kiểm tra.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc: :985-1001 card.innerHTML ghi đồng thời .study-front và .study-back; :66 chỉ ẩn bằng backface-visibility:hidden (thị giác); grep aria-hidden → 0 hit.
- **Gợi ý sửa:** Đặt aria-hidden="true" động lên mặt không hiển thị khi flip.
- **Nguồn:** Grammar/english-suffix-lab.html

### 14. Grammar/prepositions-theory-practice.html:69 (kết hợp 39,41)
- **What:** Kết quả chấm (feedback từng câu và điểm `${ok}/${ins.length}`) không nằm trong live region nào nên trình đọc màn hình không được thông báo; toàn trang chỉ có 2 aria-label, 0 aria-live/role.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -o: aria-live=0, 'role='=0, aria-label=2 (dòng 43 và 64). Dòng 69 chỉ đổi innerHTML/textContent của .feedback và .score. CONTEXT.md:121: "Dynamic results use an appropriate live region without re
- **Gợi ý sửa:** Đặt aria-live="polite" cho ô điểm và một region thông báo tổng kết sau khi chấm (không đặt live cho từng feedback câu để tránh đọc loạt).
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 15. Grammar/prepositions-theory-practice.html:66 (kết hợp 41,74)
- **What:** Nút tab bộ bài không exposing trạng thái (aria-pressed/aria-selected không có, "active" chỉ là class nhìn thấy), và 2 ô nhập (tìm kiếm dòng 41, ô viết câu dòng 74) chỉ dùng placeholder làm tên truy cập.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 66: `<button class="tab ${i?'':'active'}" data-index="${i}">` không thuộc tính aria; dòng 41: `<input class="search" id="search" placeholder="Tìm câu hoặc cụm từ…">` không label/aria-label; các i
- **Gợi ý sửa:** Thêm aria-pressed cho tab (hoặc pattern tablist/tabpanel) và aria-label cho hai ô nhập.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 16. Grammar/same-word-different-parts-of-speech.html:8
- **What:** Kết quả động không có live region nào: điểm #score, feedback .feedback (show/hide bằng class) và #progressText đều chỉ đổi DOM tĩnh — trình đọc màn hình không tự nghe kết quả khi bấm Chấm bài; grep cả trang cho 0 thuộc tính aria-*.
- **Severity:** medium — **Status:** verified
- **Evidence:** :8 <span id="score" class="score"></span>; :63 f.classList.add('show'); #progressText (:3) đổi textContent. Đã chạy: grep -c 'aria-' → 0.
- **Gợi ý sửa:** Đặt #score làm aria-live=polite và gom kết quả chấm vào một vùng live duy nhất thay vì announce từng câu.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 17. Grammar/same-word-different-parts-of-speech.html:63
- **What:** Toàn bộ 194 select .choice (30 Rút gọn + 164 Mở rộng) không có accessible name — chỉ có mũi tên → cạnh câu hỏi, không label/aria-label; ô tìm kiếm (:7) cũng chỉ dựa vào placeholder, cả trang không có thẻ <label> nào.
- **Severity:** medium — **Status:** verified
- **Evidence:** :63 renderQuiz sinh '<select class="choice" data-answer="…">' không label/aria-label; :7 '<input id="search" class="search" placeholder="Tìm từ,…">'. Đã chạy grep -c '<label' → 0, 'aria-' → 0. ĐÃ CHỈN
- **Gợi ý sửa:** Thêm aria-label dạng 'Câu n: chọn từ loại' cho select và aria-label cho ô tìm kiếm.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 18. Grammar/same-word-different-parts-of-speech.html:62
- **What:** Trạng thái đang-chọn của nút filter thư viện và tab quiz chỉ truyền qua class CSS, không có aria-pressed — trái yêu cầu DESIGN.md (chip chọn phải có aria-pressed và check).
- **Severity:** low — **Status:** verified
- **Evidence:** :62 e.target.classList.add('active') cho .filter; :63 tương tự cho .tab. Đã chạy grep -c 'aria-' → 0. DESIGN.md:344 ('aria-pressed exposes state') và :392 (mục Do: 'show selection with checks and aria
- **Gợi ý sửa:** Thêm aria-pressed=true/false và cập nhật khi chuyển filter/tab.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 19. Grammar/same-word-different-parts-of-speech.html:2
- **What:** Không định nghĩa bất kỳ :focus/:focus-visible nào (grep 'focus' trong file = 0) — focus bàn phím phụ thuộc outline mặc định của UA và thiếu vòng focus vàng 3px mà DESIGN.md bắt buộc cho lesson controls.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy grep -c 'focus' → 0; CSS :2 chỉ có .side a:hover. DESIGN.md:340 ('lesson controls take a 3px focus-gold ring at 3px offset') và :390 lặp lại là mục Do bắt buộc.
- **Gợi ý sửa:** Thêm :focus-visible với outline 3px màu focus-gold, offset 3px cho mọi control.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 20. Grammar/same-word-different-parts-of-speech.html:9
- **What:** Nút nổi .back cố định góc phải-dưới chỉ 42px (dưới mức mục tiêu 44px mà DESIGN.md đặt cho control tròn cố định góc phải-dưới) với accessible name chỉ là ký tự ↑, và khi cuộn hết trang có khả năng đè vùng footer/bài tập ở viewport hẹp.
- **Severity:** low — **Status:** verified
- **Evidence:** :2 '.back{position:fixed;right:18px;bottom:18px;width:42px;height:42px}'; :9 nội dung '↑', không aria-label; DESIGN.md:381 '44px minimum action targets' cho nhóm control tròn cố định góc phải-dưới (Pr
- **Gợi ý sửa:** Nâng kích thước lên tối thiểu 44px, thêm aria-label 'Lên đầu trang' và kiểm tra không đè nội dung ở 360px.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 21. Grammar/tense-exercises-answer-key-quiz.html:110
- **What:** Vùng kết quả động #feedback và #question khi chuyển câu không có aria-live/role nào, nên trình đọc màn hình không được thông báo khi chấm xong hay khi sang câu mới.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 110: <div id="feedback" class="feedback"></div> và dòng 108 #question đều không có thuộc tính ARIA; đã chạy grep 'aria-live\|role=' trên file → 0. showStored ghi bằng innerHTML (dòng 207), #quest
- **Gợi ý sửa:** Thêm aria-live="polite" cho #feedback và công bố chuyển câu qua #meta cũng bằng một vùng polite.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 22. Grammar/tense-exercises-answer-key-quiz.html:106
- **What:** Thanh tiến độ #bar chỉ là div trang trí không có role="progressbar"/aria-valuenow; thông tin tiến độ chỉ còn ở dòng chữ #meta.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 106: <div class="progress"><div id="bar"></div></div>; chỉ được cập nhật bằng style.width (dòng 205); grep 'role=' trên file → 0. Mitigate nhẹ: #meta có chữ "Câu X/Y" (dòng 205).
- **Gợi ý sửa:** Thêm role="progressbar" với aria-valuemin/max/now, hoặc đánh dấu aria-hidden và dựa hoàn toàn vào text #meta.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 23. Grammar/tense-exercises-answer-key-quiz.html:192
- **What:** window.scrollTo và scrollIntoView với behavior:'smooth' gọi bằng JS không tôn trọng prefers-reduced-motion, dù trang đã nạp helper motionOK() dùng cho mục đích này.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 192: window.scrollTo({top:0,behavior:'smooth'}); dòng 214: $('#summary').scrollIntoView({behavior:'smooth'}); đúng nguyên văn. animation.js:25-27 có motionOK() (return !(reduceQuery && reduceQuer
- **Gợi ý sửa:** Kiểm tra English101Motion.motionOK() (hoặc matchMedia reduce) trước khi chọn behavior:'smooth'.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 24. Verb/english-verbs.html:190-195,220-226,231-235,240-244
- **What:** 15 lựa chọn cấu hình (4 phần thư viện, 5 phạm vi, 3 chiều dịch, 3 số câu) là <div class="part-choice"/"choice"> chỉ gắn sự kiện click, không có tabindex, role hay xử lý phím — người dùng bàn phím/switch không thể đổi phần, chiều dịch hay số
- **Severity:** high — **Status:** verified
- **Evidence:** Đã đối chiếu lại từng dòng: div tại 191-194, 221-225, 232-234, 241-243 (đúng 15 div); handler tại 654-661 và 758-783 chỉ có addEventListener('click'); grep toàn <style> không thấy .part-choice:focus/.
- **Gợi ý sửa:** Đổi các div này thành <button type="button"> (hoặc thêm role/tabindex + xử lý Enter/Space + aria-pressed) và kiểm tra lại bằng chỉ bàn phím.
- **Nguồn:** Verb/english-verbs.html

### 25. Verb/english-verbs.html:266
- **What:** Khung kết quả động #feedbackBox là div thường, không có aria-live hay role="status", nên kết quả đúng/sai không được screen reader thông báo; CONTEXT.md mục Accessibility yêu cầu live region cho kết quả động.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 266: `<div class="feedback" id="feedbackBox"></div>` — grep 'aria-live|role="status"' toàn file = 0 kết quả; nội dung chỉ được gán bằng innerHTML tại 863-867 và 911-914; #progressText (dòng 254)
- **Gợi ý sửa:** Thêm aria-live="polite" (hoặc role="status") cho feedbackBox, và cân nhắc cả #progressText.
- **Nguồn:** Verb/english-verbs.html

### 26. Verb/english-verbs.html:622
- **What:** Trạng thái rỗng của tìm kiếm dùng màu inline #aab1a9 trên nền trang #f3f7f8 — tương phản ≈2.0:1, dưới ngưỡng 4.5:1 của WCAG cho chữ 13px, và thông báo không kèm hành động phục hồi (xóa từ khóa).
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 622: `<p style="color:#aab1a9;font-size:13px;text-align:center;">Không tìm thấy từ phù hợp.</p>`. Đã tính WCAG contrast bằng node: #aab1a9 trên #f3f7f8 = 2.03:1. .lib-intro cùng màu được ghi đè ở
- **Gợi ý sửa:** Dùng màu đạt ≥4.5:1 (vd var(--muted)) và thêm nút "Xóa tìm kiếm" vào trạng thái rỗng.
- **Nguồn:** Verb/english-verbs.html

### 27. Verb/english-verbs.html:48,134 (ring: 33/66/88 vs 61)
- **What:** Focus không nhất quán và lệch chuẩn: ô nhập/search bỏ outline chỉ đổi màu viền khi focus (`outline:none;border-color:var(--red)`), còn các control khác dùng ring 3px nhưng hai màu khác nhau — var(--ochre) #C98A2C ở dòng 33/66/88 và #b8883f
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 48 `.searchbox:focus{outline:none;border-color:var(--red);}` và dòng 134 `input.answer:focus{outline:none;border-color:var(--red);}`; ring: dòng 33/66/88 `outline:3px solid var(--ochre)` (--ochre
- **Gợi ý sửa:** Thống nhất ring focus-gold 3px/offset 3px cho mọi control kể cả input và searchbox.
- **Nguồn:** Verb/english-verbs.html

### 28. Verb/english-verbs.html:35-36 (media query duy nhất ở dòng 90)
- **What:** prefers-reduced-motion chỉ được tôn trọng cho .ledger-row/.flip-inner; animation fadein của panel tab (dòng 35-36) và transition của tab/nút (dòng 29, 119…) vẫn chạy khi người dùng bật giảm chuyển động — CONTEXT.md yêu cầu transition tôn tr
- **Severity:** low — **Status:** verified
- **Evidence:** grep '@media' = 3 kết quả, chỉ dòng 90 là prefers-reduced-motion (161-162 là max-width): `@media(prefers-reduced-motion:reduce){.ledger-row,.flip-inner{transition:none;}.ledger-row:hover{transform:non
- **Gợi ý sửa:** Mở rộng media query reduced-motion để tắt animation/transition toàn trang (duration .01ms) như chuẩn homepage.
- **Nguồn:** Verb/english-verbs.html

### 29. Verb/english-verbs.html:180-185 (handler 722-729)
- **What:** Bốn nút tab (Thư viện/Theo mục đích/Dễ nhầm/Flashcard) chỉ đổi trạng thái qua class .active, không có aria-selected/aria-current/aria-pressed — screen reader không biết tab nào đang bật (bổ sung của người xác minh, không có trong danh sách
- **Severity:** low — **Status:** verified
- **Evidence:** grep 'aria-' toàn file: không attribute nào trên .tab-btn (aria chỉ có trên lab-link 178, collapse-btn 573-579, ledger-row 592-593/637-638/650-651, media button 610-611); handler 722-729 chỉ toggle cl
- **Gợi ý sửa:** Thêm aria-current="true" (hoặc aria-pressed) cho nút đang active trong handler tab.
- **Nguồn:** Verb/english-verbs.html

### 30. Verb/five-forms-of-verbs-with-3rd-person.html:93,211
- **What:** 3 tab chính không có state ARIA: nút .tab chỉ đổi class active, không có aria-selected/aria-pressed cũng như aria-controls, panel không có role=tabpanel — screen reader không biết chế độ nào đang mở (LAB BIẾN ĐỔI / TRA CỨU 462 TỪ / LUYỆN BI
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 93: <button class="tab active" data-tab="lab">LAB BIẾN ĐỔI</button> — không thuộc tính aria nào; các panel (dòng 95, 151, 159) không role=tabpanel; dòng 211: b.classList.add('active') là cách duy
- **Gợi ý sửa:** Thêm aria-pressed (mẫu nút bật/tắt) hoặc pattern tabs chuẩn với role=tab/tabpanel + aria-controls.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 31. Verb/five-forms-of-verbs-with-3rd-person.html:26,316
- **What:** Live region #feedback ẩn bằng display:none rồi vừa được mở (className đổi thành good/bad) vừa gắn innerHTML trong cùng frame — nhiều screen reader không công bố nội dung khi chính region được unhide trong cùng mutation (không thể kiểm chứng
- **Severity:** medium — **Status:** unconfirmed
- **Evidence:** Dòng 26: .feedback{display:none} .feedback.good{display:block}; dòng 164: #feedback có aria-live="polite"; dòng 316: fb.className='feedback good' và fb.innerHTML=`✓…` chạy liên tiếp trong cùng lượt ch
- **Gợi ý sửa:** Giữ block luôn hiển thị và ẩn nội dung bên trong (hidden trên node con), hoặc dùng một container aria-live tồn tại sẵn.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 32. Verb/five-forms-of-verbs-with-3rd-person.html:35
- **What:** Ký tự trang trí '→' 250px chèn bằng CSS content trong hero không được đánh dấu trang trí — CSS generated content vẫn có thể được một số screen reader đọc thành 'mũi tên phải' giữa tiêu đề (không thể kiểm chứng không dùng trình duyệt).
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** Dòng 35: .hero:after{content:'→';position:absolute;right:4%;top:-65px;font-size:250px;color:rgba(255,255,255,.06)} — pseudo-element không gắn được aria-hidden; code fact đã xác nhận bằng đọc trực tiếp
- **Gợi ý sửa:** Thay bằng phần tử aria-hidden="true" hoặc dùng ảnh/SVG decorative để chắc chắn không bị đọc.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 33. Verb/paraphrase-80-flashcards.html:81-101,189-203,418
- **What:** Thẻ lật là div chỉ nhận click (dòng 418) không có role="button"/tabindex/aria-state; cả hai .face cùng nằm trong accessibility tree (backface-visibility chỉ ẩn về thị giác), nên trình đọc màn hình nghe đồng thời mặt trước và mặt sau của mọi
- **Severity:** medium — **Status:** verified
- **Evidence:** grep 'aria-|role=|tabindex' toàn trang trả về rỗng (exit=1): thẻ <div id="card"> chỉ có click listener (418); mặt sau ẩn chỉ bằng backface-visibility:hidden (92) + rotateY (101) — không có display:non
- **Gợi ý sửa:** Đặt role/tabindex + aria-pressed (hoặc aria-hidden ẩn mặt chưa hiện) cho thẻ và thêm một live region polite cho điểm số/kết quả.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 34. Verb/paraphrase-80-flashcards.html:58,75,86
- **What:** Không tôn trọng prefers-reduced-motion: các transition đều khai báo thời lượng cứng (.range-btn all .15s, .progress-fill width .25s, .card rotateY .5s) và trang không có @media (prefers-reduced-motion: reduce) nào, dù tokens.css:19-21 đã cấ
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại đúng 3 transition hard-code: dòng 58 '.range-btn transition:all .15s', 75 '.progress-fill transition:width .25s', 86 '.card transition:transform .5s'; grep 'prefers-reduced-motion|duration-int
- **Gợi ý sửa:** Dùng var(--duration-interaction) cho các transition của trang và thêm media query tắt hiệu ứng lật 3D khi reduced-motion.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 35. Verb/paraphrase-80-flashcards.html:335-344
- **What:** Trạng thái đang chọn của các nút khoảng thẻ (range-btn.active) chỉ được báo bằng màu nền/chữ, không có aria-pressed hay dấu check nào — người dùng bàn phím/SR không biết range nào đang active (DESIGN.md:249 'Selection must add a check, not
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 339 chỉ gắn className 'active' (b===activeRange), không set attribute nào; dòng 60-64 .range-btn.active thuần màu nền/chữ/border; grep aria toàn trang → rỗng. DESIGN.md:249 và DESIGN.md:344 đúng
- **Gợi ý sửa:** Thêm aria-pressed="true|false" (hoặc aria-current) cho mỗi range-btn và cập nhật khi chọn.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 36. Verb/paraphrase-80-flashcards.html:157-158
- **What:** Chữ trên hai nút đánh giá dưới ngưỡng tương phản AA: tính tay WCAG cho '#2f8f5b trên #e5f4ec' ('Đã thuộc') ≈ 3.6:1 và '#c0463d trên #fbe9e7' ('Chưa thuộc') ≈ 4.3:1, đều dưới 4.5:1 cần thiết cho nhãn 14px (bold nhưng dưới ngưỡng large-text 1
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tự tính lại bằng node theo công thức WCAG relative luminance: #c0463d trên #fbe9e7 = 4.28:1, #2f8f5b trên #e5f4ec = 3.55:1 — khớp ước lượng tay của giám định viên gốc (≈4.3, ≈3.6), đều < 4.5:1; nhã
- **Gợi ý sửa:** Dầm chữ xuống (ví dụ dùng lesson-danger #a13736 của DESIGN.md trên tint đỏ) hoặc dùng chính biến --bad/--good đậm hơn để đạt ≥4.5:1.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 37. Verb/phrasal-verbs.html:61, 78, 89, 219
- **What:** Không có @media (prefers-reduced-motion: reduce) nào trong CSS nội tuyến nên lật thẻ 3D rotateY 500ms và các transition 150–250ms vẫn chạy khi người dùng bật giảm chuyển động — trái CONTEXT.md:137 và AGENTS.md (respect prefers-reduced-motio
- **Severity:** medium — **Status:** verified
- **Evidence:** grep trang: 0 match prefers-reduced-motion; 4 transition được dẫn khớp (61, 78, 89, 219). primitives.css:6-8 có route var(--duration-interaction) cho control gốc nhưng .card (div) và .range-btn (trans
- **Gợi ý sửa:** Gói các transition vào media query reduced-motion hoặc dùng var(--duration-interaction) mà tokens.css đã cấp.
- **Nguồn:** Verb/phrasal-verbs.html

### 38. Verb/phrasal-verbs.html:338, 648-657
- **What:** Khối kết quả #dictFeedback không có aria-live/role="status" nên trình đọc màn hình không biết kết quả đúng/sai; sự đổi thẻ, counter và "Đã thuộc" ở chế độ flashcards cũng không được thông báo qua live region nào.
- **Severity:** medium — **Status:** verified
- **Evidence:** `<div class="dict-feedback" id="dictFeedback"></div>` (338) chỉ đổi className/innerHTML (649-657); grep toàn trang: 0 match aria-live và role (chỉ #mediaVerb có aria-label/aria-expanded ở dòng 286).
- **Gợi ý sửa:** Thêm role="status" aria-live="polite" cho #dictFeedback và cho #counter, tránh assertive để không quấy rầy.
- **Nguồn:** Verb/phrasal-verbs.html

### 39. Verb/phrasal-verbs.html:84-91, 268-272, 551
- **What:** Thẻ flashcard là div chỉ nhận click (cursor:pointer) nhưng không có role/tabindex/aria-pressed hay tên truy cập — người dùng bàn phím chỉ lật được khi focus rời khỏi mọi control để Space/Enter toàn cục hoạt động, và trạng thái lật không đượ
- **Severity:** medium — **Status:** verified
- **Evidence:** `card.addEventListener('click', flip)` (551) trên `<div class="card" id="card">` (268); grep trang: 0 tabindex/role. keyboard.js:11,38 chỉ cho Space/Enter toàn cục đi qua dispatcher khi focus KHÔNG tr
- **Gợi ý sửa:** Đặt role="button" tabindex="0" aria-pressed trên #card và xử lý Enter/Space trực tiếp trên nó thay vì chỉ click.
- **Nguồn:** Verb/phrasal-verbs.html

### 40. Verb/phrasal-verbs.html:253-254, 461, 580-583
- **What:** Tab chế độ (FLASHCARDS/CHÍNH TẢ) và các nút phạm vi chỉ thể hiện trạng thái chọn bằng class .active (đổi màu nền), không có aria-pressed/aria-selected nên SR không biết đang ở chế độ/phạm vi nào.
- **Severity:** low — **Status:** verified
- **Evidence:** `b.className='range-btn'+(r===activeRange?' active':'')` (461); mode tab chỉ toggle class (580-583); nút 253-254 không có attribute trạng thái nào. DESIGN.md:344 'aria-pressed exposes state' — đã đọc
- **Gợi ý sửa:** Thêm aria-pressed (hoặc pattern tablist) cập nhật cùng lúc với class active, như DESIGN.md:344 yêu cầu expose state.
- **Nguồn:** Verb/phrasal-verbs.html

### 41. Vocabulary/c1-vocabulary.html:3-10
- **What:** Trang không có phần tử <title> — tab trình duyệt, lịch sử và trình đọc màn hình không có tên trang (WCAG 2.4.2).
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -c "<title>" Vocabulary/c1-vocabulary.html → 0. Đã đọc head (html:3-10): chỉ có favicon (dòng 4), 3 meta (5-7) và 2 stylesheet (8-9).
- **Gợi ý sửa:** Thêm `<title>C1 Vocabulary · English 101</title>` trong <head>.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 42. Vocabulary/c1-vocabulary.js:272-274
- **What:** Chế độ "Anh → Việt · chọn nghĩa" không có ô nhập nên `$('#answer')?.focus()` thành no-op — sau khi bấm "Câu tiếp ↵", focus rơi về body và người bàn phím mất vị trí ở mỗi câu.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc renderExercise: nhánh forward (js:238-240) chỉ render các nút .choice và #unknown, không có #answer; showQuiz chỉ focus #answer (js:274). Nút #next nằm trong innerHTML của #fb (js:342) và bị xó
- **Gợi ý sửa:** Sau khi render câu mới, focus phần tử tương tác đầu tiên (nút lựa chọn đầu hoặc input).
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 43. Vocabulary/c1-vocabulary.html:39-42
- **What:** Bốn select của khung thiết lập phiên (qgroup, mode, num, seconds) có <label> đứng cạnh nhưng không có for/id và không bọc select nên không có accessible name.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc html:39-42: `<div><label>Nhóm</label><select id="qgroup">…` — label là phần tử anh em, không for, select không aria-label; cả 4 select mode/num/seconds giống hệt. Trong khi #sort có aria-label
- **Gợi ý sửa:** Thêm cặp for/id cho 4 label–select (hoặc aria-label như #sort).
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 44. Vocabulary/c1-vocabulary.html:29,32
- **What:** Nhóm điều khiển chỉ thể hiện trạng thái bằng hình ảnh: tablist không có aria-controls/điều hướng mũi tên, chips lọc nhóm chỉ dùng class .active (không aria-pressed), nút đổi chế độ hiển thị có accessible name là ký tự "▦".
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc html:29: tab role="tab" nhưng không có id/aria-controls, panel (html:31/35/51) có id #lib/#quiz/#saved nhưng không có aria-labelledby; JS chỉ có 1 keydown handler cho phím 1-4 và Enter (js:480-
- **Gợi ý sửa:** Thêm aria-controls/aria-labelledby cho cặp tab–panel, aria-pressed cho chip, và aria-label "Đổi kiểu hiển thị" cho viewToggle.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 45. Vocabulary/confusing-words.html:603-624
- **What:** Các lựa chọn cấu hình bài chính tả (Tầng #tierRow, Chiều #dirRow, Số câu #countRow) là <div> có click handler nhưng không phải button, không có tabindex/role → người dùng bàn phím không thể chọn gì trước khi bấm "Bắt đầu", chỉ dùng được cấu
- **Severity:** high — **Status:** verified
- **Evidence:** Đọc :603-606, :613-614, :621-623: toàn div; JS chỉ gắn addEventListener('click') tại :1543-1566, trang không có handler bàn phím nào khác cho các div này (grep 'role=' = 0, đã chạy); đối chứng #libTie
- **Gợi ý sửa:** Thay các div bằng <button type="button"> như #libTierRow đã làm và giữ nguyên style.
- **Nguồn:** Vocabulary/confusing-words.html

### 46. Vocabulary/confusing-words.html:627,653,1666-1673
- **What:** Khối kết quả #feedbackBox (và #poolInfo) không có role="status"/aria-live — người dùng screen reader không nghe được đúng/sai, đáp án và mẹo sau mỗi lần chấm.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :653 <div class="feedback" id="feedbackBox"></div> và :627 <div class="sub" id="poolInfo"> không có thuộc tính ARIA nào; JS ghi kết quả vào feedbackBox tại :1666-1673; đối chứng #libStatus đã có a
- **Gợi ý sửa:** Thêm role="status" cho #feedbackBox và aria-live="polite" cho #poolInfo.
- **Nguồn:** Vocabulary/confusing-words.html

### 47. Vocabulary/confusing-words.html:552-558,569-582
- **What:** Trạng thái chọn chỉ nằm trong class .sel: các nút filter (trình độ/kiểu dễ nhầm) không có aria-pressed, còn 2 nút tab dùng aria-selected trên <button> không có role="tab"/tablist — ARIA không hợp lệ, assistive tech bỏ qua.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep 'aria-pressed' = 0 và 'role=' = 0 trên toàn trang (đã chạy); đọc :552/:556 aria-selected trên <button> trong <nav class="tabs"> (:551) không có role="tablist"; JS chỉ đổi class + aria-selected tạ
- **Gợi ý sửa:** Thêm aria-pressed cho các nút chọn, hoặc chuyển tab sang pattern role="tablist"/"tab" đúng chuẩn kèm điều hướng mũi tên.
- **Nguồn:** Vocabulary/confusing-words.html

### 48. Vocabulary/confusing-words.html:117,387
- **What:** Trang có animation fadein khi chuyển panel/feedback cùng nhiều transition (:103,:245,:265,:294,:327) nhưng không có bất kỳ @media (prefers-reduced-motion) nào, vi phạm yêu cầu tôn trọng reduced-motion của CONTEXT.md và DESIGN.md.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :117 .panel.active{…animation:fadein .25s ease} và :387 .feedback.show{…animation:fadein .2s ease}; grep 'prefers-reduced-motion' toàn trang = 0 (đã chạy). CONTEXT.md:137 yêu cầu "respect reduced-
- **Gợi ý sửa:** Thêm media query hạ thời lượng animation/transition về ~0.001ms khi người dùng bật giảm chuyển động.
- **Nguồn:** Vocabulary/confusing-words.html

### 49. Vocabulary/ielts-collocations-topic-table-with-dictation.html:113-114,136-137,154-178
- **What:** 6 select và 2 ô tìm kiếm không có accessible name đáng tin: label ở quiz-grid không được gắn (thiếu for/id, không bọc input trong label), còn #search/#topicFilter/#cardTopic/#cardSearch chỉ có placeholder/option đầu — select không nhận opti
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện: html:154-155 `<label>Chủ đề</label><select id="qTopic">` (không for/id, không bọc); html:114 `<select id="topicFilter"><option value="">Tất cả chủ đề</option></select>` không label; html:
- **Gợi ý sửa:** Bọc select/input trong <label> hoặc thêm for/id cho 4 label quiz-grid và thêm aria-label cho 4 control bảng/flashcard.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 50. Vocabulary/ielts-collocations-topic-table-with-dictation.html:116,188,191,199
- **What:** Kết quả động không được công bố cho screen reader: #resultLine (đếm kết quả tìm), #qFeedback (đúng/sai + đáp án), #qHintArea đều thiếu role/aria-live; #qProgress thiếu role=progressbar/aria-valuenow; 3 tab học (105-107) không có aria-select
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện: grep 'aria-live|role=|aria-label|aria-selected|aria-pressed' toàn file = 0 match. html:199 `<div id="qFeedback" class="quiz-feedback"></div>`; html:188 `.quiz-progress><div id="qProgress"`
- **Gợi ý sửa:** Thêm role="status"/aria-live="polite" cho qFeedback & resultLine, role="progressbar"+aria-valuenow cho qProgress, và mô hình tab (role=tabli
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 51. Vocabulary/ielts-collocations-topic-table-with-dictation.html:192
- **What:** BỔ SUNG: Ô nhập đáp án chính #qAnswer của quiz không có accessible name — chỉ có placeholder, không label bọc, không for/id, không aria-label (không nằm trong danh sách control của finding label-quiz-grid ở trên).
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện: html:192 `<input id="qAnswer" class="quiz-answer" autocomplete="off" spellcheck="false" placeholder="Nhập đáp án...">`; grep 'aria-label' toàn file = 0 (JS chỉ gắn aria-label động cho fla
- **Gợi ý sửa:** Bọc #qAnswer trong <label> hoặc thêm aria-label='Đáp án'.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 52. Vocabulary/ielts-hiking-modern.js:25
- **What:** Thẻ flashcard (article tabindex=0 role=button — 448 thẻ theo DATA.length, không phải ~190) không có style focus nào do trang định nghĩa: rule focus của site chỉ cover input/select/button/a, article/.card không được nhắc tới; không rule nào
- **Severity:** medium — **Status:** unconfirmed
- **Evidence:** js:25 tạo card `tabindex="0" role="button"`. Grep focus/outline: primitives.css:1-3 chỉ `:where(button,a,input,select,textarea,summary):focus-visible`; ielts-collocations-modern.css:16 chỉ input/selec
- **Gợi ý sửa:** Thêm rule focus-visible cho .card/[role=button] dùng outline 3px var(--focus) #b8883f (tokens.css:15) theo DESIGN.md:390 'Never ship an inte
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 53. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:210
- **What:** Kết quả động (khối phản hồi đúng/sai, điểm, đồng hồ) không nằm trong live region nào — #dictFeedback không có aria-live/role=status và ẩn bằng display:none nên screen reader không biết kết quả vừa chấm.
- **Severity:** medium — **Status:** verified
- **Evidence:** html:210 `<div id="dictFeedback" class="dict-feedback"></div>` không có aria attr; ẩn/hiện qua .dict-feedback{display:none} (html:83) + class good/bad; js:59 ghi innerHTML vào #dictFeedback. grep 'ari
- **Gợi ý sửa:** Thêm role="status" aria-live="polite" cho #dictFeedback (aria-atomic="true") — đủ thông báo 1 lần sau khi chấm.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 54. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:137
- **What:** 2 ô nhập chính (#filterBox và #dictAnswer) không có label/aria-label, chỉ dựa placeholder nên accessible name yếu (placeholder mất khi gõ).
- **Severity:** low — **Status:** verified
- **Evidence:** html:137 `<input class="filter-input" id="filterBox" placeholder="Tìm từ / collocation...">`; html:201 `<input id="dictAnswer" ... placeholder="Nhập đáp án...">` — không <label> lẫn aria-label. Script
- **Gợi ý sửa:** Thêm aria-label="Tìm collocation" / "Câu trả lời" (hoặc label ẩn) cho 2 input.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 55. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:156
- **What:** FINDING BỔ SUNG: 4 select trong khung thiết lập phiên (dictUnit :157, dictDirection :163, dictCount :175, dictSeconds :183) có <label> hiển thị nhưng không liên kết bằng chương trình (không thuộc tính for, select không nằm trong label) nên
- **Severity:** low — **Status:** verified
- **Evidence:** grep -n "for=" toàn file → exit 1 (0 match); html:156 `<label>Unit</label>` là phần tử anh em của `<select id="dictUnit">` (:157), tương tự :162/163, :174/175, :183 — cùng nhóm lỗi với finding 2 ô nhậ
- **Gợi ý sửa:** Thêm for="dictUnit"… vào từng label (hoặc bọc select bên trong label).
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 56. Vocabulary/root-atlas.html:3,18
- **What:** Trạng thái động không được công bố cho công nghệ hỗ trợ: 4 nút tab điều hướng chỉ đổi class .active (không có aria-pressed/aria-selected), và số kết quả lọc #count thay đổi mà không có aria-live.
- **Severity:** medium — **Status:** verified
- **Evidence:** root-atlas.html:3 4 nút data-tab chỉ có class, không role/aria-selected; :18 `b.classList.toggle('active',b.dataset.tab===tab)`; :3 `<span id="count" class="muted"></span>` không aria-live (grep 'aria
- **Gợi ý sửa:** Thêm role=tablist/tab + aria-selected (hoặc aria-pressed) cho nav và aria-live=polite cho #count.
- **Nguồn:** Vocabulary/root-atlas.html

### 57. Vocabulary/root-atlas.html:41 (nạp) + assets/keyboard-pronunciation.js:96-99
- **What:** Cụm phát âm dùng chung hiển thị trên trang vi phạm spec Pronunciation Helper trong DESIGN.md: nút fixed cao ~36-38px (dưới mức 44px), focus ring đỏ #a63d40 thay vì gold #b8883f, icon là emoji 🔊, và không có biến thể bottom-sheet cho mobile
- **Severity:** medium — **Status:** verified
- **Evidence:** keyboard-pronunciation.js:96-97 `position:fixed;bottom:18px;z-index:1000`, `.pronunciation-shortcut{right:18px;padding:9px 13px}` (cao ~37px) và `.pronunciation-settings-button{width:36px;height:36px}
- **Gợi ý sửa:** Nâng target ≥44px, đổi focus sang #b8883f, thay 🔊 bằng glyph SVG trong module dùng chung.
- **Nguồn:** Vocabulary/root-atlas.html

### 58. Vocabulary/root-atlas.html:24 (nút sao trong phiên) + :15,:34
- **What:** Bổ sung — Nút gắn sao trong card phiên học (flashcard/kiểm tra) render thiếu aria-pressed ban đầu: trạng thái bật/tắt sao không được công bố cho screen reader trước lần bấm đầu, trong khi card thư viện có đủ thuộc tính này.
- **Severity:** low — **Status:** verified
- **Evidence:** root-atlas.html:24 `<button class="star" data-star="${d.id}" aria-label="Gắn sao">` không có aria-pressed; card thư viện :15 có `aria-pressed="${item(d.id).star}"`; handler :34 chỉ setAttribute('aria-
- **Gợi ý sửa:** Thêm aria-pressed="${item(d.id).star}" vào nút sao của drawStudy để khớp card thư viện.
- **Nguồn:** Vocabulary/root-atlas.html

### 59. Vocabulary/toeic-600.js:120-124 (toggleList) → 107-111 (renderLibrary)
- **What:** Bấm 'Lưu' hay 'Đánh dấu nhớ' trên thẻ từ sẽ render lại toàn bộ #cards, phá nút đang giữ focus nên focus rơi về <body> — người bàn phím mất vị trí, phải Tab lại từ đầu (lặp mỗi lần toggle, cả tab Đã lưu).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã xác minh từ code (deterministic): toggleList gọi commit(); renderLibrary() (toeic-600.js:123); renderLibrary gán $('#cards').innerHTML (toeic-600.js:110); các nút data-save/data-known nằm trong #ca
- **Gợi ý sửa:** Chỉ cập nhật class/aria-pressed trên chính thẻ bị tác động thay vì rebuild cả lưới.
- **Nguồn:** Vocabulary/toeic-600.html

### 60. Vocabulary/toeic-600.html:31-36,38
- **What:** Tablist 4 tab chỉ hỗ trợ Tab/Enter: không có điều hướng mũi tên trái/phải giữa tab, tab không có id/aria-controls và tabpanel không có aria-labelledby — role=tab dùng mà thiếu đúng pattern WAI-ARIA nên SR không đọc được quan hệ tab↔panel.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh: HTML:32-35 button role=tab chỉ có aria-selected, không id/aria-controls; section role=tabpanel (:38, :48, :56, :67) không aria-labelledby; keyboard.js:10-11 trả null khi focus đang trên b
- **Gợi ý sửa:** Thêm id + aria-controls trên tab, aria-labelledby trên panel, và ArrowLeft/ArrowRight chuyển tab khi focus trong tablist.
- **Nguồn:** Vocabulary/toeic-600.html

### 61. Vocabulary/toeic-600.js:109 (#count) + toeic-600.html:45
- **What:** Kết quả lọc/tìm kiếm ('Hiển thị 12 / 600 mục') cập nhật bằng innerHTML nhưng #count không phải live region — trình đọc màn hình không được thông báo khi bộ lọc thay đổi kết quả; chuẩn trang chủ đã quy định 'Đếm kết quả aria-live'.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh: toeic-600.html:45 '<div class="count" id="count"></div>' không có aria-live; toeic-600.js:109 ghi innerHTML; docs/redesign/homepage/homepage-redesign-plan.md:112 (grep -n) có cột 'Đếm kết
- **Gợi ý sửa:** Thêm aria-live="polite" cho #count (nội dung ngắn, không quấy rầy).
- **Nguồn:** Vocabulary/toeic-600.html

### 62. Vocabulary/vocabulary-atlas.html:56,50,35
- **What:** Vài khoảng hở a11y: gợi ý đục lỗ ghi vào #hintBox thường (ngoài vùng aria-live nên trình đọc màn hình không nghe được), thanh tiến độ chỉ là div/span không có role=progressbar/aria-valuenow, và trạng thái tab active chỉ là class .active khô
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại khớp: :56 `$('#hintBox').textContent=…;classList.remove('hidden')` — #hintBox tại :50 là div thường, tách khỏi #answer (aria-live='polite' cùng dòng); :50 `.progress><span style=width…%` không
- **Gợi ý sửa:** Thêm aria-live cho #hintBox, role=progressbar + aria-valuenow cho thanh tiến độ, và aria-current cho nút tab đang mở.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 63. Vocabulary/vocabulary-atlas.html:29 + assets/learning/media-helper.js:100,106,113-115
- **What:** Accessible name và nhãn trợ lý hình ảnh bằng tiếng Anh giữa giao diện tiếng Việt: 'Visual resources for …', title 'Images & video', panel 'Images search / Images / Videos / Context / Close media helper' — lệch ngôn ngữ với mọi control khác
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại khớp: vocabulary-atlas.html:29 `aria-label="Visual resources for ${esc(d.w)}" … title="Images & video"`; media-helper.js:100 'Close media helper', :106 'Images search', :113-115 'Images'/'Vide
- **Gợi ý sửa:** Đổi nhãn sang tiếng Việt ('Xem hình & video cho …', 'Đóng') hoặc chấp nhận song ngữ có chủ đích cho toàn panel.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 64. assets/learning/vocabulary-rounds-app.js:27
- **What:** Trạng thái tab điều hướng chỉ thể hiện qua class .active; các nút data-tab không có aria-pressed/aria-current hay role tablist nên trình đọc màn hình không biết chế độ nào đang mở.
- **Severity:** medium — **Status:** verified
- **Evidence:** app:27 'querySelectorAll('nav [data-tab]').forEach(b=>b.classList.toggle('active',…))' — chỉ class. Kiểm bằng grep: aria-current|aria-selected|role="tab|tablist trong app+HTML = 0 kết quả; aria-presse
- **Gợi ý sửa:** Toggle aria-pressed cùng lúc với .active, hoặc dùng role=tablist/tab + aria-selected.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 65. Vocabulary/vocabulary-practice.html:6
- **What:** Nút icon-only '⛶' (#fullDetail) không có accessible name — trình đọc màn hình chỉ đọc ký tự trang trí hoặc không đọc gì.
- **Severity:** low — **Status:** verified
- **Evidence:** HTML:6 '<button id="fullDetail">⛶</button>' — không aria-label/title; dialog.js:22-24 toggleFull chỉ 'dialog.classList.toggle(fullClass)', không đặt nhãn.
- **Gợi ý sửa:** Thêm aria-label='Phóng to hộp chi tiết' (đổi thành 'Thu nhỏ' khi đang full).
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 66. Vocabulary/ielts-vocabulary-focus.css:14
- **What:** Transition của nút hard-code .16s (kể cả transform) thay vì var(--duration-interaction) mà tokens.css đã hạ về 0ms khi prefers-reduced-motion — hover/vuốt vẫn animate với người dùng giảm chuyển động, và lệch nhịp 160ms so với chuẩn 180–260m
- **Severity:** low — **Status:** verified
- **Evidence:** focus css:14 'button{border-radius:11px;transition:background-color .16s,border-color .16s,transform .16s}' — có transform, và selector 'button' (0,0,1) đè transition :where(...) của primitives (độ đặ
- **Gợi ý sửa:** Dùng var(--duration-interaction) cho transition trong ielts-vocabulary-focus.css.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 67. assets/learning/vocabulary-rounds-app.js:33
- **What:** Nút icon-only '♫' (data-sentence) trong hộp chi tiết không có accessible name — trình đọc màn hình chỉ gặp ký tự trang trí, cùng lỗi với #fullDetail nhưng là phần tử khác mà danh sách bỏ sót.
- **Severity:** low — **Status:** verified
- **Evidence:** app:33 '<div class="example">${esc(d.ex)} <button data-sentence="${esc(d.id)}">♫</button></div>' — không aria-label/title (grep data-sentence = 1, markup nguyên văn không có thuộc tính tên); CONTEXT.m
- **Gợi ý sửa:** Thêm aria-label='Nghe câu ví dụ nguồn' cho nút data-sentence.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 68. Vocabulary/vocabulary-reading-translation-v1-6.html:97,99,415,417-419
- **What:** Mọi kết quả động (điểm, đúng/sai, giải thích) được innerHTML vào .feedback không có aria-live hay role=status nào trên toàn trang, screen reader không được thông báo — trái hợp đồng Accessibility của CONTEXT.md.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -c 'aria-live|role="status"|role=\'status\'' trên trang → 0 (đã tự chạy); các khối feedback: :97 data-feedback (×2 mode), :415 #flowFeedback, :417-419 #coverageFeedback. CONTEXT.md:121 'Dynamic r
- **Gợi ý sửa:** Thêm role="status" aria-live="polite" (tĩnh trong DOM, chỉ đổi nội dung) vào các khối .feedback.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 69. Vocabulary/vocabulary-reading-translation-v1-6.html:10
- **What:** Không có vòng focus vàng 3px chuẩn lesson của DESIGN.md: textarea/search chỉ có outline rgba(53,106,88,.14) (~14% alpha, gần vô hình), còn nút/chip/tab chỉ dựa vào outline mặc định của trình duyệt (grep ':focus' trong <style> → duy nhất rul
- **Severity:** medium — **Status:** verified
- **Evidence:** :10 '.textarea:focus,.search:focus{outline:3px solid rgba(53,106,88,.14);border-color:var(--green)}'; DESIGN.md:340 'lesson controls take a 3px focus-gold ring at 3px offset' (còn :241, :390 và :243 x
- **Gợi ý sửa:** Áp vòng focus-gold #b8883f 3px offset cho mọi control (token --focus đã có sẵn trong assets/styles/tokens.css).
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 70. assets/learning/vocabulary-rounds-app.js:30
- **What:** Nút 'Hình · Video' có accessible name tiếng Anh 'Visual resources for <từ>' trong khi trang khai báo lang='vi' và toàn bộ UI tiếng Việt → screen reader đọc tên không khớp ngôn ngữ trang.
- **Severity:** low — **Status:** verified
- **Evidence:** app:30 `aria-label="Visual resources for ${esc(d.w)}"`; practice:1 `<html lang="vi">`.
- **Gợi ý sửa:** Đổi thành 'Xem hình và video cho <từ>'.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 71. Vocabulary/ielts-vocabulary-focus.css:21 (+ assets/ui/dialog.js:14, assets/learning/vocabulary-rounds-app.js:33)
- **What:** body.focus-mode áp display:none!important lên cả `dialog`, nên khi đang bật chế độ Tập trung mà mở 'Nghĩa & cách dùng', showModal() chạy trên dialog bị ẩn — có thể vào top layer mà không hiện gì (phần hành vi runtime chưa tái hiện được vì k
- **Severity:** low — **Status:** unconfirmed
- **Evidence:** CSS:21 `body.focus-mode …,body.focus-mode dialog,body.focus-mode #toast…{display:none!important}` (xác nhận); dialog.js:14 `if(!dialog.open) dialog.showModal()`; app:33 openEntry không thoát focus-mod
- **Gợi ý sửa:** Loại `dialog` khỏi danh sách ẩn của focus-mode, hoặc tự thoát focus-mode trước khi mở dialog chi tiết.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 72. Vocabulary/vocabulary-practice.html:6
- **What:** 2 nút icon-only không có accessible name: nút toàn màn hình dialog chỉ có ký tự "⛶", và nút phát âm câu ví dụ trong phần mở rộng chỉ có ký tự "♫" (trong khi nút media và nút sao cùng trang đã đặt aria-label đúng — làm mẫu được).
- **Severity:** medium — **Status:** verified
- **Evidence:** vocabulary-practice.html:6 "<button id=\"fullDetail\">⛶</button>"; app.js:33 "<button data-sentence=\"${esc(d.id)}\">♫</button>"; đối chiếu app.js:30 mediaButton có aria-label và app.js:31 nút sao có
- **Gợi ý sửa:** Thêm aria-label="Phóng to chi tiết" và aria-label="Nghe câu ví dụ" cho 2 nút.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 73. assets/learning/vocabulary-rounds-app.js:27
- **What:** Tab điều hướng chỉ đổi class .active, không expose trạng thái qua aria-current (hoặc aria-pressed) nên screen reader không biết tab nào đang mở — trái hợp đồng a11y trong CONTEXT.md:121.
- **Severity:** low — **Status:** verified
- **Evidence:** app.js:27 "b.classList.toggle('active',b.dataset.tab===tab)" — không có thao tác attribute nào khác trên nav buttons (các nút nav ở vocabulary-practice.html:6 cũng không có aria-state); CONTEXT.md:121
- **Gợi ý sửa:** Thêm aria-pressed hoặc aria-current="true" cùng lúc với class active.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 74. Vocabulary/ielts-vocabulary-focus.css:14
- **What:** Transition 160ms viết cứng trên mọi button đè lên token --duration-interaction của tokens.css vốn rơi về 0ms dưới prefers-reduced-motion — hover vẫn chuyển động dù người dùng bật giảm chuyển động (chống chỉ dẫn DESIGN.md:392).
- **Severity:** low — **Status:** verified
- **Evidence:** ielts-vocabulary-focus.css:14 "button{border-radius:11px;transition:background-color .16s,border-color .16s,transform .16s}"; tokens.css:16 "--duration-interaction:220ms" và :19-21 "@media (prefers-re
- **Gợi ý sửa:** Thay .16s bằng var(--duration-interaction, .16s) trong rule button.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 75. Writing/guide.html:99,130
- **What:** Kết quả động của 'Phân tích nhanh' (4 ô điểm + list feedback) chỉ hiện bằng ẩn/hiện #analysis, không có aria-live hay role=status nào trên trang (grep = NO MATCH cả hai) — người dùng screen reader không được thông báo kết quả, trái hợp đồng
- **Severity:** medium — **Status:** verified
- **Evidence:** guide.html:99 `<div id="analysis" hidden>…<ul class="feedback" id="feedback"></ul>`; guide.html:130 `$('#analysis').hidden=false`; grep -n 'aria-live' = NO MATCH, grep -n 'role="status"' = NO MATCH; C
- **Gợi ý sửa:** Thêm role="status" aria-live="polite" cho khối #analysis (hoặc một div tóm tắt 1 câu) để công bố kết quả một lần duy nhất.
- **Nguồn:** Writing/guide.html

### 76. Writing/guide.html:12
- **What:** Chỉ input/textarea có focus ring tự định nghĩa; .btn, .icon-btn, summary, .nav a không có style :focus/:focus-visible nào và phải trông cậy outline mặc định của trình duyệt — trái hợp đồng DESIGN.md:340 (lesson control phải có vòng focus-go
- **Severity:** low — **Status:** verified
- **Evidence:** grep -n ':focus' Writing/guide.html → duy nhất 1 rule `input:focus,textarea:focus{…box-shadow:0 0 0 3px…}` trong dòng 12; không có :focus-visible nào; .btn/.icon-btn/summary/.nav a (dòng 12) không có
- **Gợi ý sửa:** Thêm rule chung `.btn:focus-visible,.icon-btn:focus-visible,summary:focus-visible,.nav a:focus-visible{outline:3px solid var(--focus);outlin
- **Nguồn:** Writing/guide.html

### 77. Writing/guide.html:33
- **What:** Nút đổi giao diện icon-only chỉ có name qua thuộc tính title (`<button id="themeBtn" title="Đổi giao diện">◐</button>`): tên truy cập phụ thuộc title (yếu, không đọc trên nhiều SR/touch) và không có aria-pressed để báo trạng thái sáng/tối.
- **Severity:** low — **Status:** verified
- **Evidence:** guide.html:33 `<button class="icon-btn" id="themeBtn" title="Đổi giao diện">◐</button>`; grep 'aria-pressed|aria-label' → aria-label duy nhất trên trang là ở mobileSelect dòng 110; script dòng 115 chỉ
- **Gợi ý sửa:** Thêm aria-label="Đổi giao diện sáng/tối" và cập nhật aria-pressed (hoặc nhãn text) khi toggle ở script dòng 115.
- **Nguồn:** Writing/guide.html

### 78. Writing/guide.html:12
- **What:** Không xử lý prefers-reduced-motion nào (grep = NO MATCH) dù trang bật scroll-behavior:smooth và có transition .25s trên thanh tiến độ — trái yêu cầu 'should respect reduced-motion preferences' (CONTEXT.md:137) và chuẩn motion DESIGN.md:332.
- **Severity:** low — **Status:** verified
- **Evidence:** grep -n 'prefers-reduced-motion' Writing/guide.html = NO MATCH; guide.html:12 `html{scroll-behavior:smooth…}` và `.bar span{…transition:.25s}`; CONTEXT.md:137 '…Typical hover and selection transitions
- **Gợi ý sửa:** Thêm @media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}*{transition:none}} hoặc nạp tokens.css vốn đã có biến --duration-int
- **Nguồn:** Writing/guide.html

### 79. Writing/meaning-to-english-pipeline-v1-6.html:385
- **What:** Ô khuyết trong bài collocation chứa nguyên chữ đáp án chỉ được giấu bằng CSS color:transparent (dòng 43), nên trình đọc màn hình đọc to đáp án ngay trong câu hỏi và chữ vẫn nằm trong DOM.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: dòng 385: "<span class="blank">${esc(span.matched)}</span>"; tôi chạy chính makeCloze của trang bằng node trên 6.784 mục, mẫu: "Only an <span class="blank">adult</span> can sign this legal c
- **Gợi ý sửa:** Thay nội dung span.blank bằng placeholder vô nghĩa (hoặc thêm aria-hidden="true") để đáp án không nằm trong cây accessibility.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 80. Writing/meaning-to-english-pipeline-v1-6.html:247
- **What:** Kết quả động của từng bước (đúng/sai, checklist vì sao sai, đáp án) được chèn bằng innerHTML mà không có live region nào — toàn trang chỉ có toast là role="status", nên người dùng SR không nhận được kết quả; vi phạm CONTEXT.md:121.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: dòng 247: "shell.innerHTML=html;wireStage(item)"; feedbackHtml dòng 237 chỉ tạo div.feedback.show; tôi chạy grep -n 'aria-live' toàn trang → đúng 1 hit duy nhất ở toast dòng 135; CONTEXT.md:
- **Gợi ý sửa:** Thêm một live region riêng (aria-live="polite") cho khối feedback thay vì dựa vào toast.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 81. Writing/meaning-to-english-pipeline-v1-6.html:72
- **What:** Trạng thái chọn/correct/wrong chỉ bày tỏ bằng class màu, không có aria-pressed/aria-checked ở bất kỳ đâu trong trang (4 nhóm: chip Vòng 72-74, chip Số mục 90, lựa chọn Bước 1 dòng 252, nút tự đánh giá dòng 312); trái với DESIGN.md:344/392 (
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: tôi chạy grep -nE 'aria-pressed|aria-checked' trên trang → 0 hit (exit 1); dòng 252: "cls=app.stageAnswered?(correct?"correct":selected?"wrong":"")…" chỉ đổi class; CSS .chip.active (dòng 29
- **Gợi ý sửa:** Gắn aria-pressed cho chip/rate và trạng thái đúng/sai cho choice-btn (aria-pressed hoặc text/icon bổ sung ngoài màu).
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 82. Writing/meaning-to-english-pipeline-v1-6.html:30
- **What:** Xử lý focus lệch chuẩn lesson chung: .control/.answer đặt outline:none rồi thay bằng ring xanh 11–12% opacity (rất mờ, chỉ kèm đổi màu viền), còn mọi control khác (chip, choice-btn, rate, icon-btn, tiny-btn, summary) không có focus style ri
- **Severity:** low — **Status:** verified
- **Evidence:** Tái hiện: dòng 30: ".control{…outline:none}.control:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(36,93,167,.12)}"; dòng 40: ".answer:focus{…0 0 0 4px rgba(36,93,167,.11)}"; tôi chạy sed 10
- **Gợi ý sửa:** Áp dụng focus ring vàng (focus-gold) 3px offset 3px nhất quán cho toàn bộ control của trang.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 83. viewer.js:7-10 + viewer.html:8-9
- **What:** Trạng thái lỗi (id thiếu/sai) không được công bố cho screen reader: #viewer-message chỉ mở bằng cách bỏ hidden, không có role/aria-live; đồng thời #viewer-title trong thanh vẫn kẹt ở chữ 'Đang mở tài liệu…' và document.title không đổi, mâu
- **Severity:** low — **Status:** verified
- **Evidence:** viewer.js:7-10 (đọc trực tiếp): chỉ set frame.hidden/message.hidden + viewer-error.textContent rồi return trước dòng 12 → #viewer-title giữ 'Đang mở tài liệu…' (viewer.html:8), document.title giữ 'Đọc
- **Gợi ý sửa:** Đổi #viewer-title thành 'Không tìm thấy tài liệu', cập nhật document.title, và thêm role="alert" (hoặc aria-live="assertive") cho #viewer-me
- **Nguồn:** viewer.html

### 84. style.css:135,298-299,308 + viewer.html:8
- **What:** Các điều khiển trên viewer-bar (.viewer-back, .viewer-actions a) không có quy tắc :focus-visible riêng trong khi style.css định nghĩa focus ring 3px cho mọi component khác (primary-button, filter-button, topic-card, quick-index, section-nav
- **Severity:** low — **Status:** verified
- **Evidence:** Lệnh chạy: grep -n focus-visible style.css → đúng 4 dòng: 135 (.topic-card), 298 (.hero-search button,.primary-button,.filter-button,.text-button,.light-button), 299 (.index-launcher,.quick-index butt
- **Gợi ý sửa:** Thêm :focus-visible outline 3px (màu sáng tương phản trên nền navy, ví dụ lime) cho .viewer-back và .viewer-actions a.
- **Nguồn:** viewer.html

### 85. style.css:1,3 + viewer.html:8
- **What:** Tap target của link '←' (về thư viện) trên mobile chỉ font 13px, không có padding/min-height — nhỏ hơn nhiều so với chuẩn 44px mà chính style.css áp dụng cho .footer-links a; tại ≤720px chữ 'Thư viện' bị ẩn nên còn đúng mỗi ký tự mũi tên.
- **Severity:** low — **Status:** verified
- **Evidence:** grep -n viewer-back style.css → chỉ 2 rule: `.viewer-back,.viewer-actions a{font-size:13px;font-weight:700}` (dòng 1) và `.viewer-back span,.viewer-actions a:first-child{display:none}` (dòng 3) — khôn
- **Gợi ý sửa:** Cho .viewer-back padding/min-height 44px (hiển thị glyph trong vùng chạm lớn hơn) như đã làm với footer links.
- **Nguồn:** viewer.html

### 86. viewer.html:9
- **What:** Iframe có accessible name tĩnh chung chung 'Trình xem tài liệu' thay vì tên tài liệu đang mở — screen reader user điều hướng theo frame sẽ không biết đang mở tài liệu nào.
- **Severity:** low — **Status:** verified
- **Evidence:** viewer.html:9 `<iframe id="document-frame" title="Trình xem tài liệu" allowfullscreen>`; đọc toàn bộ viewer.js — chỉ set document.title và #viewer-title (dòng 12-13), không có phép gán frame.title nào
- **Gợi ý sửa:** Trong viewer.js, sau khi tìm được doc, set frame.title = doc.title.
- **Nguồn:** viewer.html

### 87. Verb/phrasal-verbs.html:61, 78, 89, 219, Vocabulary/vocabulary-reading-translation-v1-6.html:11, Writing/guide.html:12, Vocabulary/ielts_hiking_collocations_full_with_dictation.html:30 …6 trang
- **What:** Motion CSS (transition, @keyframes, scroll-behavior:smooth) hard-code giá trị thời gian và không tôn trọng prefers-reduced-motion ở 6 trang, trong khi chuẩn chung đã có (tokens.css --duration-interaction = 0ms khi reduce; animation.js motio
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại từng dòng khớp: confusing-words 5 transition (:103,245,265,294,327) + @keyframes fadein :117-118 dùng ở :117,:387, 0 guard; reading-translation:11 transition:width .2s; guide:12 scroll-behavior
- **Gợi ý sửa:** Thêm một media query reduce chung (trong primitives.css) đặt animation/transition-duration:0 và scroll-behavior:auto, rồi để các trang nạp d
- **Nguồn:** đối chiếu hệ thống

### 88. Vocabulary/c1-vocabulary.html:12, Vocabulary/toeic-600.html:14, Vocabulary/personal-flashcards.html:10 …25 trang thiếu
- **What:** Skip-link chỉ có trên 3/28 lesson page (và 1 trong 3 dùng text tiếng Anh 'Skip to content' dù UI mặc định tiếng Việt), trong khi CONTEXT.md mục Accessibility và index.html:18 đã đặt chuẩn a11y này.
- **Severity:** low — **Status:** verified
- **Evidence:** Đo lại grep 'skip-link|Bỏ qua tới' → đúng 4 file duy nhất: index.html:18 ('Bỏ qua tới kho tài liệu'), c1-vocabulary:12, toeic-600:14 ('Đi đến nội dung'), personal-flashcards:10 ('Skip to content' — ti
- **Gợi ý sửa:** Thêm skip-link + :focus target #main vào đầu body của các lesson còn thiếu, dùng text tiếng Việt thống nhất.
- **Nguồn:** đối chiếu hệ thống

### 89. Vocabulary/personal-flashcards.html:1,10 + assets/learning/personal-flashcards.js:6
- **What:** personal-flashcards.html khai <html lang="en"> tĩnh trong khi locale mặc định của trang là 'vi' → screen reader đọc UI tiếng Việt bằng giọng/tựa tiếng Anh.
- **Severity:** low — **Status:** verified
- **Evidence:** grep '<html' → personal-flashcards.html lang="en" (4 trang kề tra cứu: toeic-600, c1-vocabulary, phrasal-verbs đều lang="vi"); personal-flashcards.js:6 `let locale = localStorage.getItem('english101.p
- **Gợi ý sửa:** Cho applyLocale cập nhật documentElement.lang theo locale, hoặc đổi lang mặc định thành vi.
- **Nguồn:** đối chiếu hệ thống

## code (72 finding)

### 1. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:131 (nút được render tại :92; dữ liệu c3q20, c3q23 ở dòng 18)
- **What:** Nút 'Không dùng mạo từ (∅)' gây crash TypeError khi bấm trên 2 câu match c3q20 và c3q23: match không có ô nhập nhưng mã vẫn gán .value trên phần tử null, nút chết và bắn lỗi console.
- **Severity:** high — **Status:** verified
- **Evidence:** Đã tự xác nhận: parse JSON dòng 18 cho thấy đúng 5 câu không-mc chứa '∅' (c3q11 fill, c3q14 fill, c3q19 error, c3q20 match, c3q23 match); nhánh match :86–88 chỉ render nút lựa chọn nên không tồn tại p
- **Gợi ý sửa:** Dùng optional chaining (const inp = el(q.id+'-input'); if(inp) inp.value='∅';) hoặc ẩn nút zero cho type match.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 2. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:23–46 (progress store), :139–144 (Enter handler)
- **What:** Trang tự viết lại kho lưu tiến độ (sanitize/save/export/import) và xử lý Enter trong khi thư mục dùng chung đã có assets/learning/progress.js, keyboard.js, session.js; đây là đề xuất tái dùng, không phải yêu cầu migrate (invariant dự án: kh
- **Severity:** low — **Status:** verified
- **Evidence:** Tự chạy `ls assets/learning`: có progress.js, keyboard.js, session.js, persistence.js; trang định nghĩa KEY riêng :23 ('bi-kip-grammar-v2'), sanitize :28–42, keydown riêng :139–144; grep toàn file cho
- **Gợi ý sửa:** Ghi nhận như việc tái dùng khi có dịp bảo trì sâu; không migrate trong thay đổi nhỏ.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 3. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:43–46, :12, :29, :159
- **What:** Luồng tải trang gộp lỗi 'bản tiến độ hỏng JSON' vào lỗi storage (:44): cảnh báo sai 'Trình duyệt đang chặn lưu tiến độ' được bật rồi tắt ngay trong cùng lần chạy script tại :159 nên không bao giờ kịp hiển thị; hiệu ứng thực là bản tiến độ h
- **Severity:** low — **Status:** verified
- **Evidence:** ĐÃ CHỈNH so với bản gốc (bản gốc nói cảnh báo vẫn hiển thị — sai, vì save() cuối dòng :159 ẩn lại và ghi đè; đổi category copy→code cho khớp thực chất): :43 `let state=fresh(), storageOK=true`; :44 ca
- **Gợi ý sửa:** Phân biệt hai loại lỗi khi tải (hỏng dữ liệu → thông điệp đúng, giữ lại bản hỏng thay vì ghi đè) và hiển thị đúng nguyên nhân.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 4. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:63 (fold, dùng ở filterNav :64 và ô tìm kiếm :14)
- **What:** Ô tìm kiếm mục lục không tìm thấy được 3/18 chương có tiêu đề bắt đầu bằng 'Đ' hoa ('Đọc cấu trúc và phát hiện lỗi theo đoạn', 'Động từ chính, trợ động từ và linking verbs', 'Điều kiện, wish và modal verbs') vì fold() thay đ→d trước toLower
- **Severity:** low — **Status:** verified
- **Evidence:** Tự chạy đúng hàm fold của :63 bằng node: fold('Đảo ngữ')='đao ngu' trong khi fold('đảo ngữ')='dao ngu' — 'Đ' hoa đi qua replace(/đ/g,'d') trước khi xuống chữ thường; mô phỏng trên JSON dòng 18: gõ 'do
- **Gợi ý sửa:** Chuyển toLowerCase() lên trước replace(/đ/g,'d'), hoặc replace cả /đ/g và /Đ/g.
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 5. Grammar/conjunctions-theory-practice.html:52
- **What:** save() gọi localStorage.setItem không bọc try/catch: khi storage bị chặn (duyệt riêng tư), mỗi phím gõ ném lỗi console và checkSet chết ở save() trước progress() nên thanh tiến độ ngừng cập nhật, trong khi assets/learning/persistence.js đã
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại dòng 52: `function save(){localStorage.setItem('conjunction-progress',…)}` không try/catch, rồi `save();progress()` trong checkSet và trong listener 'input' — khớp; persistence.js:24-43 load()
- **Gợi ý sửa:** Bọc read/write storage trong try/catch (hoặc chuyển sang createPersistence của persistence.js) để lỗi lưu không làm chết vòng chấm bài.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 6. Grammar/conjunctions-theory-practice.html:29,52
- **What:** Nút 'Làm lại' của bài rút gọn gọi resetSet('compactQs') mà không xóa ô điểm compactScore, trong khi resetActive của phần mở rộng có xóa extendedScore — sau khi làm lại, điểm cũ vẫn treo hiển thị.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 52: resetSet chỉ xóa value/class/feedback của blank, không đụng ô điểm; `resetActive(){resetSet(active());document.getElementById('extendedScore').textContent=''}`; dòng 29: `onclick="res
- **Gợi ý sửa:** Truyền sid vào resetSet và xóa trong đó, giống cách resetActive làm.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 7. Grammar/conjunctions-theory-practice.html:52
- **What:** Tiến độ lưu mảng giá trị bám thứ tự DOM của toàn bộ 258 ô trống: thêm/bớt hay đổi thứ tự một câu là toàn bộ đáp án đã lưu bị gán lệch sang câu khác một cách âm thầm, vì key tuy ổn định nhưng không có schema/migration (persistence.js có sẵn
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 52: save() = `[...document.querySelectorAll('.blank')].map(e=>e.value)`; load() gán theo chỉ số `(e,i)=>e.value=a[i]||''`; đã đếm bằng node: 258 blanks (tôi chỉnh '~260' của giám định gốc
- **Gợi ý sửa:** Lưu theo khóa ổn định gắn với từng câu (id hoặc prompt) thay vì chỉ số DOM, qua createPersistence với schema cố định.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 8. Grammar/english-suffix-lab.html:933
- **What:** JSON.parse(localStorage 'suffixLabProgressV2') chạy top-level không bọc try/catch: một giá trị hỏng trong localStorage sẽ ném lỗi và giết cả khối script, làm toàn bộ nav/quiz/thi tê liệt (trang chỉ còn HTML tĩnh).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc lại: :933 `const state = JSON.parse(localStorage.getItem('suffixLabProgressV2') || '{...}')` không guard; dòng kế :935 `try{...JSON.parse(...'suffixLabKnownV1'...)}catch{knownSuffixIds=new Set(
- **Gợi ý sửa:** Bọc try/catch + fallback object giống :935, hoặc dùng assets/learning/persistence.js.
- **Nguồn:** Grammar/english-suffix-lab.html

### 9. Grammar/english-suffix-lab.html:633-1234,1014-1019,933-944
- **What:** Trang viết lại inline (~600 dòng script + 4 kho dữ liệu lớn) những hành vi mà assets/learning đã có sẵn và đã được 8 trang Vocabulary nạp dùng: keyboard dispatcher (kể cả guard IME), engine thẻ lật + trạng thái Known/Learning, lưu tiến độ l
- **Severity:** medium — **Status:** verified
- **Evidence:** Tự chạy grep -rl 'assets/learning/' Vocabulary/ → đúng 8 file (gồm toeic-600, c1-vocabulary, root-atlas); assets/learning/keyboard.js có resolveKeyboardAction + guard event.isComposing (:35) và assets
- **Gợi ý sửa:** Khi có dịp bảo trị trang này, chuyển sang assets/learning/keyboard.js + persistence.js (việc tách file là quyết định kiến trúc cần duyệt riê
- **Nguồn:** Grammar/english-suffix-lab.html

### 10. Grammar/prepositions-theory-practice.html:69
- **What:** Chấm bài lần thứ hai trở đi bị chồng lặp feedback: verdict mới (cả nhánh ✓ lẫn ✗) được ghép thêm vào textContent cũ nên chuỗi kết quả lặp chồng mỗi lần bấm Chấm bài/Làm lại mà không reload.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 69: `f.innerHTML=verdict+(f.textContent?` — ${f.textContent}`:'')` — sau lần chấm đầu textContent đã chứa verdict cũ; resetSet (dòng 71) chỉ `classList.remove('show')`, không xoá text. Truy vết c
- **Gợi ý sửa:** Lưu text giải thích gốc (ví dụ vào data-attribute khi render) và luôn dựng lại feedback từ nguồn gốc thay vì nối tiếp textContent.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 11. Grammar/prepositions-theory-practice.html:76
- **What:** Tiến độ lưu theo vị trí tuyệt đối: save() ghi mảng giá trị của 308 chỗ trống (51 rút gọn + 257 mở rộng) theo thứ tự DOM, không có định danh câu hay phiên bản; mọi lần chèn/xáo trộn nội dung sau này sẽ ánh xạ nhầm đáp án cũ vào câu khác mà k
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 76: `localStorage.setItem('prep-progress',JSON.stringify(vals))` với `vals=[...document.querySelectorAll('.blank')].map(e=>e.value)`; load(): `e.value=v[i]||''`. awk đếm blank: dòng 46=51 (48 câu
- **Gợi ý sửa:** Lưu kèm chỉ mục câu + số chỗ trống hoặc hash câu hỏi để phát hiện lệch và bỏ qua dữ liệu cũ khi không khớp.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 12. Grammar/prepositions-theory-practice.html:75
- **What:** Kiểm tra hình thức cho kết quả sai khi giới từ mục tiêu đứng ở đầu/cuối câu: checkWriting chỉ tra `includes(' '+needle+' ')` nên câu như "This list is subject to." (to + dấu chấm) bị báo "Chưa thấy giới từ mục tiêu trong câu" dù giới từ có
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 75: `let good=e.value.toLowerCase().includes(' '+e.dataset.needle+' ')` — không chuẩn hoá dấu câu biên, không xử lý vị trí đầu/cuối chuỗi.
- **Gợi ý sửa:** Chuẩn hoá dấu câu hai biên câu trước khi tra (ví dụ replace(/[.,!?;:]/g,' ') rồi includes(' '+needle+' ')).
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 13. Grammar/same-word-different-parts-of-speech.html:61
- **What:** Bộ lọc thư viện từ bỏ sót đúng 2 mục từ khi chọn nhãn Determiner: one và the không hiện vì so khớp includes('Determiner') phân biệt hoa-thường trong khi type của chúng là 'Numeral / determiner' (:40) và 'Mạo từ xác định / determiner' (:51).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy node /tmp/posaudit/check.js tái hiện logic :61 (x.u.some(y=>y.type.includes(active))): tập từ bị sót khi so khớp 'Determiner' hoa-thường so với toLowerCase() chênh nhau đúng {one, the}; hai ty
- **Gợi ý sửa:** So khớp lowercase cả hai vế hoặc chuẩn hóa type về nhãn gốc ngay trong dữ liệu.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 14. Grammar/same-word-different-parts-of-speech.html:63
- **What:** save() gọi localStorage.setItem không bọc try/catch — khi storage bị chặn (private mode/hardened browser), exception ngắt progress() đứng ngay sau nó trong change-listener và checkActive, khiến thanh tiến độ không cập nhật dù đã chấm xong.
- **Severity:** low — **Status:** verified
- **Evidence:** :63 'function save(){localStorage.setItem(…)}' không try/catch, được gọi ngay trước progress() trong checkActive, revealActive, resetActive và change-listener 'save();progress()'; load() cùng dòng lại
- **Gợi ý sửa:** Bọc setItem bằng try/catch và hiển thị trạng thái không-lưu-được thay vì im lặng.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 15. Grammar/same-word-different-parts-of-speech.html:63
- **What:** Khóa 'pos-progress' lưu mảng giá trị select theo đúng vị trí index của cả 2 bộ quiz (30 + 164 = 194 câu) mà không có version/hash nội dung — đổi thứ tự hoặc thêm câu trong words sẽ map nhầm câu trả lời đã lưu của người học.
- **Severity:** low — **Status:** verified
- **Evidence:** :63 save(){…querySelectorAll('.choice').map(x=>x.value)} + load() gán x.value=a[i] theo index. Đã chạy node: short=30, full=164 câu. ĐÃ CHỈNH: '30 + ~134' sai — tổng thực là 30+164=194. Đã chạy grep -
- **Gợi ý sửa:** Tách khóa theo bộ quiz kèm version (ví dụ pos-progress.v1.short) hoặc hash số câu để vô hiệu hóa dữ liệu cũ khi nội dung đổi.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 16. Grammar/same-word-different-parts-of-speech.html:63
- **What:** Toàn bộ JS (3.788 ký tự) và CSS (4.638 ký tự) viết dạng một dòng duy nhất không format trong khối inline khổng lồ — khó review/diff và chính các chuỗi selector/data-answer/data-note lồng nhau khó kiểm tra.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy awk '{print NR": "length($0)}' trên file: dòng 2 = 4638 ký tự (CSS), dòng 63 = 3788 ký tự (JS), file 67 dòng — khớp chính xác con số của finding.
- **Gợi ý sửa:** Format script/style thành khối đọc được; giữ inline nếu muốn lesson tự trọn, không bắt buộc tách file.
- **Nguồn:** Grammar/same-word-different-parts-of-speech.html

### 17. Grammar/tense-exercises-answer-key-quiz.html:216
- **What:** Handler Enter tự viết (dòng 216–225) trùng hợp đồng với dispatcher dùng chung assets/learning/keyboard.js (resolveKeyboardAction đã có guard IME/repeat/textarea và luồng SUBMIT→NEXT), trong khi trang không hề nạp module dùng chung này.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 216–225 tự addEventListener('keydown'). ĐÃ CHỈNH evidence: bản gốc dẫn "keyboard.js:9-31" — resolveKeyboardAction thực nằm ở assets/learning/keyboard.js:8-26 (guard composing/repeat dòng 10, text
- **Gợi ý sửa:** Khi có dịp chạm vào trang, cân nhắc nối vào dispatcher English101Learning; hiện chưa phải lỗi vận hành.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 18. Grammar/tense-exercises-answer-key-quiz.html:167
- **What:** localStorage.setItem trong recordHistory không được bọc try/catch; trong môi trường chặn storage, nút "Kiểm tra" sẽ ném lỗi trước khi showStored chạy nên feedback không bao giờ hiện.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 167: localStorage.setItem('tenseQuizHistoryV1',JSON.stringify(history));updateHistoryStats(); — không try/catch; chiều đọc dòng 157 có guard. Trong #check (dòng 208) recordHistory chạy TRƯỚC show
- **Gợi ý sửa:** Bọc setItem trong try/catch giống chiều đọc để việc chấm bài vẫn chạy khi storage bị chặn.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 19. Grammar/tense-exercises-answer-key-quiz.html:119
- **What:** Toàn bộ META + 198 câu nhét trong đúng một dòng dài 41.122 ký tự và toàn bộ CSS/JS nội tuyến (file 80KB), khiến sửa nội dung và review diff rất khó.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy: awk 'NR==119{print length($0)}' → 41122; wc -lc → 230 dòng, 80368 bytes. CSS nội tuyến dòng 7–37, JS nội tuyến dòng 118–227; script ngoài duy nhất là ../assets/ui/animation.js (dòng 228) và a
- **Gợi ý sửa:** Lần tới chỉnh nội dung, tách BANK/META ra file JS riêng kèm ?v= cache-bust; hiện trạng một-file vẫn hợp quy tắc "một consumer giữ local".
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 20. Verb/english-verbs.html:289
- **What:** verb-groups.js được nạp không có ?v= cache-bust trong khi hai script dùng chung ngay phía trên đều có — sau khi cập nhật dữ liệu nhóm động từ, trình duyệt có thể vẫn phục vụ bản cũ.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 287: `keyboard-pronunciation.js?v=20260922-voices`; dòng 288: `media-helper.js?v=20260916-p2`; dòng 289: `<script src="../assets/learning/verb-groups.js"></script>` — không có ?v=.
- **Gợi ý sửa:** Thêm hậu tố ?v=<ngày> giống hai file dùng chung kia.
- **Nguồn:** Verb/english-verbs.html

### 21. Verb/five-forms-of-verbs-with-3rd-person.html:322,287
- **What:** Tự viết lại keyboard handler (Enter quiz dòng 322; Enter/Space thẻ lật dòng 287, đều có guard isComposing) trong khi assets/learning/keyboard.js đã có resolveKeyboardAction/createKeyboardDispatcher (Enter→SUBMIT/NEXT, flashcard REVEAL/NEXT,
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 322: ['a1'..'a5'].forEach(…addEventListener('keydown',…e.key==='Enter'&&!e.isComposing…)) viết tay; dòng 287: $('#verbGrid').addEventListener('keydown',…Enter||Space…&&!e.isComposing…) viết tay.
- **Gợi ý sửa:** Refactor sang keyboard dispatcher dùng chung khi có dịp chỉnh sửa (L2), giữ nguyên hành vi hiện tại.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 22. Verb/five-forms-of-verbs-with-3rd-person.html:12,32,40,46
- **What:** CSS nội tuyến đè trùng và khai báo chết khó bảo trì: :root định nghĩa 2 lần (12, 32 — bộ giá trị đầu thành dead), selector định nghĩa lại 2 lần (.lab-pick 40→46, .step 44→48-51, .job 45→52, .verb-card 56→58, .mini-forms 56→75), media query
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc trực tiếp từng cặp dòng trên — tất cả khớp; @media(max-width:440px){.forms{grid-template-columns:1fr}} xuất hiện y hệt ở dòng 30 và 85. grep 'Fraunces' toàn trang → chỉ dòng 56, không @font-face/l
- **Gợi ý sửa:** Gộp về một lớp token duy nhất, xoá khai báo bị đè và tham chiếu Fraunces.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 23. Verb/five-forms-of-verbs-with-3rd-person.html:171
- **What:** Toàn bộ dataset 462 động từ (~76.137 ký tự) nằm inline trong <script> trên một dòng duy nhất, parser-blocking và không thể cache giữa các lần mở — khối script nội tuyến khổng lồ đúng tiêu chí cần flag.
- **Severity:** low — **Status:** verified
- **Evidence:** awk 'NR==171{print length($0)}' → 76137; substr đầu/cuối dòng 171 xác nhận const DATA=[…462 phần tử…]; node parse được 462 mục từ chính dòng đó; khối script nội tuyến nằm ngay sau <script src="../asse
- **Gợi ý sửa:** Tách DATA ra file JS riêng có cache-bust ?v= như media-helper.js (?v=20260916-p2) khi chạm lại trang (L2).
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 24. Verb/paraphrase-80-flashcards.html:356-360,396,403,414,426,434,439
- **What:** Tích hợp createLearningSession chỉ mang hình thức: createFlashSession() được gọi lại sau mỗi next/prev/shuffle nên attempts/ratings của session dùng chung bị vứt ngay lập tức; session luôn start ở index 0 trong khi trang hiển thị deck[idx],
- **Severity:** medium — **Status:** verified
- **Evidence:** Trace tĩnh đã kiểm: createFlashSession() gọi tại 351 (rebuildDeck), 396 (next), 403 (prev), 414 (shuffle) — session mới vứt attempts/ratings vừa ghi; createLearningSession gọi KHÔNG có initialState (3
- **Gợi ý sửa:** Đồng bộ index khi tạo session (truyền initialState.index hoặc tạo session một lần và dispatch NEXT/PREVIOUS thay vì tạo lại), và xử lý RATE_
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 25. Verb/paraphrase-80-flashcards.html:346-354,367-372
- **What:** Trạng thái rỗng dead-code kèm đường crash tiềm ẩn: render() có nhánh 'Hết thẻ' (367-372) nhưng rebuildDeck() gọi createFlashSession() TRƯỚC render() (351-353), mà session.js:18 throw TypeError nếu entries rỗng — nếu một ngày deck rỗng, scri
- **Severity:** low — **Status:** verified
- **Evidence:** rebuildDeck (346-354) gọi createFlashSession() ở dòng 351 TRƯỚC render() dòng 353; session.js:18 đúng là 'if (!Array.isArray(entries) || entries.length === 0) throw new TypeError('entries must be a no
- **Gợi ý sửa:** Chỉ tạo session khi deck.length>0 (guard trước khi gọi) để nhánh 'Hết thẻ' trong render() thật sự tới được.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 26. Verb/phrasal-verbs.html:478-482, 529, 536, 547, 562-571
- **What:** flashSession bị tạo mới lại ở mỗi lần chuyển thẻ (next/prev/shuffle/rebuild đều gọi createFlashSession) nên mọi dispatch REVEAL/RATE/NEXT chỉ ghi vào session rồi bị vứt — attempts/ratings không bao giờ được đọc, abstraction dùng hình thức.
- **Severity:** low — **Status:** verified
- **Evidence:** createFlashSession() gọi lại ở 473 (rebuildDeck), 529 (next), 536 (prev), 547 (shuffle), 692 (init); grep trang: không có lần đọc .attempts/.ratings nào (exit 1). Snapshot trả về từ dispatch ở flip (5
- **Gợi ý sửa:** Tạo một session cho cả deck và chỉ tạo lại khi đổi phạm vi, hoặc bỏ flashSession nếu không dùng state của nó.
- **Nguồn:** Verb/phrasal-verbs.html

### 27. Vocabulary/c1-vocabulary.js:59-67,443,464
- **What:** Trang tự viết lại speak() với en-GB cứng (rate .84) thay vì dùng EnglishPronunciation.speak của module đã nạp, nên nút ▶/🔊 trong trang bỏ qua giọng đọc người dùng đã lưu (chọn "Anh–Mỹ" vẫn bị đọc Anh–Anh); handler Enter và loadState/persis
- **Severity:** medium — **Status:** verified
- **Evidence:** js:64 `utterance.lang = 'en-GB'`, js:65 rate .84; nút gọi speak() cục bộ tại js:443 (data-speak) và js:464 (listen/feedbackListen). keyboard-pronunciation.js:154-166 speak() dùng `state.preferences.ac
- **Gợi ý sửa:** Gọi window.EnglishPronunciation.speak(baseWord(...)) thay cho speak() cục bộ; các phần còn lại ghi nhận như đề xuất tái sử dụng khi có duyệt
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 28. Vocabulary/c1-vocabulary.css:87-90
- **What:** Khối CSS "Flashcard glass" (gradient + sheen) là mã chết: không JS/HTML nào gắn class `flash-card` nên hiệu ứng không bao giờ hiển thị, dù CSS đã tăng bản đồ cache "?v=20261029-glass-1".
- **Severity:** low — **Status:** verified
- **Evidence:** grep -c "flash-card" Vocabulary/c1-vocabulary.js → 0 và Vocabulary/c1-vocabulary.html → 0. Thẻ câu hỏi (html:46) chỉ có class "question-card"; cache-bust "?v=20261029-glass-1" tại html:8 — tên bản đồ
- **Gợi ý sửa:** Hoặc gắn class flash-card khi mở phiên luyện trong JS, hoặc xóa khối CSS này.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 29. Vocabulary/c1-vocabulary.js:174-185
- **What:** Bộ đếm giờ mỗi giây gọi saveQuizSession → persist ghi toàn bộ state vào localStorage và updateStats viết lại 4 số thống kê trong mỗi tick, dù duy nhất biến elapsed tăng 1 và không có tương tác nào của người học.
- **Severity:** low — **Status:** verified
- **Evidence:** js:184 `saveQuizSession()` nằm trong setInterval 1000ms (js:174-185; guard js:175 chỉ bỏ tick khi ẩn/đã chấm); persist() (js:41-44) luôn setItem + updateStats mỗi lần gọi, updateStats (js:112-117) viế
- **Gợi ý sửa:** Chỉ lưu phiên khi có sự kiện (chấm câu, gợi ý, tạm dừng) và tách updateStats khỏi persist.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 30. Vocabulary/confusing-words.html:11-24 vs 421-425
- **What:** Hai :root và hai theme hoàn chỉnh chồng nhau trong cùng khối <style> (dòng 10-537): :root khai báo 2 lần (:11 và :421) với đủ 12 token khác giá trị; theme "Navy–thép" (:421-536) ghi đè màu/font của 15+ selector theme "giấy/ink" (vd header.t
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :11 và :421 (2 :root, 12 token đều được khai báo lại), :437/:480/:496-497 ghi đè font-family; <style> :10-537. ĐÃ CHỈNH so với bản gốc: không phải toàn bộ ~410 dòng "chết" — các khai báo layout/pa
- **Gợi ý sửa:** Xóa bỏ theme 1 đã chết, giữ một bộ token duy nhất trong trang.
- **Nguồn:** Vocabulary/confusing-words.html

### 31. Vocabulary/confusing-words.html:9
- **What:** Nạp webfont Fraunces 4 phân loại (400/600/700/italic 500) nhưng cả 5 chỗ khai báo font-family:'Fraunces' đều bị theme 2 override sang IBM Plex Sans → webfont chết, tải vô ích mỗi lần mở trang.
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -n Fraunces (đã chạy): đúng link :9 + 5 rule chết :65,:153,:218,:338,:395; cả 5 bị đè bởi 'IBM Plex Sans' tại :437 (header.top h1), :480 (.card-head h3), :496 (.setup h2,.prompt-main,.end-card .s
- **Gợi ý sửa:** Bỏ Fraunces khỏi Google Fonts link và khỏi các rule đã chết.
- **Nguồn:** Vocabulary/confusing-words.html

### 32. Vocabulary/confusing-words.html:1568-1748
- **What:** Tự viết lại toàn bộ engine quiz (shuffle, chấm, feedback, phím Enter) trong khi assets/learning đã có session.js/progress.js/keyboard.js/persistence.js cho đúng loại hành vi này (đúng bất biến AGENTS.md về tái sử dụng shared implementation)
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :1568 shuffle, :1639 checkAnswer; grep localStorage toàn trang = 0 (đã chạy). ĐÃ CHỈNH dòng tham chiếu: createLearningSession ở assets/learning/session.js:17 (bản gốc ghi :24) và resolveKeyboardAc
- **Gợi ý sửa:** Trong một đợt L2 riêng, chuyển sang shared session/keyboard module; tối thiểu lưu kết quả bằng persistence.js với key ổn định.
- **Nguồn:** Vocabulary/confusing-words.html

### 33. Vocabulary/confusing-words.html:1434,1440-1442
- **What:** Nội dung catalogue (tên nhóm, từ, nghĩa, mẹo, đáp án) chèn thẳng innerHTML không qua escapeHTML — vi phạm hợp đồng AGENTS.md "Escape catalogue-derived text before injecting it into HTML"; dữ liệu hiện tại là cục bộ nên rủi ro thấp.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc :1434 head.innerHTML = `<h3>${g.t}</h3>…` và :1439-1443 ghép ${w.w}/${w.vi}/${w.en}/${w.viEx}; cùng lớp lỗi ở :1449 (tip), :1454 (libStatus), :1629/:1634 (promptEx), :1703 (missed-list); grep esca
- **Gợi ý sửa:** Thêm escapeHTML cho mọi giá trị dữ liệu trước khi ghép chuỗi innerHTML.
- **Nguồn:** Vocabulary/confusing-words.html

### 34. Vocabulary/ielts-collocations-topic-table-with-dictation.html:217-375
- **What:** Toàn bộ khối <script> inline (~159 dòng, gồm một bản quiz + render bảng riêng biệt) bị bọc trong if(false){...} thành code chết — không thực thi gì; hành vi thật nằm ở ielts-c1-c2-modern.js. Bản chết còn chứa handler Enter cũ KHÔNG có guard
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện: dòng 217 `if(false){` … dòng 375 `}` đóng, `</script>` ở 376, script thật nạp ở 382 `ielts-c1-c2-modern.js?v=20260915-shared-runtime`; 159 dòng = 217→375. Quét khối chết thấy bản copy đầy
- **Gợi ý sửa:** Xoá nguyên khối script chết (giữ DATA/TOPICS ở dòng 215-216 vì JS thật dùng chung) để trang còn 1 nguồn sự thật cho logic quiz.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 35. Vocabulary/ielts-collocations-topic-table-with-dictation.html:7-88
- **What:** Hai hệ style cạnh tranh trong 1 trang: <style> inline (html:7-87 — cream/navy bo tròn, gradient hero + bóng dày 0 12px 30px, font Inter/Cambria) bị ielts-collocations-modern.css nạp sau (html:88) phủ bằng 210 khai báo !important trên 49 dòn
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã tái hiện: html:16 `background:linear-gradient(135deg,var(--navy),var(--navy2));box-shadow:0 12px 30px` vs modern.css:8 `background:var(--modern-navy)!important;…box-shadow:none!important;border-rad
- **Gợi ý sửa:** Gỡ các rule inline đã bị đè hết (hero, bảng, font) hoặc chuyển trang sang chỉ dùng 1 stylesheet, giữ 1 hệ breakpoint.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 36. Vocabulary/ielts-c1-c2-modern.js:66
- **What:** Trong lúc làm bài, snapshot() ghi localStorage mỗi 1 giây qua setInterval — JSON.stringify toàn bộ deck/wrong mỗi giây gây churn liên tục, còn tiến độ thực chỉ cần lưu ở các mốc (grade/next/pause). CHỈNH: khi tab ẩn hoặc đã trả lời thì tick
- **Severity:** low — **Status:** verified
- **Evidence:** js:66 `timer=setInterval(()=>{if(document.hidden||answered)return;elapsed++;…;snapshot()},1000)` — tick visible không answered → snapshot() (js:58) → save() (js:17) → persistence.commit(state) mỗi giâ
- **Gợi ý sửa:** Chỉ snapshot khi có sự kiện trạng thái (grade/next/pause/visibilitychange) và debounce ghi giây-timer, hoặc lưu left/elapsed riêng nhỏ hơn.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 37. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:916
- **What:** ~249 dòng logic flashcard+chính tả cũ nằm trong block `if(false){…}` (đóng ở dòng 1164) — mã chết ship kèm trang, trùng lặp về chức năng với ielts-hiking-modern.js và đã lệch chuẩn (dNorm riêng ở :1034, Enter không xử lý IME ở :1155-1160, a
- **Severity:** medium — **Status:** verified
- **Evidence:** html:916 `if(false){` … html:1164 `}` = đúng 249 dòng (916-1164); DATA (:226) và UNIT_TITLES (:893-913), ALL_UNITS (:914) nằm NGOÀI block; bên trong có dNorm :1034, alert() :1052, Enter handler không
- **Gợi ý sửa:** Xóa block if(false) (DATA và UNIT_TITLES ở ngoài cần giữ lại) — runtime sống nằm ở ielts-hiking-modern.js.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 38. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:1167
- **What:** 6 file tĩnh dùng chung nạp không có cache-bust ?v= trong khi các file kế bên đều có — tokens.css, primitives.css (dòng 3) và progress.js, persistence.js, session.js, keyboard.js (1167-1170) có thể bị cache cũ sau khi cập nhật.
- **Severity:** low — **Status:** verified
- **Evidence:** html:1166 keyboard-pronunciation.js?v=20260922-voices và html:1171 ielts-hiking-modern.js?v=20260915-shared-runtime có ?v=; 4 script assets/learning (:1167-1170) và 2 CSS (html:3: tokens.css, primitiv
- **Gợi ý sửa:** Thêm ?v=<build-date> cho cả 6 file dùng chung, đồng bộ phiên bản như các file lân cận.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 39. Vocabulary/root-atlas.html:1,3
- **What:** 8/9 tài nguyên tĩnh nạp không có tham số ?v= cache-bust (favicon, tokens.css, primitives.css, progress/persistence/session/keyboard/dialog/router.js), chỉ keyboard-pronunciation.js có ?v=20260922-voices — GitHub Pages cache có thể giữ bản c
- **Severity:** low — **Status:** verified
- **Evidence:** grep src/href toàn file: favicon.svg, ../assets/styles/tokens.css, primitives.css và 6 script (progress/persistence/session/keyboard/dialog/router.js) đều không query; chỉ :41 `../assets/keyboard-pron
- **Gợi ý sửa:** Thêm ?v=<ngày> thống nhất cho tất cả tài nguyên tĩnh của trang.
- **Nguồn:** Vocabulary/root-atlas.html

### 40. Vocabulary/root-atlas.html:3
- **What:** Nạp assets/ui/dialog.js nhưng trang không có phần tử <dialog> và không gọi createDialogController/showModal ở đâu cả — tải script dùng chung thừa.
- **Severity:** low — **Status:** verified
- **Evidence:** root-atlas.html:3 `<script src="../assets/ui/dialog.js"></script>`; grep 'createDialogController|showModal' toàn file = 0; các gọi namespace chỉ là createPersistence/createLearningSession/createKeyboa
- **Gợi ý sửa:** Bỏ thẻ script dialog.js khỏi trang này (giữ cho trang nào thật sự dùng).
- **Nguồn:** Vocabulary/root-atlas.html

### 41. Vocabulary/toeic-600.js:269 (open call) vs assets/learning/media-helper.js:34-39
- **What:** Nút media trên thẻ chỉ truyền {word} vào English101Media.open nên bỏ qua media.imageQuery và collocations mà dataset đã xây (ví dụ 'volunteer Pharmacy business context') — panel tra cứu chỉ tìm ảnh theo từ trần, mất ngữ cảnh chủ đề; logic h
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã xác minh: toeic-600.js:269 "open({word: entry.word, media: true})" — media là boolean nên resolveMediaEntry thấy media={} (media-helper.js:33); helper đọc entry.query/media.query/collocations/topic
- **Gợi ý sửa:** Truyền cả entry.media và entry.collocations vào open() để resolveMediaEntry dùng imageQuery có sẵn.
- **Nguồn:** Vocabulary/toeic-600.html

### 42. Vocabulary/toeic-600.html:71-79 (so với :9-11)
- **What:** Trang tự đánh cache-bust cho CSS và 2 JS (keyboard-pronunciation.js?v=20260922-voices, media-helper.js?v=20260916) nhưng bỏ qua file của chính trang toeic-600.js và data/vocabulary/toeic-600.js — không nhất quán, rủi ro trình duyệt chạy bản
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh: toeic-600.html:75 keyboard-pronunciation.js?v=20260922-voices, :77 media-helper.js?v=20260916, :9-11 cả 3 CSS có ?v=; :71-74 (progress/session/persistence/keyboard), :76 router.js, :78 da
- **Gợi ý sửa:** Thêm ?v= nhất quán cho 2 file JS thuộc trang (hoặc bỏ hẳn để dựa vào cache header của host).
- **Nguồn:** Vocabulary/toeic-600.html

### 43. Vocabulary/toeic-600.js:11,23,206
- **What:** state.best được tính và commit vào localStorage mỗi khi hoàn thành phiên luyện nhưng không có bất kỳ chỗ nào hiển thị — dữ liệu chết, ngầm hứa 'điểm tốt nhất' mà UI không trả lại cho học viên.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh: grep -n 'best' toeic-600.js trả đúng 3 dòng :11 (defaults), :23 (sanitize), :206 (set) — không có dòng nào đọc best để render (đã chạy lệnh trong phiên này).
- **Gợi ý sửa:** Hiển thị best trong qend hoặc dashboard, hoặc bỏ khỏi schema nếu không dùng.
- **Nguồn:** Vocabulary/toeic-600.html

### 44. Vocabulary/vocabulary-atlas.html:65,72 + assets/keyboard-pronunciation.js:4 + Vocabulary/ielts-vocabulary-focus.js:94-95
- **What:** Ba cấu hình giọng đọc song song và lệch nhau trên cùng một trang: speak() của trang dùng state.settings.accent/rate (cài ở tab Hướng dẫn — vốn bị skin ẩn), EnglishPronunciation dùng khóa riêng 'english101.pronunciation.v1' kèm chọn giới tín
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc lại khớp: vocabulary-atlas.html:65 `u.lang=state.settings.accent;u.rate=state.settings.rate` (cài tại tab Hướng dẫn :72); keyboard-pronunciation.js:4 `STORAGE_KEY='english101.pronunciation.v1'` kè
- **Gợi ý sửa:** Cho speak() và auto-pronounce đi qua một nguồn cấu hình duy nhất (EnglishPronunciation.register đã nhận lang/rate) và bỏ UI cài giọng trùng.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 45. Vocabulary/vocabulary-atlas.html:1,5,6,90
- **What:** Cache-bust không nhất quán: media-helper.css/js có '?v=20260916-p2' nhưng tokens.css, primitives.css, ielts-vocabulary-focus.css và ielts-vocabulary-focus.js (các file skin chịu sửa gần đây) không có tham số phiên bản.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại khớp: vocabulary-atlas.html:1 media-helper.css?v=20260916-p2 đứng cạnh tokens.css/primitives.css không ?v=; :5 ielts-vocabulary-focus.css không ?v=; :6 media-helper.js?v=20260916-p2; :90 ielts
- **Gợi ý sửa:** Thêm ?v= theo mốc phát hành cho 4 file còn lại, tối thiểu là cặp ielts-vocabulary-focus.css/js.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 46. Vocabulary/vocabulary-atlas.html:32
- **What:** URL kiểm chứng d.checkedURL được nối thẳng vào href="${d.checkedURL}" không qua esc() trong khi mọi trường dữ liệu khác đều escape — dữ liệu nội bộ nên rủi ro thấp, nhưng một dấu nháy trong dữ liệu sẽ vỡ thuộc tính href.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại khớp: :32 `<a href="${d.checkedURL}" target="_blank" rel="noopener">` không qua esc(). Tự chạy node kiểm tra lại: 4/966 mục có checkedURL — advocate, attribute, at variance, benefactive — đều
- **Gợi ý sửa:** Bọc esc(d.checkedURL) và cân nhắc chỉ chấp nhận href bắt đầu bằng https://.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 47. assets/learning/vocabulary-rounds-app.js:94
- **What:** getContext() gọi q() khi state.session là null, nên mọi lần nhấn phím trên trang (kể cả gõ ô tìm kiếm, textarea ghi chú trong dialog) đều ném TypeError 'Cannot read properties of null (reading q)' trong console.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tôi đọc trực tiếp: app:39 'function q(){return state.session.q}' không guard; app:94 'answered:q()?.answered,' và app:95 'revealed:q()?.revealed,' — '?.' chỉ bảo vệ sau khi q() trả về, còn q() ném nga
- **Gợi ý sửa:** Đổi thành 'answered:state.session?.q?.answered' và 'revealed:state.session?.q?.revealed' như dòng kind đã làm (app:93).
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 48. Vocabulary/vocabulary-practice.html:1
- **What:** Thiếu cache-bust ?v= cho hầu hết file tĩnh: chỉ media-helper.css/js có ?v=20260916-p2; tokens/primitives/learning.css, ielts-vocabulary-focus.css, 6 script dùng chung, bootstrap, app và 4 file dữ liệu (tổng ~8,2MB) đều không version — sau k
- **Severity:** medium — **Status:** verified
- **Evidence:** HTML:1-5 chỉ media-helper.css có ?v=20260916-p2; 6 script dùng chung progress/persistence/session/keyboard/dialog/router (HTML:6-11) không version; bootstrap:20,25,38,77,81 loadScript không version (d
- **Gợi ý sửa:** Gắn ?v= cùng quy ước media-helper cho các file này, ưu tiên vocabulary-rounds-app.js và data/vocabulary/*.js.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 49. assets/learning/vocabulary-rounds-app.js:46
- **What:** App dùng chung cho 4 set nhúng case riêng cho một từ cụ thể 'wind': đổi dòng gợi ý nghĩa theo pos (app:46) và đọc cả câu ví dụ thay vì từ khi bấm nghe (app:77) — dữ liệu bài học nằm trong UI logic dùng chung, sẽ sai nếu set khác có 'wind' v
- **Severity:** low — **Status:** verified
- **Evidence:** app:46 "d.w==='wind'?(d.pos==='n'?'chuyển động của không khí':'hành động uốn/cuộn'):…" (bản gốc chép 'uốn/cuốn' — đã sửa theo nguyên văn code); app:77 "speak(d.w==='wind'?d.ex:d.w)".
- **Gợi ý sửa:** Chuyển quy tắc thành trường dữ liệu trong dataset (ví dụ d.speakText, d.senseHint) thay vì if theo từ trong app.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 50. Vocabulary/vocabulary-reading-translation-v1-6.html:104-107
- **What:** Tab 'Phủ kín toàn bộ Vòng 1–6' luôn kết thúc ở hộp lỗi: trang nạp 3 file Vòng qua iframe ẩn rồi eval('CATEGORIES'), nhưng cả 3 file đó hiện chỉ là stub chuyển hướng và CATEGORIES không được định nghĩa ở bất kỳ đâu trong repo, nên toàn bộ lu
- **Severity:** high — **Status:** verified
- **Evidence:** grep -rn 'CATEGORIES *=' --include=*.js --include=*.html toàn repo → 0 kết quả; grep -rln 'CATEGORIES' (loại .git/.serena) → chỉ chính trang này; cat 3 file vong-*-vocabulary-complete-examples.html:6
- **Gợi ý sửa:** Nạp dữ liệu từ nguồn thật của runtime vocabulary-practice (data/vocabulary/vong-1-2.js… vong-5-6.js thay vì HTML stub), bỏ cơ chế iframe+eva
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 51. Vocabulary/vocabulary-reading-translation-v1-6.html:10
- **What:** 3 khai báo font shorthand 'font:700 13px inherit', 'font:14px inherit', 'font:15px/1.6 inherit' vô hiệu theo spec CSS (CSS-wide keyword không được dùng làm thành phần của shorthand) nên bị trình duyệt bỏ — nút/chip/mode-btn mất cỡ 13px/700
- **Severity:** medium — **Status:** verified
- **Evidence:** grep -o 'font:[^;}]*inherit' → đúng 3 khớp: 'font:700 13px inherit' (.chip,.btn,.mode-btn), 'font:14px inherit' (.search — cũng dính các select coverage :24), 'font:15px/1.6 inherit' (.textarea); text
- **Gợi ý sửa:** Tách 'font: inherit' riêng rồi khai báo font-size/line-height/weight như thuộc tính thường.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 52. Vocabulary/vocabulary-reading-translation-v1-6.html:406,412,417,419
- **What:** Dữ liệu catalogue-derived của track coverage (x.word/ipa/pos/meaning, prompt, đáp án, x.example) được innerHTML thẳng không qua escape, trái hợp đồng 'Escape catalogue-derived text before injecting it into HTML' của AGENTS.md — trang có sẵn
- **Severity:** low — **Status:** verified
- **Evidence:** :412 '<b>${x.word}</b> <span>/${x.ipa}/ · ${x.pos}</span><br>${x.meaning}' raw; :417 '<div class="coverage-prompt">${prompt}</div>' raw (prompt = x.word/x.meaning/clozeCoverage(x)); :419 'Đáp án: <b>$
- **Gợi ý sửa:** Bọc mọi chuỗi lấy từ file Vòng 1–6 qua safeHTML trước khi nối vào template.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 53. Vocabulary/vocabulary-reading-translation-v1-6.html:103,425-426
- **What:** speak() viết riêng cả chu trình speechSynthesis trong khi trang tự nạp assets/keyboard-pronunciation.js (:425) vốn đã cung cấp EnglishPronunciation.speak xử lý cancel, chọn voice theo accent/gender người dùng — hành vi TTS trùng lặp và nút
- **Severity:** low — **Status:** verified
- **Evidence:** :103 'const u=new SpeechSynthesisUtterance(text);u.lang=\'en-GB\';u.rate=.9' hard-code; assets/keyboard-pronunciation.js:154 'function speak(text, options = {})' với :157 speechSynthesis.cancel(), :16
- **Gợi ý sửa:** Gọi EnglishPronunciation.speak(text) cho nút nghe passage thay vì dựng utterance thủ công.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 54. Vocabulary/vocabulary-reading-translation-v1-6.html:90,95,102
- **What:** Tiến độ 12 bài lưu dạng chỉ số mảng (markDone(i) ghi số i vào 'reading-translation-v1-6-completed'): thêm/biến đổi thứ tự LESSONS sẽ âm thầm làm sai lệch bài '✓ Đã học' của người dùng đã lưu, trái nguyên tắc giữ progress ổn định của CONTEXT
- **Severity:** low — **Status:** verified
- **Evidence:** :90 "completed=new Set(JSON.parse(localStorage.getItem('reading-translation-v1-6-completed')||'[]'))"; :95 '${completed.has(i)?…"✓ Đã học"…}'; :102 'function markDone(i){completed.add(i);localStorage.
- **Gợi ý sửa:** Lưu khóa ổn định theo bài (vd title/slug) thay vì index mảng.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 55. Vocabulary/vocabulary-practice.html:1-4 (+ assets/learning/vocabulary-rounds-bootstrap.js:20,77,81)
- **What:** Toàn bộ CSS/JS/data tĩnh của chuỗi redirect nạp không có ?v= cache-bust — 4 CSS (practice:1-4), 7 script tĩnh trong practice:6-13 và 3 file nạp bằng loadScript (dataset, app, focus js) — trong khi media-helper (practice:5,12) có ?v=20260916
- **Severity:** low — **Status:** verified
- **Evidence:** practice:1-4 tokens/primitives/learning/ielts-vocabulary-focus.css không ?v=; practice:6-13 progress/persistence/session/keyboard/dialog/router/bootstrap.js không ?v=; bootstrap:20 `loadScript(``../da
- **Gợi ý sửa:** Thêm ?v= nhất quán cho toàn bộ CSS/JS/data nạp tĩnh của chuỗi.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 56. assets/learning/vocabulary-rounds-app.js:17 (+ assets/learning/persistence.js:40-42)
- **What:** state=validate(persistence.load(state)) nằm trong catch rỗng: dữ liệu đã lưu lệch schema/hỏng bị bỏ ngầm không thông báo, còn persistence.load xóa luôn key khi JSON không đọc được → mất tiến độ im lặng, trái bất biến 'giữ tiến độ người học'
- **Severity:** low — **Status:** verified
- **Evidence:** app:17 `try{…state=validate(persistence.load(state));…}catch(e){}` rỗng; persistence.js:40-42 catch của load(): `storage.removeItem(key); return clone(fallback);` — bản gốc dẫn cả :47, đó là method cl
- **Gợi ý sửa:** Toast cảnh báo 'không đọc được tiến độ đã lưu' thay vì catch rỗng, và không xóa key trước khi báo cho người học.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 57. assets/learning/vocabulary-rounds-app.js:94
- **What:** getContext của keyboard dispatcher gọi q() (dòng 39, không có guard cho state.session null) nên MỖI lần bấm phím khi không có phiên học (tab Hôm nay, sau khi kết thúc phiên) đều văng uncaught TypeError — runtime chung keyboard.js:32 spread
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc code (không mở trình duyệt theo yêu cầu): app.js:39 "function q(){return state.session.q}"; app.js:94 "answered:q()?.answered" — state.session khởi tạo null ở app.js:11, trả về null ở finish() (ap
- **Gợi ý sửa:** Đổi getContext dùng "answered:state.session?.q?.answered, revealed:state.session?.q?.revealed" thay vì gọi q().
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 58. Vocabulary/vocabulary-practice.html:1-13
- **What:** Cache-bust không nhất quán: chỉ media-helper.css/js có ?v=20260916-p2 và keyboard-pronunciation.js có ?v=20260922-voices (nạp động), còn 7 script tĩnh khác (progress/persistence/session/keyboard/dialog/router/vocabulary-rounds-bootstrap), 4
- **Severity:** low — **Status:** verified
- **Evidence:** practice html:1-4 CSS không ?v=, :5 media-helper.css?v=20260916-p2; :6-11 6 script không ?v=, :12 media-helper.js?v=20260916-p2, :13 vocabulary-rounds-bootstrap.js không ?v=; bootstrap:77,81 nạp app.j
- **Gợi ý sửa:** Đặt cùng một tham số ?v= cho mọi CSS/JS của trang khi lần sau nâng bản.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 59. assets/learning/vocabulary-rounds-app.js:38-63
- **What:** App tự cài lại toàn bộ engine phiên học/flashcard/chấm điểm (start/makeQuestion/grade/logResult/next) trong khi assets/learning/session.js (createLearningSession) và progress.js (deriveProgress) đã cung cấp đúng các abstraction này — grep x
- **Severity:** low — **Status:** verified
- **Evidence:** grep -c 'createLearningSession\|deriveProgress' assets/learning/vocabulary-rounds-app.js → 0 (đã chạy, exit 1); session.js:17-156 createLearningSession và progress.js:8-19 deriveProgress định nghĩa en
- **Gợi ý sửa:** Ghi nhận như cải tiến kiến trúc tiềm năng (CONTEXT.md Architecture invariants 2–3), chỉ thực hiện khi có scope riêng.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 60. Writing/guide.html:15
- **What:** Khối CSS chết ~4,86KB (nguyên dòng 15 + class .kbd dòng 12): 26 class không xuất hiện trong DOM — unit-strip/unit-tab/unit-stage/unit-cover/unit-inner/meet-title/mindmap/mind-center/mind-branches/branch/method-map/map-col/map-arrow/practice
- **Severity:** medium — **Status:** verified
- **Evidence:** sed -n '15p' Writing/guide.html | wc -c = 4861 byte (tính cả ký tự xuống dòng); loop grep từng tên class: mọi tên chỉ xuất hiện ở dòng 15, .kbd chỉ ở dòng 12; riêng 'answer' còn khớp dòng 53/90 nhưng
- **Gợi ý sửa:** Xóa nguyên dòng 15 và .kbd, hoặc đưa đúng markup của các section đó vào nếu đây là còn sót từ bản nháp.
- **Nguồn:** Writing/guide.html

### 61. Writing/guide.html:131
- **What:** JSON.parse trên localStorage không có try/catch: giá trị 'essay-lab-v1:ticks' bị hỏng sẽ throw ở top-level, làm chết phần khôi phục tick, gắn handler onchange và render tiến độ phía sau (các câu lệnh nằm sau trong cùng <script> sẽ không chạ
- **Severity:** low — **Status:** verified
- **Evidence:** guide.html:131 `const tickState=JSON.parse(localStorage.getItem(storageKey+'ticks')||'[]');ticks.forEach((x,i)=>{…​x.onchange=saveTicks});…​saveTicks();` — parse top-level, không bọc try/catch, khôi p
- **Gợi ý sửa:** Bọc parse trong try/catch và fallback về [] khi dữ liệu hỏng.
- **Nguồn:** Writing/guide.html

### 62. Writing/guide.html:126
- **What:** navigator.clipboard.writeText không có nhánh lỗi: trên host http (không bảo mật) navigator.clipboard không tồn tại → TypeError; trên secure context promise vẫn có thể từ chối (vd NotAllowedError) → unhandled rejection, nút 'Sao chép' không
- **Severity:** low — **Status:** verified
- **Evidence:** guide.html:126 `$('#copyBtn').onclick=async()=>{await navigator.clipboard.writeText($('#essay').value);$('#copyBtn').textContent='Đã sao chép';setTimeout(…​)}` — không try/catch, không .catch. ĐÃ LÀM
- **Gợi ý sửa:** try/catch xung quanh và hiện thông báo lỗi theo mẫu what→why→how khi clipboard không khả dụng.
- **Nguồn:** Writing/guide.html

### 63. Writing/meaning-to-english-pipeline-v1-6.html:350
- **What:** Tái viết bộ xử lý bàn phím mà assets/learning/keyboard.js đã chuẩn hóa (9 trang đang nạp) và làm rơi các guard đó: resolveKeyboardAction chặn composing, chặn Enter khi input rỗng, và trả null cho BUTTON/TEXTAREA/SELECT/A — handleKeys của tr
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: assets/learning/keyboard.js:10 "if (!context.active || context.repeat || context.composing || context.dialogOpen || context.interactive) return null;", :11 "if (tagName === 'TEXTAREA' || tag
- **Gợi ý sửa:** Thay handleKeys bằng English101Learning.resolveKeyboardAction để kế thừa guard IME/empty-input/inline-control thay vì tự viết.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 64. viewer.js:19-25
- **What:** So khớp doc.type không nhất quán: PDF/HTML so sánh case-sensitive (dòng 19) trong khi nhánh Word dùng toUpperCase (dòng 21); nhánh WORD/DOC/DOCX (dòng 21-23) và 'Link'→location.replace (dòng 24-25) hiện là dead code vì catalogue chỉ có type
- **Severity:** low — **Status:** verified
- **Evidence:** viewer.js:19 `if (["PDF", "HTML"].includes(doc.type))` vs viewer.js:21 `["WORD","DOC","DOCX"].includes(doc.type.toUpperCase())`; viewer.js:24-25 `doc.type === "Link"` → location.replace. Đọc lại data/
- **Gợi ý sửa:** Chuẩn hóa `const type = String(doc.type||'').toUpperCase()` một lần rồi so khớp; xóa nhánh dead-code hoặc ghi chú rõ là dự phòng cho tương l
- **Nguồn:** viewer.html

### 65. viewer.html:5,10
- **What:** Ba file tĩnh viewer nạp (style.css, data/documents.js, viewer.js) đều thiếu cache-bust ?v= trong khi quy ước repo đang dùng ?v= ngày ở index.html (home-icons.js?v=20261113-desk-3, animation.js?v=20261114-motion-2, script.js?v=20261114-motio
- **Severity:** low — **Status:** verified
- **Evidence:** viewer.html:5 `<link rel="stylesheet" href="style.css">`, viewer.html:10 `<script src="data/documents.js"></script><script src="viewer.js"></script>` — không ?v=. Lệnh chạy: grep -rl --include="*.html
- **Gợi ý sửa:** Thêm ?v=<ngày-chỉnh-sửa> cho style.css, data/documents.js và viewer.js theo đúng quy ước hiện có.
- **Nguồn:** viewer.html

### 66. Vocabulary/vong-1-2-vocabulary-complete-examples.html (1440×900 + 390×844)
- **What:** Nhấn phím bất kỳ khi chưa có phiên học (ví dụ Enter ở tab Flashcard) làm keyboard dispatcher ném TypeError trên console và phím không được điều phối.
- **Severity:** medium — **Status:** verified
- **Evidence:** Console sau 1 lần Enter ở màn hình setup Flashcard (chưa có session): "TypeError: Cannot read properties of null (reading 'q') at q (assets/learning/vocabulary-rounds-app.js:39:108) at getContext (ass
- **Gợi ý sửa:** Trong getContext, đọc answered/revealed qua optional chaining an toàn như "state.session?.q?.answered" thay vì gọi q() khi state.session là
- **Nguồn:** trình duyệt

### 67. Verb/phrasal-verbs.html:676-679,696, Vocabulary/vocabulary-reading-translation-v1-6.html:103,426, Vocabulary/vocabulary-atlas.html:65 …11 trang nạp helper
- **What:** Engine phát âm bị tách 2 luồng: assets/keyboard-pronunciation.js (EnglishPronunciation) có 11 trang nạp, nhưng 3 trang vẫn tự viết speechSynthesis riêng (accent/rate khác nhau, có trang chạy song song cả hai trong cùng một trang).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại: 11 trang nạp helper (đúng danh sách: phrasal-verbs, english-verbs, paraphrase-80, toeic-600, personal-flashcards, confusing-words, root-atlas, ielts-topic, ielts_hiking, reading-translation, c
- **Gợi ý sửa:** Cho phép EnglishPronunciation nhận override lang/rate per-call và chuyển 3 trang còn lại dùng helper thay vì utterance tự tạo.
- **Nguồn:** đối chiếu hệ thống

### 68. Grammar/conjunctions-theory-practice.html, Grammar/prepositions-theory-practice.html, Grammar/same-word-different-parts-of-speech.html, Grammar/english-suffix-lab.html:4, Grammar/tense-exercises-answer-key-quiz.html …9 trang
- **What:** Tiến độ học bị lưu theo 2 hướng không tương thích: 9 trang ghi localStorage key thô (4 quy ước đặt tên khác nhau) trong khi assets/learning/persistence.js (envelope schema + migrateLegacy + serialize/parse) chỉ được 7 consumer lesson dùng.
- **Severity:** high — **Status:** verified
- **Evidence:** Đo lại đủ giá trị key: 'conjunction-progress', 'prep-progress', 'pos-progress', 'suffixLabKnownV1'+'suffixLabProgressV2', 'tenseQuizHistoryV1', 'bi-kip-grammar-v2' (bi-kip:23), 'essay-lab-v1:' (guide:
- **Gợi ý sửa:** Bọc từng key thô bằng createPersistence với migrateLegacy đọc key cũ (module đã hỗ trợ) để tiến độ cũ không mất và các trang cùng một chuẩn
- **Nguồn:** đối chiếu hệ thống

### 69. Vocabulary/c1-vocabulary.html:9,58, Vocabulary/toeic-600.html:11,77, Verb/english-verbs.html:164, Verb/phrasal-verbs.html:244, Vocabulary/vocabulary-practice.html:5, Vocabulary/vocabulary-atlas.html:1
- **What:** Cùng một file dùng chung media-helper.css/media-helper.js bị gắn 2 chuỗi cache-bust khác nhau (?v=20260916-p2 và ?v=20260916) trên các trang tiêu thụ, nên bump phiên bản một nơi sẽ để lại bản cache cũ ở nơi khác.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo lại: ?v=20260916-p2 đúng 4 trang (english-verbs:164, phrasal-verbs:244, vocabulary-practice:5, vocabulary-atlas:1); ?v=20260916 đúng 2 trang (c1-vocabulary:9, toeic-600:11; media-helper.js không -p
- **Gợi ý sửa:** Quy ước một chuỗi version duy nhất cho mỗi file dùng chung và centralize danh sách version (hoặc tools/ script bump) để mọi trang cùng nhảy
- **Nguồn:** đối chiếu hệ thống

### 70. viewer.html:4, index.html:7 …27 trang phụ
- **What:** meta theme-color không thống nhất: 27/28 trang phụ không khai báo, 2 trang có đều khác nhau (#0b1220 vs #0b1013).
- **Severity:** low — **Status:** verified
- **Evidence:** Đo lại grep 'name="theme-color"' toàn repo → chỉ 2 kết quả: viewer.html:4 (#0b1220) và index.html:7 (#0b1013); 27/28 trang phụ trả về NONE. Họ màu lesson (learning.css:1 header #203b3a) là giá trị thứ
- **Gợi ý sửa:** Chọn một theme-color đại diện (khớp palette lesson) và thêm vào template head của mọi trang phụ.
- **Nguồn:** đối chiếu hệ thống

### 71. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:15,149, Vocabulary/personal-flashcards.html:29-30, Vocabulary/vocabulary-atlas.html:6,84, Vocabulary/vocabulary-practice.html:6
- **What:** 4 trang lesson có phần tử <dialog> nhưng chỉ 2 dùng assets/ui/dialog.js (createDialogController có sẵn focus-restore + click-outside); bi-kip và personal-flashcards tự quản showModal/focus riêng.
- **Severity:** low — **Status:** verified
- **Evidence:** Đo lại: grep '<dialog' → bi-kip:15 (confirm-dialog, 1), personal-flashcards:29-30 (duplicate-dialog, how-dialog, 2), vocabulary-atlas:6 (1), vocabulary-practice:6 (1); cộng index.html:201 (quick-index
- **Gợi ý sửa:** Chuyển 2 trang còn lại sang createDialogController (hỗ trợ onClose callback cho trường hợp duplicate-dialog cần returnValue).
- **Nguồn:** đối chiếu hệ thống

### 72. Verb/five-forms-of-verbs-with-3rd-person.html:12+32, Vocabulary/confusing-words.html:11+421
- **What:** 2 trang giữ 2 khối :root trong cùng một file định nghĩa trùng tên biến với giá trị khác nhau — khối sau ghi đè âm thầm trong cascade, khiến bộ token đầu trở thành code chết gây nhầm lẫn khi chỉnh sửa.
- **Severity:** low — **Status:** verified
- **Evidence:** five-forms :12 (--bg:#f1eee6, --ink:#17212b, --navy:#203a5f, 11 biến) vs :32 (--bg:#f4f7f9, --ink:#172b3b, --navy:#244b86, 8 biến trùng tên); confusing-words :11 (--ink:#1C2321, giấy ấm) vs :421 (--in
- **Gợi ý sửa:** Xóa khối :root thừa hoặc gom thành một bộ token + class theme có chủ đích.
- **Nguồn:** đối chiếu hệ thống

## content (32 finding)

### 1. Blog/tu-biet-den-dung-duoc.html:28
- **What:** Nhãn "Khoảng 6 phút đọc" phóng đại khoảng 3 lần so với thực tế: bài chỉ có ~434 từ hiển thị (344 từ tính riêng phần article, dòng 29-46), tương đương ~2 phút đọc tiếng Việt ở tốc độ ~200 từ/phút.
- **Severity:** low — **Status:** verified
- **Evidence:** Chạy lại đúng lệnh của giám định viên: sed -n '25,47p' Blog/tu-biet-den-dung-duoc.html | sed 's/<[^>]*>/ /g' | wc -w → 434; chạy thêm phần article thuần (dòng 29-46) → 344 từ. Cả hai mốc đều cho ~2 ph
- **Gợi ý sửa:** Sửa thành "Khoảng 2–3 phút đọc" hoặc mở rộng bài viết thật sự nếu muốn giữ nhãn 6 phút.
- **Nguồn:** Blog/tu-biet-den-dung-duoc.html

### 2. Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html:18 (31/31 câu match: c1q18–c1q23, c2q20–c2q26, c3q20–c3q25, c4q20–c4q25, c8q13–c8q18)
- **What:** Cả 31 câu match có explain chỉ lặp lại đề bài + đáp án (ví dụ 'Quá trình từ sáng đến hiện tại: Present perfect continuous.'), mâu thuẫn với lời hứa trên trang 'Lời giải khi trả lời sai' (:69) và 'Câu sai được giải thích ngay' (:74) cũng như
- **Severity:** medium — **Status:** verified
- **Evidence:** Node parse JSON dòng 18: 31/31 explain khớp chính xác mẫu '<đề bỏ tiền tố "Chọn quy tắc phù hợp: ">: <đáp án>.' (vd c1q18 đúng như ví dụ gốc); :101 đưa chuỗi này vào nhãn 'Vì sao đáp án của bạn chưa p
- **Gợi ý sửa:** Viết explain riêng cho từng câu match theo cấu trúc vì-sao (ví dụ vì sao 'A number of' đi với động từ số nhiều).
- **Nguồn:** Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html

### 3. Grammar/conjunctions-theory-practice.html:35,38,40,48
- **What:** 3 prompt trùng nhau giữa các bộ: 'Take care ___ you fall.' (Cơ bản = Theo quan hệ nghĩa, cùng đáp án 'lest'), 'He is taller ___ I am.' (compact = Theo quan hệ nghĩa) và 'You will fail ___ you study.' (compact = Sửa lỗi).
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy lại script node trên data thật: 'Tổng prompt trùng: 3' với đúng 3 cặp như liệt kê — dòng 38 `['Take care ___ you fall.','lest']` trùng dòng 40, dòng 35 'He is taller ___ I am.'/'than' trùng dò
- **Gợi ý sửa:** Thay một câu trong mỗi cặp bằng prompt khác cùng dạng liên từ.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 4. Grammar/english-suffix-lab.html:634,768-775
- **What:** Câu hỏi ví dụ ("Từ nào là ví dụ đúng của nhóm X?") có thể có nhiều lựa chọn đúng hợp lệ vì phương án nhiễu (distractor) chỉ bị loại nếu trùng đúng chuỗi với examples của nhóm đang hỏi: "positive" nằm ở cả -ive và -itive; forward/backward/up
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đếm bằng node trên mảng :634: -ive và -itive cùng chứa 'positive'; -ward(Adj) và -ward/-wards(Adv) dùng chung đúng 4 ví dụ (forward, backward, upward, downward); logic :770-775 chỉ check `!s.exampl
- **Gợi ý sửa:** Loại thân từ các nhóm chị em hình thái (thêm điều kiện cấm ví dụ của nhóm trùng đuôi) hoặc tách nhóm -ward khỏi bộ câu hỏi ví dụ.
- **Nguồn:** Grammar/english-suffix-lab.html

### 5. Grammar/prepositions-theory-practice.html:46,53
- **What:** Prompt trùng nhau: "I prefer tea ___ coffee." xuất hiện 2 lần với cùng đáp án 'to' — một lần trong bộ rút gọn, một lần trong bộ 'Cụm từ 1'.
- **Severity:** low — **Status:** verified
- **Evidence:** grep -on "I prefer tea ___ coffee" trúng dòng 46 và dòng 53; dòng 46: ['…','to','prefer A to B.'] (có giải thích), dòng 53: ['…','to'] (không có).
- **Gợi ý sửa:** Thay câu ở bộ 'Cụm từ 1' bằng một cụm prefer/prefer to khác chưa có trong bộ rút gọn.
- **Nguồn:** Grammar/prepositions-theory-practice.html

### 6. Grammar/tense-exercises-answer-key-quiz.html:119
- **What:** 145/198 câu của trang có explanation rỗng — toàn bộ thuộc BANK gốc 168 câu (23 câu BANK có giải thích), trong khi 30 câu bổ sung (SUPPLEMENT) đều có giải thích; khi trả lời sai, feedback chỉ hiện "✗ Chưa đúng" kèm answer key mà không nêu ru
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã chạy: grep -o '"explanation": ""' → 145 (cả 145 nằm ở dòng 119); awk NR==119 | grep -o '"explanation": "[^"]' → 23 câu BANK có giải thích; awk 'NR>=124&&NR<=153' | grep -c "explanation:'" → 30/30.
- **Gợi ý sửa:** Bổ sung giải thích ngắn theo lỗi thì cho ít nhất các câu MCQ/text tự động chấm, hoặc hiển thị ghi chú chung hướng dẫn đối chiếu key nếu chưa
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 7. Grammar/tense-exercises-answer-key-quiz.html:119
- **What:** 3 câu tự sửa (e24_72, e24_76, e24_80) có prompt trùng chính xác với đáp án — người học được yêu cầu "sửa câu" nhưng câu đã đúng sẵn và không có chỉ dẫn nào như "No error".
- **Severity:** low — **Status:** verified
- **Evidence:** Đã trích từng đối tượng từ dòng 119: e24_72 prompt == answer == "They will be playing cricket for two hours." (kind "self"); e24_76 "The patient will die before the doctor reaches here."; e24_80 "He m
- **Gợi ý sửa:** Giữ nguyên tập gốc nhưng thêm nhãn "(câu đúng sẵn)" hoặc dạng "No error" giống e38_144.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 8. Grammar/tense-exercises-answer-key-quiz.html:119
- **What:** Câu hỏi trùng lặp giữa hai Exercise: e35_123 ≈ e37_125 ("When you will find… a solution to this problem") và e35_124 ≈ e37_131 ("Before the alarm had stopped ringing…") — cùng bẫy ngữ pháp, gặp 2 lần khi trộn toàn bộ.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy grep -o 'When you will find' → 2 kết quả. Trích e35_123 ("When you will find out a solution… awarded a prize", answer a) vs e37_125 ("When you will find (a)/ a solution… get this project", ans
- **Gợi ý sửa:** Loại một bản khỏi pool khi trộn chế độ "all", hoặc đánh dấu cặp trùng để selectPractice bỏ qua.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 9. Grammar/tense-exercises-answer-key-quiz.html:119
- **What:** Prompt đoạn B (e40_166) lỗi dấu chấm lửng "I ..... ...(look)" và một chỗ mất hẳn dấu chấm ("he (look) at me"), còn đoạn C (e40_167) không có chú thích (động từ) nào ở các chỗ trống.
- **Severity:** low — **Status:** verified
- **Evidence:** Trích nguyên văn từ dòng 119: e40_166 chứa "I ..... ...(look) at the soldier and he (look) at me" (chuỗi dấu chấm cụt, một chỗ không có dấu chấm); e40_167 chỉ có chuỗi ".........." không cue (động từ)
- **Gợi ý sửa:** Chuẩn hoá chuỗi dấu chấm lửng và bổ sung (động từ) cho các chỗ trống đoạn C.
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 10. Grammar/tense-exercises-answer-key-quiz.html:119
- **What:** BỔ SUNG MỚI: Prompt e32_100 (Exercise 32, câu 19) lỗi mạo từ tiếng Anh "an story" — "Smrita..........(write) an story when Rahul......... (enter) the room." — phải là "a story"; lỗi hiển thị trực tiếp cho người học ở câu chấm tự động.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chạy: grep -o 'an [bcdfghjklmnpqrstvwxz][a-z]*' → duy nhất 1 lỗi thật "an story" (các match khác như "an the/an to/an now" đều là phần của "than the", "began to", "mean now" — hợp lệ); trích đối tư
- **Gợi ý sửa:** Sửa thành "a story" (giữ nguyên cấu trúc câu và answer key).
- **Nguồn:** Grammar/tense-exercises-answer-key-quiz.html

### 11. Verb/english-verbs.html:517,521,455,457 (pool: assets/learning/verb-groups.js p4)
- **What:** Trùng prompt trong kho luyện tập: cặp cloze gần giống hệt "I _____ about my family." / "I really _____ about my family." cùng đáp án care (dòng 517/521) và "What did he _____?" / "What did she _____?" cùng đáp án say (dòng 455/457); ngoài đ
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đối chiếu nguyên văn 4 dòng cloze trong file: 517 'I _____ about my family.'/care (nhóm XXIV) và 521 'I really _____ about my family.'/care (nhóm XXV); 455 'What did he _____?'/say (VII) và 457 'Wh
- **Gợi ý sửa:** Khử trùng pool theo .w trước khi shuffle và gộp/bỏ các cặp cloze gần trùng nhau.
- **Nguồn:** Verb/english-verbs.html

### 12. Verb/five-forms-of-verbs-with-3rd-person.html:308
- **What:** Quiz có 15 cặp động từ trùng prompt tiếng Việt (prompt = x.vi): cho phép→allow|let, đặt→place|put, giữ→hold|keep, bắt đầu→begin|start, đóng→close|shut, trả lời→answer|reply, thu thập→collect|gather, yêu cầu→demand|request, biến mất→disappea
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 308: $('#prompt').textContent=x.vi; dòng 293-299: accepted() chỉ nhận alts của chính từ được bốc và tách '/' trong chính giá trị của từ đó. Tự chạy node parse DATA (dòng 171): DATA.length=462, 46
- **Gợi ý sửa:** Thêm ngữ cảnh phân biệt vào prompt (vd 'đặt (put)' vs 'đặt (place)') hoặc chấp nhận chéo đáp án của cặp đồng nghĩa qua alts.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 13. Verb/phrasal-verbs.html:364, 370, 380, 384, 402, 410, 413, 417, 423
- **What:** DATA có 9 mục mang nghĩa tiếng Việt trùng nhau khiến prompt "Nghĩa → Phrasal verb" mơ hồ: "Tiếp tục" ×3 (stt 3, 19, 56), "Tình cờ gặp" ×2 (stt 9, 62), "Chăm sóc" ×2 (stt 23, 41), "Quay lại" ×2 (stt 49, 52) — bộ chấm chỉ nhận đúng term của c
- **Severity:** medium — **Status:** verified
- **Evidence:** grep đếm: 'Tiếp tục'×3 (dòng 364, 380, 417), 'Tình cờ gặp'×2 (370, 423), 'Chăm sóc'×2 (384, 402), 'Quay lại'×2 (410, 413) — đúng 9 mục, đối chiếu từng stt. Grading so khớp `x.term` của item hiện tại (
- **Gợi ý sửa:** Phân biệt nghĩa trong DATA (vd "Tiếp tục (không dừng)" vs "Tiếp tục (làm mãi)") hoặc chấp nhận nhóm đáp án đồng nghĩa cho mỗi prompt.
- **Nguồn:** Verb/phrasal-verbs.html

### 14. Vocabulary/c1-vocabulary.html:55 + Vocabulary/c1-vocabulary.js:215-219
- **What:** Hai cặp từ cùng nhóm trùng nghĩa tiếng Việt (Feasible/Viable đều "khả thi" ở Nhóm II; Highlight/Underscore đều "nhấn mạnh" ở Nhóm V) khiến chế độ "Anh → Việt · chọn nghĩa" có thể sinh 2 lựa chọn giống hệt nhau và chấm SAI lựa chọn đúng nghĩ
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã đọc DATA html:55 và chạy: grep -o '"khả thi", "Nhóm II"' c1-vocabulary.html | wc -l → 2 (Feasible, Viable); grep -o '"nhấn mạnh", "Nhóm V"' | wc -l → 2 (Highlight, Underscore). meaningChoices (js:2
- **Gợi ý sửa:** Loại ứng viên có nghĩa trùng (sau normalize) khi sinh phương án nhiễu, hoặc tách nghĩa của các cặp từ này.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 15. Vocabulary/confusing-words.html:975,979,982,1262 + 1633
- **What:** Ở chiều Việt→Anh, đề bài hiện nguyên phần mở rộng tiếng Anh của 4 mục viết tắt nên đáp án bị lộ — thấy "you are — bạn là / bạn đang" chỉ cần gõ "you're" (tương tự it's, they're, who's).
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :975 W("you're","viết tắt","you are — bạn là / bạn đang",…) và :1633 promptMain.textContent = item.vi.split(',')[0]. ĐÃ CHỈNH: script node quét 398 mục (đã chạy) cho thấy danh sách gốc thiếu they'
- **Gợi ý sửa:** Tách trường nghĩa thuần Việt cho các mục viết tắt hoặc loại 4 mục này khỏi chiều vi-en.
- **Nguồn:** Vocabulary/confusing-words.html

### 16. Vocabulary/confusing-words.html:714-716 + 1633
- **What:** Ba mục succeed/success/successful cùng cho đề Việt→Anh promptMain "thành công" sau khi split(',') → đề chính trùng nhau tuyệt đối, chỉ dòng ví dụ nhỏ phân biệt và ví dụ "Dự án đã thành công" vẫn mơ hồ giữa succeed/success; vi phạm "Avoid du
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :714 vi:"thành công, kế nhiệm", :715 vi:"thành công", :716 vi:"thành công" → cùng promptMain "thành công". ĐÃ CHỈNH: bỏ cách nói "ví dụ gần như hoán đổi được cho nhau" — script node (đã chạy) xác
- **Gợi ý sửa:** Viết lại nghĩa/ví dụ Việt phân biệt rõ từ loại cho từng mục (đã thành công / sự thành công / thành đạt).
- **Nguồn:** Vocabulary/confusing-words.html

### 17. Vocabulary/confusing-words.html:644,1753-1757
- **What:** FINDING BỔ SUNG: ở chiều Việt→Anh, nút "🔊 Nghe cách đọc" vẫn đọc to item.w + item.en — chính là từ tiếng Anh cần nhập, tức nghe được đáp án ngay trước khi trả lời; nút không bị ẩn hay đổi hành vi theo chiều.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đọc :644 nút nằm cố định trong quiz-card; :1756 speak(item.w + '. ' + item.en, {lang:'en-US'}) không rẽ nhánh theo direction (direction chỉ đổi label/prompt/placeholder tại :1626-1635); register :1759
- **Gợi ý sửa:** Ẩn listenBtn (hoặc chuyển sang đọc viEx) khi direction === 'vi-en'.
- **Nguồn:** Vocabulary/confusing-words.html

### 18. Vocabulary/confusing-words.html:684-685,717,737,743-744,761-762,780,787,835-836,909,921-922,928,1005,1093,1114,1156,1161,1237,1258,1350-1351,1369-1371 (…16 nhóm)
- **What:** FINDING BỔ SUNG: trùng đề Việt→Anh không chỉ ở nhóm succeed — 16 nhóm mục có promptMain giống hệt nhau sau split(','), ví dụ affect/effect "ảnh hưởng", effectiveness/efficacy "tính hiệu quả", successive/consecutive "liên tiếp", depend/depen
- **Severity:** medium — **Status:** verified
- **Evidence:** Script node quét toàn bộ 398 mục W() (đã chạy, parse đủ 398): 16 nhóm promptMain trùng — ảnh hưởng(affect@684,effect@685), ấn tượng(impression@691,impressive@692), thành công(×3@714-716), liên tiếp(su
- **Gợi ý sửa:** Phân biệt nghĩa Việt theo từ loại cho từng mục (như đề xuất cho nhóm succeed) hoặc cho phép chấp nhận nhiều đáp án hợp lệ ở :1654.
- **Nguồn:** Vocabulary/confusing-words.html

### 19. Vocabulary/ielts-c1-c2-modern.js:52,71
- **What:** Dạng cloze khi không tìm được cụm trong câu trả prompt = câu đầy đủ KHÔNG có chỗ trống (js:52), và nhánh 'LUYỆN TỪ SAI' (start(custom), js:85) không lọc theo cloze matched (js:71) nên 45/411 row (~11%, đo bằng script) rơi vào prompt lỗi. CH
- **Severity:** medium — **Status:** verified
- **Evidence:** js:52 `return {prompt:match?sentence.replace(pattern,'_____'):sentence,…}`; js:71 `const pool=custom||DATA.map(…).filter(…(mode!=='cloze'||cloze(DATA[id]).matched))` — nhánh custom không lọc; js:85 `$[
- **Gợi ý sửa:** Khi custom pool dùng cho retry-wrong, lọc lại theo cloze matched (hoặc khi unmatched thì đổi prompt sang dạng vi-en/en-vi thay vì in nguyên
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 20. Vocabulary/ielts-collocations-topic-table-with-dictation.html:215
- **What:** 17 giá trị cụm từ (cột phrase) trùng nhau trong 411 row ('Artistic expression' ×3, 'Emotional intelligence' ×3, 'Cultural diversity' ×2, 'Fine motor skills' ×2…) — khi đề 'Trộn các dạng' trên pool lớn, cùng một prompt (cụm từ) có thể xuất h
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đo lại bằng node (parse DATA dòng 215): 'phrase(col1) duplicate values: 17' — x3 'Artistic expression', x3 'Emotional intelligence', x2 'Cultural diversity'/'Fine motor skills'/'Creative expression
- **Gợi ý sửa:** Khi dựng deck, dedupe theo row[1] (giữ row có câu ví dụ khác nhau) hoặc nhóm các row trùng cụm thành 1 prompt nhiều nghĩa.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 21. Vocabulary/ielts-collocations-topic-table-with-dictation.html:215
- **What:** BỔ SUNG: ≥42/411 row có chuỗi cụm từ (cột phrase) bị lỗi gãy/dính khoảng trắng — 'Interperson al skills', 'Visual-spati al skills' (×2), 'Self-express ion', 'Socio-emoti onal learning', 'Problem-sol ving skills', 'Cultural preservatio n', '
- **Severity:** medium — **Status:** verified
- **Evidence:** Đo bằng node script dùng câu ví dụ của chính row làm ground truth: 48 row nghi ngờ lỗi khoảng trắng, 42 lỗi nằm ngay chuỗi phrase, ~5 lỗi ở cột sentence (vd row 61 phrase 'Cognitive development' đúng
- **Gợi ý sửa:** Sửa dữ liệu dòng 215: gộp/sửa khoảng trắng cho 42 chuỗi phrase lỗi + ~5 sentence dính chữ, sau đó chạy lại bộ đếm cloze-unmatched (45/411) đ
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 22. Vocabulary/ielts-hiking-modern.js:54
- **What:** Ở dạng cloze (Điền collocation vào câu) và listen, hàng gợi ý luôn hiện 'Unit · w · pos' ngay từ khi hiện câu hỏi — w là đáp án hoặc chứa trong đáp án cloze ở 363/442 item (41 item trùng khớp tuyệt đối), nên từ khóa đáp án bị lộ trước khi l
- **Severity:** medium — **Status:** verified
- **Evidence:** js:54 luôn gán `$('#dictHint').textContent=`Unit ${item.u} · ${item.w} · ${item.pos}`` trong renderQuestion; js:35-39 cloze trả best.text; js:42 prompt cloze là câu có '_____'. ĐÃ CHỈNH: ví dụ gốc 're
- **Gợi ý sửa:** Ẩn w ở dạng cloze/listen (chỉ hiện Unit · pos) hoặc chỉ tiết lộ w qua nút GỢI Ý có tính assisted.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 23. Vocabulary/root-atlas.html:24
- **What:** Pool đáp án nhiễu chỉ loại mục trùng chuỗi vi chính xác (x.vi!==d.vi), nên các gốc gần đồng nghĩa vẫn vào cùng câu — ví dụ spect 'nhìn; quan sát' có thể đặt cạnh vid, vis 'nhìn; thấy' khiến lựa chọn đúng về nghĩa vẫn bị chấm sai (chấm theo
- **Severity:** medium — **Status:** verified
- **Evidence:** root-atlas.html:24 `choices=shuffle([d,...shuffle([...unique.values()]).slice(0,3)])` sau `DATA.filter(x=>x.vi!==d.vi)`; chấm theo id tại :34 `grade(choices[+b.dataset.choice].id===queue[idx].id)`. Đo
- **Gợi ý sửa:** Loại khỏi pool nhiễu các mục cùng trường nghĩa (tương đồng chuỗi/nhóm g) hoặc gắn cờ loại trừ thủ công giữa các cặp dễ nhầm.
- **Nguồn:** Vocabulary/root-atlas.html

### 24. Vocabulary/root-atlas.html:4
- **What:** 97/116 mục dùng chung nguyên văn một câu ghi chú 'Nghĩa gốc là manh mối để nhớ họ từ…' — lặp máy móc làm trường note mất giá trị thông tin riêng cho từng gốc từ.
- **Severity:** low — **Status:** verified
- **Evidence:** Đo bằng node trên DATA dòng 4: chuỗi 'Nghĩa gốc là manh mối để nhớ họ từ. Hãy kiểm tra nghĩa hiện đại trong ngữ cảnh; không ghép nghĩa từng mảnh một cách máy móc.' xuất hiện nguyên văn ở đúng 97/116 m
- **Gợi ý sửa:** Chuyển câu chung thành hướng dẫn một lần trong tab Hướng dẫn, chỉ giữ note khi có nội dung riêng thật.
- **Nguồn:** Vocabulary/root-atlas.html

### 25. data/vocabulary/toeic-600.js:2349,11588 (productive); :4398,8118 (register); :9301,32613 (constantly); :4290,34442 (location/position)
- **What:** Dữ liệu có 4 cặp entry trùng nguyên từ–nghĩa VÀ cùng partOfSpeech ('productive', 'register', 'constantly' lặp 2 lần nguyên văn, 'location'/'position' cùng nghĩa 'Vị trí') nên trắc nghiệm có thể hiện 2 lựa chọn chữ y hệt nhau — chấm theo ID
- **Severity:** high — **Status:** verified
- **Evidence:** Đã xác minh: grep -n đúng các dòng trích; node sim trên pool thật (có shuffle, lọc cùng POS): 8 entry có thể gặp nhãn trùng khớp đáp án — productive (adj/adj), register (v/v), constantly (adj/adj), lo
- **Gợi ý sửa:** Gộp/xóa entry trùng trong data hoặc cho choicePool khử lựa chọn trùng nhãn nghĩa với đáp án.
- **Nguồn:** Vocabulary/toeic-600.html

### 26. data/vocabulary/toeic-600.js (entry 'volunteer', :36698, cuối file)
- **What:** Ví dụ trong cùng một entry bị lặp cơ học: 3 câu chỉ khác mệnh đề mở đầu nhưng cùng thân 'I've worked as a volunteer at a special school twice since I finished Grade 10.' — vi phạm nguyên tắc chống 'mechanically repeated passages' (CONTEXT.m
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh bằng node: 3 ví dụ volunteer (data:36698) cùng thân chính xác từng chữ 'I've worked as a volunteer at a special school twice since I finished Grade 10.', chỉ khác tiền tố '' / 'Recently, '
- **Gợi ý sửa:** Sửa script build (tools/build_toeic_600_data.py) để đa dạng hóa 3 ví dụ, hoặc dedupe khi sinh dữ liệu.
- **Nguồn:** Vocabulary/toeic-600.html

### 27. assets/learning/vocabulary-rounds-app.js:34
- **What:** Copy hard-code số liệu dataset ở 3 chỗ: 'Giữ 4.205 dòng dữ liệu trong 4.205 mục học và 36 chủ đề' và 'Ưu tiên Vòng 3 trước' (app:34), '16 mục có đề dịch biên soạn sẵn' (app:36), '4205 mục của bộ' (app:67) — sai trên route mặc định vong-1-2
- **Severity:** medium — **Status:** verified
- **Evidence:** bootstrap:6 mặc định set='vong-1-2'. Tôi nạp dataset bằng node (stub window): vong-1-2 DATA=1299, GROUPS=29, translations=39, tiers ['V1','V2'] — cả 3 con số cứng đều sai trên route mặc định; chúng kh
- **Gợi ý sửa:** Dùng DATA.length/GROUPS.length/DATA.filter(d=>d.translation).length như progressPage thay vì số cứng.
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 28. assets/learning/vocabulary-rounds-app.js:34 (lặp lần 2 ở :67)
- **What:** Tab 'Hôm nay' và trang Đồng nghĩa ghi cứng '4.205 mục học và 36 chủ đề' / '4205 mục', nhưng bộ Vòng 1–2 thực tế có 1.299 mục và 29 nhóm (đo bằng node), mâu thuẫn luôn với chỗ đếm động DATA.length ở app:78.
- **Severity:** medium — **Status:** verified
- **Evidence:** app:34 'Giữ 4.205 dòng dữ liệu trong 4.205 mục học và 36 chủ đề.'; app:67 '…4205 mục của bộ'; app:78 `Giữ ${DATA.length.toLocaleString('vi-VN')} mục học và ${GROUPS.length} chủ đề`; chạy node trên dat
- **Gợi ý sửa:** Đếm động từ DATA/GROUPS như app:78 thay vì nhét số cứng.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 29. assets/learning/vocabulary-rounds-app.js:34
- **What:** Nút 'Học 10 mục mới' hứa 'Ưu tiên Vòng 3 trước' nhưng bộ này chỉ có Vòng 1–2 (tiers V1/V2) và sort tier.localeCompare thực tế ưu tiên Vòng 1 → hứa một hành vi không tồn tại với Resource này.
- **Severity:** medium — **Status:** verified
- **Evidence:** app:34 'Ưu tiên Vòng 3 trước, học 10 mục mỗi phiên.'; handler todayNew (app:88) `.sort((a,b)=>a.tier.localeCompare(b.tier)).slice(0,10)` → 'V1' < 'V2'; node in config của vong-1-2.js: tiers=[["V1","Vò
- **Gợi ý sửa:** Sinh chữ theo config.tiers của từng bộ dữ liệu thay vì copy chung cho mọi vòng.
- **Nguồn:** Vocabulary/vong-1-2-vocabulary-complete-examples.html

### 30. Writing/meaning-to-english-pipeline-v1-6.html:115
- **What:** Màn hình đầu khai cứng "7.419 mục từ–nghĩa" nhưng mảng dữ liệu RAW_ITEMS chỉ có 6.784 phần tử, nên pill trên appbar (đếm từ dữ liệu) hiện 6.784 — hai con số mâu thuẫn ngay trên cùng một trang.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tái hiện: dòng 115: "<div class="eyebrow">7.419 mục từ–nghĩa · giữ đủ V1–V6</div>"; tôi chạy node JSON.parse trên dòng 140 → "total 6784" (kèm dupId 0, dupPrompt 0); dòng 181: datasetTotal=RAW_ITEMS.l
- **Gợi ý sửa:** Lấy số mục ở hero từ RAW_ITEMS.length (toLocaleString('vi-VN')) thay vì ghi cứng 7.419.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 31. Grammar/tense-exercises-answer-key-quiz.html, Grammar/same-word-different-parts-of-speech.html, Verb/phrasal-verbs.html, Vocabulary/root-atlas.html, Vocabulary/personal-flashcards.html …28 title
- **What:** Tiêu đề và head meta lệch chuẩn giữa các trang: 3 kiểu separator (—, ·, •), 2 cách viết brand ('English 101' vs 'English101'), 22/28 title không có nhãn brand nào, và chỉ 6/28 lesson có meta description.
- **Severity:** low — **Status:** verified
- **Evidence:** Đo lại 29 <title>: '—' trong 13 title (Blog, bi-kip, conjunctions, suffix-lab, prepositions, english-verbs — còn lẫn '·', five-forms, paraphrase-80, phrasal-verbs, confusing-words, ielts-topic, guide,
- **Gợi ý sửa:** Đặt quy ước '<Tên bài> · English101' + meta description cho mọi lesson và sửa đồng loạt theo một danh sách từ tools/.
- **Nguồn:** đối chiếu hệ thống

### 32. Vocabulary/c1-vocabulary.html:1
- **What:** Trang catalogue c1-vocabulary.html không có phần tử <title> và không gán document.title ở bất kỳ đâu — tab trình duyệt hiện URL thay vì tên bài khi mở trực tiếp hoặc trong viewer.
- **Severity:** low — **Status:** verified
- **Evidence:** grep -c '<title>' = 0 và grep 'document.title' = 0 trên c1-vocabulary.html (30 trang của repo, chỉ trang này thiếu); entry 'c1-vocabulary' tại data/documents.js:19 có title catalogue 'C1 Vocabulary —
- **Gợi ý sửa:** Thêm <title>C1 Vocabulary — Nhóm I–VI · English101</title> khớp title catalogue.
- **Nguồn:** đối chiếu hệ thống

## copy (21 finding)

### 1. Blog/tu-biet-den-dung-duoc.html:28
- **What:** Nhãn "Bài mở đầu" hứa một chuỗi bài nhưng thư mục Blog/ chỉ có đúng 1 tệp và catalogue chỉ có 1 mục Blog (data/documents.js:43), nên người đọc xong không có lối "đọc tiếp" nào ngoài link về trang chủ.
- **Severity:** low — **Status:** verified
- **Evidence:** Chạy lại: ls Blog/ → chỉ có tu-biet-den-dung-duoc.html; grep -n 'category: "Blog"' data/documents.js → đúng 1 kết quả ở dòng 43 (id "blog-active-recall"). Phần diễn giải "hứa chuỗi bài" là cách đọc củ
- **Gợi ý sửa:** Đổi nhãn sang trung tính (ví dụ "Bài về phương pháp") hoặc bổ sung link tới mục Blog trên trang chủ cho đến khi có bài thứ hai.
- **Nguồn:** Blog/tu-biet-den-dung-duoc.html

### 2. Grammar/conjunctions-theory-practice.html:3
- **What:** Badge hero ghi '13 phần lý thuyết' trong khi trang chỉ có 12 phần lý thuyết (section 1–12); section 13–14 là bài tập.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc lại dòng 3: `<span class="badge">13 phần lý thuyết</span>`; mục lục cùng dòng liệt kê 14 section, #1–12 là lý thuyết ('Bản chất liên từ'…'Lỗi thường gặp'), #13 'Bài rút gọn' và #14 'Bài mở rộng' l
- **Gợi ý sửa:** Sửa thành '12 phần lý thuyết' hoặc '14 phần: lý thuyết + bài tập'.
- **Nguồn:** Grammar/conjunctions-theory-practice.html

### 3. Grammar/english-suffix-lab.html:798,808
- **What:** Nhãn từ loại viết HOA toàn bộ ("DANH TỪ", "ĐỘNG TỪ", "TÍNH TỪ", "TRẠNG TỪ") xuất hiện ngay trong đề bài "Biến đổi “X” thành DANH TỪ" — chữ HOA toàn từ khó đọc và không cần thiết.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã đọc: :798 labels={noun:'DANH TỪ',verb:'ĐỘNG TỪ',adj:'TÍNH TỪ',adv:'TRẠNG TỪ'}; :808 prompt=`Biến đổi “${f.base}” thành ${labels[kind]}.` — đúng như dẫn.
- **Gợi ý sửa:** Dùng chữ thường "danh từ" hoặc in đậm thay vì HOA toàn từ.
- **Nguồn:** Grammar/english-suffix-lab.html

### 4. Verb/five-forms-of-verbs-with-3rd-person.html:93,161,164,165
- **What:** 8 nút/tab viết HOA toàn bộ trong HTML: 3 tab (dòng 93), BẮT ĐẦU (161), KIỂM TRA 5 DẠNG và TIẾP → (164), LÀM LẠI và LUYỆN TỪ SAI (165) — giám định viên trước đếm 7, bỏ sót LUYỆN TỪ SAI (đã sửa); trái chuẩn sentence case cho controls (DESIGN.
- **Severity:** medium — **Status:** verified
- **Evidence:** Dòng 164: <button class="btn" id="check">KIỂM TRA 5 DẠNG</button>… <button … id="next">TIẾP →</button>; dòng 165: <button … id="retry">LUYỆN TỪ SAI</button> cũng HOA toàn bộ. Đã đọc DESIGN.md:269 nguy
- **Gợi ý sửa:** Đổi sang sentence case ('Kiểm tra 5 dạng', 'Tiếp →') và giữ nhấn bằng font-weight, không bằng caps.
- **Nguồn:** Verb/five-forms-of-verbs-with-3rd-person.html

### 5. Verb/paraphrase-80-flashcards.html:177
- **What:** Tiêu đề h1 in HOA toàn bộ '80+ CỤM CHỮA YẾU PARAPHRASE' trong khi chuẩn trang (DESIGN.md:269 giữ sentence case cho tiêu đề/điều khiển) và phần .sub (178) viết thường — bất nhất và khó đọc với tiếng Việt có dấu.
- **Severity:** low — **Status:** verified
- **Evidence:** Dòng 177 đúng '<h1><span class="num">80+</span> CỤM CHỮA YẾU PARAPHRASE</h1>' (in hoa toàn bộ); dòng 178 .sub viết sentence case; <title> (dòng 6) lại là sentence case '80+ Cụm Chữa Yếu Paraphrase — F
- **Gợi ý sửa:** Viết '80+ Cụm chữa yếu paraphrase' sentence-case cho khớp hệ.
- **Nguồn:** Verb/paraphrase-80-flashcards.html

### 6. Verb/phrasal-verbs.html:249, 253-254
- **What:** Nhãn chữ HOA toàn bộ: h1 "66 PHRASAL VERBS CỰC MẠNH" và 2 tab "FLASHCARDS"/"CHÍNH TẢ" — khó đọc với copy tiếng Việt và trái quy ước sentence-case trong DESIGN.md (dòng 269: "sentence-case titles and controls remain sentence case").
- **Severity:** low — **Status:** verified
- **Evidence:** `<h1><span class="num">66</span> PHRASAL VERBS CỰC MẠNH</h1>` (249); `<button class="mode-tab active" data-mode="flashcards">FLASHCARDS</button>` / "CHÍNH TẢ" (253-254); DESIGN.md:269 đã đọc trực tiếp
- **Gợi ý sửa:** Chuyển sang sentence-case/title-case: "66 Phrasal Verbs Cực Mạnh", "Flashcards", "Chính tả".
- **Nguồn:** Verb/phrasal-verbs.html

### 7. Vocabulary/c1-vocabulary.js:342 (và 73,458)
- **What:** Copy lệch hành động: feedback in "Bạn viết:" cả khi người học chỉ bấm chọn nghĩa (chế độ forward), và aria-label của nút media là tiếng Anh "Visual resources for..." giữa giao diện tiếng Việt.
- **Severity:** low — **Status:** verified
- **Evidence:** js:458 `gradeAnswer(selectedIndex === quiz[quizIndex], DATA[selectedIndex][4]);` — raw là nghĩa đã chọn; js:342 in `Bạn viết: ${escapeHTML(raw)}` khi `raw && !isCorrect` → forward mode chọn nhánh sai
- **Gợi ý sửa:** Dùng "Bạn chọn:" cho chế độ chọn nghĩa và dịch aria-label nút media sang tiếng Việt.
- **Nguồn:** Vocabulary/c1-vocabulary.html

### 8. Vocabulary/confusing-words.html:548
- **What:** Counter tĩnh ghi sai số liệu "58 thẻ mục / ~150 mục từ" trong khi dữ liệu thật là 151 nhóm / 398 từ — JS phải ghi đè ngay khi script chạy, và nếu JS lỗi thì số liệu sai hiển thị vĩnh viễn.
- **Severity:** low — **Status:** verified
- **Evidence:** Đọc :548 <div class="catno" id="catCounter">58 thẻ mục<br>~150 mục từ</div>; grep -c '{ t:' = 151 và '^  W(' = 398 (đã chạy); JS ghi đè tại :1391. ĐÃ CHỈNH: bỏ claim "flash số liệu sai" — script chạy
- **Gợi ý sửa:** Để phần đếm rỗng (hoặc số đúng) trong HTML và để JS điền giá trị chính xác.
- **Nguồn:** Vocabulary/confusing-words.html

### 9. Vocabulary/ielts-collocations-topic-table-with-dictation.html:105-107,194-197,206-207
- **What:** Nhãn nút/tab viết HOA toàn bộ bằng tiếng Việt (BẢNG CỤM TỪ, CHÍNH TẢ, KIỂM TRA, GỢI Ý, CHƯA BIẾT, TIẾP →, LÀM LẠI, LUYỆN TỪ SAI) — khó đọc với chữ có dấu, và tab giữa là tiếng Anh 'FLASHCARDS' lệch giọng với 2 tab còn lại.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện: html:105 `BẢNG CỤM TỪ`, 106 `FLASHCARDS`, 107 `CHÍNH TẢ`, 194 `KIỂM TRA`, 195 `GỢI Ý`, 196 `CHƯA BIẾT`, 197 `TIẾP →`. CHỈNH: LÀM LẠI/LUYỆN TỪ SAI nằm ở dòng 206-207 (bản gốc ghi 211-212 —
- **Gợi ý sửa:** Chuyển nhãn về sentence case ('Bảng cụm từ', 'Kiểm tra', 'Tiếp →'…) và thống nhất một ngôn ngữ cho 3 tab.
- **Nguồn:** Vocabulary/ielts-collocations-topic-table-with-dictation.html

### 10. Vocabulary/ielts_hiking_collocations_full_with_dictation.html:104
- **What:** 9 nút hành động viết chữ HOA toàn bộ trong HTML (FLASHCARDS, CHÍNH TẢ, KIỂM TRA, GỢI Ý, CHƯA BIẾT, NGHE, TIẾP →, LÀM LẠI, LUYỆN CÂU SAI), против chuẩn sentence-case cho control trong DESIGN.md.
- **Severity:** low — **Status:** verified
- **Evidence:** 9 nút HOA tại :104 FLASHCARDS, :105 CHÍNH TẢ, :204 KIỂM TRA, :205 GỢI Ý, :206 CHƯA BIẾT, :207 🔊 NGHE, :208 TIẾP →, :217 LÀM LẠI, :218 LUYỆN CÂU SAI (các nút khác viết thường: :187 'Bắt đầu phiên mới
- **Gợi ý sửa:** Viết thường 'Kiểm tra', 'Gợi ý', 'Chưa biết'… (muốn nhấn thì dùng font-weight/eyebrow riêng).
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 11. Vocabulary/root-atlas.html:31 (guide) + :4 (DATA id 22)
- **What:** Văn bản học lộ dấu vết quy trình biên soạn nội bộ ở 2 chỗ: 'Biên soạn từ 82 mục trong tệp bạn gửi…' và ghi chú gốc lev kết thúc '…Ghi chú phủ nhận quan hệ gốc trong bản gửi đã được sửa.' — 'tệp bạn gửi'/'bản gửi' vô nghĩa với người học cuối
- **Severity:** medium — **Status:** verified
- **Evidence:** root-atlas.html:31 `Biên soạn từ 82 mục trong tệp bạn gửi và hình “List of root words”`; DATA dòng 4, id 22 lev, tail note `…Ghi chú phủ nhận quan hệ gốc trong bản gửi đã được sửa.` (đọc trực tiếp + n
- **Gợi ý sửa:** Viết lại theo góc người học, ví dụ 'Biên soạn từ danh sách gốc từ phổ biến, đối chiếu Etymonline'.
- **Nguồn:** Vocabulary/root-atlas.html

### 12. Vocabulary/toeic-600.js:99,101,164,223
- **What:** partOfSpeech hiển thị nguyên mã Anh ('n', 'phr.v.', 'n.phr', 'v/n') ở meta '/ipa/ · n', badge và hint mà không Việt hóa, trong khi data còn không nhất quán 'phr.v.' vs 'phr.v' — người mới khó hiểu và UI hiện 2 ký hiệu cho cùng một loại từ.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã xác minh + CHỈNH của tôi: bỏ cite :219 trong where gốc (dòng 219 là hint choice '/ipa/ · Chọn nghĩa phù hợp nhất', không chứa POS) và thay bằng :223 (hint spelling/dictation có entry.partOfSpeech);
- **Gợi ý sửa:** Map mã POS sang nhãn Việt ('danh từ', 'cụm động từ'…) và chuẩn hóa 1 ký hiệu trong data.
- **Nguồn:** Vocabulary/toeic-600.html

### 13. Vocabulary/vocabulary-atlas.html:6,39,66,68,71,72
- **What:** 8 nhãn badge + 1 eyebrow viết HOA toàn bộ bằng tiếng Việt có dấu ('FLASHCARD', 'TẬP VIẾT', 'LUYỆN CHỦ ĐỘNG', 'CÂU TỰ DO', 'DỊCH CÂU', 'GHÉP CẮP', 'KIỂM TRA TRÙNG LẶP', '20 PHÚT MỖI PHIÊN', eyebrow 'ENGLISH STUDY / BỐN BỘ · MỘT THƯ VIỆN') —
- **Severity:** low — **Status:** verified
- **Evidence:** Đã chỉnh số lượng 7→8 badge: bản gốc bỏ sót FLASHCARD (:39) và CÂU TỰ DO (:66). Các dòng khớp: :39 `tab==='flash'?'FLASHCARD':tab==='write'?'TẬP VIẾT':'LUYỆN CHỦ ĐỘNG'`; :66 `${translation?'DỊCH CÂU':
- **Gợi ý sửa:** Chuyển sang viết hoa thường tự nhiên; letter-spacing và nền nhạt của .badge đã đủ tạo chất 'nhãn' không cần HOA.
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 14. Vocabulary/vocabulary-reading-translation-v1-6.html:417
- **What:** Nhãn chế độ quiz viết HOA toàn bộ: 'DỊCH ANH → VIỆT', 'DỊCH VIỆT → ANH', 'ĐIỀN TỪ/CỤM VÀO NGỮ CẢNH' — không khớp quy ước sentence case của phần còn lại trang.
- **Severity:** low — **Status:** verified
- **Evidence:** grep -o "label='[^']*'" → đúng 3 nhãn HOA tại :417; các nhãn khác (:97) dùng chữ thường có dấu: '1 · Đọc hiểu', '2 · Anh → Việt', '3 · Việt → Anh'.
- **Gợi ý sửa:** Viết thường kiểu câu: 'Dịch Anh → Việt', 'Điền từ/cụm vào ngữ cảnh'.
- **Nguồn:** Vocabulary/vocabulary-reading-translation-v1-6.html

### 15. assets/learning/vocabulary-rounds-app.js:34
- **What:** Lỗi dấu câu trong copy trang Hôm nay: "Mỗi mục giữ nhãn gốc. ví dụ và thông tin đối chiếu." — dấu chấm thay cho dấu phẩy rồi chữ "ví dụ" viết thường. (Số liệu 4.205 mục / 36 chủ đề đã kiểm chứng đúng: 2.646 V3 + 1.559 V4, 18+18 nhóm.)
- **Severity:** low — **Status:** verified
- **Evidence:** app.js:34 "Giữ 4.205 dòng dữ liệu trong 4.205 mục học và 36 chủ đề. Mỗi mục giữ nhãn gốc. ví dụ và thông tin đối chiếu." (bản đúng ở progressPage app.js:78: "nhãn gốc, ví dụ và thông tin đối chiếu");
- **Gợi ý sửa:** Sửa thành "Mỗi mục giữ nhãn gốc, ví dụ và thông tin đối chiếu."
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 16. Vocabulary/vong-5-6-vocabulary-complete-examples.html:5
- **What:** Câu trạng thái dự phòng dùng thuật ngữ kỹ thuật "runtime chung" mà người học không hiểu, và không hướng dẫn phải làm gì nếu trang không tự chuyển.
- **Severity:** low — **Status:** verified
- **Evidence:** Đã tái hiện khi đọc lại file: dòng 5 đúng nguyên văn "<p>Đang mở bài học dùng runtime chung. <a href="vocabulary-practice.html?set=vong-5-6">Mở Vòng 5–6 · Vocabulary Atlas</a>.</p>"; tôi cũng đã đọc v
- **Gợi ý sửa:** Viết lại theo lời người học kèm chỉ dẫn, ví dụ: "Đang chuyển tới bài học… Nếu trang không tự mở, hãy bấm vào liên kết bên dưới." (nếu sửa th
- **Nguồn:** Vocabulary/vong-5-6-vocabulary-complete-examples.html

### 17. Writing/guide.html:106
- **What:** Footer nguồn biên soạn trích tên file nội bộ vô nghĩa với người học: "Pasted markdown(6).md" — tên artifact của quá trình dán tài liệu, không phải nguồn thật (trái nguyên tắc provenance rõ ràng, CONTEXT.md:149).
- **Severity:** medium — **Status:** verified
- **Evidence:** guide.html:106 `nội dung hướng dẫn người dùng cung cấp trong “Pasted markdown(6).md”, “how-to-write-fce-essay3.pdf” .` (đối chiếu trực tiếp dòng 106); CONTEXT.md:149 '- Keep source attribution when ad
- **Gợi ý sửa:** Đặt tên thật của tài liệu gốc (hoặc mô tả 'tài liệu FCE B2 do người dùng cung cấp') thay cho 'Pasted markdown(6).md'.
- **Nguồn:** Writing/guide.html

### 18. Writing/guide.html:8,23,33,113,120
- **What:** Tên sản phẩm không nhất quán trong cùng một trang: <title> (dòng 8) và sidebar brand (dòng 23) gọi 'Essay Guide' (2 lần), còn breadcrumb tĩnh (dòng 33) và script observer (dòng 120) gọi 'Essay Lab' (2 lần), key lưu trữ là 'essay-lab-v1' (dò
- **Severity:** low — **Status:** verified
- **Evidence:** grep -o 'Essay Guide' = 2 (dòng 8, 23), grep -o 'Essay Lab' = 2 (dòng 33, 120 — dòng 120: `$('#crumb').textContent='Essay Lab / '+…`), grep -o 'essay-lab-v1' = 1 (dòng 113). ĐÃ CHỈNH where: bản gốc gh
- **Gợi ý sửa:** Chọn một tên hiển thị duy nhất (key localStorage giữ nguyên vì đã lưu tiến độ người dùng).
- **Nguồn:** Writing/guide.html

### 19. Writing/guide.html:99
- **What:** FINDING BỔ SUNG (phát hiện khi đọc lại): placeholder ô viết Essay chứa chuỗi '\\n\\n' đen — HTML không diễn giải escape \n trong attribute nên người học thấy nguyên văn 'Bắt đầu viết Essay bằng tiếng Anh…\n\nMỗi đoạn cách nhau bằng một dòng t
- **Severity:** low — **Status:** verified
- **Evidence:** grep -noE 'placeholder="[^"]*"' Writing/guide.html → dòng 99: `placeholder="Bắt đầu viết Essay bằng tiếng Anh…\n\nMỗi đoạn cách nhau bằng một dòng trống."`; sed -n '99p' | grep -c 'tiếng Anh…\\n\\n' =
- **Gợi ý sửa:** Thay \n\n bằng dấu xuống dòng thật (&#10; hoặc ký tự newline trong attribute) hoặc tách thành câu nhắc không cần ngắt dòng.
- **Nguồn:** Writing/guide.html

### 20. Writing/meaning-to-english-pipeline-v1-6.html:218
- **What:** Hai thông báo lỗi chỉ nêu "cái gì" xảy ra mà không gợi ý cách xử lý: "Không có mục nào khớp bộ lọc." (218) và "Không thể lưu tiến độ trên thiết bị này." (159) đều để người dùng tự đo nguyên nhân/hệ quả (VD: tiến độ buổi này có bị lưu không?
- **Severity:** low — **Status:** verified
- **Evidence:** Tái hiện: dòng 218: toast("Không có mục nào khớp bộ lọc."); dòng 159: nhánh catch của saveMemory → toast("Không thể lưu tiến độ trên thiết bị này.") — tôi đọc trực tiếp cả 2 dòng; grep -i 'why|how to|
- **Gợi ý sửa:** Bổ sung hướng xử lý (VD "thử xóa bớt bộ lọc hoặc chọn thêm vòng"; "tiến độ buổi này có thể không được lưu — kiểm tra chế độ riêng tư của trì
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

### 21. Vocabulary/personal-flashcards.html (1440×900)
- **What:** Nhãn trạng thái tiếng Anh dưới nút "Bắt đầu flashcards →" sai số nhiều khi còn 1 thẻ: "1 cards ready for this mode."
- **Severity:** low — **Status:** verified
- **Evidence:** Ảnh evidence/pf-flash-1440.png sau khi tạo bộ 3 thẻ và chọn mode EN → VI (chỉ 1 thẻ có nghĩa): dòng chữ "1 cards ready for this mode." hiển thị ngay dưới nút.
- **Gợi ý sửa:** Dùng số nhiều có điều kiện: "1 card ready…" / "N cards ready…".
- **Nguồn:** trình duyệt

## perf (7 finding)

### 1. Vocabulary/ielts-hiking-modern.js:52
- **What:** Trong phiên chính tả đang chạy, snapshot() ghi localStorage mỗi giây (JSON.stringify toàn state + setItem) — ghi đĩa không cần thiết 60 lần/phút trong lúc người học chưa trả lời (interval dừng đếm khi answered hoặc document.hidden, chạy cả
- **Severity:** low — **Status:** verified
- **Evidence:** js:52 `timer=setInterval(()=>{if(answered||document.hidden)return;...snapshot()},1000)`; js:44 snapshot() luôn gọi save(); js:16 save() → persistence.commit; persistence.js:15-16 commit() làm `storage
- **Gợi ý sửa:** Chỉ commit khi có sự kiện thực (check/hint/pause/next) và lưu elapsed khi pause hoặc visibilitychange.
- **Nguồn:** Vocabulary/ielts_hiking_collocations_full_with_dictation.html

### 2. Vocabulary/root-atlas.html:35,36
- **What:** Mỗi phím gõ trong ô ghi chú ghi toàn bộ state xuống localStorage và vẽ lại #stats, mỗi phím trong ô tìm kiếm rebuild innerHTML cả lưới tới 116 thẻ — không có debounce.
- **Severity:** low — **Status:** verified
- **Evidence:** root-atlas.html:35 `item(e.target.dataset.note).note=e.target.value;save()` — save() (:8) gọi persistence.commit + stats() mỗi phím; :36 `$('#search').addEventListener('input',render)` với library() (
- **Gợi ý sửa:** Debounce ~200-300ms cho search và ghi chú trước khi render/save.
- **Nguồn:** Vocabulary/root-atlas.html

### 3. Vocabulary/toeic-600.js:289 (input listener) → 107-111 + 93-105
- **What:** Mỗi keystroke trong ô tìm kiếm rebuild chuỗi HTML đầy đủ của tối đa 600 thẻ (mỗi thẻ kèm entry-detail ẩn với examples, collocations, word family) không có debounce hay giới hạn số thẻ render — dễ giật trên máy/mobile yếu.
- **Severity:** medium — **Status:** verified
- **Evidence:** Đã xác minh từ code: toeic-600.js:289 "$('#search').addEventListener('input', renderLibrary)"; renderLibrary (:110) gán lại toàn bộ innerHTML; cardMarkup (:93-105) nhét entry-detail ẩn đầy đủ (example
- **Gợi ý sửa:** Debounce ~150ms hoặc render 50–100 thẻ đầu + nút 'Xem thêm'.
- **Nguồn:** Vocabulary/toeic-600.html

### 4. Vocabulary/vocabulary-atlas.html:8
- **What:** Toàn bộ 966 mục dữ liệu nằm trên MỘT dòng 913.888 ký tự và ~79 dòng logic app được nhúng inline trong HTML 1,04MB — mỗi lượt mở tải lại toàn bộ không tách được phần dữ liệu ra cache, và file gần như không thể diff/review.
- **Severity:** medium — **Status:** verified
- **Evidence:** Tự đo lại: `awk 'NR==8{print length($0)}'` = 913888; `wc -c` = 1038813 bytes. Đã chỉnh chi tiết: logic app thực tế trải dòng 9–87 (79 dòng, khớp '~79 dòng'), thẻ </script> đóng ở dòng 89, skin js ở dò
- **Gợi ý sửa:** Tách DATA ra file riêng (ví dụ vocabulary-atlas-data.js?v=…) để trình duyệt cache phần dữ liệu, giữ nguyên kiểu thẻ script thường cho hostin
- **Nguồn:** Vocabulary/vocabulary-atlas.html

### 5. assets/learning/vocabulary-rounds-app.js:51
- **What:** Trong phiên đang chạy (mọi loại trừ flashcard, kể cả quiz không giới hạn thời gian), save() JSON.stringify toàn bộ state vào localStorage mỗi giây (setInterval 1s) và mỗi keystroke vào ô trả lời/ghi chú/bản nháp cũng gọi save() — ghi đĩa li
- **Severity:** low — **Status:** verified
- **Evidence:** app:51 'timer=setInterval(()=>{…save()},1000)'; app:85 input handler gọi save() cho #typed, textarea ghi chú (data-note) và bản nháp (data-draft). Đã chỉnh phạm vi so với bản gốc ('phiên quiz giới hạn
- **Gợi ý sửa:** Debounce việc lưu (500ms–1s) hoặc chỉ commit khi trạng thái câu đổi (answered/revealed/next).
- **Nguồn:** Vocabulary/vocabulary-practice.html

### 6. assets/learning/vocabulary-rounds-app.js:19
- **What:** save() chạy stats() mỗi lần lưu, mà tick() gọi save() mỗi giây (dòng 51) và listener input gọi save() từng lần gõ phím (dòng 85) — stats() dựng Set trên 4205 mục + map + 4 lần filter + ghi innerHTML, vào một element #stats bị display:none b
- **Severity:** medium — **Status:** verified
- **Evidence:** app.js:19 "function save(){...stats()}"; app.js:22 "new Set(DATA.map(d=>d.w)).size" trong stats(); app.js:51 tick() setInterval gọi save() mỗi 1000ms; app.js:85 input handler "q().input=e.target.value
- **Gợi ý sửa:** Tách stats() khỏi save() và chỉ chạy khi tab hiển thị stats, hoặc bỏ hẳn vì element đã ẩn.
- **Nguồn:** Vocabulary/vong-3-4-vocabulary-complete-examples.html

### 7. Writing/meaning-to-english-pipeline-v1-6.html:140
- **What:** Toàn bộ kho 6.784 mục (~1,33MB, một dòng 1.315.344 ký tự; cả file 1.463.091 byte) nằm inline trong <script> của HTML, khiến mỗi lượt truy cập phải tải và parse lại toàn bộ, không cache riêng được; quy ước repo đã tách script dùng chung kèm
- **Severity:** low — **Status:** verified
- **Evidence:** Tái hiện: tôi chạy awk 'NR==140{print length($0)}' → 1315344; ls -la → 1463091 byte; grep '<script src' trên trang → 0 hit; Vocabulary/vocabulary-reading-translation-v1-6.html:425 đọc trực tiếp: "<scr
- **Gợi ý sửa:** Tách RAW_ITEMS thành file .js riêng (VD Writing/pipeline-data.js?v=…) để trình duyệt cache độc lập với HTML.
- **Nguồn:** Writing/meaning-to-english-pipeline-v1-6.html

## Chưa kiểm tra

Phần kiểm tra bằng trình duyệt không kiểm được các điểm sau:

- Các nút phát âm TTS (♫ Nghe, 🔊 L, "Tự phát âm") trên Vocabulary Atlas và Personal Flashcards: không bấm vì sẽ phát âm thanh trong môi trường kiểm thử; chỉ xác nhận nút tồn tại và không chồng lấn (trừ các finding đã nêu).
- Nút tải file ("Tải .txt" trên Writing/guide.html, "Export JSON" trên personal-flashcards.html): không bấm để tránh tải file về máy; chưa xác minh nội dung file tải.
- viewer.html với tài liệu PDF/DOCX trong iframe: chỉ kiểm tra được tài liệu HTML (viewer.html?id=personal-flashcards); không có file PDF/DOCX được thử.
- Cảm ứng thật (tap, cuộn động, bàn phím ảo): môi trường chỉ resize viewport 390×844, không giả lập được thiết bị cảm ứng.
- Chỉ kiểm tra trên Chromium của Playwright MCP; Safari/Firefox và dark mode của hệ điều hành không kiểm tra.
- Lưu ý: trang Vocabulary/vong-1-2-vocabulary-complete-examples.html tự chuyển hướng tới Vocabulary/vocabulary-practice.html?set=vong-1-2 (hành vi đăng ký catalogue, mọi đo trên trang này áp dụng cho URL đích).

