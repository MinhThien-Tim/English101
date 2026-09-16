# English101 Domain Context

## Product

English101 is a static, responsive English-learning portal for Vietnamese self-learners. It runs without a backend and must remain usable from a repository subpath, a static host, and a simple local web server.

The product favors:

- clear explanations with low cognitive load;
- active recall and language production, not recognition alone;
- comfortable long study sessions;
- reliable keyboard and mobile interactions;
- reusable learning behavior while preserving existing content and URLs.

## Repository shape

- `index.html`, `style.css`, and `script.js` implement the portal homepage.
- `viewer.html` and `viewer.js` open registered learning resources.
- `data/documents.js` is the source of truth for the portal catalogue.
- `Grammar/`, `Vocabulary/`, `Writing/`, `Verb/`, `Guide/`, and `Blog/` contain learning resources.
- `assets/` contains shared visual assets.
- `tools/` contains maintenance scripts.
- `.agents/skills/` contains the project-installed agent workflows.

Paths stored in the catalogue are relative. Preserve exact path casing because production hosts may be case-sensitive.

## Domain model

### Resource

A file or external link that the portal can open. A Resource is registered as one entry in `window.ENGLISH_101_DOCUMENTS`.

### Lesson

An interactive HTML Resource that teaches one coherent topic. A Lesson may contain several Activities and may be implemented as a standalone page.

### Activity

One learner action inside a Lesson, such as multiple choice, fill-in-the-blank, matching, flashcards, dictation, timed recall, sentence transformation, or free production.

### Prompt

The question, cue, sentence, or task shown in an Activity.

### Attempt

A learner response to a Prompt. An Attempt may be correct, partially correct, or incorrect and should receive useful feedback when the Activity supports checking.

### Feedback

The result shown after an Attempt. For a wrong answer, useful Feedback identifies the correct answer and explains the relevant rule, distinction, or evidence rather than displaying only a red state.

### Vocabulary Entry

A learnable word or phrase. Depending on the lesson, an Entry may contain a lemma, part of speech, Vietnamese meaning, English definition, pronunciation, sense, example, collocation, synonym, usage note, or recall state.

### Vocabulary Round

A named content group in the existing Vòng 1–6 collection. A Round identifies source content; it is not an Activity type or a progress level.

### Recall Pipeline

The standard path from passive recognition to independent use:

1. English → Vietnamese recognition
2. Vietnamese → English timed recall
3. Collocation recall
4. Vietnamese sentence → English
5. Sentence expansion
6. Free sentence

Keep these stages distinct when implementing or describing the pipeline. A later stage must require more production than an earlier one.

### Confusing Set

Two or more similar words contrasted by meaning, grammar, register, spelling, pronunciation, or collocation. Practice should make the decisive distinction explicit.

### Known / Learning

Learner-controlled recall states. `Known` means the learner currently considers an item retrievable; `Learning` means it should remain in review. These states are not permanent mastery claims.

### Featured Resource

A catalogue Resource with `featured: true`. Featured status controls homepage prominence; it does not define learning difficulty or quality.

## Catalogue contract

Each entry in `data/documents.js` has a stable, unique `id`, a valid `category`, a human-readable title and description, a supported `type`, and a reachable relative `path` or intentional external URL.

Current categories are `Vocabulary`, `Grammar`, `Writing`, `Verb`, `Guide`, and `Blog`. Update the catalogue rather than hard-coding a new resource card in `index.html`.

Treat public IDs and paths as compatibility surfaces:

- preserve an existing `id` because viewer links use `viewer.html?id=...`;
- preserve existing URLs unless a migration is explicitly requested;
- when moving a file, update every catalogue and internal reference in the same change;
- verify that the path names an actual file with matching case.

## Interaction contracts

### Enter key

Enter invokes the current primary action in an interactive Activity:

1. submit a non-empty answer;
2. reveal an answer when reveal is the explicit next action;
3. continue to the next Prompt only after the current result is visible.

