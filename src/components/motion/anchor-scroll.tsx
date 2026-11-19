"use client";

import { useEffect } from "react";

/**
 * Same-page #hash links scroll to their section with a self-driven animation.
 * Native CSS smooth scrolling can stop short on a long page with sticky/scroll-driven stages,
 * so the target is re-measured every frame and the scroll always lands exactly on it.
 */
export function AnchorScroll() {
  useEffect(() => {
    let raf = 0;
    const stop = () => cancelAnimationFrame(raf);
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targetTop = (el: HTMLElement) => {
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      return Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - margin));
    };

    const go = (el: HTMLElement) => {
      stop();
      const from = window.scrollY;
      const dist = Math.abs(targetTop(el) - from);
      if (reduce() || dist < 4) { window.scrollTo({ top: targetTop(el), behavior: "instant" }); return; }
      const dur = Math.min(1400, 450 + dist * 0.12);
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const to = targetTop(el);
        window.scrollTo({ top: from + (to - from) * ease(p), behavior: "instant" });
        if (p < 1) raf = requestAnimationFrame(step);
        else window.scrollTo({ top: targetTop(el), behavior: "instant" });
      };
      raf = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash || url.hash === "#main") return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", url.hash === "#top" ? url.pathname : url.hash);
      go(el);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      stop();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);
  return null;
}
