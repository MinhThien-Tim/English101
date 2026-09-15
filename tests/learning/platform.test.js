const test = require('node:test');
const assert = require('node:assert/strict');

const { createPersistence } = require('../../assets/learning/persistence.js');
const { deriveProgress } = require('../../assets/learning/progress.js');
const { resolveKeyboardAction } = require('../../assets/learning/keyboard.js');
const { readLearningRoute, writeLearningRoute } = require('../../assets/ui/router.js');

function memoryStorage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
  };
}

test('persistence recovers from malformed JSON without throwing', () => {
  const storage = memoryStorage({ progress: '{broken' });
  const persistence = createPersistence({ storage, key: 'progress', schema: 'v1' });
  const fallback = { attempts: 0 };

  assert.deepEqual(persistence.load(fallback), fallback);
  assert.equal(storage.getItem('progress'), null);
});

test('persistence migrates an older envelope before returning state', () => {
  const storage = memoryStorage({ progress: JSON.stringify({ schema: 'v0', state: { attempts: 2 } }) });
  const persistence = createPersistence({
    storage,
    key: 'progress',
    schema: 'v1',
    migrations: { v0: state => ({ ...state, correct: 0 }) },
  });

  assert.deepEqual(persistence.load({}), { attempts: 2, correct: 0 });
  assert.equal(JSON.parse(storage.getItem('progress')).schema, 'v1');
});

test('persistence preserves a legacy raw state stored under the existing key', () => {
  const storage = memoryStorage({ progress: JSON.stringify({ attempts: 7 }) });
  const persistence = createPersistence({
    storage,
    key: 'progress',
    schema: 'v1',
    migrateLegacy: state => ({ ...state, correct: 0 }),
  });

  assert.deepEqual(persistence.load({}), { attempts: 7, correct: 0 });
  assert.equal(JSON.parse(storage.getItem('progress')).schema, 'v1');
});

test('progress is derived once from observable attempts', () => {
  assert.deepEqual(deriveProgress({
    total: 4,
    attempts: [
      { correct: true, assisted: false },
      { correct: true, assisted: true },
      { correct: false, assisted: false },
    ],
  }), { completed: 3, total: 4, correct: 1, incorrect: 1, assisted: 1, due: 1 });
});

test('keyboard maps Enter to the current primary action and respects guards', () => {
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, kind: 'quiz', answered: false }), 'SUBMIT');
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, kind: 'quiz', answered: true }), 'NEXT');
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, kind: 'flashcard', revealed: false }), 'REVEAL');
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, kind: 'flashcard', revealed: true }), 'NEXT');
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, tagName: 'TEXTAREA' }), null);
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, composing: true }), null);
  assert.equal(resolveKeyboardAction({ key: 'Enter', active: true, interactive: true }), null);
  assert.equal(resolveKeyboardAction({ key: '3', active: true, kind: 'quiz', answered: false }), 'CHOICE_3');
});

test('learning route preserves dataset and mode in the URL', () => {
  assert.deepEqual(readLearningRoute('https://example.test/Vocabulary/vocabulary-practice.html?set=vong-3-4&mode=vi-en'), {
    set: 'vong-3-4',
    mode: 'vi-en',
    tab: null,
  });
  assert.equal(
    writeLearningRoute('https://example.test/Vocabulary/vocabulary-practice.html?set=vong-1-2', { mode: 'cloze', tab: 'quiz' }),
    '/Vocabulary/vocabulary-practice.html?set=vong-1-2&mode=cloze&tab=quiz',
  );
});
