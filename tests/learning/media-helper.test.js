const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  buildImageSearchUrl,
  buildVideoSearchUrl,
  buildContextSearchUrl,
  canShow,
  resolveMediaEntry,
} = require('../../assets/learning/media-helper.js');

test('resolves an explicit media query before the word', () => {
  assert.deepEqual(resolveMediaEntry({
    word: 'board',
    media: {query: 'board of directors business'},
  }), {
    word: 'board',
    query: 'board of directors business',
    imageQuery: 'board of directors business',
    videoQuery: 'board',
    contextQuery: 'board',
    type: null,
  });
});

test('falls back to the word and rejects disabled or empty entries', () => {
  assert.deepEqual(resolveMediaEntry({word: 'warehouse'}), {
    word: 'warehouse',
    query: 'warehouse',
    imageQuery: 'warehouse',
    videoQuery: 'warehouse',
    contextQuery: 'warehouse',
    type: null,
  });
  assert.equal(resolveMediaEntry({word: 'warehouse', media: false}), null);
  assert.equal(resolveMediaEntry({word: 'warehouse', media: {type: 'none'}}), null);
  assert.equal(resolveMediaEntry({word: '   '}), null);
  assert.equal(resolveMediaEntry({word: '', query: ''}), null);
  assert.equal(canShow({word: 'notwithstanding', media: {type: 'none'}}), false);
  assert.equal(canShow({word: '123'}), false);
});

test('derives a short image query while keeping YouGlish and Context on the word', () => {
  const entry = resolveMediaEntry({word: 'negotiate', topic: 'Salaries and Benefits', media: {type: 'action'}});
  assert.equal(entry.imageQuery, 'negotiate Salaries and Benefits');
  assert.equal(entry.videoQuery, 'negotiate');
  assert.equal(entry.contextQuery, 'negotiate');
  assert.equal(entry.type, 'action');
  assert.equal(buildContextSearchUrl(entry.contextQuery).searchParams.get('q'), 'negotiate');
  assert.equal(resolveMediaEntry({word: 'assemble', collocations: ['assemble a machine'], topic: 'Manufacturing'}).imageQuery, 'assemble a machine');
});

test('builds fixed-provider search URLs with safely encoded queries', () => {
  const cases = [
    ['R&D', 'R%26D'],
    ['rock & roll', 'rock+%26+roll'],
    ["children's", 'children%27s'],
    ['<script>alert(1)</script>', '%3Cscript%3Ealert%281%29%3C%2Fscript%3E'],
    ['a/b test', 'a%2Fb+test'],
    ['C++', 'C%2B%2B'],
  ];

  for (const [query, encoded] of cases) {
    const image = buildImageSearchUrl(query);
    const video = buildVideoSearchUrl(query);
    assert.equal(image.origin, 'https://www.google.com');
    assert.equal(image.pathname, '/search');
    assert.equal(image.searchParams.get('tbm'), 'isch');
    assert.equal(image.searchParams.get('q'), query);
    assert.match(image.href, new RegExp(encoded.replace(/[+]/g, '\\+')));
    assert.equal(video.origin, 'https://youglish.com');
    assert.equal(video.pathname, `/pronounce/${encodeURIComponent(query)}/english`);
  }
});

test('URL builders refuse empty queries', () => {
  assert.equal(buildImageSearchUrl('   '), null);
  assert.equal(buildVideoSearchUrl(null), null);
});

test('C1 and TOEIC load the shared helper and search by word from stable card identifiers', () => {
  const root = path.resolve(__dirname, '..', '..');
  const c1Html = fs.readFileSync(path.join(root, 'Vocabulary/c1-vocabulary.html'), 'utf8');
  const c1Runtime = fs.readFileSync(path.join(root, 'Vocabulary/c1-vocabulary.js'), 'utf8');
  const toeicHtml = fs.readFileSync(path.join(root, 'Vocabulary/toeic-600.html'), 'utf8');
  const toeicRuntime = fs.readFileSync(path.join(root, 'Vocabulary/toeic-600.js'), 'utf8');

  for (const html of [c1Html, toeicHtml]) {
    assert.match(html, /assets\/styles\/media-helper\.css/);
    assert.match(html, /assets\/learning\/media-helper\.js/);
  }
  assert.match(c1Runtime, /data-media-index=/);
  assert.match(c1Runtime, /English101Media\?\.open/);
  assert.match(toeicRuntime, /data-media-id=/);
  assert.match(toeicRuntime, /open\(\{word: entry\.word, media: true\}/);
  assert.match(toeicRuntime, /English101Media\?\.open/);
});

test('Vocabulary Rounds loads the same helper and resolves IDs in its shared renderer', () => {
  const root = path.resolve(__dirname, '..', '..');
  const shell = fs.readFileSync(path.join(root, 'Vocabulary/vocabulary-practice.html'), 'utf8');
  const runtime = fs.readFileSync(path.join(root, 'assets/learning/vocabulary-rounds-app.js'), 'utf8');
  assert.match(shell, /assets\/learning\/media-helper\.js/);
  assert.match(shell, /assets\/styles\/media-helper\.css/);
  assert.match(runtime, /data-media=/);
  assert.match(runtime, /BY\.get\(b\.dataset\.media\)/);
});

test('Atlas and Verb Lessons adopt the helper without adding a media dataset', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const relative of ['Vocabulary/vocabulary-atlas.html', 'Verb/english-verbs.html', 'Verb/phrasal-verbs.html']) {
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    assert.match(html, /assets\/learning\/media-helper\.js/, relative);
    assert.match(html, /assets\/styles\/media-helper\.css/, relative);
    assert.match(html, /English101Media\?\.open/, relative);
  }
});
