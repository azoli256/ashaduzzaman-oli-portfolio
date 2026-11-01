import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutMonogram() {
  return (
    <div className="surface relative aspect-[4/5] w-full max-w-sm overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_30%,rgba(34,197,234,0.25),transparent)]" />
      <svg viewBox="0 0 320 400" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="160" cy="180" r="110" fill="none" stroke="#22C5EA" strokeOpacity="0.35" strokeDasharray="2 7" />
        <circle cx="160" cy="180" r="76" fill="none" stroke="#518BFF" strokeOpacity="0.45" />
        <circle cx="160" cy="70" r="5" fill="#22C5EA" /><circle cx="270" cy="180" r="5" fill="#518BFF" /><circle cx="160" cy="290" r="5" fill="#8575F7" />
      </svg>
      <span className="absolute inset-x-0 top-[34%] text-center font-display text-7xl font-extrabold tracking-tighter text-gradient">AO</span>
      <div className="absolute inset-x-0 bottom-0 border-t border-line bg-bg/60 p-5 backdrop-blur-md">
        <p className="font-display font-bold">{profile.name}</p>
        <p className="text-sm text-ink-2">{profile.publicLocation}</p>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:order-1"><AboutMonogram /></Reveal>
        <div>
          <SectionHeading id="about-title" index="02" eyebrow="About" title={<>Strategy, technology <span className="text-gradient">and people.</span></>} />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">
            {profile.summary.map((p, i) => (
              <Reveal key={i} delay={0.05 * i} y={14}><p className={i === 0 ? "text-xl text-ink" : ""}>{p}</p></Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/about" className="group inline-flex min-h-11 items-center gap-2 font-display font-bold text-cyan">
              Full professional profile <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
