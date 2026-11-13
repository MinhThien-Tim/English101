---
name: English 101
description: A calm, practice-first English study library — "Learn with clarity".
colors:
  primary: "#d4552e"
  coral-strong: "#a8401d"
  navy: "#0b1013"
  desk-ink: "#111a1e"
  lamp-lime: "#cdf34a"
  paper: "#f6f3ec"
  paper-secondary: "#eee9dd"
  card: "#fffdf8"
  ink: "#16191b"
  muted: "#625c53"
  muted-secondary: "#77706a"
  line: "#e4ddce"
  line-secondary: "#d4cab4"
  control-line: "#8a8074"
  portal-focus: "#2b4f9c"
  footer-ink: "#070b0d"
  featured-surface: "#f6f3ec"
  blog-surface: "#f6f3ec"
  icon-ink: "#544b43"
  icon-back: "#8f857a"
  icon-shade: "#f1ece2"
  lesson-paper: "#fffefa"
  lesson-canvas: "#f2f0ea"
  lesson-ink: "#202e32"
  lesson-muted: "#56676b"
  lesson-border: "#cfd7d1"
  lesson-accent: "#1c5b53"
  lesson-soft: "#e3eee8"
  lesson-gold: "#966027"
  lesson-danger: "#a13736"
  focus-gold: "#b8883f"
  topic-guide: "#3f6cc9"
  topic-vocabulary: "#6f5ac8"
  topic-grammar: "#1f8a63"
  topic-writing: "#b8467f"
  topic-verbs: "#b07a12"
  topic-blog: "#138397"
  topic-guide-ink: "#2b4f9c"
  topic-vocabulary-ink: "#54429f"
  topic-grammar-ink: "#13684b"
  topic-writing-ink: "#8c2f5d"
  topic-verbs-ink: "#7c560c"
  topic-blog-ink: "#0d6170"
  topic-guide-soft: "#ebeff5"
  topic-vocabulary-soft: "#efedf5"
  topic-grammar-soft: "#eaf1e8"
  topic-writing-soft: "#faebeb"
  topic-verbs-soft: "#f7f0e3"
  topic-blog-soft: "#eaf1ee"
  illustration-blue: "#377cf6"
  illustration-violet: "#8867e8"
  illustration-green: "#2ea67a"
  illustration-amber: "#eea632"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.7rem + 4.2vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "0.16em"
  lesson-body:
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  lesson-display:
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(30px, 5vw, 50px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.04em"
rounded:
  sm: "8px"
  control: "10px"
  md: "14px"
  lg: "20px"
  card: "22px"
  panel: "28px"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  section: "clamp(2.5rem, 4vw, 2.75rem)"
  section-mobile: "clamp(2.5rem, 4vw, 2.75rem)"
  hero-top: "clamp(2.5rem, 4vw, 3rem)"
  hero-bottom: "clamp(3rem, 5vw, 3.5rem)"
  about: "clamp(26px, 3vw, 36px)"
  gutter: "1.25rem"
  gutter-mobile: "0.875rem"
components:
  button-primary:
    backgroundColor: "{colors.coral-strong}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  button-lime:
    backgroundColor: "{colors.lamp-lime}"
    textColor: "{colors.footer-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  button-outline-dark:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  button-lesson:
    backgroundColor: "{colors.lesson-paper}"
    textColor: "{colors.lesson-ink}"
    typography: "{typography.lesson-body}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  input-search:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "16px"
    padding: "7px 7px 7px 16px"
  chip-filter:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  card-topic:
    backgroundColor: "{colors.topic-vocabulary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-document:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-lesson:
    backgroundColor: "{colors.lesson-paper}"
    textColor: "{colors.lesson-ink}"
    rounded: "15px"
    padding: "22px"
  choice-activity:
    backgroundColor: "{colors.lesson-paper}"
    textColor: "{colors.lesson-ink}"
    typography: "{typography.lesson-body}"
    rounded: "{rounded.control}"
    padding: "14px"
  feedback-correct:
    backgroundColor: "{colors.lesson-soft}"
    textColor: "{colors.lesson-ink}"
    typography: "{typography.lesson-body}"
    rounded: "9px"
    padding: "15px"
---

# Design System: English 101

## Overview

**Creative North Star: "The Study Desk"**

English 101 is a study desk lit by one warm lamp. The portal opens on flat dark ink with a useful title, search, and a real recent-or-starter reading list. Warm paper follows: six topic drawers, a compact catalogue, one full-width Blog resource, and a concise About panel. The approved Direction A layout and Direction C thin warm-ink, layered object illustrations replace decorative hero art and framed portal icons. The [homepage colour and icon motivation](docs/redesign/homepage/pass-2-icons-colors.md) explains the direction; current code defines the shipped values, with no optional hero glow.

The system is calm and editorial rather than chatty. Bricolage Grotesque gives the homepage its display voice, Be Vietnam Pro carries Vietnamese reading copy, and JetBrains Mono labels the shelves. Compact resource rows favour choosing and continuing study over a marketing-sized hero or a duplicated featured shelf.

Lessons are allowed their own light. Each lesson page owns an accent world — teal, forest, black-and-red, plum — because a long study session deserves a change of room. What must not change is the building: warm paper, dark ink, soft 10–22px rounding, a clearly visible focus ring, and coral reserved for restrained portal markers and paper-room actions.

Homepage tokens and behaviour apply only to `index.html`, `home.css`, `home-icons.js`, and `script.js`. The viewer and all lessons retain their existing styles, fonts, illustrations, and interaction specifications below.

**Key Characteristics:**
- Dark ink `#0b1013`, warm paper `#f6f3ec`, and warm card stock `#fffdf8`.
- Lime lights dark rooms; restrained coral marks actions on paper; topic hues stay in tints, dots, counts, and illustration details.
- Flat content surfaces, fine decorative dividers, and restrained lift on intent.
- Bricolage Grotesque for homepage structure, Be Vietnam Pro for reading, JetBrains Mono for labels; system-ui inside lessons.
- Practice-first surfaces: choices, feedback, and progress are first-class components, not afterthoughts.

## Colors

A warm neutral room with one lit accent and six shelved tints. The homepage uses flat colours: no hero orbs, noise, grid, gradient headline, or decorative glass.

### Primary
- **Ember Coral** (`{colors.primary}`, `#d4552e`): the paper room's restrained marker, used for the "Nổi bật" dot and the Quick Index footer lamp. **Coral Ink** (`{colors.coral-strong}`, `#a8401d`) fills the empty-state reset action with a white label. Neither is the homepage brand colour; resource titles, topic tags, and resting text links remain neutral.

### Secondary
- **Dark Ink** (`{colors.navy}`, `#0b1013`): the flat header, hero, and "Một nơi. Mọi tài liệu." panel; also the selected filter-chip fill. The reading desk uses `#111a1e`, with shaded faces at `#18242a`.
- **Lamp Lime** (`{colors.lamp-lime}`, `#cdf34a`): the dark room's accent — brand tile, solid hero `em`, search submit, active navigation and scroll rail, About action and facts, dark-room focus, and desk illustration details. Topic colours do not light the desk. Paper content uses coral markers and its own topic details rather than lime-filled cards.
- **Footer Ink** (`{colors.footer-ink}`, `#070b0d`): the footer and the sticky header's scrolled state.

### Tertiary
Each homepage topic has an accent for dots and restricted illustration details, a darker `*-ink` for readable counts and selected outlines, and a flat warm tint. Names and resource links stay in neutral ink.

| Topic | Accent | Readable ink | Warm tint |
| --- | --- | --- | --- |
| Vocabulary · Violet | `#6f5ac8` | `#54429f` | `#efedf5` |
| Grammar · Green | `#1f8a63` | `#13684b` | `#eaf1e8` |
| Writing · Magenta | `#b8467f` | `#8c2f5d` | `#faebeb` |
| Verb · Amber | `#b07a12` | `#7c560c` | `#f7f0e3` |
| Guide · Cobalt | `#3f6cc9` | `#2b4f9c` | `#ebeff5` |
| Blog · Cyan | `#138397` | `#0d6170` | `#eaf1ee` |

- **Illustration Blue / Violet / Green / Amber** (`{colors.illustration-blue}`, `{colors.illustration-violet}`, `{colors.illustration-green}`, `{colors.illustration-amber}`): flat fill colours inside the vector lesson illustrations. These lesson values remain unchanged and do not colour the homepage's neutral "Tất cả" chip.

### Neutral
- **Warm Paper** (`{colors.paper}`, `#f6f3ec`): topic, library, and Blog section grounds. There is no separate featured section; the retained `featured-surface` and `blog-surface` keys both resolve to paper.
- **Card Stock** (`{colors.card}`, `#fffdf8`) and **Secondary Paper** (`{colors.paper-secondary}`, `#eee9dd`): cards and fields, then neutral tags and count capsules.
- **Ink** (`{colors.ink}`, `#16191b`): body copy and headings on paper.
- **Quiet Ink** (`{colors.muted}`, `#625c53`): warm descriptions, counts, and secondary labels; placeholders use `#77706a`.
- **Hairline** (`{colors.line}`, `#e4ddce`) and **Secondary Line** (`{colors.line-secondary}`, `#d4cab4`): decorative card borders, dividers, and outlined file badges. These pale borders are not claimed to meet control contrast.
- **Control Line** (`{colors.control-line}`, `#8a8074`): the stronger boundary used by neutral filter chips, sort/PDF controls, Quick Index search, and icon buttons; it exceeds 3:1 on their light grounds. This is not a claim that every homepage border conforms.

Lesson surfaces carry their own neutrals — **Lesson Paper** (`{colors.lesson-paper}`), **Lesson Canvas** (`{colors.lesson-canvas}`), **Lesson Ink** (`{colors.lesson-ink}`), **Lesson Muted** (`{colors.lesson-muted}`), **Lesson Border** (`{colors.lesson-border}`) — plus **Study Teal** (`{colors.lesson-accent}`) and **Study Soft** (`{colors.lesson-soft}`) for primary actions, progress, and correct feedback, **Warm Gold** (`{colors.lesson-gold}`) for stars and notes, and **Error Brick** (`{colors.lesson-danger}`) for wrong answers. **Focus Gold** (`{colors.focus-gold}`) is the keyboard ring across the shared lesson layer. On very light grounds (for example `#edf3f4`) darken the gold to `#9c6f26` to hold 3:1.

Homepage focus is a 3px cobalt-ink ring (`#2b4f9c`) on paper and a 3px lime ring on dark rooms, normally at 3px offset; Quick Index search uses 2px offset. It does not replace lesson Focus Gold.

### Named Rules

**The One Lamp Rule.** Each room burns one lamp: dark rooms use Lamp Lime; paper rooms use restrained coral markers and actions. A viewport may contain both rooms. Neither accent becomes a decorative gradient, glow field, or content-card fill.

**The Shelved Colour Rule.** A homepage topic hue appears in that topic's flat tint, dot, readable count, selected border/check, and restricted object details. Topic names, tags, group headings, and resource links remain neutral. Selection must add a check, not merely change colour.

**The Open Door Rule.** A lesson may repaint its own accent, but warm paper, dark ink, the shared gold focus ring, and the coral-to-teal handoff at the "back to library" link stay fixed. The portal is the building; lessons are the rooms.

## Typography

**Display Font:** Bricolage Grotesque (with Be Vietnam Pro, system-ui, and sans-serif fallbacks)
**Body Font:** Be Vietnam Pro (with system-ui, -apple-system, Segoe UI, and sans-serif fallbacks)
**Label Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, and monospace fallbacks)
**Lesson Font:** system-ui (with -apple-system and Segoe UI fallbacks)

