import Image from "next/image";
import type { Project } from "@/types";
import { cn, hostname } from "@/lib/utils";

/**
 * Real screenshot when `project.image` is supplied; otherwise an original abstract
 * browser composition. It is deliberately NOT a facsimile of the live site.
 */
export function ProjectPreview({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const h = project.hue;
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={project.image} alt={project.imageAlt ?? `${project.name} website preview`} fill sizes="(min-width:1024px) 600px, 100vw" priority={priority} className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `radial-gradient(120% 90% at 20% 0%, hsl(${h} 80% 45% / 0.35), transparent 60%), radial-gradient(90% 80% at 100% 100%, hsl(${(h + 50) % 360} 70% 55% / 0.28), transparent 60%), #0C1525` }}
      role="img"
      aria-label={`Abstract preview placeholder for ${project.name}`}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute inset-[10%] flex flex-col overflow-hidden rounded-xl border border-white/10 bg-bg/70 shadow-2xl backdrop-blur-sm transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 truncate rounded-full bg-white/[0.06] px-3 py-0.5 text-[10px] text-ink-2">{hostname(project.url)}</span>
        </div>
        <div className="grid flex-1 grid-cols-6 grid-rows-6 gap-2 p-3">
          <div className="col-span-4 row-span-3 rounded-lg" style={{ background: `linear-gradient(135deg, hsl(${h} 85% 55% / 0.55), hsl(${(h + 40) % 360} 80% 60% / 0.2))` }} />
          <div className="col-span-2 row-span-2 rounded-lg bg-white/[0.06]" />
          <div className="col-span-2 row-span-1 rounded-lg bg-white/[0.04]" />
          <div className="col-span-2 row-span-3 rounded-lg bg-white/[0.05]" />
          <div className="col-span-2 row-span-3 rounded-lg bg-white/[0.08]" />
          <div className="col-span-2 row-span-3 rounded-lg" style={{ background: `hsl(${h} 80% 55% / 0.18)` }} />
        </div>
      </div>
    </div>
  );
}
