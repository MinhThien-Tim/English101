# Báo cáo tổng hợp — English101

**Ngày:** 2026-10-26 · **HEAD:** `9fb7a1f` *("gitleaks update", 20:42)*
**Trạng thái:** đã dừng mọi ghi từ 22:31. Đợt build trong phạm vi đã chốt **đã xong** (mục 11). Chưa commit gì.

---

## 1. Tóm tắt một phút

Năm lớp tài liệu đã được tạo trong phiên làm việc này: một brief sản phẩm (`PRODUCT.md`), một hệ thống thiết kế (`DESIGN.md` + `.impeccable/design.json`), một critique trang chủ (24/40) và một audit kỹ thuật rộng hơn (12/20). Hai báo cáo sau được chạy trên **hai trạng thái cây file khác nhau**, nên không so sánh điểm trực tiếp với nhau được.

Song song đó, một phiên thứ hai chạy `/impeccable distill` trên cùng repo và ghi vào `index.html`, `script.js`, `style.css`. Không có xung đột dữ liệu nào xảy ra vì tôi dừng ghi trước khi chỉnh sửa, nhưng đây là rủi ro đã được xử lý bằng snapshot + một người ghi tại một thời điểm.

Đợt build sau đó đã chạy trong phạm vi **portal + shared layer + một fix Suffix Lab**: sửa accessibility cấu trúc, contrast, và tính trung thực của library. Kết quả ở mục 11.

---

## 2. Trạng thái hiện tại (đã kiểm tra)

| Hạng mục | Kết quả |
|---|---|
| File tracked bị sửa | `index.html`, `script.js`, `style.css`, `Grammar/english-suffix-lab.html` — gồm lượt distill của phiên kia **và** đợt build ở mục 11 |
| File chưa track | `PRODUCT.md`, `DESIGN.md`, `docs/`, `.impeccable/` (`tmp/` đã xoá) |
| Test suite | **51/51 pass** (`node --test tests/learning/*.test.js tests/catalogue.test.js`) |
| Catalogue | 29 Resource, 29 ID duy nhất, 6 category |
| Lần ghi cuối | `style.css` 22:31:04 · `index.html` 22:26:13 · `script.js` 22:08:06 · `Grammar/english-suffix-lab.html` 22:02:26 |
| Đồng bộ tài liệu | 11/11 token màu trong `DESIGN.md` khớp `style.css` |
| Snapshot an toàn | `C:\Users\Admin\AppData\Local\Temp\opencode\english101-snapshot-20261026-215154` |

Snapshot chụp **trước** đợt build, chứa 3 file khi đó + `DESIGN.md`, `PRODUCT.md`, `.impeccable/`; hash đã đối chiếu khớp. Dùng để khôi phục nếu cần quay lại trạng thái 21:51.

Bảng này mô tả trạng thái **sau** đợt build. Phần lịch sử trước đó nằm ở mục 3.

---

## 3. Sự cố chồng lấn

| Thời điểm | Việc xảy ra |
|---|---|
| 21:16 | `DESIGN.md` + `design.json` hoàn tất |
| 21:37 | Critique `index.html` hoàn tất, ghi vào `.impeccable/critique/` |
| 21:40:02 | `index.html` bị sửa (không phải tôi): xoá hero glow, card "12 day streak", orbit, floating letter, 4 kicker, 2 lede, wrapper của About |
| 21:40:27 → 21:50:05 | `script.js` và `style.css` bị sửa nhiều lượt; `tmp/distill-frame.html` xuất hiện |
| 21:51 | Tôi phát hiện, dừng ghi, chụp snapshot, báo xung đột |
| 21:52 | Subagent audit `ses_e876b2bd…` bị **cancel** — nó dừng giữa chừng nhưng để lại cây file nhất quán |
| 22:02:26 → 22:31:04 | Ghi xen kẽ: đợt build của tôi (`Grammar/…-suffix-lab.html` 22:02, `script.js` 22:08) và phiên distill hoàn tất (`index.html` 22:26, `style.css` 22:31) |
| 22:52 | Chốt trạng thái: đọc lại toàn bộ marker, chạy lại test, verify trên browser |

