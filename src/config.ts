/**
 * Single source of truth for site-wide metadata, navigation and socials.
 * Keep this small — content lives in src/content, not here.
 */
export const SITE = {
  title: "Cannon Kalra",
  /** Used for the <title> template: `Page — Cannon Kalra`. */
  titleTemplate: "%s — Cannon Kalra",
  description:
    "Engineering essays on data platforms, distributed systems, and the craft of building reliable software at scale.",
  url: "https://cannonkalra.github.io",
  author: "Cannon Kalra",
  authorSlug: "cannon",
  lang: "en",
  locale: "en_US",
  /** Posts shown per page on the blog index. */
  postsPerPage: 8,
} as const;

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Writing", href: "/blog" },
  { label: "Series", href: "/series" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export const SOCIAL_LINKS: { label: string; href: string; icon: string }[] = [
  { label: "GitHub", href: "https://github.com/cannonkalra", icon: "github" },
  { label: "Twitter", href: "https://twitter.com/cannonkalra", icon: "twitter" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cannonkalra",
    icon: "linkedin",
  },
  { label: "RSS", href: "/rss.xml", icon: "rss" },
];

/** Real-world experience — surfaced on /about and the home page. */
export const EXPERIENCE: {
  company: string;
  position: string;
  period: string;
}[] = [
  { company: "Teleparty", position: "Lead Data Engineer", period: "2024 — Now" },
  {
    company: "Consulting / Advisory",
    position: "Cloud Solutions Architect",
    period: "2023 — Now",
  },
  { company: "Solulever", position: "Platform Lead", period: "2020 — 2023" },
  { company: "Elucidata", position: "Technical Lead", period: "2022 — 2023" },
  { company: "FutureSoft", position: "Software Engineer", period: "2019 — 2020" },
];
