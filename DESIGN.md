---
name: English 101
description: A calm, practice-first English study library — "Learn with clarity".
colors:
  primary: "#ff6b4a"
  coral-strong: "#c9431f"
  navy: "#131416"
  lamp-lime: "#d1fe17"
  paper: "#fbfaf7"
  ink: "#111827"
  muted: "#647084"
  line: "#e7e4de"
  footer-ink: "#0a0b0c"
  featured-surface: "#f0eee8"
  blog-surface: "#eef3fc"
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
  topic-guide: "#3b6f9d"
  topic-vocabulary: "#7457a0"
  topic-grammar: "#3b765c"
  topic-writing: "#9a5e31"
  topic-verbs: "#87692a"
  topic-blog: "#38596f"
  topic-guide-soft: "#edf4f9"
  topic-vocabulary-soft: "#f2eff8"
  topic-grammar-soft: "#edf6f0"
  topic-writing-soft: "#faf1e8"
  topic-verbs-soft: "#faf5e6"
  topic-blog-soft: "#edf2f5"
  illustration-blue: "#377cf6"
  illustration-violet: "#8867e8"
  illustration-green: "#2ea67a"
  illustration-amber: "#eea632"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(50px, 6vw, 76px)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(31px, 4vw, 45px)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "0.17em"
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
  section: "96px"
  section-mobile: "70px"
  gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.coral-strong}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
  button-lesson:
    backgroundColor: "{colors.lesson-paper}"
    textColor: "{colors.lesson-ink}"
    typography: "{typography.lesson-body}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  input-search:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "15px"
    padding: "7px 7px 7px 18px"
  chip-filter:
    backgroundColor: "{colors.topic-vocabulary-soft}"
    textColor: "{colors.topic-vocabulary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
  card-topic:
    backgroundColor: "{colors.topic-vocabulary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px 22px"
  card-document:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "25px"
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

**Creative North Star: "The Quiet Reading Room"**

English 101 is a private study lit by one warm lamp. The portal opens on a deep charcoal field — the room before dawn — then hands the visitor a warm off-white page, near-black ink, and a single ember-coral mark. Nothing competes for attention: hairlines instead of boxes, generous section pauses, and one vertical shelf of six topic rows that read like labelled drawers in a cabinet.

The system is calm and editorial rather than chatty. Type does the persuading: Manrope at large sizes, tracked tight enough to feel deliberate, over DM Sans at a patient 1.6 line-height so Vietnamese diacritics never collide with the line above. Density is generous on the portal and slightly tighter inside lessons, where the learner is reading and answering rather than choosing.

Lessons are allowed their own light. Each lesson page owns an accent world — teal, forest, black-and-red, plum — because a long study session deserves a change of room. What must not change is the building: warm paper, dark ink, soft 10–22px rounding, a clearly visible focus ring, and coral reserved for the portal's one call to action.

**Key Characteristics:**
- Warm paper and near-black ink; pure white only for raised cards and fields.
- One ember-coral signal per view; six topic hues tinted, never filled.
- Flat at rest, lifted on intent: hairlines separate, shadows respond.
- Manrope for structure, DM Sans for reading, system-ui inside lessons.
- Practice-first surfaces: choices, feedback, and progress are first-class components, not afterthoughts.

## Colors

A warm neutral room with one lit accent and six shelved tints. The palette is deliberately low-saturation except where the learner must act.

### Primary
- **Ember Coral** (`{colors.primary}`): the only cross-topic signal colour. It lives in the 43px brand tile, the `em` inside the hero headline, the arrow on "Đọc trực tiếp →" and "Xem toàn bộ →", and one call to action per section. It is a marker, not a surface: it never fills a content card, and the topic row's count and arrow stay in their own topic colour.

### Secondary
- **Cinema Charcoal** (`{colors.navy}`): the hero field, the "Một nơi. Mọi tài liệu." panel, and the viewer bar. It is the room's dark wall — a near-black charcoal (`#131416`) with faint lime lamp-glows in the hero, used as a full-bleed block, never as a text colour on paper.
- **Lamp Lime** (`{colors.lamp-lime}`): the dark room's accent, borrowed from cinematic AI-art references (Higgsfield). It lights only charcoal surfaces — the brand tile (with charcoal label text), the `em` inside the hero headline, the hero search submit, and arrows on dark panels (`{colors.footer-ink}`/charcoal rooms). It never appears on the warm paper pages, where ember coral remains the only accent.
- **Footer Ink** (`{colors.footer-ink}`): one step darker than charcoal, reserved for the footer so it closes the page below the hero's register.

