import { ArrowUpRight } from "lucide-react";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { externalProps } from "@/lib/utils";

export function ImpactSection() {
  const stats = [
    { value: metrics.yearsExperience, label: "Years of professional experience", cls: "text-gradient" },
    { value: metrics.projectsManaged, label: "Projects managed at SEOPage1", cls: "" },
    { value: metrics.developmentProjects, label: "Web development projects delivered", cls: "" },
    { value: metrics.fiverrReviews, label: "Verified Fiverr client reviews", cls: "" },
  ];
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative overflow-clip py-20 sm:py-24">
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-cyan/10 blur-[130px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[30rem] rounded-full bg-violet/10 blur-[130px]" />
      <div className="site-w">
        <SectionHeading id="impact-title" index="01" eyebrow="Professional Impact" title={<>A career measured in <span className="text-gradient">delivered work.</span></>} text="Figures taken from my project management and freelance development roles." />

        <Reveal className="mt-14">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rule-top flex flex-col-reverse justify-end pt-5">
                <dt className="mt-3 text-sm text-ink-2">{s.label}</dt>
                <dd><AnimatedCounter value={s.value} className={`num-xl block text-[clamp(3rem,6vw,5rem)] ${s.cls}`} /></dd>
              </div>
            ))}
          </dl>
          <a href={profile.fiverr} {...externalProps} className="group mt-10 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 font-display font-bold transition hover:border-cyan/60 hover:bg-cyan/10">
            View Fiverr profile <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
