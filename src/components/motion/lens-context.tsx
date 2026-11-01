"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lens = "both" | "pm" | "dev";

type LensState = { lens: Lens; setLens: (l: Lens) => void };

const LensContext = createContext<LensState>({ lens: "both", setLens: () => {} });

/** Shared "which discipline am I looking at" state: hero network, caption and expertise pillars react to it. */
export function LensProvider({ children }: { children: ReactNode }) {
  const [lens, setLens] = useState<Lens>("both");
  const value = useMemo(() => ({ lens, setLens }), [lens]);
  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

export const useLens = () => useContext(LensContext);
