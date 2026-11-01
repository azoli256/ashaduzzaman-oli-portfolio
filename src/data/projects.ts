import type { Project } from "@/types";

/**
 * Supplied reference websites. Only name + public URL are published for now.
 * The sandbox could not browse these sites, so industry, platform, role, scope
 * and results are intentionally left out until the owner confirms them.
 * To enrich a project, add optional fields (see `Project` type); they will
 * appear automatically on the homepage and on /projects/[slug].
 * Radermacher Reisen appears once. Systems Building Leader uses its public
 * homepage only (never the WordPress admin path).
 */
export const projects: Project[] = [
  { slug: "jetstocks-group", name: "Jetstocks Group", url: "https://jetstocksgroup.com/", featured: true, hue: 195 },
  { slug: "radermacher-reisen", name: "Radermacher Reisen", url: "https://www.radermacherreisen.de/", featured: true, hue: 220 },
  { slug: "alerton", name: "Alerton", url: "https://alerton.com.au/", featured: true, hue: 175 },
  { slug: "op-int", name: "OP International", url: "https://op-int.com/", featured: false, hue: 250 }, // OWNER TO CONFIRM: exact brand name
  { slug: "conservia", name: "Conservia", url: "https://conservia.com/", featured: false, hue: 190 },
  { slug: "qantec-automation", name: "Qantec Automation", url: "https://qantecautomation.com/", featured: false, hue: 210 },
  { slug: "car-butler", name: "Car Butler", url: "https://carbutler.com.au/", featured: false, hue: 230 },
  { slug: "falschparker-melden", name: "Falschparker Melden", url: "https://falschparkermelden.com/", featured: false, hue: 200 },
  { slug: "epoxy-pads", name: "Epoxy Pads", url: "https://epoxypads.com/", featured: false, hue: 260 },
  { slug: "systems-building-leader", name: "Systems Building Leader", url: "https://systemsbuildingleader.org/", featured: false, hue: 185 },
  { slug: "lumy-inserts", name: "Lumy Inserts", url: "https://lumyinserts.com/", featured: false, hue: 240 },
  { slug: "troy-landing", name: "Troy Landing", url: "https://troy-landing.vercel.app/", featured: false, hue: 205 },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const hasCaseStudy = (p: Project) =>
  Boolean(p.overview || p.objective || p.challenges?.length || p.approach?.length || p.results?.length);