### Tertiary
- **Guide Blue** (`{colors.topic-guide}` / `{colors.topic-guide-soft}`), **Vocabulary Violet** (`{colors.topic-vocabulary}` / `{colors.topic-vocabulary-soft}`), **Grammar Green** (`{colors.topic-grammar}` / `{colors.topic-grammar-soft}`), **Writing Amber** (`{colors.topic-writing}` / `{colors.topic-writing-soft}`), **Verb Olive** (`{colors.topic-verbs}` / `{colors.topic-verbs-soft}`), **Blog Slate** (`{colors.topic-blog}` / `{colors.topic-blog-soft}`): each of the six categories is a hue paired with a paper tint. The saturated value drives the label, icon outline, border mix, and count; the tint fills the row.
- **Illustration Blue / Violet / Green / Amber** (`{colors.illustration-blue}`, `{colors.illustration-violet}`, `{colors.illustration-green}`, `{colors.illustration-amber}`): flat fill colours inside the vector lesson illustrations. Blue alone doubles as a UI role — the "Tất cả" filter accent — because it is the one hue with no topic to belong to.

### Neutral
- **Warm Paper** (`{colors.paper}`): the page. Everything else is measured against it.
- **Ink** (`{colors.ink}`): body copy and headings on paper.
- **Quiet Ink** (`{colors.muted}`): descriptions, counts, secondary labels.
- **Hairline** (`{colors.line}`): every card border, divider, and illustration frame at rest.
- **Featured Sand** (`{colors.featured-surface}`) and **Blog Mist** (`{colors.blog-surface}`): full-bleed section grounds that separate chapters without borders.

Lesson surfaces carry their own neutrals — **Lesson Paper** (`{colors.lesson-paper}`), **Lesson Canvas** (`{colors.lesson-canvas}`), **Lesson Ink** (`{colors.lesson-ink}`), **Lesson Muted** (`{colors.lesson-muted}`), **Lesson Border** (`{colors.lesson-border}`) — plus **Study Teal** (`{colors.lesson-accent}`) and **Study Soft** (`{colors.lesson-soft}`) for primary actions, progress, and correct feedback, **Warm Gold** (`{colors.lesson-gold}`) for stars and notes, and **Error Brick** (`{colors.lesson-danger}`) for wrong answers. **Focus Gold** (`{colors.focus-gold}`) is the keyboard ring across the shared lesson layer and the portal's controls; portal topic rows keep an accent-tinted ring. On very light grounds (for example `#edf3f4`) darken the gold to `#9c6f26` to hold 3:1.

### Named Rules

**The One Lamp Rule.** Ember coral occupies less than a tenth of any view. If a screen has two coral buttons, one of them is wrong. Its scarcity is what makes the action legible. Each room burns one lamp: charcoal rooms are lit by Lamp Lime, paper rooms by ember coral — the two accents never share a view.

**The Shelved Colour Rule.** A topic hue appears only as that topic's tint, border mix, label, and icon outline. It never becomes a button fill, a page background, or another topic's colour.

**The Open Door Rule.** A lesson may repaint its own accent, but warm paper, dark ink, the shared gold focus ring, and the coral-to-teal handoff at the "back to library" link stay fixed. The portal is the building; lessons are the rooms.

## Typography

**Display Font:** Manrope (with sans-serif fallback)
**Body Font:** DM Sans (with Arial fallback)
**Lesson Font:** system-ui (with -apple-system and Segoe UI fallbacks)

**Character:** A geometric-humanist pairing. Manrope's wide, flat terminals carry structure at display sizes; DM Sans's rounder forms carry long reading. Negative tracking appears only above 30px, where it tightens the headline into a single confident line. Inside lessons the type voice drops to the reader's own system font, so the page feels like a document rather than a brand surface.

