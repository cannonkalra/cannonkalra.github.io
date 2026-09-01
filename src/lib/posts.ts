import { getCollection, type CollectionEntry } from "astro:content";
import getReadingTime from "reading-time";
import { slugify } from "./slug";

export { slugify };
export type Post = CollectionEntry<"blog">;

/** In production, drafts are hidden; in dev they remain visible. */
const includeDrafts = import.meta.env.DEV;

/** Posts filed under `src/content/blog/drafts/` are drafts, `draft:` frontmatter or not. */
const isDraft = (post: Post) =>
  Boolean(post.data.draft) || /(^|\/)drafts\//.test(post.filePath ?? "");

/** All publishable posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    (post) => includeDrafts || !isDraft(post),
  );
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Featured posts (newest first), for the home page. */
export async function getFeaturedPosts(): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.data.featured);
}

/** Estimated reading time computed from the raw body — no render needed. */
export function readingTime(post: Post): number {
  return Math.max(1, Math.round(getReadingTime(post.body ?? "").minutes));
}

/** Tag → count, sorted by frequency then alphabetically. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.data.tags.includes(tag));
}

export type Series = { name: string; slug: string; posts: Post[] };

/** Posts grouped by series, each ordered by the `series.order` field. */
export async function getSeries(): Promise<Series[]> {
  const posts = await getPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    const name = post.data.series?.name;
    if (!name) continue;
    if (!map.has(name)) map.set(name, []);
    map.get(name)!.push(post);
  }
  return [...map.entries()].map(([name, entries]) => ({
    name,
    slug: entries[0].data.series!.slug,
    posts: entries.sort(
      (a, b) => (a.data.series!.order ?? 0) - (b.data.series!.order ?? 0),
    ),
  }));
}

export async function getSeriesByName(name: string): Promise<Series | undefined> {
  return (await getSeries()).find((s) => s.name === name);
}

/**
 * Chronological neighbours for prev/next navigation.
 * `prev` is the older post, `next` the newer — reading order.
 */
export async function getAdjacentPosts(
  current: Post,
): Promise<{ prev?: Post; next?: Post }> {
  const posts = await getPosts();
  const i = posts.findIndex((p) => p.id === current.id);
  if (i === -1) return {};
  return { next: posts[i - 1], prev: posts[i + 1] };
}

/** Up to `limit` posts sharing the most tags with `current`. */
export async function getRelatedPosts(
  current: Post,
  limit = 3,
): Promise<Post[]> {
  const posts = await getPosts();
  const currentTags = new Set(current.data.tags);
  return posts
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}
