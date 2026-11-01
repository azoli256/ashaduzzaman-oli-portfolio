/** Project-management process map: a connected route from discovery to delivery. */
const pts = [
  { x: 40, y: 150, l: "Discover" },
  { x: 125, y: 82, l: "Plan" },
  { x: 215, y: 138, l: "Align" },
  { x: 305, y: 70, l: "Execute" },
  { x: 395, y: 126, l: "Review" },
  { x: 450, y: 56, l: "Deliver" },
] as const;

export function WorkflowVisual() {
  const d = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  return (
    <svg viewBox="0 0 490 200" role="img" aria-label="Process map connecting discovery, planning, alignment, execution, review and delivery." className="size-full">
      <defs>
        <linearGradient id="pmLine" x1="0" x2="1">
          <stop offset="0" stopColor="#22C5EA" />
          <stop offset="1" stopColor="#518BFF" />
        </linearGradient>
      </defs>
      {/* faint grid */}
      {[40, 100, 160].map((y) => (
        <line key={y} x1="10" x2="480" y1={y} y2={y} stroke="#82A0C8" strokeOpacity="0.1" />
      ))}
      <path d={d} fill="none" stroke="url(#pmLine)" strokeWidth="2" strokeLinejoin="round" opacity="0.45" />
      <path d={d} fill="none" stroke="url(#pmLine)" strokeWidth="2" strokeLinejoin="round" className="flow" />
      {/* risk branches */}
      {[pts[1], pts[3]].map((p, i) => (
        <g key={i}>
          <line x1={p.x} y1={p.y} x2={p.x + 22} y2={p.y + 44} stroke="#8575F7" strokeOpacity="0.6" strokeDasharray="3 4" />
          <rect x={p.x + 12} y={p.y + 42} width="22" height="22" rx="6" fill="#16263A" stroke="#8575F7" strokeOpacity="0.7" />
          <path d={`M${p.x + 23},${p.y + 47} l5,10 h-10 z`} fill="none" stroke="#8575F7" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
      ))}
      {pts.map((p, i) => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="13" fill="#0C1525" stroke="#22C5EA" strokeOpacity={0.5 + i * 0.1} />
          <circle cx={p.x} cy={p.y} r="4.5" fill={i === pts.length - 1 ? "#F2F6FC" : "#22C5EA"} />
          <text x={p.x} y={p.y + (i % 2 === 0 ? 34 : -22)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#A6B5C9" fontFamily="var(--font-manrope)">{p.l}</text>
        </g>
      ))}
    </svg>
  );
}
