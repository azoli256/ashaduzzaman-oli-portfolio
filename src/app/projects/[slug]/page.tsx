import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { externalProps, hostname } from "@/lib/utils";
import { ProjectPreview } from "@/components/ui/project-preview";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.name,
    path: `/projects/${p.slug}`,
    description: p.overview ?? `${p.name} — a website referenced in the portfolio of Ashaduzzaman Oli.`,
  });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 md:grid md:grid-cols-[14rem_1fr] md:gap-8">
      <h2 className="eyebrow mb-3 md:mb-0 md:pt-1">{title}</h2>
      <div className="text-lg leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}
const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((i) => (
      <li key={i} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-cyan" />{i}</li>
    ))}
  </ul>
);

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;
  const meta = [p.category, p.industry, p.platform, p.projectType].filter(Boolean);

  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-2 hover:text-cyan"><ArrowLeft size={16} /> All work</Link>
      <header className="mt-6">
        {meta.length > 0 && <p className="eyebrow">{meta.join(" · ")}</p>}
        <h1 className="h-hero mt-4">{p.name}</h1>
        <p className="mt-4 text-ink-2">{hostname(p.url)}</p>
        <div className="mt-7"><Button href={p.url} external>Visit website</Button></div>
      </header>

      <ProjectPreview project={p} priority className="mt-12 aspect-[16/9] rounded-3xl border border-line" />

      <div className="mt-12">
        {p.overview && <Block title="Project Overview"><p>{p.overview}</p></Block>}
        {p.industry && <Block title="Industry"><p>{p.industry}</p></Block>}
        {p.objective && <Block title="Business Objective"><p>{p.objective}</p></Block>}
        {p.challenges?.length ? <Block title="Challenges"><List items={p.challenges} /></Block> : null}
        {p.role && <Block title="My Responsibilities"><p>{p.role}</p></Block>}
        {p.scope?.length ? <Block title="Scope"><List items={p.scope} /></Block> : null}
        {p.approach?.length ? <Block title="Approach & Execution"><List items={p.approach} /></Block> : null}
        {p.technologies?.length ? (
          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="rounded-full border border-line px-4 py-1.5 text-sm text-ink">{t}</li>)}</ul>
          </Block>
        ) : null}
        {p.deliverables?.length ? <Block title="Final Deliverables"><List items={p.deliverables} /></Block> : null}
        {p.results?.length ? <Block title="Outcomes"><List items={p.results} /></Block> : null}
        <Block title="Website">
          <a href={p.url} {...externalProps} className="inline-flex items-center gap-2 font-semibold text-cyan hover:underline">{p.url}<ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
        </Block>
      </div>

      <nav aria-label="Next project" className="mt-12 border-t border-line pt-8">
        <p className="text-sm text-muted">Next reference</p>
        <Link href={`/projects/${next.slug}`} className="group mt-2 inline-flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight hover:text-cyan">
          {next.name} <ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  );
}
