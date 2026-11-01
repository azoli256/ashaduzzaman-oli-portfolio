"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          /* clipboard unavailable: the mailto link remains available */
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-2 transition hover:border-cyan/50 hover:text-ink"
    >
      {done ? <Check size={16} className="text-cyan" /> : <Copy size={16} />}
      <span aria-live="polite">{done ? "Copied" : "Copy email"}</span>
    </button>
  );
}
