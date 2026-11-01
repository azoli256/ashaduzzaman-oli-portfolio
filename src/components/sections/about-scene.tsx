"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type Sat = { key: string; label: string; color: string; a0: number; r0: number; a1: number; r1: number };

/** Three disciplines start on wide, separate orbits and are drawn into the AO core as the visitor scrolls. */
const sats: Sat[] = [
  { key: "strategy", label: "Strategy", color: "#22c5ea", a0: -100, r0: 0.44, a1: -90, r1: 0.215 },
  { key: "technology", label: "Technology", color: "#8575f7", a0: 20, r0: 0.35, a1: 30, r1: 0.215 },
  { key: "people", label: "People", color: "#d6e8ff", a0: 140, r0: 0.47, a1: 150, r1: 0.215 },
];

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function AboutScene({ paragraphs, eyebrow, heading }: { paragraphs: string[]; eyebrow: React.ReactNode; heading: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const orbit = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current;
      const orbitEl = orbit.current;
      const copyEl = copy.current;
      if (!trackEl || !orbitEl || !copyEl) return;

      const satEls = gsap.utils.toArray<HTMLElement>("[data-sat]", orbitEl);
      const lineEls = gsap.utils.toArray<SVGLineElement>("[data-line]", orbitEl);
      const rings = orbitEl.querySelector<SVGGElement>("[data-rings]");
      const core = orbitEl.querySelector<HTMLElement>("[data-core]");
      const ring1 = orbitEl.querySelector("[data-ring='1']");
      const ring2 = orbitEl.querySelector("[data-ring='2']");
      const ring3 = orbitEl.querySelector("[data-ring='3']");

      gsap.set(satEls, { xPercent: -50, yPercent: -50 });

      const place = (p: number) => {
        const W = orbitEl.offsetWidth;
        const e = easeInOut(p);
        sats.forEach((s, i) => {
          const a = ((s.a0 + (360 + (s.a1 - s.a0)) * e) * Math.PI) / 180;
          const r = s.r0 + (s.r1 * (W < 520 ? 1.5 : 1) - s.r0) * e;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          const el = satEls[i];
          const ln = lineEls[i];
          if (el) gsap.set(el, { x: x * W, y: y * W });
          if (ln) {
            ln.setAttribute("x2", String(500 + x * 1000));
            ln.setAttribute("y2", String(500 + y * 1000));
            ln.style.opacity = String(0.25 + 0.5 * e);
          }
        });
        if (rings) gsap.set(rings, { scale: 1 - 0.22 * e, svgOrigin: "500 500", opacity: 1 - 0.35 * e });
        if (core) {
          core.style.boxShadow = `0 0 ${40 + 90 * e}px ${6 + 22 * e}px rgba(34,197,234,${0.18 + 0.3 * e}), inset 0 0 40px rgba(255,255,255,${0.04 + 0.08 * e})`;
          gsap.set(core, { scale: 0.92 + 0.14 * e });
        }
      };

      const paragraphsEls = gsap.utils.toArray<HTMLElement>("[data-about-p]", copyEl);
      const bar = copyEl.querySelector<HTMLElement>("[data-about-bar]");
      const mm = gsap.matchMedia();

      // Always-on idle motion for the rings; paused whenever the section is off-screen.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const idle = [
          ring1 && gsap.to(ring1, { rotation: 360, svgOrigin: "500 500", duration: 90, repeat: -1, ease: "none" }),
          ring2 && gsap.to(ring2, { rotation: -360, svgOrigin: "500 500", duration: 140, repeat: -1, ease: "none" }),
          ring3 && gsap.to(ring3, { rotation: 360, svgOrigin: "500 500", duration: 220, repeat: -1, ease: "none" }),
        ].filter(Boolean) as gsap.core.Tween[];
        ScrollTrigger.create({ trigger: trackEl, start: "top bottom", end: "bottom top", onToggle: (self) => idle.forEach((t) => t.paused(!self.isActive)) });
      });

      // Mouse only: the orbit leans toward the pointer for depth.
      mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(orbitEl, { transformPerspective: 1000 });
        const rx = gsap.quickTo(orbitEl, "rotationX", { duration: 0.7, ease: "power3.out" });
        const ry = gsap.quickTo(orbitEl, "rotationY", { duration: 0.7, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = trackEl.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - window.innerHeight / 2) / window.innerHeight;
          ry(px * 14);
          rx(-py * 12);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        trackEl.addEventListener("pointermove", move);
        trackEl.addEventListener("pointerleave", leave);
        return () => {
          trackEl.removeEventListener("pointermove", move);
          trackEl.removeEventListener("pointerleave", leave);
        };
      });

      // Desktop: one long scrubbed timeline inside a sticky stage.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(paragraphsEls, { type: "words" });
        const words = split.words;
        const n = Math.max(2, words.length);
        const state = { p: 0 };
        gsap.set(words, { opacity: 0.14 });
        place(0);
        const tl = gsap.timeline({ scrollTrigger: { trigger: trackEl, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true } });
        tl.to(state, { p: 1, ease: "none", duration: 1, onUpdate: () => place(state.p) }, 0);
        tl.to(words, { opacity: 1, ease: "none", duration: 0.1, stagger: { each: 0.9 / (n - 1) } }, 0);
        if (bar) tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1, transformOrigin: "top" }, 0);
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // Tablet / phone: no sticky stage. The orbit tightens while it crosses the viewport, text lights up per paragraph.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const state = { p: 0 };
        place(0);
        gsap.to(state, { p: 1, ease: "none", onUpdate: () => place(state.p), scrollTrigger: { trigger: orbitEl, start: "top 85%", end: "bottom 35%", scrub: 0.6 } });
        paragraphsEls.forEach((p) => {
          const split = SplitText.create(p, { type: "words" });
          gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.06, scrollTrigger: { trigger: p, start: "top 88%", end: "bottom 55%", scrub: 0.5 } });
        });
      });

      // Reduced motion: the finished composition, no scroll choreography.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        place(1);
      });
    },
    { scope: track },
  );

  return (
    <div ref={track} className="relative lg:h-[430vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:pt-20">
        <div className="site-w grid items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-0">
          <div ref={orbit} className="relative mx-auto aspect-square w-full max-w-[34rem] select-none lg:max-w-[40rem]">
            <svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full" aria-hidden>
              <defs>
                <radialGradient id="about-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c5ea" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#518bff" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#518bff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="500" cy="500" r="500" fill="url(#about-halo)" />
              <g data-rings>
                <g data-ring="1"><circle cx="500" cy="500" r="190" fill="none" stroke="#22c5ea" strokeOpacity="0.5" strokeDasharray="2 10" strokeWidth="2" /><circle cx="500" cy="310" r="7" fill="#22c5ea" /></g>
                <g data-ring="2"><circle cx="500" cy="500" r="320" fill="none" stroke="#518bff" strokeOpacity="0.38" strokeWidth="1.5" /><circle cx="820" cy="500" r="6" fill="#518bff" /></g>
                <g data-ring="3"><circle cx="500" cy="500" r="455" fill="none" stroke="#8575f7" strokeOpacity="0.3" strokeDasharray="14 18" strokeWidth="1.5" /><circle cx="500" cy="45" r="6" fill="#8575f7" /></g>
              </g>
              {sats.map((s) => (
                <line key={s.key} data-line x1="500" y1="500" x2="500" y2="500" stroke={s.color} strokeWidth="1.5" strokeDasharray="4 6" />
              ))}
            </svg>

            <div data-core className="absolute left-1/2 top-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-[#16324a] to-[#0c1525]">
              <span className="text-gradient font-display text-[clamp(2rem,6vw,3.6rem)] font-extrabold tracking-tighter">AO</span>
            </div>

            {sats.map((s) => (
              <div key={s.key} data-sat className="absolute left-1/2 top-1/2">
                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-bg/70 px-3.5 py-1.5 font-display text-[0.8rem] font-bold backdrop-blur sm:text-sm">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div ref={copy} className="relative lg:pl-10">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block">
              <span data-about-bar className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-cyan to-violet" />
            </span>
            {eyebrow}
            {heading}
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-2 sm:text-lg lg:space-y-3 lg:text-[1.02rem] lg:leading-[1.62]">
              {paragraphs.map((p, i) => (
                <p key={i} data-about-p className={i === 0 ? "text-xl text-ink sm:text-[1.3rem] lg:text-[1.2rem] lg:leading-[1.5]" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <Link href="/about" className="group mt-5 inline-flex min-h-11 items-center gap-2 font-display font-bold text-cyan">
              Full professional profile <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
