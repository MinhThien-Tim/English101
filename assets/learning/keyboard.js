(function attachKeyboard(root, factory) {
  const exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Learning = Object.assign(root.English101Learning || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createKeyboardModule() {
  'use strict';

  function resolveKeyboardAction(context = {}) {
    const tagName = String(context.tagName || '').toUpperCase();
    if (!context.active || context.repeat || context.composing || context.dialogOpen) return null;
    if (tagName === 'TEXTAREA' || tagName === 'SELECT' || context.multiline) return null;

    // Arrows navigate the Activity; they never activate the focused control.
    if (context.key === 'ArrowLeft') return tagName === 'INPUT' ? null : 'PREVIOUS';
    if (context.key === 'ArrowRight') return tagName === 'INPUT' ? null : 'NEXT';

    // Every other key belongs to the control that has focus.
    if (tagName === 'A' || tagName === 'BUTTON' || context.interactive) return null;

    if (context.key === 'Escape') return 'CLOSE';
    if (context.key === 'Enter') {
      if (context.emptyInput && context.kind !== 'flashcard') return null;
      if (context.kind === 'flashcard') return context.revealed ? 'NEXT' : 'REVEAL';
      return context.answered ? 'NEXT' : 'SUBMIT';
    }
    if (context.key === ' ' && context.kind === 'flashcard') return context.revealed ? 'NEXT' : 'REVEAL';
    if (context.kind === 'flashcard' && context.revealed && context.key === '1') return 'RATE_HARD';
    if (context.kind === 'flashcard' && context.revealed && context.key === '2') return 'RATE_GOOD';
    if (context.kind !== 'flashcard' && !context.answered && /^[1-4]$/.test(context.key)) return `CHOICE_${context.key}`;
    return null;
  }

  function createKeyboardDispatcher({ getContext, dispatch, target = document }) {
    const handler = event => {
      const element = event.target;
      const action = resolveKeyboardAction({
        ...getContext(),
        key: event.key,
        repeat: event.repeat,
        composing: event.isComposing,
        tagName: element && element.tagName,
        multiline: Boolean(element && (element.matches('textarea,[contenteditable="true"]'))),
        interactive: Boolean(element && element.matches('button,a,select')),
      });
      if (!action) return;
      event.preventDefault();
      dispatch(action, event);
    };

    return {
      attach() { target.addEventListener('keydown', handler); },
      detach() { target.removeEventListener('keydown', handler); },
      handler,
    };
  }

  return { resolveKeyboardAction, createKeyboardDispatcher };
});
