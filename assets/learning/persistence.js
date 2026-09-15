(function attachPersistence(root, factory) {
  const exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Learning = Object.assign(root.English101Learning || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createPersistenceModule() {
  'use strict';

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function createPersistence({ storage, key, schema, migrations = {}, migrateLegacy }) {
    if (!storage || !key || !schema) throw new TypeError('storage, key and schema are required');

    function commit(state) {
      storage.setItem(key, JSON.stringify({ schema, state }));
      return state;
    }

    function load(fallback) {
      const raw = storage.getItem(key);
      if (!raw) return clone(fallback);

      try {
        const envelope = JSON.parse(raw);
        if (!envelope || typeof envelope !== 'object') throw new Error('Invalid envelope');
        if (!('state' in envelope)) {
          if (typeof migrateLegacy !== 'function') throw new Error('Invalid envelope');
          const migrated = migrateLegacy(envelope);
          commit(migrated);
          return migrated;
        }
        if (envelope.schema === schema) return envelope.state;

        const migrate = migrations[envelope.schema];
        if (typeof migrate !== 'function') return clone(fallback);
        const migrated = migrate(envelope.state);
        commit(migrated);
        return migrated;
      } catch (error) {
        storage.removeItem(key);
        return clone(fallback);
      }
    }

    function clear() {
      storage.removeItem(key);
    }

    function serialize(state) {
      return JSON.stringify({ schema, exportedAt: new Date().toISOString(), state }, null, 2);
    }

    function parse(text) {
      const envelope = JSON.parse(text);
      if (!envelope || envelope.schema !== schema || !('state' in envelope)) throw new Error('Unsupported progress file');
      return envelope.state;
    }

    return { load, commit, clear, serialize, parse };
  }

  return { createPersistence };
});
