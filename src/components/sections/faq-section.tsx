import { BadgeCheck, Plus, UserRound, Wrench, Handshake, type LucideIcon } from "lucide-react";
import { faqGroups, faqs } from "@/data/faq";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const icons: Record<string, LucideIcon> = { about: UserRound, work: Wrench, together: Handshake };

export function FaqSection() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  let n = 0;
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative isolate overflow-clip py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-30" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[28rem] rounded-full bg-violet/10 blur-[120px]" />
      <div aria-hidden className="absolute -right-40 bottom-10 -z-10 size-[26rem] rounded-full bg-cyan/10 blur-[120px]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="site-w grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
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
            <p className="mt-5 max-w-sm text-lg text-ink-2">Straight answers about my background, how I work, and how to start a project.</p>

            <nav aria-label="FAQ topics" className="mt-8 hidden lg:block">
              <ul className="space-y-1.5">
                {faqGroups.map((g, i) => {
                  const Icon = icons[g.id] ?? BadgeCheck;
                  return (
                    <li key={g.id}>
                      <a href={`#faq-${g.id}`} className="group flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition hover:border-line hover:bg-white/[0.03]">
                        <span className="grid size-10 place-items-center rounded-xl bg-cyan/10 text-cyan transition group-hover:bg-cyan/20"><Icon size={18} aria-hidden /></span>
                        <span className="flex-1">
                          <span className="block font-display text-[0.95rem] font-bold">{g.title}</span>
                          <span className="block text-sm text-muted">{g.items.length} questions</span>
                        </span>
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8">
              <Button href="/#contact" variant="secondary">Still curious? Get in touch</Button>
            </div>
          </Reveal>
        </div>

        <div className="space-y-12">
          {faqGroups.map((g) => {
            const Icon = icons[g.id] ?? BadgeCheck;
            return (
              <div key={g.id} id={`faq-${g.id}`} className="scroll-mt-28">
                <div className="mb-5 flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan lg:hidden"><Icon size={18} aria-hidden /></span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">{g.title}</h3>
                    <p className="text-sm text-muted">{g.blurb}</p>
                  </div>
                  <span aria-hidden className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-line to-transparent sm:block" />
                </div>
                <ul className="space-y-3">
                  {g.items.map((f) => {
                    n += 1;
                    return (
                      <li key={f.q}>
                        <details name={`faq-${g.id}`} className="faq-item group relative overflow-hidden rounded-2xl border border-line bg-white/[0.025] transition-colors duration-300 open:border-cyan/40 open:bg-gradient-to-br open:from-cyan/[0.07] open:to-violet/[0.04] hover:border-cyan/30" open={n === 1}>
                          <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 scale-y-0 bg-gradient-to-b from-cyan to-violet transition-transform duration-500 group-open:scale-y-100" />
                          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-cyan/60 sm:px-6 [&::-webkit-details-marker]:hidden">
                            <span className="font-mono text-xs text-muted transition-colors group-open:text-cyan">{String(n).padStart(2, "0")}</span>
                            <h4 className="flex-1 font-display text-base font-bold leading-snug tracking-tight sm:text-lg">{f.q}</h4>
                            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition duration-300 group-open:rotate-45 group-open:border-cyan/60 group-open:bg-cyan/15 group-open:text-cyan">
                              <Plus size={18} />
                            </span>
                          </summary>
                          <p className="px-5 pb-6 pl-[3.4rem] pr-6 text-base leading-relaxed text-ink-2 sm:px-6 sm:pl-[3.9rem] sm:pr-12">{f.a}</p>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
