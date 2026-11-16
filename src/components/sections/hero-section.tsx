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

const chips: { label: string; dot: string; pos: string; delay: number }[] = [
  { label: "11+ years", dot: "bg-white", pos: "left-[2%] top-[14%] sm:left-[4%]", delay: 0 },
  { label: "Project Management", dot: "bg-cyan", pos: "right-[0%] top-[34%] sm:right-[2%]", delay: 900 },
  { label: "Web Development", dot: "bg-violet", pos: "left-[0%] top-[58%] sm:left-[2%]", delay: 1700 },
];

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-clip">
      <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_20%_45%,rgba(8,14,26,0.9),rgba(8,14,26,0.3)_60%,transparent_85%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-20 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]" />

      <div className="site-w grid flex-1 items-center gap-2 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="pb-6 lg:pb-14">
          <p className="rise inline-flex w-fit items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-cyan" style={d(40)}>
            <span aria-hidden className="relative flex size-2"><span className="pulse-dot absolute inline-flex size-full rounded-full bg-cyan" /><span className="relative size-2 rounded-full bg-cyan" /></span>
            {profile.name} · Project Manager
          </p>

          <h1 id="hero-title" className="h-mega mt-4 max-w-[14ch]">
            {words.map((w, i) => (
              <span key={w.t} className="rise inline-block pr-[0.22em]" style={d(120 + i * 90)}>
                <span className={w.g ? "text-gradient" : undefined}>{w.t}</span>
              </span>
            ))}
          </h1>

          <p className="rise mt-5 max-w-md text-base leading-relaxed text-ink-2" style={d(640)}>
            Digital Project Manager and web developer. I turn client goals into shipped websites because I have built them myself.
          </p>

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
        <div className="rise relative mx-auto h-[25rem] w-full max-w-[20rem] self-end sm:h-[30rem] sm:max-w-[24rem] lg:h-[min(41rem,74svh)] lg:max-w-[28rem]" style={d(300)}>
          <div aria-hidden className="absolute left-1/2 top-[44%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2">
            <div className="halo-spin absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,197,234,0.75)_18%,transparent_38%,rgba(139,92,246,0.7)_62%,transparent_82%)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]" />
            <div className="absolute inset-[7%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(34,197,234,0.22),rgba(139,92,246,0.12)_55%,transparent_72%)] blur-2xl" />
          </div>
          <Image
            src="/images/oli.webp"
            alt="Ashaduzzaman Oli"
            fill
            priority
            sizes="(min-width:1024px) 28rem, 24rem"
            className="portrait-fade object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          />
          {chips.map((c) => (
            <span key={c.label} className={cn("chip-float absolute z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-bg/70 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink backdrop-blur-md sm:text-[0.7rem]", c.pos)} style={d(c.delay)}>
              <span aria-hidden className={cn("size-1.5 rounded-full", c.dot)} />
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <PlatformMarquee />
      </div>
    </section>
  );
}
