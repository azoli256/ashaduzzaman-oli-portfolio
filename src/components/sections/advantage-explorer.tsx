"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type { PillarItem } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const AUTO_MS = 6500;

/**
 * Interactive "bridge" between business goals and the technical build.
 * Each point sits on a spectrum; selecting one (hover, tap, keyboard or auto-advance) lights the path to it
 * and shows the detail in a HUD panel. On small screens the list becomes an accordion.
 */
export function AdvantageExplorer({ items }: { items: PillarItem[] }) {
  const reduce = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [tick, setTick] = useState(0);
  const last = items.length - 1;

  const select = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  // Auto-advance while visible; stops for reduced motion and while the visitor is interacting.
  useEffect(() => {
    if (reduce || held || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a >= last ? 0 : a + 1)), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, tick, reduce, held, inView, last]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select(Math.min(last, active + 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(Math.max(0, active - 1));
    }
  };

  const pos = (i: number) => 4 + (i / last) * 92; // % along the spectrum
  const cur = items[active] ?? items[0];
  if (!cur) return null;

  return (
    <div ref={root} onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)} onFocus={() => setHeld(true)} onBlur={() => setHeld(false)}>
      {/* spectrum (large screens) */}
      <div className="relative mt-14 hidden lg:block" aria-hidden>
        <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em]">
          <span className="text-cyan">◂ Business goals</span>
          <span className="text-violet">Technical build ▸</span>
        </div>
        <div className="relative mt-5 h-16">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <motion.div
            className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-cyan via-blue to-violet"
            animate={{ width: `${pos(active)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
          <motion.span
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_30px_8px_rgba(34,197,234,0.55)]"
            animate={{ left: `${pos(active)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              tabIndex={-1}
              onClick={() => select(i)}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos(i)}%` }}
            >
              <span className={cn("block size-3 rounded-full border transition-all duration-500", i <= active ? "border-cyan bg-cyan/70" : "border-line bg-bg")} />
              <span className={cn("absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap font-mono text-[0.68rem] transition-colors", i === active ? "text-ink" : "text-muted")}>0{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:mt-6 lg:grid-cols-12 lg:gap-12">
        {/* list / accordion */}
        <ol aria-label="Technical advantages" onKeyDown={onKey} className="lg:col-span-5">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.title} className="border-t border-line last:border-b">
                <button type="button" onClick={() => select(i)} onPointerEnter={(e) => e.pointerType === "mouse" && select(i)} aria-expanded={on} className="group flex w-full items-center gap-5 py-4 text-left sm:py-5">
                  <span className={cn("font-mono text-sm transition-colors", on ? "text-cyan" : "text-muted")}>0{i + 1}</span>
                  <span className={cn("flex-1 font-display text-xl font-bold leading-snug tracking-tight transition-all duration-300 sm:text-2xl", on ? "translate-x-1 text-ink" : "text-ink-2 group-hover:text-ink")}>{it.title}</span>
                  <span aria-hidden className={cn("h-px bg-gradient-to-r from-cyan to-violet transition-all duration-500", on ? "w-10 opacity-100" : "w-3 opacity-30")} />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.p
                      key="txt"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pl-[2.6rem] text-ink-2 lg:hidden"
                    >
                      <span className="block pb-5">{it.text}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        {/* HUD panel (large screens) */}
        <div className="relative hidden lg:col-span-7 lg:block">
          <div className="surface surface-blur relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden !rounded-3xl p-10">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
            <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-cyan/15 blur-[90px]" />
            <div aria-hidden className="absolute -bottom-28 -left-16 size-80 rounded-full bg-violet/15 blur-[90px]" />
            {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((c) => (
              <span key={c} aria-hidden className={cn("absolute size-5 border-cyan/60", c)} />
            ))}
            <div className="relative flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span>Technical advantage</span>
              <span>
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 22, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }} className="relative my-8" aria-live="polite">
                <span aria-hidden className="num-xl h-outline mb-3 block text-[clamp(6rem,10vw,10rem)]">0{active + 1}</span>
                <h3 className="font-display text-[clamp(1.9rem,2.6vw,3rem)] font-extrabold leading-[1.15] tracking-tight">{cur.title}</h3>
                <p className="mt-4 max-w-xl text-xl leading-relaxed text-ink-2">{cur.text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="relative h-[3px] overflow-hidden rounded-full bg-white/10" aria-hidden>
              <motion.div key={`${active}-${tick}-${held}`} className="h-full origin-left bg-gradient-to-r from-cyan to-violet" initial={{ scaleX: reduce || held ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce || held ? 0 : AUTO_MS / 1000, ease: "linear" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
