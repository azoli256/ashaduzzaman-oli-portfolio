import { RatingBadge } from "@/components/ui/rating-badge";
import { metrics } from "@/data/metrics";
import { Fragment } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { NetworkCanvas } from "@/components/visuals/network-canvas";
import { LensSwitch } from "@/components/ui/lens-switch";
import { PlatformMarquee } from "@/components/ui/platform-marquee";
import { cn } from "@/lib/utils";

const d = (n: number) => ({ ["--d" as string]: n }) as React.CSSProperties;

const words: { t: string; g?: boolean }[] = [
  { t: "Project" },
  { t: "leadership" },
  { t: "that", },
  { t: "speaks", g: true },
  { t: "developer.", g: true },
];

const chips: { label: string; dot: string; pos: string; line: string; delay: number }[] = [
  { label: "11+ years", dot: "bg-white", pos: "-left-2 top-[12%] sm:-left-24", line: "left-full from-white/50 to-transparent", delay: 0 },
  { label: "Project Management", dot: "bg-cyan", pos: "-right-2 top-[36%] sm:-right-40", line: "right-full from-transparent to-cyan/60", delay: 900 },
  { label: "Web Development", dot: "bg-violet", pos: "-left-2 top-[58%] sm:-left-36", line: "left-full from-violet/60 to-transparent", delay: 1700 },
];

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-clip">
      <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_20%_45%,rgba(8,14,26,0.9),rgba(8,14,26,0.3)_60%,transparent_85%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-20 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]" />

      <div className="site-w grid flex-1 items-center gap-2 pt-24 lg:grid-cols-[1fr_1fr] lg:gap-6">
        <div className="pb-6 lg:pb-14">
          <p className="rise inline-flex w-fit items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-cyan" style={d(40)}>
            <span aria-hidden className="relative flex size-2"><span className="pulse-dot absolute inline-flex size-full rounded-full bg-cyan" /><span className="relative size-2 rounded-full bg-cyan" /></span>
            {profile.name} · Project Manager
          </p>

          <h1 id="hero-title" className="h-mega mt-4 max-w-[14ch]">
            {words.map((w, i) => (
              <Fragment key={w.t}>
                <span className="rise inline-block pr-[0.22em]" style={d(120 + i * 90)}>
                  <span className={w.g ? "text-gradient" : undefined}>{w.t}</span>
                </span>{" "}
              </Fragment>
            ))}
            <span className="sr-only"> — Ashaduzzaman Oli, Digital Project Manager and web developer in Dhaka, Bangladesh</span>
          </h1>

          <p className="rise mt-5 max-w-md text-base leading-relaxed text-ink-2" style={d(640)}>
            Digital Project Manager and web developer. I turn client goals into shipped websites because I have built them myself.
          </p>

          <div className="mt-6">
            <RatingBadge rating={metrics.fiverrRating} reviews={metrics.fiverrReviews} href={profile.fiverr} />
          </div>

          <div className="rise mt-6 flex flex-wrap items-center gap-3" style={d(760)}>
            <MagneticButton>
              <Button href="/#work" icon={<ArrowDown size={18} />}>Explore My Work</Button>
            </MagneticButton>
            <Button href="/#contact" variant="secondary">Let&apos;s Connect</Button>
          </div>

          <div className="rise mt-7" style={d(880)}>
            <LensSwitch showCaption={false} />
          </div>
        </div>

        {/* portrait */}
        <div className="rise relative mx-auto flex w-full items-end justify-center self-end max-lg:order-first" style={d(300)}>
          <span aria-hidden className="h-outline pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 select-none font-display text-[clamp(9rem,24vw,22rem)] font-extrabold leading-none tracking-tighter">OLI</span>
          <div aria-hidden className="halo-spin absolute left-1/2 top-[42%] aspect-square w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,197,234,0.7)_16%,transparent_36%,rgba(139,92,246,0.65)_60%,transparent_80%)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]" />
          <div aria-hidden className="absolute left-1/2 top-[46%] aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,197,234,0.25),rgba(139,92,246,0.15)_50%,transparent_70%)] blur-2xl" />

          <div className="relative h-[22rem] sm:h-[37.4rem] lg:h-[min(52.8rem,90svh)]" style={{ aspectRatio: "725 / 1290" }}>
            {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2"].map((c) => (
              <span key={c} aria-hidden className={cn("absolute z-10 size-6 border-cyan/70", c)} />
            ))}
            <div className="portrait-fade absolute inset-0">
              {/* Layer 1: cold blue hologram state. Layer 2: true colour, revealed top-to-bottom by the scan. */}
              <Image
                src="/images/oli.webp"
                alt=""
                aria-hidden
                fill
                priority
                sizes="(min-width:1024px) 34rem, 22rem"
                className="portrait-blue object-contain object-bottom"
              />
              <Image
                src="/images/oli.webp"
                alt="Ashaduzzaman Oli, Digital Project Manager and web developer"
                fill
                priority
                sizes="(min-width:1024px) 34rem, 22rem"
                className="portrait-reveal object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
              <span aria-hidden className="scan-sweep pointer-events-none absolute inset-x-[-6%] z-10" />
            </div>
            {chips.map((c) => (
              <span key={c.label} className={cn("chip-float absolute max-sm:hidden z-20 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-bg/75 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink backdrop-blur-md sm:text-[0.7rem]", c.pos)} style={d(c.delay)}>
                <span aria-hidden className={cn("size-1.5 rounded-full", c.dot)} />
                {c.label}
                <span aria-hidden className={cn("absolute top-1/2 hidden h-px w-10 bg-gradient-to-r sm:block", c.line)} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <PlatformMarquee />
      </div>
    </section>
  );
}
