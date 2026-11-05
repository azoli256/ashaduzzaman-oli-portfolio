"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type { AdvantageDetail, PillarItem } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const AUTO_MS = 7000;

/** Business request on the left, technical translation on the right. Shared by the HUD panel and the mobile accordion. */
function Translation({ d, compact = false }: { d: AdvantageDetail; compact?: boolean }) {
  return (
    <div className={cn("grid gap-4", compact ? "mt-1" : "sm:grid-cols-[1fr_auto_1.4fr] sm:items-stretch sm:gap-5")}>
      <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="rounded-2xl border border-cyan/25 bg-cyan/[0.06] p-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan">Business says</p>
        <p className="mt-2 text-lg font-semibold leading-snug text-ink">&ldquo;{d.says}&rdquo;</p>
      </motion.div>
      {!compact && (
        <div aria-hidden className="hidden items-center sm:flex">
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="relative block h-px w-10 origin-left bg-gradient-to-r from-cyan to-violet">
            <span className="absolute -right-0.5 -top-[3px] size-[7px] rotate-45 border-r border-t border-violet" />
          </motion.span>
        </div>
      )}
      <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="rounded-2xl border border-violet/30 bg-violet/[0.07] p-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet">Technical reality</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {d.means.map((m, i) => (
            <motion.li key={m} initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, delay: 0.35 + i * 0.07 }} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-sm text-ink-2">
              {m}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/**
 * Seven steps that turn a business request into a buildable plan.
 * Select by click, tap, drag on the track, or keyboard. Auto-play is optional and visible; any manual choice pauses it.
 */
export function AdvantageExplorer({ items, detail }: { items: PillarItem[]; detail: AdvantageDetail[] }) {
  const reduce = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inView = useInView(root, { margin: "-15% 0px -15% 0px" });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dir, setDir] = useState(1);
  const last = items.length - 1;
  const autoOn = playing && !reduce && inView;

  const go = useCallback(
    (i: number, manual = true) => {
      const n = Math.max(0, Math.min(last, i));
      setActive((a) => {
        setDir(n >= a ? 1 : -1);
        return n;
      });
      if (manual) setPlaying(false);
    },
    [last],
  );

  useEffect(() => {
    if (!autoOn) return;
    const id = window.setTimeout(() => {
      setDir(1);
      setActive((a) => (a >= last ? 0 : a + 1));
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, autoOn, last]);

  const idxFromX = (x: number) => {
    const r = track.current?.getBoundingClientRect();
    if (!r || r.width === 0) return active;
    return Math.round(Math.max(0, Math.min(1, (x - r.left) / r.width)) * last);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key;
    if (k === "ArrowRight" || k === "ArrowDown") go(active + 1);
    else if (k === "ArrowLeft" || k === "ArrowUp") go(active - 1);
    else if (k === "Home") go(0);
    else if (k === "End") go(last);
    else return;
    e.preventDefault();
  };

  const pct = (i: number) => (i / last) * 100;
  const cur = items[active] ?? items[0];
  const det = detail[active] ?? detail[0];
  if (!cur || !det) return null;

  return (
    <div ref={root} className="mt-12">
      {/* scrubber (large screens): click, drag or use arrow keys */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em]" aria-hidden>
          <span className="text-cyan">◂ Business goal</span>
          <span className="text-violet">Technical build ▸</span>
        </div>
        <div className="mx-12 mt-4 pb-9 pt-3">
          <div
            ref={track}
            role="slider"
            tabIndex={0}
            aria-label="Technical advantage step"
            aria-valuemin={1}
            aria-valuemax={items.length}
            aria-valuenow={active + 1}
            aria-valuetext={cur.title}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              go(idxFromX(e.clientX));
            }}
            onPointerMove={(e) => dragging.current && go(idxFromX(e.clientX))}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            className="relative h-8 cursor-grab touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 active:cursor-grabbing"
          >
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" />
            <motion.div className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-cyan via-blue to-violet" animate={{ width: `${pct(active)}%` }} transition={{ type: "spring", stiffness: 160, damping: 24 }} />
            {items.map((it, i) => (
              <button
                key={it.title}
                type="button"
                tabIndex={-1}
                aria-hidden
                className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-3"
                style={{ left: `${pct(i)}%` }}
              >
                <span className={cn("block size-3 rounded-full border transition-all duration-300 group-hover:scale-150", i <= active ? "border-cyan bg-cyan" : "border-ink-2/40 bg-bg")} />
                <span className={cn("absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors", i === active ? "text-ink" : "text-muted group-hover:text-ink-2")}>{detail[i]?.label}</span>
              </button>
            ))}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_30px_8px_rgba(34,197,234,0.55)]"
              animate={{ left: `${pct(active)}%` }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* list / accordion */}
        <ol aria-label="Technical advantages" className="lg:col-span-5">
          {items.map((it, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={it.title} className="relative border-t border-line last:border-b">
                {on && <motion.span layoutId="adv-bar" aria-hidden className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-cyan to-violet" />}
                <button type="button" onClick={() => go(i)} aria-expanded={on} aria-current={on ? "step" : undefined} className="group flex w-full items-center gap-5 py-4 pl-4 text-left sm:py-5">
                  <span className={cn("font-mono text-sm transition-colors", on ? "text-cyan" : done ? "text-cyan/60" : "text-muted")}>0{i + 1}</span>
                  <span className={cn("flex-1 font-display text-xl font-bold leading-snug tracking-tight transition-colors duration-300 sm:text-2xl", on ? "text-ink" : "text-ink-2 group-hover:text-ink")}>{it.title}</span>
                  <span aria-hidden className={cn("mr-1 font-mono text-xs transition-all", on ? "text-cyan opacity-100" : "opacity-0 group-hover:opacity-60")}>{on ? "●" : "→"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="m" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden pl-[3.4rem] pr-1 lg:hidden">
                      <p className="text-ink-2">{it.text}</p>
                      <div className="mt-4">
                        <Translation d={det} compact />
                      </div>
                      <p className="mt-4 flex gap-2 pb-5 text-sm text-ink-2">
                        <span aria-hidden className="text-cyan">✓</span>
                        {det.outcome}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        {/* HUD panel (large screens) */}
        <div className="relative hidden lg:col-span-7 lg:block">
          <div className="surface surface-blur relative flex h-full min-h-[27rem] flex-col justify-between overflow-hidden !rounded-3xl p-9">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
            <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-cyan/15 blur-[90px]" />
            <div aria-hidden className="absolute -bottom-28 -left-16 size-80 rounded-full bg-violet/15 blur-[90px]" />
            {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((c) => (
              <span key={c} aria-hidden className={cn("absolute size-5 border-cyan/60", c)} />
            ))}

            <div className="relative flex items-center justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span>Request → Plan</span>
              <span className="flex items-center gap-3">
                <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous step" className="grid size-8 place-items-center rounded-full border border-line text-ink-2 transition hover:border-cyan/60 hover:text-ink disabled:opacity-30">‹</button>
                <span aria-hidden>
                  {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => go(active + 1)} disabled={active === last} aria-label="Next step" className="grid size-8 place-items-center rounded-full border border-line text-ink-2 transition hover:border-cyan/60 hover:text-ink disabled:opacity-30">›</button>
                <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={playing && !reduce} aria-label={playing ? "Pause auto-play" : "Start auto-play"} className="rounded-full border border-line px-3 py-1.5 tracking-[0.16em] text-ink-2 transition hover:border-cyan/60 hover:text-ink">
                  {playing && !reduce ? "❚❚ Pause" : "▶ Play"}
                </button>
              </span>
            </div>

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div key={active} custom={dir} initial={{ opacity: 0, x: 28 * dir, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -20 * dir }} transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }} className="relative my-7" aria-live="polite">
                <div className="flex items-end gap-5">
                  <span aria-hidden className="num-xl h-outline block text-[clamp(4.5rem,7vw,7rem)] leading-none">0{active + 1}</span>
                  <div className="pb-1">
                    <h3 className="font-display text-[clamp(1.6rem,2.2vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">{cur.title}</h3>
                    <p className="mt-2 max-w-xl text-lg leading-relaxed text-ink-2">{cur.text}</p>
                  </div>
                </div>
                <div className="mt-7">
                  <Translation d={det} />
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 flex items-start gap-3 text-ink-2">
                  <span aria-hidden className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-[0.7rem] text-cyan">✓</span>
                  <span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">Result · </span>
                    {det.outcome}
                  </span>
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="relative h-[3px] overflow-hidden rounded-full bg-white/10" aria-hidden>
              {autoOn ? (
                <motion.div key={`auto-${active}`} className="h-full origin-left bg-gradient-to-r from-cyan to-violet" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTO_MS / 1000, ease: "linear" }} />
              ) : (
                <motion.div className="h-full origin-left bg-gradient-to-r from-cyan to-violet" animate={{ scaleX: (active + 1) / items.length }} transition={{ duration: 0.4 }} />
              )}
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">Click a step · drag the track · use ← →</p>
        </div>
      </div>
    </div>
  );
}
