import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { metrics, formatMetric } from "@/data/metrics";
import { experience } from "@/data/experience";
import { buildMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import { AboutMonogram } from "@/components/sections/about-section";

export const metadata: Metadata = buildMetadata({
  title: "Professional Profile",
  path: "/about",
  description: "Experience, roles and approach of Ashaduzzaman Oli, Digital Project Manager and Web Development Professional.",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <p className="eyebrow">Professional Profile</p>
      <h1 className="h-hero mt-4">{profile.name}</h1>
      <p className="mt-4 text-xl text-ink-2">{profile.title}</p>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_20rem]">
        <div className="space-y-5 text-lg leading-relaxed text-ink-2">
          {profile.summary.map((p) => <p key={p}>{p}</p>)}
        </div>
        <AboutMonogram />
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
        {[
          [`${metrics.yearsExperience}+`, "Years of experience"],
          [formatMetric(metrics.projectsManaged), "Projects managed"],
          [formatMetric(metrics.developmentProjects), "Development projects"],
          [formatMetric(metrics.fiverrReviews), "Fiverr reviews"],
        ].map(([n, l]) => (
          <div key={l}><dd className="font-display text-4xl font-extrabold tracking-tight">{n}</dd><dt className="text-sm text-muted">{l}</dt></div>
        ))}
      </dl>

      <section className="mt-16" aria-labelledby="roles">
        <h2 id="roles" className="h-section">Roles</h2>
        <ul className="mt-8 space-y-8">
          {experience.map((e) => (
            <li key={e.company} className="border-t border-line pt-6">
              <p className="font-mono text-sm text-cyan">{e.start} — {e.end}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{e.company}</h3>
              <p className="text-ink-2">{e.role}</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-ink-2 marker:text-cyan">{e.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Button href={`mailto:${profile.email}`}>Email me</Button>
        <Button href={profile.linkedin} variant="secondary" external>LinkedIn</Button>
        <Button href={profile.fiverr} variant="secondary" external>Fiverr</Button>
      </div>
    </div>
  );
}
