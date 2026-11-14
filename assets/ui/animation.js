(function attachMotion(root, factory) {
  const exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Motion = Object.assign(root.English101Motion || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createMotionModule() {
  'use strict';

  // Nền tảng motion dùng anime.js (CDN, tải không chặn). Hợp đồng cốt lõi:
  // trạng thái ẩn CHỈ tồn tại khi một animation instance đang sống, và chỉ
  // xuất hiện khi anime() chạy thành công (from-values áp đồng bộ lúc tạo).
  // Mọi exit path — throw, complete, finished, deadline pending, guard fail —
  // đều clearInlineState() về trạng thái tự nhiên. Không bao giờ ném ra caller.

  const DEFAULT_EASING = 'easeOutCubic';
  const DEFAULT_SELECTOR = '.reveal';
  const PENDING_DEADLINE_MS = 1500;
  const PENDING_POLL_FALLBACK_MS = 60;

  // (1) motionOK — đọc live mỗi lần gọi; listener change chỉ để thả ngay hàng
  // pending của revealIn khi người dùng bật reduce giữa chừng.
  const reduceQuery = (typeof window !== 'undefined' && typeof window.matchMedia === 'function')
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  function motionOK() {
    return !(reduceQuery && reduceQuery.matches);
  }

  // (2) animeReady — CDN fail/offline thì mọi helper là no-op, nội dung nguyên trạng.
  function animeReady() {
    return typeof anime === 'function';
  }

  function toElements(targets) {
    if (!targets) return [];
    if (typeof targets === 'string') {
      if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return [];
      return toElements(document.querySelectorAll(targets));
    }
    if (Array.isArray(targets)) return targets;
    if (typeof targets.length === 'number') {
      const list = [];
      for (let i = 0; i < targets.length; i += 1) list.push(targets[i]);
      return list;
    }
    return [targets];
  }

  // (3) clearInlineState — idempotent; setAttribute flag để revealIn bỏ qua phần tử đã qua tay.
  function clearInlineState(targets) {
    const list = toElements(targets);
    for (let i = 0; i < list.length; i += 1) {
      const el = list[i];
      if (!el) continue;
      try {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        el.setAttribute('data-motion-revealed', '1');
      } catch (error) { /* bỏ qua phần tử lỗi, dọn tiếp phần còn lại */ }
    }
  }

  function trackFinished(instance, targets) {
    // Chỉ dùng complete option + inst.finished.then(onOk, onErr) gắn NGAY LÚC TẠO.
    // CẤM inst.then()/inst.catch() trên instance — build pin animejs@3.2.2 không
    // có chúng (typeof inst.then === 'undefined', inst.catch(fn) ném
    // 'inst.catch is not a function'). Nhánh complete còn THAY inst.finished
    // bằng promise mới pending — đọc muộn sẽ nhận promise không bao giờ resolve.
    if (instance && instance.finished && typeof instance.finished.then === 'function') {
      instance.finished.then(() => clearInlineState(targets), () => clearInlineState(targets));
    }
  }

  // (4) animate — NEVER-THROW: trả instance | null. Thân hàm bọc try/catch toàn phần.
  function animate(targets, keyframes, options) {
    try {
      if (!motionOK() || !animeReady()) return null;
      const params = Object.assign({}, keyframes || {}, options || {});
      const callerComplete = params.complete;
      if (!params.easing) params.easing = DEFAULT_EASING;
      params.targets = targets;
      params.complete = () => {
        clearInlineState(targets);
        if (typeof callerComplete === 'function') callerComplete();
      };
      const instance = anime(params);
      trackFinished(instance, targets);
      return instance || null;
    } catch (error) {
      clearInlineState(targets);
      return null;
    }
  }

  // (6) staggerIn — cùng hợp đồng never-throw với animate, bắt buộc vì caller là
  // dòng mã hợp đồng (renderSuggestions sau hidden=false, vòng forEach chấm bài).
  function staggerIn(targets, options) {
    try {
      if (!motionOK() || !animeReady()) return null;
      const settings = Object.assign({ duration: 200, step: 20, translateY: 6 }, options || {});
      return animate(targets, {
        opacity: [0, 1],
        translateY: [settings.translateY, 0],
        delay: anime.stagger(settings.step, { start: 0 }),
      }, { duration: settings.duration, easing: settings.easing });
    } catch (error) {
      clearInlineState(targets);
      return null;
    }
  }

  /* ------------------------------------------------------------ revealIn */

  const pendingReveals = [];
  let pendingLoopRunning = false;

  function collectTargets(container, selector) {
    if (!container || typeof container.querySelectorAll !== 'function' || !selector) return [];
    const nodes = container.querySelectorAll(selector);
    const list = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const el = nodes[i];
      if (el && el.getAttribute('data-motion-revealed') !== '1') list.push(el);
    }
    return list;
  }

  // Tạo instance với from-values: anime áp opacity/translateY đồng bộ ngay lúc tạo
  // (trước tick rAF đầu tiên), không cần pre-hide bằng CSS hay JS — không pop.
  // delay = min(i * step, maxDelay): trùng anime.stagger(step,{start:0}) khi dưới
  // cap; build pin v3.2.2 không có option `end` cho stagger nên phải tự clamp.
  function runReveal(container, settings) {
    try {
      const targets = collectTargets(container, settings.selector);
      if (!targets.length) return;
      if (!motionOK() || !animeReady()) {
        clearInlineState(targets);
        return;
      }
      const instance = anime({
        targets,
        opacity: [0, 1],
        translateY: [settings.translateY, 0],
        duration: settings.duration,
        delay: (target, index) => Math.min(index * settings.step, settings.maxDelay),
        easing: settings.easing,
        complete: () => clearInlineState(targets),
      });
      trackFinished(instance, targets);
    } catch (error) {
      clearInlineState(collectTargets(container, settings.selector));
    }
  }

  function startReveal(container, settings) {
    let observer = null;
    try {
      observer = new IntersectionObserver((entries) => {
        try {
          let visible = false;
          for (let i = 0; i < entries.length; i += 1) {
            if (entries[i] && entries[i].isIntersecting) {
              visible = true;
              break;
            }
          }
          if (!visible) return;
          observer.unobserve(container);
          runReveal(container, settings);
        } catch (error) {
          try { observer.unobserve(container); } catch (unobserveError) { /* đã ngắt kết nối */ }
          clearInlineState(collectTargets(container, settings.selector));
        }
      }, { rootMargin: settings.rootMargin });
      observer.observe(container);
    } catch (error) {
      try { if (observer) observer.unobserve(container); } catch (unobserveError) { /* chưa kịp observe */ }
      clearInlineState(collectTargets(container, settings.selector));
    }
  }

  // Flush khi anime về muộn (hàng pending): card trong viewport (mở rộng theo
  // rootMargin) đã paint ở trạng thái tự nhiên — animate lại sẽ nháy
  // (opacity 1 → 0 → 1). Card đã hiện thì mark revealed, KHÔNG animate;
  // card ngoài vùng chưa paint nên đưa về IO như thường, không nháy.
  function parseRootMargin(value) {
    const tokens = String(value == null ? '' : value).trim().split(/\s+/);
    const num = (token, axis) => {
      const match = /^(-?\d*\.?\d+)(px|%)?$/.exec(token);
      if (!match) return 0;
      const n = parseFloat(match[1]);
      if (match[2] !== '%') return n;
      const base = axis === 'v'
        ? (typeof window !== 'undefined' && typeof window.innerHeight === 'number' ? window.innerHeight : 0)
        : (typeof window !== 'undefined' && typeof window.innerWidth === 'number' ? window.innerWidth : 0);
      return (n / 100) * base;
    };
    if (!tokens.length || !tokens[0]) return { top: 0, right: 0, bottom: 0, left: 0 };
    if (tokens.length === 1) return { top: num(tokens[0], 'v'), right: num(tokens[0], 'h'), bottom: num(tokens[0], 'v'), left: num(tokens[0], 'h') };
    if (tokens.length === 2) return { top: num(tokens[0], 'v'), right: num(tokens[1], 'h'), bottom: num(tokens[0], 'v'), left: num(tokens[1], 'h') };
    if (tokens.length === 3) return { top: num(tokens[0], 'v'), right: num(tokens[1], 'h'), bottom: num(tokens[2], 'v'), left: num(tokens[1], 'h') };
    return { top: num(tokens[0], 'v'), right: num(tokens[1], 'h'), bottom: num(tokens[2], 'v'), left: num(tokens[3], 'h') };
  }

  function intersectsExpandedViewport(rect, margin) {
    if (typeof window === 'undefined') return false;
    const width = typeof window.innerWidth === 'number' ? window.innerWidth : 0;
    const height = typeof window.innerHeight === 'number' ? window.innerHeight : 0;
    return rect.bottom >= -margin.top
      && rect.top <= height + margin.bottom
      && rect.right >= -margin.left
      && rect.left <= width + margin.right;
  }

  function flushPendingReveal(container, settings) {
    try {
      const targets = collectTargets(container, settings.selector);
      if (!targets.length) return;
      if (!motionOK() || !animeReady()) {
        clearInlineState(targets);
        return;
      }
      const margin = parseRootMargin(settings.rootMargin);
      let hasOffscreen = false;
      for (let i = 0; i < targets.length; i += 1) {
        const el = targets[i];
        let rect = null;
        try { rect = el.getBoundingClientRect(); } catch (error) { rect = null; }
        // Rect rỗng (container đang ẩn / chưa layout) → coi như ngoài viewport,
        // giữ hành vi IO cũ thay vì mark revealed vội.
        const hasLayout = rect && rect.width > 0 && rect.height > 0;
        if (hasLayout && intersectsExpandedViewport(rect, margin)) {
          clearInlineState(el);
        } else {
          hasOffscreen = true;
        }
      }
      // Còn target ngoài viewport: observe qua IO như nhánh thường — các target
      // đã hiện bị collectTargets bỏ qua (data-motion-revealed), không nháy lại.
      if (hasOffscreen) startReveal(container, settings);
    } catch (error) {
      // fail-visible: lỗi flush → mark revealed TOÀN BỘ hàng, không card nào kẹt ẩn.
      try { clearInlineState(collectTargets(container, settings.selector)); } catch (cleanupError) { /* bỏ qua */ }
    }
  }

  function dropPending(entry) {
    const index = pendingReveals.indexOf(entry);
    if (index !== -1) pendingReveals.splice(index, 1);
    clearInlineState(collectTargets(entry.container, entry.settings.selector));
  }

  function pollPending() {
    const now = Date.now();
    for (let i = pendingReveals.length - 1; i >= 0; i -= 1) {
      const entry = pendingReveals[i];
      try {
        if (!motionOK()) {
          dropPending(entry);
        } else if (animeReady()) {
          pendingReveals.splice(i, 1);
          flushPendingReveal(entry.container, entry.settings);
        } else if (now >= entry.deadline) {
          dropPending(entry);
        }
      } catch (error) {
        dropPending(entry);
      }
    }
  }

  function schedulePendingPoll(poll) {
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(poll);
    else setTimeout(poll, PENDING_POLL_FALLBACK_MS);
  }

  function ensurePendingPoll() {
    if (pendingLoopRunning || !pendingReveals.length) return;
    pendingLoopRunning = true;
    const poll = () => {
      pollPending();
      if (pendingReveals.length) schedulePendingPoll(poll);
      else pendingLoopRunning = false;
    };
    schedulePendingPoll(poll);
  }

  // (5) revealIn — reveal khi container sắp vào viewport; idempotent sau innerHTML
  // re-render (phần tử mang data-motion-revealed được bỏ qua, gọi lại sau render mới).
  function revealIn(container, options) {
    try {
      if (!container || typeof container.querySelectorAll !== 'function') return;
      const settings = Object.assign({
        selector: DEFAULT_SELECTOR,
        duration: 220,
        step: 28,
        maxDelay: 400,
        translateY: 10,
        easing: DEFAULT_EASING,
        rootMargin: '96px 0px 96px 0px',
      }, options || {});
      const targets = collectTargets(container, settings.selector);
      if (!targets.length) return;
      if (!motionOK() || typeof IntersectionObserver === 'undefined') {
        clearInlineState(targets);
        return;
      }
      if (!animeReady()) {
        // CDN chưa tới (defer cuối chuỗi): chờ bằng poll rAF/60ms tới deadline
        // 1500ms — anime sẵn sàng thì flush (card đã hiện trong viewport thì
        // skip animate để không nháy, xem flushPendingReveal), hết hạn thì mark
        // revealed và bỏ.
        pendingReveals.push({ container, settings, deadline: Date.now() + PENDING_DEADLINE_MS });
        ensurePendingPoll();
        return;
      }
      startReveal(container, settings);
    } catch (error) {
      try { clearInlineState(collectTargets(container, DEFAULT_SELECTOR)); } catch (cleanupError) { /* bỏ qua */ }
    }
  }

  if (reduceQuery && typeof reduceQuery.addEventListener === 'function') {
    reduceQuery.addEventListener('change', (event) => {
      if (event && event.matches) {
        while (pendingReveals.length) dropPending(pendingReveals[pendingReveals.length - 1]);
      }
    });
  }

  return { motionOK, animeReady, clearInlineState, animate, revealIn, staggerIn };
});
