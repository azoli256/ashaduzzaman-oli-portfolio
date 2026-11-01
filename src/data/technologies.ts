import type { TechGroup } from "@/types";

/**
 * Groups with `confirmed: false` are NOT rendered publicly.
 * OWNER TO CONFIRM: fill `items` for the groups below, then set confirmed: true.
 * Do not add tools that are not used professionally.
 */
export const technologies: TechGroup[] = [
  {
    title: "Website Development",
    description: "Platforms and languages used to build and maintain client websites.",
    items: ["WordPress", "Shopify", "WooCommerce", "Webflow", "Wix", "PHP"],
    confirmed: true,
  },
  {
    title: "Hosting & Infrastructure",
    description: "The technical layer behind a reliable launch.",
    items: ["Hosting setup", "DNS configuration", "SSL configuration", "Server configuration", "Website migration"],
    confirmed: true,
  },
  {
    title: "Project Management",
    description: "Tools used to plan, track and coordinate delivery.",
    items: [], // OWNER TO CONFIRM
    confirmed: false,
  },
  {
    title: "Digital Marketing",
    description: "Platforms and disciplines in digital marketing projects.",
    items: [], // OWNER TO CONFIRM (e.g. SEO, Google Ads, Meta Ads, lead generation, analytics)
    confirmed: false,
  },
  {
    title: "AI & Productivity",
    description: "AI-assisted tools used day to day.",
    items: [], // OWNER TO CONFIRM
    confirmed: false,
  },
];

/** Shown as a low-key, factual note about delivery of digital marketing projects. */
export const marketingNote =
  "Digital marketing projects (such as SEO, Google Ads, Meta Ads and lead generation initiatives) sit within the wider digital delivery work, coordinated alongside web development.";

/**
 * Digital marketing project areas shown in the Expertise section.
 * OWNER TO CONFIRM the exact areas; remove any that do not apply.
 * No results, budgets or campaign outcomes are claimed anywhere on the site.
 */
export const marketingAreas = [
  "SEO project coordination",
  "Google Ads projects",
  "Meta Ads projects",
  "Lead generation initiatives",
  "Campaign coordination",
];
