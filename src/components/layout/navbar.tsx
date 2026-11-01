"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./mobile-navigation";
import { OPEN_PALETTE_EVENT } from "./command-palette";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "site-w flex h-14 items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500 sm:h-16",
          scrolled
            ? "border-line bg-bg/75 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label={`${profile.name} — home`} className="group flex items-center gap-3">
          <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-blue font-display text-sm font-extrabold text-[#04202a]">
            {profile.initials}
          </span>
          <span className="hidden font-display text-[0.95rem] font-bold tracking-tight sm:block">
            {profile.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    on ? "text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-cyan/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open quick navigation (Ctrl or Command plus K)"
            className="hidden min-h-10 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 text-sm text-ink-2 transition hover:border-cyan/50 hover:text-ink lg:inline-flex"
          >
            Search
            <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-muted">Ctrl K</kbd>
          </button>
          <Link
            href="/#contact"
            className="hidden min-h-10 items-center rounded-full bg-gradient-to-r from-cyan to-blue px-5 font-display text-sm font-bold text-[#04202a] shadow-[0_8px_30px_-10px_rgba(34,197,234,0.7)] transition hover:brightness-110 sm:inline-flex"
          >
            Let&apos;s Talk
          </Link>
          <MobileNavigation active={active} />
        </div>
      </nav>
    </header>
  );
}
