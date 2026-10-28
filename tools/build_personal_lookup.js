const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const lookup = Object.create(null);
const loaders = {
  'vong-1-2': () => require('../data/vocabulary/vong-1-2.js'),
  'vong-3-4': () => require('../data/vocabulary/vong-3-4.js'),
  'vong-5-6': () => require('../data/vocabulary/vong-5-6.js'),
};
for (const name of Object.keys(loaders)) {
  global.window = {};
  loaders[name]();
  for (const item of global.window.ENGLISH101_VOCABULARY_DATASET.DATA) {
    const key = String(item.w || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
    if (!key || lookup[key]) continue;
    lookup[key] = { vi: item.vi || '', pos: item.pos || '', ipa: item.ipa || '', ex: item.ex || '', source: 'English101 Vocabulary Atlas' };
  }
}
fs.writeFileSync(path.join(root, 'data/vocabulary/personal-lookup.json'), JSON.stringify(lookup));
console.log(`Wrote ${Object.keys(lookup).length} lookup entries.`);
