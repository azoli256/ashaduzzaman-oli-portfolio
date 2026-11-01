import { ArrowUpRight } from "lucide-react";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { externalProps } from "@/lib/utils";

export function ImpactSection() {
  const years = Array.from({ length: 11 }, (_, i) => i);
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-cyan/10 blur-[130px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[30rem] rounded-full bg-violet/10 blur-[130px]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="impact-title" index="01" eyebrow="Professional Impact" title={<>A career measured in <span className="text-gradient">delivered work.</span></>} text="Figures taken from my project management and freelance development roles." />

        <div className="mt-16 grid lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="rule-top pt-8 lg:col-span-7 lg:row-span-2">
            <p className="eyebrow">Experience</p>
            <AnimatedCounter value={metrics.yearsExperience} className="num-xl text-gradient mt-4 block text-[clamp(8rem,24vw,18rem)]" />
            <p className="mt-6 max-w-sm text-lg text-ink-2">Years of professional experience in web development and digital project delivery.</p>
            <div aria-hidden className="mt-10 flex h-16 items-end gap-1.5">
              {years.map((i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-cyan/5 to-cyan/60" style={{ height: `${22 + i * 7.8}%` }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rule-top mt-12 pt-8 lg:col-span-5 lg:mt-0">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Project Management</p>
              <span aria-hidden className="font-mono text-xs text-muted">SEOPage1</span>
            </div>
            <AnimatedCounter value={metrics.projectsManaged} className="num-xl mt-4 block text-[clamp(5rem,11vw,8.5rem)]" />
            <p className="mt-4 max-w-sm text-ink-2">Projects managed as a Project Manager at SEOPage1.</p>
          </Reveal>

          <Reveal delay={0.14} className="rule-top mt-12 pt-8 lg:col-span-5 lg:mt-12">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow !text-violet">Web Development</p>
              <span aria-hidden className="font-mono text-xs text-muted">&lt;/&gt;</span>
            </div>
            <AnimatedCounter value={metrics.developmentProjects} className="num-xl mt-4 block text-[clamp(5rem,11vw,8.5rem)]" />
            <p className="mt-4 max-w-sm text-ink-2">Web development projects delivered across Fiverr and private clients.</p>
          </Reveal>
        </div>

        <Reveal className="rule-top mt-14 pt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <AnimatedCounter value={metrics.fiverrReviews} className="num-xl h-outline block text-[clamp(5rem,15vw,11rem)]" />
              <p className="mt-4 max-w-md text-ink-2"><span className="font-semibold text-ink">Verified Fiverr client reviews</span> earned through web development and technical consulting work.</p>
            </div>
            <a href={profile.fiverr} {...externalProps} className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 font-display font-bold transition hover:border-cyan/60 hover:bg-cyan/10">
              View Fiverr profile <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
