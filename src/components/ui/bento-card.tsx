"use client";

import type { ReactNode, PointerEvent } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string; as?: "div" | "li" | "article" };

/** Surface with a pointer-lit border. The effect is pure CSS driven by two custom properties. */
export function BentoCard({ children, className, as: Tag = "div" }: Props) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={onMove} className={cn("surface lit overflow-hidden", className)}>
      {children}
    </Tag>
  );
}
