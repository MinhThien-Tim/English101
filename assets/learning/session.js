(function attachSession(root, factory) {
  const progressModule = typeof module === 'object' && module.exports
    ? require('./progress.js')
    : root.English101Learning;
  const exports = factory(progressModule);
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Learning = Object.assign(root.English101Learning || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createSessionModule(progressModule) {
  'use strict';

  const { deriveProgress } = progressModule;

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function createLearningSession({ entries, strategy, mode = 'recognition', kind = 'quiz', initialState = null }) {
    if (!Array.isArray(entries) || entries.length === 0) throw new TypeError('entries must be a non-empty array');
    if (!strategy || typeof strategy.createPrompt !== 'function' || typeof strategy.grade !== 'function') {
      throw new TypeError('strategy must create prompts and grade attempts');
    }

    const byId = new Map(entries.map(entry => [entry.id, entry]));
    let state = initialState ? restore(initialState) : idleState();

    function idleState() {
      return {
        status: 'idle', kind, mode, entryIds: entries.map(entry => entry.id), index: 0,
        prompt: null, answerState: freshAnswerState(), attempts: [], ratings: { hard: 0, good: 0 },
      };
    }

    function freshAnswerState() {
      return { submitted: false, correct: null, assisted: false, revealed: false };
    }

    function restore(snapshot) {
      const entryIds = Array.isArray(snapshot.entryIds) ? snapshot.entryIds.filter(id => byId.has(id)) : entries.map(entry => entry.id);
      return {
        status: snapshot.status || 'active',
        kind: snapshot.kind || kind,
        mode: snapshot.mode || mode,
        entryIds: entryIds.length ? entryIds : entries.map(entry => entry.id),
        index: snapshot.status === 'completed'
          ? entryIds.length
          : Math.min(Math.max(0, Number(snapshot.index) || 0), Math.max(0, entryIds.length - 1)),
        prompt: clone(snapshot.prompt),
        answerState: { ...freshAnswerState(), ...(snapshot.answerState || {}) },
        attempts: Array.isArray(snapshot.attempts) ? clone(snapshot.attempts) : [],
        ratings: { hard: 0, good: 0, ...(snapshot.ratings || {}) },
      };
    }

    function currentEntry() {
      return byId.get(state.entryIds[state.index]) || null;
    }

    function makePrompt() {
      const entry = currentEntry();
      state.prompt = entry ? strategy.createPrompt(entry, { mode: state.mode, index: state.index }) : null;
      state.answerState = freshAnswerState();
    }

    function start(options = {}) {
      if (options.mode) state.mode = options.mode;
      if (options.kind) state.kind = options.kind;
      state.status = 'active';
      if (!state.prompt) makePrompt();
      return snapshot();
    }

    function advance(delta = 1) {
      const nextIndex = state.index + delta;
      if (nextIndex < 0) return;
      if (nextIndex >= state.entryIds.length) {
        state.status = 'completed';
        state.index = state.entryIds.length;
        state.prompt = null;
        state.answerState = freshAnswerState();
        return;
      }
      state.index = nextIndex;
      makePrompt();
    }

    function dispatch(action) {
      if (!action || typeof action.type !== 'string') throw new TypeError('action.type is required');
      if (action.type === 'START') return start(action);
      if (state.status !== 'active') return snapshot();

      switch (action.type) {
        case 'ASSIST':
          state.answerState.assisted = true;
          break;
        case 'REVEAL':
          state.answerState.revealed = true;
          state.answerState.assisted = true;
          break;
        case 'SUBMIT': {
          if (state.answerState.submitted) break;
          const result = strategy.grade(action.answer, currentEntry(), { mode: state.mode, prompt: clone(state.prompt) }) || {};
          state.answerState.submitted = true;
          state.answerState.correct = Boolean(result.correct);
          state.answerState.revealed = true;
          state.attempts.push({
            entryId: currentEntry().id,
            correct: Boolean(result.correct),
            assisted: state.answerState.assisted || Boolean(action.assisted),
            answer: action.answer,
          });
          if (result.explanation !== undefined) state.prompt.explanation = result.explanation;
          break;
        }
        case 'RATE': {
          if (state.kind !== 'flashcard' || !state.answerState.revealed) break;
          const value = action.value === 'good' ? 'good' : 'hard';
          state.ratings[value] += 1;
          state.attempts.push({ entryId: currentEntry().id, correct: value === 'good', assisted: false, rating: value });
          advance();
          break;
        }
        case 'RECLASSIFY_ASSISTED': {
          const latest = state.attempts[state.attempts.length - 1];
          if (latest && latest.entryId === currentEntry().id) {
            latest.assisted = true;
            state.answerState.assisted = true;
          }
          break;
        }
        case 'NEXT':
          if (state.kind === 'flashcard' ? state.answerState.revealed : state.answerState.submitted) advance();
          break;
        case 'PREVIOUS':
          advance(-1);
          break;
        case 'FINISH':
          state.status = 'completed';
          break;
        default:
          throw new Error(`Unknown learning action: ${action.type}`);
      }
      return snapshot();
    }

    function snapshot() {
      const publicState = clone(state);
      publicState.currentEntry = clone(currentEntry());
      publicState.total = state.entryIds.length;
      publicState.progress = deriveProgress({ total: state.entryIds.length, attempts: state.attempts });
      return publicState;
    }

    return { start, dispatch, snapshot };
  }

  return { createLearningSession };
});
