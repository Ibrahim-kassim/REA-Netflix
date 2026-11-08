// Scrubbable timeline with a hover time label (pointer events: mouse, touch and pen).
import { useRef, useState, type PointerEvent } from 'react';
import { clock } from '@/utils/format';

type Props = { current: number; duration: number; onSeek: (seconds: number) => void };

export function ProgressBar({ current, duration, onSeek }: Props) {
  const bar = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const at = (e: PointerEvent) => {
    const rect = bar.current?.getBoundingClientRect();
    return rect ? Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)) : 0;
  };
  const played = duration ? (current / duration) * 100 : 0;

  return (
    <div ref={bar} role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(current)} tabIndex={0}
      className="group relative h-6 flex-1 cursor-pointer"
      onPointerMove={(e) => setHover(at(e))} onPointerLeave={() => setHover(null)} onPointerDown={(e) => onSeek(at(e) * duration)}>
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-white/30 transition-all group-hover:h-1.5">
        <div className="h-full brand-gradient" style={{ width: `${played}%` }} />
      </div>
      <div className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-2 opacity-0 transition group-hover:opacity-100" style={{ left: `${played}%` }} />
      {hover !== null && (
        <span className="absolute -top-8 -translate-x-1/2 rounded bg-ink px-2 py-0.5 text-sm" style={{ left: `${hover * 100}%` }}>{clock(hover * duration)}</span>
      )}
    </div>
  );
}
