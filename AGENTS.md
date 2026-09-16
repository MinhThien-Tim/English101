# English101 Agent Instructions

Use the lowest workflow level that can safely complete the request. Escalate only when a change crosses an architectural boundary. Do not turn a local edit into a repository-wide audit, refactor, or release task.

Read `CONTEXT.md` before changing product code, learning content, catalogue data, shared behavior, or architecture. For a documentation-only workflow edit, read only the relevant sections.

## Scope first

Classify the request before selecting tools or skills:

| Level | Use when | Required work |
| --- | --- | --- |
| L0 — Content | Meanings, examples, explanations, labels, answers, or lesson data only | Inspect the target file, edit, and validate syntax/data |
| L1 — Local | One page or one isolated module changes | Inspect the target and direct imports, implement, and smoke-test the affected behavior |
| L2 — Shared | Shared learning/UI code, common CSS, navigation, keyboard behavior, or storage changes | Search consumers, preserve compatibility, and test representative consumers |
| L3 — Architecture | Folder structure, shared APIs, schemas, large deduplication, or structural changes across 3+ modules | Perform impact analysis, plan migration, and run affected regression checks |
| L4 — Release | The user explicitly asks to commit, push, deploy, merge, bundle, or release | Validate the completed change, verify Git state and remote state, then perform only the requested release action |

L4 describes the delivery step and may follow L0–L3; it does not automatically promote the implementation to L3.

## Skill invocation policy

Default mode is `LOCAL-FIRST`.

- Invoke only skills whose trigger clearly matches the classified work.
- Do not run architecture, refactor, repository-wide analysis, multi-agent work, deep browser validation, or deployment checks for L0/L1 tasks.
- Use architecture/codebase-design workflows only for L3 work.
- Use visual-design workflows only for a redesign or a new visual system, not routine copy or spacing edits.
- Use testing workflows for shared deterministic logic, regressions, or an explicit testing request. A narrow local check is enough for isolated edits.
- Update documentation when the user asks for it or when an API, schema, architecture contract, or operating procedure changes.
- Use Git/release workflows only for an explicit L4 request.
- Use additional agents only when the user explicitly asks for them and the work has separable complex parts.

Installed project workflows live under `.agents/skills/` and are recorded in `skills-lock.json`. When a workflow is selected, follow its `SKILL.md`; do not load unrelated workflows.

## Working sequence

1. Identify the requested outcome and classify it L0–L4.
2. Inspect only the files and direct dependencies required at that level.
3. State compatibility surfaces only when the change can affect them.
4. Make the smallest coherent change that completes the request.
5. Run the level-appropriate validation below.
6. Review the scoped diff for content loss, unrelated rewrites, duplicated behavior, and stale paths.

For interactive work, completion means the requested behavior works and affected existing behavior remains intact. For content-only work, correct data and valid syntax are sufficient unless the user requests broader checks.

## Scope control

Classify issues discovered while working:

- Blocking the requested task: fix now.
- Regression caused by the current change: fix now.
- Existing unrelated issue: report it; do not modify it.
- Potential architectural improvement: record it as a recommendation; do not implement it without explicit scope.

Do not combine feature implementation with opportunistic architecture cleanup, CSS cleanup, migrations, or unrelated documentation.

## Project invariants

- Keep the site static and backend-free unless the user explicitly approves an architectural change.
- Preserve public Resource IDs, relative URLs, filenames, path casing, and storage keys unless the task includes a migration.
- Treat `data/documents.js` as the catalogue source of truth; register Resources there rather than hard-coding portal cards.
- Preserve learning content during UI or code refactors.
- Shared learning behavior belongs under `assets/learning/`; shared UI behavior belongs under `assets/ui/`.
- Keep a feature local while it has only one real consumer. Do not add an abstraction merely because it might become reusable.
- Reuse an existing shared implementation before creating another keyboard handler, progress store, normalizer, scorer, feedback renderer, flashcard engine, or modal.
- Do not migrate working pages unless the current task benefits from that migration.
- Prefer backward-compatible shared APIs. Never change saved progress or storage schemas silently.
- Keep credentials, tokens, personal data, generated caches, and machine-specific files out of commits.
- Repository-wide refactoring and deployment are never implicit.

## Implementation contracts

- Prefer semantic HTML, native controls, accessible names, and visible focus states.
- Escape catalogue-derived text before injecting it into HTML.
- Keep scripts compatible with static hosting. Do not add a build dependency for a local change without an explicit architecture decision.
- Extend existing visual tokens and topic accents before adding one-off colors; respect `prefers-reduced-motion`.
- Keep overlays dismissible and focus-safe, and restore scrolling after they close.
- Retain unaffected entries, examples, explanations, and answer keys during content/data edits.
- Preserve Vietnamese diacritics and UTF-8 encoding.
- When changing an answer, update its explanation and any derived duplicate in scope.

Follow the Enter-key and other interaction contracts in `CONTEXT.md` for affected Activities. A local Enter-key change must verify only the affected Activity; a shared handler change must verify representative consumers and guard against overlapping listeners.

## Validation by level

### L0

- Validate the edited HTML/JavaScript/data syntax.
- Check changed values and obvious references.

### L1

- Run L0 checks.
- Smoke-test the affected page/module, its primary interaction, and relevant console behavior.
- Check only affected viewport or keyboard states.

### L2

- Run L1 checks.
- Find all direct consumers of the shared surface.
- Test representative consumers and storage/API compatibility where relevant.

### L3

- Run L2 checks.
- Check repository-wide dependencies affected by the migration, link/navigation integrity, and backward compatibility.

### L4

- Run the validation required by the implementation level (L0–L3).
- Inspect `git diff --check`, `git status --short`, and the complete scoped diff.
- Before pushing, confirm the remote branch has not advanced unexpectedly.
- Commit only files within the requested scope. Never force-push unless the user explicitly requests and approves it.

Run a local static server only when browser behavior or routing changed:

```bash
python -m http.server 8000
```

If no automated check exists, report the exact manual scenarios tested rather than claiming full coverage.
