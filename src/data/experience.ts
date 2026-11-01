import type { ExperienceItem } from "@/types";

/** Dates are exactly as supplied. The two current roles overlap by design. */
export const experience: ExperienceItem[] = [
  {
    company: "SEOPage1",
    role: "Project Manager",
    start: "November 2024",
    end: "Present",
    kind: "management",
    summary: "Central project management role, from discovery to post-launch support.",
    highlights: [
      "Successfully managed 400+ website development projects.",
      "Led cross-functional teams of designers, developers, and QA engineers.",
      "Managed projects from discovery through deployment and post-launch support.",
      "Improved project delivery through effective planning, prioritization, and stakeholder communication.",
      "Maintained high standards of quality while ensuring on-time project completion.",
    ],
  },
  {
    company: "Freelance — Fiverr & Private Clients",
    role: "Senior Web Developer & Technical Consultant",
    start: "January 2016",
    end: "Present",
    kind: "development",
    summary: "Independent web development and technical consulting for businesses worldwide.",
    highlights: [
      "Delivered 2,300+ web development projects across Fiverr and private clients.",
      "Earned 1,700+ verified Fiverr reviews.",
      "Designed and developed WordPress, Shopify, WooCommerce, Webflow, Wix, and custom PHP websites.",
      "Managed website migrations, hosting, DNS, SSL, and server configurations.",
      "Built long-term relationships with businesses worldwide through ongoing technical support.",
    ],
  },
  {
    company: "Creativeers",
    role: "Web Developer",
    start: "September 2015",
    end: "June 2016",
    kind: "development",
    summary: "Early-career development role working alongside designers and senior developers.",
    highlights: [
      "Developed responsive websites and custom web applications.",
      "Assisted with deployments, maintenance, and server configuration.",
      "Worked closely with designers and senior developers to deliver client projects.",
    ],
  },
];
