const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const lookup = Object.create(null);
for (const name of ['vong-1-2', 'vong-3-4', 'vong-5-6']) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'data/vocabulary', name + '.js'), 'utf8'), sandbox);
  for (const item of sandbox.window.ENGLISH101_VOCABULARY_DATASET.DATA) {
    const key = String(item.w || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
    if (!key || lookup[key]) continue;
    lookup[key] = { vi: item.vi || '', pos: item.pos || '', ipa: item.ipa || '', ex: item.ex || '', source: 'English101 Vocabulary Atlas' };
  }
}
fs.writeFileSync(path.join(root, 'data/vocabulary/personal-lookup.json'), JSON.stringify(lookup));
console.log(`Wrote ${Object.keys(lookup).length} lookup entries.`);
