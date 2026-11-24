# Kế hoạch sửa điều hướng flashcard — nút Trước / Tiếp và phím ← →

Ghi nhận ngày 2026-11-24 trên nhánh `main`. Tài liệu này là kế hoạch đã được duyệt và **đã triển khai** — xem §0 để biết các điểm lệch so với kế hoạch.

## 0. Trạng thái thực hiện (2026-11-24)

Đã triển khai Phase 0–3 trên 9 file. Phase 4 là MAY và §8 đã ghi sẵn quyết định nên không cần sửa code.

Ba điểm lệch có chủ ý, đều để giữ hợp đồng reveal-before-advance và quy tắc "nút Trước luôn bấm được":

1. **`PREVIOUS` chỉ mở cho phiên flashcard.** Ở cả 5 trang, cùng một đối tượng phiên còn chạy chế độ quiz/practice; cho lùi ở đó sẽ khiến người học trả lời lại một câu đã chấm và ghi trùng lượt. Mỗi dispatcher vì thế có cổng `tab==='flash'` / `s.kind==='flash'` / `activeKind==='flashcard'`.
2. **Nút Trước cũng hiện trước khi lật thẻ** ở `root-atlas`, `vocabulary-atlas`, `vocabulary-rounds-app`, và `next()` của hai trang atlas bị chặn khi chưa lật. Nếu chỉ đặt nút trong khối sau khi lật thì bấm một lần là nút biến mất, không lùi được hai thẻ bằng chuột.
3. **Hai trang giữ nhãn `Thẻ tiếp ↵`** cho nút tiến (`vocabulary-atlas`, `vocabulary-rounds-app`) thay vì đổi thành `Tiếp →`, vì §8 cấm đổi nhãn tiếng Việt đang có. Tiêu chí 1 vì thế đúng theo nghĩa "có nút tiến rõ nghĩa", không đúng theo nghĩa "đúng cặp nhãn mẫu".

Đã kiểm chứng: `node --test tests/learning/*.test.js tests/catalogue.test.js` → 57/57; probe bàn phím 9/9; smoke test trình duyệt trên 7 trang (5 trang sửa + 2 trang mẫu).

**Hạn chế còn lại, không sửa trong đợt này:** `session.js` không hoàn tác lượt đã ghi, nên lùi về một thẻ rồi đánh giá lại sẽ ghi thêm một attempt cho thẻ đó. `vocabulary-atlas` tăng `session.seen` mỗi lần lật lại, nên dòng "Đã lật x / y thẻ" có thể vượt tổng.

Yêu cầu gốc: *"Hiện tại mục flashcard ở các trang đang không dùng nút mũi tên tiến để next hay lùi để back từ lại được, hãy audit, lên kế hoạch fix."*

## 1. Phạm vi và quyết định đã chốt

**Trong phạm vi**: 7 bề mặt flashcard tuần tự có phiên học (deck + tiến/lùi).

**Ngoài phạm vi**: lưới thẻ nhiều mặt không có phiên tuần tự (`Vocabulary/ielts-c1-c2-modern.js`, `Vocabulary/ielts-hiking-modern.js`, `Verb/five-forms-of-verbs-with-3rd-person.html`), và tab "Flashcard" của `Verb/english-verbs.html` (thực chất là bài điền từ, chỉ tiến không lùi — xem §8).

**Quyết định đã chốt với người yêu cầu (2026-11-24)**:

1. **Dừng ở hai đầu, không quay vòng.** Thẻ đầu bấm Trước → đứng yên; thẻ cuối bấm Tiếp → kết thúc phiên. Lý do: khớp `session.js` hiện tại (`advance()` chặn ở 0 và chuyển `completed` ở cuối), không phá logic tính tiến độ, và không làm phiên học mất điểm kết thúc.
2. **Đợt này chỉ viết tài liệu.** Việc implement tách thành các phase dưới đây, làm sau khi được duyệt.

Hai trang mẫu `paraphrase-80-flashcards.html` và `phrasal-verbs.html` đang quay vòng (`(idx-1+deck.length)%deck.length`). Giữ nguyên hành vi đó — chúng không dùng `session.js` nên không ảnh hưởng logic hoàn thành phiên. Ghi nhận đây là **khác biệt có chủ ý**, không phải lỗi cần đồng bộ.

