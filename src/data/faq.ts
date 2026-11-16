import { profile } from "@/data/profile";

export type Faq = { q: string; a: string };

/**
 * Every answer restates facts already published elsewhere on this site (profile, experience, expertise).
 * No pricing, turnaround or availability claims. The same text feeds the visible accordion and the FAQPage JSON-LD.
 */
export const faqs: Faq[] = [
  {
    q: "Who is Ashaduzzaman Oli?",
    a: `${profile.name} is a Digital Project Manager and Web Development Professional based in ${profile.publicLocation}, with 11+ years of experience delivering digital solutions for businesses worldwide. He has worked as a Project Manager at SEOPage1 since November 2024 and continues freelance web development and technical consulting.`,
  },
  {
    q: "Why does a project manager with a web development background matter?",
    a: "Hands-on development experience means requirements are read the way a developer will read them. It helps with communicating clearly with developers, recognising complexity, identifying technical risks early, setting realistic scope and timelines, evaluating the quality of deliverables, and translating business goals into technical tasks.",
  },
  {
    q: "How many projects has he managed and built?",
    a: "At SEOPage1 he has managed 400+ website development projects. As a freelance developer and technical consultant he has delivered 2,300+ web development projects across Fiverr and private clients, and earned 1,700+ verified Fiverr reviews.",
  },
  {
    q: "Which platforms and technologies does he work with?",
    a: "WordPress, Shopify, WooCommerce, Webflow, Wix and custom PHP websites, along with website migrations, hosting, DNS, SSL and server configuration.",
  },
  {
    q: "What does his project management cover?",
    a: "The full project lifecycle: discovery, planning, coordination between designers, developers, QA engineers and stakeholders, execution, quality assurance, and delivery including deployment, handover, client approval and post-launch support.",
  },
  {
    q: "Can he help move a website to new hosting or fix DNS and SSL issues?",
    a: "Yes. Website migrations, hosting, DNS, SSL and server configuration are part of his freelance technical work.",
  },
  {
    q: "Does he work with clients outside Bangladesh?",
    a: "Yes. His freelance and project work serves businesses worldwide, and he has built long-term relationships with clients through ongoing technical support.",
  },
  {
    q: "How can I get in touch about a project?",
    a: "Use the contact section of this page to email him, message him on LinkedIn, or reach him through his Fiverr profile. Share a short description of your project and he will respond from there.",
  },
];
