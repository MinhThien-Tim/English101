const test = require('node:test');
const assert = require('node:assert/strict');

const { createLearningSession } = require('../../assets/learning/session.js');

const entries = [
  { id: 'one', answer: 'alpha' },
  { id: 'two', answer: 'beta' },
];

const strategy = {
  createPrompt(entry) {
    return { text: entry.id };
  },
  grade(answer, entry) {
    return { correct: answer.trim().toLowerCase() === entry.answer };
  },
};

test('a quiz session exposes submit, feedback, then next through one interface', () => {
  const session = createLearningSession({ entries, strategy, mode: 'vi-en' });

  session.start();
  assert.equal(session.snapshot().currentEntry.id, 'one');

  session.dispatch({ type: 'SUBMIT', answer: 'ALPHA' });
  let snapshot = session.snapshot();
  assert.equal(snapshot.answerState.submitted, true);
  assert.equal(snapshot.answerState.correct, true);
  assert.deepEqual(snapshot.progress, {
    completed: 1,
    total: 2,
    correct: 1,
    incorrect: 0,
    assisted: 0,
    due: 1,
  });

  session.dispatch({ type: 'NEXT' });
  snapshot = session.snapshot();
  assert.equal(snapshot.currentEntry.id, 'two');
  assert.equal(snapshot.answerState.submitted, false);
});

test('an assisted answer is observable and does not count as an independent correct answer', () => {
  const session = createLearningSession({ entries, strategy });
  session.start();
  session.dispatch({ type: 'ASSIST' });
  session.dispatch({ type: 'SUBMIT', answer: 'alpha' });

  assert.deepEqual(session.snapshot().progress, {
    completed: 1,
    total: 2,
    correct: 0,
    incorrect: 0,
    assisted: 1,
    due: 1,
  });
});

test('a flashcard session reveals before rating and rating advances', () => {
  const session = createLearningSession({ entries, strategy, kind: 'flashcard' });
  session.start();
  session.dispatch({ type: 'REVEAL' });
  assert.equal(session.snapshot().answerState.revealed, true);

  session.dispatch({ type: 'RATE', value: 'hard' });
  const snapshot = session.snapshot();
  assert.equal(snapshot.currentEntry.id, 'two');
  assert.equal(snapshot.progress.completed, 1);
  assert.equal(snapshot.ratings.hard, 1);
});

test('a session can resume from a serializable snapshot', () => {
  const original = createLearningSession({ entries, strategy });
  original.start();
  original.dispatch({ type: 'SUBMIT', answer: 'wrong' });
  original.dispatch({ type: 'NEXT' });

  const resumed = createLearningSession({ entries, strategy, initialState: original.snapshot() });
  assert.equal(resumed.snapshot().currentEntry.id, 'two');
  assert.equal(resumed.snapshot().progress.incorrect, 1);
});

test('the latest wrong attempt can be reclassified as assisted', () => {
  const session = createLearningSession({ entries, strategy });
  session.start();
  session.dispatch({ type: 'SUBMIT', answer: 'wrong' });
  session.dispatch({ type: 'RECLASSIFY_ASSISTED' });

  assert.deepEqual(session.snapshot().progress, {
    completed: 1, total: 2, correct: 0, incorrect: 0, assisted: 1, due: 1,
  });
});

test('a completed snapshot remains completed when restored', () => {
  const session = createLearningSession({ entries: [entries[0]], strategy });
  session.start();
  session.dispatch({ type: 'SUBMIT', answer: 'alpha' });
  session.dispatch({ type: 'NEXT' });

  const restored = createLearningSession({ entries: [entries[0]], strategy, initialState: session.snapshot() });
  assert.equal(restored.snapshot().status, 'completed');
  assert.equal(restored.snapshot().currentEntry, null);
});
