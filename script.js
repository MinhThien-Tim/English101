(function () {
  "use strict";
  const documents = window.ENGLISH_101_DOCUMENTS || [];
  const categories = ["Grammar", "Vocabulary", "Writing", "Verb", "Guide", "Blog"];
  const categoryInfo = {
    Grammar: { icon: "grammar.svg", label: "Ngữ pháp", text: "Nắm vững cấu trúc và quy tắc nền tảng.", color: "topic-grammar" },
    Vocabulary: { icon: "vocabulary.svg", label: "Từ vựng", text: "Mở rộng vốn từ theo chủ đề và trình độ.", color: "topic-vocabulary" },
    Writing: { icon: "writing.svg", label: "Kỹ năng viết", text: "Biến ý tưởng thành câu chữ tự nhiên.", color: "topic-writing" },
    Verb: { icon: "verb-forms.svg", label: "Động từ & diễn đạt", text: "Làm chủ động từ, biến thể và cụm từ.", color: "topic-verbs" },
    Guide: { icon: "guide.svg", label: "Hướng dẫn", text: "Lộ trình và phương pháp học hiệu quả.", color: "topic-guide" },
    Blog: { icon: "writing.svg", label: "Blog học tập", text: "Chia sẻ cách học, ghi nhớ và luyện tập hiệu quả.", color: "topic-blog" }
  };
  const iconById = {
    "grammar-handbook":"interface.svg","conjunctions":"menu.svg","suffix-lab":"roots-suffixes.svg",
    "prepositions":"prepositions.svg","parts-of-speech":"confused-words.svg","tense-quiz":"tenses.svg",
    "vocabulary-atlas":"vocabulary.svg","root-atlas":"roots-suffixes.svg","c1-vocabulary":"interface.svg",
    "confusing-words":"confused-words.svg","ielts-collocations":"collocations.svg","hiking-collocations":"collocations.svg",
    "vocab-writing":"learning-pipeline.svg","reading-translation":"reading-translation.svg","reading-translation-alt":"reading-translation.svg",
    "vocab-1-2":"vocabulary.svg","vocab-3-4":"menu.svg","vocab-5-6":"interface.svg",
    "essay-guide":"writing.svg","writing-pipeline":"learning-pipeline.svg","english-verbs":"verb-forms.svg",
    "verb-forms":"verb-forms.svg","paraphrase":"paraphrasing.svg","phrasal-verbs":"phrasal-verbs.svg",
    "deep-reading":"deep-reading.svg","english-grammar-notes":"grammar.svg","english-learning-101":"english-learning.svg","blog-active-recall":"writing.svg"
  };
  const iconMarkup = (name) => {
    const id = String(name).replace(/\.svg$/i, "");
    return `<svg class="lesson-icon-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false"><use href="#lesson-icon-${id}"></use></svg>`;
  };
  const state = { category: "All", query: "" };
  const $ = (selector) => document.querySelector(selector);
  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const viewerUrl = (doc) => `viewer.html?id=${encodeURIComponent(doc.id)}`;

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
    return `<article class="document-card ${featured ? "featured-card" : ""}"><div class="card-top${typeBadge ? "" : " badge-less"}">${typeBadge}<span class="category-label">${info.label}</span></div><div class="document-icon ${info.color}">${iconMarkup(iconById[doc.id] || info.icon)}</div><h3>${escapeHTML(doc.title)}</h3><p>${escapeHTML(doc.description)}</p><div class="card-actions"><a class="view-button" href="${viewerUrl(doc)}">Đọc trực tiếp <span>→</span></a>${download}</div></article>`;
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
    const items = ["All", ...categories];
    $("#filters").innerHTML = items.map((item) => `<button class="filter-button${state.category === item ? " active" : ""}" data-filter="${item}">${item === "All" ? "Tất cả" : categoryInfo[item].label}<span>${item === "All" ? documents.length : documents.filter((doc) => doc.category === item).length}</span></button>`).join("");
  }

  function filteredDocuments() {
    const query = normalize(state.query);
    return documents.filter((doc) => (state.category === "All" || doc.category === state.category) && (!query || normalize(`${doc.title} ${doc.description} ${doc.category} ${doc.type}`).includes(query)));
  }

  function renderLibrary() {
    const results = filteredDocuments();
    $("#document-grid").innerHTML = results.map((doc) => cardTemplate(doc, false)).join("");
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

  document.addEventListener("click", (event) => {
    const category = event.target.closest("[data-category]");
    const filter = event.target.closest("[data-filter]");
    if (category) selectCategory(category.dataset.category);
    if (filter) selectCategory(filter.dataset.filter);
    if (event.target.closest("[data-show-all]")) selectCategory("All");
    if (event.target.closest("#clear-search")) { state.category = "All"; state.query = ""; $("#search-input").value = ""; renderLibrary(); }
  });

  $("#search-form").addEventListener("submit", (event) => { event.preventDefault(); state.query = $("#search-input").value.trim(); state.category = "All"; renderLibrary(); $("#library").scrollIntoView({ behavior: "smooth" }); });
  $("#search-input").addEventListener("input", (event) => { state.query = event.target.value.trim(); if (!state.query) renderLibrary(); });
  $(".menu-toggle").addEventListener("click", () => { const open = $(".site-header").classList.toggle("nav-open"); $(".menu-toggle").setAttribute("aria-expanded", String(open)); });
  $(".main-nav").addEventListener("click", () => { $(".site-header").classList.remove("nav-open"); $(".menu-toggle").setAttribute("aria-expanded", "false"); });
  $("#doc-count").textContent = documents.length;
  $("#year").textContent = new Date().getFullYear();
  renderTopics(); renderFeatured(); renderBlog(); renderLibrary();
}());