**Character:** An expressive display voice over clear Vietnamese reading copy, with compact mono labels for indexing. The homepage font request loads Vietnamese glyphs; display optical size is 96 for the hero and 40 for other headings. Inside lessons the type voice drops to the reader's own system font, so the page feels like a document rather than a brand surface.

### Hierarchy
The homepage scale follows `home.css`: `--step--1: .8125rem`, `--step-0: 1rem`, `--step-1: clamp(1.0625rem, 1rem + .3vw, 1.1875rem)`, `--step-2: clamp(1.375rem, 1.2rem + .7vw, 1.75rem)`, `--step-3: clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem)`, and `--step-4: clamp(2.75rem, 1.7rem + 4.2vw, 5rem)`.

- **Display** (700, `{typography.display.fontSize}`, 1.06): the hero headline only. One per page, intentionally broken, with the closing phrase in solid lime. Tracking is -.035em, relaxed to -.025em at 620px and below.
- **Headline** (700, `{typography.headline.fontSize}`, 1.12): homepage section titles, with numbered mono eyebrows above them. About uses the same scale at 1.14 line-height.
- **Title** (600, `{typography.title.fontSize}`, 1.32, -.012em): compact resource-card titles. Blog titles use `--step-2` at 1.2 line-height; topic names use 1rem / 700 at 1.25.
- **Body** (400, `{typography.body.fontSize}`, 1.65): homepage reading copy. Hero lede uses `--step-1` within 46ch; resource descriptions use .875rem at 1.6; Blog descriptions use 1rem within 60ch. Lesson prose stays inside the 860px study column.
- **Label** (500, `{typography.label.fontSize}`, `{typography.label.letterSpacing}`, uppercase for eyebrows): JetBrains Mono for eyebrows, counts, metadata, keyboard hints, and file badges. Small labels use component-specific rem sizes; sentence-case titles and controls remain sentence case.

