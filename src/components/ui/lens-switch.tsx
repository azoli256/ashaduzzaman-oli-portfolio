"use client";

import { useLens, type Lens } from "@/components/motion/lens-context";
import { cn } from "@/lib/utils";

const options: { id: Lens; label: string; dot: string }[] = [
  { id: "both", label: "Both", dot: "bg-white" },
  { id: "pm", label: "Management", dot: "bg-cyan" },
  { id: "dev", label: "Development", dot: "bg-violet" },
];

const captions: Record<Lens, string> = {
  both: "Both sides of delivery: understanding how a project is managed and how it is built.",
  pm: "Strategy, scope, team coordination, quality and risk, from discovery to post-launch support.",
  dev: "WordPress, Shopify, WooCommerce, Webflow, Wix and custom PHP, plus migrations, hosting, DNS and SSL.",
};

/** Signature control: switches the hero network and the expertise pillars between disciplines. */
export function LensSwitch({ className, showCaption = true }: { className?: string; showCaption?: boolean }) {
  const { lens, setLens } = useLens();
  return (
    <div className={className}>
      <p className="mb-2.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">View through a lens</p>
      <div role="group" aria-label="Highlight a discipline" className="flex w-full max-w-[22rem] gap-0.5 rounded-full sm:inline-flex sm:w-auto sm:max-w-full sm:gap-1 border border-line bg-white/[0.03] p-1 backdrop-blur">
        {options.map((o) => {
          const on = lens === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => setLens(o.id)}
              className={cn(
                "inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 font-display text-[0.8rem] font-bold transition-colors sm:min-h-10 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm",
                on ? "bg-white/[0.12] text-ink ring-1 ring-white/20" : "text-ink-2 hover:text-ink",
              )}
            >
              <span aria-hidden className={cn("size-2 rounded-full", o.dot)} />
              {o.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className={cn(showCaption ? "mt-3 min-h-[3.25rem] max-w-md text-[0.95rem] leading-relaxed text-ink-2" : "sr-only")}>
        {captions[lens]}
      </p>
    </div>
  );
}
