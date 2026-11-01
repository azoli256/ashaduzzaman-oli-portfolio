import { technicalAdvantage } from "@/data/expertise";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { BridgeVisual } from "@/components/visuals/bridge-visual";

export function TechnicalAdvantageSection() {
  return (
    <section id="advantage" aria-labelledby="advantage-title" className="relative overflow-hidden bg-bg-2/70 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 hairline" />
      <div aria-hidden className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-violet/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="advantage-title" index="04" eyebrow="The Technical Advantage" title={<>More Than Managing Projects. <span className="text-gradient">Understanding How They&apos;re Built.</span></>} text="A strong project manager should understand the technical challenges behind the deliverables. Years of hands-on development shape how I plan, communicate and decide." />
          <Reveal delay={0.1} className="mt-10 max-w-md">
            <BridgeVisual />
          </Reveal>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-cyan via-blue to-violet opacity-50" />
          {technicalAdvantage.map((it, i) => (
            <li key={it.title} className="relative">
              <Reveal delay={0.04 * (i % 3)} x={i % 2 ? 16 : -16} y={10}>
                <div className={`flex gap-5 py-4 ${i % 2 ? "lg:pl-10" : ""}`}>
                  <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg font-mono text-sm text-cyan">0{i + 1}</span>
                  <div className="surface flex-1 p-5 sm:p-6">
                    <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">{it.title}</h3>
                    <p className="mt-1.5 text-ink-2">{it.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
