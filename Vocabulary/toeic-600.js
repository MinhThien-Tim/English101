(() => {
  'use strict';

  const dataset = window.ENGLISH101_TOEIC_600_DATA;
  const entries = dataset.entries;
  const byId = new Map(entries.map(entry => [entry.id, entry]));
  const learning = window.English101Learning;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const STORAGE_KEY = 'english101-toeic-600-v1';
  const defaults = {saved: [], known: [], wrong: [], best: null};
  const persistence = learning.createPersistence({storage: localStorage, key: STORAGE_KEY, schema: 'toeic-600-v1', migrateLegacy: value => ({...defaults, ...value})});
  let state = sanitize(persistence.load(defaults));
  let currentTab = 'library';
  let learningSession = null;
  let activeKind = null;
  let practiceMode = 'choice';
  let selectedChoice = '';
  const mediaIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="9" r="1.6" fill="currentColor"/><path d="m5.5 17 4.2-4.3 3.1 3 2.2-2.2 3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function sanitize(value) {
    const valid = list => Array.isArray(list) ? [...new Set(list.filter(id => byId.has(id)))] : [];
    return {saved: valid(value?.saved), known: valid(value?.known), wrong: valid(value?.wrong), best: Number.isFinite(value?.best) ? value.best : null};
  }

  function commit() {
    try { persistence.commit(state); } catch (_) {}
    updateStats();
  }

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const normalize = value => String(value ?? '').toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();

  function shuffle(list) {
    const result = [...list];
    for (let index = result.length - 1; index > 0; index--) {
      const random = Math.floor(Math.random() * (index + 1));
      [result[index], result[random]] = [result[random], result[index]];
    }
    return result;
  }

  function speak(entry) {
    if (!entry) return;
    if (window.EnglishPronunciation?.speak(entry.word, {lang: 'en-US', rate: .82})) return;
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(entry.word);
    utterance.lang = 'en-US';
    utterance.rate = .82;
    window.speechSynthesis.speak(utterance);
  }

  function updateStats() {
    $('#totalStat').textContent = entries.length;
    $('#knownStat').textContent = state.known.length;
    $('#savedStat').textContent = state.saved.length;
    $('#wrongStat').textContent = state.wrong.length;
    $('#practiceNote').textContent = state.wrong.length ? `${state.wrong.length} mục đang chờ ôn lại.` : 'Chưa có câu sai. Hãy bắt đầu một phiên luyện tập.';
  }

  function optionMarkup() {
    const groups = [...new Map(dataset.lessons.map(lesson => [lesson.group, lesson.groupTitle]))];
    const scope = [`<option value="ALL">Tất cả 600 mục</option>`, ...groups.map(([number, title]) => `<option value="group:${number}">Nhóm ${number} · ${escapeHTML(title)}</option>`), ...dataset.lessons.map(lesson => `<option value="lesson:${lesson.number}">Lesson ${lesson.number} · ${escapeHTML(lesson.topic)}</option>`)].join('');
    $('#flashScope').innerHTML = scope;
    $('#practiceScope').innerHTML = scope;
    $('#groupFilter').innerHTML += groups.map(([number, title]) => `<option value="${number}">Nhóm ${number} · ${escapeHTML(title)}</option>`).join('');
    $('#lessonFilter').innerHTML += dataset.lessons.map(lesson => `<option value="${lesson.number}">${lesson.number}. ${escapeHTML(lesson.topic)}</option>`).join('');
  }

  function poolFor(scope, onlyWrong = false) {
    let pool = onlyWrong ? state.wrong.map(id => byId.get(id)).filter(Boolean) : [...entries];
    if (scope?.startsWith('group:')) pool = pool.filter(entry => entry.group === Number(scope.split(':')[1]));
    if (scope?.startsWith('lesson:')) pool = pool.filter(entry => entry.lesson === Number(scope.split(':')[1]));
    return pool;
  }

  function filteredEntries() {
    const query = normalize($('#search').value);
    const group = $('#groupFilter').value;
    const lesson = $('#lessonFilter').value;
    return entries.filter(entry => {
      if (group !== 'ALL' && entry.group !== Number(group)) return false;
      if (lesson !== 'ALL' && entry.lesson !== Number(lesson)) return false;
      return !query || normalize([entry.word, entry.vietnamese, entry.definition, entry.topic, ...entry.collocations].join(' ')).includes(query);
    });
  }

  function exampleMarkup(entry) {
    return entry.examples.map((example, index) => `<div class="ex"><b>${index + 1}.</b> ${escapeHTML(example.en)}<small>${escapeHTML(example.vi)}</small></div>`).join('');
  }

  function cardMarkup(entry) {
    const saved = state.saved.includes(entry.id);
    const known = state.known.includes(entry.id);
    const mediaEnabled = entry.media !== false && entry.media?.type !== 'none';
    const mediaButton = mediaEnabled ? `<button type="button" class="icon-btn media-trigger" data-media-id="${escapeHTML(entry.id)}" aria-label="Visual resources for ${escapeHTML(entry.word)}" aria-expanded="false" title="Images &amp; video">${mediaIcon}</button>` : '';
    return `<article class="card${known ? ' learned' : ''}" data-entry="${entry.id}">
      <div class="head"><div><span class="lesson-mark">LESSON ${entry.lesson} · ${escapeHTML(entry.topic)}</span><div class="word">${escapeHTML(entry.word)}</div><div class="meta">/${escapeHTML(entry.ipa)}/ · ${escapeHTML(entry.partOfSpeech)}</div></div><div class="card-actions"><button class="icon-btn${saved ? ' saved' : ''}" data-save="${entry.id}" aria-pressed="${saved}" aria-label="${saved ? 'Bỏ lưu' : 'Lưu'} ${escapeHTML(entry.word)}">${saved ? '▮' : '▯'}</button><button class="speak" data-speak="${entry.id}" aria-label="Nghe ${escapeHTML(entry.word)}">▶</button>${mediaButton}</div></div>
      <div class="meaning">${escapeHTML(entry.vietnamese)}</div><div class="definition">${escapeHTML(entry.definition)}</div>
      <div class="badges"><span class="badge">Nhóm ${entry.group}</span><span class="badge">${escapeHTML(entry.partOfSpeech)}</span><span class="badge status">${known ? 'Đã nhớ' : 'Đang học'}</span><button class="learn-btn" data-known="${entry.id}">${known ? '✓ Đã nhớ' : '+ Đánh dấu nhớ'}</button></div>
      <button class="toggle" data-detail="${entry.id}" aria-expanded="false">+ Ví dụ · collocation · word family</button>
      <div class="entry-detail" hidden><div class="examples open">${exampleMarkup(entry)}</div><div class="detail-grid"><div class="detail-box"><h3>Collocations</h3><ul>${entry.collocations.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div><div class="detail-box"><h3>Word family / forms</h3><ul>${entry.wordFamily.map(item => `<li><b>${escapeHTML(item.form)}</b> · ${escapeHTML(item.partOfSpeech)}</li>`).join('')}</ul></div></div><p class="usage-note"><b>Usage note:</b> ${escapeHTML(entry.usageNote)}</p></div>
    </article>`;
  }

  function renderLibrary() {
    const list = filteredEntries();
    $('#count').innerHTML = `<span>Hiển thị <b>${list.length}</b> / ${entries.length} mục</span><span>${$('#lessonFilter').value === 'ALL' ? 'Theo thứ tự sách' : 'Đang lọc theo Lesson'}</span>`;
    $('#cards').innerHTML = list.length ? list.map(cardMarkup).join('') : '<div class="empty"><b>Không tìm thấy mục phù hợp.</b><p>Thử từ khóa hoặc bộ lọc khác.</p></div>';
  }

  function renderSaved() {
    const list = state.saved.map(id => byId.get(id)).filter(Boolean);
    $('#savedCount').textContent = `${list.length} từ`;
    $('#savedCards').innerHTML = list.map(cardMarkup).join('');
    $('#savedEmpty').hidden = Boolean(list.length);
  }

  function toggleList(name, id) {
    const index = state[name].indexOf(id);
    if (index >= 0) state[name].splice(index, 1); else state[name].push(id);
    commit(); renderLibrary(); if (currentTab === 'saved') renderSaved();
  }

  function setTab(tab, updateRoute = true) {
    currentTab = tab;
    $$('.tab').forEach(button => { const active = button.dataset.tab === tab; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); });
    $$('.panel').forEach(panel => panel.classList.toggle('active', panel.id === tab));
    if (tab === 'library') renderLibrary();
    if (tab === 'saved') renderSaved();
    if (updateRoute) router.update({tab}, {replace: true});
  }

  function stopSessions() {
    learningSession = null; activeKind = null;
    ['flashPlay','flashEnd','practicePlay','practiceEnd'].forEach(id => $('#' + id).style.display = 'none');
    $('#flashSetup').style.display = 'block'; $('#practiceSetup').style.display = 'block';
  }

  function startFlash() {
    const pool = poolFor($('#flashScope').value);
    const amount = Math.min(Number($('#flashCount').value), pool.length);
    const selected = shuffle(pool).slice(0, amount);
    if (!selected.length) return;
    learningSession = learning.createLearningSession({entries: selected, strategy: {createPrompt: entry => ({entryId: entry.id}), grade: () => ({correct: true})}, kind: 'flashcard', mode: 'word-to-meaning'});
    learningSession.start(); activeKind = 'flashcard';
    $('#flashSetup').style.display = 'none'; $('#flashEnd').style.display = 'none'; $('#flashPlay').style.display = 'block';
    renderFlash();
  }

  function renderFlash() {
    const snapshot = learningSession.snapshot();
    if (snapshot.status === 'completed') {
      $('#flashPlay').style.display = 'none'; $('#flashEnd').style.display = 'block';
      $('#flashSummary').textContent = `${snapshot.ratings.good} đã nhớ · ${snapshot.ratings.hard} cần học thêm.`;
      commit(); return;
    }
    const entry = snapshot.currentEntry;
    const revealed = snapshot.answerState.revealed;
    $('#flashMeta').textContent = `${snapshot.index + 1} / ${snapshot.total} · Lesson ${entry.lesson}`;
    $('#flashBar').style.width = `${snapshot.index / snapshot.total * 100}%`;
    $('#flashPrompt').textContent = entry.word;
    $('#flashHint').textContent = `/${entry.ipa}/ · ${entry.partOfSpeech} · ${entry.topic}`;
    $('#flashBack').hidden = !revealed;
    $('#flashBack').innerHTML = `<div class="flash-answer"><h3>${escapeHTML(entry.vietnamese)}</h3><p>${escapeHTML(entry.definition)}</p><div class="examples open">${exampleMarkup(entry)}</div><p class="usage-note">${escapeHTML(entry.usageNote)}</p></div>`;
    $('#flashActions').innerHTML = revealed ? '<button class="btn secondary" data-rate="hard">1 · Khó</button><button class="btn" data-rate="good">2 · Đã nhớ</button>' : '<button class="btn" data-reveal>Lật thẻ ↵</button><button class="btn secondary" data-flash-speak>🔊 Nghe</button>';
  }

  function revealFlash() { if (!learningSession) return; learningSession.dispatch({type: 'REVEAL'}); renderFlash(); }
  function rateFlash(value) {
    const entry = learningSession.snapshot().currentEntry;
    learningSession.dispatch({type: 'RATE', value});
    if (value === 'good' && !state.known.includes(entry.id)) state.known.push(entry.id);
    if (value === 'hard') state.known = state.known.filter(id => id !== entry.id);
    commit(); renderFlash();
  }

  function choicePool(entry) {
    const distractors = shuffle(entries.filter(candidate => candidate.id !== entry.id && candidate.partOfSpeech === entry.partOfSpeech)).slice(0, 3);
    return shuffle([entry, ...distractors]).map(candidate => ({id: candidate.id, label: candidate.vietnamese}));
  }

  function startPractice({wrongOnly = false} = {}) {
    practiceMode = $('#practiceMode').value;
    const useWrong = wrongOnly || $('#practiceSource').value === 'wrong';
    const pool = poolFor($('#practiceScope').value, useWrong);
    if (!pool.length) { $('#practiceNote').innerHTML = '<span class="empty-session">Không có mục phù hợp để ôn. Hãy đổi phạm vi hoặc làm một phiên mới.</span>'; return; }
    const amount = Math.min(Number($('#practiceCount').value), pool.length);
    const selected = shuffle(pool).slice(0, amount);
    const strategy = {
      createPrompt(entry) { return {entryId: entry.id, choices: practiceMode === 'choice' ? choicePool(entry) : []}; },
      grade(answer, entry) { return {correct: practiceMode === 'choice' ? answer === entry.id : normalize(answer) === normalize(entry.word)}; },
    };
    learningSession = learning.createLearningSession({entries: selected, strategy, kind: 'quiz', mode: practiceMode});
    learningSession.start(); activeKind = 'quiz'; selectedChoice = '';
    $('#practiceSetup').style.display = 'none'; $('#practiceEnd').style.display = 'none'; $('#practicePlay').style.display = 'block';
    renderPractice();
  }

  function renderPractice() {
    const snapshot = learningSession.snapshot();
    if (snapshot.status === 'completed') {
      const progress = snapshot.progress;
      const percent = progress.completed ? Math.round(progress.correct / progress.completed * 100) : 0;
      state.best = Math.max(state.best || 0, percent); commit();
      $('#practicePlay').style.display = 'none'; $('#practiceEnd').style.display = 'block';
      $('#practiceScore').textContent = `${progress.correct}/${progress.completed} đúng độc lập`;
      $('#practiceSummary').textContent = `${progress.incorrect} sai · ${progress.assisted} có hỗ trợ · ${state.wrong.length} mục trong danh sách ôn.`;
      $('#endReviewWrong').hidden = !state.wrong.length;
      return;
    }
    const entry = snapshot.currentEntry;
    const answered = snapshot.answerState.submitted;
    $('#practiceMeta').textContent = `${snapshot.index + 1} / ${snapshot.total} · Đúng ${snapshot.progress.correct}`;
    $('#practiceBar').style.width = `${snapshot.index / snapshot.total * 100}%`;
    if (practiceMode === 'choice') {
      $('#practicePrompt').textContent = entry.word;
      $('#practiceHint').textContent = `/${entry.ipa}/ · Chọn nghĩa phù hợp nhất`;
      $('#practiceExercise').innerHTML = `<div class="choice-list">${snapshot.prompt.choices.map((choice, index) => `<button class="choice" data-answer="${choice.id}" ${answered ? 'disabled' : ''}><span>${index + 1}</span>${escapeHTML(choice.label)}</button>`).join('')}</div>`;
    } else {
      $('#practicePrompt').textContent = practiceMode === 'dictation' ? 'Nghe và viết lại từ' : entry.vietnamese;
      $('#practiceHint').textContent = practiceMode === 'dictation' ? `${entry.partOfSpeech} · Lesson ${entry.lesson}` : `${entry.partOfSpeech} · ${entry.topic} · ${entry.hint}`;
      $('#practiceExercise').innerHTML = `<input id="practiceAnswer" aria-label="Câu trả lời" autocomplete="off" autocapitalize="off" spellcheck="false" ${answered ? 'disabled' : ''}><div class="keyhint"><kbd>Enter</kbd> kiểm tra · <kbd>Enter</kbd> lần nữa để tiếp tục</div><div class="actions"><button class="btn" data-submit ${answered ? 'disabled' : ''}>Kiểm tra ↵</button><button class="btn secondary" data-reveal-answer ${answered ? 'disabled' : ''}>Chưa biết — hiện đáp án</button>${practiceMode === 'dictation' ? '<button class="btn secondary" data-practice-speak>🔊 Phát lại</button>' : ''}</div>`;
      if (!answered) $('#practiceAnswer')?.focus();
      if (practiceMode === 'dictation' && !answered) window.setTimeout(() => speak(entry), 120);
    }
    renderPracticeFeedback(snapshot, entry);
  }

  function renderPracticeFeedback(snapshot, entry) {
    const area = $('#practiceFeedback');
    if (!snapshot.answerState.submitted) { area.innerHTML = ''; return; }
    const latest = snapshot.attempts[snapshot.attempts.length - 1];
    area.innerHTML = `<div class="feedback ${latest.correct ? 'ok' : 'bad'}"><b>${latest.correct ? '✓ Chính xác' : 'Cần ôn lại'}</b><p>Đáp án: <b>${escapeHTML(entry.word)}</b> — ${escapeHTML(entry.vietnamese)}</p><small>${escapeHTML(entry.usageNote)}</small></div><div class="answer-detail"><p>${escapeHTML(entry.examples[0].en)}</p><small>${escapeHTML(entry.examples[0].vi)}</small><div class="actions"><button class="btn secondary" data-feedback-speak>🔊 Nghe từ</button><button class="btn" data-next>Câu tiếp ↵</button></div></div>`;
    area.querySelector('[data-next]')?.focus();
  }

  function submitPractice(answer, assisted = false) {
    if (!learningSession || learningSession.snapshot().answerState.submitted || !String(answer).trim()) return;
    const entry = learningSession.snapshot().currentEntry;
    if (assisted) learningSession.dispatch({type: 'ASSIST'});
    const snapshot = learningSession.dispatch({type: 'SUBMIT', answer, assisted});
    const latest = snapshot.attempts[snapshot.attempts.length - 1];
    if (latest.correct && !latest.assisted) state.wrong = state.wrong.filter(id => id !== entry.id);
    else if (!state.wrong.includes(entry.id)) state.wrong.push(entry.id);
    commit(); renderPractice();
  }

  function nextPractice() { if (!learningSession) return; learningSession.dispatch({type: 'NEXT'}); selectedChoice = ''; renderPractice(); }

  const router = learning.createLearningRouter({onChange: route => { if (route.tab && ['library','flashcards','practice','saved'].includes(route.tab)) setTab(route.tab, false); }});

  window.EnglishPronunciation?.register({
    getCurrentText: () => learningSession?.snapshot()?.currentEntry?.word || '',
    lang: 'en-US',
    rate: .82,
  });

  document.addEventListener('click', event => {
    const target = event.target.closest('button,[data-tab]'); if (!target) return;
    if (target.dataset.tab) return setTab(target.dataset.tab);
    if (target.dataset.go) return setTab(target.dataset.go);
    if (target.dataset.save) return toggleList('saved', target.dataset.save);
    if (target.dataset.known) return toggleList('known', target.dataset.known);
    if (target.dataset.speak) return speak(byId.get(target.dataset.speak));
    if (target.dataset.mediaId) {
      const entry = byId.get(target.dataset.mediaId);
      if (entry) window.English101Media?.open({word: entry.word, media: true}, {trigger: target});
      return;
    }
    if (target.dataset.detail) { const detail = target.closest('.card').querySelector('.entry-detail'); detail.hidden = !detail.hidden; target.setAttribute('aria-expanded', String(!detail.hidden)); target.textContent = detail.hidden ? '+ Ví dụ · collocation · word family' : '− Thu gọn'; }
    if (target.id === 'startFlash') return startFlash();
    if ('reveal' in target.dataset) return revealFlash();
    if (target.dataset.rate) return rateFlash(target.dataset.rate);
    if ('flashSpeak' in target.dataset) return speak(learningSession.snapshot().currentEntry);
    if (target.id === 'startPractice') return startPractice();
    if (target.id === 'reviewWrong' || target.id === 'endReviewWrong') return startPractice({wrongOnly: true});
    if (target.dataset.answer) return submitPractice(target.dataset.answer);
    if ('submit' in target.dataset) return submitPractice($('#practiceAnswer')?.value || '');
    if ('revealAnswer' in target.dataset) return submitPractice(learningSession.snapshot().currentEntry.word, true);
    if ('practiceSpeak' in target.dataset || 'feedbackSpeak' in target.dataset) return speak(learningSession.snapshot().currentEntry);
    if ('next' in target.dataset) return nextPractice();
    if ('stop' in target.dataset) return stopSessions();
    if ('restartFlash' in target.dataset) { stopSessions(); setTab('flashcards'); }
    if ('restartPractice' in target.dataset) { stopSessions(); setTab('practice'); }
  });

  $('#search').addEventListener('input', renderLibrary);
  $('#groupFilter').addEventListener('change', () => { $('#lessonFilter').value = 'ALL'; renderLibrary(); });
  $('#lessonFilter').addEventListener('change', () => { $('#groupFilter').value = 'ALL'; renderLibrary(); });
  $('#viewToggle').addEventListener('click', event => { const compact = event.currentTarget.getAttribute('aria-pressed') !== 'true'; event.currentTarget.setAttribute('aria-pressed', String(compact)); $('#cards').classList.toggle('compact', compact); });

  learning.createKeyboardDispatcher({
    getContext() {
      const snapshot = learningSession?.snapshot();
      return {active: Boolean(snapshot && snapshot.status === 'active'), kind: activeKind, answered: Boolean(snapshot?.answerState.submitted), revealed: Boolean(snapshot?.answerState.revealed), emptyInput: activeKind === 'quiz' && practiceMode !== 'choice' && !($('#practiceAnswer')?.value || '').trim()};
    },
    dispatch(action) {
      if (activeKind === 'flashcard') {
        if (action === 'REVEAL') revealFlash();
        else if (action === 'NEXT' || action === 'RATE_GOOD') rateFlash('good');
        else if (action === 'RATE_HARD') rateFlash('hard');
        return;
      }
      if (action === 'SUBMIT') submitPractice($('#practiceAnswer')?.value || '');
      else if (action === 'NEXT') nextPractice();
      else if (action.startsWith('CHOICE_')) {
        const choice = learningSession.snapshot().prompt.choices[Number(action.slice(-1)) - 1];
        if (choice) submitPractice(choice.id);
      }
    },
  }).attach();

  optionMarkup(); updateStats(); renderLibrary();
  const initialTab = router.current().tab;
  if (initialTab && ['library','flashcards','practice','saved'].includes(initialTab)) setTab(initialTab, false);
})();
