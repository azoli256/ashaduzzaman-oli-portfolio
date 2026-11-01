"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { PillarItem } from "@/types";
import { cn } from "@/lib/utils";

const R = 190; // dial radius in a 520 box
const C = 260; // dial centre

/**
 * Desktop scroll story as a control dial. The section is tall and the stage is `position: sticky`,
 * so the browser keeps native scrolling: scroll position selects the stage and sweeps the arc.
 */
export function WorkflowPinned({ steps }: { steps: PillarItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const sweep = useTransform(smooth, [0, 1], [0.0001, 1]);
  const packetDeg = useTransform(smooth, [0, 1], [0, 360]);
  const [active, setActive] = useState(0);

  // pointer tilt for depth
  const rx = useSpring(0, { stiffness: 120, damping: 18 });
  const ry = useSpring(0, { stiffness: 120, damping: 18 });

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
  const n = steps.length;
  const nodeAt = (i: number) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a), a };
  };

  return (
    <div ref={ref} style={{ height: `${n * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
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
                  <span key={st.title} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= active ? "bg-gradient-to-r from-cyan to-blue" : "bg-white/10")} />
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
            <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative mx-auto aspect-square w-full max-w-[34rem] [transform-style:preserve-3d]">
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
                  <circle cx={C} cy={C} r="248" fill="none" stroke="#a6b5c9" strokeOpacity="0.35" strokeWidth="8" strokeDasharray="1.5 10.2" />
                </g>
                <circle cx={C} cy={C} r="226" fill="none" stroke="#518bff" strokeOpacity="0.22" strokeDasharray="3 8" />
                <circle cx={C} cy={C} r={R} fill="none" stroke="#82a0c8" strokeOpacity="0.2" strokeWidth="2" />
                <motion.circle cx={C} cy={C} r={R} fill="none" stroke="url(#dial-grad)" strokeWidth="4" strokeLinecap="round" transform={`rotate(-90 ${C} ${C})`} style={{ pathLength: sweep }} />
                <motion.g style={{ rotate: packetDeg, originX: `${C}px`, originY: `${C}px` }}>
                  <circle cx={C} cy={C - R} r="14" fill="#22c5ea" opacity="0.25" />
                  <circle cx={C} cy={C - R} r="6" fill="#fff" />
                </motion.g>
                <circle cx={C} cy={C} r="132" fill="none" stroke="#fff" strokeOpacity="0.06" />
              </svg>

              {/* centre read-out */}
              <div className="absolute left-1/2 top-1/2 grid w-[44%] -translate-x-1/2 -translate-y-1/2 place-items-center text-center">
                <span className="num-xl text-gradient block text-[clamp(3.4rem,6vw,5.4rem)]">0{active + 1}</span>
                <span className="mt-2 font-display text-base font-bold leading-tight tracking-tight text-ink-2">{s.title}</span>
              </div>

              {/* nodes */}
              {steps.map((st, i) => {
                const p = nodeAt(i);
                const on = i === active;
                const right = Math.cos(p.a) > 0.2;
                const left = Math.cos(p.a) < -0.2;
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
                    <span
                      aria-hidden
                      className={cn("pointer-events-none absolute whitespace-nowrap font-display text-sm font-bold tracking-tight transition-colors duration-300", on ? "text-ink" : "text-muted", right ? "left-8 top-0 -translate-y-1/2" : left ? "right-8 top-0 -translate-y-1/2" : p.y < C ? "-top-12 left-0 -translate-x-1/2" : "top-9 left-0 -translate-x-1/2")}
                    >
                      {st.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
