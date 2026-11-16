import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ExperienceGraph } from "./experience-graph";

const stats = [
  { n: "400+", l: "Projects managed" },
  { n: "2,300+", l: "Projects built" },
  { n: "1,700+", l: "Fiverr reviews" },
];

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute -right-40 top-1/4 -z-10 size-[30rem] rounded-full bg-blue/10 blur-[120px]" />
      <div className="site-w">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading id="experience-title" index="07" eyebrow="Experience" title={<>My Professional <span className="text-gradient">Journey.</span></>} text="Two tracks running in parallel: I keep building and consulting while leading projects." />
          <Reveal>
            <dl className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.l} className="rule-top flex flex-col-reverse justify-end pt-4">
                  <dt className="mt-1 text-xs uppercase tracking-widest text-muted">{s.l}</dt>
                  <dd className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{s.n}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <ExperienceGraph items={experience} />
      </div>
    </section>
  );
}
