// Counts per day as columns: at most 24px wide, 4px rounded tops, square on the baseline, tooltip per column.
import { useElementWidth } from '@/hooks/useElementWidth';
import { Axes } from './Axes';
import { ChartTooltip } from './ChartTooltip';
import { PAD, columnPath, niceTicks, type Point } from './scale';
import { useChartFocus } from './useChartFocus';

type Props = { data: Point[]; unit: string; height?: number };

export function ColumnChart({ data, unit, height = 200 }: Props) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const ticks = niceTicks(Math.max(0, ...data.map((d) => d.value)));
  const top = ticks[ticks.length - 1];
  const plotW = Math.max(1, width - PAD.left - PAD.right);
  const plotH = height - PAD.top - PAD.bottom;
  const band = plotW / Math.max(1, data.length);
  const barWidth = Math.max(2, Math.min(24, band - 2)); // 2px surface gap between neighbours
  const x = (i: number) => PAD.left + band * (i + 0.5);
  const y = (v: number) => PAD.top + plotH * (1 - v / top);
  const { active, handlers } = useChartFocus(data.length, x);
  const peak = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);
  if (!data.length) return null;

  return (
    <div ref={ref} className="relative" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} tabIndex={0} role="img" aria-label={`${unit} per day. Use the arrow keys to read each day.`}
          className="block touch-none rounded outline-none focus-visible:ring-2 focus-visible:ring-brand" {...handlers}>
          <Axes ticks={ticks} labels={data.map((d) => d.label)} x={x} y={y} width={width} height={height} />
          {data.map((d, i) => (
            <path key={d.label} d={columnPath(x(i), y(d.value), y(0), barWidth)}
              fill={i === active ? 'var(--color-brand-soft)' : 'var(--color-brand)'} />
          ))}
          {active === null && data[peak].value > 0 && (
            <text x={x(peak)} y={y(data[peak].value) - 8} textAnchor="middle" className="fill-text text-xs font-bold tabular-nums">
              {data[peak].value.toLocaleString('en-US')}
            </text>
          )}
        </svg>
      )}
      {active !== null && (
        <ChartTooltip x={x(active)} y={y(data[active].value)} width={width} label={data[active].label}
          value={`${data[active].value.toLocaleString('en-US')} ${unit}`} />
      )}
    </div>
  );
}
