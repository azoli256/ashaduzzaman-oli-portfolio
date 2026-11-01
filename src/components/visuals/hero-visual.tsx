"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Pt = [number, number];
const diamond = (cx: number, cy: number, w: number, h: number): string =>
  `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

const CX = 280;
const W = 170;
const H = 92;
const layers = [
  { cy: 372, fill: "url(#slabLow)", op: 0.9, label: "Hosting · DNS · SSL" },
  { cy: 316, fill: "url(#slabMid)", op: 0.95, label: "Platform · Build" },
  { cy: 260, fill: "url(#slabTop)", op: 1, label: "" },
];

// Management (left, cyan) and development (right, blue/violet) nodes.
const nodes = [
  { id: "plan", label: "Plan", x: 62, y: 128, side: "l", d: 0 },
  { id: "people", label: "People", x: 36, y: 292, side: "l", d: 900 },
  { id: "risk", label: "Risk", x: 84, y: 456, side: "l", d: 1800 },
  { id: "build", label: "Build", x: 498, y: 128, side: "r", d: 600 },
  { id: "qa", label: "QA", x: 524, y: 292, side: "r", d: 1500 },
  { id: "launch", label: "Launch", x: 476, y: 456, side: "r", d: 2400 },
] as const;

const hub: Pt = [CX, 236];

export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: "100px" });
  const reduce = usePrefersReducedMotion();
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const nx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const ny = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    px.set(dx * -10);
    py.set(dy * -8);
    nx.set(dx * 16);
    ny.set(dy * 12);
  };
  const onLeave = () => [px, py, nx, ny].forEach((v) => v.set(0));

  const top = layers[2]!;
  const A: Pt = [CX, top.cy - H];
  const B: Pt = [CX + W, top.cy];
  const C: Pt = [CX, top.cy + H];
  const D: Pt = [CX - W, top.cy];

  return (
    <div
      ref={wrap}
      data-paused={!inView}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[600px]"
    >
      {/* soft ambient glow behind the composition */}
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-cyan/20 blur-[90px]" />
      <div aria-hidden className="absolute inset-[24%] left-[40%] rounded-full bg-violet/20 blur-[90px]" />

      <svg viewBox="0 0 560 560" role="img" aria-label="Abstract diagram: planning and people on the left and build, testing and launch on the right, connected through a layered website architecture at the centre." className="relative size-full overflow-visible">
        <defs>
          <linearGradient id="slabTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22C5EA" stopOpacity="0.55" />
            <stop offset="1" stopColor="#518BFF" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="slabMid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#518BFF" stopOpacity="0.32" />
            <stop offset="1" stopColor="#8575F7" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="slabLow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#16263A" stopOpacity="0.95" />
            <stop offset="1" stopColor="#111E30" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="linkL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22C5EA" stopOpacity="0.15" />
            <stop offset="1" stopColor="#22C5EA" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="linkR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#8575F7" stopOpacity="0.15" />
            <stop offset="1" stopColor="#518BFF" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="hubGlow">
            <stop offset="0" stopColor="#22C5EA" stopOpacity="0.9" />
            <stop offset="1" stopColor="#22C5EA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layered architecture */}
        <motion.g style={{ x: px, y: py }}>
          {/* corner struts between slabs */}
          {[D, B, C].map((p, i) => (
            <line key={i} x1={p[0]} y1={p[1]} x2={p[0]} y2={p[1] + 112} stroke="#518BFF" strokeOpacity="0.28" strokeDasharray="2 5" />
          ))}
          {layers.map((l, i) => (
            <g key={i}>
              <polygon points={diamond(CX, l.cy, W, H)} fill={l.fill} opacity={l.op} stroke={i === 2 ? "#22C5EA" : "#518BFF"} strokeOpacity={i === 2 ? 0.75 : 0.35} strokeWidth="1.2" />
              {/* thickness */}
              <polyline points={`${CX - W},${l.cy} ${CX - W},${l.cy + 9} ${CX},${l.cy + H + 9} ${CX + W},${l.cy + 9} ${CX + W},${l.cy}`} fill="none" stroke={i === 2 ? "#22C5EA" : "#518BFF"} strokeOpacity="0.25" />
            </g>
          ))}
          {/* iso grid on the top slab */}
          {[0.25, 0.5, 0.75].map((t) => {
            const a1 = lerp(A, B, t), d1 = lerp(D, C, t);
            const a2 = lerp(A, D, t), b2 = lerp(B, C, t);
            return (
              <g key={t} stroke="#bff3ff" strokeOpacity="0.18" strokeWidth="1">
                <line x1={a1[0]} y1={a1[1]} x2={d1[0]} y2={d1[1]} />
                <line x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} />
              </g>
            );
          })}
          {/* hub */}
          <circle cx={hub[0]} cy={hub[1] + 24} r="46" fill="url(#hubGlow)" opacity="0.7" />
          <circle cx={hub[0]} cy={hub[1] + 24} r="9" fill="#F2F6FC" />
          <circle className="pulse-ring" cx={hub[0]} cy={hub[1] + 24} r="14" fill="none" stroke="#22C5EA" strokeWidth="1.5" />
          {/* layer labels */}
          <text x={CX} y={layers[0]!.cy + H + 34} textAnchor="middle" fontSize="11" letterSpacing="2" fill="#74849B" fontFamily="var(--font-manrope)" fontWeight="700">HOSTING · DNS · SSL</text>
        </motion.g>

        {/* Connected nodes */}
        <motion.g style={{ x: nx, y: ny }}>
          {nodes.map((n) => {
            const left = n.side === "l";
            const sx = n.x + (left ? 34 : -34);
            const ex = hub[0] + (left ? -34 : 34);
            const ey = hub[1] + 24;
            const path = `M${sx},${n.y} C${(sx + ex) / 2},${n.y} ${(sx + ex) / 2},${ey} ${ex},${ey}`;
            return (
              <g key={n.id}>
                <path d={path} fill="none" stroke={left ? "url(#linkL)" : "url(#linkR)"} strokeWidth="2" className="flow" />
                <path id={`p-${n.id}`} d={path} fill="none" stroke="none" />
                <circle className="motion-dot" r="3.2" fill={left ? "#22C5EA" : "#518BFF"}>
                  <animateMotion dur={`${5 + (n.d % 3)}s`} begin={`-${n.d / 1000}s`} repeatCount="indefinite" keyPoints={left ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear">
                    <mpath href={`#p-${n.id}`} />
                  </animateMotion>
                </circle>
                <g className="float" style={{ ["--d" as string]: n.d }}>
                  <rect x={n.x - 38} y={n.y - 17} width="76" height="34" rx="17" fill="#0C1525" fillOpacity="0.88" stroke={left ? "#22C5EA" : "#518BFF"} strokeOpacity="0.6" />
                  <circle cx={n.x - 22} cy={n.y} r="3.5" fill={left ? "#22C5EA" : "#8575F7"} />
                  <text x={n.x - 12} y={n.y + 4.5} fontSize="13" fontWeight="700" fill="#F2F6FC" fontFamily="var(--font-manrope)">{n.label}</text>
                </g>
              </g>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}