## 2. Cách kiểm chứng

| Cách | Phạm vi | Kết quả |
| --- | --- | --- |
| Đọc source + `grep` toàn repo | Bảng §3, các dòng dẫn chứng | Khớp 100% với bản handoff, trừ 1 phát hiện mới (§4.5) |
| Probe `node` gọi trực tiếp `resolveKeyboardAction` | Hợp đồng phím của `keyboard.js` | **3/9 case fail** — xem §4.1 |
| `node --test tests/learning/*.test.js` | Baseline trước khi sửa | 51/51 pass |

Probe là hàm thuần nên kết quả tất định, không cần trình duyệt:

```
FAIL  ArrowRight, focus on <button>   want="NEXT"     got=null
FAIL  ArrowLeft,  focus on <button>   want="PREVIOUS" got=null
FAIL  ArrowRight, focus on <a>        want="NEXT"     got=null
PASS  ArrowRight inside <input>       want=null       got=null
PASS  ArrowLeft  inside <textarea>    want=null       got=null
PASS  ArrowRight inside <select>      want=null       got=null
PASS  Enter on <button>               want=null       got=null
```

Repo không có `package.json`, không có `jsdom` hay `playwright` cục bộ. Vì vậy phần "focus bám vào nút sau khi click" được suy ra từ chuẩn DOM (click vào `<button>` đặt `document.activeElement` là nút đó) và từ việc nút **không bị xoá khỏi DOM** khi render — đã kiểm tra riêng cho từng trang ở §4.1. Bước Phase 3 vì thế bắt buộc phải có smoke test trình duyệt thật.

## 3. Hiện trạng từng bề mặt

| Bề mặt | Source | Nút Trước | Nút Tiếp | ← → | Nhánh `PREVIOUS` |
| --- | --- | --- | --- | --- | --- |
| Paraphrase 80 (mẫu) | `Verb/paraphrase-80-flashcards.html` | ✅ `#btnPrev` (211) | ✅ `#btnNext` (213), wire 419–420 | ✅ nhưng **mất sau khi click** | ✅ (439) |
| Phrasal verbs (mẫu) | `Verb/phrasal-verbs.html` | ✅ `#btnPrev` (290) | ✅ `#btnNext` (292), wire 556–557 | ✅ nhưng **mất sau khi click** | ✅ (690) |
| English suffix lab (mẫu) | `Grammar/english-suffix-lab.html` | ✅ `#libraryPrev` (478) | ✅ `#libraryNext` (479), wire 1020–1021 | ✅ handler riêng trên `#suffixFlipCard` (1014–1018) | ✅ không nạp `keyboard.js` |
| Vocabulary Rounds | `assets/learning/vocabulary-rounds-app.js` | ❌ | ✅ `#next` trong `showFlash()` (61) | chỉ →, và **vượt thẻ chưa lật** | ❌ (90–111) |
| Vocabulary Atlas | `Vocabulary/vocabulary-atlas.html` | ❌ | ✅ `#next` trong `flip()` (54) | chỉ → | ❌ (85) |
| Personal Flashcards | `Vocabulary/personal-flashcards.html` (26) + `assets/learning/personal-flashcards.js` | ❌ | ❌ (`advanceFlash()` có ở 94 nhưng không nút nào gọi) | chỉ ← (không có nhánh xử lý) | ❌ (187) |
| TOEIC 600 | `Vocabulary/toeic-600.html` (52) + `Vocabulary/toeic-600.js` (167) | ❌ | ❌ | → **ghi tiến độ "đã nhớ"** | ❌ (294) |
| Root Atlas | `Vocabulary/root-atlas.html` | ❌ | ❌ (`revealFlash()` chỉ render `#again`/`#remember`) | không | ❌ (38) |

Tổng: **3 trang thiếu cả hai nút**, **2 trang thiếu nút Trước**, **5/7 dispatcher không có nhánh `PREVIOUS`**.

## 4. Nguyên nhân gốc

### 4.1 `keyboard.js` chặn phím mũi tên khi focus nằm trên control

`assets/learning/keyboard.js`:

