import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, priority: 0.7 },
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
