"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { hasCaseStudy } from "@/data/projects";
import { ProjectPreview } from "@/components/ui/project-preview";
import { cn, externalProps, hostname } from "@/lib/utils";

/**
 * Editorial index of project references. On a mouse, hovering or focusing a row floats a
 * preview next to the cursor; on touch the rows are plain tap targets. Previews are the
 * original abstract compositions (or a real screenshot once `image` is set), never fakes.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });

  const track = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX + 28);
    y.set(e.clientY - 120);
  };

  return (
    <div ref={box} onPointerMove={track} onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-line">
        {projects.map((p, i) => {
          const study = hasCaseStudy(p);
          const inner = (
            <>
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl font-extrabold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-3 sm:text-4xl lg:text-5xl">
                {p.name}
              </span>
              <span className="hidden text-ink-2 sm:block">{hostname(p.url)}</span>
              <span className="flex items-center justify-end gap-2 text-sm text-ink-2 transition-colors group-hover:text-cyan">
                {p.featured && <span className="hidden rounded-full border border-cyan/30 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-cyan sm:inline">Featured</span>}
                {study ? <ArrowRight size={22} /> : <ArrowUpRight size={22} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </span>
            </>
          );
          const cls = cn("group grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 border-b border-line py-5 transition-colors hover:bg-white/[0.025] sm:grid-cols-[3.5rem_1fr_14rem_auto] sm:px-2 sm:py-7");
          return (
            <li key={p.slug} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p)} onFocus={() => setActive(p)} onBlur={() => setActive(null)}>
              {study ? (
                <Link href={`/projects/${p.slug}`} className={cls}>{inner}</Link>
              ) : (
                <a href={p.url} {...externalProps} className={cls}>
                  {inner}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            key="float"
            aria-hidden
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[22rem] overflow-hidden rounded-2xl border border-line shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] [@media(hover:hover)_and_(pointer:fine)]:block"
          >
            <ProjectPreview project={active} className="aspect-[16/10] w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
