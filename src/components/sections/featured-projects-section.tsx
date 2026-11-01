import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/motion/reveal";
import { externalProps, hostname } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [lead, ...others] = featured;
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="work-title" index="05" eyebrow="Selected Work" title={<>Selected <span className="text-gradient">Digital Experiences.</span></>} text="A collection of website projects and digital solutions representing different industries, platforms, and business requirements." />

        {lead && (
          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7"><ProjectCard project={lead} size="large" priority /></Reveal>
            <div className="grid gap-4 lg:col-span-5">
              {others.map((p, i) => (
                <Reveal key={p.slug} delay={0.1 * (i + 1)}><ProjectCard project={p} /></Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
            <h3 className="font-display text-2xl font-extrabold tracking-tight">More website references</h3>
            <p className="font-mono text-sm text-muted">{String(rest.length).padStart(2, "0")} sites</p>
          </div>
          <ul>
            {rest.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <a href={p.url} {...externalProps} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[3.5rem_1fr_1fr_auto] sm:px-2">
                  <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">{p.name}</span>
                  <span className="hidden text-ink-2 sm:block">{hostname(p.url)}</span>
                  <span className="flex items-center gap-2 text-sm text-ink-2 group-hover:text-cyan">
                    <span className="hidden sm:inline">Visit</span>
                    <ArrowUpRight size={20} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">{p.name} (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
