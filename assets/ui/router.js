(function attachRouter(root, factory) {
  const exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Learning = Object.assign(root.English101Learning || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createRouterModule() {
  'use strict';

  function readLearningRoute(input) {
    const url = new URL(input, 'https://english101.local');
    return {
      set: url.searchParams.get('set'),
      mode: url.searchParams.get('mode'),
      tab: url.searchParams.get('tab'),
    };
  }

  function writeLearningRoute(input, changes = {}) {
    const url = new URL(input, 'https://english101.local');
    for (const [key, value] of Object.entries(changes)) {
      if (value == null || value === '') url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    }
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function createLearningRouter({ location = window.location, history = window.history, onChange } = {}) {
    function current() { return readLearningRoute(location.href); }
    function update(changes, { replace = false } = {}) {
      const path = writeLearningRoute(location.href, changes);
      history[replace ? 'replaceState' : 'pushState']({}, '', path);
      if (onChange) onChange(current());
      return current();
    }
    return { current, update };
  }

  return { readLearningRoute, writeLearningRoute, createLearningRouter };
});