- dòng 10: `if (... || context.interactive) return null;` — thoát sớm cho **mọi** phím;
- dòng 11: chặn thêm `BUTTON`, `A`, `SELECT`, `TEXTAREA`;
- dòng 14–15: chặn `ArrowLeft`/`ArrowRight` khi `tagName === 'INPUT'`;
- dòng 38: `interactive` được tính bằng `element.matches('button,a,select')`.

Hệ quả: sau khi người dùng bấm một nút, `event.target` là chính nút đó, `interactive === true`, và phím ← → bị nuốt. Đây là lỗi **đã tái hiện được trên chính hai trang mẫu**: `#btnPrev`/`#btnNext` là markup tĩnh (211/213, 290/292), `render()` chỉ cập nhật `textContent` chứ không dựng lại container, nên focus bám nguyên trên nút sau mỗi lần bấm. Trong khi đó cả hai trang đều tự quảng cáo *"Phím tắt: Space/Enter để lật · ← → để chuyển thẻ"* (215 / 294) — lời hứa sai ngay sau lần click đầu tiên.

Ở 5 trang còn lại, lỗi này **chưa lộ** vì `innerHTML` bị thay thế sau mỗi hành động, focus rơi về `body`. Nhưng Phase 2 sẽ thêm nút tĩnh đúng vào 5 trang đó — nếu không sửa Phase 0 trước, lỗi sẽ lan ra toàn bộ.

### 4.2 `ArrowLeft` là no-op im lặng ở 5/7 dispatcher

`session.js` đã hỗ trợ `PREVIOUS` (133–134), nhưng dispatcher chỉ gọi `dispatch(action)` với các nhánh `if/else` cố định. Hành động `PREVIOUS` rơi vào không nhánh nào → không có gì xảy ra, không lỗi, không phản hồi. Người dùng chỉ thấy "phím lùi không ăn".

### 4.3 Ba trang thiếu cả hai nút, hai trang thiếu nút Trước

Chi tiết ở §3. Ở `personal-flashcards`, `advanceFlash()` (94) đã tồn tại và đã được nối vào dispatcher, nhưng không có phần tử nào trong markup gọi nó — code chết.

### 4.4 `vocabulary-rounds-app.js` cho phép `→` bỏ qua thẻ chưa lật

`next()` (63) không kiểm tra `q().revealed`. Trong chế độ flash, trước khi lật không có `#typed` để focus nên `event.target` là `body` → `ArrowRight` lọt qua guard và nhảy thẻ. Vi phạm hợp đồng trong `CONTEXT.md`: *"continue to the next Prompt only after the current result is visible"*.

### 4.5 `toeic-600` biến phím `→` thành thao tác ghi tiến độ (phát hiện mới)

Dispatcher tại `Vocabulary/toeic-600.js:294`:

```js
if (action === 'NEXT' || action === 'RATE_GOOD') rateFlash('good');
```

`rateFlash('good')` vừa gọi `session.dispatch({type:'RATE'})` vừa đẩy `entry.id` vào `state.known`. Nghĩa là sau khi lật thẻ, bấm `→` **âm thầm đánh dấu từ là "đã nhớ"** và ghi vào localStorage. Người dùng chỉ định chuyển thẻ, nhưng dữ liệu tiến độ bị sửa. Đây là lỗi nặng hơn lỗi điều hướng: sai lệch dữ liệu học, vi phạm mục "Progress" của `CONTEXT.md` (tiến độ chỉ mô tả công việc quan sát được).

Bản handoff trước không ghi nhận điểm này.

### 4.6 Bộ test không phủ

`grep -rn "ArrowLeft\|ArrowRight\|PREVIOUS" tests/` → **không có kết quả nào**. `platform.test.js:71` chỉ khẳng định `interactive:true` chặn `Enter` — đúng, nhưng vô tình khẳng định luôn rằng control được miễn nhiễm mọi phím. Không có test nào cho `PREVIOUS` trong `session.test.js`.

## 5. Kế hoạch sửa

### Phase 0 — MUST — Nới guard phím mũi tên (L2, shared)

**File**: `assets/learning/keyboard.js`

