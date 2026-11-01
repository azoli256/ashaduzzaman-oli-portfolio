import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, externalProps } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-display text-[0.95rem] font-bold transition-all duration-300 active:scale-[0.98]";
const variants = {
  primary:
    "bg-gradient-to-r from-cyan to-blue text-[#04202a] shadow-[0_10px_40px_-10px_rgba(34,197,234,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(34,197,234,0.8)] hover:brightness-110",
  secondary:
    "border border-line bg-white/[0.03] text-ink hover:border-cyan/50 hover:bg-cyan/10",
  ghost: "text-ink-2 hover:text-ink",
};

export function Button({ href, children, variant = "primary", external, className, icon }: Props) {
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      {children}
      {icon ??
        (external ? (
          <ArrowUpRight size={18} strokeWidth={2.2} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : null)}
    </>
  );
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? externalProps : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
