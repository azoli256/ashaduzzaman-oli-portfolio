import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { metrics, formatMetric } from "@/data/metrics";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { HeroVisual } from "@/components/visuals/hero-visual";
import { HeroLight } from "@/components/motion/hero-light";

const d = (n: number) => ({ ["--d" as string]: n }) as React.CSSProperties;

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <HeroLight />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1.2fr_0.9fr] lg:gap-4 lg:pb-28">
        <div>
          <p className="rise inline-flex items-center gap-2.5 flex-wrap rounded-full border border-line bg-white/[0.03] py-1.5 pl-2 pr-4 text-[0.78rem] font-semibold text-ink-2" style={d(60)}>
            <span className="grid size-6 place-items-center rounded-full bg-cyan/15 text-cyan"><MapPin size={13} /></span>
            <span>Project Management <span className="text-cyan">×</span> Web Development</span><span className="hidden text-muted sm:inline">· {profile.publicLocation}</span>
          </p>

          <h1 id="hero-title" className="h-hero rise mt-7" style={d(140)}>
            Where <span className="text-gradient">Technical Understanding</span> Meets Project Leadership.
          </h1>

          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl" style={d(260)}>
            {profile.heroSupport}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={d(380)}>
            <MagneticButton>
              <Button href="/#work" icon={<ArrowDown size={18} />}>Explore My Work</Button>
            </MagneticButton>
            <Button href="/#contact" variant="secondary">Let&apos;s Connect</Button>
          </div>

          <dl className="rise mt-12 grid max-w-xl grid-cols-3 gap-x-4 border-t border-line pt-6" style={d(500)} aria-label="Career highlights">
            {[
              [`${metrics.yearsExperience}+`, "Years"],
              [formatMetric(metrics.projectsManaged), "Managed Projects"],
              [formatMetric(metrics.developmentProjects), "Development Projects"],
            ].map(([n, l]) => (
              <div key={l}>
                <dd className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{n}</dd>
                <dt className="mt-1 text-xs leading-snug text-muted sm:text-sm">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="fade-in" style={d(300)}>
          <HeroVisual />
        </div>
      </div>
      <div aria-hidden className="hairline" />
    </section>
  );
}
