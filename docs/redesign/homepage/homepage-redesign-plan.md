# Kế hoạch làm mới trang chủ English 101

Trạng thái: **chờ chọn hướng thiết kế** · Ngày lập: 2026-11-13
Phạm vi: chỉ `index.html`, phần dành cho trang chủ trong `style.css`, và `script.js`. Không sửa trang học liệu, trang con, `viewer.html`, `viewer.js`, `assets/learning/`, `assets/styles/`.

## 1. Bối cảnh và vấn đề (từ baseline)

Baseline: `baseline/baseline-desktop-full.jpeg` (1425×7361), `baseline-desktop-fold.jpeg` (1440×900), `baseline-mobile-top.jpeg` và `baseline-mobile-fold.jpeg` (390×844).

| # | Vấn đề quan sát được | Hệ quả |
|---|---|---|
| P1 | Kho học liệu có 29 thẻ, mỗi thẻ cao tối thiểu 424px, xếp 4 cột: khoảng 8 hàng, chiếm gần 60% chiều dài trang (~7.360px) | Khó quét và khó tìm một Resource trong vài giây (Product Principle 3) |
| P2 | "Tài liệu nổi bật" dùng chính thẻ của kho, nên mỗi tài liệu nổi bật xuất hiện 2 lần | Trùng lặp, trang dài hơn mà không thêm thông tin |
| P3 | Sáu hàng chủ đề cao ~110px mỗi hàng, chiếm gần trọn màn hình đầu tiên sau hero | Chọn chủ đề tốn một lần cuộn; nội dung mỗi hàng thưa |
| P4 | Hero cao 670px, cột phải chỉ có một thẻ từ "serendipity" mang tính trang trí | Màn hình đầu không giúp quay lại bài đang học |
| P5 | Không có lối "tiếp tục học" dù người dùng chính quay lại thường xuyên | Phải tìm lại bài mỗi lần mở site |
| P6 | Blog chỉ có 1 bài nhưng có cả một section riêng; khối About lặp lại lời hứa đã có ở hero | Thêm chiều dài, ít giá trị |
| P7 | Mobile: thanh nhảy mục cố định + nút mục lục tròn + header: ba lớp chrome cạnh tranh nhau | Giảm không gian đọc ở 390px |

## 2. Mục tiêu (MUST / SHOULD / MAY)

**MUST**
- M1. Mở được bất kỳ Resource nào trong ≤ 2 thao tác từ màn hình đầu (tìm kiếm hoặc chọn chủ đề → bấm).
- M2. Mỗi Resource chỉ hiện một lần trong luồng chính của trang (ngoại trừ ô "Tiếp tục học", nếu chọn hướng A).
- M3. Toàn bộ trang chủ ở 1440px ngắn hơn ≥ 40% so với baseline (≤ 4.400px với 29 Resource).
- M4. Giữ nguyên: Resource ID, `viewer.html?id=...`, catalogue `data/documents.js` là nguồn duy nhất, logo E101, tagline, sáu chủ đề và màu chủ đề, lời hứa "miễn phí, không đăng nhập, lưu trên thiết bị".
- M5. Không phá `viewer.html`: các lớp `viewer-*`, `primary-button` và biến `:root` trong `style.css` giữ nguyên hành vi.
- M6. 360px và 390px: không tràn ngang, không có phần tử cố định che nội dung hoặc che nút hành động.

**SHOULD**
- S1. Lối "Tiếp tục học" (hướng A) dựa trên các Resource đã mở gần đây, lưu cục bộ.
- S2. Mục lục nhanh (`/`) chuyển sang `<dialog>` gốc, bỏ focus trap/inert viết tay.
- S3. Bộ lọc chip cuộn ngang có gợi ý cuộn (fade) trên mobile.

**MAY**
- Y1. Header ẩn khi cuộn xuống, hiện khi cuộn lên.
- Y2. Sắp xếp kho theo nhóm con Từ vựng (đã có `vocabularyGroups`) ở mọi chế độ lọc.

