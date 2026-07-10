# Wireframes

Design artifact for a personal technical blog built with **Astro**. The visual
language is **calm, minimal, editorial, and premium**: generous whitespace, a
single centered content column, hairline dividers, restrained color, and serif
prose for reading. These wireframes describe the layout of every page/route with
ASCII sketches (desktop first, with mobile notes) plus a short prose
description.

Conventions used below:

- `═` / `─` mark strong and hairline horizontal rules.
- `│` marks column edges; `···` marks a sticky/pinned element.
- Content column is centered on the page. Standard pages cap at **~42rem**
  (`max-w-2xl`); article prose measures **~68ch**; article pages widen to
  **~max-w-5xl** to fit a right-hand TOC rail.

---

## Global shell

Every route renders inside a shared shell: a **skip link**, a **sticky header**,
the page `<main>`, and a **footer**. The header stays pinned to the top on
scroll; on articles a thin reading-progress bar sits above it.

### Desktop

```
 [ Skip to content ]  (visually hidden until focused; jumps to #main)
┌──────────────────────────────────────────────────────────────────────┐···
│  Cannon Kalra        Writing  Series  Projects  About   [⌕] [◐] [ ]    │  sticky header
└──────────────────────────────────────────────────────────────────────┘···
│                                                                        │
│                       « page content ( <main id="main"> ) »            │
│                                                                        │
├────────────────────────────────────────────────────────────────────── ┤
│  Cannon Kalra                                     Writing  Series       │  footer
│  © 2026 · Built with Astro                        Projects About        │
│                                                    [GH] [TW] [in] [RSS] │
└──────────────────────────────────────────────────────────────────────┘
```

- **Logo/name** sits left and links home. **Primary nav** (Writing, Series,
  Projects, About) sits center/right; the active route is subtly emphasized.
- **Search button** (`⌕`) opens the search modal (also bound to `/`). **Theme
  toggle** (`◐`) flips light/dark. **Hamburger** (` `) appears only on mobile.
- **Footer** repeats the name, a copyright line reading "Built with Astro",
  the nav links, and social icons: GitHub, Twitter, LinkedIn, RSS.

### Mobile note

```
┌──────────────────────────────┐···
│  Cannon Kalra      [⌕][◐][≡]  │  sticky header
└──────────────────────────────┘···
   ≡ →  Writing
         Series
         Projects
         About        (drops down under 40rem)
```

Under **40rem** the primary nav collapses behind the hamburger (`≡`) into a
stacked menu; search and theme toggle remain inline. The footer stacks its
columns vertically.

### Responsive strategy (applies to all pages)

- **Single column** everywhere on mobile; horizontal padding shrinks.
- The article **TOC rail collapses** into a `<details>` disclosure placed above
  the article body on screens below `lg`.
- **Nav collapses to a hamburger** under 40rem.
- Grids (projects, featured writing) reflow from 2 columns to 1.

---

## 1. Home (`/`)

A quiet, imagery-free landing. No hero banner.

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   Cannon Kalra                                          │  H1
│                                                         │
│   I write about data platforms and distributed          │  intro ¶
│   systems — how they're built, scaled, and reasoned      │
│   about.                                                 │
│                                                         │
│   [GH]  [TW]  [in]  [RSS]                                │  social row
│                                                         │
│   ─────────────────────────────────────────────────     │
│                                                         │
│   Featured writing                          All posts → │  section head
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  ● Series · Part 2                               │   │  LEAD PostCard
│   │  Building a query planner from scratch           │   │  (larger)
│   │  A tour of cost-based optimization and the...    │   │
│   │  2026-06-14 · 12 min                             │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌───────────────────┐   ┌───────────────────┐         │
│   │ Post title        │   │ Post title        │         │  up to 4 more
│   │ short desc…       │   │ short desc…       │         │  (smaller cards)
│   │ date · N min      │   │ date · N min      │         │
│   └───────────────────┘   └───────────────────┘         │
│   ┌───────────────────┐   ┌───────────────────┐         │
│   │ Post title        │   │ Post title        │         │
│   │ date · N min      │   │ date · N min      │         │
│   └───────────────────┘   └───────────────────┘         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Opens with the name as an H1, a one-to-two sentence description of what Cannon
  writes about, and a compact row of social icons.