Lesson card headings retain their existing 19px / 700 / 1.13 title treatment and -.02em tracking; the homepage resource-title tokens do not redefine lesson headings.

- **Lesson Body** (400, `{typography.lesson-body.fontSize}`, 1.65): lesson prose, one step larger and looser than the portal.
- **Lesson Display** (700, `{typography.lesson-display.fontSize}`, 1.15): lesson page titles inside their dark header band.

### Named Rules

**The Diacritic Room Rule.** Vietnamese reading copy keeps zero tracking and 1.6–1.65 line-height. Homepage headings and short UI labels use the scoped tracking and compact line heights in `home.css`; these exceptions do not tighten lesson prose.

**The Homepage Voices Rule.** Bricolage Grotesque sets structure, Be Vietnam Pro sets reading, and JetBrains Mono labels the catalogue. Do not set paragraphs in the display face or transfer the homepage font stack into lessons.

## Layout

The portal uses a centred content width of `min(1200px, 100% - 2.5rem)`, changing to `min(1200px, 100% - 1.75rem)` at 720px and below. Section padding is `clamp(2.5rem, 4vw, 2.75rem)`, with 28px between each section heading and its content. Hero padding is `clamp(2.5rem, 4vw, 3rem)` above and `clamp(3rem, 5vw, 3.5rem)` below: 48px / 56px maximum, not a fixed hero height. About panel padding tops out at 36px. The default unfiltered, ungrouped catalogue has a density reference of approximately 4,379px page height at 1440px width after fonts load; content and state determine height, not a fixed CSS target.

