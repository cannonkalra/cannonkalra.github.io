/** A single entry in a table of contents, nested by heading depth. */
export interface TocItem {
  depth: number;
  slug: string;
  text: string;
  children: TocItem[];
}

/** Astro's `MarkdownHeading` shape (from `render()`). */
export interface MarkdownHeading {
  depth: number;
  slug: string;
  text: string;
}
