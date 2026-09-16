(function bootstrapVocabularyRounds() {
  'use strict';

  const allowedSets = new Set(['vong-1-2', 'vong-3-4', 'vong-5-6', 'vong-1-6']);
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

  async function loadDataset() {
    if (set !== 'vong-1-6') {
      await loadScript(`../data/vocabulary/${set}.js`);
      return;
    }
    const parts = [];
    for (const part of ['vong-1-2', 'vong-3-4', 'vong-5-6']) {
      await loadScript(`../data/vocabulary/${part}.js`);
      parts.push(window.ENGLISH101_VOCABULARY_DATASET);
    }
    const groups = [], groupIndex = new Map(), data = [];
    let synonymOffset = 0;
    for (const part of parts) {
      const remap = part.GROUPS.map(label => {
        if (!groupIndex.has(label)) { groupIndex.set(label, groups.length); groups.push(label); }
        return groupIndex.get(label);
      });
      for (const entry of part.DATA) data.push({...entry,id:`${part.config.set}:${entry.id}`,groups:entry.groups.map(index=>remap[index]),synGroups:(entry.synGroups||[]).map(index=>index+synonymOffset)});
      synonymOffset += (part.SYNONYMS || []).length;
    }
    await loadScript('../data/vocabulary/vong-1-6-legacy-map.js');
    window.ENGLISH101_VOCABULARY_DATASET = {
      DATA:data,GROUPS:groups,
      SYNONYMS:parts.flatMap(part=>part.SYNONYMS||[]),
      SYNEX:parts.flatMap(part=>part.SYNEX||[]),
      config:{set,title:'Vòng 1–6 · Vocabulary Atlas',eyebrow:'VÒNG 1–6 / NHỚ TỪ · DÙNG TỪ',storageKey:'v1-6-atlas-v1',legacyKey:'compact-vocab-sentences',tiers:['V1','V2','V3','V4','V5','V6'].map(tier=>[tier,`Vòng ${tier.slice(1)}`]),exportStem:'vong-1-6',sourceUrl:'https://github.com/MinhThien-Tim/English101/blob/main/Vocabulary/tu-vung-vong-1-6-rut-gon-luyen-viet.html'}
    };
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
    document.querySelector('#tier').innerHTML = `<option value="">${config.tiers.length === 2 ? 'Cả hai vòng' : 'Tất cả vòng'}</option>${config.tiers.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}`;
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

  document.body.classList.add(`vocabulary-${set}`);
  loadDataset()
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
