import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Cannon Kalra — Mobile & Web Developer",
  author: "Cannon Kalra",
  description:
    "Platform engineer based in Bangalore, India. I work on data engineering systems that power analytics, experimentation, and real-time decision-making.",
  lang: "en",
  siteLogo: "/cannon-sm.webp",
  navLinks: [
    { text: "Experience", href: "#experience" },
    // { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "Twitter", href: "https://twitter.com/cannonkalra" },
    { text: "LinkedIn", href: "https://www.linkedin.com/in/cannonkalra" },
    { text: "Github", href: "https://github.com/cannonkalra" },
    // { text: "Youtube", href: "https://github.com/immois/astro-zen" },
    // { text: "Dribbble", href: "https://github.com/immois/astro-zen" },
  ],
  socialImage: "/zen-og.webp",
  canonicalURL: "https://astro-zen.vercel.app",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Cannon Kalra",
    specialty: "Software Engineer",
    summary:
      "Platform engineer based in Bangalore, India. I work on data engineering systems that power analytics, experimentation, and real-time decision-making.",
    email: "cannonkalra@gmail.com",
  },
  experience: [
    {
      company: "Teleparty",
      position: "Lead Data Engineer",
      startDate: "Jun 2024",
      endDate: "Present",
      summary: [
        "Architected a multi-tenant data lakehouse using Apache Iceberg and Athena, integrating real-time and batch pipelines processing over 2B+ events per month. This enabled scalable analytics and experimentation while maintaining strong cost and performance guarantees.",
        "Led the modernization of legacy batch frameworks using PySpark and Airflow, achieving 10× throughput improvements and reducing operational costs by 35%. Established data quality checks, SLA definitions, and observability standards to ensure reliable data availability across dashboards and BI systems.",
        "Partnered closely with product and data science teams to make engagement metrics queryable in near real time, directly supporting experimentation, retention analysis, and data-driven product decisions.",
      ],
    },
    {
      company: "Consulting / Advisory",
      position: "Cloud Solutions Architect",
      startDate: "Mar 2023",
      endDate: "Present",
      summary: [
        "Designed cross-domain batch and streaming reference architectures for startups and SaaS clients, covering ingestion, processing, governance, and analytics layers. Helped teams transition from fragmented ETL setups to scalable, cloud-native data platforms.",
        "Implemented infrastructure-as-code and observability frameworks using Terraform, Helm, and modern monitoring stacks, unifying deployment, monitoring, and data quality across environments. Mentored engineering teams on cloud automation, cost optimization, and pipeline performance best practices.",
      ],
    },
    {
      company: "Solulever",
      position: "Platform Lead",
      startDate: "Jan 2020",
      endDate: "Sep 2023",
      summary: [
        "Designed and scaled a real-time industrial IoT platform processing 2M+ telemetry messages, enabling predictive maintenance across global factory deployments. Built a metadata-driven ingestion framework to unify machine telemetry, quality, and production data for analytics.",
        "Collaborated with engineering and operations teams to identify system and process bottlenecks, improving equipment uptime by 20% and operational efficiency by 15%. Championed hybrid streaming-batch (Kappa-style) architectures for seamless analytics and replayability.",
      ],
    },
    {
      company: "Elucidata",
      position: "Technical Lead",
      startDate: "Mar 2022",
      endDate: "Jan 2023",
      summary: [
        "Led engineering for a 300TB+ biomedical data lake, consolidating multiple data domains to support analytics and AI-assisted discovery workflows. Unified PySpark-based ETL pipelines under centralized Airflow orchestration, reducing execution time by 40%.",
        "Drove data governance initiatives including lineage, cataloging, and auditability to ensure compliance with SOC2 and GDPR requirements. Worked closely with research and product teams to translate complex bioinformatics data into accessible, high-performance analytical datasets.",
      ],
    },
    {
      company: "FutureSoft",
      position: "Software Engineer",
      startDate: "Jul 2019",
      endDate: "Jan 2020",
      summary: [
        "Re-architected backend services supporting 3,000+ connected IoT devices, reducing latency and improving release velocity by 30%. Built firmware delivery and telemetry tracking pipelines to enable predictive diagnostics and faster maintenance cycles.",
      ],
    },
  ],
  projects: [
    {
      name: "Spotifu Music",
      summary: "A music streaming app that emulates Spotify's core features.",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/spotifu.png",
    },
    {
      name: "Shopp App",
      summary: "An e-commerce platform that replicates Shopify's key features.",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/shopify-clon.png",
    },
    {
      name: "ClonTagram",
      summary: "A social network that replicates the features of Instagram",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/clone-ig.png",
    },
  ],
  about: {
    description: `
      Hi, I’m a platform engineer with 9+ years of experience building large-scale, production-grade data systems across startups and high-growth teams. I design reliable, cost-efficient data platforms that power analytics, experimentation, and real-time decision-making. 
      I’ve led multi-tenant lakehouse and streaming architectures processing billions of events, modernized legacy systems for 10× performance gains, and set data quality and observability standards across organizations.
    `,
    image: "/cannon-lg.webp",
  },
};
