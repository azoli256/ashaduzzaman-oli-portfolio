"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { ProjectPreview } from "@/components/ui/project-preview";
import { cn, hostname } from "@/lib/utils";

/**
 * Editorial index of project references. Every row opens the site inside this portfolio
 * (see SiteViewer); nothing links out to a client domain.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div>
      <ul className="border-t border-line">
        {projects.map((p, i) => {
          const inner = (
            <>
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 font-display text-2xl font-extrabold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-3 sm:text-3xl md:text-4xl lg:text-5xl">
                {p.name}
              </span>
              <span aria-hidden className="relative block w-20 overflow-hidden rounded-lg border border-line bg-bg-2 transition duration-500 group-hover:border-cyan/50 sm:w-32">
                <ProjectPreview project={p} className="aspect-[16/10] w-full" />
              </span>
              <span className="hidden text-ink-2 md:block">{hostname(p.url)}</span>
              <span className="flex items-center justify-end gap-2 text-sm text-ink-2 transition-colors group-hover:text-cyan">
                {p.featured && <span className="hidden rounded-full border border-cyan/30 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-cyan sm:inline">Featured</span>}
                <ArrowRight size={22} className="transition group-hover:translate-x-1" />
              </span>
            </>
          );
          const cls = cn("group grid grid-cols-[2.2rem_1fr_auto_auto] items-center gap-3 border-b border-line py-4 transition-colors hover:bg-white/[0.025] sm:grid-cols-[3.5rem_1fr_8rem_7rem] sm:gap-5 sm:px-2 sm:py-5 md:grid-cols-[3.5rem_1fr_8rem_11rem_7rem]");
          return (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className={cls}>{inner}</Link>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