- A **"Featured writing"** (or "Latest writing") section leads with one larger
  **PostCard** followed by up to four smaller cards, and an **"All posts →"**
  link aligned to the section heading.

**Mobile:** everything stacks into one column; the four secondary cards become a
single-column list under the lead card.

---

## 2. Blog index (`/blog`) + pagination (`/blog/page/N`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   Writing                                               │  H1
│   Notes on data platforms, distributed systems, and     │  subtitle
│   the craft of building them.                           │
│                                                         │
│   ─────────────────────────────────────────────────     │
│   ● Series · Part 1                                      │  PostCard
│   Title of the post                                     │
│   One-line description of what the post covers.         │
│   2026-06-14 · 9 min                                    │
│   ─────────────────────────────────────────────────     │  hairline
│   Another post title                                    │
│   Its short description here.                            │
│   2026-05-30 · 6 min                                    │
│   ─────────────────────────────────────────────────     │
│   … more PostCards …                                    │
│   ─────────────────────────────────────────────────     │
│                                                         │
│         ← Newer   1  2  [3]  4  5   Older →             │  pagination
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **"Writing"** H1 with a short subtitle, then a vertical list of **PostCards**
  separated by hairline borders. Each card shows an optional **series badge**,
  the **title**, a **description**, and a **meta line** = `date · reading time`.
- **Numbered pagination** appears when there are more than 8 posts:
  `Newer`/`Older` controls flank the page numbers; the current page is marked.
  `/blog/page/N` renders identically for pages beyond the first.

**Mobile:** cards remain full-width; pagination numbers wrap/condense.

---

## 3. Article page (`/blog/[slug]`) — the primary page

The most important layout. A reading-progress bar is pinned above the header; the
body is a two-column grid on desktop: **[ article column | 14rem sticky TOC ]**.

### Desktop

```
▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ← progress bar (pinned top)
┌────────────── max-w-5xl, centered ───────────────────────────────────┐
│                                                                       │
│  ┌──────── article column (~68ch) ────────┐   ┌── 14rem TOC rail ──┐  │
│  │                                         │   │ ···············    │  │
│  │  ← All writing                          │   │ On this page       │  │
│  │                                         │   │                    │  │
│  │  ● Series Name · Part 3                  │   │ • Introduction     │  │
│  │  Article Title From Frontmatter          │   │ • Background       │  │ ← active
│  │  A short lede / description that sets     │   │ • The approach     │  │   (scroll-spy)
│  │  up the piece.                            │   │   – Step one       │  │
│  │                                         │   │   – Step two       │  │
│  │  ────────────────────────────────────    │   │ • Results          │  │
│  │  2026-06-14 · 12 min        Share [·][·] │   │ • Conclusion       │  │
│  │  ────────────────────────────────────    │   │ ···············    │  │  sticky
│  │                                         │   └────────────────────┘  │
│  │  ┌───────── cover image ──────────┐      │                          │
│  │  │            (optional)           │      │                          │
│  │  └─────────────────────────────────┘      │                          │
│  │                                         │                            │
│  │  ▸ On this page   (collapsible, <lg only)│                          │
│  │                                         │                            │
│  │  Serif prose body …                      │                          │
│  │  ┌── code (highlighted) ── [copy]⌷ ──┐    │                          │
│  │  │  fn plan(query) { … }              │    │                          │
│  │  └────────────────────────────────────┘    │                          │
│  │  ⓘ Callout: note / tip / warning         │                          │
│  │  ┌── mermaid diagram ──┐  math: ∑ … √     │                          │
│  │  … footnotes¹ …                          │                          │
│  │                                         │                            │
│  │  ════════════════════════════════════    │                          │
│  │  In this series:  Series Name             │  ← SeriesNav              │
│  │   1. Part one                            │                            │
│  │   2. Part two                            │                            │
│  │  ▶ 3. This part (current, highlighted)   │                            │
│  │   4. Part four                           │                            │
│  │  ════════════════════════════════════    │                          │
│  │  #tag  #tag  #tag              Share [·]  │  ← tags + share           │
│  │  ┌──────── AuthorCard ────────┐           │                          │
│  │  │ [av] Cannon Kalra          │           │                          │
│  │  │      one-line bio + links  │           │                          │
│  │  └────────────────────────────┘           │                          │
│  │  ┌── ← Older ──┐      ┌── Newer → ──┐     │  ← PrevNext               │
│  │  │ Prev title  │      │ Next title  │     │                          │
│  │  └─────────────┘      └─────────────┘     │                          │
│  │  Related reading                          │                          │
│  │   · Related post one                     │                          │
│  │   · Related post two                     │                          │
│  └──────────────────────────────────────────┘                          │
└───────────────────────────────────────────────────────────────────────┘
```

