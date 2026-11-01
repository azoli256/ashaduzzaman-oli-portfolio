import { technicalAdvantage } from "@/data/expertise";
import { Reveal } from "@/components/motion/reveal";
import { AdvantageExplorer } from "./advantage-explorer";

export function TechnicalAdvantageSection() {
  return (
    <section id="advantage" aria-labelledby="advantage-title" className="relative overflow-clip bg-bg-2/70 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 hairline" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-violet/10 blur-[120px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-cyan/10 blur-[120px]" />

      <div className="site-w relative">
        <div className="max-w-5xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="font-mono text-ink-2/70 tracking-normal">04</span>
            <span aria-hidden className="h-px w-8 bg-cyan/60" />
            The Technical Advantage
          </p>
          <h2 id="advantage-title" className="h-section h-adv mt-5">
            More Than Managing Projects. <span className="text-gradient block">Understanding How They&apos;re Built.</span>
          </h2>
          <Reveal className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-ink-2">A strong project manager should understand the technical challenges behind the deliverables. Years of hands-on development shape how I plan, communicate and decide.</p>
          </Reveal>
        </div>

        <AdvantageExplorer items={technicalAdvantage} />
      </div>
    </section>
  );
}
