# Contributing & Authoring Guide

This blog is authored in **Obsidian** (or any Markdown editor). Posts are plain
`.md` / `.mdx` files under `src/content/blog/`. This guide is the contract
between what you write and what the site renders.

## Adding a post

1. Copy [`templates/blog-post.md`](templates/blog-post.md) into
   `src/content/blog/`.
2. Fill in the frontmatter (below).
3. Write the body. Preview with `pnpm dev`.

The **URL slug comes from the filename**, slugified: spaces, capitals, and
punctuation are normalized. `Part 1 - Point Lookups.md` →
`/blog/part-1-point-lookups`. Rename the file to change the URL.

## Frontmatter reference

Frontmatter is intentionally **flat** so it maps directly onto Obsidian's
properties editor. Empty fields are ignored — you can leave any optional field
blank without breaking the build.

| Field         | Type            | Required | Notes                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------- |
| `title`       | string          |   yes    | Rendered as the H1. Don't repeat it as `#` in the body.               |
| `description` | string          |   yes    | Listing text, meta description, and social card. ≤ ~240 chars.        |
| `date`        | `YYYY-MM-DD`    |  yes\*   | Publish date. \*Required for published posts; drafts may omit it.     |
| `updated`     | `YYYY-MM-DD`    |    no    | Shows an "Updated …" note.                                            |
| `tags`        | list of strings |    no    | `tags: [storage, lsm-tree]`. Powers `/tags`.                          |
| `draft`       | boolean         |    no    | `true` hides the post in production (visible in `pnpm dev`).          |
| `featured`    | boolean         |    no    | `true` surfaces the post on the home page.                            |
| `series`      | string          |    no    | Series name (`Why Data Structures Exist`) or slug — either works.     |
| `part`        | number          |    no    | Position within the series (1-based). Used with `series`.             |
| `author`      | string          |    no    | Author id (defaults to `cannon` → `src/content/authors/cannon.json`). |
| `cover`       | image path      |    no    | Optional hero image (optimized at build).                             |
| `coverAlt`    | string          |    no    | Alt text for the cover.                                               |

### Series

Give every post in a series the same `series:` value and a distinct `part:`:

```yaml
series: Why Every Data Structure Exists
part: 2
```

The display name and `/series/<slug>` URL are derived automatically. A slug like
`why-every-data-structure-exists` is title-cased for display; a human name like
`Why Every Data Structure Exists` is used as-is and slugified for the URL.

### Drafts

Put work-in-progress in `src/content/blog/drafts/` and/or set `draft: true`.
Drafts are visible while running `pnpm dev`, and excluded from the production
build, the sitemap, RSS, and search.

## What renders in the body

Plain Markdown (`.md`) supports everything below — no imports needed:

- **Headings** — `##` / `###` build the table of contents and get anchor links.
- **Code** — fenced blocks are highlighted by Shiki (light + dark):
  <pre>```python
  def f(): ...
  ```</pre>
  A copy button appears on hover.
- **Diagrams** — fenced ` ```mermaid ` blocks render as diagrams (the Mermaid
  runtime loads lazily, only on pages that have one).
- **Math** — inline `$O(\log n)$` and display `$$ … $$` via KaTeX.
- **Footnotes** — `text[^1]` … `[^1]: definition`. Collected at the article end.
- **Tables, blockquotes, lists, images** — all styled by the prose system. Place
  images next to the post and reference them relatively for build-time optimization.

### Callouts (MDX only)

For admonitions, author the post as `.mdx` and use the `Callout` component:

```mdx
import Callout from "@/components/Callout.astro";

<Callout type="warning" title="Careful">
  Body text here.
</Callout>
```

Types: `note`, `tip`, `warning`, `danger`. (If you'd prefer Obsidian's native
`> [!note]` callout syntax to work in plain `.md`, that can be enabled — ask.)

## Authors

Add `src/content/authors/<id>.json`:

```json
{
  "name": "Jane Doe",
  "title": "Staff Engineer",
  "bio": "One or two sentences.",
  "social": { "twitter": "jane", "github": "jane", "linkedin": "jane" }
}
```

Reference it with `author: <id>` in a post's frontmatter.

## Code conventions

- **Strict TypeScript.** Run `pnpm check` before committing; keep it at 0 errors.
- **Components stay small and single-purpose.** Prefer a new `.astro` component
  over duplicating markup.
- **No client framework.** Reach for a tiny vanilla `<script>` only when a
  feature genuinely needs interactivity, and load it only where used.
- **Design tokens over magic values.** Use the CSS variables / Tailwind tokens
  defined in `src/styles/global.css` (`bg-bg`, `text-muted`, `border`, …) rather
  than hard-coded colors, so light/dark and future retheming stay consistent.

## Before you open a PR

```bash
pnpm check      # types
pnpm build      # full static build + search index
```

Both should pass cleanly.
