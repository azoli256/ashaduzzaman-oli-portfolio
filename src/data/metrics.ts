import type { Metrics } from "@/types";

/**
 * SINGLE SOURCE OF TRUTH for every number shown on the site.
 * OWNER TO CONFIRM: the CV also mentions 2,500+ development projects and
 * 450+ managed projects. Until confirmed, the conservative figures below
 * (from the detailed employment section) are used everywhere.
 */
export const metrics: Metrics = {
  yearsExperience: 11,
  projectsManaged: 400,
  developmentProjects: 2300,
  fiverrReviews: 1700,
};

export const formatMetric = (n: number) => `${n.toLocaleString("en-US")}+`;
