(function(root, factory) {
  'use strict';
  const api = factory();
  root.English101Learning = Object.assign(root.English101Learning || {}, api);
  if (typeof module === 'object' && module.exports) module.exports = api;
})(globalThis, function() {
  'use strict';
  const DATABASE_VERSION = 2;
  function importSignature(data, metadata = {}) {
    return JSON.stringify({ schema: metadata.schema || 'english101.context-vocabulary', version: Number(metadata.version) || 2, collectionIds: data.collections.map(item => item.id).sort(), entryIds: data.entries.map(item => item.id).sort() });
  }
  async function fingerprintVocabulary(data, metadata = {}) {
    const signature = importSignature(data, metadata);
    if (globalThis.crypto?.subtle && typeof TextEncoder !== 'undefined') {
      const bytes = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(signature));
      return 'sha256:' + [...new Uint8Array(bytes)].map(value => value.toString(16).padStart(2, '0')).join('');
    }
    let hash = 2166136261;
    for (let index = 0; index < signature.length; index += 1) { hash ^= signature.charCodeAt(index); hash = Math.imul(hash, 16777619); }
    return 'fnv1a:' + (hash >>> 0).toString(16).padStart(8, '0');
  }
  function openPersonalVocabulary(name = 'english101-learning') {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, DATABASE_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        for (const store of ['collections', 'entries', 'progress', 'settings', 'imports']) if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, { keyPath: 'id' });
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('Close other Personal Flashcards tabs and try again.'));
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        function transaction(stores, work) { return new Promise((done, fail) => { const tx = db.transaction(stores, 'readwrite'); tx.oncomplete = () => done(); tx.onerror = () => fail(tx.error || new Error('Storage update failed.')); tx.onabort = () => fail(tx.error || new Error('Storage update failed.')); try { work(tx); } catch (error) { tx.abort(); fail(error); } }); }
        function all(store) { return new Promise((done, fail) => { const result = db.transaction(store).objectStore(store).getAll(); result.onsuccess = () => done(result.result); result.onerror = () => fail(result.error); }); }
        resolve({
          close: () => db.close(),
          async read() { const [collections, entries, progress, imports] = await Promise.all(['collections','entries','progress','imports'].map(all)); return { collections, entries, progress, imports }; },
          import(data, record) { return transaction(['collections','entries','imports'], tx => {
            const collectionStore = tx.objectStore('collections');
            for (const collection of data.collections) { const result = collectionStore.get(collection.id); result.onsuccess = () => { if (!result.result) collectionStore.put(collection); }; }
            const entryStore = tx.objectStore('entries');
            for (const entry of data.entries) { const result = entryStore.get(entry.id); result.onsuccess = () => { if (!result.result) entryStore.put(entry); }; }
            if (record) tx.objectStore('imports').put(record);
          }); },
          rename(id, title) { return transaction(['collections'], tx => { const store = tx.objectStore('collections'); const result = store.get(id); result.onsuccess = () => { if (result.result) store.put({ ...result.result, title, updatedAt: Date.now(), locallyRenamed: true }); }; }); },
          rate(id, state) { if (!['new','learning','known'].includes(state)) return Promise.reject(new Error('Invalid state')); return transaction(['progress'], tx => tx.objectStore('progress').put({ id, state, updatedAt: Date.now() })); },
          deleteCard(id) { return transaction(['entries','progress'], tx => { tx.objectStore('entries').delete(id); tx.objectStore('progress').delete(id); }); },
          deleteCollection(id) { return transaction(['collections','entries','progress'], tx => { tx.objectStore('collections').delete(id); const request = tx.objectStore('entries').openCursor(); request.onsuccess = () => { const cursor = request.result; if (!cursor) return; if (cursor.value.collectionId === id) { tx.objectStore('progress').delete(cursor.value.id); cursor.delete(); } cursor.continue(); }; }); },
        });
      };
    });
  }
  return { DATABASE_VERSION, importSignature, fingerprintVocabulary, openPersonalVocabulary };
});