### Hierarchy
- **Display** (700, `{typography.display.fontSize}`, 1.13): the hero headline only. One per page, broken by an intentional line break, with the closing phrase in coral.
- **Headline** (700, `{typography.headline.fontSize}`, 1.13): section titles ("Chọn lộ trình của bạn", "Kho học liệu"). Section headings stand on their own — no kicker above them.
- **Title** (700, `{typography.title.fontSize}`, 1.13): document card titles and lesson card headings.
- **Body** (400, `{typography.body.fontSize}`, 1.6): all reading copy. Hero and section descriptions clamp to 450–610px; lesson prose stays inside the 860px study column.
- **Label** (700, `{typography.label.fontSize}`, `{typography.label.letterSpacing}`, uppercase): the brand tagline, file badges, and the lesson-index panel label. Sentence case is never used here.
- **Lesson Body** (400, `{typography.lesson-body.fontSize}`, 1.65): lesson prose, one step larger and looser than the portal.
- **Lesson Display** (700, `{typography.lesson-display.fontSize}`, 1.15): lesson page titles inside their dark header band.

### Named Rules

**The Diacritic Room Rule.** Vietnamese copy never receives negative tracking and never drops below 1.6 line-height. Tracking tighter than -0.02em is permitted only at 30px and above, where stacked diacritics have vertical room.

**The Two Voices Rule.** Manrope sets structure; DM Sans sets reading. Never set a paragraph in Manrope 800, and never set a section headline in DM Sans.

## Layout

The portal is a single centred column: `min(1160px, 100% - 48px)` on desktop, `min(100% - 28px, 1160px)` below 720px. Sections stack on a 96px vertical rhythm (84px for the topic shelf, 70px on mobile, 64px for topics under 600px), so the page breathes even when the library grows.

The hero is a 1.12 / 0.88 split with a 670px minimum height, and the navigation is absolutely positioned over it at 88px tall — the dark field starts at the very top of the viewport, and the header's white links sit on it rather than on a bar. Below 980px the art column is hidden and the hero becomes a single 650px column.

The library grid is four-up (`repeat(4, 1fr)`, 20px gaps, 424px minimum card height with illustrations) and the featured shelf stays three-up. The blog carries a single note, so it reads as one wide row instead of a lonely card in an empty grid: at 721px and above a 190px illustration plate sits beside the copy, and below that the card stacks normally.

The topic shelf is deliberately *not* a multi-column grid: six full-width rows stacked at 14px, each with a 60px icon frame in a 64px column, copy, and a right-hand count with a bare arrow. At 600px the count and arrow drop to a second row spanning the full width, so they stay thumb-reachable.

Lessons invert the model: a 1328px main column at 22/24px padding, with an 860px study column for flashcard and quiz states. Breakpoints are 980, 720, 600, and 480px.

Narrow screens are the primary study case, not an afterthought: 360px and 390px must hold without horizontal overflow, the filter strip scrolls sideways rather than wrapping, and the topic count and arrow move below the copy rather than shrinking the tappable target.

## Elevation & Depth