**Đính chính nhận định ban đầu của tôi:** đây không phải file hỏng. Đó là một lượt `/impeccable distill` có chủ đích và **tự nhất quán**: 0 tham chiếu `class="kicker"` còn trong HTML, 0 rule `.kicker` trong CSS, `.about-card` vẫn đúng 3 cột. Điểm đáng lưu ý duy nhất là nó xoá luôn hai đoạn lede đã viết (topics, blog) và kicker "Study smarter" của About.

**Subagent bị cancel** không để lại rác: nó đã kịp ghi `.document-grid .document-card{min-height:424px}`, đổi blog thành `grid-template-columns:minmax(0,820px)` với card nằm ngang, và cập nhật prose tương ứng trong `DESIGN.md`. Ba thay đổi đó khớp nhau và đã được verify sau khi cancel (xem mục 11).

**Hệ quả với tài liệu:** `DESIGN.md` từng được viết *trước* lượt distill, nên lệch code ở 5 chỗ. Cả 5 đã được sửa trong đợt build — chi tiết ở mục 6.

---

## 4. Năm lớp tài liệu đã tạo

| Tệp | Loại | Phạm vi | Dùng khi nào |
|---|---|---|---|
| `PRODUCT.md` | Brief sản phẩm | Người dùng, mục đích, positioning, ràng buộc, nguyên tắc | Mọi quyết định sản phẩm; nguồn cho "không bịa số liệu" |
| `DESIGN.md` | Hệ thống thiết kế | 36 màu, 7 vai trò chữ, radius/spacing, 10 nhóm component, 7 rule | Mọi thay đổi UI; đã đồng bộ với code |
| `.impeccable/design.json` | Sidecar | 8 component drop-in, 35 tonal ramp OKLCH, 10 shadow, motion, breakpoints | Khi cần dựng lại component đúng chuẩn |
| `.impeccable/critique/2026-10-26T14-37-15Z__index-html.md` | Critique | `index.html` @1440/390, 24/40 | Ưu tiên UX trang chủ |
| Audit (phiên thứ ba, trong hội thoại) | Audit kỹ thuật | Portal + shared layer + 2 lesson, 12/20 | Ưu tiên kỹ thuật, accessibility, perf |

**Cảnh báo so sánh:** critique và audit chạy trên cây file trước distill; audit còn trích `index.html:50` cho card streak — dòng đó giờ không còn. Điểm 24/40 và 12/20 mô tả **thiết kế trước distill**, không phải trạng thái hiện tại.

---

## 5. Những gì tôi đã tự xác minh

Không chép lại lời subagent. Cột "Kết luận" là kết quả kiểm tra độc lập của tôi.

