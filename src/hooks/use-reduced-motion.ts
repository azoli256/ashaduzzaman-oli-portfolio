"use client";

import { useReducedMotion } from "motion/react";

/** True when the visitor prefers reduced motion. Components should render static output. */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