The desktop hero splits title/search and the working study desk at 1.12 / .88, with `minmax(0, 1.12fr) minmax(300px, .88fr)` and a 28–56px gap. At 1100px and below it stacks; the desk remains visible, up to 560px wide. The single sticky header sits in normal flow above it rather than overlaying a tall art composition.

Six topic drawers form one row on desktop, three columns at 1100px and below, and two at 620px and below, with 12px gaps. Each has an unframed 52 × 42px illustration, neutral name, readable topic-ink count, and a check when selected. There is no full-width vertical topic-row treatment or count-and-arrow second row.

The compact library uses `repeat(auto-fill, minmax(330px, 1fr))` with 14px gaps: three columns at the maximum content width and one column at 720px and below. Cards size to content, with an illustration left of the text, not above a fixed-height card. Category sort adds grouped headings and vocabulary subgroups without duplicating Resources.

The catalogue's 29 Resources each appear exactly once in the main Resource rows outside the desk: 28 learning cards in the library and one full-width Blog row. `renderBlog(list)` receives the same active result list, so Blog follows search, topic, and PDF filters and hides when excluded; result counts include both sections. `featured` is a marker and the default sort-first rule, never a separate duplicate shelf. All Resource titles and descriptions come from `data/documents.js`. Blog art is 180 × 144px on desktop, 150 × 120px at 900px and below, then 132 × 106px above the copy at 720px and below.

