"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { ExperienceItem } from "@/types";
import { cn } from "@/lib/utils";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const NOW = "Present";
const toMonths = (label: string) => {
  if (label === NOW) return Number.POSITIVE_INFINITY;
  const [m, y] = label.split(" ");
  return Number(y) * 12 + MONTHS.indexOf(m ?? "");
};

const GAP = 18; // px between lanes
const PAD = 12;
const COLORS = ["#22C5EA", "#4F7CFF", "#8B5CF6"]; // management, freelance, early career

type Row = { id: string; type: "now" | "head" | "commit"; lane: number; item?: ExperienceItem; text?: string; lanes: boolean[] };

/** Time runs downward: present at the top. A lane is drawn at a point if its role existed then. */
function buildRows(items: ExperienceItem[]): Row[] {
  const sorted = [...items].sort((a, b) => toMonths(b.start) - toMonths(a.start));
  const laneOf = (it: ExperienceItem) => sorted.indexOf(it);
  const activeAt = (t: number) => sorted.map((it) => toMonths(it.start) <= t && t <= toMonths(it.end));
  const rows: Row[] = [{ id: "now", type: "now", lane: 0, lanes: sorted.map((it) => toMonths(it.end) === Number.POSITIVE_INFINITY) }];
  sorted.forEach((it) => {
    const lanes = activeAt(toMonths(it.start));
    rows.push({ id: `${it.company}-head`, type: "head", lane: laneOf(it), item: it, lanes });
    it.highlights.forEach((h, i) => rows.push({ id: `${it.company}-${i}`, type: "commit", lane: laneOf(it), text: h, lanes }));
  });
  return rows;
}

function GraphRow({ row, laneCount }: { row: Row; laneCount: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: "0px 0px -42% 0px", once: true });
  const x = (i: number) => PAD + i * GAP;
  const w = PAD * 2 + (laneCount - 1) * GAP;
  const it = row.item;
  const mgmt = it?.kind === "management";

  return (
    <li ref={ref} className="relative flex gap-4 sm:gap-6">
      <div aria-hidden className="relative shrink-0 self-stretch" style={{ width: w }}>
        {row.lanes.map((on, i) =>
          on ? (
            <span key={i} className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white/10" style={{ left: x(i) }}>
              <span className="absolute inset-0 origin-top transition-opacity duration-700" style={{ background: COLORS[i], opacity: lit ? 0.9 : 0 }} />
            </span>
          ) : null,
        )}
        {row.type === "now" ? (
          <span className="absolute top-3 -translate-x-1/2" style={{ left: x(0) + (row.lanes[1] ? GAP / 2 : 0) }}>
            <span className="relative flex size-3"><span className="pulse-dot absolute inline-flex size-full rounded-full bg-cyan" /><span className="relative size-3 rounded-full bg-cyan" /></span>
          </span>
        ) : row.type === "head" ? (
          <span className="absolute top-7 grid size-5 -translate-x-1/2 place-items-center rounded-full border-2 bg-bg transition-colors duration-700" style={{ left: x(row.lane), borderColor: lit ? COLORS[row.lane] : "rgba(255,255,255,0.18)", boxShadow: lit ? `0 0 18px ${COLORS[row.lane]}` : "none" }}>
            <span className="size-1.5 rounded-full" style={{ background: COLORS[row.lane] }} />
          </span>
        ) : (
          <span className="absolute top-[1.15rem] size-2 -translate-x-1/2 rounded-full border bg-bg transition-colors duration-700" style={{ left: x(row.lane), borderColor: lit ? COLORS[row.lane] : "rgba(255,255,255,0.2)" }} />
        )}
      </div>

      {row.type === "now" && <p className="py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-cyan">HEAD · Present</p>}

      {row.type === "head" && it && (
        <div className="min-w-0 flex-1 pb-3 pt-4">
          <div className="surface relative overflow-hidden p-5 sm:p-7">
            <div aria-hidden className={cn("absolute -right-16 -top-16 size-56 rounded-full blur-[70px]", mgmt ? "bg-cyan/15" : "bg-blue/10")} />
            <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-full border px-3 py-1 font-mono text-xs" style={{ borderColor: `${COLORS[row.lane]}66`, color: COLORS[row.lane] }}>
                {it.start} — {it.end}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">{mgmt ? "Project Management" : "Web Development"}</span>
            </div>
            <h3 className="relative mt-4 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">{it.company}</h3>
            <p className="relative mt-1.5 text-base font-semibold text-ink-2 sm:text-lg">{it.role}</p>
            <p className="relative mt-3 max-w-2xl text-ink-2">{it.summary}</p>
          </div>
        </div>
      )}

      {row.type === "commit" && <p className="min-w-0 flex-1 py-2.5 text-[0.95rem] leading-relaxed text-ink-2 transition-colors duration-700" style={{ color: lit ? undefined : "rgb(138 150 170 / 0.7)" }}>{row.text}</p>}
    </li>
  );
}

export function ExperienceGraph({ items }: { items: ExperienceItem[] }) {
  const rows = buildRows(items);
  return (
    <ol className="mt-12" aria-label="Career history, most recent first">
      {rows.map((r) => (
        <GraphRow key={r.id} row={r} laneCount={items.length} />
      ))}
    </ol>
  );
}
