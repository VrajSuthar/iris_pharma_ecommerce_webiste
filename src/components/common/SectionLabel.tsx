import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[9px] uppercase tracking-[.3em] text-rose-dark">
      {children}
    </div>
  );
}
