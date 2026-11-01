import { profile } from "@/data/profile";
import { AboutScene } from "./about-scene";

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
    <section id="about" aria-labelledby="about-title" className="relative">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
      <AboutScene
        paragraphs={profile.summary}
        eyebrow={
          <p className="eyebrow flex items-center gap-3">
            <span className="font-mono text-ink-2/70 tracking-normal">02</span>
            <span aria-hidden className="h-px w-8 bg-cyan/60" />
            About
          </p>
        }
        heading={
          <h2 id="about-title" className="h-section h-about mt-4">
            Strategy, technology <span className="text-gradient">and people.</span>
          </h2>
        }
      />
    </section>
  );
}
