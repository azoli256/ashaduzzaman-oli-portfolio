"use client";

import { useEffect, useRef } from "react";
import { useLens, type Lens } from "@/components/motion/lens-context";

type Group = "pm" | "dev" | "bridge";
type Node = { x: number; y: number; vx: number; vy: number; ax: number; ay: number; g: Group; r: number; ph: number; a: number };

const CYAN = [34, 197, 234] as const;
const VIOLET = [133, 117, 247] as const;
const WHITE = [214, 232, 255] as const;
const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

/** Target visibility per group for each lens. */
const target = (lens: Lens, g: Group) => {
  if (g === "bridge") return lens === "both" ? 1 : 0.35;
  if (lens === "both") return 0.95;
  return lens === g ? 1 : 0.14;
};

/**
 * Ambient node network: cyan nodes = project management, violet = web development,
 * white bridge nodes join them. Reacts to the cursor, pauses off-screen, and
 * renders a single static frame under reduced motion.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const { lens } = useLens();
  const ref = useRef<HTMLCanvasElement>(null);
  const lensRef = useRef<Lens>(lens);
  const redrawRef = useRef<() => void>(() => {});

  useEffect(() => {
    lensRef.current = lens;
    redrawRef.current();
  }, [lens]);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, on: false };

    // Deterministic pseudo-random so server/client and reloads look the same.
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      seed = 7;
      const small = w < 640;
      const count = small ? 34 : w < 1100 ? 54 : 74;
      nodes = [];
      for (let i = 0; i < count; i++) {
        const g: Group = i % 9 === 0 ? "bridge" : i % 2 === 0 ? "pm" : "dev";
        // Anchors: PM top-left of the field, dev bottom-right, bridge through the middle.
        const cx = g === "pm" ? 0.62 : g === "dev" ? 0.86 : 0.74;
        const cy = g === "pm" ? 0.32 : g === "dev" ? 0.68 : 0.5;
        const spread = g === "bridge" ? 0.12 : 0.17;
        const ax = (small ? 0.5 : cx) + (rnd() - 0.5) * 2 * spread * (small ? 1.6 : 1);
        const ay = (small ? (g === "pm" ? 0.3 : g === "dev" ? 0.72 : 0.5) : cy) + (rnd() - 0.5) * 2 * spread * 1.4;
        nodes.push({ x: ax * w, y: ay * h, vx: 0, vy: 0, ax: ax * w, ay: ay * h, g, r: g === "bridge" ? 2.6 : 1.4 + rnd() * 1.6, ph: rnd() * Math.PI * 2, a: target(lensRef.current, g) });
      }
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(0);
    };

    const colour = (g: Group) => (g === "pm" ? CYAN : g === "dev" ? VIOLET : WHITE);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const link = w < 640 ? 96 : 138;
      const lensNow = lensRef.current;

      for (const n of nodes) n.a += (target(lensNow, n.g) - n.a) * 0.06;

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > link) continue;
          const cross = a.g !== b.g && a.g !== "bridge" && b.g !== "bridge";
          if (cross && d > link * 0.55) continue;
          const k = (1 - d / link) * Math.min(a.a, b.a);
          const c = a.g === b.g ? colour(a.g) : a.g === "bridge" ? colour(b.g) : colour(a.g);
          ctx.strokeStyle = rgba(c, k * (cross ? 0.5 : 0.42));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // cursor links + glow
      if (pointer.on) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180);
        g.addColorStop(0, "rgba(34,197,234,0.16)");
        g.addColorStop(1, "rgba(34,197,234,0)");
        ctx.fillStyle = g;
        ctx.fillRect(pointer.x - 180, pointer.y - 180, 360, 360);
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d > 170) continue;
          ctx.strokeStyle = rgba(colour(n.g), (1 - d / 170) * 0.55 * n.a);
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const c = colour(n.g);
        const pulse = 0.85 + 0.15 * Math.sin(t / 900 + n.ph);
        ctx.fillStyle = rgba(c, 0.16 * n.a);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4.2 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(c, 0.95 * n.a);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (t: number) => {
      for (const n of nodes) {
        // gentle orbit around the anchor + spring back
        const ox = Math.cos(t / 3200 + n.ph) * 10;
        const oy = Math.sin(t / 2700 + n.ph) * 10;
        n.vx += (n.ax + ox - n.x) * 0.0035;
        n.vy += (n.ay + oy - n.y) * 0.0035;
        if (pointer.on) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 130) {
            const f = (1 - d / 130) * 1.1;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        n.vx *= 0.9;
        n.vy *= 0.9;
        n.x += n.vx;
        n.y += n.vy;
      }
      draw(t);
    };

    const loop = (t: number) => {
      if (!running) return;
      step(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    redrawRef.current = () => {
      // keep lens changes visible even when the loop is idle (reduced motion / off-screen)
      if (!running) {
        for (let i = 0; i < 30; i++) for (const n of nodes) n.a += (target(lensRef.current, n.g) - n.a) * 0.2;
        draw(0);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onVis = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);
    if (fine && !reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVis);
    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      redrawRef.current = () => {};
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
