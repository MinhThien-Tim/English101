# Motion với Anime.js — nền tảng `assets/ui/animation.js`

Nền tảng motion cho site tĩnh: helper `window.English101Motion` bọc [anime.js v3.2.2](https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js) (CDN, tải không chặn). Mục tiêu: thêm 1 hiệu ứng mới trong ~5 phút mà không bao giờ chặn hay ẩn nội dung.

## 1) Mục đích & luật motion

- **Chỉ animate `transform` và `opacity`** — chạy trên compositor, không gây reflow.
- **Duration 200–1000ms**; easing dùng full-name của Anime v3: `easeOutCubic` hoặc `easeOutExpo`. Helper mặc định `easeOutCubic` — điều này bắt buộc vì easing mặc định của anime v3 là `easeOutElastic(1, .5)` (quá "nảy" cho site).
- Motion hạn chế theo `CONTEXT.md:123-139`: chuyển cảnh ~180–260ms, tôn trọng `prefers-reduced-motion`, mobile-first không overflow ở 360/390px.
- Guard `prefers-reduced-motion` **qua code** (`motionOK()`): block reduce trong CSS (`home.css:1398-1405` chỉ hạ duration animation/transition) **không chặn được inline style** do JS ghi.

## 2) Nạp không chặn + trade-off

`script.js` (trang chủ) và inline script các bài học **render nội dung chính lúc nạp**, nên thẻ CDN tuyệt đối KHÔNG đứng trước renderer trong chuỗi parser-blocking.

Hình dạng chuẩn cho `index.html` (hiện tại chuỗi 5 script plain ở `index.html:228-232`, chưa defer — khi nối dây chuyển cả chuỗi sang `defer`):

```html
<head>
  ...
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
</head>
<body>
  ...
  <script src="data/documents.js" defer></script>
  <script src="home-icons.js?v=YYYYMMDD-label" defer></script>
  <script src="assets/learning/persistence.js" defer></script>
  <script src="assets/ui/dialog.js" defer></script>
  <script src="assets/ui/animation.js?v=YYYYMMDD-label" defer></script>
  <script src="script.js?v=YYYYMMDD-label" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js" defer></script>
</body>
```

- `preconnect` **KHÔNG kèm `crossorigin`**: fetch script classic là no-cors; khác với `fonts.gstatic.com` ở `index.html:12` dùng `crossorigin` vì font fetch theo chế độ CORS.
- `defer` bảo toàn thứ tự thực thi theo spec HTML. Đã xác minh `index.html` không có inline handler, không ai phụ thuộc `DOMContentLoaded` nên chuyển defer an toàn cho trang chủ.
- **Trade-off ghi rõ**: CDN treo/chậm → các script defer sau vẫn chạy vì CDN nằm cuối chuỗi → nội dung đầy đủ, chỉ mất hiệu ứng (cùng triết lý `display=swap` của fonts). `revealIn` đi qua hàng pending-retry deadline 1500ms thay vì chặn (xem §4).
- Bài học (chuỗi shared module cuối body + 1 inline script chạy lúc parse, ví dụ `personal-flashcards.html:30`, `phrasal-verbs.html:354-360`): giữ nguyên pattern hiện có, chèn `assets/ui/animation.js` vào chuỗi theo thứ tự phụ thuộc, và **thẻ CDN đặt ĐỨT CUỐI CÙNG, sau inline script** — inline gọi helper lúc parse chỉ được `English101Motion` (đã attach) chứ chưa chắc có `anime`; guard trả `null` → nội dung nguyên trạng, hiệu ứng hoạt động từ tương tác kế tiếp.
- Cache-bust bằng query `?v=YYYYMMDD-label` như các script hiện có.

## 3) Helper API

`window.English101Motion` (UMD attach như `persistence.js:1-5`, kèm `module.exports` cho node test):