Flat at rest. Depth is carried by hairline borders and tonal section grounds — sand for featured, mist for blog, navy for the hero and about panel. Shadow is a *response*, not a decoration: it appears when a card is lifted on hover, when a layer floats above the page (search field, drawer, media popover, the hero word card), or when a chip is selected.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 2px 8px rgba(30,41,59,.025)`): barely-there grounding for topic rows.
- **Hover lift** (`box-shadow: 0 9px 24px rgba(30,41,59,.065)`): topic rows after a 3px rise.
- **Document lift** (`box-shadow: 0 18px 50px rgba(20,28,45,.09)`): document cards on hover, after a 5px rise.
- **Floating field** (`box-shadow: 0 18px 50px rgba(0,0,0,.22)`): the hero search, which must separate from the navy field.
- **Drawer** (`box-shadow: 0 25px 70px rgba(6,21,16,.24)`): the lesson index panel.
- **Launcher** (`box-shadow: 0 14px 38px rgba(12,28,24,.16)`, hover `0 18px 46px rgba(12,28,24,.2)`): the fixed "Mục lục bài học" button.
- **Hero card** (`box-shadow: 0 30px 70px rgba(0,0,0,.3)`): the rotated glass word card over the charcoal field.
- **Glass mirror** (inset top highlight `rgba(255,255,255,.16–.18)` plus a faint diagonal sheen over backdrop blur): the hero word card and the dark flashcards carry a whisper of reflected light; light flashcards use the same sheen at 3–5% ink. Static at rest, at most a 3% sheen drift on hover, disabled under reduced motion.
- **Selected chip** (`box-shadow: 0 8px 18px rgba(11,18,32,.14)`): the active filter — the only shadowed control inside the page flow.
- **Lesson card** (`box-shadow: 0 8px 26px rgba(32,59,58,.03)`): a whisper of paper lift inside lessons.
- **Popover** (`box-shadow: 0 16px 45px rgba(15,31,38,.2)`): the shared pronunciation/media panel.

### Named Rules

**The Flat-At-Rest Rule.** A card at rest has a 1px hairline and no shadow beyond its spec above. If it looks raised before you touch it, the border is doing too little.

**The One Floating Layer Rule.** At most one floating layer is visible at a time — launcher or drawer, popover or backdrop. Never stack a shadowed panel on a shadowed panel.

## Shapes

Soft rectangles, consistently rounded, never pill-shaped except where a value is continuous (counts, filters, part-of-speech tags). The portal rounds cards at 22px, the about panel at 28px, the search at 15px, buttons at 10px, and illustration frames at 16px. Lessons round a step tighter: 13–15px cards, 10px buttons and fields, 9px feedback blocks, 5px file badges.

Every edge is a 1px hairline in a tone of the paper, never a heavy rule. Icons and illustrations sit inside a framed paper window — 1px border, 16px radius, warm paper fill — so the artwork reads as a plate in a book rather than a coloured app icon.

The illustration language is its own geometry: 400 × 300 frames, flat vector line art with a near-black 12px outline, 2.6px drawing strokes in the topic accent, a single 3.2px coral accent stroke, and soft tinted fills at 7–12% of the accent. No gradients, no drop shadows inside the art.

## Components

State transitions cluster around 220ms (document cards take 250ms) and collapse to 0ms under `prefers-reduced-motion`; only the drawer and the popover take longer (280ms and 180ms) because they move a whole layer.

### Buttons
- **Shape:** softly squared (10px radius) on the portal; the same 10px inside lessons.
- **Primary:** deep ember fill (`{colors.coral-strong}`, 4.88:1 with white), white label, `padding: 12px 21px`, 700 weight, no border. It is the paper room's fill action (for example the library empty-state reset). The hero's search submit is the dark room's fill action instead: Lamp Lime with charcoal text.
- **Light:** white fill, navy label, `padding: 12px 18px`, used only on the navy about panel.
- **Text button:** no fill, ink label at 700, with a coral arrow ("Xem toàn bộ →"). The 3px arrow travel belongs to the topic row's bare arrow, not here.
- **Lesson:** paper fill, hairline border, `padding: 10px 15px`, 600-ish label; hover swaps the fill to study soft and the border to study teal. The primary lesson action uses the teal fill with white text.
- **Hover / Focus:** portal primary buttons keep their fill on hover - motion and colour belong to the cards. Lesson controls and portal controls take a 3px focus-gold ring at 3px offset; the hero search shell rings on `:focus-within`; portal topic rows take the ring in a 24% mix of their own accent.

### Chips
- **Filter chip:** fully rounded, tinted with the topic's soft colour, labelled in the topic's saturated colour, with a 24px white count bubble at 72% opacity. `padding: 9px 14px`, 9px gaps, horizontally scrollable on narrow screens.
- **Active:** the chip flips to a solid topic fill with white text and the selected-chip shadow; the count bubble inverts to 14% white.
- **File badge:** 6px radius, 10px uppercase at 800, 0.08em tracking, only shown for non-HTML resources (PDF, Article), filled with the resource's topic colour.
- **Origin label:** pill, 11px at 700, vocabulary tint, used for "From Context Lens".

### Cards / Containers
- **Topic row:** topic-soft fill, 1px border mixed at 18% of the accent, 22px radius, 20/22px padding, a 60px framed icon, title in the accent at 18–21px, description at 14px muted, and a right-hand count in the accent closed by a bare 17px arrow — no capsule inside the row. Hover raises it 3px, lightens the fill toward white, and strengthens the border to a 36% mix.
- **Document card:** pure white, hairline border, 22px radius, 25px padding, 424px minimum height inside the library grid, released below 720px so the card sizes to its content. A lesson illustration plate (124–150px) sits under the badge row, then the title at 19px, the description at 14px, and an action row separated by a 1px divider. Hover raises it 5px into the document-lift shadow.
- **Lesson card:** lesson paper, hairline border, 15px radius, 22px padding, whisper shadow; the study column widens its padding to 32px.
- **About panel:** navy, 28px radius, `padding: 55px 60px`, a three-column composition that collapses to a stack below 720px.

### Inputs / Fields
- **Search:** a white 15px-radius shell floating on the navy field, 7px padding with an 18px left inset, a 21px stroked search glyph in muted grey, an unframed input, and the deep-ember submit inside the shell's right edge. The shell takes a gold ring on `:focus-within`.
- **Lesson fields:** 9px radius, paper fill, hairline border, 10/12px padding, 16px text. Focus is the gold ring, never a colour change of the border.
- **Error / Disabled:** disabled controls drop to 60% opacity and keep their shape; wrong answers use the feedback block rather than recolouring the field.

### Navigation
- **Portal:** white links at 14px / 600 over the charcoal hero, 34px apart, brightening to pure white on hover. The brand is a 43px Lamp Lime tile (12px radius) reading "E" with a smaller "101" in charcoal, beside a Manrope 800 wordmark and a 9px tracked tagline.
- **Mobile:** below 720px the links collapse into a bordered navy panel (`#111b2b`, 15px radius) that drops from 70px with the drawer shadow; the hamburger is three 24px white rules.
- **Lesson:** a full-bleed dark band (`#203b3a` in the shared shell) carrying the page title at the lesson display scale and a row of soft pill facts.
- **Viewer:** a 70px navy bar with a back link, a truncating title, and bordered action chips.