## 3. Danh mục thành phần trang chủ và việc cần làm

| Thành phần | Hiện tại | Kế hoạch |
|---|---|---|
| Head/meta | title, description, theme-color, Google Fonts | Giữ; cập nhật `?v=` cache-bust |
| Skip link | "Đi đến kho tài liệu" | Giữ, kiểm tra chỉ hiện khi focus |
| Header + brand + nav + nút menu mobile | Phủ trên hero 88px | Thu gọn; nav theo IA mới; menu mobile giữ `aria-expanded` |
| Hero (tiêu đề, mô tả, tìm kiếm, thống kê, thẻ từ) | 670px, thẻ trang trí | Ngắn lại; tìm kiếm là hành động chính; thay thẻ trang trí theo hướng đã chọn |
| Thanh nhảy mục mobile (`.section-nav`) | Sticky dưới hero | Thay bằng chip chủ đề hoặc tab mục lục, tránh thêm một lớp sticky |
| Kệ chủ đề (6 hàng) | 6 hàng full-width | Theo hướng: một hàng 6 ô (A), tab chương (B), hoặc các bước (C) |
| Nổi bật (3 thẻ) | Lặp thẻ của kho | Bỏ trùng: đánh dấu nổi bật ngay trong kho (B) hoặc giữ 3 thẻ và loại khỏi danh sách bên dưới (A) |
| Kho học liệu: tiêu đề, đếm kết quả `aria-live`, chip lọc, lưới, nhóm Từ vựng, thẻ tài liệu (badge, nhãn chủ đề, icon, origin label, tiêu đề, mô tả, nút đọc, nút tải), trạng thái rỗng | Thẻ 424px | Thẻ/hàng gọn; giữ badge PDF/Article, nút tải cho `downloadable`, origin label "From Context Lens", trạng thái rỗng + nút xóa lọc |
| Blog | Section riêng cho 1 bài | Gộp vào kho (chủ đề Blog) hoặc một dòng "Bài viết mới" nhỏ |
| About panel | Khối charcoal lớn | Rút thành một dòng cam kết trong footer |
| Footer | Brand, mô tả, link, bản quyền | Giữ, cập nhật link theo IA |
| Mục lục nhanh (launcher + drawer + tìm + lọc + danh sách) | `aside role=dialog` + JS trap | `<dialog>` gốc + `showModal()`; giữ phím `/`, Esc, khôi phục focus |
| Sprite SVG + icon bài học | Inline | Giữ nguyên tài sản vẽ |

## 4. Ba hướng thiết kế (mockup desktop 1792×1024)

### A — "Bàn học" (khuyến nghị)
Mockup: `mockups/direction-a-study-desk-desktop-1792x1024.png`

- **Luận điểm:** trang chủ là bàn học đang dở, không phải trang quảng bá. Màn hình đầu có tìm kiếm, "Tiếp tục học" và lối vào sáu chủ đề.
- **Màn hình đầu:** band charcoal ~380px (tìm kiếm + 3 bài mở gần đây) → một hàng 6 ô chủ đề → 3 thẻ nổi bật.
- **Kho:** danh sách thẻ gọn (không còn 424px), cột lọc bên trái trên desktop, chip cuộn ngang trên mobile.
- **Rủi ro:** "Tiếp tục học" cần **một khóa `localStorage` mới** (ví dụ `english101.recentResources`, chỉ lưu ID + thời điểm). Đây là bổ sung, không đổi khóa cũ, nhưng cần bạn đồng ý. Trạng thái rỗng (chưa mở bài nào) phải có nội dung thay thế, ví dụ "Bắt đầu với Hướng dẫn học".
- **Lỗi trong ảnh mockup (không đưa vào bản dựng):** "rõ ràng hơn" bị vẽ thành "rố ràng hon", "Động từ" thành "Động tỷ"; mô tả ba thẻ nổi bật do AI bịa (ví dụ "Gốc từ Indo-Aryan") — bản dựng sẽ lấy mô tả từ catalogue; chữ "Đọc trực tiếp" đỏ cam ở cả 3 thẻ vi phạm One Lamp Rule — bản dựng chỉ tô mũi tên.

