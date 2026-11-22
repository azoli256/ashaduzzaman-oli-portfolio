import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceGraph } from "./experience-graph";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute -right-40 top-1/4 -z-10 size-[30rem] rounded-full bg-blue/10 blur-[120px]" />
      <div className="site-w">
        <div>
          <SectionHeading id="experience-title" index="05" eyebrow="Experience" title={<>My Professional <span className="text-gradient">Journey.</span></>} text="Two tracks running in parallel: I keep building and consulting while leading projects." />
        </div>
        <ExperienceGraph items={experience} />
      </div>
    </section>
  );
}
