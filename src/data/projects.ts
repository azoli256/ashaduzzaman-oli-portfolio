import type { Project } from "@/types";

/**
 * Supplied reference websites. Only name + public URL are published for now.
 * Homepage screenshots (16 Nov 2026) are real captures. Industry, platform, role, scope
 * and results are intentionally left out until the owner confirms them.
 * To enrich a project, add optional fields (see `Project` type); they will
 * appear automatically on the homepage and on /projects/[slug].
 * Radermacher Reisen appears once. Systems Building Leader uses its public
 * homepage only (never the WordPress admin path).
 */
export const projects: Project[] = [
  { slug: "radermacher-reisen", name: "Radermacher Reisen", url: "https://www.radermacherreisen.de/", image: "/images/projects/radermacher-reisen.webp", imageAlt: "Homepage screenshot of the Radermacher Reisen website", featured: true, hue: 220 },
  { slug: "alerton", name: "Alerton", url: "https://alerton.com.au/", image: "/images/projects/alerton.webp", imageAlt: "Homepage screenshot of the Alerton website", featured: true, hue: 175 },
  { slug: "conservia", name: "Conservia", url: "https://conservia.com/", image: "/images/projects/conservia.webp", imageAlt: "Homepage screenshot of the Conservia website", featured: true, hue: 190 },
  { slug: "qantec-automation", name: "Qantec Automation", url: "https://qantecautomation.com/", image: "/images/projects/qantec-automation.webp", imageAlt: "Homepage screenshot of the Qantec Automation website", featured: false, embed: false, hue: 210 },
  { slug: "car-butler", name: "Car Butler", url: "https://carbutler.com.au/", image: "/images/projects/car-butler.webp", imageAlt: "Homepage screenshot of the Car Butler website", featured: false, hue: 230 },
  { slug: "falschparker-melden", name: "Falschparker Melden", url: "https://falschparkermelden.com/", image: "/images/projects/falschparker-melden.webp", imageAlt: "Homepage screenshot of the Falschparker Melden website", featured: false, hue: 200 },
  { slug: "epoxy-pads", name: "Epoxy Pads", url: "https://epoxypads.com/", image: "/images/projects/epoxy-pads.webp", imageAlt: "Homepage screenshot of the Epoxy Pads website", featured: false, embed: false, hue: 260 },
  { slug: "systems-building-leader", name: "Systems Building Leader", url: "https://systemsbuildingleader.org/", image: "/images/projects/systems-building-leader.webp", imageAlt: "Homepage screenshot of the Systems Building Leader website", featured: false, hue: 185 },
  { slug: "lumy-inserts", name: "Lumy Inserts", url: "https://lumyinserts.com/", image: "/images/projects/lumy-inserts.webp", imageAlt: "Homepage screenshot of the Lumy Inserts website", featured: false, hue: 240 },
  { slug: "troy-landing", name: "Troy Landing", url: "https://troy-landing.vercel.app/", image: "/images/projects/troy-landing.webp", imageAlt: "Homepage screenshot of the Troy Landing (Business Efficiency Group) website", featured: false, embed: false, hue: 205 },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const hasCaseStudy = (p: Project) =>
  Boolean(p.overview || p.objective || p.challenges?.length || p.approach?.length || p.results?.length);
