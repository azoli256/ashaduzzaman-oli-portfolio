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
  { slug: "radermacher-reisen", name: "Radermacher Reisen", url: "https://www.radermacherreisen.de/", image: "/images/projects/radermacher-reisen.webp", imageAlt: "Homepage of Radermacher Reisen, captured 16 Nov 2026", featured: true, hue: 220 },
  { slug: "alerton", name: "Alerton", url: "https://alerton.com.au/", image: "/images/projects/alerton.webp", imageAlt: "Homepage of Alerton, captured 16 Nov 2026", featured: true, hue: 175 },
  { slug: "conservia", name: "Conservia", url: "https://conservia.com/", image: "/images/projects/conservia.webp", imageAlt: "Homepage of Conservia, captured 16 Nov 2026", featured: true, hue: 190 },
  { slug: "qantec-automation", name: "Qantec Automation", url: "https://qantecautomation.com/", image: "/images/projects/qantec-automation.webp", imageAlt: "Homepage of Qantec Automation, captured 16 Nov 2026", featured: false, hue: 210 },
  { slug: "car-butler", name: "Car Butler", url: "https://carbutler.com.au/", image: "/images/projects/car-butler.webp", imageAlt: "Homepage of Car Butler, captured 16 Nov 2026", featured: false, hue: 230 },
  { slug: "falschparker-melden", name: "Falschparker Melden", url: "https://falschparkermelden.com/", image: "/images/projects/falschparker-melden.webp", imageAlt: "Homepage of Falschparker Melden, captured 16 Nov 2026", featured: false, hue: 200 },
  { slug: "epoxy-pads", name: "Epoxy Pads", url: "https://epoxypads.com/", image: "/images/projects/epoxy-pads.webp", imageAlt: "Homepage of Epoxy Pads, captured 16 Nov 2026", featured: false, hue: 260 },
  { slug: "systems-building-leader", name: "Systems Building Leader", url: "https://systemsbuildingleader.org/", image: "/images/projects/systems-building-leader.webp", imageAlt: "Homepage of Systems Building Leader, captured 16 Nov 2026", featured: false, hue: 185 },
  { slug: "lumy-inserts", name: "Lumy Inserts", url: "https://lumyinserts.com/", image: "/images/projects/lumy-inserts.webp", imageAlt: "Homepage of Lumy Inserts, captured 16 Nov 2026", featured: false, hue: 240 },
  { slug: "troy-landing", name: "Troy Landing", url: "https://troy-landing.vercel.app/", image: "/images/projects/troy-landing.webp", imageAlt: "Homepage of Troy Landing (Business Efficiency Group), captured 16 Nov 2026", featured: false, hue: 205 },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const hasCaseStudy = (p: Project) =>
  Boolean(p.overview || p.objective || p.challenges?.length || p.approach?.length || p.results?.length);
