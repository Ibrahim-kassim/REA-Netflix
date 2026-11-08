// The quiet chart frame: hairline gridlines with clean y ticks, a baseline, and the x labels that fit.
import { PAD, tickFormat } from './scale';

type Props = { ticks: number[]; labels: string[]; x: (i: number) => number; y: (v: number) => number; width: number; height: number };

export function Axes({ ticks, labels, x, y, width, height }: Props) {
  const format = tickFormat(ticks);
  const fits = Math.max(1, Math.floor((width - PAD.left - PAD.right) / 64));
  const every = Math.ceil(labels.length / fits);
  return (
    <g aria-hidden>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke={t === 0 ? 'var(--color-muted)' : 'var(--color-line)'} strokeOpacity={t === 0 ? 0.45 : 1} />
          <text x={PAD.left - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px] tabular-nums">{format(t)}</text>
        </g>
      ))}
      {labels.map((label, i) =>
        (labels.length - 1 - i) % every === 0 ? (
          <text key={label} x={x(i)} y={height - 8} textAnchor="middle" className="fill-muted text-[11px]">{label}</text>
        ) : null,
      )}
    </g>
  );
}
