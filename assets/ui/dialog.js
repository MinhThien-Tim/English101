(function attachDialog(root, factory) {
  const exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  root.English101Learning = Object.assign(root.English101Learning || {}, exports);
})(typeof globalThis !== 'undefined' ? globalThis : this, function createDialogModule() {
  'use strict';

  function createDialogController(dialog, { fullClass = 'full', onClose } = {}) {
    if (!dialog || typeof dialog.showModal !== 'function') throw new TypeError('A native dialog is required');
    let previousFocus = null;

    function open(trigger) {
      previousFocus = trigger || (typeof document !== 'undefined' ? document.activeElement : null);
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;
    }

    function close() {
      if (dialog.open) dialog.close();
    }

    function toggleFull() {
      dialog.classList.toggle(fullClass);
    }

    dialog.addEventListener('click', event => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener('close', () => {
      dialog.classList.remove(fullClass);
      if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === 'function') previousFocus.focus();
      if (onClose) onClose();
    });

    return { open, close, toggleFull };
  }

  return { createDialogController };
});
