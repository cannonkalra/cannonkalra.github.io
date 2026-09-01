# Design System

A design-system and research document for **cannonkalra.com** — the personal technical blog of Cannon Kalra, platform and data engineer.

The blog is built with Astro. Its aesthetic goals are **calm, minimal, editorial, premium, developer-focused, and timeless**. It draws on the *principles* — never the literal layouts — of [mckerlie.com](https://mckerlie.com), the [Astro Docs](https://docs.astro.build), the [Vercel Blog](https://vercel.com/blog), Dan Abramov's [Overreacted](https://overreacted.io), and [Josh Comeau](https://www.joshwcomeau.com).

It deliberately **avoids**: glassmorphism, neon gradients, excessive animation, giant hero sections, and marketing-landing aesthetics. Nothing here should feel like it is selling you something. It should feel like a well-set page in a good book that happens to run code.

---

## 1. Design philosophy

The system resolves conflicts by a fixed priority ladder. When two goals compete, the higher rung wins.

### Typography > Effects
The reading experience is the product. A carefully chosen typeface, a comfortable measure, and honest vertical rhythm do more than any shadow, gradient, or blur ever could. We spend our budget on type and spend nothing on ornament.

### Whitespace > Decoration
Space is the primary design tool. Generous margins, breathing room around headings, and quiet gutters communicate structure and calm far more effectively than borders, boxes, or dividers. When a section needs separation, we reach for space first and lines second.

### Content > UI
The interface should recede. Chrome — navigation, toggles, controls — stays small, muted, and out of the way so the words hold the eye. If a UI element is not being used, it should be nearly invisible.

### Speed > Features
A fast page that loads instantly and never shifts beats a clever one that stutters. Fonts are self-hosted with zero external requests, JavaScript is minimal, and there is no layout shift or theme flash. We ship a feature only when it costs nothing perceptible.

### Simplicity > Cleverness
The obvious solution, plainly executed, is preferred over the impressive one. A design that is easy to reason about ages well and stays maintainable. We resist novelty for its own sake; timelessness is a feature.

---

## 2. Research: patterns in modern technical blogs

Before choosing a single token, we studied how the best technical writing surfaces on the web actually behave. These are the findings that informed the build.

### Typography choices
The reference sites split cleanly into two camps. Overreacted and Josh Comeau treat the essay as *writing first* — Overreacted in particular sets long-form prose in a serif at a large size, which reads like an edited article rather than documentation. Astro Docs and Vercel, by contrast, use a crisp humanist sans (Inter and its cousins) tuned for scanning, reference, and UI density. **The finding: prose and UI want different typefaces.** We adopt a dual-font strategy rather than forcing one family to do both jobs.

### Spacing and rhythm
Every reference site is disciplined about vertical rhythm. Headings get more space above than below, so they bind to the content they introduce. Paragraphs are separated by clear but not cavernous gaps. The rhythm derives from a consistent scale rather than ad-hoc pixel values, which is why these pages feel composed rather than assembled.

### Content width and measure
None of these sites run text edge to edge. Overreacted and Comeau hold prose to a comfortable measure — roughly 60–70 characters — which is the single biggest lever on readability. Code and figures are allowed to break wider than the prose column, a "full-bleed within a narrow measure" pattern that keeps text readable while letting diagrams breathe.

### Navigation
The best examples keep navigation minimal and persistent. A slim sticky header with a handful of links, the current section quietly marked active, and nothing more. No mega-menus, no marketing calls to action. The reader always knows where they are without the chrome demanding attention.

### Code blocks
Code is a first-class citizen. Syntax highlighting is calm and low-contrast rather than a rainbow; monospaced type is chosen deliberately; blocks sit in a subtly recessed surface distinct from the page background. Astro's Shiki-based highlighting sets the standard here — token colors that harmonize with the page rather than fight it.

### Reading progress
Long essays benefit from a lightweight sense of position. A thin progress indicator, or a table of contents that highlights the current section, gives orientation without clutter. The key is restraint: the indicator informs, it never performs.

### Accessibility
The strongest sites are quietly accessible: real semantic HTML, visible focus states, sufficient contrast, and full keyboard operability. Accessibility is treated as correctness, not decoration — and it never shows up as an ugly compromise.

### Dark mode
Dark mode is expected, not optional. The best implementations avoid pure black, respect the OS preference, persist the user's explicit choice, and — critically — paint the correct theme before first render so there is no white flash. Comeau's write-ups on avoiding the flash directly informed our pre-paint approach.

### Mobile UX
On small screens the measure narrows, the header collapses to essentials, and touch targets stay generous. Nothing horizontally scrolls except code and wide tables, which are given their own scroll container. The reading experience degrades gracefully — it never breaks.

---

## 3. Type system

We use three typefaces, each with one job. All are self-hosted variable fonts via `@fontsource`, so the site makes **zero external font requests** and never shifts as fonts load.

| Role | Typeface | Notes |
| --- | --- | --- |
| UI & headings | **Inter Variable** | Feature settings `cv05` + `ss01` for a cleaner lowercase `l` and refined single-story shapes. Humanist, neutral, excellent for chrome and titles. |
| Article body / prose | **Newsreader Variable** | A serif with optical sizing. Chosen to make the reading surface *writing-first*, in the spirit of Overreacted. Italics loaded separately for proper emphasis. |
| Code | **JetBrains Mono Variable** | Legible monospace with clear disambiguation of similar glyphs. Used in code blocks and inline code. |

Font stacks fall back gracefully to system families (`ui-sans-serif`/`system-ui`, `ui-serif`/`Georgia`, `ui-monospace`/`SF Mono`) so text renders sensibly even in the unlikely event a face fails to load.

### Modular type scale

A minor-third scale (ratio ≈ **1.2**), tuned for reading. Base is `1rem`.

| Token | Size | Typical use |
| --- | --- | --- |
| `--text-xs` | `0.79rem` | Fine print, captions, tag labels |
| `--text-sm` | `0.889rem` | Meta, footnotes, secondary UI |
| `--text-base` | `1rem` | Default UI text |
| `--text-lg` | `1.125rem` | Lead paragraphs, emphasized UI |
| `--text-xl` | `1.266rem` | Small headings, card titles |
| `--text-2xl` | `1.5rem` | `h3` |
| `--text-3xl` | `1.898rem` | `h2` |
| `--text-4xl` | `2.281rem` | `h1` |
| `--text-5xl` | `2.887rem` | Display / large titles |
| `--text-6xl` | `3.653rem` | Hero display (used sparingly) |

### Prose settings

The article reading surface is set deliberately larger and looser than UI text:

- **Prose size:** `1.2rem` — comfortably larger than base, so essays read like edited articles.
- **Line height:** `1.75` — an open leading that supports long-form reading.
- **Measure:** `68ch` — holds the line length in the readable 60–70 character band. Code and figures may break wider than this column.

Headings are set in **Inter** with `-0.018em` letter-spacing (tightening large sizes) and `text-wrap: balance` so multi-line titles break into visually even lines. Heading weight is `640` and line-height `1.2`.

---

## 4. Color system

The palette is a **warm-neutral ink** system. It never uses pure `#000000` or `#ffffff` — pure black on pure white is harsh and clinical, and pure black backgrounds in dark mode cause halation and eye strain. Everything is nudged toward warmth, so the page reads like paper and ink rather than a screen.

Color is expressed through **semantic tokens** (`--bg`, `--text`, `--accent`, …). The tokens are defined once on `:root` and re-defined on `.dark`; every component references the semantic name, so the entire theme swaps by toggling a single class on `<html>`.

### Light theme

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#fbfaf8` | Warm paper white — page background |
| `--bg-subtle` | `#f4f2ec` | Sunken surfaces, code blocks |
| `--surface` | `#ffffff` | Raised cards |
| `--border` | `#e7e3da` | Hairlines |
| `--text` | `#22201c` | Primary reading ink (warm near-black) |
| `--text-muted` | `#6b665c` | Secondary text, meta |
| `--text-faint` | `#928c80` | Captions, disabled |
| `--accent` | `#0d7a6f` | Deep, un-neon editorial teal |
| `--accent-soft` | `#e3f2ef` | Tinted background wash |

### Dark theme

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#1a1917` | Warm charcoal — **not** black |
| `--bg-subtle` | `#211f1c` | Sunken surfaces, code blocks |
| `--surface` | `#232120` | Raised cards |
| `--border` | `#322f2b` | Hairlines |
| `--text` | `#e9e5dd` | Warm off-white ink |
| `--text-muted` | `#a29c90` | Secondary text, meta |
| `--accent` | `#4fd8c4` | Lightened teal for dark surfaces |

### Reasoning

- **Warmth.** Every neutral carries a faint warm cast (yellow/red, not blue). This is what makes the page feel editorial and premium rather than sterile. Ink and paper, not glass and metal.
- **Contrast.** Primary text on background clears **WCAG AA** in both themes, and muted/faint tokens are calibrated to remain legible while reading as clearly secondary. Contrast is *sufficient*, never *maximal* — pure black on pure white is avoided precisely because it overshoots comfortable reading contrast.
- **Why not pure black in dark mode.** A `#000000` background against light text causes halation (the text appears to bloom and vibrate) and removes any sense of depth. `#1a1917` — a warm charcoal — keeps text crisp, allows subtle elevation between `--bg`, `--bg-subtle`, and `--surface`, and is far kinder to the eye in low light.
- **The accent** is a single restrained editorial teal. In light mode it is deep enough to pass AA on the page background for links; in dark mode it lightens to `#4fd8c4` so it stays legible against charcoal without glowing. There are no gradients and no second accent — one color, used consistently.

### Theme persistence and no-flash

Dark mode **respects `prefers-color-scheme`** on first visit and **persists an explicit choice via `localStorage`**. An inline pre-paint script runs before first render and sets the correct class on `<html>`, so there is **no flash of the wrong theme** and no layout shift. `color-scheme` is set per theme so native form controls and scrollbars match.

---

## 5. Spacing, radius, shadow, motion

### Radius

Corner radii are restrained — rounded enough to feel considered, never soft or bubbly.

| Token | Value |
| --- | --- |
| `--radius-sm` | `0.25rem` |
| `--radius` | `0.5rem` |
| `--radius-lg` | `0.75rem` |
| `--radius-xl` | `1rem` |

### Shadow

Shadows are **subtle and warm-tinted** (built from the ink color, not neutral gray) and used **sparingly** — mostly for genuinely raised elements like cards and popovers. They suggest a hair of elevation, never a floating marketing card.

| Token | Purpose |
| --- | --- |
| `--shadow-sm` | Barely-there lift for hairline separation |
| `--shadow-md` | Cards, raised surfaces |
| `--shadow-lg` | Overlays, popovers |

In dark mode the shadows shift to a deeper, near-black tint to read correctly against charcoal.

### Motion

Motion is **quiet and purposeful**. Transitions exist to soften state changes, not to entertain.

- **Easing:** `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` — a gentle decelerating curve. `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` for symmetric moves.
- **Duration:** around **150ms** — fast enough to feel instant, slow enough to read as intentional.
- **Reduced motion:** `prefers-reduced-motion: reduce` is **fully honored** — animations and smooth scrolling are disabled for users who ask for it. No exceptions, no decorative motion that can't be turned off.

---

## 6. Breakpoints

A small, standard set of `rem`-based breakpoints. Tailwind's defaults are cleared and replaced so the scale is intentional.

| Token | Value | Approx. |
| --- | --- | --- |
| `sm` | `40rem` | 640px |
| `md` | `48rem` | 768px |
| `lg` | `64rem` | 1024px |
| `xl` | `80rem` | 1280px |

Using `rem` means breakpoints respond to the user's root font size, keeping the layout coherent for readers who zoom or set a larger default.

---

## 7. Accessibility commitments

Accessibility is treated as correctness. These are non-negotiable commitments, not nice-to-haves.

- **WCAG AA contrast** for text in both light and dark themes.
- **Semantic HTML** throughout — real `<article>`, `<nav>`, `<header>`, `<footer>`, headings, and landmarks rather than styled `<div>`s.
- **Visible focus rings.** Every interactive element shows a `2px` solid accent outline with `2px` offset on `:focus-visible`. Focus is never removed.
- **Skip-to-content link** so keyboard and screen-reader users can bypass the header and jump straight to the article.
- **Proper heading hierarchy** — one `h1` per page, no skipped levels, so document structure is navigable by assistive tech.
- **Full keyboard navigation** — every control reachable and operable by keyboard, in a logical order.
- **Reduced motion** honored via `prefers-reduced-motion`, disabling animation and smooth scrolling.

---

## 8. Component inventory

A small library of reusable components expresses the system. Each is deliberately quiet; the sum reads as a coherent whole.

| Component | Role |
| --- | --- |
| **Header** | Slim sticky navigation with active-link state and the theme toggle. |
| **Footer** | Minimal site footer — links, copyright, quiet by design. |
| **ThemeToggle** | Light/dark switch; writes the choice to `localStorage`. |
| **Icon** | Inline SVG icon set — no icon-font dependency, no external requests. |
| **PostCard** | Article preview: title, meta, and excerpt for index and listing pages. |
| **PostMeta** | Date, reading time, and tags for a post. |
| **Tag** | A single topic label, styled small and muted. |
| **TableOfContents** | Sticky, scroll-spy table of contents that highlights the current section. |
| **ReadingProgress** | Thin, unobtrusive progress indicator for long essays. |
| **Callout** | Note / tip / warning / danger admonitions, tinted from the feedback tokens. |
| **Mermaid** | Rendered Mermaid diagrams for architecture and flow figures. |
| **ShareLinks** | Quiet links to share a post. |
| **Pagination** | Page-through controls for listing pages. |
| **PrevNext** | Previous/next post navigation at the foot of an article. |
| **SeriesNav** | Navigation within a multi-part series. |
| **AuthorCard** | Compact author bio block. |
| **Search** | Full-text search powered by **Pagefind** — static, fast, zero backend. |

---

*This document describes intent and the real tokens in use. The canonical source of truth for values is `src/styles/global.css`; where the two ever diverge, the stylesheet wins.*
