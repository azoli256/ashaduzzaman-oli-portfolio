import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { BentoCard } from "@/components/ui/bento-card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const toMonths = (label: string, now: Date) => {
  if (label === "Present") return now.getFullYear() * 12 + now.getMonth();
  const [m, y] = label.split(" ");
  return Number(y) * 12 + MONTHS.indexOf(m ?? "");
};

function Entry({ item, lead }: { item: ExperienceItem; lead?: boolean }) {
  const mgmt = item.kind === "management";
  return (
    <BentoCard className={cn("flex h-full flex-col p-6 sm:p-8", lead && "lg:p-10")}>
      <div aria-hidden className={cn("absolute -right-20 -top-20 size-64 rounded-full blur-[80px]", mgmt ? "bg-cyan/15" : "bg-blue/10")} />
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={cn("rounded-full border px-3 py-1 font-mono text-xs", mgmt ? "border-cyan/40 text-cyan" : "border-blue/40 text-blue")}>
          {item.start} — {item.end}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted">{mgmt ? "Project Management" : "Web Development"}</span>
      </div>
      <p className={cn("relative mt-5 font-display font-extrabold tracking-tight", lead ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl")}>{item.company}</p>
      <h3 className="relative mt-2 text-lg font-semibold text-ink-2">{item.role}</h3>
      <ul className="relative mt-6 space-y-3">
        {item.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-2">
            <span aria-hidden className={cn("mt-2.5 h-px w-4 shrink-0", mgmt ? "bg-cyan" : "bg-blue")} />
            {h}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}

export function ExperienceSection() {
  const now = new Date();
  const first = Math.min(...experience.map((e) => toMonths(e.start, now)));
  const last = toMonths("Present", now);
  const span = last - first;
  const startYear = Math.floor(first / 12);
  const endYear = Math.floor(last / 12);
  const ticks = Array.from({ length: endYear - startYear }, (_, i) => startYear + 1 + i).filter((_, i) => i % 2 === 0);

  const [lead, ...rest] = experience;
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="site-w">
        <SectionHeading id="experience-title" index="07" eyebrow="Experience" title={<>My Professional <span className="text-gradient">Journey.</span></>} text="Roles overlap by design: I continue to build and consult while leading projects." />

        {/* Parallel-lane timeline, scaled to real dates */}
        <Reveal className="mt-12">
          <div className="surface p-5 sm:p-7" role="img" aria-label={`Timeline from ${startYear} to present showing the overlapping freelance and SEOPage1 roles, preceded by Creativeers.`}>
            <div className="relative space-y-2.5">
              {experience.map((e) => {
                const s = toMonths(e.start, now) - first;
                const en = toMonths(e.end, now) - first;
                const mgmt = e.kind === "management";
                const short = (en - s) / span < 0.28;
                const atEnd = en / span > 0.9;
                return (
                  <div key={e.company} className="relative h-9">
                    <div
                      className={cn("absolute inset-y-0 flex min-w-0 items-center overflow-hidden rounded-full px-3 text-xs font-semibold", mgmt ? "bg-gradient-to-r from-cyan/80 to-cyan/40 text-[#04202a]" : "bg-gradient-to-r from-blue/70 to-blue/30 text-ink")}
                      style={{ left: `${(s / span) * 100}%`, width: `${Math.max(((en - s) / span) * 100, 3)}%` }}
                    >
                      {!short && <span className="truncate">{e.company.split(" — ")[0]}</span>}
                    </div>
                    {short && (
                      <span
                        className={cn("absolute inset-y-0 flex items-center whitespace-nowrap text-xs font-semibold text-ink-2", atEnd ? "justify-end pr-2" : "pl-2")}
                        style={atEnd ? { right: `${100 - (s / span) * 100}%` } : { left: `${(en / span) * 100 + 3}%` }}
                      >
                        {e.company}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="relative mt-3 h-5 border-t border-line">
              {ticks.map((y) => (
                <span key={y} className="absolute top-1.5 -translate-x-1/2 font-mono text-[0.7rem] text-muted" style={{ left: `${Math.min(Math.max(((y * 12 - first) / span) * 100, 2), 98)}%` }}>{y}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          {lead && <Reveal className="lg:col-span-7 lg:row-span-2"><Entry item={lead} lead /></Reveal>}
          {rest.map((e, i) => (
            <Reveal key={e.company} delay={0.1 * (i + 1)} className="lg:col-span-5"><Entry item={e} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
