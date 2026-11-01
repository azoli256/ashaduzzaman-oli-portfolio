import { ArrowUpRight } from "lucide-react";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { BentoCard } from "@/components/ui/bento-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { externalProps } from "@/lib/utils";

const big = "font-display font-extrabold leading-none tracking-[-0.045em]";

export function ImpactSection() {
  const years = Array.from({ length: 11 }, (_, i) => 2016 + i);
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="impact-title" index="01" eyebrow="Professional Impact" title={<>A career measured in <span className="text-gradient">delivered work.</span></>} text="Figures taken from my project management and freelance development roles." />

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <BentoCard className="flex h-full min-h-[22rem] flex-col justify-between p-7 sm:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-cyan/15 blur-[80px]" />
              <p className="eyebrow relative">Experience</p>
              <div className="relative">
                <AnimatedCounter value={metrics.yearsExperience} className={`${big} text-[clamp(6rem,16vw,11rem)] text-gradient`} />
                <p className="mt-4 max-w-sm text-lg text-ink-2">Years of professional experience in web development and digital project delivery.</p>
              </div>
              <div aria-hidden className="relative mt-8 flex items-end gap-1.5">
                {years.map((y, i) => (
                  <div key={y} className="flex-1">
                    <div className="rounded-sm bg-gradient-to-t from-cyan/10 to-cyan/70" style={{ height: `${14 + i * 4.2}px` }} />
                  </div>
                ))}
              </div>
              <div className="relative mt-2 flex justify-between font-mono text-[0.7rem] text-muted"><span>2015</span><span>Today</span></div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <BentoCard className="flex h-full flex-col justify-between gap-8 p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <p className="eyebrow">Project Management</p>
                <div aria-hidden className="flex gap-1">{[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="size-2 rounded-full bg-cyan" style={{ opacity: 0.25 + i * 0.15 }} />)}</div>
              </div>
              <div>
                <AnimatedCounter value={metrics.projectsManaged} className={`${big} text-6xl sm:text-7xl`} />
                <p className="mt-3 text-ink-2">Projects managed as a Project Manager at SEOPage1.</p>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-5">
            <BentoCard className="flex h-full flex-col justify-between gap-8 p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <p className="eyebrow !text-blue">Web Development</p>
                <span aria-hidden className="font-mono text-sm text-muted">&lt;/&gt;</span>
              </div>
              <div>
                <AnimatedCounter value={metrics.developmentProjects} className={`${big} text-6xl sm:text-7xl`} />
                <p className="mt-3 text-ink-2">Web development projects delivered across Fiverr and private clients.</p>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-12">
            <BentoCard className="p-7 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                  <AnimatedCounter value={metrics.fiverrReviews} className={`${big} text-6xl text-gradient sm:text-7xl`} />
                  <p className="max-w-md text-ink-2"><span className="font-semibold text-ink">Verified Fiverr client reviews</span> earned through web development and technical consulting work.</p>
                </div>
                <a href={profile.fiverr} {...externalProps} className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-line px-6 font-display font-bold transition hover:border-cyan/60 hover:bg-cyan/10">
                  View Fiverr profile <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