**Thay đổi**: đưa hai nhánh mũi tên lên **trước** guard `interactive`, chỉ giữ bảo vệ cho ô nhập liệu. Các phím còn lại (`Enter`, `Space`, `1–4`) giữ nguyên hành vi cũ.

```js
function resolveKeyboardAction(context = {}) {
  const tagName = String(context.tagName || '').toUpperCase();
  if (!context.active || context.repeat || context.composing || context.dialogOpen) return null;
  if (tagName === 'TEXTAREA' || tagName === 'SELECT' || context.multiline) return null;

  // Mũi tên là điều hướng, không phải kích hoạt control.
  if (context.key === 'ArrowLeft') return tagName === 'INPUT' ? null : 'PREVIOUS';
  if (context.key === 'ArrowRight') return tagName === 'INPUT' ? null : 'NEXT';

  // Các phím còn lại thuộc về control đang focus.
  if (tagName === 'A' || tagName === 'BUTTON' || context.interactive) return null;

  if (context.key === 'Escape') return 'CLOSE';
  if (context.key === 'Enter') { /* giữ nguyên 16–20 */ }
  /* ... phần còn lại giữ nguyên ... */
}
```

**Vì sao an toàn**: `ArrowLeft`/`ArrowRight` không có hành vi mặc định nào bị mất trên `<button>`/`<a>`; `preventDefault()` chỉ chạy khi có action. `SELECT` vẫn được bảo vệ (mũi tên đổi option), `INPUT` vẫn được bảo vệ (mũi tên di chuyển con trỏ trong chữ), `TEXTAREA`/`contenteditable` vẫn được bảo vệ.

**Nghiệm thu**: probe §2 chuyển sang 9/9 pass; `platform.test.js` vẫn xanh (case `Enter` + `interactive` không đổi).

Đoạn code trên đã được chạy thử ngoài repo với probe mở rộng 20 case — gồm 3 case đang fail, 5 case bảo vệ ô nhập liệu, và **toàn bộ 8 assert hiện có của `platform.test.js:64–74`**. Kết quả: **20/20 pass**. Nghĩa là thứ tự mới không làm đổi bất kỳ hành vi nào đang được test, kể cả `Enter` trên `<button>`, `Space`, phím số và `Escape`.

### Phase 1 — MUST — Thêm nhánh `PREVIOUS` cho 5 dispatcher (L2)

| File | Dòng | Thêm |
| --- | --- | --- |
| `assets/learning/vocabulary-rounds-app.js` | 90–111 | `else if(action==='PREVIOUS')previous();` |
| `Vocabulary/vocabulary-atlas.html` | 85 | `else if(action==='PREVIOUS')previous();` |
| `Vocabulary/personal-flashcards.js` | 187 | `else if(action==='PREVIOUS')previousFlash();` |
| `Vocabulary/toeic-600.js` | 294 | `else if(action==='PREVIOUS')previousFlash();` |
| `Vocabulary/root-atlas.html` | 38 | `else if(action==='PREVIOUS')previousCard();` |

Mỗi trang cần thêm một hàm lùi tương ứng, theo đúng mô hình state của trang đó:

- **`personal-flashcards`** (session-based): `learningSession.dispatch({type:'PREVIOUS'}); drawFlash();`
- **`toeic-600`** (session-based): `learningSession.dispatch({type:'PREVIOUS'}); renderFlash();`
- **`root-atlas`** (local `idx` + session mirror): `const s = learningSession.dispatch({type:'PREVIOUS'}); idx = s.index; nextCard();`
- **`vocabulary-atlas`** (session + local `session.index`): `const s = learningSession.dispatch({type:'PREVIOUS'}); session.index = s.index; newQuestion();`
- **`vocabulary-rounds-app`** (local `state.session.index`, **không** dùng `session.js`): `if(!state.session||state.session.index<=0)return; state.session.index--; state.session.q=null; makeQuestion(); save(); render();`

**Kèm theo (bắt buộc, cùng phase)**: sửa `toeic-600` để `NEXT` không còn gọi `rateFlash('good')`.

```js
// Vocabulary/toeic-600.js, trong dispatch
if (action === 'REVEAL') revealFlash();
else if (action === 'NEXT') nextFlash();          // chỉ chuyển thẻ
else if (action === 'RATE_GOOD') rateFlash('good'); // chỉ khi bấm phím 2
else if (action === 'RATE_HARD') rateFlash('hard');
```