| # | Khẳng định | Kết luận | Bằng chứng |
|---|---|---|---|
| 1 | Catalogue 29 Resource / 6 category | ✅ đúng | đếm từ `data/documents.js`, 29 ID duy nhất |
| 2 | Library mặc định lọc "Vocabulary" | ✅ đúng (trước distill) | `script.js` HEAD: `state = { category: "Vocabulary" }` |
| 3 | Quick index bịa thời lượng & level | ✅ đúng | `minutes = 12 + (index % 5) * 6`; level theo `index % 3` |
| 4 | Hero card "12 day streak · 84% complete" | ✅ đúng (trước distill) | có trong HEAD; đã bị distill xoá |
| 5 | Search chỉ phản hồi khi Enter | ✅ đúng | handler `input` chỉ render khi query rỗng |
| 6 | Drawer không có dialog semantics | ✅ đúng | `<aside aria-hidden>`; không `role="dialog"`, không trap, không restore focus |
| 7 | Launcher ở ≤600px chỉ còn glyph, không `aria-label` | ✅ đúng | CSS ẩn `span:nth-child(2)` và `>i`; button không có `aria-label` |
| 8 | `#doc-count` hardcode 23 | ✅ đúng | `index.html` viết 23, script sửa thành 29 |
| 9 | Trắng trên coral 2.82:1 | ✅ đúng | tự tính: 2.82 |
| 10 | Category label 2.91:1 | ✅ đúng | `#9098a5` trên trắng: 2.91 |
| 11 | Copyright 4.14:1 | ✅ đúng | `#697588` trên `#080e18`: 4.14 |
| 12 | Drawer meta 3.10:1 | ✅ đúng | `#87918e` trên `#f8faf9`: 3.10 |
| 13 | "Chip Tất cả 3.5:1" | ⚠️ không tái lập được | text chip `#5b6473` trên trắng = **5.97**; phần 2.40 là count span |
| 14 | Card 424px trong DESIGN.md vs 365px trong CSS | ✅ đúng lúc audit | `DESIGN.md:238,294` vs `.document-grid .document-card{min-height:365px}`. Sau build cả hai đều **424px** |
| 15 | `assets/ui/dialog.js` đã tồn tại | ✅ đúng | file có thật — portal đang tự viết lại modal |
| 16 | Lesson ghép tải ~8 MB trước khi render | ✅ đúng | 1.13 + 4.65 + 2.06 = **7.84 MB** |
| 17 | Suffix Lab flip card không có focus indicator | ✅ đúng | `.study-card{...outline:none}`, không có rule `:focus` |
| 18 | 51/51 test pass | ✅ đúng | chạy lại trên cây hiện tại |
| 19 | Screenshot/shadow-root render, Lighthouse | ⚠️ chưa kiểm lại | do subagent chạy; tôi không render lại |

---

## 6. Tài liệu lệch với code — **đã xử lý**

`DESIGN.md` từng mô tả trạng thái trước distill. Cả 5 điểm lệch đã được sửa trong đợt build:

| # | Lệch ban đầu | Cách xử lý | Trạng thái |
|---|---|---|---|
| 1 | Doc bắt buộc kicker 12px tracking .17em trên mọi heading; code còn **0** rule `.kicker` | Chốt giữ bản distill; bỏ yêu cầu kicker, sửa cả mục Hierarchy và Label | ✅ hết lệch |
| 2 | Doc ghi "hai word card nghiêng"; code còn **một** | Sửa prose thành một card | ✅ hết lệch |
| 3 | `.hero-glow`, `.orbit`, `.floating-letter` đã bị xoá khỏi CSS nhưng còn trong doc | Xoá khỏi doc theo code | ✅ hết lệch |
| 4 | Card 424px (doc) vs 365px (CSS) | Code đổi thành **424px** (distill/subagent), doc giữ 424 | ✅ khớp |
| 5 | Button primary doc ghi `#ff6b4a` + chữ trắng — cặp 2.82:1 | Thêm token `coral-strong:#c9431f`, CTA dùng token này, doc trỏ `{colors.coral-strong}` | ✅ 4.88:1 |

Kiểm tra lại sau khi sửa: **11/11 token** so sánh được giữa `DESIGN.md` và `style.css` đều MATCH (`primary`, `coral-strong`, `navy`, `paper`, `ink`, 6 topic accent). Không còn chuỗi cũ nào trong doc (`424px` giờ là giá trị đúng; "Always preceded by" và "two rotated glass" đã biến mất).

**Còn lại:** `.impeccable/design.json` vẫn cũ so với `DESIGN.md` — cần regenerate trước khi dùng lại để dựng component. Không ảnh hưởng site đang chạy.

---

## 7. Vấn đề hợp nhất (đã gộp trùng)

Hai báo cáo trùng nhau ở 5 điểm; bảng dưới đã gộp và xếp theo mức tác động.

