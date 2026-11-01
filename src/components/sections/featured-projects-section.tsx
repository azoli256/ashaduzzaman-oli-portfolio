import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProjectIndex } from "./project-index";

export function FeaturedProjectsSection() {
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="site-w">
        <SectionHeading id="work-title" index="05" eyebrow="Selected Work" title={<>Selected <span className="text-gradient">Digital Experiences.</span></>} text="A collection of website projects and digital solutions representing different industries, platforms, and business requirements." />
        <Reveal className="mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Website references</p>
            <p className="font-mono text-sm text-muted">{String(ordered.length).padStart(2, "0")} sites</p>
          </div>
          <ProjectIndex projects={ordered} />
        </Reveal>
      </div>
    </section>
  );
}
