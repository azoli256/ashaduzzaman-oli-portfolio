import type { AdvantageDetail, PillarItem } from "@/types";

export const managementPillar: PillarItem[] = [
  { title: "Strategy & Planning", text: "Turning goals into a clear, prioritised plan." },
  { title: "Project Discovery", text: "Understanding the business need before the build." },
  { title: "Requirements & Scope", text: "Defining what is in, what is out, and why." },
  { title: "Team Coordination", text: "Aligning designers, developers and QA." },
  { title: "Stakeholder Communication", text: "Keeping clients and teams informed and aligned." },
  { title: "Project Execution", text: "Tracking progress, managing change, clearing blockers." },
  { title: "Quality Assurance", text: "Reviewing deliverables against agreed standards." },
  { title: "Risk Management", text: "Spotting issues early and planning around them." },
  { title: "Delivery & Support", text: "Launch, handover and post-launch care." },
];

export const developmentPillar: PillarItem[] = [
  { title: "WordPress", text: "Custom builds, themes and ongoing maintenance." },
  { title: "Shopify", text: "Storefront development and configuration." },
  { title: "WooCommerce", text: "E-commerce on WordPress." },
  { title: "Webflow", text: "Visual development and CMS-driven sites." },
  { title: "Wix", text: "Business websites on the Wix platform." },
  { title: "Custom PHP", text: "Bespoke solutions where platforms fall short." },
  { title: "Responsive Development", text: "Interfaces that work across every screen." },
  { title: "Technical Consulting", text: "Practical guidance on tools, platforms and approach." },
  { title: "Website Migration", text: "Moving sites between hosts and platforms safely." },
  { title: "Hosting & Server Setup", text: "Hosting, DNS, SSL and server configuration." },
];

export const technicalAdvantage: PillarItem[] = [
  { title: "Understand technical requirements", text: "Read a brief the way a developer will." },
  { title: "Communicate with developers", text: "Speak their language, ask better questions." },
  { title: "Recognise complexity", text: "Know what is simple, and what only looks simple." },
  { title: "Identify technical risks", text: "Surface problems before they become delays." },
  { title: "Set realistic scope & timelines", text: "Plans grounded in how things are really built." },
  { title: "Evaluate quality", text: "Judge deliverables with hands-on technical insight." },
  { title: "Bridge clients and teams", text: "Translate business goals into technical tasks." },
];

/** Illustrative examples for each technical-advantage point: what a client says, what it means technically, and the result. */
export const advantageDetail: AdvantageDetail[] = [
  { label: "Requirements", says: "We need a booking page.", means: ["Forms", "Availability logic", "Payments", "Email alerts", "Data storage"], outcome: "Requirements are written down before any work starts." },
  { label: "Dev talk", says: "Make the site faster.", means: ["Which pages?", "Image weight", "Scripts", "Hosting", "Measure first"], outcome: "Developers get clear tasks with a way to check them." },
  { label: "Complexity", says: "It's just a login button.", means: ["Authentication", "Password reset", "Sessions", "Security"], outcome: "Estimates reflect the real work, not the surface." },
  { label: "Risks", says: "We launch on Friday.", means: ["API limits", "Browser testing", "Data migration", "Third parties"], outcome: "Risks are logged early, each with a fallback." },
  { label: "Scope", says: "Can we add one more feature?", means: ["What it touches", "What it delays", "What to retest"], outcome: "Every change shows its trade-off in time, scope or cost." },
  { label: "Quality", says: "Is it done?", means: ["Matches the brief", "Works on devices", "Handles errors", "Loads fast"], outcome: "Deliverables are reviewed against a checklist, not a feeling." },
  { label: "Bridge", says: "We want more leads.", means: ["Tracking", "Page speed", "Form flow", "CRM hand-off"], outcome: "One shared plan that clients and developers both understand." },
];

export const lifecycle: PillarItem[] = [
  { title: "Discovery", text: "Understanding client goals, requirements, and business needs." },
  { title: "Planning", text: "Defining scope, priorities, tasks, milestones, and timelines." },
  { title: "Coordination", text: "Aligning designers, developers, QA engineers, and stakeholders." },
  { title: "Execution", text: "Monitoring progress, managing changes, and resolving blockers." },
  { title: "Quality Assurance", text: "Reviewing deliverables, addressing feedback, and maintaining standards." },
  { title: "Delivery", text: "Deployment, handover, client approval, and post-launch support." },
];
