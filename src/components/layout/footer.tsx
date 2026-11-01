import Link from "next/link";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-2/60">
      <div className="site-w grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-ink-2">{profile.title}</p>
          <p className="mt-1 text-sm text-muted">{profile.publicLocation}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="inline-block py-1.5 text-ink-2 transition hover:text-cyan">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="inline-block py-1.5 text-ink-2 transition hover:text-cyan">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        <SocialLinks />
      </div>
      <div className="border-t border-line">
        <p className="site-w py-6 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved. Third-party websites referenced belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