| API | Hợp đồng |
| --- | --- |
| `motionOK()` | `true` khi không bật `prefers-reduced-motion: reduce`; đọc live mỗi lần gọi; có listener `change` thả ngay hàng pending của `revealIn` khi reduce bật giữa chừng. |
| `animeReady()` | `true` khi `typeof anime === 'function'` (CDN fail/offline → mọi gọi là no-op). |
| `clearInlineState(targets)` | Mỗi el: `style.removeProperty('opacity')` + `style.removeProperty('transform')` + `setAttribute('data-motion-revealed','1')`. Idempotent, không bao giờ ném. |
| `animate(targets, keyframes, options)` | Guard kép `motionOK() && animeReady()`; toàn thân bọc try/catch — **never-throw, trả instance \| null**. Tự gắn `complete` (dọn inline state, rồi gọi `complete` của caller nếu có) và `inst.finished.then(onOk, onErr)` ngay lúc tạo. Mặc định `easing: 'easeOutCubic'`. |
| `revealIn(container, {selector='.reveal', duration=220, step=28, maxDelay=400, translateY=10, rootMargin='96px 0px 96px 0px'})` | Reveal cascade khi container sắp vào viewport. Bỏ qua phần tử đã mang `data-motion-revealed` → idempotent sau `innerHTML` re-render (gọi lại sau mỗi render mới). `!motionOK()` hoặc thiếu IntersectionObserver → mark revealed hết + return. `!animeReady()` → vào hàng pending, poll rAF/60ms tới deadline 1500ms: anime sẵn sàng thì flush theo **luật flush-viewport** (card trong viewport mở rộng đã paint → mark revealed, KHÔNG animate; card ngoài vùng → IO animate như thường), hết hạn thì mark revealed và bỏ. |
| `staggerIn(targets, {duration=200, step=20, translateY=6})` | Cùng hợp đồng never-throw với `animate` — bắt buộc vì caller là dòng mã hợp đồng (renderSuggestions sau `hidden=false`, vòng forEach chấm bài). Guard fail → `null`. |

Ví dụ hoàn chỉnh copy-chạy-được — entrance cho dropdown ẩn/hiện bằng `hidden` (nội dung luôn hiện đúng, hiệu ứng chỉ là lớp phục trang):

```html
<button id="menu-toggle" aria-expanded="false" aria-controls="menu">Từ vựng</button>
<div id="menu" hidden>
  <ul>
    <li><a href="#a">Flashcard</a></li>
    <li><a href="#b">Rounds</a></li>
    <li><a href="#c">Sổ tay</a></li>
  </ul>
</div>

<script>
  (function () {
    const button = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    button.addEventListener("click", () => {
      const opening = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(opening));
      menu.hidden = !opening; // nội dung hiển thị KHÔNG phụ thuộc animation
      if (opening && window.English101Motion) {
        // anime fail/reduce → trả null → menu vẫn hiện nguyên trạng
        English101Motion.staggerIn(menu.querySelectorAll("li"), { duration: 200, step: 20, translateY: 6 });
      }
    });
  }());
</script>
```

Cho hàng thẻ cuộn tới mới hiện (trang chủ): sau mỗi lần render lưới, gọi `English101Motion.revealIn(container, { selector: ".reveal" })` (các card mang class `.reveal` ở `script.js:158`, `script.js:165`, `script.js:257`). Lưu ý một nguồn entrance cho mỗi phần tử: `.reveal` đã có CSS scroll-driven animation nơi trình duyệt hỗ trợ (`home.css:1382-1387`) — không vừa chạy CSS vừa chạy `revealIn` trên cùng selector.

**Quy tắc đặt trạng thái đầu**: không dùng CSS ẩn nội dung mặc định và không pre-hide bằng JS. Muốn đặt trạng thái đầu thủ công thì chỉ làm khi `motionOK() && animeReady()` (dùng from-values hoặc `anime.set`); from-values của anime đã tự áp đồng bộ lúc tạo (xem §4) nên `revealIn` không cần pre-hide.

**Quy tắc card-đã-hiện-không-animate**: card đã hiện (đã paint ở trạng thái tự nhiên) trước khi anime sẵn sàng thì KHÔNG được animate lại. Đây là hệ quả trực tiếp của fail-visible: khi CDN trễ, card render và paint trước anime (`defer` cuối chuỗi), người dùng đã thấy nội dung; animate lại lúc flush sẽ ghi đè inline `opacity:0` lên card đang hiển thị → nháy đo được `1 → 0 → 1` (~220ms mất dấu lại hiện). Vì vậy flush của hàng pending chỉ animate card **chưa paint** (ngoài viewport mở rộng); card trong viewport được mark revealed và giữ nguyên hiển thị. Trade-off đã duyệt: anime tới trễ thì **mất entrance màn hình đầu** — nội dung luôn đầy đủ, hiệu ứng chỉ còn cho phần chưa paint (cuộn tới vẫn cascade).

## 4) Fact đã kiểm chứng thực nghiệm trên build pin

Tải `anime.min.js` v3.2.2 từ CDN, chạy node với DOM shim tối thiểu (shim `NodeList`, `HTMLCollection`, `HTMLElement`, `HTMLInputElement`, `SVGElement`, `window`, `document{hidden,addEventListener,removeEventListener}`, `requestAnimationFrame`; preset `style.opacity='1'` giả lập computed style). Ghi đúng để người triển khai sau không phá:

