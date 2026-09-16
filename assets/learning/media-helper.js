(function attachMediaHelper(root, factory) {
  const exports = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = exports;
  if (root && root.document) root.English101Media = exports;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createMediaHelper(root) {
  'use strict';

  const PANEL_ID = 'english101-media-panel';
  const MOBILE_BREAKPOINT = 640;
  let elements = null;
  let activeTrigger = null;
  let activeMode = null;
  let previousBodyOverflow = '';
  let removalObserver = null;

  function cleanText(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function resolveMediaEntry(entry) {
    if (!entry || typeof entry !== 'object') return null;
    if (entry.media === false || (entry.media && typeof entry.media === 'object' && entry.media.type === 'none')) return null;
    const word = cleanText(entry.word);
    const mediaQuery = entry.media && typeof entry.media === 'object' ? cleanText(entry.media.query) : '';
    const query = cleanText(entry.query) || mediaQuery || word;
    if (!query) return null;
    return {word: word || query, query};
  }

  function buildImageSearchUrl(query) {
    const value = cleanText(query);
    if (!value) return null;
    const url = new URL('https://www.google.com/search');
    url.searchParams.set('tbm', 'isch');
    url.searchParams.set('q', value);
    return url;
  }

  function buildVideoSearchUrl(query) {
    const value = cleanText(query);
    if (!value) return null;
    const url = new URL('https://youglish.com/');
    url.pathname = `/pronounce/${encodeURIComponent(value)}/english`;
    return url;
  }

  function createAction(document, className, label) {
    const link = document.createElement('a');
    link.className = className;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    return link;
  }

  function ensureElements() {
    if (elements || !root.document?.body) return elements;
    const document = root.document;
    const layer = document.createElement('div');
    layer.className = 'media-helper-layer';
    layer.hidden = true;

    const backdrop = document.createElement('div');
    backdrop.className = 'media-helper-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    const panel = document.createElement('section');
    panel.id = PANEL_ID;
    panel.className = 'media-helper-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'english101-media-title');

    const header = document.createElement('header');
    header.className = 'media-helper-header';
    const title = document.createElement('h2');
    title.id = 'english101-media-title';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'media-helper-close';
    closeButton.setAttribute('aria-label', 'Close media helper');
    closeButton.textContent = '×';
    header.append(title, closeButton);

    const queryLabel = document.createElement('p');
    queryLabel.className = 'media-helper-query-label';
    queryLabel.textContent = 'Search';
    const queryPreview = document.createElement('p');
    queryPreview.className = 'media-helper-query';

    const actions = document.createElement('nav');
    actions.className = 'media-helper-actions';
    actions.setAttribute('aria-label', 'Media search options');
    const imageLink = createAction(document, 'media-helper-action', 'Images');
    const videoLink = createAction(document, 'media-helper-action', 'Videos');
    actions.append(imageLink, videoLink);
    panel.append(header, queryLabel, queryPreview, actions);
    layer.append(backdrop, panel);
    document.body.append(layer);

    closeButton.addEventListener('click', () => close());
    backdrop.addEventListener('click', () => close());
    for (const link of [imageLink, videoLink]) link.addEventListener('click', () => close());
    panel.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
    });

    elements = {layer, backdrop, panel, title, closeButton, queryPreview, imageLink, videoLink};
    document.addEventListener('pointerdown', handleOutsidePointer, true);
    document.addEventListener('keydown', handleDocumentKeydown, true);
    root.addEventListener('resize', handleResize);
    return elements;
  }

  function isMobile() {
    return root.innerWidth <= MOBILE_BREAKPOINT;
  }

  function schedule(callback) {
    if (typeof root.requestAnimationFrame === 'function') root.requestAnimationFrame(callback);
    else root.setTimeout(callback, 0);
  }

  function setTriggerState(trigger, expanded) {
    if (!trigger || typeof trigger.setAttribute !== 'function') return;
    trigger.setAttribute('aria-expanded', String(expanded));
    if (expanded) trigger.setAttribute('aria-controls', PANEL_ID);
  }

  function positionPopover() {
    if (!elements || activeMode !== 'desktop' || !activeTrigger?.isConnected) return;
    const rect = activeTrigger.getBoundingClientRect();
    const panel = elements.panel;
    const gap = 10;
    const margin = 12;
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const left = Math.min(Math.max(margin, rect.right - width), root.innerWidth - width - margin);
    const below = rect.bottom + gap;
    const top = below + height <= root.innerHeight - margin
      ? below
      : Math.max(margin, rect.top - height - gap);
    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(top)}px`;
  }

  function observeTrigger() {
    removalObserver?.disconnect();
    if (!root.MutationObserver || !root.document?.body) return;
    removalObserver = new root.MutationObserver(() => {
      if (activeTrigger && !activeTrigger.isConnected) close({restoreFocus: false});
    });
    removalObserver.observe(root.document.body, {childList: true, subtree: true});
  }

  function open(entry, options = {}) {
    const resolved = resolveMediaEntry(entry);
    const trigger = options.trigger || root.document?.activeElement || null;
    if (!resolved || !root.document?.body) return false;
    if (elements && !elements.layer.hidden && trigger && trigger === activeTrigger) {
      close();
      return false;
    }

    if (elements && !elements.layer.hidden) close({restoreFocus: false});
    const view = ensureElements();
    if (!view) return false;
    const imageUrl = buildImageSearchUrl(resolved.query);
    const videoUrl = buildVideoSearchUrl(resolved.query);
    if (!imageUrl || !videoUrl) return false;

    activeTrigger = trigger;
    activeMode = isMobile() ? 'mobile' : 'desktop';
    view.title.textContent = `Explore “${resolved.word}”`;
    view.queryPreview.textContent = resolved.query;
    view.imageLink.href = imageUrl.href;
    view.videoLink.href = videoUrl.href;
    view.layer.hidden = false;
    view.layer.classList.toggle('is-sheet', activeMode === 'mobile');
    view.layer.classList.toggle('is-popover', activeMode === 'desktop');
    view.panel.setAttribute('aria-modal', activeMode === 'mobile' ? 'true' : 'false');
    setTriggerState(activeTrigger, true);

    if (activeMode === 'mobile') {
      previousBodyOverflow = root.document.body.style.overflow;
      root.document.body.style.overflow = 'hidden';
      schedule(() => view.closeButton.focus());
    } else {
      schedule(positionPopover);
    }
    observeTrigger();
    return true;
  }

  function close(options = {}) {
    if (!elements || elements.layer.hidden) return false;
    const restoreFocus = options.restoreFocus !== false;
    const trigger = activeTrigger;
    elements.layer.hidden = true;
    elements.layer.classList.remove('is-sheet', 'is-popover');
    elements.panel.style.left = '';
    elements.panel.style.top = '';
    if (activeMode === 'mobile') root.document.body.style.overflow = previousBodyOverflow;
    setTriggerState(trigger, false);
    activeTrigger = null;
    activeMode = null;
    removalObserver?.disconnect();
    if (restoreFocus && trigger?.isConnected && typeof trigger.focus === 'function') trigger.focus();
    return true;
  }

  function handleOutsidePointer(event) {
    if (!elements || elements.layer.hidden || activeMode !== 'desktop') return;
    if (elements.panel.contains(event.target) || activeTrigger?.contains(event.target)) return;
    close({restoreFocus: false});
  }

  function focusableElements() {
    if (!elements) return [];
    return [...elements.panel.querySelectorAll('a[href],button:not([disabled])')];
  }

  function handleDocumentKeydown(event) {
    if (!elements || elements.layer.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== 'Tab' || activeMode !== 'mobile') return;
    const focusable = focusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && root.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && root.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleResize() {
    if (!elements || elements.layer.hidden) return;
    const nextMode = isMobile() ? 'mobile' : 'desktop';
    if (nextMode !== activeMode) close();
    else if (activeMode === 'desktop') positionPopover();
  }

  return {open, close, buildImageSearchUrl, buildVideoSearchUrl, resolveMediaEntry};
});
