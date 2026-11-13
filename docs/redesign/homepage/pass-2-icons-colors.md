# Pass 2 — Icon hướng C và hệ màu trang chủ

Ngày: 2026-11-13 · Phạm vi: `index.html`, `home.css`, `home-icons.js` (và `script.js` chỉ khi bắt buộc). Không đụng `style.css`, `viewer.*`, `data/documents.js`, `assets/`, trang học liệu.

Tham chiếu: bố cục theo `mockups/direction-a-study-desk-desktop-1792x1024.png`, icon theo `mockups/direction-c-recall-path-desktop-1792x1024.png`. Mẫu chuẩn đã khoá: `prototype/icons-golden.js` (`toeic-600`, `vocabulary-atlas`, `phrasal-verbs`). Phòng thử: `prototype/PROTOTYPE-icon-gallery.html`.

## 1. Vấn đề (đo trên bản v2)

### Icon
| # | Vấn đề | Hướng sửa |
|---|---|---|
| I1 | Ký hiệu phẳng một đối tượng, cả nét tô màu chủ đề → giống bộ app icon | Đồ vật minh hoạ xếp 2–4 lớp, mực trung tính, màu chủ đề chỉ ở 1–2 chi tiết |
| I2 | Góc bo 9–16 đơn vị (kiểu nút UI) | Góc giấy rx 2–4; vật tròn tự nhiên thì giữ tròn |
| I3 | Nhiều icon là chữ trong ô (`1 2`, `C1`, `GO ON`, `1…5`) | Vẽ đồ vật; chữ chỉ là nhãn nhỏ trên đồ vật khi đó là danh tính (số vòng, `C1`, `600`, `EN/VI`) |
| I4 | Nét 2 đơn vị co giãn theo kích thước: 40px quá mảnh, 210px quá dày; không có cấp chi tiết | `vector-effect: non-scaling-stroke`, nét 1.35px (sm 1.15, lg 1.6); chi tiết `.s-detail` tự tắt ở cỡ nhỏ |
| I5 | 29 thẻ thành cầu vồng vì icon + tag + link đều màu chủ đề | Mực trung tính cho icon và chữ; màu chủ đề thành chấm nhận diện |

### Màu
| # | Vấn đề | Hướng sửa |
|---|---|---|
| C1 | Accent neon, không đồng đều: L 0.58–0.76, C 0.12–0.25; amber/green/cyan/coral < 3:1 trên giấy | Bảng "mực in" cùng độ sáng (mục 2), mọi accent ≥ 3.3:1 trên card/tint |
| C2 | Hero: 3 quầng violet/cyan/lime + lưới + nhiễu + chữ gradient lime→cyan | Mực phẳng, `em` lime đặc, tối đa một quầng lime rất nhạt |
| C3 | Chip "Tất cả" đỏ cam đặc; chip chọn tô đặc màu chủ đề; tag, link, tiêu đề nhóm đều màu chủ đề | Chip trung tính + chấm màu; chip chọn nền mực + dấu check |
| C4 | Ô chủ đề gradient pastel đậm, tên chữ màu → "kẹo", đặc biệt trên mobile | Nền tint phẳng (đã trộn ấm), tên chữ mực, màu chỉ ở đếm + icon |
| C5 | Blog gradient xanh lạnh, About gradient violet/cyan, thanh cuộn gradient, brand/submit gradient | Tất cả phẳng |
| C6 | Chữ phụ xám xanh lạnh `#5b6a70` lệch tông giấy ấm | Xám ấm `#625c53` (6.5:1) |
| C7 | Trạng thái chọn của chip chỉ khác màu | Thêm dấu hình (check) |

## 2. Bảng màu đã khoá (đã đo tương phản)

Nền: mực `--ink-800 #0b1013` (ink-900 `#070b0d`, 700 `#121a1e`, 600 `#18242a`), giấy `--paper #f6f3ec`, `--paper-2 #eee9dd`, `--card #fffdf8`, `--line #e4ddce`, `--line-2 #d4cab4`. Chữ `--text #16191b`, `--muted #625c53`, `--muted-2 #77706a` (4.8:1 trên card, dùng được cho placeholder).

