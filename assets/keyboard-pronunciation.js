(() => {
  'use strict';

  const STORAGE_KEY = 'english101.pronunciation.v1';
  const DEFAULTS = { accent: 'en-GB', gender: 'female' };
  const GOOGLE_VOICES = {
    'en-GB': { male: ['Google UK English Male'], female: ['Google UK English Female'] },
    'en-US': { male: ['Google US English Male'], female: ['Google US English Female', 'Google US English'] }
  };
  const GENDER_HINTS = {
    male: /\b(male|man|david|daniel|george|guy|james|mark|ryan|thomas)\b/i,
    female: /\b(female|woman|aria|ava|emma|hazel|jenny|libby|samantha|susan|victoria|zira)\b/i
  };

  function loadPreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return {
        accent: saved?.accent === 'en-US' ? 'en-US' : DEFAULTS.accent,
        gender: saved?.gender === 'male' ? 'male' : DEFAULTS.gender
      };
    } catch (_) { return { ...DEFAULTS }; }
  }

  function hasSavedPreferences() {
    try { return Boolean(localStorage.getItem(STORAGE_KEY)); } catch (_) { return false; }
  }

  const state = {
    getCurrentText: null, selectedText: '', lang: 'en-GB', rate: 0.88, pitch: 1,
    preferences: loadPreferences(), userChosen: hasSavedPreferences()
  };

  function savePreferences() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.preferences)); } catch (_) {}
  }

  function sameLang(voice, accent) {
    const normalize = value => String(value || '').replace('_', '-').toLowerCase();
    return normalize(voice.lang) === normalize(accent);
  }

  function chooseVoice(voices, accent, gender) {
    const available = Array.from(voices || []);
    const preferred = (GOOGLE_VOICES[accent]?.[gender] || [])
      .map(name => available.find(voice => voice.name === name && sameLang(voice, accent)))
      .find(Boolean);
    if (preferred) return preferred;
    const matchingAccent = available.filter(voice => sameLang(voice, accent));
    return matchingAccent.find(voice => GENDER_HINTS[gender].test(voice.name))
      || matchingAccent.find(voice => /^Google\b/i.test(voice.name))
      || matchingAccent[0]
      || available.find(voice => /^en[-_]/i.test(voice.lang))
      || null;
  }

  const shortcutButton = document.createElement('button');
  shortcutButton.type = 'button';
  shortcutButton.className = 'pronunciation-shortcut';
  shortcutButton.textContent = '🔊 L';
  shortcutButton.title = 'Đọc từ hiện tại (phím L)';
  shortcutButton.setAttribute('aria-label', 'Đọc từ hiện tại, phím L');

  const settingsButton = document.createElement('button');
  settingsButton.type = 'button';
  settingsButton.className = 'pronunciation-settings-button';
  settingsButton.textContent = '⚙';
  settingsButton.title = 'Chọn giọng phát âm';
  settingsButton.setAttribute('aria-label', 'Chọn giọng phát âm');
  settingsButton.setAttribute('aria-expanded', 'false');
  settingsButton.setAttribute('aria-controls', 'pronunciation-settings');

  const settingsPanel = document.createElement('div');
  settingsPanel.id = 'pronunciation-settings';
  settingsPanel.className = 'pronunciation-settings';
  settingsPanel.hidden = true;
  settingsPanel.innerHTML = `
    <strong>Giọng phát âm</strong>
    <label>Biến thể<select data-pronunciation-accent>
      <option value="en-GB">UK · Anh–Anh</option><option value="en-US">US · Anh–Mỹ</option>
    </select></label>
    <label>Giọng<select data-pronunciation-gender>
      <option value="female">Nữ</option><option value="male">Nam</option>
    </select></label>
    <p data-pronunciation-status aria-live="polite"></p>
    <button type="button" data-pronunciation-test>▶ Nghe thử</button>`;

  const accentSelect = settingsPanel.querySelector('[data-pronunciation-accent]');
  const genderSelect = settingsPanel.querySelector('[data-pronunciation-gender]');
  const statusText = settingsPanel.querySelector('[data-pronunciation-status]');
  accentSelect.value = state.preferences.accent;
  genderSelect.value = state.preferences.gender;

  const style = document.createElement('style');
  style.textContent = `
    .pronunciation-shortcut,.pronunciation-settings-button{position:fixed;bottom:18px;z-index:1000;border:1px solid #c98a2c;border-radius:999px;background:#f4f1e6;color:#1c2321;box-shadow:0 4px 14px rgba(0,0,0,.2);cursor:pointer;font:600 13px/1.2 sans-serif}
    .pronunciation-shortcut{right:18px;padding:9px 13px}.pronunciation-settings-button{right:76px;width:36px;height:36px;padding:0;font-size:17px}
    .pronunciation-shortcut:hover,.pronunciation-settings-button:hover{background:#fffaf0}
    .pronunciation-shortcut:focus-visible,.pronunciation-settings-button:focus-visible,.pronunciation-settings :focus-visible{outline:3px solid #a63d40;outline-offset:3px}
    .pronunciation-settings{position:fixed;right:18px;bottom:64px;z-index:1001;width:min(260px,calc(100vw - 36px));box-sizing:border-box;padding:14px;border:1px solid #c98a2c;border-radius:14px;background:#fffdf7;color:#1c2321;box-shadow:0 8px 28px rgba(0,0,0,.22);font:14px/1.35 sans-serif}
    .pronunciation-settings[hidden]{display:none}.pronunciation-settings strong{display:block;margin-bottom:10px}
    .pronunciation-settings label{display:grid;grid-template-columns:72px 1fr;align-items:center;gap:8px;margin:8px 0}
    .pronunciation-settings select,.pronunciation-settings button{min-height:36px;border:1px solid #9d8b70;border-radius:8px;background:white;color:inherit}
    .pronunciation-settings select{width:100%;padding:5px 8px}.pronunciation-settings button{width:100%;padding:7px 10px;cursor:pointer;font-weight:600}
    .pronunciation-settings p{min-height:2.7em;margin:8px 0;color:#5e574c;font-size:12px}`;
  document.head.appendChild(style);
  document.body.append(shortcutButton, settingsButton, settingsPanel);

  function updateVoiceStatus() {
    if (!('speechSynthesis' in window)) {
      statusText.textContent = 'Trình duyệt không hỗ trợ giọng đọc.';
      return;
    }
    const voice = chooseVoice(speechSynthesis.getVoices(), state.preferences.accent, state.preferences.gender);
    statusText.textContent = voice ? `Đang dùng: ${voice.name}` : 'Chưa có giọng phù hợp; trình duyệt sẽ dùng giọng mặc định.';
  }

  function toggleSettings(force) {
    const open = typeof force === 'boolean' ? force : settingsPanel.hidden;
    settingsPanel.hidden = !open;
    settingsButton.setAttribute('aria-expanded', String(open));
    if (open) { updateVoiceStatus(); accentSelect.focus(); }
  }

  function changePreferences() {
    state.preferences.accent = accentSelect.value;
    state.preferences.gender = genderSelect.value;
    state.userChosen = true;
    savePreferences();
    updateVoiceStatus();
  }

  accentSelect.addEventListener('change', changePreferences);
  genderSelect.addEventListener('change', changePreferences);
  settingsButton.addEventListener('click', () => toggleSettings());
  settingsPanel.querySelector('[data-pronunciation-test]').addEventListener('click', () => speak('Hello. How are you today?'));
  document.addEventListener('click', event => {
    if (!settingsPanel.hidden && !settingsPanel.contains(event.target) && event.target !== settingsButton) toggleSettings(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !settingsPanel.hidden) toggleSettings(false);
  });
  if ('speechSynthesis' in window) speechSynthesis.addEventListener?.('voiceschanged', updateVoiceStatus);

  shortcutButton.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      shortcutButton.textContent = 'Không hỗ trợ giọng đọc';
      setTimeout(() => { shortcutButton.textContent = '🔊 L'; }, 1800);
      return;
    }
    speak(currentText());
  });

  function speak(text, options = {}) {
    const value = String(text || '').trim();
    if (!value || !('speechSynthesis' in window)) return false;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    const accent = state.userChosen ? state.preferences.accent : (options.lang || state.lang);
    utterance.lang = accent;
    utterance.rate = options.rate || state.rate;
    utterance.pitch = options.pitch || state.pitch;
    utterance.voice = chooseVoice(speechSynthesis.getVoices(), accent, options.gender || state.preferences.gender);
    speechSynthesis.speak(utterance);
    return true;
  }

  function register(options = {}) {
    state.getCurrentText = typeof options.getCurrentText === 'function' ? options.getCurrentText : null;
    state.lang = options.lang || 'en-GB';
    state.rate = options.rate || 0.88;
    state.pitch = options.pitch || 1;
    if (!state.userChosen && ['en-US', 'en-GB'].includes(options.lang)) {
      state.preferences.accent = options.lang;
      accentSelect.value = options.lang;
    }
  }

  function setSelectedText(text) { state.selectedText = String(text || '').trim(); }

  function libraryWord(target) {
    const item = target.closest?.('[data-speak], [data-say], [data-open]');
    const cardWord = target.closest?.('.card, .entry, .ledger-row')?.querySelector?.('.word, .wordlink, .lw')?.textContent?.trim();
    const dialogWord = target.closest?.('dialog')?.querySelector?.('#detailTitle, .word')?.textContent?.trim();
    if (cardWord || dialogWord) return cardWord || dialogWord;
    if (!item) return '';
    const value = item.dataset.speak || item.dataset.say || '';
    return /[A-Za-z]/.test(value) ? value : '';
  }

  document.addEventListener('click', event => { const word = libraryWord(event.target); if (word) setSelectedText(word); }, true);
  document.addEventListener('pointerover', event => { const word = libraryWord(event.target); if (word) setSelectedText(word); }, true);

  function currentText() {
    const current = state.getCurrentText ? state.getCurrentText() : '';
    return String(current || state.selectedText || selectedEnglishText() || '').trim();
  }

  function selectedEnglishText() {
    const value = String(window.getSelection?.() || '').trim().replace(/\s+/g, ' ');
    if (!value || value.length > 120 || !/[A-Za-z]/.test(value)) return '';
    return (value.match(/[A-Za-z]/g) || []).length / value.length >= 0.5 ? value : '';
  }

  function isTypingTarget(target) {
    return target instanceof Element && (target.matches('input, textarea, select, [contenteditable="true"]') || target.isContentEditable);
  }

  document.addEventListener('keydown', event => {
    if (event.isComposing || event.repeat || event.key.toLowerCase() !== 'l') return;
    if (event.ctrlKey || event.altKey || event.metaKey || isTypingTarget(event.target)) return;
    const text = currentText();
    if (!text) return;
    event.preventDefault();
    speak(text);
  });

  window.EnglishPronunciation = { register, setSelectedText, speak };
})();
