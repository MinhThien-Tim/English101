(async function() {
  'use strict';
  const api = window.English101Learning, $ = id => document.getElementById(id);
  let store, data, selected = null, session = null, queue = [];
  const message = text => { $('message').textContent = text; };
  async function run(work) { try { await work(); } catch (error) { message(error.message || 'Unable to save. Please try again.'); } }
  function element(tag, text) { const node = document.createElement(tag); node.textContent = text; return node; }
  function button(text, action) { const node = element('button', text); node.onclick = () => run(action); return node; }
  function matches(entry, query) { return [entry.lemma,entry.surface,entry.meaningEn,...entry.meaningsVi,entry.context.sentence].join(' ').toLocaleLowerCase().includes(query); }
  function source(entry) { return [entry.source.title, entry.source.page ? `p.${entry.source.page}` : entry.source.chapter !== undefined ? `chapter ${entry.source.chapter}` : entry.source.location].filter(Boolean).join(' · '); }
  function filtered() { const q = $('search').value.trim().toLocaleLowerCase(); return data.entries.filter(e => (!selected || e.collectionId === selected) && matches(e,q)); }
  async function refresh() { data = await store.read(); render(); }
  function render() {
    $('counts').textContent = `${data.entries.length} cards · ${data.collections.length} collections`;
    $('export').disabled = !data.entries.length; $('study').disabled = !filtered().length;
    $('collections').replaceChildren(); $('cards').replaceChildren();
    $('collections').hidden = Boolean(selected); $('collection').hidden = !selected;
    const q = $('search').value.trim().toLocaleLowerCase();
    for (const collection of data.collections) {
      const cards = data.entries.filter(e => e.collectionId === collection.id);
      if (!collection.title.toLocaleLowerCase().includes(q) && !cards.some(e => matches(e,q))) continue;
      const node = element('article','');
      node.append(button(collection.title, () => { selected = collection.id; render(); }));
      const known = cards.filter(e => data.progress.some(p => p.id === e.id && p.state === 'known')).length;
      node.append(element('p', `${cards.length} cards · ${cards.length - known} to learn / review`));
      node.append(button('Rename', async () => { const title = prompt('Collection title',collection.title); if (title?.trim()) { await store.rename(collection.id,title.trim()); await refresh(); } }), button('Delete collection', async () => { if (confirm(`Delete “${collection.title}” and its cards?`)) { await store.deleteCollection(collection.id); await refresh(); } }));
      $('collections').append(node);
    }
    if (!data.entries.length) $('collections').append(element('p','Import an English101 JSON export from Context Lens to get started.'));
    if (selected) {
      $('collection-title').textContent = `${data.collections.find(c => c.id === selected)?.title || ''} · ${filtered().length} cards`;
      for (const entry of filtered()) {
        const node = element('article',''); node.append(element('h3',entry.lemma),element('p',entry.meaningsVi.join(' · ') || entry.meaningEn),element('p',entry.context.sentence),element('small',source(entry)),button('Delete card', async () => { if (confirm(`Delete “${entry.lemma}”?`)) { await store.deleteCard(entry.id); await refresh(); } })); $('cards').append(node);
      }
    }
  }
  function start() {
    if (!queue.length) return;
    session = api.createLearningSession({ entries: queue, kind:'flashcard', mode:$('mode').value, strategy:{ createPrompt:api.personalPrompt, grade:() => ({correct:false}) } });
    session.start(); $('overview').hidden = true; $('study-panel').hidden = false; draw(); $('flashcard').focus();
  }
  function draw() {
    const state = session.snapshot();
    if (state.status === 'completed') { message('Session complete.'); stop(); return; }
    $('position').textContent = `${state.index + 1} / ${state.total}`;
    $('front').textContent = state.prompt.front; $('answer-text').textContent = state.prompt.back;
    const entry = state.currentEntry;
    $('details').textContent = [entry.partOfSpeech,entry.ipa].filter(Boolean).join(' · '); $('sentence').textContent = entry.context.sentence; $('source').textContent = source(entry);
    $('answer').hidden = $('known').hidden = $('learning').hidden = !state.answerState.revealed;
    $('primary').textContent = state.answerState.revealed ? 'Next' : 'Reveal';
  }
  function act(action) { if (!session) return; session.dispatch({type:action}); draw(); }
  function stop() { session = null; $('overview').hidden = false; $('study-panel').hidden = true; render(); $('study').focus(); }
  $('primary').onclick = () => act(session.snapshot().answerState.revealed ? 'NEXT' : 'REVEAL');
  for (const state of ['learning','known']) $(state).onclick = () => run(async () => { const snapshot = session.snapshot(); await store.rate(snapshot.currentEntry.id,state); data = await store.read(); act('NEXT'); });
  $('finish').onclick = stop; $('mode').onchange = start;
  $('study').onclick = () => { queue = filtered(); start(); };
  $('back').onclick = () => { selected = null; render(); };
  $('search').oninput = render;
  $('import').onchange = () => run(async () => {
    const file = $('import').files[0]; if (!file) return;
    try { const normalized = api.normalizeVocabulary(JSON.parse(await file.text())); await store.import(normalized); await refresh(); message('Import complete. Existing cards and review states are preserved.'); }
    catch (error) { message(error instanceof SyntaxError ? 'This file is not valid JSON.' : error.message); }
    finally { $('import').value = ''; }
  });
  $('export').onclick = () => run(async () => { const content = api.exportVocabulary(await store.read()); const url = URL.createObjectURL(new Blob([JSON.stringify(content,null,2)],{type:'application/json'})); const a = document.createElement('a'); a.href = url; a.download = 'english101-personal-vocabulary.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000); });
  api.createKeyboardDispatcher({getContext:() => ({ active:Boolean(session) && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName),kind:'flashcard',revealed:session?.snapshot().answerState.revealed }),dispatch:action => { if (action === 'REVEAL' || action === 'NEXT') act(action); }}).attach();
  $('overview').inert = true;
  await run(async () => { store = await api.openPersonalVocabulary(); await refresh(); $('overview').inert = false; });
})();
