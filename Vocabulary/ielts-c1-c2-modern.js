(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const KEY = 'english101-ielts-c1-c2-modern-v1';
  const topics = [...new Set(DATA.map(row => row[0]))];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const norm = value => String(value ?? '').toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  const regexEsc = value => value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const shuffle = values => { values=[...values]; for(let i=values.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[values[i],values[j]]=[values[j],values[i]]} return values; };
  const emptyState=()=>({faces:[],best:null,session:null});
  const clean=value=>({faces:Array.isArray(value?.faces)?value.faces:[],best:Number.isFinite(value?.best)?value.best:null,session:value?.session||null});
  const persistence=English101Learning.createPersistence({storage:localStorage,key:KEY,schema:KEY+'-session-v1',migrateLegacy:clean});
  let state = clean(persistence.load(emptyState()));
  let deck=[], index=0, correct=0, wrong=[], answered=false, hints=0, elapsed=0, left=0, mode='vi-en', timer=null, learningSession=null;

  function save(){try{persistence.commit(state)}catch(_){}}

  topics.forEach(topic => {
    for(const id of ['topicFilter','qTopic','cardTopic']){const option=document.createElement('option');option.value=topic;option.textContent=topic;$('#'+id).appendChild(option)}
  });

  function renderTable(){
    const query=norm($('#search').value),topic=$('#topicFilter').value;
    const rows=DATA.filter(row=>(!topic||row[0]===topic)&&(!query||norm(row.join(' ')).includes(query)));
    $('#resultLine').textContent=`Hiển thị ${rows.length} / ${DATA.length} cụm từ`;
    if(!rows.length){$('#tbody').innerHTML='<tr><td colspan="5" class="empty">Không tìm thấy nội dung phù hợp.</td></tr>';return}
    const groups=[]; for(const row of rows){let group=groups.at(-1);if(!group||group.topic!==row[0]){group={topic:row[0],rows:[]};groups.push(group)}group.rows.push(row)}
    $('#tbody').innerHTML=groups.map((group,groupIndex)=>group.rows.map((row,rowIndex)=>`<tr>${rowIndex===0?`<td class="topic-cell" rowspan="${group.rows.length}"><span class="topic-num">Topic ${groupIndex+1}</span>${esc(group.topic)}</td>`:''}<td class="phrase-cell">${esc(row[1])}</td><td class="def-cell">${esc(row[2])}</td><td class="sent-cell">${esc(row[3])}</td><td class="trans-cell">${esc(row[4])}</td></tr>`).join('')).join('');
  }

  function cardRows(){const topic=$('#cardTopic').value,query=norm($('#cardSearch').value);return DATA.map((row,id)=>({row,id})).filter(({row})=>(!topic||row[0]===topic)&&(!query||norm(row.join(' ')).includes(query)))}
  function faceHTML(row,face){
    if(face===0)return `<div class="face-content"><span class="face-label">English collocation</span><h3 class="english-main">${esc(row[1])}</h3><p class="face-meta">${esc(row[0])}</p></div>`;
    if(face===1)return `<div class="face-content"><span class="face-label">Nghĩa tiếng Việt</span><h3>${esc(row[2])}</h3><p class="face-meta">${esc(row[1])}</p></div>`;
    if(face===2)return `<div class="face-content"><span class="face-label">Example sentence</span><h3 class="english-main">${esc(row[1])}</h3><p class="english-example">${esc(row[3])}</p></div>`;
    return `<div class="face-content"><span class="face-label">Bản dịch câu</span><h3>${esc(row[2])}</h3><p>${esc(row[4])}</p></div>`;
  }
  function renderCards(){
    const rows=cardRows();
    $('#flashGrid').innerHTML=rows.map(({row,id})=>{const face=state.faces[id]||0;return `<article class="flash-card" tabindex="0" role="button" data-card="${id}" aria-label="Lật thẻ ${esc(row[1])}"><div class="flash-top"><span class="flash-badge">C1–C2</span><span>Mặt ${face+1}/4</span></div>${faceHTML(row,face)}<div class="card-foot"><span>Nhấn để lật tiếp</span><span class="face-dots">${[0,1,2,3].map(n=>`<i class="${n<=face?'on':''}"></i>`).join('')}</span></div></article>`}).join('')||'<div class="empty">Không có flashcard phù hợp.</div>';
    const completed=rows.filter(({id})=>(state.faces[id]||0)===3).length;
    $('#cardProgress').textContent=`Đã xem đủ 4 mặt: ${completed}/${rows.length} collocations`;
  }
  function flipCard(id){state.faces[id]=((state.faces[id]||0)+1)%4;save();renderCards()}

  function setStudy(name){$$('.study-tab').forEach(button=>button.classList.toggle('active',button.dataset.study===name));$$('.study-panel').forEach(panel=>panel.classList.remove('active'));$(`#${name}Panel`).classList.add('active');if(name==='cards')renderCards();if(name==='quiz')updateResume()}

  function cloze(row){
    const phrase=row[1],sentence=row[3];let pattern=new RegExp(regexEsc(phrase).replace(/\\\s+/g,'\\s+'),'i'),match=sentence.match(pattern);
    if(!match){const words=phrase.split(/\s+/),first=words[0],last=words.at(-1);pattern=new RegExp(`\\b${regexEsc(first.slice(0,Math.max(4,first.length-2)))}[a-z]*\\b[\\s\\S]*?\\b${regexEsc(last)}[a-z]*\\b`,'i');match=sentence.match(pattern)}
    return {prompt:match?sentence.replace(pattern,'_____'):sentence,answer:match?match[0]:phrase,matched:Boolean(match)};
  }
  function activeMode(){if(mode!=='mixed')return mode;const choices=['vi-en','en-vi','sent-en-vi','sent-vi-en'];if(cloze(DATA[deck[index]]).matched)choices.push('cloze');return shuffle(choices)[0]}
  function target(row,currentMode){if(currentMode==='en-vi')return row[2];if(currentMode==='cloze')return cloze(row).answer;if(currentMode==='sent-en-vi')return row[4];if(currentMode==='sent-vi-en')return row[3];return row[1]}
  function prompt(row,currentMode){if(currentMode==='en-vi')return row[1];if(currentMode==='cloze')return cloze(row).prompt;if(currentMode==='sent-en-vi')return row[3];if(currentMode==='sent-vi-en')return row[4];return row[2]}
  function substantial(answer,targetValue,currentMode){if(norm(answer)===norm(targetValue))return true;const words=norm(answer).split(' ').filter(Boolean);return ['en-vi','sent-en-vi','sent-vi-en'].includes(currentMode)&&words.length>=4&&norm(targetValue).includes(norm(answer))}
  function snapshot(){state.session={deck,index,correct,wrong,mode,hints,elapsed,left,seconds:Number($('#qSeconds').value),currentMode:$('#quizPlay').dataset.mode||mode};save()}
  function createSession(resuming=false){
    const entries=deck.map(id=>({id:String(id)}));
    const initialState=resuming?{status:'active',kind:'quiz',mode,entryIds:entries.map(entry=>entry.id),index,prompt:null,answerState:{submitted:false,correct:null,assisted:false,revealed:false},attempts:Array.from({length:index},(_,attemptIndex)=>({entryId:entries[attemptIndex].id,correct:attemptIndex<correct,assisted:false})),ratings:{hard:0,good:0}}:null;
    learningSession=English101Learning.createLearningSession({entries,strategy:{createPrompt:entry=>({entryId:entry.id}),grade:value=>({correct:Boolean(value)})},mode,initialState});
    learningSession.start();
  }
  function stopTimer(){clearInterval(timer);timer=null}
  function tick(){stopTimer();$('#qTimer').textContent=`${Number($('#qSeconds').value)?left:elapsed} giây`;timer=setInterval(()=>{if(document.hidden||answered)return;elapsed++;if(Number($('#qSeconds').value)){left=Math.max(0,left-1);$('#qTimer').textContent=`${left} giây`;if(!left)grade(false,'','Hết giờ')}else $('#qTimer').textContent=`${elapsed} giây`;snapshot()},1000)}
  function renderQuestion(resume=false){
    answered=false;const row=DATA[deck[index]];if(!resume){hints=0;elapsed=0;left=Number($('#qSeconds').value);$('#quizPlay').dataset.mode=activeMode()}const currentMode=$('#quizPlay').dataset.mode;
    $('#qCounter').textContent=`Câu ${index+1}/${deck.length}`;$('#qScore').textContent=`Đúng độc lập: ${correct}`;$('#qProgress').style.width=`${index/deck.length*100}%`;$('#qPrompt').textContent=prompt(row,currentMode);$('#qHint').textContent=`${row[0]} · ${currentMode==='cloze'?'Điền đúng cụm trong ngữ cảnh':'Không mở gợi ý nếu bạn có thể tự nhớ'}`;$('#qHintArea').innerHTML='';$('#qAnswer').value='';$('#qAnswer').disabled=false;$('#qAnswer').placeholder=currentMode.includes('sent')?'Viết cả câu…':'Nhập câu trả lời…';$('#qFeedback').className='quiz-feedback';$('#qFeedback').innerHTML='';$('#qCheck').style.display='';$('#qShowHint').style.display='';$('#qUnknown').style.display='';$('#qNext').style.display='none';$('#qAnswer').focus();snapshot();tick();
  }
  function start(custom=null){const topic=$('#qTopic').value;mode=$('#qDirection').value;const pool=custom||DATA.map((_,id)=>id).filter(id=>(!topic||DATA[id][0]===topic)&&(mode!=='cloze'||cloze(DATA[id]).matched)),count=Math.min(Number($('#qCount').value),pool.length);deck=shuffle(pool).slice(0,count);if(!deck.length)return;index=0;correct=0;wrong=[];createSession();$('#quizSetup').style.display='none';$('#quizEnd').style.display='none';$('#quizPlay').style.display='block';renderQuestion()}
  function showHint(){if(answered)return;hints=Math.min(3,hints+1);const row=DATA[deck[index]],currentMode=$('#quizPlay').dataset.mode,targetValue=target(row,currentMode),letters=targetValue.split(' ').map(word=>word[0]+' _'.repeat(Math.max(0,word.length-1))).join('  ');$('#qHintArea').innerHTML=`<div class="hint-box"><b>Tầng ${hints}/3</b>${hints>=1?`<p>Chủ đề: ${esc(row[0])}</p>`:''}${hints>=2?`<p>Collocation: ${currentMode==='vi-en'?'(ẩn)':esc(row[1])} · Nghĩa: ${esc(row[2])}</p>`:''}${hints>=3?`<p>${esc(letters)}</p>`:''}<small>Lượt có gợi ý không tính điểm độc lập.</small></div>`;snapshot()}
  function grade(ok,raw='',message=''){if(answered)return;if(hints>0)learningSession.dispatch({type:'ASSIST'});const sessionSnapshot=learningSession.dispatch({type:'SUBMIT',answer:ok});answered=sessionSnapshot.answerState.submitted;correct=sessionSnapshot.progress.correct;stopTimer();const row=DATA[deck[index]],currentMode=$('#quizPlay').dataset.mode,targetValue=target(row,currentMode),assisted=hints>0;if(!ok&&!wrong.includes(deck[index]))wrong.push(deck[index]);$('#qAnswer').disabled=true;const cls=assisted?'neutral':ok?'good':'bad',label=message||(assisted?'Lượt luyện có gợi ý':ok?'✓ Đúng và tự nhớ được':'Cần ôn lại');$('#qFeedback').className=`quiz-feedback ${cls}`;$('#qFeedback').innerHTML=`<b>${esc(label)}</b>${raw&&!ok?`<p>Bạn viết: ${esc(raw)}</p>`:''}<p>Đáp án: <b>${esc(targetValue)}</b></p><div class="answer-context"><p>${esc(row[1])} — ${esc(row[2])}</p><p>${esc(row[3])}</p><small>${esc(row[4])}</small></div>`;$('#qCheck').style.display='none';$('#qShowHint').style.display='none';$('#qUnknown').style.display='none';$('#qNext').style.display='';$('#qScore').textContent=`Đúng độc lập: ${correct}`;snapshot();$('#qNext').focus()}
  function check(){const raw=$('#qAnswer').value.trim();if(!raw){$('#qAnswer').focus();return}const row=DATA[deck[index]],currentMode=$('#quizPlay').dataset.mode;grade(substantial(raw,target(row,currentMode),currentMode),raw)}
  function next(){const sessionSnapshot=learningSession.dispatch({type:'NEXT'});index=sessionSnapshot.index;if(sessionSnapshot.status==='completed'){finish();return}renderQuestion()}
  function finish(){stopTimer();if(learningSession)learningSession.dispatch({type:'FINISH'});const done=Math.min(deck.length,index+Number(answered)),percent=done?Math.round(correct/done*100):0;state.best=Math.max(state.best||0,percent);state.session=null;save();$('#quizPlay').style.display='none';$('#quizSetup').style.display='none';$('#quizEnd').style.display='block';$('#qFinalScore').textContent=`${correct}/${done}`;$('#qFinalText').textContent=`${wrong.length} mục cần ôn · Điểm tốt nhất ${state.best}%`;$('#qRetryWrong').style.display=wrong.length?'':'none'}
  function pause(){stopTimer();snapshot();$('#quizPlay').style.display='none';$('#quizSetup').style.display='block';updateResume()}
  function updateResume(){const old=$('#qResumeBox');if(!old)return;old.hidden=!state.session;if(state.session)$('#qResumeText').textContent=`Câu ${state.session.index+1}/${state.session.deck.length} · đúng ${state.session.correct}`}
  function resume(){const s=state.session;if(!s)return;({deck,index,correct,wrong,mode,hints,elapsed,left}=s);createSession(true);$('#qDirection').value=mode;$('#qSeconds').value=String(s.seconds||0);$('#quizPlay').dataset.mode=s.currentMode;$('#quizSetup').style.display='none';$('#quizEnd').style.display='none';$('#quizPlay').style.display='block';renderQuestion(true)}

  $('#search').addEventListener('input',renderTable);$('#topicFilter').addEventListener('change',renderTable);$('#cardTopic').addEventListener('change',renderCards);$('#cardSearch').addEventListener('input',renderCards);
  $('.study-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-study]');if(button)setStudy(button.dataset.study)});
  $('#flashGrid').addEventListener('click',event=>{const card=event.target.closest('[data-card]');if(card)flipCard(Number(card.dataset.card))});$('#flashGrid').addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){const card=event.target.closest('[data-card]');if(card){event.preventDefault();flipCard(Number(card.dataset.card))}}});
  $('.face-actions').addEventListener('click',event=>{const button=event.target.closest('[data-face]');if(!button)return;for(const {id} of cardRows())state.faces[id]=Number(button.dataset.face);save();renderCards()});
  $('#qStart').onclick=()=>start();$('#qCheck').onclick=check;$('#qNext').onclick=next;$('#qShowHint').onclick=showHint;$('#qUnknown').onclick=()=>grade(false);$('#qPause').onclick=pause;$('#qFinish').onclick=finish;$('#qAgain').onclick=()=>{$('#quizEnd').style.display='none';$('#quizSetup').style.display='block';updateResume()};$('#qRetryWrong').onclick=()=>start([...wrong]);
  English101Learning.createKeyboardDispatcher({getContext:()=>({active:Boolean(learningSession&&deck[index]!==undefined&&$('#quizPlay').style.display!=='none'),kind:'quiz',answered,emptyInput:!$('#qAnswer').value.trim()}),dispatch:action=>{if(action==='SUBMIT')check();else if(action==='NEXT')next()}}).attach();
  document.addEventListener('click',event=>{if(event.target.id==='qResume')resume();if(event.target.id==='qDiscard'){state.session=null;save();updateResume()}});
  EnglishPronunciation.register({getCurrentText:()=>deck[index]!==undefined?DATA[deck[index]]?.[1]:'',lang:'en-GB',rate:.86});
  renderTable();renderCards();updateResume();
})();