`nextFlash()` = `learningSession.dispatch({type:'NEXT'}); renderFlash();`. Vì `session.js` chỉ cho `NEXT` đi tiếp khi `answerState.revealed` (131), phím `→` trước khi lật sẽ không làm gì — đúng hợp đồng reveal-before-advance.

**Kèm theo**: gate `next()` của rounds-app.

```js
function next(){ stop(); const s=state.session; if(!s) return;
  if (s.kind==='flash' && s.q && !s.q.revealed) return;   // chưa lật thì không đi tiếp
  ...
}
```

### Phase 2 — MUST — Thêm nút (L1 mỗi trang)

Dùng lại đúng cặp nhãn và thứ tự của trang mẫu: `← Trước` bên trái, `Tiếp →` bên phải, cùng hàng với các nút hành động hiện có.

| Trang | Vị trí chèn | Nút |
| --- | --- | --- |
| `Vocabulary/personal-flashcards.html` | `.actions` trong `#flash-play` (26), cạnh `#reveal-flash` | `#flash-prev`, `#flash-next` |
| `Vocabulary/toeic-600.js` | chuỗi `#flashActions` (167) | `data-flash-prev`, `data-flash-next` |
| `Vocabulary/root-atlas.html` | `revealFlash()` | `#prev`, `#next` cạnh `#again`/`#remember` |
| `Vocabulary/vocabulary-atlas.html` | `flip()` | `#prev` cạnh `#next` |
| `Vocabulary/vocabulary-rounds-app.js` | `showFlash()` (61) | `#prev` cạnh `#next` |

Quy tắc chung:

- Nút **Trước** luôn bấm được; ở thẻ đầu thì vô hiệu (`disabled` hoặc return sớm). Chọn `disabled` để người dùng thấy rõ biên — trừ khi việc re-render làm nút nhấp nháy, khi đó dùng return sớm.
- Nút **Tiếp** chỉ hiện/kích hoạt sau khi đã lật thẻ, khớp hợp đồng reveal-before-advance. Ở `root-atlas` và `vocabulary-atlas`, nút này nằm trong khối chỉ render sau khi lật nên đã thoả điều kiện.
- Nút **Tiếp** là điều hướng thuần: **không** ghi tiến độ. Ghi tiến độ chỉ qua nút đánh giá (`#again`/`#remember`, `data-rate`).
- Không đổi nhãn, không đổi thứ tự các nút đánh giá đang có.

### Phase 3 — SHOULD — Test và smoke test (L2)

Bổ sung vào bộ test hiện có, không tạo file mới:

`tests/learning/platform.test.js`:

```js
test('arrows stay available when focus sits on a control', () => {
  assert.equal(resolveKeyboardAction({key:'ArrowRight', active:true, kind:'flashcard', revealed:true, tagName:'BUTTON', interactive:true}), 'NEXT');
  assert.equal(resolveKeyboardAction({key:'ArrowLeft',  active:true, kind:'flashcard', revealed:true, tagName:'BUTTON', interactive:true}), 'PREVIOUS');
  assert.equal(resolveKeyboardAction({key:'ArrowRight', active:true, tagName:'A', interactive:true}), 'NEXT');
  // bảo vệ ô nhập liệu giữ nguyên
  assert.equal(resolveKeyboardAction({key:'ArrowRight', active:true, tagName:'INPUT'}), null);
  assert.equal(resolveKeyboardAction({key:'ArrowLeft',  active:true, tagName:'TEXTAREA', multiline:true}), null);
  assert.equal(resolveKeyboardAction({key:'ArrowRight', active:true, tagName:'SELECT', interactive:true}), null);
  assert.equal(resolveKeyboardAction({key:'Enter', active:true, tagName:'BUTTON', interactive:true}), null);
});
```

`tests/learning/session.test.js`: thêm case `PREVIOUS` — đi tới index 2, lùi về 1, prompt đổi, `answerState` reset; và `PREVIOUS` ở index 0 giữ nguyên index (không âm, không hoàn thành phiên).

Chạy: `node --test tests/learning/*.test.js tests/catalogue.test.js`

