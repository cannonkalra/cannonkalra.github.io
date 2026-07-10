import type { APIContext } from "astro";
import { SITE } from "@/config";

export function GET(context: APIContext) {
  const sitemapURL = new URL("/sitemap-index.xml", context.site ?? SITE.url);
  const body = `User-agent: *
Allow: /
Disallow: /drafts/

Sitemap: ${sitemapURL.href}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
