import { profile } from "@/data/profile";

export type Faq = { q: string; a: string };

/**
 * Every answer restates facts already published elsewhere on this site (profile, experience, expertise).
 * No pricing, turnaround or availability claims. The same text feeds the visible accordion and the FAQPage JSON-LD.
 */
export const faqs: Faq[] = [
  {
    q: "Who is Ashaduzzaman Oli?",
    a: `I'm ${profile.name}, a Digital Project Manager and web developer based in ${profile.publicLocation}. I have 11+ years of experience delivering digital solutions for businesses worldwide. Since November 2024 I have been a Project Manager at SEOPage1, and I continue to take on freelance web development and technical consulting.`,
  },
  {
    q: "Why does a project manager with a web development background matter?",
    a: "Hands-on development experience means I read requirements the way a developer will. It helps me communicate clearly with developers, recognize complexity, spot technical risks early, set realistic scope and timelines, judge the quality of deliverables, and translate business goals into technical tasks.",
  },
  {
    q: "How many projects have you managed and built?",
    a: "At SEOPage1 I have managed 400+ website development projects. As a freelance developer and technical consultant I have delivered 2,300+ web development projects across Fiverr and private clients, and earned 1,700+ verified Fiverr reviews.",
  },
  {
    q: "Which platforms do you build websites on?",
    a: "WordPress, Shopify, WooCommerce, Webflow, Wix and custom PHP. I also handle website migrations, hosting, DNS, SSL and server configuration.",
  },
  {
    q: "What does your project management cover?",
    a: "The full project lifecycle: discovery, planning, coordination between designers, developers, QA engineers and stakeholders, execution, quality assurance, and delivery, including deployment, handover, client approval and post-launch support.",
  },
  {
    q: "Can you migrate a website or set up hosting, DNS and SSL?",
    a: "Yes. Website migrations, hosting, DNS, SSL and server configuration are part of my freelance technical work.",
  },
  {
    q: "Do you work with clients outside Bangladesh?",
    a: "Yes. My freelance and project work serves businesses worldwide, and I have built long-term client relationships through ongoing technical support.",
  },
  {
    q: "How can I get in touch about a project?",
    a: "Use the contact section on this page to email me, message me on LinkedIn, or reach me through my Fiverr profile. A short description of your project is a good place to start.",
  },
];