Smoke test trình duyệt (bắt buộc, vì §2 chưa chứng minh được hành vi focus bằng máy): mở `python -m http.server 8000`, với mỗi trang trong 5 trang sửa ở Phase 2, kiểm 4 bước — (1) bấm "Hiện đáp án", (2) bấm nút "Tiếp" bằng chuột, (3) ngay sau đó bấm `←` và `→` không chạm chuột, (4) xác nhận thẻ lùi/tiến đúng và localStorage **không** đổi khi chỉ bấm `→`.

### Phase 4 — MAY — Ghi nhận quyết định cho các bề mặt loại trừ

- `Verb/english-verbs.html` tab `data-tab="quiz"` (184) là bài điền từ một chiều (`nextQuestion()` 871), không phải phiên lật thẻ. **Quyết định: không thêm nút lùi.** Nếu sau này cần, phải làm thành feature riêng vì không có state để lùi.
- `Verb/five-forms-of-verbs-with-3rd-person.html` dùng phân trang lưới (`#cardsPrev`/`#cardsNext` 155/289) — đã có lùi/tiến, chỉ khác ngữ nghĩa (trang, không phải thẻ).
- `Vocabulary/ielts-collocations-topic-table-with-dictation.html` và `Vocabulary/ielts_hiking_collocations_full_with_dictation.html` nạp `learning/keyboard.js` nhưng **không tham chiếu `English101Learning` lần nào** (đã kiểm: 0 match). Đây là include chết — dọn ở đợt riêng, không gộp vào đợt này.

## 6. Tiêu chí nghiệm thu

1. Cả 5 trang ở Phase 2 có hai nút `← Trước` / `Tiếp →` hiển thị đúng chỗ, có `aria-label` hoặc nhãn chữ rõ nghĩa.
2. Ở mọi trang flashcard, `←` và `→` hoạt động **sau khi vừa bấm bất kỳ nút nào**, không cần click ra ngoài trước.
3. `←` ở thẻ đầu không làm gì và không làm index âm; `→` ở thẻ cuối kết thúc phiên (không quay vòng) trên 5 trang mới.
4. `→` **không** ghi tiến độ ở bất kỳ trang nào; chỉ nút đánh giá mới ghi.
5. `→` trước khi lật thẻ không nhảy thẻ ở cả 5 trang.
6. Ô nhập liệu giữ nguyên hành vi: `←`/`→` trong `input`/`textarea` di chuyển con trỏ, không chuyển thẻ.
7. `node --test tests/learning/*.test.js tests/catalogue.test.js` xanh toàn bộ.
8. Không đổi storage key, không đổi schema tiến độ, không đổi URL.

## 7. Rủi ro và điểm cần quyết định khi implement

- **Focus sau re-render.** Ở các trang dựng lại `innerHTML`, focus rơi về `body` sau mỗi hành động. Sau Phase 0 điều này không còn chặn phím, nhưng nếu muốn trải nghiệm liền mạch (giữ focus trên nút vừa bấm) thì cần thêm bước khôi phục focus — **chưa đưa vào phạm vi**, vì đó là cải thiện a11y riêng, không phải điều kiện để hết lỗi.
- **`root-atlas` giữ hai nguồn index** (`idx` cục bộ và `learningSession`). Khi thêm lùi phải cập nhật cả hai, nếu lệch sẽ ra thẻ sai. Test tay bắt buộc cho trang này.
- **`vocabulary-atlas` không dùng `session.js` cho `index`** mà tự giữ `session.index` rồi đồng bộ từ snapshot — cùng rủi ro lệch như trên.
- Nếu Phase 1 phát hiện thêm trang có state index thứ ba, dừng lại và báo, không tự mở rộng phạm vi.

## 8. Không làm trong đợt này

- Không đồng bộ hành vi quay vòng của hai trang mẫu về kiểu dừng-hai-đầu (đã chốt giữ nguyên).
- Không gộp 5 trang về dùng chung một component flashcard.
- Không sửa `Verb/english-verbs.html`, không sửa phân trang lưới.
- Không dọn include chết ở hai trang IELTS collocations.
- Không đổi CSS, không đổi bố cục, không đổi nhãn tiếng Việt đang có.
