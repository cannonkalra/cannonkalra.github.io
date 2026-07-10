/**
 * Removes a leading level-1 heading from the document body.
 *
 * The page title is rendered from frontmatter (`title:`), so an Obsidian author
 * can keep a natural `# Title` at the top of their note without it appearing
 * twice on the published page. Only the FIRST node is considered, and only if
 * it is an h1 — inline `#` headings deeper in the doc are untouched.
 */
export function remarkStripTitle() {
  return (tree) => {
    const first = tree.children?.[0];
    if (first && first.type === "heading" && first.depth === 1) {
      tree.children.shift();
    }
  };
}
