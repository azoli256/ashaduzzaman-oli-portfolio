import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { NetworkCanvas } from "@/components/visuals/network-canvas";
import { LensSwitch } from "@/components/ui/lens-switch";
import { PlatformMarquee } from "@/components/ui/platform-marquee";

const d = (n: number) => ({ ["--d" as string]: n }) as React.CSSProperties;

const words: { t: string; g?: boolean }[] = [
  { t: "Where" },
  { t: "Technical", g: true },
  { t: "Understanding", g: true },
  { t: "Meets" },
  { t: "Project" },
  { t: "Leadership." },
];

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-clip">
      <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_18%_45%,rgba(8,14,26,0.88),rgba(8,14,26,0.35)_55%,transparent_80%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-20 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]" />

      <div className="site-w flex flex-1 flex-col justify-center pb-14 pt-28 lg:pt-28">
        <p className="rise inline-flex w-fit items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cyan" style={d(40)}>
          <span aria-hidden className="relative flex size-2"><span className="pulse-dot absolute inline-flex size-full rounded-full bg-cyan" /><span className="relative size-2 rounded-full bg-cyan" /></span>
          {profile.title}
        </p>

        <h1 id="hero-title" className="h-mega mt-5 max-w-[17ch] sm:max-w-[19ch]">
          {words.map((w, i) => (
            <span key={w.t} className="rise inline-block pr-[0.22em]" style={d(120 + i * 90)}>
              <span className={w.g ? "text-gradient" : undefined}>{w.t}</span>
            </span>
          ))}
        </h1>

        <p className="rise mt-6 max-w-lg text-base leading-relaxed text-ink-2 sm:text-lg" style={d(760)}>
          {profile.heroSupport}
        </p>

        <div className="rise mt-7 flex flex-wrap items-center gap-3" style={d(860)}>
          <MagneticButton>
            <Button href="/#work" icon={<ArrowDown size={18} />}>Explore My Work</Button>
          </MagneticButton>
          <Button href="/#contact" variant="secondary">Let&apos;s Connect</Button>
        </div>

        <div className="rise mt-9" style={d(980)}>
          <LensSwitch showCaption={false} />
        </div>
      </div>

      <div className="relative">
        <PlatformMarquee />
      </div>
    </section>
  );
}
