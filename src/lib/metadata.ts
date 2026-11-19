import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";

export const siteTitle = `${profile.name} | Digital Project Manager & Web Developer`;
export const siteDescription =
  "Ashaduzzaman Oli is a Digital Project Manager and web developer in Dhaka with 11+ years of experience. 400+ projects managed, 2,300+ built. See selected work.";

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
  image: `${siteUrl}/images/oli.webp`,
  description: siteDescription,
  worksFor: { "@type": "Organization", name: "SEOPage1" },
  sameAs: [profile.linkedin, profile.fiverr],
  knowsAbout: [
    "Project Management",
    "Web Development",
    "Technical Consulting",
    "Website Migration",
    "WordPress",
    "Shopify",
    "WooCommerce",
    "Webflow",
    "Wix",
    "PHP",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "en",
};
