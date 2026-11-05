export type NavItem = { label: string; href: string; id: string };

export type Profile = {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  location: string;
  /** City + country only. This is what is shown publicly. */
  publicLocation: string;
  email: string;
  linkedin: string;
  fiverr: string;
  /** Phone is kept private. Set `showPhone` to true to display it publicly. */
  phone: string;
  showPhone: boolean;
  tagline: string;
  heroHeadline: string;
  heroSupport: string;
  summary: string[];
};

export type Metrics = {
  yearsExperience: number;
  projectsManaged: number;
  developmentProjects: number;
  fiverrReviews: number;
};

export type ProjectCategory =
  | "Business & Corporate"
  | "Industrial & Technology"
  | "E-commerce"
  | "Travel & Hospitality"
  | "Digital Services"
  | "Product & Brand Websites";

export type Project = {
  slug: string;
  name: string;
  /** Public homepage URL only. Never link to admin paths. */
  url: string;
  featured: boolean;
  /**
   * Every field below is OPTIONAL and only rendered when present.
   * Add details only after the owner has confirmed them.
   */
  category?: ProjectCategory;
  industry?: string;
  platform?: string;
  projectType?: string;
  /** Path under /public, e.g. /images/projects/example.webp */
  image?: string;
  imageAlt?: string;
  overview?: string;
  objective?: string;
  role?: string;
  challenges?: string[];
  scope?: string[];
  approach?: string[];
  technologies?: string[];
  deliverables?: string[];
  results?: string[];
  /** Accent hue used for the generated abstract preview (0-360). */
  hue: number;
};

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  kind: "management" | "development";
  summary: string;
  highlights: string[];
};

export type TechGroup = {
  title: string;
  description: string;
  items: string[];
  /** When false the group is hidden until the owner confirms its contents. */
  confirmed: boolean;
};

export type PillarItem = { title: string; text: string };
export type AdvantageDetail = { label: string; says: string; means: string[]; outcome: string };
