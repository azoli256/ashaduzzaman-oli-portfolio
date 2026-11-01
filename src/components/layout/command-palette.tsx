"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { navItems } from "@/data/navigation";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Item = { id: string; group: string; label: string; hint: string; run: () => void };

export const OPEN_PALETTE_EVENT = "open-command-palette";

/** Ctrl/Cmd+K quick navigation. Every entry is a real section, project or contact link. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    returnTo.current?.focus();
  }, []);

  const items = useMemo<Item[]>(() => {
    const ext = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...navItems.map((n) => ({ id: `nav-${n.id}`, group: "Go to", label: n.label, hint: "Section", run: () => router.push(n.href) })),
      ...projects.map((p) => ({ id: `p-${p.slug}`, group: "Work", label: p.name, hint: "Opens website", run: ext(p.url) })),
      { id: "mail", group: "Connect", label: "Email Ashaduzzaman", hint: profile.email, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "li", group: "Connect", label: "LinkedIn", hint: "Opens profile", run: ext(profile.linkedin) },
      { id: "fv", group: "Connect", label: "Fiverr", hint: "Opens profile", run: ext(profile.fiverr) },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.label} ${i.group}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        returnTo.current = document.activeElement as HTMLElement | null;
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const choose = (i: Item | undefined) => {
    if (!i) return;
    close();
    i.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((n) => Math.min(n + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((n) => Math.max(n - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[index]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div aria-hidden className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={close} />
      <div role="dialog" aria-modal="true" aria-label="Quick navigation" className="pop-in surface surface-blur relative w-full max-w-xl overflow-hidden !rounded-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[index] ? `opt-${filtered[index].id}` : undefined}
            aria-label="Search sections, projects and contact links"
            placeholder="Jump to a section, project or contact link…"
            className="no-ring h-14 w-full bg-transparent text-base text-ink placeholder:text-muted"
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-muted sm:block">esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No matches</li>}
          {filtered.map((it, i) => {
            const header = it.group !== lastGroup;
            lastGroup = it.group;
            return (
              <li key={it.id} role="presentation">
                {header && <p className="px-3 pb-1 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{it.group}</p>}
                <button
                  id={`opt-${it.id}`}
                  role="option"
                  aria-selected={i === index}
                  type="button"
                  tabIndex={-1}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => choose(it)}
                  className={cn("flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition-colors", i === index ? "bg-white/[0.08]" : "")}
                >
                  <span className="font-display font-bold">{it.label}</span>
                  <span className="flex items-center gap-2 truncate text-sm text-muted">
                    {it.hint}
                    {it.group === "Work" || it.id === "li" || it.id === "fv" ? <ArrowUpRight size={14} aria-hidden /> : i === index ? <CornerDownLeft size={14} aria-hidden /> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
