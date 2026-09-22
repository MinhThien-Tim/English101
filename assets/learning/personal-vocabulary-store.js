(function(root) {
  'use strict';
  function openPersonalVocabulary(name = 'english101-learning') {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        for (const store of ['collections', 'entries', 'progress', 'settings']) db.createObjectStore(store, { keyPath: 'id' });
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('Close other Personal Flashcards tabs and try again.'));
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        function transaction(stores, work) {
          return new Promise((done, fail) => {
            const tx = db.transaction(stores, 'readwrite');
            tx.oncomplete = () => done(); tx.onabort = () => fail(tx.error || new Error('Storage update failed.'));
            try { work(tx); } catch (error) { tx.abort(); fail(error); }
          });
        }
        function all(store) { return new Promise((done, fail) => { const r = db.transaction(store).objectStore(store).getAll(); r.onsuccess = () => done(r.result); r.onerror = () => fail(r.error); }); }
        resolve({
          close: () => db.close(),
          async read() { const [collections, entries, progress] = await Promise.all(['collections','entries','progress'].map(all)); return { collections, entries, progress }; },
          import(data) { return transaction(['collections','entries'], tx => {
            for (const c of data.collections) { const store = tx.objectStore('collections'); const r = store.get(c.id); r.onsuccess = () => { if (!r.result) store.put(c); }; }
            for (const e of data.entries) { const store = tx.objectStore('entries'); const r = store.get(e.id); r.onsuccess = () => { if (!r.result) store.put(e); }; }
          }); },
          rename(id, title) { return transaction(['collections'], tx => { const store = tx.objectStore('collections'); const r = store.get(id); r.onsuccess = () => { if (r.result) store.put({ ...r.result, title, updatedAt: Date.now() }); }; }); },
          rate(id, state) { if (!['new','learning','known'].includes(state)) return Promise.reject(new Error('Invalid state')); return transaction(['progress'], tx => tx.objectStore('progress').put({ id, state, updatedAt: Date.now() })); },
          deleteCard(id) { return transaction(['entries','progress'], tx => { tx.objectStore('entries').delete(id); tx.objectStore('progress').delete(id); }); },
          deleteCollection(id) { return transaction(['collections','entries','progress'], tx => {
            tx.objectStore('collections').delete(id);
            const r = tx.objectStore('entries').openCursor();
            r.onsuccess = () => { const cursor = r.result; if (!cursor) return; if (cursor.value.collectionId === id) { tx.objectStore('progress').delete(cursor.value.id); cursor.delete(); } cursor.continue(); };
          }); }
        });
      };
    });
  }
  root.English101Learning = Object.assign(root.English101Learning || {}, { openPersonalVocabulary });
  if (typeof module === 'object' && module.exports) module.exports = { openPersonalVocabulary };
})(globalThis);