| ID | Vấn đề | Nguồn | File | Mức |
|---|---|---|---|---|
| A1 | Search không có focus indicator | critique + audit | `style.css` | **P1** |
| A2 | Launcher mobile không có accessible name | critique + audit | `index.html`, CSS | **P1** |
| A3 | Drawer thiếu dialog semantics, trap, restore focus | critique + audit | `index.html`, `script.js` | **P1** |
| A4 | Contrast hệ thống < 4.5:1 (≈50 node) | critique + audit | `style.css` | **P1** |
| A5 | Flip card Suffix Lab không có focus ring | audit | `Grammar/english-suffix-lab.html` | **P1** |
| B1 | Library mặc định lọc + shelf/chip lệch trạng thái | critique | `script.js` | **P1** |
| B2 | Metadata bịa (streak, phút, level) | critique + audit | `script.js`, `index.html` | **P1** |
| C1 | Launcher che nội dung ở 360px | critique + audit | `style.css` | P2 |
| C2 | Gear phát âm đè nút "Tập trung" trên lesson từ vựng | audit | `ielts-vocabulary-focus.css` | P2 |
| C3 | Chip filter không có `aria-pressed` | audit | `script.js` | P2 |
| C4 | Re-render làm mất focus | audit | `script.js` | P2 |
| C5 | Target chạm < 44px trong drawer/footer | audit | CSS | P2 |
| D1 | 7.84 MB JS tải trước khi render | audit | `vocabulary-rounds-bootstrap.js` | P2 |
| D2 | Ba hệ token song song + 231 hex literal | audit | 4 stylesheet | P2 |
| D3 | Dead CSS (grid 5 cột, `.topic-icon` định nghĩa 2 lần) | audit | `style.css` | P2 |
| E1 | Brand link `aria-label` lệch visible text | audit | `index.html` | P2 |
| E2 | Quick-search label chỉ có glyph | audit | `index.html` | P2 |
| E3 | `#doc-count` hardcode 23 | audit + critique | `index.html` | P3 |
| E4 | 9–10px label chức năng | cả hai | CSS | P3 |

**Không đưa vào build lần này:** 27 Resource còn lại, PDF assets, Safari/Firefox, screen reader thật, drag surface.

---

## 8. Kế hoạch build theo lô

Mỗi lô là một đơn vị ghi độc quyền. Không mở lô sau khi lô trước chưa verify.

> **Trạng thái:** Lô 0, 1 (trừ E1), 2 và 3 đã chạy — kết quả ở mục 11. Lô 4–6 còn lại.

**Lô 0 — Chốt nền (làm ngay, ~10 phút)** — ✅ xong
- Xoá `tmp/distill-frame.html` (rác chưa track).
- Chốt: giữ distill hay hoàn lại lede/kicker.
- Chốt người ghi cho `script.js` và `style.css`.

**Lô 1 — Accessibility cấu trúc (A1, A2, A3, A5, E1, E2)** — ✅ xong, trừ E1
- Search: `:focus-within` ring trên shell, navy 3px.
- Launcher: `aria-label="Mục lục bài học"`, giữ `aria-expanded`.
- Drawer: ưu tiên tái dùng `assets/ui/dialog.js` (đã có focus restore) thay vì viết lại; nếu giữ `<aside>` thì thêm `role="dialog"`, `aria-modal`, `inert` cho nền, vòng Tab, restore focus về launcher.
- Suffix Lab: `:focus-visible` 3px Focus Gold cho `.study-card`.
- Brand link: bỏ `aria-label`, thêm text ẩn "Trang chủ". — **chưa làm (E1), ngoài phạm vi đợt này**
- Quick-search: `aria-label="Tìm bài học"`, glyph `aria-hidden`.
- **Verify:** Tab từ đầu trang không rơi focus; Escape trả focus về launcher; test 51/51.

**Lô 2 — Contrast (A4)** — ✅ xong
- Đổi một lần ở token, không vá từng component.
- Ứng viên đã tính: CTA cần `#c9431f` (4.88:1) trở xuống; label dùng `--muted` `#647084` (5.01:1); chip count `#6f7784` (4.52:1); drawer meta `#5f6b67` (5.29:1) và nâng lên 11px.
- **Verify:** đo lại từng cặp đã sửa, không chỉ tin token.

