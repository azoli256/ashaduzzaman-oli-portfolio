/** Two overlapping rings: building and leading, meeting at delivery. */
export function BridgeVisual() {
  return (
    <svg viewBox="0 0 440 280" role="img" aria-label="Two overlapping circles, Build and Lead, whose overlap is labelled Deliver." className="w-full">
      <defs>
        <radialGradient id="brA" cx="0.4" cy="0.4"><stop offset="0" stopColor="#22C5EA" stopOpacity="0.28" /><stop offset="1" stopColor="#22C5EA" stopOpacity="0.04" /></radialGradient>
        <radialGradient id="brB" cx="0.6" cy="0.4"><stop offset="0" stopColor="#518BFF" stopOpacity="0.28" /><stop offset="1" stopColor="#8575F7" stopOpacity="0.05" /></radialGradient>
      </defs>
      <circle cx="165" cy="140" r="108" fill="url(#brA)" stroke="#22C5EA" strokeOpacity="0.6" />
      <circle cx="275" cy="140" r="108" fill="url(#brB)" stroke="#518BFF" strokeOpacity="0.6" />
      <circle cx="220" cy="140" r="102" fill="none" stroke="#fff" strokeOpacity="0.08" strokeDasharray="2 6" />
      <text x="110" y="136" textAnchor="middle" fontSize="20" fontWeight="800" fill="#F2F6FC" fontFamily="var(--font-manrope)">Build</text>
      <text x="110" y="156" textAnchor="middle" fontSize="11" fill="#A6B5C9" fontFamily="var(--font-inter)">technical insight</text>
      <text x="330" y="136" textAnchor="middle" fontSize="20" fontWeight="800" fill="#F2F6FC" fontFamily="var(--font-manrope)">Lead</text>
      <text x="330" y="156" textAnchor="middle" fontSize="11" fill="#A6B5C9" fontFamily="var(--font-inter)">people &amp; process</text>
      <circle cx="220" cy="140" r="5" fill="#F2F6FC" />
      <circle className="pulse-ring" cx="220" cy="140" r="9" fill="none" stroke="#22C5EA" strokeWidth="1.5" />
      <text x="220" y="172" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="2" fill="#7be3f7" fontFamily="var(--font-manrope)">DELIVER</text>
    </svg>
  );
}