Lessons invert the model: a 1328px main column at 22/24px padding, with an 860px study column for flashcard and quiz states. Breakpoints are 980, 720, 600, and 480px.

Narrow screens are the primary study case, not an afterthought: 360px and 390px must hold without horizontal page overflow. The filter strip and small-screen section navigation scroll sideways rather than becoming extra header rows; the desk and topic counts remain available.

## Elevation & Depth

Flat content surfaces. Depth is carried by paper/card contrast and fine borders, with dark ink for the hero and About panel. The desk has no decorative glass or floating shadow. Only useful floating surfaces — search, suggestions, and Quick Index — take the strong shadow; selected chips use an ink fill and check rather than a shadow.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 1px 2px rgb(20 28 32 / 4%)`): slight grounding for resource cards, Blog, and library tools; topic drawers have no resting shadow.
- **Hover lift** (`box-shadow: 0 14px 34px rgb(20 28 32 / 10%)`): topic drawers and resource cards after a 3px rise. Resource-card lift follows title-link hover/focus; the illustration moves only 2px.
- **Floating surface** (`box-shadow: 0 26px 60px rgb(6 12 14 / 26%)`): hero search, suggestions, and Quick Index.
- **Glass mirror** (inset top highlight `rgba(255,255,255,.16–.18)` plus a faint diagonal sheen over backdrop blur): the dark flashcards carry a whisper of reflected light; light flashcards use the same sheen at 3–5% ink. Static at rest, at most a 3% sheen drift on hover, disabled under reduced motion. This lesson treatment does not apply to the homepage.
- **Lesson card** (`box-shadow: 0 8px 26px rgba(32,59,58,.03)`): a whisper of paper lift inside lessons.
- **Popover** (`box-shadow: 0 16px 45px rgba(15,31,38,.2)`): the shared pronunciation/media panel.

### Named Rules

**The Flat-At-Rest Rule.** A card at rest has a 1px hairline and no shadow beyond its spec above. If it looks raised before you touch it, the border is doing too little.

**The One Floating Layer Rule.** Avoid overlapping transient panels. A modal and its own backdrop form one focus-safe layer; the homepage header trigger is not a floating launcher. Keep lesson popovers and their dismissal contracts unchanged.

## Shapes

Soft rectangles, consistently rounded. The homepage uses 20px resource/topic cards and library tools, 28px desk/About/Blog panels, 16px search shells, 14px general buttons and tool controls, 10px icon buttons, and 6px file badges. Filter chips, topic tags, and the header index trigger are pills. The brand tile is 11px and search submit 12px. These are homepage-scoped values. Lessons round a step tighter: 13–15px cards, 10px buttons and fields, 9px feedback blocks, 5px file badges.

Homepage object illustrations have no tile, plate, frame, enclosing background, gradient, filter, or raster image. Paper faces inside a drawing occlude the objects behind them; shaded back faces and pale back strokes create depth without effects. Learning illustrations retain their framed paper window — 1px border, 16px radius, warm paper fill — so the artwork reads as a plate in a book rather than a coloured app icon.

The following illustration geometry remains lesson-only:

The illustration language is its own geometry: 400 × 300 frames, flat vector line art with a near-black 12px outline, 2.6px drawing strokes in the topic accent, a single 3.2px coral accent stroke, and soft tinted fills at 7–12% of the accent. No gradients, no drop shadows inside the art.

The homepage Direction C contract is `viewBox="0 0 120 96"`, inline SVG, default 1.35px non-scaling stroke, 1.15px for small icons with details/text hidden, and 1.6px for large/Blog art. Neutral warm ink is `#544b43`, back strokes `#8f857a`, paper `#fffdf8`, and shaded faces `#f1ece2`. Use 2–4 layered or angled real objects where appropriate, small paper corners (`rx` 2–4), and only 1–2 topic details or one accent object. The inventory is 29 Resource illustrations, six distinct topic illustrations, and nine UI glyphs; glyphs use their separate `0 0 24 24` box and 1.9 drawing stroke.

