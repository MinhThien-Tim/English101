const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../..');
const expectations = {
  'vong-1-2': { entries: 1299, groups: 29, key: 'v12-atlas-v3' },
  'vong-3-4': { entries: 4205, groups: 36, key: 'v34-atlas-v3' },
  'vong-5-6': { entries: 1280, groups: 44, key: 'v56-atlas-v3' },
};

function loadDataset(set) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, `data/vocabulary/${set}.js`), 'utf8'), context);
  return context.window.ENGLISH101_VOCABULARY_DATASET;
}

for (const [set, expected] of Object.entries(expectations)) {
  test(`${set} keeps every Vocabulary Entry and stable storage key`, () => {
    const dataset = loadDataset(set);
    assert.equal(dataset.DATA.length, expected.entries);
    assert.equal(dataset.GROUPS.length, expected.groups);
    assert.equal(dataset.config.storageKey, expected.key);
    assert.equal(new Set(dataset.DATA.map(entry => entry.id)).size, dataset.DATA.length);
  });

  test(`${set} legacy URL redirects to the shared Lesson shell`, () => {
    const html = fs.readFileSync(path.join(root, `Vocabulary/${set}-vocabulary-complete-examples.html`), 'utf8');
    assert.match(html, new RegExp(`vocabulary-practice\\.html\\?set=${set}`));
  });
}

test('the shared Lesson shell loads one runtime and the platform modules', () => {
  const html = fs.readFileSync(path.join(root, 'Vocabulary/vocabulary-practice.html'), 'utf8');
  assert.match(html, /vocabulary-rounds-bootstrap\.js/);
  assert.match(html, /learning\/session\.js/);
  assert.match(html, /learning\/keyboard\.js/);
  assert.match(html, /learning\/persistence\.js/);

  const runtime = fs.readFileSync(path.join(root, 'assets/learning/vocabulary-rounds-app.js'), 'utf8');
  assert.doesNotMatch(runtime, /v12-atlas-v3|v34-atlas-v3|v56-atlas-v3/);
  assert.match(runtime, /createKeyboardDispatcher/);
  assert.match(runtime, /createPersistence/);
});
