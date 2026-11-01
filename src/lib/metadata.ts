import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";

export const siteTitle = `${profile.name} | ${profile.title}`;
export const siteDescription =
  "Ashaduzzaman Oli is an experienced Digital Project Manager and Web Development Professional specializing in project leadership, technical solutions, and digital delivery.";

export function buildMetadata({
  title,
  description = siteDescription,
  path = "/",
}: { title?: string; description?: string; path?: string } = {}): Metadata {
  const full = title ? `${title} | ${profile.name}` : siteTitle;
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: full,
      description,
      siteName: profile.name,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: full, description },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  sameAs: [profile.linkedin, profile.fiverr],
  knowsAbout: [
    "Project Management",
    "Agile Coordination",
    "Web Development",
    "WordPress",
    "Shopify",
    "WooCommerce",
    "Webflow",
    "Wix",
    "PHP",
  ],
};
