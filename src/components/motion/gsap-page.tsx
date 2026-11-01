"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Page-wide GSAP choreography. Renders nothing: it finds existing elements by selector, so
 * no section needs to know about it. Everything lives inside one gsap.matchMedia() scope,
 * so it is reverted on unmount and skipped entirely under prefers-reduced-motion.
 * Native scrolling is never intercepted.
 */
export function GsapPage() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel);

      // 1. Hero: headline drifts up and softens as the page is scrolled away.
      const heroTitle = document.querySelector("#top h1");
      if (heroTitle) {
        gsap.to(heroTitle, { yPercent: -14, opacity: 0.15, ease: "none", scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } });
      }

      // 2. Section headings: words rise out of a mask.
      q<HTMLElement>("main section h2").forEach((h) => {
        const split = SplitText.create(h, { type: "words", mask: "words" });
        // Gradient text does not survive being split: give each word inside a gradient span its own gradient.
        split.words.forEach((w) => {
          if (w.closest(".text-gradient")) w.classList.add("text-gradient");
        });
        gsap.from(split.words, {
          yPercent: 110,
          rotate: 4,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: h, start: "top 85%", once: true },
        });
      });

      // 3. Big numerals drift against the scroll (depth).
      q<HTMLElement>(".num-xl").forEach((el) => {
        gsap.fromTo(el, { yPercent: 10 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 4. Ambient glow orbs move at their own speed.
      q<HTMLElement>('section [class*="blur-["]').forEach((el, i) => {
        gsap.fromTo(el, { y: -50 - (i % 3) * 20 }, { y: 70 + (i % 3) * 25, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 5. Hairlines draw outward when they enter.
      q<HTMLElement>(".hairline").forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: "50% 50%", duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 95%", once: true } });
      });

      // 6. Staggered entrances for list-style content.
      const lists: [string, string][] = [
        ["#expertise", "li"],
        ["#advantage", "li"],
        ["#experience", "li"],
        ["#technology", "li"],
        ["#work", "ul > li"],
        ["#trust", "li"],
      ];
      lists.forEach(([sec, sel]) => {
        const root = document.querySelector(sec);
        if (!root) return;
        const items = gsap.utils.toArray<HTMLElement>(sel, root);
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: 0.07, from: "start" },
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: items[0], start: "top 88%", once: true },
        });
      });

      // 7. Contact actions pop in one after another.
      const contactItems = q<HTMLElement>("#contact a, #contact button");
      if (contactItems.length) {
        gsap.from(contactItems, { opacity: 0, y: 26, scale: 0.96, duration: 0.7, ease: "back.out(1.6)", stagger: 0.08, clearProps: "opacity,transform", scrollTrigger: { trigger: "#contact", start: "top 55%", once: true } });
      }

      // 8. Capability ticker: GSAP-driven, speeds up with scroll velocity and eases back.
      const track = document.querySelector<HTMLElement>(".marquee-track");
      if (track) {
        track.style.animation = "none";
        const loop = gsap.to(track, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const boost = Math.min(7, 1 + Math.abs(self.getVelocity()) / 350);
            gsap.to(loop, { timeScale: boost * (self.direction === -1 ? -1 : 1), duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.25, overwrite: "auto" });
          },
        });
      }

      // 9. Fonts and images change layout: make every trigger re-measure once things settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      return () => window.removeEventListener("load", refresh);
    });

    return () => mm.revert();
  });

  return null;
}
