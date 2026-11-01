"use client";

import type { ReactNode } from "react";
import { useLens, type Lens } from "./lens-context";
import { cn } from "@/lib/utils";

/** Dims a block when the visitor has chosen the other discipline in the hero lens. */
export function LensFocus({ pillar, children, className }: { pillar: Exclude<Lens, "both">; children: ReactNode; className?: string }) {
  const { lens } = useLens();
  const dim = lens !== "both" && lens !== pillar;
  return <div className={cn("h-full transition-[opacity,filter] duration-500", dim && "opacity-45 saturate-50", className)}>{children}</div>;
}
