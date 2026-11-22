"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "top", label: "Top" },
  { id: "impact", label: "Impact" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "advantage", label: "Technical Advantage" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected Work" },
  { id: "approach", label: "Approach" },
  { id: "trust", label: "Client Trust" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

/** Right-edge progress rail: one dot per homepage section, each a real anchor link with a live active state. */
export function SectionDots() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:right-7">
      <ul className="flex flex-col items-end gap-1">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a href={`/#${s.id}`} aria-label={s.label} aria-current={on ? "location" : undefined} className="group flex h-6 items-center justify-end gap-3">
                <span className={cn("pointer-events-none rounded-full border border-line bg-bg/85 px-3 py-1 text-xs font-medium text-ink opacity-0 backdrop-blur transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100", on && "text-cyan")}>{s.label}</span>
                <span className={cn("block rounded-full transition-all duration-300", on ? "h-2.5 w-7 bg-gradient-to-r from-cyan to-blue shadow-[0_0_12px_rgba(34,197,234,0.7)]" : "size-2 bg-white/25 group-hover:bg-cyan/70")} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