Enter must not submit while the learner is composing text with an IME, activate when focus is on an unrelated control, or skip an unanswered Prompt. Multiline writing areas keep normal line-break behavior unless the interface clearly provides a different shortcut.

### Answer handling

Normalize only differences the Activity declares insignificant, such as surrounding whitespace or case. Preserve distinctions that are being tested, including spelling, word form, grammar, and required punctuation when relevant. Show the expected answer without silently rewriting learner input.

### Progress

Progress describes observable work such as attempted Prompts, correct Attempts, and learner-marked recall states. Persist progress locally when a lesson promises persistence. Use a shared progress abstraction when one exists; keep storage keys stable or migrate them deliberately.

### Accessibility

Interactive controls are keyboard reachable, have accessible names, expose state where relevant, and retain visible focus. Dynamic results use an appropriate live region without repeatedly interrupting the learner.

## Visual language

The portal uses calm backgrounds, strong text contrast, rounded cards, thin borders, and restrained motion. Topic accents remain distinct:

- Guide: blue
- Vocabulary: purple
- Grammar: green
- Listening and dictation: light blue
- Speaking: pink
- Writing: orange
- Verb and expression: yellow
- IELTS: red
- Documents: dark blue

Use the mapping as a semantic accent system, not as permission to reduce text contrast. Typical hover and selection transitions are 180–260 ms and should respect reduced-motion preferences.

Design mobile-first. Important content and controls must work at 360 px and 390 px widths without horizontal page overflow, clipped prompts, unreachable actions, or fixed elements covering content.

## Content principles

- Preserve educational content unless the task explicitly changes content.
- Prefer natural modern English and clear Vietnamese explanations.
- Keep examples varied, contextual, and close to real communication or exam use.
- Explain why an answer is wrong when the lesson promises correction.
- Distinguish a general rule from a memory aid and state meaningful exceptions.
- Avoid duplicate prompts and mechanically repeated passages in large exercise sets.
- Keep source attribution when adapting third-party material; do not invent provenance.

## Architecture direction

The current site contains both portal-level shared code and standalone lesson implementations. Evolve it by vertical slice rather than by a full rewrite. Repeated behavior is a candidate for a deep module with a small interface, especially:

- keyboard control;
- answer normalization and scoring;
- progress persistence;
- flashcards and status controls;
- feedback rendering;
- modal and enlarged-image behavior.

Preserve external behavior while extracting shared code. A new shared module should replace real duplication in the same change or an explicitly staged migration.

### Architecture invariants

1. Keep lesson data separate from duplicated UI logic when a shared dataset already exists.
2. Put shared learning behavior in `assets/learning/` and shared UI behavior in `assets/ui/`.
3. Keep behavior local until there is a second real consumer.
4. Do not introduce a framework or abstraction only because it could be reusable later.
5. Do not migrate an existing working Lesson unless the current request benefits from the migration.
6. Prefer backward-compatible changes to shared interfaces.
7. Preserve `localStorage` keys and saved learner progress, or provide an explicit migration.
8. Require explicit scope for repository-wide refactors, data-schema migrations, and directory restructuring.
9. Treat deployment, publishing, pushing, and bundling as explicit actions, never implied follow-up work.

### Change boundaries

Use the narrowest safe change boundary:

- Content-only changes stay within the target Resource and its directly derived data.
- Page-local behavior stays in the Lesson until reuse is demonstrated.
- Shared behavior changes include consumer discovery and representative regression checks.
- Architecture changes include an impact analysis and compatibility or migration plan.

An adjacent problem should be fixed immediately only when it blocks the requested outcome or is a regression introduced by the current change. Existing unrelated problems and possible architectural improvements should be reported separately.

## Shared vocabulary

Use the canonical terms `Resource`, `Lesson`, `Activity`, `Prompt`, `Attempt`, `Feedback`, `Vocabulary Entry`, `Vocabulary Round`, `Recall Pipeline`, `Confusing Set`, and `Known / Learning`. Avoid introducing near-synonyms such as `study item`, `lesson unit`, or `vocab card` when one of these terms already fits.
