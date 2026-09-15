(() => {
  'use strict';
  const installPronunciationShortcut = () => {
    const register = () => window.EnglishPronunciation?.register({
      getCurrentText: () => {
        try {
          const inSession = document.body.classList.contains('quiz-focus') || Boolean(document.querySelector('.study .word'));
          const item = inSession && typeof window.current === 'function' ? window.current() : null;
          return item?.w || item?.word || item?.term || (inSession ? document.querySelector('.study .word')?.textContent?.trim() : '') || '';
        } catch (_) {
          return document.querySelector('.study .word')?.textContent?.trim() || '';
        }
      },
      lang: document.querySelector('#accent')?.value || 'en-GB',
      rate: Number(document.querySelector('#rate')?.value) || .86
    });
    if (window.EnglishPronunciation) return register();
    const script = document.createElement('script');
    script.src = '../assets/keyboard-pronunciation.js?v=20260915-l3';
    script.addEventListener('load', register, {once:true});
    document.head.appendChild(script);
  };
  installPronunciationShortcut();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'focus-toggle';
  button.setAttribute('aria-label', 'Bật chế độ tập trung');

  const autoButton = document.createElement('button');
  autoButton.type = 'button';
  autoButton.className = 'auto-pronounce-toggle';
  let autoPronounce = localStorage.getItem('vocabulary-auto-pronounce') === 'true';

  const setFocus = enabled => {
    document.body.classList.toggle('focus-mode', enabled);
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Tắt chế độ tập trung' : 'Bật chế độ tập trung');
    button.textContent = enabled ? 'Thoát tập trung' : 'Tập trung';
  };

  const enhancePartOfSpeech = root => {
    root.querySelectorAll('.study .pos:not([data-pos-ready])').forEach(element => {
      element.dataset.posReady = 'true';
      const parts = element.textContent.split('·').map(part => part.trim()).filter(Boolean);
      if (parts.length < 2) return;
      element.textContent = parts.shift();
      const context = document.createElement('span');
      context.className = 'pos-context';
      context.textContent = parts.join(' · ');
      element.after(context);
    });

    root.querySelectorAll('.study .ipa:not([data-ipa-ready])').forEach(element => {
      element.dataset.ipaReady = 'true';
      const parts = element.textContent.split('·').map(part => part.trim()).filter(Boolean);
      if (parts.length < 2) return;
      const partOfSpeech = parts[parts.length - 1];
      if (!/^(n|v|adj|adv|prep|conj|pron|det|phr(?:\s*v)?)(\s*[\/,]\s*(n|v|adj|adv|prep|conj|pron|det|phr(?:\s*v)?))*$/i.test(partOfSpeech)) return;
      element.textContent = parts.slice(0, -1).join(' · ');
      const badge = document.createElement('span');
      badge.className = 'pos-inline';
      badge.textContent = partOfSpeech;
      element.append(badge);
    });
  };

  const enhanceLearningCard = root => {
    const cards = [];
    if (root.matches?.('.study > .card')) cards.push(root);
    if (root.matches?.('.study')) root.querySelectorAll(':scope > .card').forEach(card => cards.push(card));
    root.querySelectorAll?.('.study > .card').forEach(card => cards.push(card));
    cards.forEach(card => {
      if (card.querySelector('#exercise,#writing,#writingFeedback')) card.classList.add('learning-card');
    });
  };

  const setAutoPronounce = enabled => {
    autoPronounce = enabled;
    localStorage.setItem('vocabulary-auto-pronounce', String(enabled));
    autoButton.setAttribute('aria-pressed', String(enabled));
    autoButton.setAttribute('aria-label', enabled ? 'Tắt phát âm tự động' : 'Bật phát âm tự động');
    autoButton.textContent = enabled ? '🔊 Tự phát âm: Bật' : '🔈 Tự phát âm: Tắt';
  };

  const pronounceCurrentWord = () => {
    if (!autoPronounce || !('speechSynthesis' in window)) return;
    let word = document.querySelector('.study .word')?.textContent?.trim() || '';
    try {
      if (typeof window.current === 'function') word = window.current()?.w || word;
    } catch (_) {}
    if (!word || !/[a-z]/i.test(word)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-GB';
    utterance.rate = .86;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  let pronunciationTimer;
  const schedulePronunciation = () => {
    clearTimeout(pronunciationTimer);
    pronunciationTimer = setTimeout(pronounceCurrentWord, 160);
  };

  button.addEventListener('click', () => setFocus(!document.body.classList.contains('focus-mode')));
  autoButton.addEventListener('click', () => {
    setAutoPronounce(!autoPronounce);
    if (autoPronounce) pronounceCurrentWord();
    else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('focus-mode')) setFocus(false);
  });
  document.body.append(autoButton, button);
  enhancePartOfSpeech(document);
  enhanceLearningCard(document);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    enhancePartOfSpeech(node);
    enhanceLearningCard(node);
    if (node.matches?.('.study') || node.querySelector?.('.study > .card')) schedulePronunciation();
  }))).observe(document.getElementById('content'), {childList:true, subtree:true});
  setFocus(false);
  setAutoPronounce(autoPronounce);
})();
