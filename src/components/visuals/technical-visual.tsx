/** Web-development architecture: platform tiles layered over a hosting base. */
const tiles = [
  ["WordPress", 30, 20],
  ["Shopify", 170, 20],
  ["WooCommerce", 310, 20],
  ["Webflow", 30, 78],
  ["Wix", 170, 78],
  ["Custom PHP", 310, 78],
] as const;

export function TechnicalVisual() {
  return (
    <svg viewBox="0 0 490 200" role="img" aria-label="Platform tiles for WordPress, Shopify, WooCommerce, Webflow, Wix and custom PHP sitting above a hosting, DNS and SSL base." className="size-full">
      <defs>
        <linearGradient id="devTile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#518BFF" stopOpacity="0.34" />
          <stop offset="1" stopColor="#8575F7" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      {/* connection lines from tiles to base */}
      {[90, 230, 370].map((x) => (
        <line key={x} x1={x} y1="130" x2={x} y2="158" stroke="#518BFF" strokeOpacity="0.6" strokeWidth="1.5" className="flow" />
      ))}
      {tiles.map(([label, x, y]) => (
        <g key={label}>
          <rect x={x} y={y} width="130" height="46" rx="12" fill="url(#devTile)" stroke="#518BFF" strokeOpacity="0.5" />
          <path d={`M${x + 14},${y + 17} l-5,6 5,6 M${x + 30},${y + 17} l5,6 -5,6`} fill="none" stroke="#8fb2ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x={x + 40} y={y + 28} fontSize="11.5" fontWeight="700" fill="#F2F6FC" fontFamily="var(--font-manrope)">{label}</text>
        </g>
      ))}
      {/* base slab */}
      <rect x="30" y="158" width="410" height="34" rx="10" fill="#111E30" stroke="#22C5EA" strokeOpacity="0.45" />
      {["Hosting", "DNS", "SSL", "Migration"].map((t, i) => (
        <g key={t}>
          <circle cx={62 + i * 98} cy="175" r="3.5" fill="#22C5EA" />
          <text x={72 + i * 98} y="179" fontSize="11.5" fontWeight="700" fill="#A6B5C9" fontFamily="var(--font-manrope)">{t}</text>
        </g>
      ))}
    </svg>
  );
}
