import type { ReactNode } from "react";
import { managementPillar, developmentPillar } from "@/data/expertise";
import { marketingAreas } from "@/data/technologies";
import type { PillarItem } from "@/types";
import { BentoCard } from "@/components/ui/bento-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { LensFocus } from "@/components/motion/lens-focus";
import { WorkflowVisual } from "@/components/visuals/workflow-visual";
import { TechnicalVisual } from "@/components/visuals/technical-visual";
import { cn } from "@/lib/utils";

function Pillar({ code, title, lead, accent, visual, items }: { code: string; title: string; lead: string; accent: "cyan" | "blue"; visual: ReactNode; items: PillarItem[] }) {
  const c = accent === "cyan" ? { t: "text-cyan", dot: "bg-cyan", glow: "bg-cyan/15" } : { t: "text-blue", dot: "bg-blue", glow: "bg-blue/15" };
  return (
    <BentoCard className="flex h-full flex-col p-6 sm:p-8">
      <div aria-hidden className={cn("absolute -top-24 right-0 size-72 rounded-full blur-[90px]", c.glow)} />
      <div className="relative">
        <p className={cn("eyebrow", accent === "blue" && "!text-blue")}>Pillar {code}</p>
        <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-md text-ink-2">{lead}</p>
      </div>
      <div className="relative mt-6 aspect-[490/200] w-full rounded-2xl border border-line bg-bg/50 p-3">{visual}</div>
      <ul className="relative mt-6 grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.title} className="flex gap-3 border-t border-line py-3">
            <span aria-hidden className={cn("mt-2 size-1.5 shrink-0 rounded-full", c.dot)} />
            <div>
              <p className={cn("font-display text-[0.95rem] font-bold", c.t === "text-cyan" ? "" : "")}>{it.title}</p>
              <p className="text-sm leading-snug text-muted">{it.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}

export function ExpertiseSection() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="expertise-title" index="03" eyebrow="Dual Expertise" title={<>Two disciplines. <span className="text-gradient">One delivery mindset.</span></>} text="Project management and web development carry equal weight in how I work. Each strengthens the other." />

        <div className="relative mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <LensFocus pillar="pm"><Pillar code="A" title="Project Management" lead="Leading cross-functional teams from discovery through post-launch support." accent="cyan" visual={<WorkflowVisual />} items={managementPillar} /></LensFocus>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <LensFocus pillar="dev"><Pillar code="B" title="Web Development" lead="Hands-on building across the platforms and infrastructure businesses rely on." accent="blue" visual={<TechnicalVisual />} items={developmentPillar} /></LensFocus>
          </Reveal>
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[11rem] z-10 hidden size-12 -translate-x-1/2 place-items-center rounded-full border border-line bg-bg font-display text-xl font-bold text-ink-2 lg:grid">+</div>
        </div>

        <Reveal className="mt-4">
          <div className="surface flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow !text-violet">Within digital delivery</p>
              <p className="mt-2 text-ink-2">Digital marketing-related projects are part of the wider project work I coordinate alongside web development.</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {marketingAreas.map((a) => (
                <li key={a} className="rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-sm font-medium text-ink">{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
