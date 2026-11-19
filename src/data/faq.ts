import { profile } from "@/data/profile";
import { metrics } from "@/data/metrics";

export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; blurb: string; items: Faq[] };

/**
 * Grouped the way a visitor decides: who is this person, what can they do, how do we start.
 * Every answer restates facts already published elsewhere on this site (profile, experience, expertise, metrics).
 * No pricing, turnaround or availability claims. The same text feeds the visible accordion and the FAQPage JSON-LD.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: "about",
    title: "About me",
    blurb: "Who I am and the track record behind the work.",
    items: [
      {
        q: "Who is Ashaduzzaman Oli?",
        a: `I'm ${profile.name}, a Digital Project Manager and web developer based in ${profile.publicLocation}. I have 11+ years of experience delivering digital solutions for businesses worldwide.`,
      },
      {
        q: "Are you a project manager or a web developer?",
        a: "Both. Since November 2024 I have been a Project Manager at SEOPage1, leading projects from discovery to post-launch support. Alongside that, I have worked as a freelance web developer and technical consultant since January 2016.",
      },
      {
        q: "How many projects have you managed and built?",
        a: `At SEOPage1 I have managed ${metrics.projectsManaged}+ website development projects. As a freelance developer and technical consultant I have delivered ${metrics.developmentProjects.toLocaleString("en-US")}+ web development projects across Fiverr and private clients.`,
      },
    ],
  },
  {
    id: "work",
    title: "What I do",
    blurb: "Project leadership, platforms and technical setup.",
    items: [
      {
        q: "What does your project management cover?",
        a: "The full project lifecycle: discovery, planning, coordination between designers, developers, QA engineers and stakeholders, execution, quality assurance, and delivery, including deployment, handover, client approval and post-launch support.",
      },
      {
        q: "Why does a project manager with a web development background matter?",
        a: "Hands-on development experience means I read requirements the way a developer will. It helps me communicate clearly with developers, recognize complexity, spot technical risks early, set realistic scope and timelines, judge the quality of deliverables, and translate business goals into technical tasks.",
      },
      {
        q: "Which platforms do you build websites on?",
        a: "WordPress, Shopify, WooCommerce, Webflow, Wix and custom PHP.",
      },
      {
        q: "Can you migrate a website or set up hosting, DNS and SSL?",
        a: "Yes. Website migrations, hosting, DNS, SSL and server configuration are part of my freelance technical work.",
      },
    ],
  },
  {
    id: "together",
    title: "Working together",
    blurb: "Proof, examples and how to start a conversation.",
    items: [
      {
        q: "Can I see examples of your work?",
        a: "Yes. The Selected Work section lists 10 websites from my portfolio. Each one opens inside this page as a live view or a homepage capture, so you can look around without leaving.",
      },
      {
        q: "Where can I read client reviews?",
        a: `My Fiverr profile shows ${metrics.fiverrReviews.toLocaleString("en-US")}+ verified client reviews with a ${metrics.fiverrRating} rating. The rating card at the top of this page links straight to it.`,
      },
      {
        q: "Do you work with clients outside Bangladesh?",
        a: "Yes. My freelance and project work serves businesses worldwide, and I have built long-term client relationships through ongoing technical support.",
      },
      {
        q: "How can I get in touch about a project?",
        a: "Use the contact section on this page to email me, message me on LinkedIn, or reach me through my Fiverr profile. A short description of your project is a good place to start.",
      },
    ],
  },
];

export const faqs: Faq[] = faqGroups.flatMap((g) => g.items);