Illustration classes remain `s-paper`, `s-shade`, `s-back`, `s-detail`, `s-accent`, `s-fill`, `s-tint`, `s-dash`, and `s-text`; details use .75 of the base stroke and object labels use 11px mono. Small contexts are 40px search/Quick Index and 44px desk icons. Desk art adapts to light ink `#e6dfd1`, back strokes `#7f8a8c`, dark paper/shade faces, and lime details. No illustration IDs, definitions, masks, gradients, filters, or hard-coded palette are needed in the SVG strings.

## Components

Homepage controls transition around 200ms, cards at 220ms, and illustration movement at 250ms; Quick Index uses 280ms. Hero entry uses a restrained 700ms rise only when reduced motion is not requested. Under `prefers-reduced-motion`, CSS animation/transition duration drops to .001ms and smooth CSS scrolling becomes automatic. The lesson popover retains its 180ms motion specification. Homepage forced-colours styles retain visible boundaries, selected outlines/checks, and readable hero emphasis.

### Buttons
- **Shape:** homepage general buttons use 14px radius, `padding: 11px 20px`, 600 weight, and a 44px minimum height; lesson buttons remain 10px.
- **Primary:** coral-ink fill (`{colors.coral-strong}`), white label, for the paper-room empty-state reset. Hover darkens to `#b02c0b` and lifts 2px. The hero search submit instead uses Lamp Lime with dark ink, 12px radius, `padding: 10px 18px`, and 700 weight; at 620px and below it becomes an accessible icon-only 46px-wide action.
- **Lime / outline-dark:** About uses a lime primary action and a transparent paper-labelled guide action with a light border, not a white-filled secondary button.
- **Text action:** neutral ink label and muted arrow; resource arrows travel 4px and take readable topic ink on hover/focus. The title link supplies the card's read action; download links remain distinct controls above that hit area.
- **Lesson:** paper fill, hairline border, `padding: 10px 15px`, 600-ish label; hover swaps the fill to study soft and the border to study teal. The primary lesson action uses the teal fill with white text.
- **Focus:** lesson controls take a 3px focus-gold ring at 3px offset. Homepage controls use 3px cobalt-ink on paper and lime in dark rooms; hero search rings on `:focus-within`, and resource cards carry the title link's visible focus outline.

### Chips
- **Filter chip:** neutral card fill and ink label, control-line border, topic dot at 8px, and a secondary-paper mono count capsule. `padding: 7px 14px`, 38px minimum height, .875rem / 600 label, 8px gaps; the strip scrolls horizontally. "Tất cả" has no resting topic dot.
- **Active:** dark-ink fill with paper text and a visible check replacing the dot, including on "Tất cả". The count capsule uses `#24343c` with paper text. No topic-filled chip or selected-chip shadow; `aria-pressed` exposes state.
- **Topic tag:** neutral secondary-paper pill with warm muted text and a 6px topic dot, not a saturated label.
- **File badge:** PDF and Article are outlined, not topic-filled: 6px radius, secondary-line border, neutral ink, JetBrains Mono at .5625rem / 700 with .1em tracking. HTML has no file badge.
- **Origin label:** unframed .6875rem secondary muted text, including "From Context Lens".
- **Featured marker:** the neutral "Nổi bật" label carries a small coral lamp dot. Featured-first sorting changes order without making a second shelf.