### Quick Lesson Index (signature)
A fixed launcher at the bottom-right — white, 15px radius, 220px minimum width, a 36px mint icon tile, and a two-line label — opens a 420px right-hand drawer over a blurred `rgba(7,17,14,.28)` backdrop. The drawer is 20px rounded, sits 14px from each edge, slides in over 280ms with `cubic-bezier(.2,.8,.2,1)`, and on mobile becomes a full-height sheet 8px from the edges. Body scroll locks while it is open.

### Lesson Activity (signature)
The practice loop is a card with a large prompt (27–42px), then full-width choice buttons: left-aligned, 14px padding, 9px vertical gaps, 10px radius. Feedback arrives as a 9px-radius block — study soft with a green-tinted border for correct, `#f6e7e2` with brick text for wrong, sand for neutral — and a 5px progress bar in study teal tracks the session. Correct and wrong states never rely on colour alone; the block carries its own message.

### Pronunciation Helper (signature)
Two fixed circular controls at the bottom-right (speaker and gear) on lesson and flashcard pages. They open a 300px popover on paper with a 14px radius and the popover shadow, 44px minimum action targets, and the gold focus ring. Below the sheet breakpoint it becomes a bottom sheet over a 48% ink backdrop.

## Do's and Don'ts

### Do:
- **Do** keep the page on warm paper and reserve pure white for cards, fields, and floating surfaces.
- **Do** tint a topic element with its soft colour and label it with its saturated colour; the pair always travels together.
- **Do** frame every illustration on paper with a 1px hairline and a 16px radius.
- **Do** keep cards flat at rest and lift them no more than 5px on hover (3px for topic rows).
- **Do** give lesson controls and portal controls the 3px focus-gold ring at 3px offset, and the portal's topic rows a 24% accent mix. Never ship an interactive control without a visible indicator.
- **Do** set Vietnamese body copy at 1.6–1.65 line-height with zero tracking.
- **Do** let a lesson own its accent world while it keeps the shared paper, ink, rounding, and focus ring.
- **Do** make feedback explain itself in words before it uses colour.

### Don't:
- **Don't** build a SaaS marketing page — the confirmed anti-reference. No gradient feature tiles, mega-menus, badge clutter, countdowns, pricing grids, or growth banners.
- **Don't** fill a document card or a button with a topic hue; the tint belongs to the shelf row, the chip, and the badge.
- **Don't** apply display tracking tighter than -0.02em below 30px.
- **Don't** add a second shadow to a resting card, or tint a shadow with an accent colour.
- **Don't** use ember coral for errors or destructive actions; lessons use error brick on a warm red tint.
- **Don't** introduce a new font family, or a radius outside the established vocabulary (8–22px for surfaces and controls, 5–6px only for badges, 999px only for pills).
- **Don't** split the six topic shelves into a multi-column icon grid; they read as one vertical list at every width.
- **Don't** stack floating layers, or leave a backdrop without a dismissible, focus-safe panel.
