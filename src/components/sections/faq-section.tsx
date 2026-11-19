import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative isolate overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[28rem] rounded-full bg-violet/10 blur-[120px]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="site-w grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="font-mono text-ink-2/70 tracking-normal">09</span>
              <span aria-hidden className="h-px w-8 bg-cyan/60" />
              FAQ
            </p>
            <h2 id="faq-title" className="h-section mt-5">
              Questions, <span className="text-gradient">answered.</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg text-ink-2">Quick answers about who I am, what I work with and how a project starts.</p>
            <div className="mt-8">
              <Button href="/#contact" variant="secondary">Still curious? Get in touch</Button>
            </div>
          </Reveal>
        </div>

        <ul className="border-t border-line">
          {faqs.map((f, i) => (
            <li key={f.q} className="border-b border-line">
              <details name="faq" className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center gap-5 py-6 pr-1 outline-none transition-colors marker:hidden focus-visible:text-cyan [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm text-muted transition-colors group-open:text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="flex-1 font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-cyan sm:text-xl">{f.q}</h3>
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition duration-300 group-open:rotate-45 group-open:border-cyan/60 group-open:bg-cyan/10 group-open:text-cyan">
                    <Plus size={18} />
                  </span>
                </summary>
                <p className="pb-7 pl-[3.2rem] pr-12 text-base leading-relaxed text-ink-2">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