- `typeof inst.then === 'undefined'`, `typeof inst.catch === 'undefined'`; `inst.catch(fn)` ném `TypeError: inst.catch is not a function`. → **CẤM** `inst.then(...)`/`inst.catch(...)` trên instance; chỉ dùng `complete` option + `inst.finished.then(onOk, onErr)` — `inst.finished` là native Promise có `.then`.
- **Gắn `.then` trên `inst.finished` NGAY LÚC TẠO**: nhánh complete trong source là `!k.passThrough&&"Promise"in window&&(p(),h(k))` — `h(k)` thay `k.finished` bằng promise mới pending; đọc `inst.finished` sau complete sẽ nhận promise không bao giờ resolve (đã kiểm chứng: promise đọc muộn vẫn pending sau 400ms).
- `complete` bắn khi elapsed ≥ duration (200ms ≈ 12–14 frame @60fps; trên shim node timer thô đếm được ít tick hơn — bản chất là elapsed thật).
- **From-values áp đồng bộ lúc tạo**: ngay sau `anime({targets, opacity:[0,1], translateY:[10,0]})`, `el.style.opacity='0'` và `transform='translateY(10px) '` (có dấu cách cuối) đã nằm inline, trước tick rAF đầu tiên thực thi; engine tiến triển qua rAF (`N=requestAnimationFrame(on)`, shim rAF đủ để engine chạy). IO callback chạy trước paint trong update-the-rendering nên trạng thái ẩn có hiệu lực trước frame đầu — không pop **cho nhánh render-time** (revealIn gọi khi anime đã sẵn sàng, IO observe trong cùng task với render mới). Vì thế `revealIn` **không** tự đặt `opacity:0` thủ công. Ngoại lệ đã đo thực nghiệm: với card **đã paint từ trước** (flush hàng pending khi anime về muộn), from-values áp SAU paint → animate lại là pop/nháy — xem bullet dưới và quy tắc card-đã-hiện-không-animate ở §3.
- `anime.stagger(step,{start:0})` cho delay `i*step`; build v3.2.2 **không có option `end`** cho stagger (bị bỏ qua im lặng) → helper tự clamp `maxDelay` bằng delay-function `Math.min(i*step, maxDelay)`: trùng stagger thường khi dưới cap, chặn tổng cascade ở `maxDelay` khi set lớn.
- Quy tắc rút ra: mọi helper entry-point bọc try/catch và **không bao giờ ném ra caller**; khi anime() ném giữa lúc tạo, IO callback phải `io.unobserve` + `clearInlineState`.
- `rootMargin '96px 0px 96px 0px'` của IO vẫn được dùng dù from-values áp đồng bộ: trigger cascade sớm hơn khi card còn cách viewport 96px, cho nhịp cuộn mượt và chống jitter của IO delivery.
- **Nháy pending-flush đã đo và đã sửa** (Playwright + server tĩnh, route-intercept làm trễ `anime.min.js` 900ms — nhỏ hơn deadline 1500ms, cache disabled, sample computed opacity mỗi frame rAF): card trong viewport paint từ ~475ms ở `opacity: 1`; anime ready ~1000ms; nhánh flush cũ gọi `startReveal` → IO deliver NGAY → from-values ghi `opacity: 0` lên card ĐANG HIỂN THỊ → đo được chuỗi `1 → 0 → 1` trên 12 card viewport (mốc t≈1015ms → 1036ms → 1253–1361ms, cascade stagger 28ms). Sau fix: flush phân tách theo `getBoundingClientRect()` với viewport mở rộng theo `rootMargin` — card trong vùng → `clearInlineState` (không animate, không có frame nào `1 → <1`); card ngoài vùng → IO như thường (chưa paint nên không nháy) và vẫn animate nền/khi cuộn tới. Toàn bộ nhánh flush bọc try/catch: lỗi → `clearInlineState` cho toàn bộ hàng (fail-visible).

## 5) Luật bất biến

