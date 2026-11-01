import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { hasCaseStudy } from "@/data/projects";
import { cn, externalProps, hostname } from "@/lib/utils";
import { ProjectPreview } from "./project-preview";

const stretched = "after:absolute after:inset-0 after:z-0 after:content-['']";

export function ProjectCard({ project, size = "small", className, priority }: { project: Project; size?: "large" | "small"; className?: string; priority?: boolean }) {
  const study = hasCaseStudy(project);
  const meta = [project.category, project.platform].filter(Boolean).join(" · ");
  const title = study ? (
    <Link href={`/projects/${project.slug}`} className={stretched}>
      {project.name}
    </Link>
  ) : (
    <a href={project.url} {...externalProps} className={stretched}>
      {project.name}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  return (
    <article className={cn("group surface lit relative flex flex-col overflow-hidden", size === "large" && "h-full", className)}>
      <ProjectPreview project={project} priority={priority} className={cn("w-full", size === "large" ? "aspect-[16/11] lg:aspect-auto lg:min-h-[22rem] lg:flex-1" : "aspect-[16/10]")} />
      <div className={cn("relative flex items-end justify-between gap-4 border-t border-line", size === "large" ? "p-6 sm:p-8" : "p-5 sm:p-6")}>
        <div className="min-w-0">
          {meta && <p className="eyebrow mb-2 !text-[0.68rem]">{meta}</p>}
          <h3 className={cn("font-display font-extrabold tracking-tight", size === "large" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl")}>{title}</h3>
          <p className="mt-1 truncate text-sm text-muted">{hostname(project.url)}</p>
        </div>
        <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white/[0.03] text-ink-2 transition duration-300 group-hover:border-cyan/60 group-hover:bg-cyan group-hover:text-[#04202a]">
          {study ? <ArrowRight size={18} /> : <ArrowUpRight size={18} />}
        </span>
      </div>
      {study && (
        <a href={project.url} {...externalProps} className="relative z-10 mx-5 mb-5 -mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-cyan hover:underline sm:mx-6 sm:mb-6">
          Visit website <ArrowUpRight size={14} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}
