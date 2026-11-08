// Hover previews: one shared state, opened after a short delay (like Netflix), shown in a portal.
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { TitleCard } from '@/models/title';
import { PreviewCard } from './PreviewCard';

type Open = { title: TitleCard; rect: DOMRect; progress?: number } | null;
type Value = { schedule: (title: TitleCard, rect: DOMRect, progress?: number) => void; cancel: () => void; close: () => void };

const PreviewContext = createContext<Value | null>(null);
const DELAY_MS = 450;

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<Open>(null);
  const timer = useRef<number | undefined>(undefined);

  const cancel = useCallback(() => window.clearTimeout(timer.current), []);
  const close = useCallback(() => setOpen(null), []);
  const schedule = useCallback((title: TitleCard, rect: DOMRect, progress?: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen({ title, rect, progress }), DELAY_MS);
  }, []);

  const value = useMemo(() => ({ schedule, cancel, close }), [schedule, cancel, close]);
  return (
    <PreviewContext.Provider value={value}>
      {children}
      {open && <PreviewCard {...open} onClose={close} />}
    </PreviewContext.Provider>
  );
}

export function usePreview(): Value {
  const value = useContext(PreviewContext);
  if (!value) throw new Error('usePreview must be used inside <PreviewProvider>');
  return value;
}
