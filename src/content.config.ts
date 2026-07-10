import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { slugify, normalizeSeries } from "./lib/slug";

/**
 * Strip blank frontmatter values so an Obsidian author can leave any field
 * empty (`series:` with no value → YAML `null`) without failing validation.
 * Empty strings, `null`, and empty arrays all become "not provided".
 */
const stripEmpty = (obj: unknown) => {
  if (!obj || typeof obj !== "object") return obj;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const blank =
      v === null || v === "" || (Array.isArray(v) && v.length === 0);
    if (!blank) out[k] = v;
  }
  return out;
};

/**
 * Blog posts, authored in Obsidian as plain `.md` / `.mdx`.
 *
 * The frontmatter is intentionally FLAT so it maps cleanly onto Obsidian's
 * properties editor (no nested objects):
 *
 *   title, description, date, updated?, tags, draft?, featured?,
 *   series?, part?, author?, cover?, coverAlt?, ogImage?
 *
 * A `.transform()` normalizes this authoring shape into the richer internal
 * shape the components consume (`pubDate`, `updatedDate`, `series.{name,slug,order}`),
 * so authors get a simple surface while the code keeps structured data.
 */
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    // Obsidian filenames have spaces/capitals; derive a clean URL slug from
    // the basename so `Part 1 - Point Lookups.md` → `part-1-point-lookups`.
    generateId: ({ entry }) => {
      const base = entry.split("/").pop() ?? entry;
      return slugify(base.replace(/\.[^.]+$/, ""));
    },
  }),
  schema: ({ image }) =>
    z.preprocess(
      stripEmpty,
      z
      .object({
        title: z.string().max(140),
        description: z.string().max(240),
        /** Publish date (YYYY-MM-DD). Optional for drafts. */
        date: z.coerce.date().optional(),
        /** Last-updated date, shown as "Updated …". */
        updated: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        /** Series name or slug — either works. */
        series: z.string().optional(),
        /** 1-based position within the series. */
        part: z.number().int().positive().optional(),
        author: z.string().default("cannon"),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        ogImage: z.string().optional(),
      })
      .transform((data) => ({
        ...data,
        // Undated drafts fall back to build time so nothing crashes; published
        // posts should always carry an explicit `date`.
        pubDate: data.date ?? new Date(),
        updatedDate: data.updated,
        series: data.series
          ? { ...normalizeSeries(data.series), order: data.part ?? 1 }
          : undefined,
      })),
    ),
});

/** Author profiles (JSON), referenced by `author` slug on each post. */
const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string().optional(),
      bio: z.string(),
      avatar: image().optional(),
      url: z.string().url().optional(),
      social: z
        .object({
          twitter: z.string().optional(),
          github: z.string().optional(),
          linkedin: z.string().optional(),
        })
        .partial()
        .optional(),
    }),
});

export const collections = { blog, authors };