**Lô 3 — Sự thật của library (B1, B2, E3)** — ✅ xong
- Default `All`; một hàm `setLibraryState()` duy nhất cho shelf + chip + search + clear.
- Xoá `minutes`/`level` khỏi quick item.
- `#doc-count` render từ catalogue hoặc viết đúng 29.
- **Verify:** shelf và chip luôn khớp sau 4 đường: click shelf, click chip, submit search, xoá lọc.

**Lô 4 — Mobile chrome (C1, C2, C5)**
- Chừa gutter đáy cho launcher; xếp lại cụm phát âm (gear `bottom:72`, shortcut `bottom:126`).
- Target 44px trong drawer/footer.
- **Verify:** 360 và 390, đo `scrollWidth === innerWidth`, không phần tử fixed nào đè action.

**Lô 5 — Hiệu năng & token (D1, D2, D3)**
- Lazy-load `vong-3-4`, `vong-5-6`; tối thiểu nạp song song.
- Gom token về `assets/styles/tokens.css`; xoá block CSS cũ (kiểm tra từng selector không còn consumer).
- **Verify:** 51/51 + đo payload trang ghép.

**Lô 6 — Đồng bộ tài liệu**
- Cập nhật `DESIGN.md` (kicker, hero, 424/365, button contrast), regenerate `design.json`.
- Chạy lại critique/audit để có điểm sau sửa.

---

## 9. Quyết định đã chốt

| # | Vấn đề | Chốt |
|---|---|---|
| 1 | **Distill:** giữ bản đã distill hay hoàn lại lede/kicker? | **Giữ nguyên** — chấp nhận mất 2 lede + 3 kicker, đổi lại trang gọn hơn; `DESIGN.md` sửa theo |
| 2 | **Contrast:** token toàn cục hay chỉ portal? | **Chỉ portal** — không đụng diện mạo lesson ngoài phạm vi đã review |
| 3 | **Phạm vi:** portal + shared, hay mở sang lesson? | **Portal + shared + đúng một fix A5** (focus ring Suffix Lab) |

Ba quyết định này khép lại phần tranh luận; kết quả thực thi ở mục 11. Các mục còn treo (44px target, 7.84 MB payload, ba hệ token, dead CSS) cần một lần chốt mới trước khi làm.

---

## 10. Phụ lục

**Kiểm tra:**
```bash
node --test tests/learning/*.test.js tests/catalogue.test.js
python -m http.server 8000   # chỉ khi cần kiểm tra browser
```

**Khôi phục nếu có sự cố ghi đè:**
```bash
git checkout -- index.html script.js style.css Grammar/english-suffix-lab.html   # về HEAD 9fb7a1f
# hoặc từ snapshot (trạng thái 21:51, trước build):
# C:\Users\Admin\AppData\Local\Temp\opencode\english101-snapshot-20261026-215154
```

**Không nên làm trong đợt này:** refactor toàn repo, migrate 27 Resource còn lại, đổi schema storage, thêm build step.

---

## 11. Kết quả build

**Phạm vi đã chốt:** portal + shared layer + A5. Giữ nguyên bản distill; contrast chỉ sửa ở portal.

### Đã thay đổi

| File | Nội dung |
|---|---|
| `index.html` | `aria-label` cho launcher; `role="dialog"`, `aria-modal`, `aria-labelledby` cho drawer; `aria-label` cho ô tìm bài học, glyph `aria-hidden`; `#doc-count` 23 → 29 |
| `script.js` | `state`/`quickState` mặc định `All`; hàm `setLibraryState()` duy nhất cho shelf + chip + search + clear; `aria-pressed` cho cả hai dải chip; xoá `minutes`/`level` bịa; drawer có `inert` nền, trap Tab, restore focus về launcher; Escape chỉ đóng khi drawer mở |
| `style.css` | `--coral-strong:#c9431f` cho CTA; 4 accent topic tối lại; label/chip/copyright/drawer meta đạt ≥4.5:1; ring focus vàng cho portal; chữ chức năng 9px → 11px |
| `Grammar/english-suffix-lab.html` | `.study-card:focus-visible` 3px |
| `DESIGN.md` | Đồng bộ: 36 màu, bỏ kicker, hero một card, **424px**, CTA `coral-strong`, ring focus portal |

