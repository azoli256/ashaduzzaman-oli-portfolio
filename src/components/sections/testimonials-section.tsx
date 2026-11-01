import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { testimonials } from "@/data/testimonials";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { externalProps } from "@/lib/utils";

export function TestimonialsSection() {
  const approved = testimonials.filter((t) => t.approved);
  return (
    <section id="trust" aria-labelledby="trust-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="trust-title" index="09" eyebrow="Client Trust" title={<>Trusted by clients, <span className="text-gradient">review after review.</span></>} />
        <Reveal className="mt-12">
          <div className="surface relative overflow-hidden p-8 sm:p-12">
            <div aria-hidden className="absolute -left-24 top-0 size-96 rounded-full bg-blue/15 blur-[100px]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
              <AnimatedCounter value={metrics.fiverrReviews} className="font-display text-[clamp(4.5rem,12vw,8rem)] font-extrabold leading-none tracking-[-0.05em] text-gradient" />
              <div className="max-w-md">
                <p className="flex items-center gap-2 font-display text-xl font-bold"><ShieldCheck size={20} className="text-cyan" aria-hidden /> Verified Fiverr reviews</p>
                <p className="mt-2 text-ink-2">Feedback from clients across web development and technical consulting projects, published openly on Fiverr.</p>
              </div>
              <a href={profile.fiverr} {...externalProps} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-blue px-6 font-display font-bold text-[#04202a] transition hover:brightness-110">
                Read reviews on Fiverr <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
        {approved.length > 0 && (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {approved.map((t) => (
              <li key={t.quote} className="surface p-7">
                <blockquote className="text-lg text-ink">“{t.quote}”</blockquote>
                <p className="mt-4 text-sm text-muted">{t.author} · via {t.source}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
