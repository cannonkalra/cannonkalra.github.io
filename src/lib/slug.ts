/** URL-safe slug from any string. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Turn a slug back into a Title Case display name, e.g. `lsm-trees` → `Lsm Trees`. */
export function titleCaseFromSlug(slug: string): string {
  return slug
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Normalize a `series:` frontmatter value (which may be a human name like
 * "Why Data Structures Exist" or a slug like "why-data-structures-exist")
 * into both a display name and a URL slug.
 */
export function normalizeSeries(value: string): { name: string; slug: string } {
  const looksHuman = /[A-Z]/.test(value) || /\s/.test(value);
  return {
    name: looksHuman ? value : titleCaseFromSlug(value),
    slug: slugify(value),
  };
}