### B — "Mục lục sách"
Mockup: `mockups/direction-b-editorial-index-desktop-1792x1024.png`

- **Luận điểm:** trang chủ là mục lục của một cuốn sách đẹp; 29 Resource hiển thị dạng hàng chữ, gần như vừa trong một màn hình.
- **Màn hình đầu:** masthead charcoal ~260px với tìm kiếm → tab chủ đề → ba cột chương (Từ vựng / Ngữ pháp / Viết & Động từ), Resource nổi bật có chấm cam → cột "Chọn lọc" bên phải.
- **Ưu điểm:** tìm nhanh nhất, ngắn nhất, sát "Quiet Reading Room".
- **Rủi ro:** mất phần lớn minh họa bài học trong luồng chính; Từ vựng có 13 mục nên cột 1 dài hơn hẳn → cần chia cột theo nhóm con hoặc cân bằng lại. Mô tả trong ảnh là chữ vô nghĩa, chỉ xem bố cục.

### C — "Lộ trình truy hồi"
Mockup: `mockups/direction-c-recall-path-desktop-1792x1024.png`

- **Luận điểm:** tổ chức trang theo Recall Pipeline 6 bước (Nhận biết → Câu tự do).
- **Ưu điểm:** thể hiện rõ triết lý "practice beats passive exposure".
- **Rủi ro lớn:** cần thêm trường mới (ví dụ `stage`) cho từng Resource trong `data/documents.js` — đây là **thay đổi schema catalogue (L3)**, và nhiều Resource (PDF, Grammar handbook) không thuộc rõ một bước. Không khuyến nghị nếu chưa muốn đổi catalogue. Ảnh có lỗi "Mỗi" → "Môi".

| Tiêu chí | A Bàn học | B Mục lục | C Lộ trình |
|---|---|---|---|
| Tìm Resource trong vài giây | Tốt | Rất tốt | Trung bình |
| Quay lại bài đang học | Rất tốt | Không có | Không có |
| Giữ minh họa bài học | Có | Ít | Có |
| Thay đổi dữ liệu | +1 khóa localStorage | Không | Schema catalogue (L3) |
| Mức thay đổi | L2 | L2 | L3 |

## 5. Kiến trúc thông tin mục tiêu (hướng A)

```mermaid
flowchart TD
  H[Header: brand · Chủ đề · Tài liệu · Blog · Mục lục /] --> D
  D[Band "Bàn học": tiêu đề + Tìm kiếm + Tiếp tục học] --> T
  T[Hàng 6 chủ đề + số lượng] -->|chọn| L
  D -->|tìm| L
  T --> F[Nổi bật: 3 thẻ]
  F --> L[Kho: lọc + danh sách gọn + trạng thái rỗng]
  L --> V[viewer.html?id=...]
  D -->|Tiếp tục học| V
  L --> FT[Footer: cam kết + link Hướng dẫn học]
  H -.phím /.-> Q[Mục lục nhanh dialog] --> V
```

## 6. Trạng thái cần thiết kế

| Khu vực | Bình thường | Rỗng | Lỗi / biên |
|---|---|---|---|
| Tiếp tục học | 1–3 bài gần nhất | Chưa mở bài nào → gợi ý "English Learning 101" | ID đã lưu không còn trong catalogue → bỏ qua; `localStorage` bị chặn → ẩn khối, trang vẫn chạy |
| Tìm kiếm / lọc | Đếm kết quả `aria-live` | "Không tìm thấy tài liệu" + nút xóa bộ lọc | Truy vấn không dấu vẫn khớp (giữ `normalize` NFD) |
| Thẻ tài liệu | HTML | — | PDF có badge + nút tải; Article có badge; tiêu đề dài 2 dòng không vỡ |
| Mục lục nhanh | Mở bằng nút hoặc `/` | Không có kết quả | Esc đóng, focus trở về nút mở; `/` không kích hoạt khi đang gõ trong ô nhập |
| Font chưa tải | Fallback DM Sans → Arial không đổi bố cục đáng kể | — | — |

