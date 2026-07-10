# cannonkalra.github.io

A calm, minimal, editorial technical blog — built for **beautiful reading first**.
Static, fast, and authored in Obsidian.

> Typography > Effects · Whitespace > Decoration · Content > UI · Speed > Features · Simplicity > Cleverness

## Stack

| Concern            | Choice                                                            |
| ------------------ | ---------------------------------------------------------------- |
| Framework          | [Astro 5](https://astro.build) (static output, near-zero JS)     |
| Styling            | Tailwind CSS 4 (via `@tailwindcss/vite`) + a token design system |
| Content            | Markdown / MDX content collections                               |
| Types              | TypeScript (strict)                                              |
| Search             | [Pagefind](https://pagefind.app) (static, post-build index)      |
| Syntax highlight   | Shiki (dual Vitesse light/dark themes)                           |
| Math               | remark-math + KaTeX                                              |
| Diagrams           | Mermaid (lazy client island — only loads on pages that use it)   |
| OG images          | `astro-og-canvas` (generated at build)                           |
| Fonts              | Inter · Newsreader · JetBrains Mono (self-hosted, variable)      |

No React. No client framework. Interactive bits (theme toggle, search, copy
buttons, reading progress, scroll-spy TOC, mermaid) are small vanilla scripts,
loaded only where needed.

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:4321  (drafts are visible in dev)
pnpm build        # astro build + pagefind index → ./dist
pnpm preview      # serve the production build locally
pnpm check        # astro check (types + template diagnostics)
```

## Writing a post (Obsidian workflow)

1. Copy [`templates/blog-post.md`](templates/blog-post.md) into
   `src/content/blog/` (a subfolder is fine — the URL slug is derived from the
   **filename**, so `Part 1 - Point Lookups.md` → `/blog/part-1-point-lookups`).
2. Fill in the frontmatter (see [CONTRIBUTING.md](CONTRIBUTING.md) for the full
   field reference). Keep it flat — it maps 1:1 onto Obsidian's properties panel.
3. Write. A top-level `# Title` is optional and auto-stripped (the title comes
   from frontmatter). `##`/`###` build the table of contents.
4. `draft: true` hides a post from production (still visible in `pnpm dev`).

Everything an Obsidian author expects works out of the box: fenced code,
` ```mermaid ` diagrams, `$math$`, footnotes, tables, and images.

## Project structure

```
src/
  components/      Small, single-purpose Astro components
  layouts/         BaseLayout (shell) · PostLayout (article)
  pages/           Routes (home, blog, tags, series, about, projects, rss, og…)
  content/
    blog/          Posts (.md / .mdx). blog/drafts/ for work-in-progress
    authors/       Author profiles (JSON)
  lib/             Data helpers (posts, toc, slug, format) + remark plugins
  styles/          global.css — the design token system + prose styles
  config.ts        Site metadata, nav, socials
templates/         Obsidian post template
```

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — how it's built and why
- [DESIGN.md](DESIGN.md) — the design system + research behind it
- [WIREFRAMES.md](WIREFRAMES.md) — every page's layout
- [CONTRIBUTING.md](CONTRIBUTING.md) — authoring & frontmatter reference

## Deploy

Published to GitHub Pages via `.github/workflows/deploy.yml` on a `v*.*.*` tag
(or manual dispatch). The workflow runs `pnpm build`, which builds the site
**and** the Pagefind search index, then publishes `./dist`.

## License

Content © Cannon Kalra. Code is provided as-is.
