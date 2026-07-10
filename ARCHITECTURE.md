# Architecture

How this blog is built, and the reasoning behind each decision. The guiding
constraint throughout: **ship a static, fast, accessible reading experience with
as little client JavaScript as possible.**

## Principles

1. **Static by default.** Every route is pre-rendered at build time. There is no
   server runtime; the output is plain HTML/CSS/assets served from GitHub Pages.
2. **Near-zero JS.** No UI framework. HTML + CSS do the work; small vanilla
   scripts add progressive enhancement and are loaded only where used.
3. **Content is data.** Posts are typed content-collection entries validated by a
   Zod schema. Pages derive everything from that data through pure helpers.
4. **Author-friendly.** The authoring surface (frontmatter + Markdown) is tuned
   for Obsidian; complexity lives in the pipeline, not in the author's file.

## Rendering pipeline

```
Markdown/MDX (src/content/blog)
   │
   ├─ remark: strip-title → mermaid → reading-time → math (KaTeX)
   ├─ rehype: KaTeX → slug → autolink-headings
   └─ Shiki: dual-theme (vitesse-light / vitesse-dark), CSS-var switched
   │
   ▼
Astro components / layouts  →  static HTML  →  dist/
   │
   └─ post-build: Pagefind indexes dist/ → dist/pagefind
```

### remark plugins (`src/lib/*.mjs`)

- **`remark-strip-title`** — removes a leading `# H1` so an Obsidian author can
  keep a natural title line without it duplicating the frontmatter title.
- **`remark-mermaid`** — rewrites ` ```mermaid ` fences into diagram
  placeholders *before* Shiki runs, so they render as diagrams (not highlighted
  text). The Obsidian-native way to write diagrams "just works."
- **`remark-reading-time`** — injects `minutesRead`/`wordCount` into frontmatter
  at build. (Listings compute reading time directly from the body for zero extra
  cost — see `lib/posts.ts`.)

### rehype plugins

- **`rehype-katex`** renders `remark-math` output to KaTeX HTML (self-hosted CSS
  + fonts; no runtime math JS).
- **`rehype-slug`** + **`rehype-autolink-headings`** add ids and hover-reveal `#`
  anchors. The anchor content is empty and the `#` is drawn via CSS `::before`,
  so it never leaks into the extracted heading text (which would pollute the TOC).

### Syntax highlighting

Shiki runs at build with **both** Vitesse light and dark themes
(`defaultColor: false`). Each token carries `--shiki-light`/`--shiki-dark` CSS
variables; `global.css` selects light by default and dark under `.dark`. Result:
theme-accurate code with **no client highlighting JS** and instant theme switching.

## Content model

`src/content.config.ts` defines two collections via the Astro **content layer**
(`glob` loader):

- **`blog`** — `.md`/`.mdx`. The schema is authored flat (Obsidian-friendly) and
  a Zod `.transform()` normalizes it into the richer internal shape the
  components consume:

  | Authored (flat)          | Internal (normalized)                         |
  | ------------------------ | --------------------------------------------- |
  | `date`                   | `pubDate`                                     |
  | `updated`                | `updatedDate`                                 |
  | `series` + `part`        | `series: { name, slug, order }`               |

  A top-level `stripEmpty` preprocess turns blank YAML values (`null`, `""`,
  empty arrays) into "not provided," so any optional field can be left empty.

  **Slugs come from the filename**, not the frontmatter: the loader's
  `generateId` slugifies the basename, so Obsidian filenames with spaces/capitals
  produce clean URLs and nested folders (e.g. `drafts/`) don't leak into the path.

- **`authors`** — JSON profiles referenced by `author` id.

### Draft handling

`lib/posts.ts#getPosts()` filters `draft` posts out **except in dev**
(`import.meta.env.DEV`). Because every listing, `getStaticPaths`, the sitemap,
RSS, and the search index all source from `getPosts()`, drafts are consistently
hidden in production from one switch.

## Data helpers (`src/lib/`)

Pure functions, no side effects — the "model" layer between content and views:

- **`posts.ts`** — `getPosts`, `getFeaturedPosts`, `getTags`, `getPostsByTag`,
  `getSeries`, `getAdjacentPosts` (prev/next), `getRelatedPosts` (tag overlap),
  `readingTime`.
