import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { SITE } from "@/config";

const posts = await getCollection(
  "blog",
  ({ data }) => import.meta.env.DEV || !data.draft,
);

// One card per post + a site-wide default (referenced by non-article pages).
const pages: Record<string, { title: string; description: string }> = {
  default: { title: SITE.title, description: SITE.description },
};
for (const post of posts) {
  pages[post.id] = {
    title: post.data.title,
    description: post.data.description,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: undefined,
    bgGradient: [
      [26, 25, 23],
      [35, 33, 32],
    ],
    border: { color: [138, 166, 240], width: 12, side: "inline-start" },
    padding: 72,
    font: {
      title: {
        color: [233, 229, 221],
        size: 64,
        lineHeight: 1.2,
        weight: "SemiBold",
      },
      description: {
        color: [162, 156, 144],
        size: 30,
        lineHeight: 1.4,
      },
    },
  }),
});