### Cards / Containers
- **Topic drawer:** flat topic-soft fill, 1px border mixed at 18% of the accent, 20px radius, 16px padding (14px at 400px and below), unframed 52 × 42px art, neutral 1rem name, and mono topic-ink count. Hover raises it 3px and strengthens the border to 40%; selection uses card stock, a readable topic-ink outline, and a check badge.
- **Document card:** warm card stock, pale hairline border, 20px radius, 16px padding, and no fixed minimum height. An 88 × 70px illustration occupies the left column across all text rows; metadata, title, description, and a divided action row occupy the right. At 720px and below art becomes 72 × 58px; at 400px and below it is 60 × 48px with 14px card padding. Title-link hover/focus raises the card 3px; its separate download control remains available.
- **Lesson card:** lesson paper, hairline border, 15px radius, 22px padding, whisper shadow; the study column widens its padding to 32px.
- **Blog row:** one full-width card-stock Resource row with 28px radius and `padding: clamp(22px, 3vw, 34px)`. Art sits left of catalogue copy on desktop and above it on mobile; the same search/filter result list determines its visibility.
- **About panel:** flat dark ink, 28px radius, `padding: clamp(26px, 3vw, 36px)`, and a 1.35 / .65 copy-and-facts split that stacks at 900px and below. Facts form a compact two-column grid, with lime values.
- **Study desk:** flat `#111a1e`, a light 10% border, 28px radius, and 22px padding. It is a working list, not decorative hero art: a fresh visit shows the three starter Resources (`english-learning-101`, `grammar-handbook`, `toeic-600`); history shows up to four recent Resources, supplemented with starter/featured suggestions when fewer than three entries are available. Titles come from the catalogue and links open the viewer.

The desk reuses existing `assets/learning/persistence.js` with key `english101.recentResources`, schema 1, and up to eight deduplicated entries containing only `{id, at}`. It records Resource opens, not lesson progress or answers; unknown IDs are discarded and history is clearable. Blocked reads or writes keep history in-session and show an explicit persistence limitation rather than promising that it was saved. There is no old-key migration or backend history service.

### Inputs / Fields
- **Search:** warm card stock in a 16px-radius shell over dark ink, `padding: 7px 7px 7px 16px`, a 20px muted search glyph, unframed input, clear control, and lime submit. The shell takes a 3px lime ring on `:focus-within`. Typing filters the catalogue immediately; suggestions show up to six Resources plus an all-results action, with Arrow keys to select, Enter to open the selected Resource or go to the library, and Esc/Tab to dismiss suggestions. Vietnamese accent-insensitive matching covers titles, descriptions, topic labels, and types; the visible count includes matching Blog Resources. The all-results action clears category/PDF restrictions so its displayed result count matches the library.
- **Lesson fields:** 9px radius, paper fill, hairline border, 10/12px padding, 16px text. Focus is the gold ring, never a colour change of the border.
- **Error / Disabled:** disabled controls drop to 60% opacity and keep their shape; wrong answers use the feedback block rather than recolouring the field.

### Navigation
- **Portal:** one sticky dark-ink header, with a 64px content row, border, and 2px lime scroll rail. The 38px lime brand tile (11px radius) reads "E" and a mono "101" beside a Bricolage Grotesque wordmark and mono tagline. Section links are .875rem / 500 paper text in padded pills; the current section has lime text, tint, underline, and `aria-current="location"`. There is no separate launcher or jumpbar. Filtered-out sections do not take current-section state, and their jump links hide until the section is available again.
- **Mobile:** at 720px and below the content row is 58px, about 61px including border and rail. The tagline and visible index-button text/shortcut hide; section links remain in the same horizontally scrolling bar rather than a hamburger menu or dropped panel. The index trigger keeps the accessible name "Mục lục bài học".
- **Footer:** compact dark-ink brand and section links; "Hướng dẫn học" opens `viewer.html?id=english-learning-101`, as does the About guide action.
- **Lesson:** a full-bleed dark band (`#203b3a` in the shared shell) carrying the page title at the lesson display scale and a row of soft pill facts.
- **Viewer:** a 70px navy bar with a back link, a truncating title, and bordered action chips.

### Quick Lesson Index (signature)
The header's "Mục lục bài học" trigger opens a native `<dialog>` using existing `assets/ui/dialog.js`. Desktop presentation is a right-edge, full-height `100dvh` panel, `width: min(440px, 100%)`, with no inset floating frame. At 720px and below it becomes a full-width bottom sheet, `height: min(88dvh, 760px)`, with 28px top corners. Paper search, neutral checked chips, counts, and a scrollable Resource list remain inside the panel; its search/topic state is independent of the main library filters.