- **Top:** a reading-progress bar spans the very top of the viewport, filling as
  the reader scrolls.
- **Article column** (centered, ~68ch): a **"← All writing"** back link, an
  optional **series badge** (`Series Name · Part N`), the **H1 title** and
  **lede** from frontmatter, then a **meta + share row** (`date · reading time`
  … Share icons) bordered top and bottom. An **optional cover image** follows.
- On screens below `lg` a **collapsible "On this page"** `<details>` TOC sits
  just above the body.
- **Prose body** renders in **serif**. Rich content includes:
  **syntax-highlighted code** blocks with a copy button that appears on hover,
  **callouts**, **mermaid diagrams**, **math**, and **footnotes**.
- **Below the body**, in order: **SeriesNav** (ordered list of the series' parts
  with the current one highlighted), a **tags + share** row, an **AuthorCard**,
  **PrevNext** cards (older / newer), and a **"Related reading"** list.
- **Right rail:** a sticky **"On this page"** TOC with **scroll-spy** active
  states tracking the reader's position.

**Mobile:** the right rail disappears; its TOC becomes the collapsible
`<details>` above the body. The article column goes full-width; PrevNext cards
stack.

---

## 4. About (`/about`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   About                                                 │  H1
│                                                         │
│   Serif prose introduction to Cannon — background,      │  serif ¶¶
│   what he works on, and how he thinks about building     │
│   systems. A couple of paragraphs, unhurried.            │
│                                                         │
│   Experience                                            │  section head
│   ─────────────────────────────────────────────────     │
│   Senior Engineer            Company A       2023 – now │  role rows
│   Engineer                   Company B       2020 – 2023│
│   Engineer                   Company C       2018 – 2020│
│                                                         │
│   Elsewhere                                             │  section head
│   [ GitHub ] [ Twitter ] [ LinkedIn ] [ RSS ]           │  link chips
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Leads with a **serif prose intro** about Cannon.
- An **"Experience"** list renders one row per role: `position / company /
  period`.
- An **"Elsewhere"** group presents social links as **chips**.

**Mobile:** experience rows stack (position over company over period); chips wrap.

---

## 5. Projects (`/projects`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   Projects                                              │  H1
│   Things I've built and maintain.                       │  subtitle
│                                                         │
│   ┌───────────────────────┐  ┌───────────────────────┐  │
│   │ Project name          │  │ Project name          │  │  2-col grid
│   │ Short summary of what │  │ Short summary of what │  │
│   │ it does and why.      │  │ it does and why.      │  │
│   │ [Rust][SQL][gRPC]     │  │ [TS][Astro]           │  │  tech chips
│   └───────────────────────┘  └───────────────────────┘  │
│   ┌───────────────────────┐  ┌───────────────────────┐  │
│   │ Project name          │  │ Project name          │  │
│   │ …                     │  │ …                     │  │
│   │ [Go][K8s]             │  │ [Python]              │  │
│   └───────────────────────┘  └───────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **"Projects"** H1 with a short subtitle, then a responsive **2-column grid**
  of project cards. Each card shows the **name**, a **summary**, and **tech tag
  chips**.

**Mobile:** the grid collapses to a single column.

---

