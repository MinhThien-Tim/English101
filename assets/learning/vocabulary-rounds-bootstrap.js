(function bootstrapVocabularyRounds() {
  'use strict';

  const allowedSets = new Set(['vong-1-2', 'vong-3-4', 'vong-5-6']);
  const route = English101Learning.readLearningRoute(location.href);
  const set = allowedSets.has(route.set) ? route.set : 'vong-1-2';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Không tải được ${src}`));
      document.body.append(script);
    });
  }

  function applyDatasetConfig() {
    const { DATA, GROUPS, config } = window.ENGLISH101_VOCABULARY_DATASET;
    for (const entry of DATA) {
      if (entry.cloze && typeof entry.cloze.valid !== 'boolean') {
        entry.cloze.valid = Boolean(entry.cloze.answer && entry.cloze.sentence && entry.cloze.sentence.includes('____'));
      }
    }
    const clozeCount = DATA.filter(entry => entry.cloze && entry.cloze.valid).length;
    document.title = config.title;
    document.querySelector('.eyebrow').textContent = config.eyebrow;
    document.querySelector('header p').innerHTML = `${DATA.length.toLocaleString('vi-VN')} mục học · ${GROUPS.length} nhóm · ${clozeCount.toLocaleString('vi-VN')} bài điền có ngữ cảnh.<br>Hiểu nghĩa, nhớ chủ động và sử dụng trong câu.`;
    document.querySelector('#group option').textContent = `Tất cả ${GROUPS.length} nhóm`;
    document.querySelector('#tier').innerHTML = `<option value="">Cả hai vòng</option>${config.tiers.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}`;
  }

  function restoreRouteMode() {
    if (!route.mode) return;
    const mode = document.querySelector('#mode');
    if (mode && Array.from(mode.options).some(option => option.value === route.mode)) mode.value = route.mode;
  }

  document.addEventListener('change', event => {
    if (event.target.id !== 'mode') return;
    history.replaceState({}, '', English101Learning.writeLearningRoute(location.href, { mode: event.target.value }));
  });

  loadScript(`../data/vocabulary/${set}.js`)
    .then(() => {
      applyDatasetConfig();
      return loadScript('../assets/learning/vocabulary-rounds-app.js');
    })
    .then(() => {
      restoreRouteMode();
      return loadScript('ielts-vocabulary-focus.js');
    })
    .catch(error => {
      const content = document.querySelector('#content');
      content.innerHTML = `<div class="card feedback wrong" role="alert"><b>Không thể mở bộ từ vựng.</b><p>${String(error.message || error)}</p></div>`;
    });
})();
