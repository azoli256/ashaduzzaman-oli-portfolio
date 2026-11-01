"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { PillarItem } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function Step({ step, index }: { step: PillarItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const on = useInView(ref, { margin: "-35% 0px -35% 0px", once: true });
  const reduce = usePrefersReducedMotion();
  const lit = on || reduce;
  return (
    <li ref={ref} className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0 lg:pt-14">
      <span
        className={cn(
          "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border bg-bg font-mono text-sm transition-all duration-700 lg:absolute lg:left-0 lg:top-0",
          lit ? "border-cyan text-cyan shadow-[0_0_0_6px_rgba(34,197,234,0.12)]" : "border-line text-muted",
        )}
      >
        0{index + 1}
      </span>
      <div className={cn("transition-all duration-700", lit ? "opacity-100" : "opacity-50 lg:translate-y-1")}>
        <h3 className="font-display text-xl font-extrabold tracking-tight">{step.title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{step.text}</p>
      </div>
    </li>
  );
}

export function WorkflowSteps({ steps }: { steps: PillarItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reduce = usePrefersReducedMotion();
  const style = reduce ? { scaleX: 1, scaleY: 1 } : undefined;

  return (
    <div ref={ref} className="relative mt-16">
      {/* vertical track (mobile/tablet) */}
      <div aria-hidden className="absolute bottom-5 left-[1.35rem] top-5 w-px bg-line lg:hidden" />
      <motion.div aria-hidden className="absolute bottom-5 left-[1.35rem] top-5 w-px origin-top bg-gradient-to-b from-cyan to-blue lg:hidden" style={style ?? { scaleY: p }} />
      {/* horizontal track (desktop) */}
      <div aria-hidden className="absolute left-0 right-0 top-[1.35rem] hidden h-px bg-line lg:block" />
      <motion.div aria-hidden className="absolute left-0 right-0 top-[1.35rem] hidden h-px origin-left bg-gradient-to-r from-cyan to-blue lg:block" style={style ?? { scaleX: p }} />

      <ol className="relative grid lg:grid-cols-6 lg:gap-6">
        {steps.map((s, i) => (
          <Step key={s.title} step={s} index={i} />
        ))}
      </ol>
    </div>
  );
}
