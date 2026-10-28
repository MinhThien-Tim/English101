# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: the site owner, a Vietnamese self-learner of English who uses English101 as a personal study library across general grammar and vocabulary, TOEIC 600, IELTS C1–C2, writing, and verbs. Study happens in a desktop or mobile browser, often in longer sessions that mix reading explanations, doing interactive Activities, and reviewing saved vocabulary.

The site is publicly reachable on GitHub Pages, so other Vietnamese self-learners can use it, but the product is optimized for one learner at a time. There are no accounts, roles, classrooms, or shared progress.

## Product Purpose

English101 gives one learner a calm, free, backend-free place to open a lesson and practise English immediately in the browser. It combines a catalogue of learning Resources with interactive Activities, feedback, and device-local progress.

Success means the owner returns to the library regularly, completes practice rather than only reading, retains vocabulary through review, and can find any Resource in a few seconds. Success is personal study progress, not audience growth, engagement metrics, or monetization.

## Positioning

English101 is a curated personal English-study environment where practice is embedded in the lessons themselves: most Resources are interactive HTML Activities with checking, explanations, and local progress, not a static PDF shelf. It is free, needs no login, and runs as static files from a repository subpath.

A general document portal could copy the library format but not the specific practice-first lesson set and local recall workflow; a commercial course platform could copy the exercises but not the no-account, own-your-device-data model.

## Operating Context

- The owner works in a browser on desktop and on mobile at 360–390 px widths, often for extended study sessions.
- The site is served from GitHub Pages under a repository subpath or from a local server such as `python -m http.server 8000`; paths must stay relative.
- `data/documents.js` is the catalogue the portal reads; a Resource is opened through `viewer.html?id=...`.
- Lessons are standalone HTML pages with their own CSS and JavaScript, supplemented by shared modules under `assets/learning/` and `assets/ui/`.
- Personal Flashcards imports an English101 JSON export from Context Lens and stores collections, entries, progress, and settings in the `english101-learning` IndexedDB database.
- Maintenance scripts under `tools/` regenerate derived vocabulary data; validation runs with `node --test tests/learning/*.test.js tests/catalogue.test.js`.
- Content is bilingual by design: Vietnamese interface copy and explanations around English learning material. Diacritics and UTF-8 must be preserved.

## Capabilities and Constraints

Capabilities:

- 29 registered Resources across six categories — Vocabulary, Grammar, Writing, Verb, Guide, and Blog — in HTML, PDF, and Article formats.
- Search, topic filtering, featured picks, a blog section, and a quick lesson index on the homepage.
- Interactive lesson types including multiple choice, fill-in-the-blank, matching, flashcards, dictation, timed recall, sentence transformation, and free production.
- Local progress and Known / Learning recall states, with shared abstractions for keyboard control, persistence, and feedback where a second consumer exists.
- Personal Flashcards with import, study in EN/VI and VI/EN, conservative context cloze, and JSON export.

Constraints:

- Static, backend-free, no build step and no framework; vanilla HTML, CSS, and JavaScript compatible with static hosting.
- No account system, cloud sync, server API, AI flashcards, SRS scheduling, or cross-origin database access.
- Public Resource IDs, relative URLs, filenames, path casing, and storage keys are compatibility surfaces and must not change silently.
- The catalogue is the source of truth; new Resources are registered there rather than hard-coded as portal cards.
- New shared modules must replace real duplication and preserve external behavior; repository-wide refactors and schema migrations require explicit scope.
- Mobile-first layout must avoid horizontal overflow, clipped Prompts, unreachable actions, and fixed elements covering content at 360 px and 390 px.

Undecided:

- No formal accessibility conformance target (for example WCAG 2.2 AA) has been recorded.
- No analytics, audience targets, or public contribution workflow are defined.

## Brand Commitments

- Name: English 101; tagline: "Learn with clarity".
- Voice: calm, direct, encouraging, low-hype; Vietnamese for guidance and explanation, English for target-language content.
- Product promises already made in the interface and README: free, no login, no ads, no unnecessary steps, progress stored on the device.
- Brand mark "E101" and the existing favicon and logo assets are established identity; preserve them unless a redesign is explicitly requested.
- Topic names and the six-category structure are established vocabulary.

## Evidence on Hand

- `data/documents.js` — 29 real catalogue entries with titles, descriptions, paths, and featured flags.
- `Grammar/`, `Vocabulary/`, `Writing/`, `Verb/`, `Guide/`, `Blog/` — real lesson and article content, including TOEIC 600, IELTS collocations, grammar handbooks, the Meaning → English pipeline, and Deep Reading PDFs.
- `assets/learning/` and `assets/ui/` — working shared behavior for keyboard input, persistence, progress, sessions, dialogs, routing, media, and Personal Flashcards.
- `tests/` — automated catalogue and learning-module tests run with Node's test runner.
- `tools/` — derived-data build and repair scripts for TOEIC 600, vocabulary rounds, Vietnamese serif fonts, and aggregates.
- `README.md`, `CONTEXT.md`, and `AGENTS.md` — operational, domain, and contribution documentation.

Absent and not to be fabricated: testimonials, learner counts, completion statistics, pricing, partnerships, accreditation, analytics, or third-party endorsements.

## Product Principles

1. Practice beats passive exposure: a lesson earns its place by making the learner retrieve, produce, or apply language, with feedback that explains the answer.
2. One learner, one device: keep progress local, preserve stored learner work across changes, and never require an account to study.
3. The library must stay findable: one catalogue, stable IDs and URLs, and quick search and filter access to every Resource.
4. Static and portable by default: no backend, build step, or absolute path may become necessary to read or practise.
5. Low friction over spectacle: study surfaces should support long sessions on small screens and keyboards without unnecessary steps or interruption.

## Accessibility & Inclusion

Product-specific requirements established in `CONTEXT.md`:

- Interactive controls are keyboard reachable, have accessible names, expose state, and keep visible focus.
- Enter invokes the current primary action without submitting during IME composition, activating an unrelated control, or skipping an unanswered Prompt.
- Dynamic results use an appropriate live region without repeated interruption.
- Layout works at 360 px and 390 px without horizontal overflow or unreachable actions.
- Motion respects `prefers-reduced-motion`.
- Vietnamese diacritics and UTF-8 must render correctly.

No formal conformance standard has been confirmed.
