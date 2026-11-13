(function () {
  "use strict";

  const documents = window.ENGLISH_101_DOCUMENTS || [];
  const ICONS = window.ENGLISH101_HOME_ICONS || { categories: {}, resources: {}, ui: {} };
  const shared = window.English101Learning || {};

  const CATEGORY_ORDER = ["Vocabulary", "Grammar", "Writing", "Verb", "Guide", "Blog"];
  const categoryInfo = {
    Vocabulary: { label: "Từ vựng", slug: "vocabulary" },
    Grammar: { label: "Ngữ pháp", slug: "grammar" },
    Writing: { label: "Kỹ năng viết", slug: "writing" },
    Verb: { label: "Động từ & diễn đạt", slug: "verb" },
    Guide: { label: "Hướng dẫn", slug: "guide" },
    Blog: { label: "Blog học tập", slug: "blog" }
  };

  const STARTER_IDS = ["english-learning-101", "grammar-handbook", "toeic-600"];
  const RECENT_KEY = "english101.recentResources";
  const RECENT_LIMIT = 8;
  const DESK_SLOTS = 4;

  const vocabularyGroups = [
    { key: "overview", label: "Tổng quát", ids: ["vocabulary-atlas", "vocab-1-2", "vocab-3-4", "vocab-5-6", "vocab-writing", "reading-translation"] },
    { key: "distinction", label: "Phân biệt", ids: ["confusing-words", "root-atlas"] },
    { key: "advanced", label: "Nâng cao · C1 / IELTS / TOEIC", ids: ["c1-vocabulary", "toeic-600", "ielts-collocations", "hiking-collocations"] }
  ];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  const viewerUrl = (doc) => `viewer.html?id=${encodeURIComponent(doc.id)}`;
  const byId = (id) => documents.find((doc) => doc.id === id);
  const countIn = (category) => documents.filter((doc) => doc.category === category).length;

  const glyph = (name) => `<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true">${ICONS.ui[name] || ""}</svg>`;
  const sketch = (doc, className) => {
    const drawing = ICONS.resources[doc.id] || ICONS.categories[doc.category] || "";
    return `<svg class="sketch ${className}" viewBox="0 0 120 96" aria-hidden="true" focusable="false">${drawing}</svg>`;
  };

  const state = { category: "All", query: "", sort: "featured", pdfOnly: false };
  const quickState = { category: "All", query: "" };

  /* ------------------------------------------------------- Lịch sử học tập */

  let historyIsPersistent = true;
  const recentStorage = {
    getItem(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        historyIsPersistent = false;
        return null;
      }
    },
    setItem(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        historyIsPersistent = false;
      }
    },
    removeItem(key) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        historyIsPersistent = false;
      }
    }
  };

  const recentStore = shared.createPersistence({ storage: recentStorage, key: RECENT_KEY, schema: 1 });

  function sanitizeRecent(value) {
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    const clean = [];
    for (const entry of value) {
      if (!entry || typeof entry.id !== "string" || seen.has(entry.id) || !byId(entry.id)) continue;
      seen.add(entry.id);
      clean.push({ id: entry.id, at: Number(entry.at) || 0 });
      if (clean.length === RECENT_LIMIT) break;
    }
    return clean;
  }

  let recent = sanitizeRecent(recentStore.load([]));

  function rememberResource(id) {
    if (!byId(id)) return;
    recent = sanitizeRecent([{ id, at: Date.now() }, ...recent.filter((entry) => entry.id !== id)]);
    recentStore.commit(recent);
    renderDesk();
  }

  function forgetResources() {
    recent = [];
    recentStore.clear();
    renderDesk();
    $("#desk-note").textContent = historyIsPersistent
      ? "Đã xóa lịch sử trên thiết bị này."
      : "Đã xóa lịch sử trong phiên này. Trình duyệt không cho phép cập nhật bộ nhớ.";
  }

  function relativeDay(timestamp) {
    if (!timestamp) return "Đã mở";
    const days = Math.floor((Date.now() - timestamp) / 86400000);
    if (days <= 0) return "Hôm nay";
    if (days === 1) return "Hôm qua";
    if (days < 30) return `${days} ngày trước`;
    return "Đã mở";
  }

  function renderDesk() {
    const hasHistory = recent.length > 0;
    const entries = hasHistory
      ? recent.slice(0, DESK_SLOTS).map((entry) => ({ doc: byId(entry.id), meta: `${categoryInfo[byId(entry.id).category].label} · ${relativeDay(entry.at)}` }))
      : STARTER_IDS.map(byId).filter(Boolean).map((doc) => ({ doc, meta: categoryInfo[doc.category].label }));

    // Bàn học luôn có ba dòng: lịch sử chưa đủ thì bù bằng gợi ý, khung không nhảy.
    const used = new Set(entries.map((entry) => entry.doc.id));
    const pool = [...STARTER_IDS, ...documents.filter((doc) => doc.featured).map((doc) => doc.id)];
    for (const id of pool) {
      if (entries.length >= 3) break;
      if (used.has(id)) continue;
      used.add(id);
      const doc = byId(id);
      if (doc) entries.push({ doc, meta: `${categoryInfo[doc.category].label} · Gợi ý` });
    }

    $("#desk-title").textContent = hasHistory ? "Tiếp tục học" : "Bắt đầu từ đây";
    $("#desk-clear").hidden = !hasHistory;
    $("#desk-list").innerHTML = entries.map(({ doc, meta }) =>
      `<li><a class="desk-item" data-topic="${categoryInfo[doc.category].slug}" href="${viewerUrl(doc)}">${sketch(doc, "")}<span class="desk-item-copy"><span class="desk-item-title">${escapeHTML(doc.title)}</span><span class="desk-item-meta">${escapeHTML(meta)}</span></span>${glyph("arrow")}</a></li>`
    ).join("");
    $("#desk-note").innerHTML = !historyIsPersistent
      ? '<i class="lamp-dot"></i> Trình duyệt không cho phép lưu; lịch sử chỉ giữ trong phiên này.'
      : hasHistory
        ? '<i class="lamp-dot"></i> Lưu trên thiết bị này, không gửi đi đâu cả.'
        : '<i class="lamp-dot"></i> Mở một tài liệu, lần sau trang chủ sẽ nhớ để bạn học tiếp.';
  }

  /* --------------------------------------------------------- Thẻ tài liệu */

  function cardHTML(doc, options) {
    const settings = options || {};
    const heading = settings.heading || "h3";
    const info = categoryInfo[doc.category];
    const badge = doc.type === "HTML" ? "" : `<span class="file-badge">${escapeHTML(doc.type)}</span>`;
    const lamp = doc.featured ? '<span class="lamp-tag">Nổi bật</span>' : "";
    const origin = doc.originLabel ? `<span class="origin-label">${escapeHTML(doc.originLabel)}</span>` : "";
    const download = doc.downloadable
      ? `<a class="doc-download" href="${encodeURI(doc.path)}" download aria-label="Tải ${escapeHTML(doc.title)}">${glyph("download")}<span>Tải xuống</span></a>`
      : "";
    const action = settings.action || "Đọc trực tiếp";
    return `<article class="${settings.className || "doc-card reveal"}" data-topic="${info.slug}">${sketch(doc, "doc-art")}<p class="doc-meta"><span class="topic-tag">${info.label}</span>${badge}${lamp}${origin}</p><${heading}><a class="doc-link" href="${viewerUrl(doc)}">${escapeHTML(doc.title)}</a></${heading}><p class="doc-desc">${escapeHTML(doc.description)}</p><p class="doc-foot"><span class="doc-open">${action} ${glyph("arrow")}</span>${download}</p></article>`;
  }

  function renderTopics() {
    $("#topic-grid").innerHTML = CATEGORY_ORDER.map((category) => {
      const info = categoryInfo[category];
      const doc = { id: `category-${info.slug}`, category };
      return `<button class="topic-card reveal" type="button" data-topic="${info.slug}" data-category="${category}" aria-pressed="false">${sketch(doc, "")}<span class="topic-name">${info.label}</span><span class="topic-count">${countIn(category)} tài liệu</span></button>`;
    }).join("");
  }

  function renderFilters() {
    const items = ["All", ...CATEGORY_ORDER];
    $("#filters").innerHTML = items.map((item) => {
      const slug = item === "All" ? "all" : categoryInfo[item].slug;
      const label = item === "All" ? "Tất cả" : categoryInfo[item].label;
      const count = item === "All" ? documents.length : countIn(item);
      return `<button class="chip" type="button" data-topic="${slug}" data-filter="${item}" aria-pressed="false">${label}<span>${count}</span></button>`;
    }).join("");
  }

  function syncFilterState() {
    $$("[data-filter]").forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.filter === state.category)));
    $$("[data-category]").forEach((card) => card.setAttribute("aria-pressed", String(card.dataset.category === state.category)));
    const filtered = state.category !== "All" || state.query !== "" || state.pdfOnly || state.sort !== "featured";
    $("#reset-filters").hidden = !filtered;
  }

  function matches(doc, query, category) {
    if (category !== "All" && doc.category !== category) return false;
    if (!query) return true;
    return normalize(`${doc.title} ${doc.description} ${categoryInfo[doc.category].label} ${doc.category} ${doc.type}`).includes(query);
  }

  function sortDocuments(list) {
    const featuredFirst = (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (state.sort === "az") return [...list].sort((a, b) => a.title.localeCompare(b.title, "vi", { sensitivity: "base" }));
    if (state.sort === "category") {
      return [...list].sort((a, b) => (CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)) || featuredFirst(a, b));
    }
    return [...list].sort(featuredFirst);
  }

  function visibleDocuments() {
    const query = normalize(state.query);
    const list = documents.filter((doc) => matches(doc, query, state.category) && (!state.pdfOnly || doc.type === "PDF"));
    return sortDocuments(list);
  }

  function vocabularyGroupOf(doc) {
    const group = vocabularyGroups.find((entry) => entry.ids.includes(doc.id));
    return group ? group.key : "other";
  }

  function groupedHTML(list) {
    return CATEGORY_ORDER.map((category) => {
      const docs = list.filter((doc) => doc.category === category);
      if (!docs.length) return "";
      const info = categoryInfo[category];
      let body;
      if (category === "Vocabulary") {
        const groups = [...vocabularyGroups.map((group) => ({ label: group.label, docs: docs.filter((doc) => vocabularyGroupOf(doc) === group.key) })),
          { label: "Khác", docs: docs.filter((doc) => vocabularyGroupOf(doc) === "other") }];
        body = groups.filter((group) => group.docs.length).map((group) =>
          `<div class="doc-group"><p class="subgroup-title">${group.label}</p><div class="document-grid">${group.docs.map((doc) => cardHTML(doc, { heading: "h4" })).join("")}</div></div>`
        ).join("");
      } else {
        body = `<div class="document-grid">${docs.map((doc) => cardHTML(doc, { heading: "h4" })).join("")}</div>`;
      }
      return `<section class="doc-group" data-topic="${info.slug}"><h3 class="group-title">${info.label}<span>${docs.length}</span></h3>${body}</section>`;
    }).join("");
  }

  function renderLibrary() {
    const list = visibleDocuments();
    const lessons = list.filter((doc) => doc.category !== "Blog");
    const grid = $("#document-grid");
    const grouped = state.sort === "category" && lessons.length > 0;
    grid.classList.toggle("is-grouped", grouped);
    grid.innerHTML = grouped ? groupedHTML(lessons) : lessons.map((doc) => cardHTML(doc)).join("");
    renderBlog(list);

    const parts = [`${list.length} tài liệu`];
    if (state.category !== "All") parts.push(categoryInfo[state.category].label);
    if (state.pdfOnly) parts.push("PDF");
    if (state.query) parts.push(`cho “${state.query}”`);
    $("#result-count").textContent = parts.join(" · ");

    $("#empty-state").hidden = list.length !== 0;
    $("#empty-detail").textContent = state.query
      ? `Không có tài liệu nào khớp với “${state.query}”. Thử từ khóa ngắn hơn, hoặc bỏ bớt bộ lọc.`
      : "Không có tài liệu nào trong bộ lọc này. Thử chọn chủ đề khác.";
    syncFilterState();
  }

  function renderBlog(list) {
    const posts = list.filter((doc) => doc.category === "Blog");
    $("#blog").hidden = posts.length === 0;
    $$('a[href="#blog"]').forEach((link) => { link.hidden = posts.length === 0; });
    $("#blog-slot").innerHTML = posts.map((doc) => cardHTML(doc, { className: "blog-card reveal", action: "Đọc bài viết" })).join("");
  }

  function setLibraryState(patch) {
    Object.assign(state, patch);
    renderLibrary();
    updateScrollState();
  }

  function scrollToLibrary() {
    $("#library").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* -------------------------------------------------------- Gợi ý tìm kiếm */

  const searchInput = $("#search-input");
  const suggestionList = $("#search-suggestions");
  let suggestionIndex = -1;

  function closeSuggestions() {
    suggestionList.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.removeAttribute("aria-activedescendant");
    suggestionIndex = -1;
  }

  function markSuggestion(index) {
    const options = [...suggestionList.querySelectorAll('[role="option"]')];
    if (!options.length) return;
    suggestionIndex = (index + options.length) % options.length;
    options.forEach((option, position) => option.setAttribute("aria-selected", String(position === suggestionIndex)));
    const active = options[suggestionIndex];
    searchInput.setAttribute("aria-activedescendant", active.id);
    active.scrollIntoView({ block: "nearest" });
  }

  function renderSuggestions() {
    const query = normalize(state.query);
    $("#search-clear").hidden = state.query === "";
    if (!query || document.activeElement !== searchInput) {
      closeSuggestions();
      return;
    }
    const hits = documents.filter((doc) => matches(doc, query, "All"));
    const preview = hits.slice(0, 6);
    if (!hits.length) {
      suggestionList.innerHTML = '<li class="suggest-empty" role="presentation">Không có tài liệu nào khớp. Thử từ khóa khác.</li>';
    } else {
      const rows = preview.map((doc, index) =>
        `<li role="option" id="suggestion-${index}" aria-selected="false" data-id="${escapeHTML(doc.id)}" data-topic="${categoryInfo[doc.category].slug}">${sketch(doc, "")}<span><span class="suggest-title">${escapeHTML(doc.title)}</span><span class="suggest-meta">${categoryInfo[doc.category].label}</span></span>${glyph("arrow")}</li>`
      ).join("");
      const all = `<li role="option" id="suggestion-all" aria-selected="false" data-action="all" data-topic="all"><span></span><span class="suggest-all">Xem tất cả ${hits.length} kết quả trong kho</span>${glyph("arrow")}</li>`;
      suggestionList.innerHTML = rows + all;
    }
    suggestionList.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    suggestionIndex = -1;
    searchInput.removeAttribute("aria-activedescendant");
  }

  function openSuggestion(option) {
    if (!option) return false;
    if (option.dataset.action === "all") {
      $("#pdf-only").checked = false;
      setLibraryState({ category: "All", pdfOnly: false });
      closeSuggestions();
      scrollToLibrary();
      return true;
    }
    const doc = byId(option.dataset.id);
    if (!doc) return false;
    rememberResource(doc.id);
    window.location.assign(viewerUrl(doc));
    return true;
  }

  /* ---------------------------------------------------------- Mục lục nhanh */

  const indexDialog = $("#quick-index");
  const indexButton = $("#index-open");
  const indexController = shared.createDialogController(indexDialog, {
    onClose: () => indexButton.setAttribute("aria-expanded", "false")
  });

  function openIndex() {
    indexController.open(indexButton);
    indexButton.setAttribute("aria-expanded", "true");
    renderQuickIndex();
  }

  function renderQuickFilters() {
    const items = ["All", ...CATEGORY_ORDER];
    $("#quick-filters").innerHTML = items.map((item) => {
      const slug = item === "All" ? "all" : categoryInfo[item].slug;
      const label = item === "All" ? "Tất cả" : categoryInfo[item].label;
      const count = item === "All" ? documents.length : countIn(item);
      return `<button class="chip" type="button" data-topic="${slug}" data-quick-category="${item}" aria-pressed="false">${label}<span>${count}</span></button>`;
    }).join("");
  }

  function renderQuickIndex() {
    const query = normalize(quickState.query);
    const hits = documents.filter((doc) => matches(doc, query, quickState.category));
    $$("[data-quick-category]").forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.quickCategory === quickState.category)));
    $("#quick-count").textContent = `${hits.length} tài liệu · chọn để mở ngay`;
    $("#quick-list").innerHTML = hits.length
      ? hits.map((doc) => `<a class="qi-item" data-topic="${categoryInfo[doc.category].slug}" href="${viewerUrl(doc)}">${sketch(doc, "")}<span><span class="qi-item-title">${escapeHTML(doc.title)}</span><span class="qi-item-meta">${categoryInfo[doc.category].label}</span></span>${glyph("arrow")}</a>`).join("")
      : '<p class="qi-empty">Không tìm thấy bài học phù hợp.</p>';
  }

  /* ---------------------------------------------------------------- Sự kiện */

  document.addEventListener("click", (event) => {
    const resourceLink = event.target.closest('a[href^="viewer.html?id="]');
    if (resourceLink) {
      const id = new URL(resourceLink.href, window.location.href).searchParams.get("id");
      rememberResource(id);
    }

    const topic = event.target.closest("[data-category]");
    if (topic) {
      const next = state.category === topic.dataset.category ? "All" : topic.dataset.category;
      setLibraryState({ category: next });
      scrollToLibrary();
      return;
    }

    const filter = event.target.closest("[data-filter]");
    if (filter) {
      setLibraryState({ category: filter.dataset.filter });
      return;
    }

    const quickCategory = event.target.closest("[data-quick-category]");
    if (quickCategory) {
      quickState.category = quickCategory.dataset.quickCategory;
      renderQuickIndex();
      return;
    }

    const hint = event.target.closest("[data-suggest]");
    if (hint) {
      searchInput.value = hint.dataset.suggest;
      setLibraryState({ query: hint.dataset.suggest, category: "All" });
      closeSuggestions();
      scrollToLibrary();
      return;
    }

    if (event.target.closest("#search-clear")) {
      searchInput.value = "";
      setLibraryState({ query: "" });
      closeSuggestions();
      searchInput.focus();
      return;
    }

    if (event.target.closest("#reset-filters") || event.target.closest("#clear-search")) {
      searchInput.value = "";
      $("#pdf-only").checked = false;
      $("#sort-select").value = "featured";
      setLibraryState({ category: "All", query: "", pdfOnly: false, sort: "featured" });
      closeSuggestions();
      return;
    }

    if (event.target.closest("#desk-clear")) {
      forgetResources();
      return;
    }

    if (event.target.closest("#index-open")) {
      openIndex();
      return;
    }

    if (event.target.closest("#index-close") || event.target.closest("#open-library")) {
      indexController.close();
    }
  });

  document.addEventListener("auxclick", (event) => {
    if (event.button !== 1) return;
    const link = event.target.closest('a[href^="viewer.html?id="]');
    if (link) rememberResource(new URL(link.href, window.location.href).searchParams.get("id"));
  });

  suggestionList.addEventListener("mousedown", (event) => {
    const option = event.target.closest('[role="option"]');
    if (!option) return;
    event.preventDefault();
    openSuggestion(option);
  });

  searchInput.addEventListener("input", (event) => {
    setLibraryState({ query: event.target.value.trim() });
    renderSuggestions();
  });

  searchInput.addEventListener("focus", renderSuggestions);

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (suggestionList.hidden) renderSuggestions();
      if (suggestionList.hidden) return;
      event.preventDefault();
      markSuggestion(suggestionIndex + (event.key === "ArrowDown" ? 1 : -1));
      return;
    }
    if (event.key === "Escape" && !suggestionList.hidden) {
      event.preventDefault();
      closeSuggestions();
      return;
    }
    if (event.key === "Tab") closeSuggestions();
  });

  $("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const options = [...suggestionList.querySelectorAll('[role="option"]')];
    if (!suggestionList.hidden && suggestionIndex >= 0 && openSuggestion(options[suggestionIndex])) return;
    setLibraryState({ query: searchInput.value.trim() });
    closeSuggestions();
    scrollToLibrary();
  });

  $("#search-form").addEventListener("focusout", (event) => {
    if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) closeSuggestions();
  });

  $("#sort-select").addEventListener("change", (event) => setLibraryState({ sort: event.target.value }));
  $("#pdf-only").addEventListener("change", (event) => setLibraryState({ pdfOnly: event.target.checked }));
  $("#quick-search").addEventListener("input", (event) => { quickState.query = event.target.value.trim(); renderQuickIndex(); });
  $("#quick-search").addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.isComposing) return;
    // Ô search gốc dùng Esc để xóa chữ trước khi dialog nhận được phím.
    event.preventDefault();
    indexController.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
    if (indexDialog.open) return;
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (/^(input|textarea|select)$/i.test(tag)) return;
    event.preventDefault();
    openIndex();
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    recent = sanitizeRecent(recentStore.load([]));
    renderDesk();
  });

  /* ------------------------------------------------ Trạng thái cuộn và nav */

  const header = $(".site-header");
  const navLinks = $$("[data-nav]");
  const sections = navLinks.map((link) => document.getElementById(link.dataset.nav)).filter(Boolean);
  let scrollTicking = false;

  function updateScrollState() {
    scrollTicking = false;
    header.classList.toggle("is-stuck", window.scrollY > 8);
    const line = window.scrollY + header.offsetHeight + 90;
    let current = "";
    for (const section of sections) {
      if (section.hidden) continue;
      if (section.getBoundingClientRect().top + window.scrollY <= line) current = section.id;
    }
    navLinks.forEach((link) => {
      if (link.dataset.nav === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollState);
  }, { passive: true });

  // Trình duyệt chưa có scroll-driven animation: tự bật mép mờ của hàng cuộn ngang.
  function setupScrollFades() {
    if (window.CSS && CSS.supports("animation-timeline", "scroll()")) return;
    $$(".chip-row, .section-nav ul").forEach((scroller) => {
      const first = scroller.firstElementChild;
      const last = scroller.lastElementChild;
      if (!first || !last) return;
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          scroller.classList.toggle(entry.target === first ? "more-start" : "more-end", entry.intersectionRatio < 1);
        }
      }, { root: scroller, threshold: 1, rootMargin: "1px" });
      observer.observe(first);
      observer.observe(last);
    });
  }

  /* ------------------------------------------------------------- Khởi động */

  $("#doc-count").textContent = documents.length;
  $("#fact-docs").textContent = documents.length;
  $("#fact-topics").textContent = CATEGORY_ORDER.length;
  $("#year").textContent = new Date().getFullYear();
  indexButton.setAttribute("aria-expanded", "false");

  renderTopics();
  renderFilters();
  renderQuickFilters();
  renderLibrary();
  renderDesk();
  renderQuickIndex();
  setupScrollFades();
  updateScrollState();
}());