| Màu | accent (chi tiết, chấm, viền) | *-ink (chữ) | tint (nền nhạt = 10% accent trộn card) | Chủ đề |
|---|---|---|---|---|
| violet | `#6f5ac8` (5.2:1 card) | `#54429f` (6.8:1 tint) | `#efedf5` | Từ vựng |
| green | `#1f8a63` (4.2) | `#13684b` (5.9) | `#eaf1e8` | Ngữ pháp |
| magenta | `#b8467f` (4.9) | `#8c2f5d` (6.8) | `#faebeb` | Viết |
| amber | `#b07a12` (3.7) | `#7c560c` (5.8) | `#f7f0e3` | Động từ |
| cobalt | `#3f6cc9` (4.9) | `#2b4f9c` (6.7) | `#ebeff5` | Hướng dẫn, focus trên giấy |
| cyan | `#138397` (4.4) | `#0d6170` (6.2) | `#eaf1ee` | Blog |
| coral | `#d4552e` (4.0) | `#a8401d` (5.4) | `#fdede4` | Đèn của phòng giấy |
| lime | `#cdf34a` (15:1 trên mực) | — | — | Đèn của phòng tối |

OKLCH: L 0.54–0.62, C 0.095–0.17 — cùng một "họ mực". Ngữ nghĩa: success `#1f8a63`, warning `#b07a12`, danger `#b8402c`, info `#3f6cc9`.

## 3. Quy tắc dùng màu: mỗi phòng một ngọn đèn

- **Phòng tối** (header, hero, bảng Tiếp tục học, About, footer): mực + chữ giấy; **lime là màu nhấn duy nhất** (chữ `em` tiêu đề, nút Tìm, chấm đèn, mục nav đang chọn, focus, số liệu). Không violet/cyan/gradient.
- **Phòng giấy** (Chủ đề, Kho, Blog): giấy + chữ mực; **coral là đèn duy nhất** (nhãn "Nổi bật", nút chính của trạng thái rỗng). Màu chủ đề chỉ xuất hiện dưới dạng: chấm nhận diện, nền tint của ô chủ đề, đếm số của ô chủ đề, chi tiết trong icon, viền khi hover/chọn.
- Không gradient trang trí, không glass/blur trên bề mặt nội dung, không chữ gradient.
- Trạng thái chọn không chỉ dựa vào màu: chip chọn có dấu check, ô chủ đề chọn có huy hiệu check.

| Phần tử | Sau |
|---|---|
| Hero nền | `--ink-800` phẳng; bỏ `orb-a/b/c`, `hero-lines`, `hero-grain`; cho phép một quầng lime ≤ 10% ở góc phải trên |
| `h1 em` | lime đặc |
| Bảng Tiếp tục học | `--ink-700` phẳng, viền giấy 10%, không blur, không bóng nổi |
| Thanh tiến độ cuộn | lime đặc |
| Ô chủ đề | nền `--tint` phẳng, viền accent 18%, tên chữ `--text`, đếm `--accent-ink`; chọn: nền `--card`, viền `--accent-ink`, huy hiệu check accent |
| Chip lọc | nền `--card`, viền `--line`, chữ `--text`, chấm 8px `--accent` ("Tất cả" không chấm); chọn: nền `--ink-800`, chữ giấy, chấm → check |
| Tag chủ đề trong thẻ | nền `--paper-2`, chữ `--muted`, chấm 6px `--accent` |
| Badge PDF/Article | viền `--line-2`, chữ `--text`, mono |
| "Đọc trực tiếp →" | chữ `--text`; mũi tên `--muted`, hover mũi tên `--accent-ink` |
| Tiêu đề nhóm | chữ `--text`, chấm accent, đếm `--muted`, gạch `--line` |
| Blog | nền giấy phẳng, thẻ card phẳng |
| About | `--ink-800` phẳng, số liệu lime |

## 4. Đặc tả icon hướng C

Hợp đồng kỹ thuật (đã có trong `home.css`, khối "KHÓA"):

- `viewBox="0 0 120 96"`, chèn inline qua `sketch()` trong `script.js`. Chuỗi SVG không có `id`, `<defs>`, `clipPath`, `mask`, `filter`, gradient, `style=`, màu cứng. Thuộc tính cho phép: `d`, `x`, `y`, `width`, `height`, `rx`, `cx`, `cy`, `r`, `points`, `transform`, `fill-rule`, `class`, `stroke="none"`.
- Lớp: nét mặc định = mực `--icon-ink`; `s-paper` (mặt giấy che lớp dưới), `s-shade` (mặt khuất, giấy tối hơn), `s-back` (nét lớp sau, nhạt), `s-detail` (chi tiết mảnh: dòng chữ, đường bản đồ — tự ẩn ở cỡ nhỏ), `s-accent` (nét màu chủ đề), `s-fill` (chấm màu chủ đề), `s-tint` (mặt nhuộm nhạt), `s-dash` (nét đứt), `s-text` (nhãn mono 11px, cũng tự ẩn ở cỡ nhỏ).
- Cỡ hiển thị: 180px (blog), ~88–96px (thẻ), 52px (ô chủ đề), 40–44px (gợi ý, mục lục, Tiếp tục học — chi tiết tắt), trên nền card, tint và mực (`.on-ink`).

