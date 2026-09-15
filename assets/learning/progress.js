(function attachProgress(root, factory) {
  const exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Learning = Object.assign(root.English101Learning || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createProgressModule() {
  'use strict';

  function deriveProgress({ total = 0, attempts = [] } = {}) {
    const result = attempts.reduce((progress, attempt) => {
      progress.completed += 1;
      if (attempt.assisted) progress.assisted += 1;
      else if (attempt.correct) progress.correct += 1;
      else progress.incorrect += 1;
      return progress;
    }, { completed: 0, total: Math.max(0, total), correct: 0, incorrect: 0, assisted: 0, due: 0 });

    result.due = Math.max(0, result.total - result.completed);
    return result;
  }

  return { deriveProgress };
});
