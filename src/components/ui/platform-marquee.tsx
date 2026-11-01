const items = ["WordPress", "Shopify", "WooCommerce", "Webflow", "Wix", "Custom PHP", "Migrations", "Hosting", "DNS", "SSL", "Agile coordination", "Quality assurance", "Risk management", "Stakeholder communication"];

/** Slow ticker of capabilities. The duplicate track is hidden from assistive tech. */
export function PlatformMarquee() {
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-line bg-bg/40 py-4 backdrop-blur-sm" aria-label="Platforms and capabilities">
      <div className="marquee-track flex w-max gap-10">
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center gap-10">
            {items.map((t, i) => (
              <li key={t} className="flex items-center gap-10 font-display text-sm font-bold uppercase tracking-[0.18em] text-ink-2/80">
                {t}
                <span aria-hidden className={i % 2 === 0 ? "size-1.5 rounded-full bg-cyan/70" : "size-1.5 rounded-full bg-violet/70"} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
