// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import { remarkStripTitle } from "./src/lib/remark-strip-title.mjs";
import { remarkMermaid } from "./src/lib/remark-mermaid.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://cannonkalra.github.io",
  trailingSlash: "ignore",

  // Almost-zero client JS: prefetch links on hover for instant nav.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/drafts/"),
    }),
  ],

  markdown: {
    remarkPlugins: [
      remarkStripTitle,
      remarkMermaid,
      remarkReadingTime,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaHidden: "true",
            tabIndex: -1,
          },
          // Empty anchor — the visible "#" is drawn via CSS ::before so it
          // never leaks into the extracted heading text (and thus the TOC).
          content: [],
        },
      ],
    ],
    // Dual-theme syntax highlighting — warm, calm palette (Anthony Fu's
    // Vitesse). `defaultColor: false` emits CSS vars we switch in global.css.
    shikiConfig: {
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
      defaultColor: false,
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
