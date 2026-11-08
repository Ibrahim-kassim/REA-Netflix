// Hover/focus readout: the value leads in bold, the day follows; kept inside the card.
type Props = { x: number; y: number; width: number; value: string; label: string };

export function ChartTooltip({ x, y, width, value, label }: Props) {
  const left = Math.min(Math.max(x, 64), width - 64);
  return (
    <div
      aria-live="polite"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-white/10 bg-ink/95 px-3 py-2 text-center shadow-xl"
      style={{ left, top: y - 12 }}
    >
      <p className="text-sm font-bold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
