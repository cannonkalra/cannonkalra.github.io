import type { MarkdownHeading, TocItem } from "@/types";

/**
 * Builds a nested table of contents from a flat heading list.
 * Only h2/h3 are included by default — deeper levels add noise to the rail.
 */
export function buildToc(
  headings: MarkdownHeading[],
  { minDepth = 2, maxDepth = 3 } = {},
): TocItem[] {
  const root: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const h of headings) {
    if (h.depth < minDepth || h.depth > maxDepth) continue;
    const item: TocItem = { ...h, children: [] };

    while (stack.length && stack[stack.length - 1].depth >= h.depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }
    stack.push(item);
  }
  return root;
}
