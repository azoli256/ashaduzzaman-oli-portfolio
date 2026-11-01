import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeading({ index, eyebrow, title, text, className, id }: Props) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow flex items-center gap-3">
        <span className="font-mono text-ink-2/70 tracking-normal">{index}</span>
        <span aria-hidden className="h-px w-8 bg-cyan/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="h-section mt-5">
        {title}
      </h2>
      {text ? <p className="mt-5 max-w-2xl text-lg text-ink-2">{text}</p> : null}
    </Reveal>
  );
}