### Đã verify trên browser

- Mặc định mở kho: **29 tài liệu**, chip "Tất cả" pressed, không shelf nào pressed.
- Bốn đường đổi trạng thái đều khớp: shelf Grammar → 6 card + chip "Ngữ pháp"; chip Tất cả → 29; search "ielts" → 2 + chip Tất cả; xoá lọc → 29.
- Drawer: mở → focus vào ô tìm, `header`/`main`/`footer` đều `inert`; Tab từ item cuối vòng về nút đóng; Escape → focus về launcher, bỏ `inert`, `aria-hidden="true"`.
- Contrast đo trên DOM thật: topic title 4.68–6.59; category label 5.01; CTA 4.88; copyright 5.51; chip count 5.81.
- Search shell: ring vàng hiện khi `:focus-within`.
- Suffix Lab: card nhận `:focus-visible` khi focus bằng bàn phím.
- 360px và 390px: `scrollWidth === innerWidth`, không tràn ngang.
- Card trong `#document-grid`: `min-height` = **424px**; blog grid = **820px** một cột, card nằm ngang (ảnh 190px + chữ).
- Console: không có message lỗi. Test: **51/51 pass**, `node --check` sạch.

### Việc của phiên khác / subagent bị cancel — giữ nguyên

Không hoàn lại, vì đã verify là nhất quán với code và tài liệu:

- Distill: bỏ kicker, hero còn một card, bỏ ornament, bỏ copy bịa.
- Subagent `ses_e876b2bd…` (cancel giữa chừng): `.document-grid .document-card{min-height:424px}`, blog thành một card ngang `minmax(0,820px)`, prose `DESIGN.md` tương ứng.
- Phiên distill: bump cache-busting `?v=20261026-distill-1` cho `style.css` và `script.js`.

### Sai lệch có chủ đích

1. **Suffix Lab dùng `#9c6f26`, không phải `#b8883f`.** Nền trang `#edf3f4` làm vàng gốc chỉ đạt 2.82:1; màu tối hơn đạt 3.97:1 với nền và 4.45:1 với card. Đã ghi vào DESIGN.md.
2. **Brand tile "E101" giữ nguyên coral.** Đây là logotype, WCAG miễn trừ yêu cầu contrast cho chữ thuộc logo; đổi màu sẽ phá nhận diện.
3. **"Tất cả" được đưa lên đầu cả hai dải chip.** Mặc định giờ là All; để cuối thì trạng thái đang chọn nằm ngoài màn hình ở 360px.
4. **Focus restore luôn về launcher**, không về phần tử active trước đó. Mở drawer bằng phím `/` hoặc click đều cho cùng hành vi, tránh trường hợp `<body>` không focus được.

### Chưa làm (nằm ngoài phạm vi đã chốt)

C1 launcher che nội dung ở 360px · C2 gear phát âm đè nút "Tập trung" · C3/C4 đã xử lý một phần (`aria-pressed` xong, giữ focus khi re-render thì chưa) · C5 target 44px · D1 7.84 MB payload · D2 ba hệ token · D3 dead CSS · E1 brand aria-label lệch visible text · E3 đã xử lý · E4 còn vài label 9–10px.

`.impeccable/design.json` vẫn cũ so với `DESIGN.md`; cần regenerate trước khi dùng lại để dựng component.

### Trạng thái git

`index.html`, `script.js`, `style.css`, `Grammar/english-suffix-lab.html` đã sửa; `PRODUCT.md`, `DESIGN.md`, `docs/report/`, `.impeccable/` chưa track. **Chưa commit.**

Phiên còn lại có bump cache-busting trong `index.html`: `style.css?v=20261026-distill-1` và `script.js?v=20261026-distill-1` (thay cho `?v=20260915-lesson-icons-1`). Thay đổi này không xung đột với đợt build; nội dung accessibility và library đều còn nguyên.
