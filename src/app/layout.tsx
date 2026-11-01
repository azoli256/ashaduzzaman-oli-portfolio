import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { LensProvider } from "@/components/motion/lens-context";
import { AmbientCursor } from "@/components/motion/ambient-cursor";
import { CommandPalette } from "@/components/layout/command-palette";
import { siteUrl } from "@/data/profile";
import { buildMetadata, personJsonLd } from "@/lib/metadata";

const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata(),
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080E1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LensProvider>
          <ScrollProgress />
          <AmbientCursor />
          <Navbar />
          <CommandPalette />
          <main id="main">{children}</main>
          <Footer />
        </LensProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