Ngôn ngữ hình:

1. **Đồ vật thật, xếp lớp**: 2–4 vật chồng lệch/xoay (-15°…+8°) hoặc gấp/nghiêng để có chiều sâu; lớp trước dùng `s-paper` để che nét lớp sau.
2. **Nét mảnh, mực ấm**; lớp sau `s-back`, mặt khuất `s-shade`.
3. **Màu chủ đề tiết chế**: 1–2 chi tiết (dấu check, tuyến đường, chấm, ruy băng) **hoặc** một vật duy nhất vẽ hoàn toàn bằng accent (như mắt xích).
4. **Không khung nền**, không vòng tròn/ô vuông đỡ phía sau.
5. **Góc giấy nhỏ** rx 2–4.
6. **Đọc được ở 40px**: hình bóng chính rõ khi tắt `.s-detail`/`.s-text`; ≤ ~14 phần tử.
7. **Phủ khung**: vật chiếm ~70–85% bề ngang khung, căn giữa thị giác.
8. **Một họ**: các icon cùng chủ đề hoặc cùng chuỗi (Vòng 1–2/3–4/5–6) dùng chung bố cục, chỉ đổi nhãn.

Sáu icon chủ đề phải khác hình bóng nhau vì đứng cạnh nhau trên kệ: Từ vựng = thẻ từ xoè, Ngữ pháp = khối xếp chồng (cấu trúc), Viết = tờ giấy + bút chì, Động từ = bảng clapper, Hướng dẫn = cột biển chỉ đường, Blog = tờ báo gấp.

## 5. Chia việc

| Task | Người làm | File được sửa | Xong khi |
|---|---|---|---|
| 1 Khoá token, hợp đồng icon, phòng thử, 3 mẫu chuẩn | trưởng nhóm | `home.css` (khối KHÓA + `:root` + `[data-topic]`), `prototype/*` | Mẫu chuẩn khớp crop C ở 180/96/40px |
| 2 Icon lô A: 11 Từ vựng + chủ đề Từ vựng | subagent | `prototype/icons-batch-a.js` | Gallery `?batch=a` đạt mục 4 |
| 3 Icon lô B: 6 Ngữ pháp + 2 Viết + 2 chủ đề | subagent | `prototype/icons-batch-b.js` | Gallery `?batch=b` đạt mục 4 |
| 4 Icon lô C: 3 Động từ, 3 Hướng dẫn, 1 Blog + 3 chủ đề + trạng thái rỗng | subagent | `prototype/icons-batch-c.js` | Gallery `?batch=c` đạt mục 4 |
| 5 Áp dụng màu (mục 3) | subagent | `home.css` (ngoài khối KHÓA), `index.html` (bỏ markup trang trí hero) | Ảnh 1440/390/360 đúng bảng mục 3, không tràn ngang |
| 6 Gộp icon vào `home-icons.js`, cập nhật `?v=` | trưởng nhóm | `home-icons.js`, `index.html` | 29 id + 6 chủ đề có icon |
| 7 Kiểm chứng toàn trang | trưởng nhóm | — | Mục 6 |
| 8 Cập nhật phần trang chủ trong `DESIGN.md` | subagent | `DESIGN.md` | Mô tả đúng hệ đã ship, phần bài học giữ nguyên |

## 6. Nghiệm thu

1. `node --test tests/learning/*.test.js tests/catalogue.test.js` đạt.
2. Mọi id trong catalogue và 6 chủ đề có icon mới; không còn lớp `s-soft`.
3. Ảnh 1440×900: hero mực phẳng, chỉ lime; kho không còn chip/tag/link màu đặc.
4. 390 và 360: `scrollWidth === clientWidth`; ô chủ đề không còn gradient.
5. Không lỗi console; tìm kiếm, lọc, mục lục, Tiếp tục học vẫn chạy.
6. `viewer.html?id=toeic-600` và `viewer.html?id=deep-reading` mở bình thường; nút tải PDF trỏ đúng tệp.
7. Tương phản: chữ ≥ 4.5:1, icon/viền trạng thái ≥ 3:1 trên nền thật.
