(() => {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const KEY = 'english101-c1-vocabulary-v2';
  const defaults = {saved: [], learned: [], best: null, compact: false, quizSession: null, quizMode: 'reverse', quizSeconds: 0};
  let state = loadState();
  let group = 'ALL';
  let quiz = [];
  let quizIndex = 0;
  let correct = 0;
  let answered = false;
  let hintsUsed = 0;
  let assisted = 0;
  let elapsed = 0;
  let timeLeft = 0;
  let timerHandle = null;
  let questionMode = 'reverse';
  let wrongIndices = [];

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      return {
        saved: Array.isArray(saved.saved) ? saved.saved.filter(Number.isInteger) : [],
        learned: Array.isArray(saved.learned) ? saved.learned.filter(Number.isInteger) : [],
        best: typeof saved.best === 'number' ? saved.best : null,
        compact: Boolean(saved.compact),
        quizSession: saved.quizSession && Array.isArray(saved.quizSession.quiz) ? saved.quizSession : null,
        quizMode: typeof saved.quizMode === 'string' ? saved.quizMode : 'reverse',
        quizSeconds: [0, 15, 30, 60].includes(Number(saved.quizSeconds)) ? Number(saved.quizSeconds) : 0
      };
    } catch (_) {
      return {...defaults};
    }
  }

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    updateStats();
  }

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[char]);

  const normalize = value => String(value ?? '')
    .toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  function speak(index) {
    if (!('speechSynthesis' in window)) return;
    const word = DATA[index][0].replace(/\s*\([^)]*\)/g, '');
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-GB';
    utterance.rate = .84;
    window.speechSynthesis.speak(utterance);
  }

  function itemHTML(item, index) {
    const isSaved = state.saved.includes(index);
    const isLearned = state.learned.includes(index);
    const examples = item[6].map((example, number) => `
      <div class="ex"><b>${number + 1}.</b> ${escapeHTML(example[0])}<small>${escapeHTML(example[1])}</small></div>`).join('');
    return `<article class="card${isLearned ? ' learned' : ''}" data-index="${index}">
      <div class="head"><div><div class="word">${escapeHTML(item[0])}</div><div class="meta">${escapeHTML(item[3])} · ${escapeHTML(item[1])}</div></div>
      <div class="card-actions"><button class="icon-btn${isSaved ? ' saved' : ''}" data-save="${index}" aria-pressed="${isSaved}" aria-label="${isSaved ? 'Bỏ lưu' : 'Lưu'} ${escapeHTML(item[0])}" title="${isSaved ? 'Bỏ lưu' : 'Lưu từ'}">${isSaved ? '▮' : '▯'}</button><button class="speak" data-speak="${index}" aria-label="Nghe ${escapeHTML(item[0])}" title="Nghe phát âm">▶</button></div></div>
      <div class="meaning">${escapeHTML(item[4])}</div>
      <div class="badges"><span class="badge">${escapeHTML(item[2])}</span><span class="badge">${escapeHTML(item[5])}</span><span class="badge status">${isLearned ? 'Đã nhớ' : 'Đang học'}</span><button class="learn-btn" data-learn="${index}">${isLearned ? '✓ Đã nhớ' : '+ Đánh dấu nhớ'}</button></div>
      <button class="toggle" data-examples aria-expanded="false">+ 3 ví dụ</button><div class="examples">${examples}</div>
    </article>`;
  }

  function filteredItems() {
    const query = normalize($('#search').value);
    let rows = DATA.map((item, index) => ({item, index})).filter(({item}) => {
      const groupMatch = group === 'ALL' || item[5] === group;
      const searchMatch = !query || normalize([item[0], item[1], item[2], item[3], item[4], item[5], ...item[6].flat()].join(' ')).includes(query);
      return groupMatch && searchMatch;
    });
    const sort = $('#sort').value;
    if (sort === 'az') rows.sort((a, b) => a.item[0].localeCompare(b.item[0], 'en'));
    if (sort === 'unlearned') rows.sort((a, b) => Number(state.learned.includes(a.index)) - Number(state.learned.includes(b.index)));
    return rows;
  }

  function renderLibrary() {
    const rows = filteredItems();
    $('#count').innerHTML = `<span>Hiển thị <b>${rows.length}</b> / ${DATA.length} từ</span><span>${group === 'ALL' ? 'Toàn bộ 6 nhóm' : escapeHTML(group)}</span>`;
    $('#cards').classList.toggle('compact', state.compact);
    $('#cards').innerHTML = rows.length ? rows.map(({item, index}) => itemHTML(item, index)).join('') : '<div class="empty"><b>Không tìm thấy từ phù hợp.</b><p>Thử từ khóa khác hoặc chọn “Tất cả”.</p></div>';
  }

  function renderSaved() {
    const indices = state.saved.filter(index => DATA[index]);
    $('#savedCount').textContent = `${indices.length} từ`;
    $('#savedCards').innerHTML = indices.map(index => itemHTML(DATA[index], index)).join('');
    $('#savedEmpty').hidden = indices.length > 0;
  }

  function updateStats() {
    $('#totalStat').textContent = DATA.length;
    $('#learnedStat').textContent = state.learned.filter(index => DATA[index]).length;
    $('#savedStat').textContent = state.saved.filter(index => DATA[index]).length;
    $('#bestStat').textContent = state.best === null ? '—' : `${state.best}%`;
  }

  function setTab(name) {
    $$('.tab').forEach(button => {
      const active = button.dataset.tab === name;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    $$('.panel').forEach(panel => panel.classList.toggle('active', panel.id === name));
    if (name === 'saved') renderSaved();
    if (name === 'lib') renderLibrary();
    if (name === 'quiz') { updateQuizPool(); updateResumeBox(); }
  }

  function toggleIndex(listName, index) {
    const list = state[listName];
    const position = list.indexOf(index);
    if (position >= 0) list.splice(position, 1); else list.push(index);
    persist();
    renderLibrary();
    if ($('#saved').classList.contains('active')) renderSaved();
  }

  function shuffle(array) {
    array = [...array];
    for (let index = array.length - 1; index > 0; index--) {
      const random = Math.floor(Math.random() * (index + 1));
      [array[index], array[random]] = [array[random], array[index]];
    }
    return array;
  }

  const baseWord = item => item[0].replace(/\s*\([^)]*\)/g, '').trim();
  const regexEscape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function quizPool() {
    const selectedGroup = $('#qgroup').value;
    return DATA.map((_, index) => index).filter(index => selectedGroup === 'ALL' || DATA[index][5] === selectedGroup);
  }

  function updateQuizPool() {
    $('#quizPoolCount').textContent = quizPool().length;
  }

  function saveQuizSession() {
    state.quizSession = {quiz, quizIndex, correct, assisted, wrongIndices, mode: state.quizMode, seconds: state.quizSeconds, questionMode, hintsUsed, elapsed, timeLeft};
    persist();
  }

  function clearTimer() {
    if (timerHandle) window.clearInterval(timerHandle);
    timerHandle = null;
  }

  function startTimer() {
    clearTimer();
    $('#timer').textContent = `${state.quizSeconds ? timeLeft : elapsed} giây`;
    timerHandle = window.setInterval(() => {
      if (document.hidden || answered || $('#qplay').style.display !== 'block') return;
      elapsed++;
      if (state.quizSeconds) {
        timeLeft = Math.max(0, timeLeft - 1);
        $('#timer').textContent = `${timeLeft} giây`;
        if (!timeLeft) gradeAnswer(false, '', 'Hết giờ');
      } else {
        $('#timer').textContent = `${elapsed} giây`;
      }
      saveQuizSession();
    }, 1000);
  }

  function clozeFor(item) {
    const sentence = item[6][0][0];
    const target = baseWord(item);
    let pattern = new RegExp(`\\b${regexEscape(target)}\\b`, 'i');
    let match = sentence.match(pattern);
    if (!match && target.includes(' ')) {
      const [first, ...rest] = target.split(' ');
      pattern = new RegExp(`\\b${regexEscape(first)}[a-z]*\\s+${regexEscape(rest.join(' '))}\\b`, 'i');
      match = sentence.match(pattern);
    }
    if (!match && !target.includes(' ')) {
      const stem = target.endsWith('e') || target.endsWith('y') ? target.slice(0, -1) : target.slice(0, Math.max(4, target.length - 2));
      pattern = new RegExp(`\\b${regexEscape(stem)}[a-z]*\\b`, 'i');
      match = sentence.match(pattern);
    }
    return {sentence: match ? sentence.replace(pattern, '_____') : sentence, answer: match ? match[0] : target};
  }

  function makeCloze(item) {
    return clozeFor(item).sentence;
  }

  function chooseQuestionMode() {
    if (state.quizMode !== 'mixed') return state.quizMode;
    return Math.random() < .5 ? 'reverse' : 'forward';
  }

  function meaningChoices(currentIndex) {
    const current = DATA[currentIndex];
    const others = shuffle(DATA.map((item, index) => ({item, index})).filter(entry => entry.index !== currentIndex && entry.item[5] === current[5]));
    return shuffle([{item: current, index: currentIndex}, ...others.slice(0, 3)]);
  }

  function targetAnswer(item) {
    if (questionMode === 'englishText' || questionMode === 'forward') return item[4];
    if (questionMode === 'cloze') return clozeFor(item).answer;
    return baseWord(item);
  }

  function showHints() {
    if (!hintsUsed) { $('#hintArea').innerHTML = ''; return; }
    const item = DATA[quiz[quizIndex]];
    const target = targetAnswer(item);
    const letters = target.split(' ').map(word => `${word[0] || ''}${' _'.repeat(Math.max(0, word.length - 1))}`).join('  ');
    $('#hintArea').innerHTML = `<div class="hint-note">${hintsUsed >= 1 ? `<b>Bối cảnh:</b> ${escapeHTML(item[5])} · ${escapeHTML(item[1])}` : ''}${hintsUsed >= 2 ? `<p><b>Câu nguồn:</b> ${escapeHTML(makeCloze(item))}</p>` : ''}${hintsUsed >= 3 ? `<p class="letter-hint">${escapeHTML(letters)}</p>` : ''}<small>Có gợi ý: lượt này không tính là tự nhớ độc lập.</small></div>`;
  }

  function renderExercise() {
    const itemIndex = quiz[quizIndex];
    const item = DATA[itemIndex];
    if (questionMode === 'forward') {
      $('#exercise').innerHTML = `<div class="choice-list">${meaningChoices(itemIndex).map((choice, index) => `<button class="choice" data-choice="${choice.index}"><span>${index + 1}</span>${escapeHTML(choice.item[4])}</button>`).join('')}</div><button class="plain-btn unknown" id="unknown">Chưa biết — hiện đáp án</button>`;
      return;
    }
    $('#exercise').innerHTML = `<input id="answer" aria-label="Câu trả lời" placeholder="${questionMode === 'englishText' ? 'Nhập một nghĩa đầy đủ bằng tiếng Việt…' : 'Nhập câu trả lời…'}" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="keyhint"><kbd>Enter</kbd> kiểm tra · <kbd>Enter</kbd> lần nữa để tiếp tục</div><div class="actions"><button class="btn" id="check">Kiểm tra ↵</button><button class="btn secondary" id="showHint">Gợi ý theo tầng</button><button class="plain-btn unknown" id="unknown">Chưa biết</button>${questionMode === 'listen' ? '<button class="btn secondary" id="listen">🔊 Phát âm</button>' : ''}</div>`;
  }

  function showQuiz(resuming = false) {
    answered = false;
    if (!resuming) {
      questionMode = chooseQuestionMode();
      hintsUsed = 0;
      elapsed = 0;
      timeLeft = state.quizSeconds;
    }
    const item = DATA[quiz[quizIndex]];
    $('#qmeta').textContent = `${quizIndex + 1} / ${quiz.length} · Đúng ${correct} · Gợi ý ${assisted}`;
    $('#bar').style.width = `${quizIndex / quiz.length * 100}%`;
    $('#hintArea').innerHTML = '';
    $('#fb').innerHTML = '';
    if (questionMode === 'forward' || questionMode === 'englishText') {
      $('#prompt').textContent = item[0];
      $('#hint').textContent = `${item[3]} · ${item[1]}`;
    } else if (questionMode === 'cloze') {
      $('#prompt').textContent = makeCloze(item);
      $('#hint').textContent = `Điền đúng từ hoặc cụm từ · ${item[4]}`;
    } else if (questionMode === 'listen') {
      $('#prompt').textContent = 'Nghe và viết lại từ';
      $('#hint').textContent = `${item[1]} · ${item[5]}`;
      window.setTimeout(() => speak(quiz[quizIndex]), 180);
    } else {
      $('#prompt').textContent = item[4];
      $('#hint').textContent = `${item[1]} · ${item[5]} · Hãy nhớ từ tiếng Anh`;
    }
    renderExercise();
    showHints();
    $('#answer')?.focus();
    saveQuizSession();
    startTimer();
  }

  function openQuizSession() {
    $('#qsetup').style.display = 'none';
    $('#qend').style.display = 'none';
    $('#qplay').style.display = 'block';
  }

  function startQuiz(customPool = null) {
    const pool = customPool || quizPool();
    if (!pool.length) return;
    const amount = customPool ? pool.length : Math.min(Number.parseInt($('#num').value, 10), pool.length);
    state.quizMode = $('#mode').value;
    state.quizSeconds = Number($('#seconds').value);
    quiz = shuffle(pool).slice(0, amount);
    quizIndex = 0;
    correct = 0;
    assisted = 0;
    wrongIndices = [];
    openQuizSession();
    showQuiz();
  }

  function editDistance(a, b) {
    let row = Array.from({length: b.length + 1}, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
      const next = [i];
      for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      row = next;
    }
    return row[b.length];
  }

  function classifyError(raw, target) {
    if (!raw) return 'Chưa nhớ được';
    const distance = editDistance(normalize(raw), normalize(target));
    if (distance <= Math.max(1, Math.floor(normalize(target).length / 5))) return 'Lỗi chính tả';
    if (questionMode === 'englishText' || questionMode === 'forward') return 'Nhầm nghĩa';
    if (questionMode === 'cloze') return 'Sai dạng từ';
    return 'Chưa nhớ được';
  }

  function isTypedAnswerCorrect(raw, item) {
    const answer = normalize(raw);
    if (questionMode === 'englishText') {
      const alternatives = item[4].split(/[,;/]/).map(normalize);
      return alternatives.includes(answer) || (answer.length >= 4 && normalize(item[4]).includes(answer));
    }
    return answer === normalize(targetAnswer(item));
  }

  function gradeAnswer(isCorrect, raw = '', message = '') {
    if (answered) return;
    answered = true;
    clearTimer();
    const itemIndex = quiz[quizIndex];
    const item = DATA[itemIndex];
    const assistedAnswer = hintsUsed > 0;
    if (assistedAnswer) assisted++;
    else if (isCorrect) correct++;
    if (!isCorrect && !wrongIndices.includes(itemIndex)) wrongIndices.push(itemIndex);
    $('#exercise').querySelectorAll('button,input').forEach(control => { control.disabled = true; });
    const label = message || (assistedAnswer ? 'Lượt luyện có gợi ý' : isCorrect ? '✓ Đúng và tự nhớ được' : 'Cần ôn lại');
    const feedbackClass = assistedAnswer ? 'neutral' : isCorrect ? 'ok' : 'bad';
    const error = !isCorrect ? classifyError(raw, targetAnswer(item)) : '';
    $('#fb').innerHTML = `<div class="feedback ${feedbackClass}"><b>${escapeHTML(label)}</b>${raw && !isCorrect ? `<p>Bạn viết: ${escapeHTML(raw)}</p>` : ''}<p>Đáp án: <b>${escapeHTML(targetAnswer(item))}</b> — ${escapeHTML(item[4])}</p><small>${elapsed} giây${error ? ` · ${escapeHTML(error)}` : ''}${assistedAnswer ? ' · không tính điểm độc lập' : ''}</small></div><div class="answer-detail"><p>${escapeHTML(item[0])} ${escapeHTML(item[3])} · ${escapeHTML(item[1])}</p><p>${escapeHTML(item[6][0][0])}</p><small>${escapeHTML(item[6][0][1])}</small><div class="actions"><button class="btn secondary" id="feedbackListen">🔊 Nghe từ</button><button class="btn" id="next">Câu tiếp ↵</button></div></div>`;
    saveQuizSession();
    $('#next').focus();
  }

  function checkAnswer() {
    if (answered) return;
    const input = $('#answer');
    const raw = input?.value.trim() || '';
    if (!raw) { input?.focus(); return; }
    gradeAnswer(isTypedAnswerCorrect(raw, DATA[quiz[quizIndex]]), raw);
  }

  function revealHint() {
    if (answered) return;
    hintsUsed = Math.min(3, hintsUsed + 1);
    showHints();
    saveQuizSession();
  }

  function nextQuestion() {
    clearTimer();
    quizIndex++;
    if (quizIndex < quiz.length) { showQuiz(); return; }
    finishQuiz();
  }

  function finishQuiz() {
    clearTimer();
    const completed = Math.max(1, quizIndex >= quiz.length ? quiz.length : quizIndex + Number(answered));
    const percentage = Math.round(correct / completed * 100);
    state.best = Math.max(state.best ?? 0, percentage);
    state.quizSession = null;
    persist();
    $('#qplay').style.display = 'none';
    $('#qsetup').style.display = 'none';
    $('#qend').style.display = 'block';
    $('#score').textContent = `${correct} / ${completed} lượt độc lập`;
    $('#endtxt').textContent = `${assisted} lượt có gợi ý · ${wrongIndices.length} từ cần ôn. Điểm tốt nhất: ${state.best}%.`;
    $('#retryWrong').hidden = wrongIndices.length === 0;
  }

  function pauseQuiz() {
    clearTimer();
    saveQuizSession();
    $('#qplay').style.display = 'none';
    $('#qsetup').style.display = 'block';
    updateResumeBox();
  }

  function updateResumeBox() {
    const session = state.quizSession;
    $('#resumeBox').hidden = !session;
    if (session) $('#resumeText').textContent = `Câu ${session.quizIndex + 1}/${session.quiz.length} · đúng ${session.correct}.`;
  }

  function resumeQuiz() {
    const session = state.quizSession;
    if (!session || !session.quiz.every(index => DATA[index])) return;
    ({quiz, quizIndex, correct, assisted, wrongIndices, questionMode, hintsUsed, elapsed, timeLeft} = session);
    state.quizMode = session.mode;
    state.quizSeconds = session.seconds;
    openQuizSession();
    showQuiz(true);
  }

  $('.tabs').addEventListener('click', event => {
    const button = event.target.closest('[data-tab]');
    if (button) setTab(button.dataset.tab);
  });
  $('[data-go="lib"]').addEventListener('click', () => {
    setTab('lib');
    $('.tabs').scrollIntoView({behavior:'smooth', block:'start'});
  });
  $('#chips').addEventListener('click', event => {
    const button = event.target.closest('.chip');
    if (!button) return;
    group = button.dataset.g;
    $$('#chips .chip').forEach(chip => chip.classList.toggle('active', chip === button));
    renderLibrary();
  });
  $('#search').addEventListener('input', renderLibrary);
  $('#sort').addEventListener('change', renderLibrary);
  $('#viewToggle').addEventListener('click', () => {
    state.compact = !state.compact;
    $('#viewToggle').setAttribute('aria-pressed', String(state.compact));
    persist();
    renderLibrary();
  });

  document.addEventListener('click', event => {
    const save = event.target.closest('[data-save]');
    const learn = event.target.closest('[data-learn]');
    const audio = event.target.closest('[data-speak]');
    const toggle = event.target.closest('[data-examples]');
    if (save) toggleIndex('saved', Number(save.dataset.save));
    if (learn) toggleIndex('learned', Number(learn.dataset.learn));
    if (audio) speak(Number(audio.dataset.speak));
    if (toggle) {
      const examples = toggle.nextElementSibling;
      const open = examples.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '− Ẩn ví dụ' : '+ 3 ví dụ';
    }
    const choice = event.target.closest('[data-choice]');
    if (choice && !answered) {
      const selectedIndex = Number(choice.dataset.choice);
      gradeAnswer(selectedIndex === quiz[quizIndex], DATA[selectedIndex][4]);
    }
    const action = event.target.closest('button')?.id;
    if (action === 'check') checkAnswer();
    if (action === 'showHint') revealHint();
    if (action === 'unknown') gradeAnswer(false);
    if (action === 'listen' || action === 'feedbackListen') speak(quiz[quizIndex]);
    if (action === 'next') nextQuestion();
  });

  $('#qgroup').addEventListener('change', updateQuizPool);
  $('#start').addEventListener('click', () => startQuiz());
  $('#pauseQuiz').addEventListener('click', pauseQuiz);
  $('#finishQuiz').addEventListener('click', finishQuiz);
  $('#resumeQuiz').addEventListener('click', resumeQuiz);
  $('#discardQuiz').addEventListener('click', () => { state.quizSession = null; persist(); updateResumeBox(); });
  $('#retryWrong').addEventListener('click', () => startQuiz([...wrongIndices]));
  $('#again').addEventListener('click', () => {
    $('#qend').style.display = 'none';
    $('#qsetup').style.display = 'block';
    updateResumeBox();
  });
  document.addEventListener('keydown', event => {
    if ($('#qplay').style.display === 'block' && !answered && questionMode === 'forward' && /^[1-4]$/.test(event.key) && !event.target.matches('input,select')) {
      const choice = $$('.choice')[Number(event.key) - 1];
      if (choice) { event.preventDefault(); choice.click(); }
      return;
    }
    if (event.key === 'Enter' && $('#qplay').style.display === 'block' && !event.target.matches('button')) {
      event.preventDefault();
      answered ? nextQuestion() : checkAnswer();
    }
  });

  $('#viewToggle').setAttribute('aria-pressed', String(state.compact));
  $('#mode').value = state.quizMode;
  $('#seconds').value = String(state.quizSeconds);
  updateStats();
  updateQuizPool();
  updateResumeBox();
  renderLibrary();
  renderSaved();
})();
