(() => {
  'use strict';

  const state = {
    getCurrentText: null,
    selectedText: '',
    lang: 'en-GB',
    rate: 0.88,
    pitch: 1
  };

  const shortcutButton = document.createElement('button');
  shortcutButton.type = 'button';
  shortcutButton.className = 'pronunciation-shortcut';
  shortcutButton.textContent = '🔊 L';
  shortcutButton.title = 'Đọc từ hiện tại (phím L)';
  shortcutButton.setAttribute('aria-label', 'Đọc từ hiện tại, phím L');
  shortcutButton.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      shortcutButton.textContent = 'Không hỗ trợ giọng đọc';
      setTimeout(() => { shortcutButton.textContent = '🔊 L'; }, 1800);
      return;
    }
    speak(currentText());
  });

  const shortcutStyle = document.createElement('style');
  shortcutStyle.textContent = `
    .pronunciation-shortcut {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 1000;
      border: 1px solid #c98a2c;
      border-radius: 999px;
      padding: 9px 13px;
      background: #f4f1e6;
      color: #1c2321;
      box-shadow: 0 4px 14px rgba(0, 0, 0, .2);
      cursor: pointer;
      font: 600 13px/1.2 sans-serif;
    }
    .pronunciation-shortcut:hover { background: #fffaf0; }
    .pronunciation-shortcut:focus-visible { outline: 3px solid #a63d40; outline-offset: 3px; }
  `;
  document.head.appendChild(shortcutStyle);
  document.body.appendChild(shortcutButton);

  function speak(text, options = {}) {
    const value = String(text || '').trim();
    if (!value || !('speechSynthesis' in window)) return false;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = options.lang || state.lang;
    utterance.rate = options.rate || state.rate;
    utterance.pitch = options.pitch || state.pitch;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  function register(options = {}) {
    state.getCurrentText = typeof options.getCurrentText === 'function' ? options.getCurrentText : null;
    state.lang = options.lang || 'en-GB';
    state.rate = options.rate || 0.88;
    state.pitch = options.pitch || 1;
  }

  function setSelectedText(text) {
    state.selectedText = String(text || '').trim();
  }

  function libraryWord(target) {
    const item = target.closest?.('[data-speak], [data-say], [data-open]');
    const cardWord = target.closest?.('.card, .entry, .ledger-row')
      ?.querySelector?.('.word, .wordlink, .lw')?.textContent?.trim();
    const dialogWord = target.closest?.('dialog')
      ?.querySelector?.('#detailTitle, .word')?.textContent?.trim();
    if (cardWord || dialogWord) return cardWord || dialogWord;
    if (!item) return '';
    const value = item.dataset.speak || item.dataset.say || '';
    // data-say/data-open on the vong-* pages is an internal ID, not a word.
    return /[A-Za-z]/.test(value) ? value : '';
  }

  document.addEventListener('click', event => {
    const word = libraryWord(event.target);
    if (word) setSelectedText(word);
  }, true);

  document.addEventListener('pointerover', event => {
    const word = libraryWord(event.target);
    if (word) setSelectedText(word);
  }, true);

  function currentText() {
    const current = state.getCurrentText ? state.getCurrentText() : '';
    return String(current || state.selectedText || selectedEnglishText() || '').trim();
  }

  function selectedEnglishText() {
    const value = String(window.getSelection?.() || '').trim().replace(/\s+/g, ' ');
    if (!value || value.length > 120 || !/[A-Za-z]/.test(value)) return '';
    const latin = (value.match(/[A-Za-z]/g) || []).length;
    return latin / value.length >= 0.5 ? value : '';
  }

  function isTypingTarget(target) {
    return target instanceof Element && (
      target.matches('input, textarea, select, [contenteditable="true"]') ||
      target.isContentEditable
    );
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