## 6. Tags index (`/tags`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   Tags                                                  │  H1
│                                                         │
│   [#databases 12] [#distributed 9] [#rust 7]            │  wrapped pills
│   [#astro 5] [#sql 5] [#observability 3] [#wal 2]       │
│   [#planning 2] [#storage 1] …                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **"Tags"** heading over a **wrapped set of tag pills**, each showing
  `#tag` and its **post count**. Pills link to the corresponding tag page.

**Mobile:** pills wrap naturally into fewer per row.

---

## 7. Tag page (`/tags/[tag]`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   ← All tags                                            │  back link
│                                                         │
│   #distributed                                          │  H1 (the tag)
│   9 posts                                               │  count
│                                                         │
│   ─────────────────────────────────────────────────     │
│   Post title                                            │  PostCard
│   Short description.                                     │
│   2026-06-14 · 9 min                                    │
│   ─────────────────────────────────────────────────     │
│   … more PostCards …                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- A **"← All tags"** back link, the **`#tag`** as an H1, a **count** of matching
  posts, then a **PostCard list** filtered to that tag (same card style as the
  blog index).

**Mobile:** standard single-column list.

---

## 8. Series index (`/series`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   Series                                                │  H1
│   Multi-part explorations of a single topic.            │  subtitle
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ ▤  Building a query planner            4 parts   │   │  series card
│   │     1. Parsing and binding        2026-05-01     │   │  ordered list
│   │     2. Logical plans              2026-05-20     │   │
│   │     3. Cost-based optimization    2026-06-14     │   │
│   │     4. Execution                  2026-07-02     │   │
│   └─────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────┐   │
│   │ ▤  Storage internals                  3 parts   │   │
│   │     1. …                          2026-…         │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **"Series"** H1 with a subtitle, then one **card per series**. Each card shows
  a **layers icon** (`▤`), the **series title**, a **part count**, and an
  **ordered numbered list** of its posts (`title + date`), each row linking to
  that post.

**Mobile:** cards go full-width; the numbered lists stack normally.

---

## 9. Series page (`/series/[slug]`)

### Desktop

```
┌───────────────── max-w-2xl, centered ──────────────────┐
│                                                         │
│   ← All series                                          │  back link
│                                                         │
│   ● Series                                              │  series badge
│   Building a query planner                              │  H1 (series name)
│   4 parts                                               │  count
│                                                         │
│   ─────────────────────────────────────────────────     │
│   Part 1 · Parsing and binding                          │  ordered
│   Short description.                                     │  PostCard list
│   2026-05-01 · 8 min                                    │
│   ─────────────────────────────────────────────────     │
│   Part 2 · Logical plans                                │
│   2026-05-20 · 10 min                                   │
│   ─────────────────────────────────────────────────     │
│   … remaining parts, in order …                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- A **"← All series"** back link, a **series badge**, the **series name** as an
  H1, and a **part count**, followed by the **ordered PostCard list** (parts in
  reading order).

**Mobile:** standard single-column list.

---

## 10. 404 (Not found)

### Desktop

```
┌─────────────────────── full width, centered ───────────────────────┐
│                                                                     │
│                                                                     │
│                              404                                    │  big
│                        Page not found                               │  H2
│                                                                     │
│        The page you're looking for doesn't exist or has moved.      │  message
│                                                                     │
│                 [ Home ]      [ Browse writing ]                    │  buttons
│                                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- A **vertically and horizontally centered** block: a large **"404"**, a
  **"Page not found"** heading, a short explanatory message, and two buttons —
  **Home** and **Browse writing**.

**Mobile:** buttons stack vertically; type scales down.

---

## 11. Search (modal)

Opened by the header **search button** or the **`/`** key. Implemented as a
native `<dialog>` overlaying the page, containing a **Pagefind** search UI.

### Desktop

```
░░░░░░░░░░░░░░░░░░░░ backdrop (dim) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░┌──────────────────── <dialog> ────────────────────┐░░░░░░░░░░░░░
░░░░░░░│  ⌕  Search…                                 Esc   │░░░░░░░░░░░░░
░░░░░░░├───────────────────────────────────────────────── ┤░░░░░░░░░░░░░
░░░░░░░│  Result title                                     │░░░░░░░░░░░░░
░░░░░░░│  …matched excerpt with highlight…                 │░░░░░░░░░░░░░
░░░░░░░│                                                   │░░░░░░░░░░░░░
░░░░░░░│  Result title                                     │░░░░░░░░░░░░░
░░░░░░░│  …matched excerpt…                                │░░░░░░░░░░░░░
░░░░░░░│                                                   │░░░░░░░░░░░░░
░░░░░░░│  (Pagefind renders live results as you type)      │░░░░░░░░░░░░░
░░░░░░░└───────────────────────────────────────────────────┘░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

- A centered **`<dialog>`** with a search input and a live **Pagefind** results
  list (titles + highlighted excerpts, each linking to the page).
- **Dismissal:** pressing **Escape** or clicking the **backdrop** closes the
  dialog and returns focus to the trigger.

**Mobile:** the dialog expands toward full-width (near full-screen) so the input
and results are easy to reach; behavior is otherwise identical.

---

_End of wireframes._
