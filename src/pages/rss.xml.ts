import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "@/config";
import { getPosts } from "@/lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.title} — Writing`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
      author: SITE.author,
    })),
    customData: `<language>${SITE.lang}</language>`,
    stylesheet: "/rss-styles.xsl",
  });
}
