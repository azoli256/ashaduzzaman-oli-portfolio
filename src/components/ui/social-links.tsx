import { Mail, ExternalLink } from "lucide-react";
import { LinkedinIcon } from "./icons";
import { profile } from "@/data/profile";
import { externalProps } from "@/lib/utils";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Fiverr", href: profile.fiverr, Icon: ExternalLink, external: true },
] as const;

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2">
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            className="grid size-11 place-items-center rounded-full border border-line text-ink-2 transition hover:border-cyan/60 hover:text-cyan"
            {...(external ? externalProps : {})}
          >
            <Icon size={18} strokeWidth={1.8} />
          </a>
        </li>
      ))}
    </ul>
  );
}
