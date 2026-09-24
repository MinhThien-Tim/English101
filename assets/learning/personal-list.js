(function(root, factory) {
  const api = factory();
  root.English101Learning = Object.assign(root.English101Learning || {}, api);
  if (typeof module === 'object' && module.exports) module.exports = api;
})(globalThis, function() {
  'use strict';
  const key = word => word.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
  function parsePersonalList(text) {
    const rows = [], seen = new Set();
    let duplicates = 0;
    for (const line of String(text).split(/\r?\n|;/)) {
      for (const fragment of line.split(/,(?=\s*[A-Za-z][A-Za-z '-]*(?:,|$))/)) {
        const parts = fragment.split(/\t|\s+\|\s+|\s+[–—-]\s+/);
        const word = (parts.shift() || '').trim().replace(/\s+/g, ' ');
        if (!word || !/[A-Za-z]/.test(word)) continue;
        const id = key(word);
        if (seen.has(id)) { duplicates += 1; continue; }
        seen.add(id);
        rows.push({ word, meaning: parts.join(' ').trim() });
      }
    }
    return { rows, duplicates };
  }
  function makePersonalEntry(row, collectionId, id, lookup = {}) {
    const now = new Date().toISOString();
    const meaning = row.meaning || lookup.vi || '';
    return { id, lemma: row.word, surface: row.word, partOfSpeech: lookup.pos || null,
      ipa: lookup.ipa || null, meaningEn: '', meaningsVi: meaning ? [meaning] : [],
      lexicalUnit: null, context: { sentence: lookup.ex || '', selectedText: row.word },
      source: { title: lookup.source || 'Danh sách của tôi' }, collectionId, createdAt: now };
  }
  return { parsePersonalList, makePersonalEntry, personalWordKey: key };
});
