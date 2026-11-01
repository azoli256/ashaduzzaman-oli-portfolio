"use client";

import { useEffect, useRef } from "react";

/** Soft page-wide light that follows a mouse pointer. Never mounts listeners for touch or reduced motion. */
export function AmbientCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = 0;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={ref} aria-hidden className="ambient-cursor" />;
}
