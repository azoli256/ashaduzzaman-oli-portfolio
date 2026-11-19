"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Minimize2, Monitor, RotateCw, Smartphone, Tablet, Lock } from "lucide-react";
import { ProjectPreview } from "@/components/ui/project-preview";
import type { Project } from "@/types";
import { cn, hostname } from "@/lib/utils";

const devices = [
  { id: "desktop", label: "Desktop", w: "100%", Icon: Monitor },
  { id: "tablet", label: "Tablet", w: "820px", Icon: Tablet },
  { id: "mobile", label: "Mobile", w: "390px", Icon: Smartphone },
] as const;

/** Shows the client's site inside this page, so the visitor never leaves the portfolio. */
export function SiteViewer({ project }: { project: Project }) {
  const [device, setDevice] = useState<(typeof devices)[number]["id"]>("desktop");
  const [loaded, setLoaded] = useState(false);
  const [full, setFull] = useState(false);
  const [nonce, setNonce] = useState(0);
  const embeddable = project.embed !== false;
  const w = devices.find((d) => d.id === device)!.w;

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [full]);

  return (
    <div className={cn(full ? "fixed inset-0 z-[60] flex flex-col bg-bg p-3 sm:p-5" : "relative")}>
      <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]", full && "min-h-0 flex-1")}>
        {/* browser chrome */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-bg/80 px-3 py-2.5 sm:px-4">
          <div aria-hidden className="hidden gap-1.5 sm:flex"><span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" /></div>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-xs text-ink-2 sm:text-sm">
            <Lock size={13} aria-hidden className="shrink-0 text-cyan" />
            <span className="truncate">{hostname(project.url)}</span>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Preview size">
            {devices.map(({ id, label, Icon }) => (
              <button key={id} type="button" onClick={() => setDevice(id)} aria-pressed={device === id} aria-label={label} title={label}
                className={cn("grid size-9 place-items-center rounded-lg transition max-sm:last:hidden", id !== "desktop" && "max-md:hidden", device === id ? "bg-cyan/15 text-cyan" : "text-ink-2 hover:bg-white/5 hover:text-ink")}>
                <Icon size={17} />
              </button>
            ))}
            {embeddable && (
              <button type="button" onClick={() => { setLoaded(false); setNonce((n) => n + 1); }} aria-label="Reload" title="Reload" className="grid size-9 place-items-center rounded-lg text-ink-2 transition hover:bg-white/5 hover:text-ink"><RotateCw size={16} /></button>
            )}
            <button type="button" onClick={() => setFull((f) => !f)} aria-label={full ? "Exit full screen" : "Full screen"} title={full ? "Exit full screen" : "Full screen"} className="grid size-9 place-items-center rounded-lg text-ink-2 transition hover:bg-white/5 hover:text-ink">
              {full ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* stage */}
        <div className={cn("relative flex justify-center bg-[#0a1220]", full ? "min-h-0 flex-1" : "h-[72svh] min-h-[28rem]")}>
          <div className="relative h-full transition-[width] duration-500 ease-out" style={{ width: w, maxWidth: "100%" }}>
            {embeddable ? (
              <>
                <iframe
                  key={nonce}
                  src={project.url}
                  title={`${project.name} website`}
                  onLoad={() => setLoaded(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  className="size-full border-0 bg-white"
                />
                <AnimatePresence>
                  {!loaded && (
                    <motion.div key="load" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                      <ProjectPreview project={project} className="size-full" />
                      <div className="absolute inset-0 grid place-items-center bg-bg/60 backdrop-blur-sm">
                        <span className="inline-flex items-center gap-3 rounded-full border border-line bg-bg/80 px-5 py-2.5 text-sm text-ink-2"><span className="size-2 animate-pulse rounded-full bg-cyan" /> Loading {hostname(project.url)}…</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="size-full overflow-y-auto">
                <ProjectPreview project={project} className="aspect-[16/10] w-full" />
                <p className="p-5 text-sm text-ink-2">Live preview isn&apos;t available for this site, so this is a capture of its homepage.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
