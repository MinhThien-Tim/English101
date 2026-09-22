(function () {
  "use strict";
  const documents = window.ENGLISH_101_DOCUMENTS || [];
  const categories = ["Vocabulary", "Grammar", "Writing", "Verb", "Guide", "Blog"];
  const categoryInfo = {
    Grammar: { icon: "grammar.svg", label: "Ngữ pháp", text: "Nắm vững cấu trúc và quy tắc nền tảng.", color: "topic-grammar" },
    Vocabulary: { icon: "vocabulary.svg", label: "Từ vựng", text: "Mở rộng vốn từ theo chủ đề và trình độ.", color: "topic-vocabulary" },
    Writing: { icon: "writing.svg", label: "Kỹ năng viết", text: "Biến ý tưởng thành câu chữ tự nhiên.", color: "topic-writing" },
    Verb: { icon: "verb-forms.svg", label: "Động từ & diễn đạt", text: "Làm chủ động từ, biến thể và cụm từ.", color: "topic-verbs" },
    Guide: { icon: "guide.svg", label: "Hướng dẫn", text: "Lộ trình và phương pháp học hiệu quả.", color: "topic-guide" },
    Blog: { icon: "writing.svg", label: "Blog học tập", text: "Chia sẻ cách học, ghi nhớ và luyện tập hiệu quả.", color: "topic-blog" }
  };
  // Simple, title-specific pictograms for lesson cards. They deliberately use
  // familiar study objects instead of generic interface illustrations.
  const lessonIconById = {
    "grammar-handbook": '<path d="M27 25c12-2 23 1 33 8 10-7 21-10 33-8v39c-12-2-23 1-33 8-10-7-21-10-33-8V25Z"/><path d="M60 33v39M36 38h14M70 38h13M70 47h10"/><path class="icon-accent" d="m82 17 5 5 9-10"/>',
    "conjunctions": '<rect x="20" y="25" width="45" height="30" rx="15"/><rect x="55" y="33" width="45" height="30" rx="15"/><path d="M46 40h28"/><circle class="icon-dot" cx="60" cy="44" r="5"/>',
    "suffix-lab": '<rect x="17" y="29" width="48" height="31" rx="9"/><rect class="icon-soft" x="70" y="29" width="33" height="31" rx="9"/><path d="M65 44h5"/><text x="41" y="49">ROOT</text><text x="86.5" y="49">-LY</text>',
    "prepositions": '<path d="M27 54h66v20H27z"/><circle class="icon-dot" cx="60" cy="25" r="10"/><path d="M60 35v17m-6-6 6 6 6-6"/>',
    "parts-of-speech": '<rect class="icon-soft" x="42" y="31" width="36" height="25" rx="8"/><path d="M42 43H25m53 0h17M60 31V17M60 56v15"/><text x="60" y="47">WORD</text><text x="25" y="39">N</text><text x="95" y="39">V</text><text x="60" y="14">ADJ</text>',
    "tense-quiz": '<path d="M18 61h84m-8-7 8 7-8 7"/><circle class="icon-dot" cx="31" cy="61" r="5"/><circle class="icon-dot" cx="60" cy="61" r="5"/><circle class="icon-dot" cx="89" cy="61" r="5"/><circle cx="60" cy="29" r="17"/><path d="M60 19v11l8 5"/>',
    "vocabulary-atlas": '<path d="m20 24 26-8 28 8 26-8v49l-26 8-28-8-26 8V24Z"/><path d="M46 16v49m28-41v49"/><path class="icon-accent" d="m51 48 8 8 15-19"/>',
    "root-atlas": '<path d="M60 20v33m0-22L45 40m15 1 16-10M60 53 43 70m17-17 17 17m-17-8v13"/><circle class="icon-dot" cx="60" cy="18" r="9"/><circle class="icon-soft" cx="42" cy="42" r="8"/><circle class="icon-soft" cx="78" cy="32" r="8"/>',
    "c1-vocabulary": '<rect x="27" y="22" width="58" height="43" rx="10"/><path class="icon-soft" d="M36 16h57a8 8 0 0 1 8 8v38"/><text class="icon-title" x="56" y="50">C1</text><path d="M35 72h50"/>',
    "confusing-words": '<rect x="18" y="25" width="37" height="38" rx="10"/><rect class="icon-soft" x="65" y="25" width="37" height="38" rx="10"/><text class="icon-title" x="36.5" y="50">A?</text><text class="icon-title" x="83.5" y="50">B?</text><path d="m52 18 8-6 8 6M68 70l-8 6-8-6"/>',
    "ielts-collocations": '<rect x="16" y="29" width="39" height="30" rx="10"/><rect class="icon-soft" x="65" y="29" width="39" height="30" rx="10"/><path d="M55 44h10"/><text x="35.5" y="49">WORD</text><text x="84.5" y="49">WORD</text><path class="icon-accent" d="m52 70 8 5 8-5"/>',
    "hiking-collocations": '<path d="m16 68 28-39 15 20 11-15 34 34H16Z"/><path class="icon-accent" d="M44 29v-9h19l-5 6 5 6H47M35 68c8-13 18-18 31-19"/>',
    "vocab-writing": '<rect x="19" y="22" width="55" height="41" rx="9"/><path d="M30 35h30M30 45h21"/><path class="icon-accent" d="m78 31 18 14-25 31-18 5 4-18 21-32Z"/>',
    "reading-translation": '<path d="M16 24h42v28H35l-10 9v-9h-9V24Z"/><path class="icon-soft" d="M62 35h42v28h-9v9l-10-9H62V35Z"/><text x="37" y="43">EN</text><text x="83" y="54">VI</text>',
    "reading-translation-alt": '<path d="M16 24h42v28H35l-10 9v-9h-9V24Z"/><path class="icon-soft" d="M62 35h42v28h-9v9l-10-9H62V35Z"/><text x="37" y="43">EN</text><text x="83" y="54">VI</text><path class="icon-accent" d="m49 69 11 7 11-7"/>',
    "vocab-1-2": '<rect x="23" y="20" width="31" height="45" rx="9"/><rect class="icon-soft" x="66" y="20" width="31" height="45" rx="9"/><text class="icon-title" x="38.5" y="49">1</text><text class="icon-title" x="81.5" y="49">2</text><path d="M32 72h56"/>',
    "vocab-3-4": '<rect x="23" y="20" width="31" height="45" rx="9"/><rect class="icon-soft" x="66" y="20" width="31" height="45" rx="9"/><text class="icon-title" x="38.5" y="49">3</text><text class="icon-title" x="81.5" y="49">4</text><path d="M32 72h56"/>',
    "vocab-5-6": '<rect x="23" y="20" width="31" height="45" rx="9"/><rect class="icon-soft" x="66" y="20" width="31" height="45" rx="9"/><text class="icon-title" x="38.5" y="49">5</text><text class="icon-title" x="81.5" y="49">6</text><path d="M32 72h56"/>',
    "essay-guide": '<path d="M25 15h52l14 14v44H25V15Z"/><path d="M77 15v14h14M36 36h30M36 47h24M36 58h18"/><path class="icon-accent" d="m83 42 13 10-20 25-13 5 3-13 17-27Z"/>',
    "writing-pipeline": '<circle class="icon-soft" cx="27" cy="44" r="13"/><path d="M40 44h28m-7-7 7 7-7 7"/><rect x="76" y="27" width="28" height="34" rx="8"/><path class="icon-accent" d="M22 44h10M27 39v10"/><text class="icon-title" x="90" y="51">A</text>',
    "english-verbs": '<path d="M18 22h84v43H67L56 76v-11H18V22Z"/><text class="icon-title" x="47" y="51">DO</text><path class="icon-accent" d="m74 31-8 14h9l-7 14"/>',
    "verb-forms": '<rect x="13" y="29" width="17" height="29" rx="6"/><rect x="33" y="29" width="17" height="29" rx="6"/><rect class="icon-soft" x="53" y="29" width="17" height="29" rx="6"/><rect x="73" y="29" width="17" height="29" rx="6"/><rect x="93" y="29" width="17" height="29" rx="6"/><text x="21.5" y="47">1</text><text x="41.5" y="47">2</text><text x="61.5" y="47">3</text><text x="81.5" y="47">4</text><text x="101.5" y="47">5</text>',
    "paraphrase": '<path d="M15 22h40v27H32l-9 8v-8h-8V22Z"/><path class="icon-soft" d="M65 39h40v27h-8v8l-9-8H65V39Z"/><path d="M51 63c10 8 20 8 29 2m-3 7 3-7-7-2M69 25c-10-8-20-8-29-2m3-7-3 7 7 2"/>',
    "phrasal-verbs": '<rect x="17" y="28" width="38" height="32" rx="10"/><rect class="icon-soft" x="65" y="28" width="38" height="32" rx="10"/><path d="M55 44h10"/><text class="icon-title" x="36" y="50">GO</text><text class="icon-title" x="84" y="50">ON</text>',
    "deep-reading": '<path d="M17 24c17-3 30 1 43 10 13-9 26-13 43-10v39c-17-3-30 1-43 10-13-9-26-13-43-10V24Z"/><path d="M60 34v39M27 38h20M27 47h16"/><circle class="icon-soft" cx="83" cy="45" r="12"/><path d="m92 54 10 10"/>',
    "english-grammar-notes": '<rect x="27" y="15" width="66" height="58" rx="9"/><path d="M40 29h39M40 40h31M40 51h24M35 15v58"/><path class="icon-accent" d="m70 60 5 5 10-12"/>',
    "english-learning-101": '<circle cx="60" cy="44" r="28"/><path d="m69 34-6 16-16 6 6-16 16-6Z"/><circle class="icon-dot" cx="60" cy="44" r="4"/><path d="M60 10v6m0 56v6M26 44h6m56 0h6"/>',
    "blog-active-recall": '<path d="M45 65c-14-3-23-14-23-27 0-15 12-27 27-27 12 0 22 7 26 17"/><path d="M72 19l3 9-10 2M75 23c14 3 23 14 23 27 0 15-12 27-27 27-12 0-22-7-26-17"/><path d="m48 69-3-9 10-2"/><path class="icon-accent" d="M60 29v30m-9-21c0-5 4-9 9-9s9 4 9 9c0 4-2 6-5 8-3 2-4 4-4 7"/>'
  };
  const iconMarkup = (name) => {
    const id = String(name).replace(/\.svg$/i, "");
    return `<svg class="lesson-icon-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false"><use href="#lesson-icon-${id}"></use></svg>`;
  };
  const lessonIconMarkup = (doc) => {
    const drawing = lessonIconById[doc.id];
    if (!drawing) return iconMarkup(categoryInfo[doc.category].icon);
    return `<svg class="lesson-icon-art simple-lesson-icon" viewBox="0 0 120 88" aria-hidden="true" focusable="false"><rect class="icon-canvas" x="2" y="2" width="116" height="84" rx="18"></rect><g class="icon-drawing">${drawing}</g></svg>`;
  };
  const state = { category: "Vocabulary", query: "" };
  const quickState = { category: "Vocabulary", query: "" };
  const vocabularyGroups = {
    overview: "1. Tổng quát",
    distinction: "2. Phân biệt",
    c1: "3. C1 – IELTS"
  };
  const vocabularyGroupState = {
    overview: true,
    distinction: true,
    c1: true
  };
  const $ = (selector) => document.querySelector(selector);
  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const viewerUrl = (doc) => `viewer.html?id=${encodeURIComponent(doc.id)}`;

  function getVocabularyGroupKey(doc) {
    if (["vocab-1-2", "vocab-3-4", "vocab-5-6", "vocab-writing", "reading-translation", "reading-translation-alt", "vocabulary-atlas"].includes(doc.id)) return "overview";
    if (["confusing-words", "root-atlas"].includes(doc.id)) return "distinction";
    if (["c1-vocabulary", "ielts-collocations", "hiking-collocations"].includes(doc.id)) return "c1";
    return null;
  }

  function getVocabularyGroupLabel(key) {
    return vocabularyGroups[key] || "Khác";
  }

  function renderTopics() {
    $("#topic-grid").innerHTML = categories.map((category) => {
      const info = categoryInfo[category];
      const count = documents.filter((doc) => doc.category === category).length;
      const active = state.category === category;
      return `<button class="topic-card ${info.color}${active ? " active" : ""}" data-category="${category}" aria-pressed="${active}"><span class="topic-icon">${iconMarkup(info.icon)}</span><span class="topic-copy"><strong>${info.label}</strong><small>${info.text}</small></span><span class="topic-action"><span class="topic-count">${count}<small> tài liệu</small></span><span class="topic-open">Mở <b aria-hidden="true">→</b></span></span></button>`;
    }).join("");
  }

  function cardTemplate(doc, featured) {
    const info = categoryInfo[doc.category];
    const download = doc.downloadable ? `<a class="icon-button" href="${doc.path}" download title="Tải xuống" aria-label="Tải ${escapeHTML(doc.title)}">↓</a>` : "";
    const typeBadge = doc.type === "HTML" ? "" : `<span class="file-badge ${info.color}">${escapeHTML(doc.type)}</span>`;
    const origin = doc.originLabel ? `<span class="origin-label">${escapeHTML(doc.originLabel)}</span>` : "";
    return `<article class="document-card ${featured ? "featured-card" : ""}"><div class="card-top${typeBadge ? "" : " badge-less"}">${typeBadge}<span class="category-label">${info.label}</span></div><div class="document-icon ${info.color}">${lessonIconMarkup(doc)}</div>${origin}<h3>${escapeHTML(doc.title)}</h3><p>${escapeHTML(doc.description)}</p><div class="card-actions"><a class="view-button" href="${viewerUrl(doc)}">Đọc trực tiếp <span>→</span></a>${download}</div></article>`;
  }

  function renderFeatured() {
    $("#featured-grid").innerHTML = documents.filter((doc) => doc.featured).slice(0, 3).map((doc) => cardTemplate(doc, true)).join("");
  }

  function renderBlog() {
    const blogGrid = $("#blog-grid");
    if (!blogGrid) return;
    blogGrid.innerHTML = documents.filter((doc) => doc.category === "Blog").slice(0, 3).map((doc) => cardTemplate(doc, true)).join("");
  }

  function renderFilters() {
    const orderedCategories = ["Vocabulary", "Grammar", "Writing", "Verb", "Guide", "Blog"];
    const items = [...orderedCategories, "All"];
    $("#filters").innerHTML = items.map((item) => {
      const filterClass = item === "All" ? "filter-all" : `filter-${item.toLowerCase()}`;
      return `<button class="filter-button ${filterClass}${state.category === item ? " active" : ""}" data-filter="${item}">${item === "All" ? "Tất cả" : categoryInfo[item].label}<span>${item === "All" ? documents.length : documents.filter((doc) => doc.category === item).length}</span></button>`;
    }).join("");
  }

  function filteredDocuments() {
    const query = normalize(state.query);
    return documents.filter((doc) => (state.category === "All" || doc.category === state.category) && (!query || normalize(`${doc.title} ${doc.description} ${doc.category} ${doc.type}`).includes(query)));
  }

  function renderLibrary() {
    const results = filteredDocuments();
    const groupedResults = state.category === "Vocabulary" ? Object.entries(results.reduce((groups, doc) => {
      const groupKey = getVocabularyGroupKey(doc) || "other";
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(doc);
      return groups;
    }, {})).map(([groupKey, docs]) => ({ groupKey, docs })) : [{ groupKey: "", docs: results }];

    $("#document-grid").innerHTML = groupedResults.map(({ groupKey, docs }) => {
      const cards = docs.map((doc) => cardTemplate(doc, false)).join("");
      if (!groupKey || groupKey === "other") return cards;
      const expanded = vocabularyGroupState[groupKey] !== false;
      return `<div class="vocab-group" data-group-key="${groupKey}"><button class="vocab-group-header" type="button" data-toggle-group="${groupKey}" aria-expanded="${expanded}"><span>${getVocabularyGroupLabel(groupKey)}</span><span class="vocab-group-toggle">${expanded ? "▾" : "▸"}</span></button><div class="vocab-group-cards" ${expanded ? "" : "hidden"}>${cards}</div></div>`;
    }).join("");
    $("#result-count").textContent = `${results.length} tài liệu${state.query ? ` cho “${state.query}”` : ""}`;
    $("#empty-state").hidden = results.length !== 0;
    renderFilters();
  }

  function selectCategory(category) {
    state.category = category;
    renderTopics();
    renderLibrary();
    $("#library").scrollIntoView({ behavior: "smooth" });
  }

  function renderQuickIndex() {
    const query = normalize(quickState.query);
    const results = documents.filter((doc) =>
      (quickState.category === "All" || doc.category === quickState.category) &&
      (!query || normalize(`${doc.title} ${doc.description} ${doc.category}`).includes(query))
    );
    const orderedCategories = ["Vocabulary", "Grammar", "Writing", "Verb", "Guide", "Blog"];
    $("#quick-filters").innerHTML = [...orderedCategories, "All"].map((category) => {
      const count = category === "All" ? documents.length : documents.filter((doc) => doc.category === category).length;
      const filterClass = category === "All" ? "filter-all" : `filter-${category.toLowerCase()}`;
      return `<button class="${filterClass}${quickState.category === category ? " active" : ""}" data-quick-category="${category}">${category === "All" ? "Tất cả" : categoryInfo[category].label} · ${count}</button>`;
    }).join("");
    $("#quick-count").textContent = `${results.length} bài học · Chọn để mở ngay`;
    $("#quick-list").innerHTML = results.length ? results.map((doc, index) => {
      const minutes = 12 + (index % 5) * 6;
      const level = doc.category === "Guide" ? "Cơ bản" : doc.category === "Writing" ? "Nâng cao" : ["Cơ bản", "Trung bình", "Nâng cao"][index % 3];
      return `<a class="quick-item" href="${viewerUrl(doc)}"><span class="quick-item-title">${escapeHTML(doc.title)}</span><span class="quick-item-meta"><b>${categoryInfo[doc.category].label}</b><span>${level}</span><span>${minutes} phút</span></span><span class="quick-item-arrow">→</span></a>`;
    }).join("") : '<div class="quick-empty">Không tìm thấy bài học phù hợp.</div>';
  }

  function setQuickIndex(open) {
    $("#quick-index").classList.toggle("open", open);
    $("#quick-index").setAttribute("aria-hidden", String(!open));
    $("#index-launcher").setAttribute("aria-expanded", String(open));
    $("#index-backdrop").hidden = !open;
    document.body.classList.toggle("index-open", open);
    if (open) setTimeout(() => $("#quick-search").focus(), 150);
  }

  document.addEventListener("click", (event) => {
    const category = event.target.closest("[data-category]");
    const filter = event.target.closest("[data-filter]");
    const quickCategory = event.target.closest("[data-quick-category]");
    const toggleGroup = event.target.closest("[data-toggle-group]");
    if (category) selectCategory(category.dataset.category);
    if (filter) selectCategory(filter.dataset.filter);
    if (quickCategory) { quickState.category = quickCategory.dataset.quickCategory; renderQuickIndex(); }
    if (toggleGroup) {
      const groupKey = toggleGroup.dataset.toggleGroup;
      vocabularyGroupState[groupKey] = !vocabularyGroupState[groupKey];
      renderLibrary();
    }
    if (event.target.closest("#index-launcher")) setQuickIndex(true);
    if (event.target.closest("#index-close") || event.target.closest("#index-backdrop") || event.target.closest("#open-library")) setQuickIndex(false);
    if (event.target.closest("[data-show-all]")) selectCategory("All");
    if (event.target.closest("#clear-search")) { state.category = "All"; state.query = ""; $("#search-input").value = ""; renderLibrary(); }
  });

  $("#search-form").addEventListener("submit", (event) => { event.preventDefault(); state.query = $("#search-input").value.trim(); state.category = "All"; renderLibrary(); $("#library").scrollIntoView({ behavior: "smooth" }); });
  $("#search-input").addEventListener("input", (event) => { state.query = event.target.value.trim(); if (!state.query) renderLibrary(); });
  $("#quick-search").addEventListener("input", (event) => { quickState.query = event.target.value.trim(); renderQuickIndex(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setQuickIndex(false);
    if (event.key === "/" && !$("#quick-index").classList.contains("open") && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      event.preventDefault(); setQuickIndex(true);
    }
  });
  $(".menu-toggle").addEventListener("click", () => { const open = $(".site-header").classList.toggle("nav-open"); $(".menu-toggle").setAttribute("aria-expanded", String(open)); });
  $(".main-nav").addEventListener("click", () => { $(".site-header").classList.remove("nav-open"); $(".menu-toggle").setAttribute("aria-expanded", "false"); });
  $("#doc-count").textContent = documents.length;
  $("#year").textContent = new Date().getFullYear();
  renderTopics(); renderFeatured(); renderBlog(); renderLibrary(); renderQuickIndex();
}());
