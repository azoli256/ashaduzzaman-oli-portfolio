"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { PillarItem } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Desktop scroll story. The section is tall and its stage is `position: sticky`,
 * so the browser keeps native scrolling: scroll position simply selects the stage.
 */
export function WorkflowPinned({ steps }: { steps: PillarItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((cur) => (cur === i ? cur : i));
  });

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (i + 0.5)) / steps.length, behavior: "smooth" });
  };

  const s = steps[active] ?? steps[0];
  if (!s) return null;
  return (
    <div ref={ref} style={{ height: `${steps.length * 62}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-10 px-8">
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
                <span aria-hidden className="num-xl h-outline block text-[clamp(7rem,14vw,12rem)]">0{active + 1}</span>
                <h3 className="font-display mt-1 text-5xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-4 max-w-lg text-xl leading-relaxed text-ink-2">{s.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative col-span-5">
            <div aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-line" />
            <motion.div aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px origin-top bg-gradient-to-b from-cyan to-blue" style={{ scaleY: line }} />
            <ol className="relative space-y-2">
              {steps.map((st, i) => (
                <li key={st.title}>
                  <button type="button" onClick={() => go(i)} aria-current={i === active ? "step" : undefined} className="group flex w-full items-center gap-5 rounded-xl py-2 text-left">
                    <span className={cn("relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-bg font-mono text-xs transition-all duration-500", i <= active ? "border-cyan text-cyan" : "border-line text-muted", i === active && "shadow-[0_0_0_6px_rgba(34,197,234,0.14)]")}>0{i + 1}</span>
                    <span className={cn("font-display text-lg font-bold tracking-tight transition-colors duration-300", i === active ? "text-ink" : "text-muted group-hover:text-ink-2")}>{st.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
