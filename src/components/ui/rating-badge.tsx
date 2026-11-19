"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { externalProps } from "@/lib/utils";

type Props = { rating: number; reviews: number; href: string };

/** One star: grey outline underneath, gold fill clipped to `fill` (0-1) on top. */
function Star({ fill, i, hovered, id }: { fill: number; i: number; hovered: boolean; id: string }) {
  const path = "M12 1.8l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 16.8 6 20.2l1.3-6.7-5-4.7 6.8-.8L12 1.8z";
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="size-8 sm:size-10"
      initial={{ scale: 0, rotate: -40, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1, y: hovered ? [0, -7, 0] : 0 }}
      transition={{
        scale: { type: "spring", stiffness: 380, damping: 14, delay: 0.5 + i * 0.12 },
        rotate: { type: "spring", stiffness: 260, damping: 14, delay: 0.5 + i * 0.12 },
        opacity: { duration: 0.2, delay: 0.5 + i * 0.12 },
        y: { duration: 0.5, delay: i * 0.07 },
      }}
      whileHover={{ scale: 1.3, rotate: 12 }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE27A" />
          <stop offset="0.55" stopColor="#FFB62E" />
          <stop offset="1" stopColor="#FF8A1F" />
        </linearGradient>
        <clipPath id={`c-${id}`}><rect x="0" y="0" width={24 * fill} height="24" /></clipPath>
      </defs>
      <path d={path} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeLinejoin="round" />
      <path d={path} fill={`url(#g-${id})`} clipPath={`url(#c-${id})`} className="drop-shadow-[0_0_6px_rgba(255,182,46,0.8)]" />
    </motion.svg>
  );
}

export function RatingBadge({ rating, reviews, href }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const [shown, setShown] = useState(rating);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setShown(0);
    const c = animate(0, rating, { duration: 1.4, delay: 0.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setShown(Math.round(v * 10) / 10) });
    return () => c.stop();
  }, [rating]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); setHovered(false); };
  const fills = [1, 2, 3, 4, 5].map((n) => Math.max(0, Math.min(1, rating - (n - 1))));
  const uid = "rt";

  return (
    <div style={{ perspective: 800 }} className="w-fit">
      <motion.a
        ref={ref}
        href={href}
        {...externalProps}
        onPointerMove={onMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="group relative block overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/[0.12] via-white/[0.04] to-cyan/[0.08] p-4 pr-5 shadow-[0_0_50px_-14px_rgba(255,182,46,0.55)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_0_70px_-8px_rgba(255,182,46,0.85)] sm:p-5"
        aria-label={`Rated ${rating} out of 5 from ${reviews.toLocaleString("en-US")}+ verified Fiverr client reviews. Opens Fiverr profile in a new tab.`}
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] group-hover:translate-x-full" />
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="leading-none">
            <span className="font-display text-5xl font-extrabold tracking-tight text-gradient-gold sm:text-6xl">{shown.toFixed(1)}</span>
          </div>
          <div>
            <div className="flex gap-0.5 sm:gap-1">
              {fills.map((f, i) => <Star key={i} i={i} fill={f} hovered={hovered} id={`${uid}${i}`} />)}
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2">
              <BadgeCheck size={16} className="text-cyan" aria-hidden />
              <span><b className="font-display font-extrabold text-ink">{reviews.toLocaleString("en-US")}+</b> verified Fiverr reviews</span>
              <ArrowUpRight size={15} aria-hidden className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300" />
            </p>
          </div>
        </div>
        <span className="sr-only"> (opens in a new tab)</span>
      </motion.a>
    </div>
  );
}
