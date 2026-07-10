import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/**
 * Injects `minutesRead` and `wordCount` into each entry's frontmatter so
 * they are available on `entry.data.astro.frontmatter` at build time.
 * Runs at build — no client cost.
 */
export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = toString(tree);
    const { minutes, words } = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = Math.max(1, Math.round(minutes));
    data.astro.frontmatter.wordCount = words;
  };
}
