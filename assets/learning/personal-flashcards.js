(async function() {
  'use strict';
  const api = window.English101Learning, $ = id => document.getElementById(id);
  let store, data = {collections:[],entries:[],progress:[],imports:[]}, learningSession = null, activeKind = null, practiceMode = 'choice';
  let draftRows = [], lookupCache = null;
  let locale = localStorage.getItem('english101.personalFlashcards.language') === 'en' ? 'en' : 'vi';
  const labels = {
    en:{subtitle:'Words and phrases saved from your own reading.',flow:'READ → SAVE → REVIEW',privacy:'Private to this browser',emptyTitle:'Read → Save → Review',emptyText:'Save useful language while reading with Context Lens, or import an English101 vocabulary file.',openContext:'Open Context Lens →',importVocabulary:'Import vocabulary',tabs:['LIBRARY','FLASHCARDS','PRACTICE','IMPORTS'],stats:['Total cards','Known','Learning','Collections'],help:'How it works',search:'Search words, meanings, sources…',allCollections:'All collections',allStates:'All states',startFlash:'Start flashcards →',startPractice:'Start practice →',importedSets:'Imported sets',history:'History prevents accidental duplicate imports. Cards and learning progress remain independent from these records.',howTitle:'Read → Save → Review',howSteps:['Save useful words in Context Lens.','Export English101 Vocabulary there.','Import the JSON here. Your review state stays in this browser.'],added:n=>`${n} added`,duplicate:n=>`${n} already existed`,upToDate:'No new cards found. This set is already up to date.',invalid:'This file is not valid JSON.'},
    vi:{subtitle:'Từ và cụm từ được lưu từ chính nội dung bạn đọc.',flow:'ĐỌC → LƯU → ÔN TẬP',privacy:'Chỉ lưu trên trình duyệt này',emptyTitle:'Đọc → Lưu → Ôn tập',emptyText:'Lưu từ hữu ích khi đọc bằng Context Lens, hoặc nhập tệp từ vựng English101.',openContext:'Mở Context Lens →',importVocabulary:'Nhập từ vựng',tabs:['THƯ VIỆN','FLASHCARDS','LUYỆN TẬP','TỆP ĐÃ NHẬP'],stats:['Tổng số thẻ','Đã nhớ','Đang học','Bộ từ'],help:'Cách hoạt động',search:'Tìm từ, nghĩa, nguồn…',allCollections:'Tất cả bộ từ',allStates:'Tất cả trạng thái',startFlash:'Bắt đầu flashcards →',startPractice:'Bắt đầu luyện tập →',importedSets:'Các bộ đã nhập',history:'Lịch sử giúp tránh nhập trùng. Thẻ và tiến độ học được lưu độc lập với các bản ghi này.',howTitle:'Đọc → Lưu → Ôn tập',howSteps:['Lưu từ hữu ích trong Context Lens.','Xuất tệp English101 Vocabulary tại đó.','Nhập tệp JSON tại đây. Tiến độ ôn tập được lưu trong trình duyệt này.'],added:n=>`Đã thêm ${n} thẻ`,duplicate:n=>`${n} thẻ đã tồn tại`,upToDate:'Không có thẻ mới. Bộ từ này đã được cập nhật.',invalid:'Tệp này không phải JSON hợp lệ.'}
  };
  const tr = key => labels[locale][key];
  function applyBuilderLocale() {
    const vi = locale === 'vi';
    $('empty-title').textContent = vi ? 'Tạo bộ thẻ đầu tiên' : 'Create your first set';
    document.querySelector('#empty-guide>p').textContent = vi ? 'Dán danh sách từ tiếng Anh. Bạn có thể tự thêm nghĩa hoặc dùng gợi ý có sẵn từ English101.' : 'Paste English words. Add meanings yourself or use suggestions from English101.';
    document.querySelectorAll('[data-open-builder]').forEach(button => button.textContent = vi ? 'Dán danh sách từ' : 'Paste a word list');
    $('library-actions-title').textContent = vi ? 'Bộ thẻ của bạn' : 'Your cards';
    $('import').setAttribute('aria-label', vi ? 'Nhập từ vựng từ tệp JSON' : 'Import vocabulary from a JSON file');
    $('builder-title').textContent = vi ? 'Tạo bộ thẻ từ danh sách từ' : 'Create cards from a word list';
    $('close-builder').textContent = vi ? 'Đóng' : 'Close';
    document.querySelector('label[for="new-collection"]').textContent = vi ? 'Tên bộ thẻ' : 'Set name';
    document.querySelector('label[for="word-list"]').textContent = vi ? 'Dán từ hoặc cụm từ tiếng Anh' : 'Paste English words or phrases';
    $('preview-list').textContent = vi ? 'Xem và bổ sung nội dung' : 'Preview and add content';
    $('fill-list').textContent = vi ? 'Tự điền từ English101' : 'Suggest from English101';
    $('save-list').textContent = vi ? 'Tạo bộ thẻ' : 'Create set';
    $('state-filter').querySelector('[value="incomplete"]').textContent = vi ? 'Thiếu nội dung' : 'Missing content';
    $('how-title').textContent = vi ? 'Tạo và học bộ thẻ của bạn' : 'Create and study your cards';
    const steps = vi ? ['Dán danh sách từ tiếng Anh để tạo bộ thẻ ngay trên web.','Chọn “Tự điền từ English101”, kiểm tra gợi ý rồi lưu.','Dùng nút “Sửa nội dung” để bổ sung nghĩa và ví dụ bất cứ lúc nào. Dữ liệu được lưu trên trình duyệt này.'] : ['Paste an English word list to create cards on this page.','Choose “Suggest from English101”, review the suggestions, then save.','Use “Edit card” to add meanings and examples later. Data stays in this browser.'];
    document.querySelectorAll('#how-dialog li').forEach((item,index)=>item.textContent=steps[index]);
  }
  function applyLocale(){const l=labels[locale];document.documentElement.lang=locale==='vi'?'vi':'en';document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===locale)));$('page-subtitle').textContent=l.subtitle;$('page-flow').textContent=l.flow;$('privacy-label').textContent=l.privacy;$('empty-title').textContent=l.emptyTitle;document.querySelector('#empty-guide>p').textContent=l.emptyText;document.querySelector('#empty-guide .btn').textContent=l.openContext;for(const label of document.querySelectorAll('.file-button'))label.childNodes[0].textContent=l.importVocabulary;document.querySelectorAll('.tab').forEach((tab,index)=>tab.lastChild.textContent=' '+l.tabs[index]);document.querySelectorAll('.dashboard span').forEach((span,index)=>span.textContent=l.stats[index]);$('show-help').textContent=l.help;$('search').placeholder=l.search;$('state-filter').options[0].text=l.allStates;$('start-flash').textContent=l.startFlash;$('start-practice').textContent=l.startPractice;document.querySelector('#imports .section-head h2').textContent=l.importedSets;document.querySelector('.imports-note').textContent=l.history;$('how-title').textContent=l.howTitle;document.querySelectorAll('#how-dialog li').forEach((item,index)=>item.textContent=l.howSteps[index]);render();}
  const message = text => { $('message').textContent = text || ''; };
  const element = (tag, text, className) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; };
  async function run(work) { try { await work(); } catch (error) { message(error.message || 'Unable to save. Please try again.'); } }
  const stateOf = id => data.progress.find(item => item.id === id)?.state || 'learning';
  const sourceText = entry => [entry.source?.title,entry.source?.page ? `p. ${entry.source.page}` : '',entry.source?.chapter !== undefined ? `chapter ${entry.source.chapter}` : '',entry.source?.location].filter(Boolean).join(' · ');
  const answerFor = entry => entry.lexicalUnit || entry.lemma;
  const viMeaning = entry => entry.meaningsVi.filter(Boolean).join(' · ');
  const normalize = value => String(value || '').trim().toLocaleLowerCase().replace(/[.!?]+$/,'');
  const shuffle = list => list.map(value => ({value,sort:Math.random()})).sort((a,b) => a.sort-b.sort).map(item => item.value);
  function speakEnglish(text) {
    if (window.EnglishPronunciation?.speak(text, {lang:'en-US',rate:.82})) return;
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = .82;
    window.speechSynthesis.speak(utterance);
  }
  function pool(scope) { return data.entries.filter(entry => scope === 'ALL' || entry.collectionId === scope); }
  function filteredEntries() { const query = $('search').value.trim().toLocaleLowerCase(), scope = $('collection-filter').value, state = $('state-filter').value; return data.entries.filter(entry => (scope === 'ALL' || entry.collectionId === scope) && (state === 'ALL' || (state === 'incomplete' ? !viMeaning(entry) || !entry.context?.sentence : stateOf(entry.id) === state)) && [entry.lemma,entry.surface,entry.ipa,entry.partOfSpeech,entry.meaningEn,...entry.meaningsVi,entry.context?.sentence,sourceText(entry)].join(' ').toLocaleLowerCase().includes(query)); }

  function setOptions(select, current) { select.replaceChildren(new Option(tr('allCollections'),'ALL'), ...data.collections.map(collection => new Option(collection.title,collection.id))); if ([...select.options].some(option => option.value === current)) select.value = current; }
  function render() {
    const hasCards = Boolean(data.entries.length), known = data.entries.filter(entry => stateOf(entry.id) === 'known').length;
    $('empty-guide').hidden = hasCards; $('workspace').hidden = !hasCards;
    if (!hasCards) return;
    $('total-stat').textContent = data.entries.length; $('known-stat').textContent = known; $('learning-stat').textContent = data.entries.length-known; $('collection-stat').textContent = data.collections.length;
    for (const id of ['collection-filter','flash-scope','practice-scope']) setOptions($(id),$(id).value);
    const entries = filteredEntries(); $('library-count').textContent = `${entries.length} of ${data.entries.length} cards`;
    $('cards').replaceChildren();
    if (!entries.length) $('cards').append(element('div','No cards match these filters.','empty'));
    for (const entry of entries) $('cards').append(renderCard(entry));
    renderImports();
    $('flash-note').textContent = `${eligiblePool($('flash-scope').value,$('flash-mode').value).length} cards ready for this mode.`;
    $('practice-note').textContent = `${eligiblePool($('practice-scope').value,$('practice-mode').value).length} cards ready for this mode. Multiple choice needs four cards with Vietnamese meanings.`;
  }
  function renderCard(entry) {
    const card = element('article',undefined,'card' + (stateOf(entry.id) === 'known' ? ' learned' : ''));
    const head = element('div',undefined,'head'), title = element('div'); title.append(element('div',entry.lemma,'word'));
    const meta = [entry.ipa,entry.partOfSpeech].filter(Boolean).join(' · '); if (meta) title.append(element('div',meta,'meta'));
    const actions = element('div',undefined,'card-actions');
    if ('speechSynthesis' in window) { const speak = element('button','🔊','icon-btn'); speak.type='button'; speak.title='Pronounce'; speak.setAttribute('aria-label',`Pronounce ${entry.lemma}`); speak.dataset.speak=entry.lemma; speak.onclick=()=>speakEnglish(entry.lemma); actions.append(speak); }
    const stateButton = element('button',stateOf(entry.id)==='known'?'✓ Known':'Learning','state-button'); stateButton.type='button'; stateButton.onclick=()=>run(async()=>{ await store.rate(entry.id,stateOf(entry.id)==='known'?'learning':'known'); await refresh(); }); actions.append(stateButton); head.append(title,actions); card.append(head);
    if (viMeaning(entry)) card.append(element('div',viMeaning(entry),'meaning')); else card.append(element('div',locale==='vi'?'Thiếu nghĩa — hãy bổ sung để luyện tập.':'Missing meaning — add one to practise.','missing-content')); if (entry.meaningEn) card.append(element('p',entry.meaningEn,'meaning-en'));
    if (entry.context?.sentence || sourceText(entry)) { const details=element('details',undefined,'card-detail'), summary=element('summary','Context & source'); details.append(summary); if(entry.context?.sentence) details.append(element('blockquote',entry.context.sentence)); if(sourceText(entry)) details.append(element('p',sourceText(entry),'source-line')); card.append(details); }
    const editButton=element('button',locale==='vi'?'Sửa nội dung':'Edit card','toggle'); editButton.type='button'; editButton.onclick=()=>{card.querySelector('.edit-card')?.remove();editCard(entry,card);}; card.append(editButton);
    const deleteButton=element('button','Delete card','toggle delete-button'); deleteButton.type='button'; deleteButton.onclick=()=>run(async()=>{ if(confirm(`Delete “${entry.lemma}”?`)){await store.deleteCard(entry.id);await refresh();} }); card.append(deleteButton); return card;
  }
  function renderImports() { $('import-list').replaceChildren(); const imports=[...data.imports].sort((a,b)=>b.importedAt-a.importedAt); if(!imports.length){$('import-list').append(element('div','No imported sets recorded yet.','empty-imports'));return;} for(const item of imports){const node=element('article',undefined,'import-record'),copy=element('div');copy.append(element('h3',item.sourceName||'Vocabulary import'),element('p',`${item.entryCount} cards · ${item.collectionIds.length} collection${item.collectionIds.length===1?'':'s'}`));const date=element('time',new Date(item.importedAt).toLocaleString());date.dateTime=new Date(item.importedAt).toISOString();node.append(copy,date);$('import-list').append(node);} }
  async function refresh(){data=await store.read();render();}
  function setTab(id){ for(const tab of document.querySelectorAll('.tab')){const active=tab.dataset.tab===id;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));} for(const panel of document.querySelectorAll('.panel'))panel.classList.toggle('active',panel.id===id); stopSessions(); }
  function eligiblePool(scope,mode){return pool(scope).filter(entry=>{
    if (!viMeaning(entry) && !entry.meaningEn) return false;
    if (mode==='cloze'||mode==='context') return Boolean(entry.context?.sentence && entry.context.sentence.toLocaleLowerCase().includes(entry.surface.toLocaleLowerCase()));
    return true;
  });}
  function selectSessionEntries(scope,count,mode){const eligible=eligiblePool(scope,mode);return shuffle(eligible).slice(0,Math.min(Number(count),eligible.length));}
  function stopSessions(){learningSession=null;activeKind=null;for(const id of ['flash-play','flash-end','practice-play','practice-end'])$(id).style.display='none';$('flash-setup').style.display='block';$('practice-setup').style.display='block';}

  function startFlash(){const entries=selectSessionEntries($('flash-scope').value,$('flash-count').value,$('flash-mode').value);if(!entries.length)return message(locale==='vi'?'Chế độ này cần nghĩa hoặc câu ví dụ. Hãy bổ sung nội dung cho thẻ.':'This mode needs meanings or examples. Add content to your cards.');learningSession=api.createLearningSession({entries,kind:'flashcard',mode:$('flash-mode').value,strategy:{createPrompt:api.personalPrompt,grade:()=>({correct:false})}});learningSession.start();activeKind='flashcard';$('flash-setup').style.display='none';$('flash-end').style.display='none';$('flash-play').style.display='block';drawFlash();}
  function drawFlash(){const snapshot=learningSession.snapshot();if(snapshot.status==='completed'){ $('flash-play').style.display='none';$('flash-end').style.display='block';$('flash-summary').textContent=`${snapshot.ratings.good} known · ${snapshot.ratings.hard} learning`;refresh();return;}const entry=snapshot.currentEntry,revealed=snapshot.answerState.revealed,mode=$('flash-mode').value,showWord=mode==='en-vi';$('flash-meta').textContent=`${snapshot.index+1} / ${snapshot.total}`;$('flash-bar').style.width=`${snapshot.index/snapshot.total*100}%`;$('flash-front').textContent=snapshot.prompt.front;$('flash-ipa').textContent=showWord?entry.ipa||'':'';$('flash-pos').textContent=showWord?entry.partOfSpeech||'':'';$('flash-front-meta').hidden=!showWord||(!entry.ipa&&!entry.partOfSpeech);$('flash-answer-label').textContent=locale==='vi'?'Đáp án':'Answer';$('flash-answer').textContent=snapshot.prompt.back;$('flash-details').textContent=mode==='en-vi'?entry.meaningEn||'':[entry.ipa,entry.partOfSpeech,viMeaning(entry),entry.meaningEn].filter(Boolean).join(' · ');$('flash-details').hidden=!$('flash-details').textContent;$('flash-context').textContent=entry.context?.sentence||'';$('flash-context').hidden=!entry.context?.sentence;$('flash-source').textContent=sourceText(entry);$('flash-source').hidden=!sourceText(entry);$('flash-back').hidden=!revealed;$('reveal-flash').hidden=revealed;$('rate-learning').hidden=$('rate-known').hidden=!revealed;document.querySelector('.flash-card').classList.toggle('is-revealed',revealed);document.querySelector('.flash-card').focus();}
  function revealFlash(){learningSession.dispatch({type:'REVEAL'});drawFlash();}
  function advanceFlash(){learningSession.dispatch({type:'NEXT'});drawFlash();}
  async function rateFlash(value){const entry=learningSession.snapshot().currentEntry;await store.rate(entry.id,value==='good'?'known':'learning');learningSession.dispatch({type:'RATE',value});drawFlash();}

  function choicePool(entry){const alternatives=shuffle(data.entries.filter(item=>item.id!==entry.id&&viMeaning(item)&&viMeaning(item)!==viMeaning(entry))).slice(0,3);return alternatives.length===3?shuffle([entry,...alternatives]):[];}
  function makePracticePrompt(entry,{mode}){if(mode==='choice'){const choices=choicePool(entry);if(choices.length)return{front:entry.lemma,answer:entry.id,choices,fallback:false};return{front:viMeaning(entry)||entry.meaningEn,answer:answerFor(entry),choices:[],fallback:true};}if(mode==='typed')return{front:viMeaning(entry)||entry.meaningEn,answer:answerFor(entry),choices:[]};const prompt=api.personalPrompt(entry,{mode:'cloze'});if(prompt.front!==entry.lemma)return{front:prompt.front,answer:prompt.back,choices:[]};const choices=choicePool(entry);return{front:entry.lemma,answer:entry.id,choices,fallback:true};}
  function startPractice(){practiceMode=$('practice-mode').value;const entries=selectSessionEntries($('practice-scope').value,$('practice-count').value,practiceMode);if(!entries.length)return message(locale==='vi'?'Chế độ này cần nghĩa hoặc câu ví dụ. Hãy bổ sung nội dung cho thẻ.':'This mode needs meanings or examples. Add content to your cards.');learningSession=api.createLearningSession({entries,kind:'quiz',mode:practiceMode,strategy:{createPrompt:makePracticePrompt,grade:(answer,entry,{prompt})=>({correct:prompt.choices?.length?answer===entry.id:normalize(answer)===normalize(prompt.answer)})}});learningSession.start();activeKind='quiz';$('practice-setup').style.display='none';$('practice-end').style.display='none';$('practice-play').style.display='block';drawPractice();}
  function drawPractice(){const snapshot=learningSession.snapshot();if(snapshot.status==='completed'){const progress=snapshot.progress;$('practice-play').style.display='none';$('practice-end').style.display='block';$('practice-score').textContent=`${progress.correct}/${progress.completed} correct`;$('practice-summary').textContent=`${progress.incorrect} incorrect · ${progress.assisted} revealed`;return;}const entry=snapshot.currentEntry,prompt=snapshot.prompt,answered=snapshot.answerState.submitted;$('practice-meta').textContent=`${snapshot.index+1} / ${snapshot.total} · Correct ${snapshot.progress.correct}`;$('practice-bar').style.width=`${snapshot.index/snapshot.total*100}%`;$('practice-prompt').textContent=prompt.front;$('practice-hint').textContent=prompt.fallback?'This Prompt uses a safe fallback because the selected mode is unavailable for this card.':[entry.ipa,entry.partOfSpeech].filter(Boolean).join(' · ');$('practice-exercise').replaceChildren();if(prompt.choices?.length){const list=element('div',undefined,'choice-list');prompt.choices.forEach((choice,index)=>{const button=element('button',undefined,'choice');button.append(element('span',String(index+1)),document.createTextNode(viMeaning(choice)));button.disabled=answered;button.dataset.answer=choice.id;if(answered){button.classList.toggle('correct',choice.id===entry.id);button.classList.toggle('wrong',choice.id!==entry.id&&snapshot.attempts.at(-1)?.answer===choice.id);}list.append(button);});$('practice-exercise').append(list);}else{const input=element('input');input.id='practice-answer';input.setAttribute('aria-label','Your answer');input.autocomplete='off';input.spellcheck=false;input.disabled=answered;const controls=element('div',undefined,'actions'),submit=element('button','Check ↵','btn');submit.dataset.submit='';submit.disabled=answered;const reveal=element('button','Show answer','btn secondary');reveal.dataset.reveal='';reveal.disabled=answered;controls.append(submit,reveal);$('practice-exercise').append(input,controls);if(!answered)input.focus();}renderFeedback(snapshot);}
  function renderFeedback(snapshot){const area=$('practice-feedback');area.replaceChildren();if(!snapshot.answerState.submitted)return;const attempt=snapshot.attempts.at(-1),entry=snapshot.currentEntry,box=element('div',undefined,'feedback '+(attempt.correct&&!attempt.assisted?'ok':'bad'));box.append(element('strong',attempt.correct&&!attempt.assisted?'Correct':'Incorrect'));box.append(element('p',`Expected: ${snapshot.prompt.choices?.length?viMeaning(entry):snapshot.prompt.answer}`));if(viMeaning(entry))box.append(element('p',viMeaning(entry)));if(entry.context?.sentence)box.append(element('small',entry.context.sentence));const next=element('button','Next →','btn');next.dataset.next='';box.append(next);area.append(box);}
  function submitPractice(answer,assisted=false){if(!learningSession||learningSession.snapshot().answerState.submitted||!String(answer).trim())return;learningSession.dispatch({type:'SUBMIT',answer,assisted});drawPractice();}
  function nextPractice(){learningSession.dispatch({type:'NEXT'});drawPractice();}

  function duplicateChoice(record){return new Promise(resolve=>{const dialog=$('duplicate-dialog');$('duplicate-detail').textContent=`${record.entryCount} cards · ${record.sourceName||'Vocabulary set'} · Imported on ${new Date(record.importedAt).toLocaleDateString()}`;dialog.addEventListener('close',()=>resolve(dialog.returnValue),{once:true});dialog.showModal();});}
  async function importFile(input){const file=input.files[0];if(!file)return;try{const raw=JSON.parse(await file.text()),normalized=api.normalizeVocabulary(raw),fingerprint=await api.fingerprintVocabulary(normalized,raw),previous=data.imports.find(item=>item.fingerprint===fingerprint);if(previous&&(await duplicateChoice(previous))!=='new-only')return;const existing=new Set(data.entries.map(entry=>entry.id)),added=normalized.entries.filter(entry=>!existing.has(entry.id)).length,duplicates=normalized.entries.length-added;const record={id:fingerprint,fingerprint,schema:raw.schema,version:raw.version,exportedAt:raw.exportedAt,importedAt:Date.now(),collectionIds:normalized.collections.map(item=>item.id),entryCount:normalized.entries.length,sourceName:file.name};await store.import(normalized,record);await refresh();message(added?`${tr('added')(added)}${duplicates?` · ${tr('duplicate')(duplicates)}`:''}`:tr('upToDate'));}catch(error){message(error instanceof SyntaxError?tr('invalid'):error.message);}finally{input.value='';}}
  function inputField(label, value, onChange, multiline = false) {
    const wrapper = element('label',undefined,'draft-field');
    wrapper.append(element('span',label));
    const input = document.createElement(multiline ? 'textarea' : 'input');
    input.value = value || '';
    if (multiline) input.rows = 2;
    input.addEventListener('input', () => onChange(input.value));
    wrapper.append(input);
    return wrapper;
  }
  function renderDraft(duplicates = 0) {
    $('list-preview').hidden = !draftRows.length;
    $('preview-summary').textContent = locale === 'vi' ? `Đã nhận diện ${draftRows.length} mục${duplicates ? `, bỏ qua ${duplicates} mục trùng` : ''}.` : `${draftRows.length} items found${duplicates ? `, ${duplicates} duplicates skipped` : ''}.`;
    const container = $('preview-rows'); container.replaceChildren();
    draftRows.forEach((row, index) => {
      const card = element('div',undefined,'draft-row');
      card.append(element('strong',`${index + 1}. ${row.word}`));
      const fields = element('div',undefined,'draft-grid');
      fields.append(inputField('English',row.word,value=>{row.word=value.trim();}),inputField('Nghĩa tiếng Việt',row.meaning,value=>{row.meaning=value;}),inputField('Từ loại',row.pos,value=>{row.pos=value;}),inputField('IPA',row.ipa,value=>{row.ipa=value;}),inputField('Ví dụ',row.ex,value=>{row.ex=value;},true));
      card.append(fields);
      const remove = element('button','Xóa mục','plain-btn'); remove.type='button'; remove.onclick=()=>{draftRows.splice(index,1);renderDraft();}; card.append(remove);
      container.append(card);
    });
  }
  async function fillDraft() {
    if (!lookupCache) {
      const response = await fetch('../data/vocabulary/personal-lookup.json');
      if (!response.ok) throw new Error('Không thể tải dữ liệu từ vựng English101. Bạn vẫn có thể tạo thẻ và tự thêm nghĩa.');
      lookupCache = await response.json();
    }
    let found = 0;
    for (const row of draftRows) {
      const match = lookupCache[api.personalWordKey(row.word)];
      if (!match) continue;
      found += 1;
      for (const field of ['pos','ipa','ex']) if (!row[field]) row[field] = match[field] || '';
      if (!row.meaning) row.meaning = match.vi || '';
      if (!row.source) row.source = match.source;
    }
    renderDraft();
    message(locale === 'vi' ? `Tìm thấy gợi ý cho ${found}/${draftRows.length} mục. Hãy kiểm tra nghĩa trước khi học.` : `Suggestions found for ${found}/${draftRows.length} items. Check meanings before studying.`);
  }
  async function saveDraft() {
    const rows = draftRows.filter(row=>row.word.trim());
    if (!rows.length) return message(locale === 'vi' ? 'Hãy nhập ít nhất một từ tiếng Anh.' : 'Enter at least one English word.');
    const title = $('new-collection').value.trim() || (locale === 'vi' ? 'Bộ từ của tôi' : 'My word set');
    const collectionId = `personal:${Date.now()}:${Math.random().toString(36).slice(2,9)}`;
    const collection = {id:collectionId,title,createdAt:Date.now(),updatedAt:Date.now()};
    const entries = rows.map((row,index)=>{
      const entry=api.makePersonalEntry(row,collectionId,`${collectionId}:${index}`,{vi:row.meaning,pos:row.pos,ipa:row.ipa,ex:row.ex,source:row.source});
      entry.context.selectedText=row.word;
      return entry;
    });
    await store.addCollection(collection,entries);
    draftRows=[]; $('word-list').value=''; $('new-collection').value=''; $('list-preview').hidden=true; $('list-builder').hidden=true;
    await refresh(); setTab('library'); $('collection-filter').value=collectionId; render();
    message(locale === 'vi' ? `Đã tạo ${entries.length} thẻ trong “${title}”.` : `Created ${entries.length} cards in “${title}”.`);
  }
  function editCard(entry, card) {
    const form = element('div',undefined,'edit-card');
    let meaning=viMeaning(entry), pos=entry.partOfSpeech||'', ipa=entry.ipa||'', sentence=entry.context?.sentence||'';
    form.append(inputField('Nghĩa tiếng Việt',meaning,value=>meaning=value),inputField('Từ loại',pos,value=>pos=value),inputField('IPA',ipa,value=>ipa=value),inputField('Ví dụ',sentence,value=>sentence=value,true));
    const save=element('button','Lưu thay đổi','btn'); save.type='button'; save.onclick=()=>run(async()=>{
      await store.updateEntry({...entry,meaningsVi:meaning.trim()?[meaning.trim()]:[],partOfSpeech:pos.trim()||null,ipa:ipa.trim()||null,context:{...entry.context,sentence:sentence.trim()}});
      await refresh(); message(locale==='vi'?'Đã lưu thẻ.':'Card saved.');
    });
    const cancel=element('button','Hủy','plain-btn'); cancel.type='button'; cancel.onclick=()=>form.remove();
    form.append(save,cancel); card.append(form); save.focus();
  }
  document.querySelectorAll('[data-open-builder]').forEach(button=>button.onclick=()=>{$('list-builder').hidden=false;$('list-builder').scrollIntoView({block:'start'});$('new-collection').focus();});
  $('close-builder').onclick=()=>{$('list-builder').hidden=true;};
  $('preview-list').onclick=()=>{const parsed=api.parsePersonalList($('word-list').value);draftRows=parsed.rows.map(row=>({...row,pos:'',ipa:'',ex:''}));if(!draftRows.length)return message(locale==='vi'?'Hãy dán ít nhất một từ tiếng Anh.':'Paste at least one English word.');renderDraft(parsed.duplicates);};
  $('fill-list').onclick=()=>run(fillDraft);
  $('save-list').onclick=()=>run(saveDraft);
  document.addEventListener('click',event=>{const target=event.target.closest('button');if(!target)return;if(target.matches('.tab'))setTab(target.dataset.tab);else if('stop'in target.dataset)stopSessions();else if('newFlash'in target.dataset){stopSessions();setTab('flashcards');}else if('newPractice'in target.dataset){stopSessions();setTab('practice');}else if('answer'in target.dataset)submitPractice(target.dataset.answer);else if('submit'in target.dataset)submitPractice($('practice-answer')?.value||'');else if('reveal'in target.dataset)submitPractice(learningSession.snapshot().prompt.answer,true);else if('next'in target.dataset)nextPractice();});
  for(const id of ['search','collection-filter','state-filter','flash-scope','practice-scope','flash-mode','practice-mode'])$(id).addEventListener(id==='search'?'input':'change',render);for(const id of ['import','empty-import','imports-import'])$(id).onchange=event=>run(()=>importFile(event.currentTarget));
  $('start-flash').onclick=startFlash;$('reveal-flash').onclick=revealFlash;$('rate-learning').onclick=()=>run(()=>rateFlash('hard'));$('rate-known').onclick=()=>run(()=>rateFlash('good'));$('start-practice').onclick=startPractice;$('show-help').onclick=()=>$('how-dialog').showModal();
  document.querySelectorAll('[data-lang]').forEach(button=>button.onclick=()=>{locale=button.dataset.lang;localStorage.setItem('english101.personalFlashcards.language',locale);applyLocale();applyBuilderLocale();});
  $('export').onclick=()=>run(async()=>{const content=api.exportVocabulary(await store.read()),url=URL.createObjectURL(new Blob([JSON.stringify(content,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='english101-personal-vocabulary.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  window.EnglishPronunciation?.register({getCurrentText:()=>learningSession?.snapshot()?.currentEntry?.lemma||'',lang:'en-US',rate:.82});
  api.createKeyboardDispatcher({getContext:()=>{const snapshot=learningSession?.snapshot();return{active:Boolean(snapshot&&snapshot.status==='active'),kind:activeKind,answered:Boolean(snapshot?.answerState.submitted),revealed:Boolean(snapshot?.answerState.revealed),emptyInput:activeKind==='quiz'&&!snapshot?.prompt?.choices?.length&&!($('practice-answer')?.value||'').trim()};},dispatch:action=>{if(action==='REVEAL')revealFlash();else if(action==='NEXT')(activeKind==='flashcard'?advanceFlash():nextPractice());else if(action==='RATE_HARD')run(()=>rateFlash('hard'));else if(action==='RATE_GOOD')run(()=>rateFlash('good'));else if(action==='SUBMIT')submitPractice($('practice-answer')?.value||'');else if(action.startsWith('CHOICE_'))document.querySelectorAll('.choice')[Number(action.at(-1))-1]?.click();}}).attach();
  await run(async()=>{store=await api.openPersonalVocabulary();await refresh();applyLocale();applyBuilderLocale();});
})();
