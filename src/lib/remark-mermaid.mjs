import { visit } from "unist-util-visit";

/**
 * Converts fenced ```mermaid code blocks — the Obsidian-native way to write
 * diagrams — into a placeholder element that the client-side Mermaid renderer
 * (MermaidScript.astro) upgrades on load.
 *
 * Running at the remark (mdast) stage means the block is turned into raw HTML
 * BEFORE Shiki highlighting sees it, so it never gets syntax-highlighted as
 * text. Pages without a diagram ship no Mermaid JS.
 */
export function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index === null) return;
      const escaped = node.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
      const html = `<figure class="mermaid-figure my-8 full-bleed"><div class="mermaid grid min-h-24 place-items-center overflow-x-auto rounded-lg border border-border bg-bg-subtle p-4" data-mermaid="${escaped}"><span class="font-sans text-sm text-faint">Rendering diagram…</span></div></figure>`;
      parent.children[index] = { type: "html", value: html };
    });
  };
}
