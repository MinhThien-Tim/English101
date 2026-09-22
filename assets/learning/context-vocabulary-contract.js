(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.English101Learning = Object.assign(root.English101Learning || {}, api);
})(globalThis, function() {
  'use strict';
  function normalizeVocabulary(input) {
    const fail = () => { throw new Error('Invalid vocabulary file. Export a fresh English101 JSON from Context Lens.'); };
    const text = v => typeof v === 'string';
    const nonempty = v => text(v) && v.trim().length > 0;
    const date = v => text(v) && Number.isFinite(Date.parse(v));
    if (!input || input.schema !== 'english101.context-vocabulary') fail();
    if (![1, 2].includes(input.version)) throw new Error('Unsupported vocabulary version. Supported: V1 and V2.');
    if (!Array.isArray(input.entries) || !date(input.exportedAt)) fail();
    const collections = new Map();
    if (input.version === 2) {
      if (!Array.isArray(input.collections)) fail();
      for (const c of input.collections) {
        if (!c || !nonempty(c.id) || !nonempty(c.title) || collections.has(c.id) || !Number.isFinite(c.createdAt) || !Number.isFinite(c.updatedAt)) fail();
        collections.set(c.id, { id: c.id, title: c.title, createdAt: c.createdAt, updatedAt: c.updatedAt });
      }
    }
    const ids = new Set();
    const entries = input.entries.map(e => {
      if (!e || !nonempty(e.id) || ids.has(e.id) || !nonempty(e.lemma) || !nonempty(e.surface) || !text(e.meaningEn) || !Array.isArray(e.meaningsVi) || !e.meaningsVi.every(text) || !date(e.createdAt)) fail();
      ids.add(e.id);
      for (const key of ['partOfSpeech', 'ipa', 'lexicalUnit']) if (e[key] !== null && !text(e[key])) fail();
      const source = e.source;
      if (!source || !text(input.version === 1 ? source.document : source.title)) fail();
      for (const key of ['documentId', 'author', 'type', 'url', 'location']) if (source[key] !== undefined && !text(source[key])) fail();
      if (source.page !== undefined && (!Number.isInteger(source.page) || source.page < 1)) fail();
      if (source.chapter !== undefined && !text(source.chapter) && !Number.isFinite(source.chapter)) fail();
      const context = input.version === 1 ? { sentence: e.sentence, selectedText: e.surface } : e.context;
      if (!context || !text(context.sentence) || !text(context.selectedText)) fail();
      const collectionId = input.version === 1 ? 'legacy:' + (source.documentId || source.document || 'saved') : e.collectionId;
      if (input.version === 1 && !collections.has(collectionId)) collections.set(collectionId, { id: collectionId, title: source.document || 'Saved vocabulary', createdAt: Date.parse(e.createdAt), updatedAt: Date.parse(e.createdAt) });
      if (!collections.has(collectionId)) fail();
      return { id: e.id, lemma: e.lemma, surface: e.surface, partOfSpeech: e.partOfSpeech, ipa: e.ipa, meaningEn: e.meaningEn, meaningsVi: e.meaningsVi.slice(), lexicalUnit: e.lexicalUnit, context: { sentence: context.sentence, selectedText: context.selectedText }, source: { title: source.title || source.document, ...Object.fromEntries(['documentId','author','type','url','location','page','chapter'].filter(k => source[k] !== undefined).map(k => [k, source[k]])) }, collectionId, createdAt: e.createdAt };
    });
    return { collections: [...collections.values()], entries };
  }
  function exportVocabulary(data) { return { schema: 'english101.context-vocabulary', version: 2, exportedAt: new Date().toISOString(), collections: data.collections, entries: data.entries }; }
  function personalPrompt(entry, { mode }) {
    const answer = entry.lexicalUnit || entry.lemma;
    if (mode === 'vi-en') return { front: entry.meaningsVi.join(' · ') || entry.meaningEn, back: answer };
    if (mode === 'cloze') {
      const sentence = entry.context.sentence, surface = entry.surface;
      const start = sentence.indexOf(surface);
      const letter = ch => /[\p{L}\p{N}_]/u.test(ch || '');
      if (surface && start >= 0 && sentence.indexOf(surface, start + surface.length) < 0 && !letter(sentence[start - 1]) && !letter(sentence[start + surface.length])) return { front: sentence.slice(0, start) + '______' + sentence.slice(start + surface.length), back: surface };
    }
    return { front: entry.lemma, back: entry.meaningsVi.join(' · ') || entry.meaningEn };
  }
  return { normalizeVocabulary, exportVocabulary, personalPrompt };
});