- **Không ẩn nội dung bằng CSS, không pre-hide bằng JS** — trạng thái ẩn chỉ tồn tại khi một animation instance đang sống và chỉ xuất hiện khi `anime()` chạy thành công (from-values áp đồng bộ). Mọi exit path — throw lúc tạo/gắn, `complete`, `finished.then`, deadline pending, flush lỗi (catch toàn nhánh flush → `clearInlineState` toàn hàng), `motionOK()` false, `animeReady()` false — đều `clearInlineState` về trạng thái tự nhiên + unobserve + `data-motion-revealed`. Fail-visible.
- **Luật flush-viewport** (anime về muộn, flush hàng pending của `revealIn`): card nằm trong viewport **mở rộng theo `rootMargin` hiện có** (mặc định trên/dưới 96px, so bằng `getBoundingClientRect()`) → `clearInlineState` (mark revealed, giữ nguyên hiển thị, KHÔNG animate) vì card đã paint; card ngoài vùng → vào IO như nhánh thường (chưa paint nên animate an toàn). Không có card nào bị kẹt ẩn: guard `motionOK()`/`animeReady()` giữ nguyên trong flush, rect rỗng (container ẩn/chưa layout) coi như ngoài viewport, và catch toàn nhánh mark revealed toàn bộ hàng. Card đã hiện trước khi anime sẵn sàng thì KHÔNG animate — animate lại là nháy (xem quy tắc ở §3 và fact đo ở §4).
- `renderTopics()` chỉ chạy 1 lần (`script.js:565`) và các render dùng `innerHTML` chạy lại nhiều lần — helper phải idempotent: gọi lại `revealIn` sau render mới; phần tử mang `data-motion-revealed` được bỏ qua.
- Không thêm keydown/scroll listener mới — dùng chu kỳ rAF sẵn có (`script.js:534-538`); poll rAF của hàng pending chỉ sống ≤1.5s và chỉ khi có entry.
- Không đụng storage keys; không animate live region (`#result-count` — phần tử ở `index.html:107`, ghi tại `script.js:244`).
- Chỉ animate transform/opacity; 200–1000ms; `easeOutCubic`/`easeOutExpo`; một nguồn entrance cho mỗi phần tử (xem cảnh báo `.reveal` ở §3).

## 6) Checklist kiểm thử

> Trạng thái kiểm thử (2026-11-14): các mục 1–4 và 6 đã chạy và đạt trên **Chromium headless qua Playwright** (desktop 1280×800 + mobile 390×844) cho trang chủ và 4 trang Grammar đã nối dây. **Chưa kiểm iOS/Safari và thiết bị thật.**

1. `node --test tests/learning/*.test.js tests/catalogue.test.js` — catalogue test assert mọi tham chiếu script tồn tại (`tests/catalogue.test.js:33-53`) nên thẻ mới phải trỏ đúng file. — **Đã chạy (2026-11-14): 51 pass / 0 fail.**
2. Bật `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate) → không cascade nào chạy, nội dung nguyên trạng. — **Đã chạy (2026-11-14):** trang chủ lẫn 4 trang Grammar hiện nội dung tức thì, 0 inline animation, `reduceQuery.matches=true` xác nhận emulation có hiệu lực.
3. **Hai fail mode qua DevTools → Network**: (a) Block request URL của CDN → nội dung chính hiện NGAY, không cascade, console không lỗi helper; (b) throttling `Slow 3G`, cache disabled → **màn hình đầu mất entrance khi CDN trễ (fail-visible)**: nội dung chính đầy đủ ngay, card đã paint giữ nguyên hiển thị (KHÔNG animate lại — tránh nháy `1 → 0 → 1`); chỉ phần chưa paint (ngoài viewport mở rộng) còn cascade khi cuộn tới — hàng pending hết hạn theo deadline 1500ms. — **Đã chạy (2026-11-14):** (a) DRILL 2 route-abort CDN trên cả 4 trang Grammar + block URL trên trang chủ, console chỉ có lỗi mạng của chính resource bị chặn; (b) trang chủ đo được 0 frame nháy sau fix flush-viewport (route-intercept trễ 900ms, sample opacity mỗi frame rAF).
4. **Drill an toàn logic**: trong console chạy `window.anime = undefined` rồi mở suggestions/chấm bài → `aria-expanded` vẫn toggle đúng, vòng chấm vẫn hoàn thành, `save()` vẫn chạy (chứng minh never-throw + guard); console sạch TypeError. — **Đã chạy (2026-11-14):** cả 4 trang Grammar chấm bài hoàn thành, score set, storage ghi mới, 0 TypeError; trang chủ suggestions vẫn mở/đóng đúng.
5. Tắt JS → mọi nội dung vẫn đọc được (không gì dựa vào animation để hiện). — Chưa chạy trên trình duyệt; xác nhận bằng cấu trúc: không rule CSS nào ẩn card mặc định, trạng thái ẩn chỉ do inline style của anime có guard (mọi exit path `clearInlineState`).
6. Xem 360/390px không overflow, không card bị mất. — **Đã chạy (2026-11-14):** trang chủ 360px sạch, 390×844 sạch; same-word sạch ở 390×844; conjunctions/prepositions/tense còn overflow ngang — nguồn được truy vết và xác nhận là issue hiện có từ trước, không do thay đổi của nhánh này.