Opening focuses the search and locks body scrolling. `/` opens it outside input, textarea, and select controls; Tab stays inside while open. Esc closes even when search contains text, as do the close button and backdrop; focus returns to the header trigger and scrolling restores. The "Xem kho đầy đủ" action closes the dialog and goes to the library. Panel motion is 280ms with `cubic-bezier(.2,.8,.2,1)` and respects reduced motion. The backdrop's 55% dark-ink veil and 3px blur are functional modal separation, not decorative glass on content.

### Lesson Activity (signature)
The practice loop is a card with a large prompt (27–42px), then full-width choice buttons: left-aligned, 14px padding, 9px vertical gaps, 10px radius. Feedback arrives as a 9px-radius block — study soft with a green-tinted border for correct, `#f6e7e2` with brick text for wrong, sand for neutral — and a 5px progress bar in study teal tracks the session. Correct and wrong states never rely on colour alone; the block carries its own message.

### Pronunciation Helper (signature)
Two fixed circular controls at the bottom-right (speaker and gear) on lesson and flashcard pages. They open a 300px popover on paper with a 14px radius and the popover shadow, 44px minimum action targets, and the gold focus ring. Below the sheet breakpoint it becomes a bottom sheet over a 48% ink backdrop.

## Do's and Don'ts

### Do:
- **Do** keep homepage paper rooms warm (`#f6f3ec` / `#fffdf8`) and dark rooms flat; use lime on dark and restrained coral markers/actions on paper.
- **Do** pair each topic accent with its readable ink and warm tint, while keeping names, resource links, and topic tags neutral.
- **Do** leave homepage object illustrations unframed, with thin warm-ink outlines, paper occlusion, and restricted topic details. Retain existing lesson illustration frames and geometry.
- **Do** keep homepage cards flat at rest and limit card hover lift to 3px.
- **Do** give lesson controls the 3px focus-gold ring at 3px offset; give homepage controls 3px cobalt-ink on paper and lime on dark. Never ship an interactive control without a visible indicator.
- **Do** use the stronger control-line where specified, leaving decorative card borders pale; do not equate decoration with control contrast.
- **Do** show selection with checks and `aria-pressed`, keep mobile navigation/filter strips scrollable, and preserve reduced-motion and forced-colours support.
- **Do** keep all 29 main Resource rows catalogue-driven and unique outside the recent/starter desk; include Blog in active filtering and counts.
- **Do** set Vietnamese body copy at 1.6–1.65 line-height with zero tracking.
- **Do** let a lesson own its accent world while it keeps the shared paper, ink, rounding, and focus ring.
- **Do** make feedback explain itself in words before it uses colour.
- **Do** treat homepage print as a visible-content view, not a full-catalogue export: preserve the active result set and visible reading content, remove entry/reveal hiding, omit the sticky header and Quick Index, and render dark rooms as readable paper and ink. This is the intentional print contract, not a print-validation claim.

### Don't:
- **Don't** build a SaaS marketing page — the confirmed anti-reference. No gradient feature tiles, mega-menus, badge clutter, countdowns, pricing grids, or growth banners.
- **Don't** reintroduce hero orbs, noise, grids, gradient headlines, decorative glass, or framed homepage icons. Scroll-edge masks and modal backdrop separation are functional affordances, not decorative surfaces.
- **Don't** fill homepage resource cards or filter chips with saturated topic hues; topic tints belong to drawers, dots identify neutral chips/tags, and selected chips use ink plus a check.
- **Don't** tighten Vietnamese body tracking or apply homepage heading exceptions to lesson prose.
- **Don't** add a second shadow to a resting card, or use accent-tinted resting-card shadows.
- **Don't** use ember coral for errors or destructive actions; lessons use error brick on a warm red tint.
- **Don't** introduce fonts or radii outside the scoped homepage and existing lesson specifications; the homepage's three-font pairing does not replace lesson typography.
- **Don't** restore a fixed-height marketing hero, tall illustration-above-text library cards, a duplicated featured shelf, or six full-width vertical topic rows.
- **Don't** add a floating index launcher, separate jumpbar, or mobile hamburger in place of the single sticky navigation bar.
- **Don't** stack floating layers, or leave a backdrop without a dismissible, focus-safe panel.