## 7. Tiêu chí nghiệm thu (đo được)

1. Ở 1440×900, mỗi Resource trong catalogue có đúng một liên kết `viewer.html?id=<id>` trong `main` (ngoài "Tiếp tục học").
2. `document.documentElement.scrollHeight` ở 1440px ≤ 4.400px với 29 Resource.
3. Ở 360px và 390px: `scrollWidth === clientWidth`; không phần tử `position: fixed/sticky` nào che nút "Đọc trực tiếp" của thẻ đang hiện.
4. Gõ "ngu phap" (không dấu) cho kết quả Grammar; gõ chuỗi vô nghĩa hiện trạng thái rỗng; "Xóa bộ lọc" trả về 29.
5. Chọn chủ đề cập nhật đếm, `aria-pressed`, và focus không rơi về `<body>`.
6. Mục lục nhanh: `/` mở, Esc đóng, Tab không thoát ra trang nền, focus trả về nút mở, trang nền không cuộn khi mở.
7. Tất cả control có tên truy cập và vòng focus vàng 3px nhìn thấy được; `prefers-reduced-motion` tắt chuyển động.
8. `viewer.html?id=toeic-600` và `viewer.html?id=deep-reading` hiển thị giống trước (so ảnh chụp trước/sau).
9. `node --test tests/learning/*.test.js tests/catalogue.test.js` đều đạt.
10. Không có lỗi console khi tải trang chủ và khi thao tác các luồng trên.

## 8. Ràng buộc kỹ thuật

- `style.css` đang được cả `viewer.html` dùng → tách CSS trang chủ thành khối có phạm vi (ví dụ `body.home`) hoặc file `home.css` chỉ nạp trong `index.html`; giữ nguyên `:root`, `.viewer-*`, `.primary-button`.
- Không thêm framework, bước build hay dependency. Không đổi `assets/styles/tokens.css` (bài học dùng chung).
- Văn bản lấy từ catalogue phải qua `escapeHTML` trước khi chèn.
- Hướng dẫn web hiện đại áp dụng: thẻ dùng `<article>` + một liên kết chính (stretched link) và nút tải là control riêng; mục lục nhanh dùng `<dialog>` + `showModal()` với `overscroll-behavior: contain`; chip cuộn ngang dùng fade theo scroll-driven animation, có fallback vì chưa được hỗ trợ rộng.

## 9. Lộ trình triển khai

| Mốc | Nội dung | Kiểm chứng |
|---|---|---|
| 0 | Bạn chọn hướng (A/B/C hoặc kết hợp) và duyệt khóa `localStorage` nếu chọn A | — |
| 1 | Mockup đầy đủ cho hướng đã chọn: desktop toàn trang theo từng section + mobile 390 (hero, kho, mục lục mở, trạng thái rỗng) | Kiểm tra chữ, dữ liệu thật |
| 2 | Dựng HTML/CSS tĩnh theo mockup, tách CSS trang chủ khỏi viewer | So ảnh 1440 và 390 với mockup |
| 3 | Nối JS: render từ catalogue, tìm/lọc, nhóm Từ vựng, Tiếp tục học, dialog mục lục | Tiêu chí 1, 4–6 |
| 4 | Kiểm thử responsive 360/390/720/980/1440, bàn phím, reduced-motion, viewer hồi quy | Tiêu chí 2, 3, 7–10 |
| 5 | Cập nhật `DESIGN.md` phần trang chủ sau khi kết quả ổn định | Review diff |

## 10. Ngoài phạm vi
Nội dung và giao diện mọi trang trong `Grammar/`, `Vocabulary/`, `Writing/`, `Verb/`, `Guide/`, `Blog/`; `viewer.html`/`viewer.js`; module dùng chung; ID, đường dẫn, khóa lưu trữ hiện có; commit/push/deploy.
