# English101 Agent Instructions

Read `CONTEXT.md` before changing product code, learning content, catalogue data, or interaction behavior. Use its canonical domain terms in specs, issues, code, and tests.

## Working sequence

1. Inspect the requested files, their callers, and related shared code.
2. State the behavior and compatibility surfaces that must remain stable.
3. Make the smallest coherent change that completes the request.
4. Validate syntax, links, interaction states, and affected viewport sizes.
5. Review the diff for content loss, unrelated rewrites, duplicated behavior, and stale paths.

Completion means the requested behavior works, affected existing behavior still works, and the checks performed are reported. Passing syntax alone is not completion for an interactive change.

## Project invariants

- Keep the site static and backend-free unless the user explicitly approves an architectural change.
- Preserve public Resource IDs, relative URLs, filenames, and storage keys unless the task includes a migration.
- Treat `data/documents.js` as the catalogue source of truth; register resources there rather than hard-coding portal cards.
- Match directory and filename casing exactly.
- Preserve learning content during UI or code refactors.
- Reuse an existing shared implementation before adding another keyboard handler, progress store, normalizer, scorer, feedback renderer, flashcard engine, or modal.
- Keep credentials, tokens, personal data, generated caches, and machine-specific files out of commits.

## Change routing

Use the installed workflow that matches the work:

- Bug with unclear cause: `diagnosing-bugs` → reproduce → regression check → fix → `code-review`.
- Clear, small feature: `to-spec` when acceptance criteria need recording → `implement` → `code-review`.
- Feature with unresolved product choices: `grill-with-docs` → `to-spec` → `implement` → `code-review`.
- Uncertain visual direction: `grill-with-docs` → `prototype` → user selection → `to-spec` → `implement`.
- Large change: `to-spec` → `to-tickets` → implement one vertical slice at a time.
- Architecture work: `improve-codebase-architecture` → choose one candidate → `codebase-design` → specification and tickets.
- Session ending with unfinished work: `handoff`.

Use `tdd` for deterministic logic such as answer normalization, scoring, filtering, duplicate detection, progress calculations, storage migrations, and keyboard state transitions. Use browser and viewport checks for visual behavior.

## HTML, CSS, and JavaScript

- Prefer semantic HTML and native controls.
- Give every control an accessible name and visible focus state.
- Escape catalogue-derived text before injecting it into HTML.
- Keep scripts compatible with direct static hosting; do not add a build dependency for a local change without an explicit architectural decision.
- Put reusable behavior behind a small interface. Keep lesson-specific data and copy near the Lesson.
- Extend the existing visual tokens and topic accents before adding one-off colors.
- Respect `prefers-reduced-motion` for non-essential animation.
- Keep overlays dismissible, focus-safe, and unable to trap the page in a non-scrollable state.

## Keyboard contract

Follow the Enter-key contract in `CONTEXT.md`. In every affected Activity, verify the sequence `submit/reveal → result → next`, IME composition, focused buttons/links, empty input, and multiline text behavior. Keyboard shortcuts must not fire twice through overlapping local and shared listeners.

## Mobile contract

For significant UI changes, check at least 360 px, 390 px, a tablet width, and a desktop width. Verify the top, middle, and bottom of long Lessons. Completion requires no horizontal page overflow, clipped learning content, covered controls, broken sticky elements, or scroll lock left behind after closing an overlay.

## Content and data edits

- Retain all unaffected entries, examples, explanations, and answer keys.
- Validate every changed catalogue `id`, `category`, `type`, and `path`.
- Search for duplicate IDs and missing target files after catalogue changes.
- Keep Vietnamese diacritics and UTF-8 encoding intact.
- When changing an answer, update its explanation and every duplicate or aggregate derived from the same source.
- Run the relevant script in `tools/` when its name and contents show that it owns the affected generated or synchronized files; review the resulting diff before commit.

## Validation

Run a local static server from the repository root when browser behavior or routing changes:

```bash
python -m http.server 8000
```

Then test the affected path through `http://localhost:8000/`. Also perform the narrowest relevant checks available in the repository. If no automated check exists, record the manual scenarios tested rather than claiming full coverage.

Before committing, inspect `git diff --check`, `git status --short`, and the complete diff. Commit only files within the requested scope. Push only after the local commit succeeds and the remote branch has not advanced unexpectedly.

## Agent skills

Project workflows are installed under `.agents/skills/` and recorded in `skills-lock.json`. Invoke only the skills relevant to the current task; follow each selected `SKILL.md` completely. `CONTEXT.md` is the single-context domain reference for this repository.
