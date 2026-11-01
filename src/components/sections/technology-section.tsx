import { Globe, ShoppingBag, ShoppingCart, Layers, LayoutGrid, FileCode2, Server, ShieldCheck, Network, Repeat, Cog, type LucideIcon } from "lucide-react";
import { technologies, marketingNote } from "@/data/technologies";
import { SectionHeading } from "@/components/ui/section-heading";
import { BentoCard } from "@/components/ui/bento-card";
import { Reveal } from "@/components/motion/reveal";

const icons: Record<string, LucideIcon> = {
  WordPress: Globe, Shopify: ShoppingBag, WooCommerce: ShoppingCart, Webflow: Layers, Wix: LayoutGrid, PHP: FileCode2,
  "Hosting setup": Server, "DNS configuration": Network, "SSL configuration": ShieldCheck, "Server configuration": Cog, "Website migration": Repeat,
};

export function TechnologySection() {
  const groups = technologies.filter((g) => g.confirmed && g.items.length > 0);
  const [main, ...others] = groups;
  return (
    <section id="technology" aria-labelledby="tech-title" className="relative overflow-hidden bg-bg-2/70 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="tech-title" index="08" eyebrow="Technology" title={<>The platforms and <span className="text-gradient">infrastructure I work with.</span></>} text="Grouped by purpose: what each platform or discipline is used for in delivery." />
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {main && (
            <Reveal className="lg:col-span-7">
              <BentoCard className="h-full p-6 sm:p-8">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">{main.title}</h3>
                <p className="mt-2 text-ink-2">{main.description}</p>
                <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {main.items.map((t) => {
                    const Icon = icons[t] ?? Globe;
                    return (
                      <li key={t} className="group flex flex-col gap-4 rounded-2xl border border-line bg-bg/40 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan/50">
                        <Icon size={22} strokeWidth={1.6} className="text-cyan" aria-hidden />
                        <span className="font-display text-base font-bold">{t}</span>
                      </li>
                    );
                  })}
                </ul>
              </BentoCard>
            </Reveal>
          )}
          <div className="grid gap-4 lg:col-span-5">
            {others.map((g, i) => (
              <Reveal key={g.title} delay={0.1 * (i + 1)}>
                <BentoCard className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">{g.title}</h3>
                  <p className="mt-2 text-ink-2">{g.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((t) => {
                      const Icon = icons[t] ?? Server;
                      return (
                        <li key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-4 py-2 text-sm font-medium">
                          <Icon size={15} className="text-blue" aria-hidden /> {t}
                        </li>
                      );
                    })}
                  </ul>
                </BentoCard>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="rounded-3xl border border-dashed border-violet/30 p-6 text-sm leading-relaxed text-ink-2">{marketingNote}</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
