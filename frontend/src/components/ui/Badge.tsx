import type { ReactNode } from 'react';

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded border border-white/40 px-1.5 text-xs font-medium text-white/90">{children}</span>;
}