- **`toc.ts`** — builds a nested table of contents from Astro's flat `headings`.
- **`slug.ts`** — `slugify`, `titleCaseFromSlug`, `normalizeSeries`.
- **`format.ts`** — date formatting (`formatDate`, `formatMonth`, `isoDate`).

## Routing

```
/                         index.astro            Home
/blog                     blog/index.astro       Page 1 of writing
/blog/page/[page]         blog/page/[page].astro Pages 2..N (paginate())
/blog/[slug]              blog/[slug].astro      Article (render() → PostLayout)
/tags                     tags/index.astro       All tags
/tags/[tag]               tags/[tag].astro        Posts for a tag
/series                   series/index.astro     All series
/series/[series]          series/[series].astro  Posts in a series
/about, /projects         about.astro, projects.astro
/og/[...route].png        OG image per post + a default card
/rss.xml, /robots.txt     endpoints
/404                      404.astro
```

Pagination uses a separate `/blog/page/[page]` route (page 1 lives at `/blog`) to
avoid colliding with the `/blog/[slug]` post route.

## Layouts & components

- **`BaseLayout`** — the shell: `<head>` (via `BaseHead`), pre-paint theme
  script, skip link, header, footer, search dialog. `wide` prop widens `<main>`
  for the article's TOC rail.
- **`PostLayout`** — the article: reading progress, header (series/title/lede/
  meta/share), cover, mobile + sticky desktop TOC, prose body, series nav, tags,
  author card, prev/next, related posts, and the copy-button + mermaid scripts.
- **Components** are small and single-purpose (`Icon`, `PostCard`, `PostMeta`,
  `Tag`, `TableOfContents`, `ReadingProgress`, `Callout`, `Mermaid`,
  `ShareLinks`, `Pagination`, `PrevNext`, `SeriesNav`, `AuthorCard`, `Search`).

## Client JavaScript budget

Every interactive feature is a discrete, lazy script:

| Feature            | Cost                                                        |
| ------------------ | ---------------------------------------------------------- |
| Theme (no-flash)   | Tiny inline script in `<head>`, runs before paint          |
| Theme toggle       | A few lines; toggles `.dark`, persists to localStorage     |
| Search             | Pagefind UI + index fetched **on first open** only         |
| Copy code          | One listener per code block, added on load                 |
| Reading progress   | One passive scroll listener on article pages               |
| TOC scroll-spy     | `IntersectionObserver` on headings                         |
| Mermaid            | ~500 kB, imported **only** when a diagram is on the page   |

Pages with no diagram, no code, and no search interaction ship effectively no JS.

## SEO & metadata

`BaseHead` centralizes canonical URLs, OpenGraph + Twitter cards, and JSON-LD
(`BlogPosting` for articles, `WebSite` otherwise). OG images are generated at
build by `astro-og-canvas` (`/og/<slug>.png`), with a `/og/default.png` fallback.
`@astrojs/sitemap` emits the sitemap (drafts filtered); `robots.txt` and
`rss.xml` are endpoints.

## Build & deploy

`pnpm build` = `astro build && pagefind --site dist`. Pagefind must run *after*
Astro so it can index the emitted HTML (scoped to article bodies via
`data-pagefind-body`, with chrome marked `data-pagefind-ignore`). GitHub Actions
(`withastro/action`, `build-command: pnpm run build`) publishes `./dist` to
Pages on a `v*.*.*` tag or manual dispatch.

## Notable trade-offs

- **Mermaid renders client-side**, not at build. Build-time SVG rendering needs a
  headless browser (Playwright), which is heavy and brittle in CI. Client
  rendering keeps the build simple and lets diagrams re-theme on dark-mode toggle;
  the cost is paid only on pages that actually contain a diagram.
- **Search doesn't work in `pnpm dev`.** Pagefind indexes the built output, which
  doesn't exist in dev. The dialog degrades gracefully with a note; use
  `pnpm build && pnpm preview` to test search.
- **Bespoke prose CSS** instead of `@tailwindcss/typography` — more code, but full
  control over the editorial reading surface (measure, rhythm, footnotes, code).
