import { ArrowUpRight, Mail, Store, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/reveal";
import { CopyEmail } from "@/components/ui/copy-email";
import { externalProps } from "@/lib/utils";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: "LinkedIn", value: "linkedin.com/in/azamanoli", href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Fiverr", value: "Hire me on Fiverr", href: profile.fiverr, Icon: Store, external: true },
];

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="site-w">
        <Reveal>
          <p className="eyebrow flex items-center gap-3"><span className="font-mono text-ink-2/70 tracking-normal">10</span><span aria-hidden className="h-px w-8 bg-cyan/60" />Contact</p>
          <h2 id="contact-title" className="h-hero mt-6 max-w-4xl">Have a Digital Project <span className="text-gradient">in Mind?</span></h2>
          <p className="mt-7 max-w-2xl text-lg text-ink-2 sm:text-xl">Whether you&apos;re looking for experienced project leadership, technical web development expertise, or someone who understands both sides of digital delivery, let&apos;s connect.</p>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <li key={c.label}>
              <Reveal delay={0.08 * i} className="h-full">
                <a href={c.href} {...(c.external ? externalProps : {})} className="surface lit group flex h-full min-h-44 flex-col justify-between p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-cyan/10 text-cyan"><c.Icon size={20} strokeWidth={1.8} aria-hidden /></span>
                    <ArrowUpRight size={22} className="text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{c.label}</p>
                    <p className="mt-1 break-all font-display text-lg font-bold tracking-tight sm:text-xl">{c.value}</p>
                  </div>
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CopyEmail email={profile.email} />
          {profile.showPhone && (
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-2 hover:text-ink"><Phone size={16} />{profile.phone}</a>
          )}
        </div>
      </div>
    </section>
  );
}
