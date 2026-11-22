"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, animate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PillarItem } from "@/types";
import { cn } from "@/lib/utils";

const R = 166; // progress ring radius in a 520 box
const RL = 236; // radius where stage labels sit, outside every ring
const C = 260; // dial centre
const AUTO_MS = 4000; // time the ball takes to travel from one stage to the next

/**
 * Desktop scroll story as a control dial. The section is tall and the stage is `position: sticky`,
 * so the browser keeps native scrolling: scroll position selects the stage and sweeps the arc.
 */
export function WorkflowPinned({ steps }: { steps: PillarItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stickyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stickyRef, { amount: 0.6 });
  const n = steps.length;
  // `pos` only ever counts forward on autoplay, so the ball keeps circling the ring in one direction.
  const [pos, setPos] = useState(0);
  const [tick, setTick] = useState(0);
  const active = ((pos % n) + n) % n;
  const ang = useMotionValue(0);
  const lastP = useRef(0);

  const pick = useCallback(
    (i: number, shortest: boolean) => {
      setPos((p) => {
        const cur = ((p % n) + n) % n;
        let d = (i - cur + n) % n;
        if (shortest && d > n / 2) d -= n;
        return p + d;
      });
      setTick((t) => t + 1);
    },
    [n],
  );

  // scroll still works: moving the page selects the matching stage
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (Math.abs(v - lastP.current) < 0.004) return;
    lastP.current = v;
    pick(Math.min(n - 1, Math.max(0, Math.floor(v * n))), true);
  });

  // the ball glides at a constant speed from one node to the next; it arrives exactly when the stage changes
  useEffect(() => {
    const step = 360 / n;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!inView || reduce) {
      ang.set(pos * step);
      return;
    }
    let stopped = false;
    let ctl: { stop: () => void } | undefined;
    const run = () => {
      ctl = animate(ang, (pos + 1) * step, {
        duration: AUTO_MS / 1000,
        ease: "linear",
        onComplete: () => {
          if (!stopped) setPos((p) => p + 1);
        },
      });
    };
    if (Math.abs(ang.get() - pos * step) > 0.5) {
      // user jumped to a stage: glide there first, then carry on
      ctl = animate(ang, pos * step, { duration: 0.9, ease: [0.4, 0, 0.2, 1], onComplete: () => !stopped && run() });
    } else {
      run();
    }
    return () => {
      stopped = true;
      ctl?.stop();
    };
  }, [inView, pos, tick, n, ang]);

  // pointer tilt for depth
  const rx = useSpring(0, { stiffness: 120, damping: 18 });
  const ry = useSpring(0, { stiffness: 120, damping: 18 });

  const go = (i: number) => pick(i, false);
  const trailDeg = useTransform(ang, (v) => v - 162);

  const s = steps[active] ?? steps[0];
  if (!s) return null;
  const nodeAt = (i: number) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a), a };
  };

  return (
    <div ref={ref} style={{ height: `${n * 48}vh` }} className="relative">
      <div ref={stickyRef} className="sticky top-0 flex h-screen items-center">
        <div className="site-w grid grid-cols-12 items-center gap-10">
          {/* stage card */}
          <div className="col-span-6">
            <div className="surface surface-blur relative overflow-hidden !rounded-3xl p-10 xl:p-12">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
              <div aria-hidden className="absolute -left-20 -top-20 size-72 rounded-full bg-cyan/15 blur-[80px]" />
              {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((c) => (
                <span key={c} aria-hidden className={cn("absolute size-5 border-cyan/60", c)} />
              ))}
              <div className="relative flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                <span>Stage</span>
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <div className="relative mt-6 min-h-[18rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 26, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
                    <span aria-hidden className="num-xl h-outline mb-3 block text-[clamp(6rem,10vw,10rem)]">0{active + 1}</span>
                    <h3 className="font-display text-[clamp(2.2rem,3.2vw,3.6rem)] font-extrabold leading-[1.1] tracking-tight">{s.title}</h3>
                    <p className="mt-4 max-w-lg text-xl leading-relaxed text-ink-2">{s.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="relative mt-8 flex gap-1.5" aria-hidden>
                {steps.map((st, i) => (
                  <span key={st.title} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      key={i === active ? `a${pos}` : `s${i}`}
                      className={cn("absolute inset-0 origin-left rounded-full bg-gradient-to-r from-cyan to-blue", i === active && inView && "seg-fill")}
                      style={{ transform: i < active || (i === active && !inView) ? "scaleX(1)" : "scaleX(0)", animationDuration: `${AUTO_MS}ms` }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* dial */}
          <div
            className="col-span-6 [perspective:1100px]"
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
              rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
            }}
            onPointerLeave={() => {
              rx.set(0);
              ry.set(0);
            }}
          >
            <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative mx-auto aspect-square w-full max-w-[30rem] [transform-style:preserve-3d]">
              <svg viewBox="0 0 520 520" className="absolute inset-0 size-full" aria-hidden>
                <defs>
                  <linearGradient id="dial-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#22c5ea" />
                    <stop offset="1" stopColor="#8575f7" />
                  </linearGradient>
                  <radialGradient id="dial-halo" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#22c5ea" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#22c5ea" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx={C} cy={C} r="260" fill="url(#dial-halo)" />
                <g className="dial-ticks">
                  <circle cx={C} cy={C} r="214" fill="none" stroke="#a6b5c9" strokeOpacity="0.3" strokeWidth="7" strokeDasharray="1.4 8.5" />
                </g>
                <circle cx={C} cy={C} r="194" fill="none" stroke="#518bff" strokeOpacity="0.2" strokeDasharray="3 9" />
                {steps.map((_, i) => {
                  const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
                  return <line key={i} x1={C + 118 * Math.cos(a)} y1={C + 118 * Math.sin(a)} x2={C + (R - 24) * Math.cos(a)} y2={C + (R - 24) * Math.sin(a)} stroke="#82a0c8" strokeOpacity="0.22" strokeDasharray="2 4" />;
                })}
                <circle cx={C} cy={C} r={R} fill="none" stroke="#82a0c8" strokeOpacity="0.2" strokeWidth="2" />
                <motion.g style={{ rotate: trailDeg, originX: 0.5, originY: 0.5, transformBox: "view-box" }}>
                  <circle cx={C} cy={C} r={R} fill="none" stroke="url(#dial-grad)" strokeWidth="5" strokeLinecap="round" pathLength={1} strokeDasharray="0.2 0.8" />
                </motion.g>
                <motion.g style={{ rotate: ang, originX: 0.5, originY: 0.5, transformBox: "view-box" }}>
                  <circle cx={C} cy={C - R} r="22" fill="#22c5ea" opacity="0.14" className="dial-ball-pulse" />
                  <circle cx={C} cy={C - R} r="12" fill="#22c5ea" opacity="0.35" />
                  <circle cx={C} cy={C - R} r="6" fill="#fff" />
                </motion.g>
                <circle cx={C} cy={C} r="118" fill="rgba(10,18,32,0.7)" stroke="#22c5ea" strokeOpacity="0.25" />
              </svg>

              {/* radar sweep behind the read-out */}
              <div aria-hidden className="dial-radar pointer-events-none absolute inset-[27.3%] rounded-full" />

              {/* centre read-out */}
              <div className="absolute left-1/2 top-1/2 grid w-[40%] -translate-x-1/2 -translate-y-1/2 place-items-center text-center">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cyan/80">Stage</span>
                <span className="num-xl text-gradient block text-[clamp(3rem,5.4vw,4.8rem)] leading-none">0{active + 1}</span>
                <span className="mt-2 font-display text-sm font-bold leading-tight tracking-tight text-ink-2">{s.title}</span>
                <span className="mt-1 font-mono text-[0.62rem] tracking-widest text-muted">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              </div>

              {/* nodes */}
              {steps.map((st, i) => {
                const p = nodeAt(i);
                const on = i === active;
                return (
                  <div key={st.title} className="absolute h-0 w-0" style={{ left: `${(p.x / 520) * 100}%`, top: `${(p.y / 520) * 100}%` }}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Go to stage ${i + 1}: ${st.title}`}
                      aria-current={on ? "step" : undefined}
                      className={cn("relative z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-bg font-mono text-xs transition-all duration-500", i <= active ? "border-cyan text-cyan" : "border-line text-muted hover:border-cyan/60", on && "scale-125 shadow-[0_0_0_7px_rgba(34,197,234,0.15),0_0_30px_rgba(34,197,234,0.5)]")}
                    >
                      0{i + 1}
                    </button>
                  </div>
                );
              })}

              {/* stage labels, outside the rings so they never collide with them */}
              {steps.map((st, i) => {
                const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
                const lx = C + RL * Math.cos(a);
                const ly = C + RL * Math.sin(a);
                const on = i === active;
                const right = Math.cos(a) > 0.2;
                const left = Math.cos(a) < -0.2;
                return (
                  <button
                    key={`l-${st.title}`}
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => go(i)}
                    style={{ left: `${(lx / 520) * 100}%`, top: `${(ly / 520) * 100}%` }}
                    className={cn(
                      "absolute z-10 whitespace-nowrap rounded-full border px-3 py-1 font-display text-[0.8rem] font-bold tracking-tight backdrop-blur transition-all duration-300",
                      right ? "-translate-y-1/2" : left ? "-translate-x-full -translate-y-1/2" : ly < C ? "-translate-x-1/2 -translate-y-full" : "-translate-x-1/2",
                      on ? "border-cyan/60 bg-cyan/15 text-ink shadow-[0_0_24px_rgba(34,197,234,0.35)]" : i < active ? "border-cyan/25 bg-bg/70 text-ink-2" : "border-line bg-bg/60 text-muted hover:text-ink-2",
                    )}
                  >
                    {st.title}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
