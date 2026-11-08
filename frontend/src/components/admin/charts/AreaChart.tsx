// Trend over time, one series: a 2px line over a 10% wash, crosshair + tooltip, latest value labelled.
import { useElementWidth } from '@/hooks/useElementWidth';
import { Axes } from './Axes';
import { ChartTooltip } from './ChartTooltip';
import { PAD, niceTicks, type Point } from './scale';
import { useChartFocus } from './useChartFocus';

type Props = { data: Point[]; unit: string; height?: number };

export function AreaChart({ data, unit, height = 240 }: Props) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const ticks = niceTicks(Math.max(0, ...data.map((d) => d.value)));
  const top = ticks[ticks.length - 1];
  const plotW = Math.max(1, width - PAD.left - PAD.right);
  const plotH = height - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (data.length > 1 ? (i / (data.length - 1)) * plotW : plotW / 2);
  const y = (v: number) => PAD.top + plotH * (1 - v / top);
  const { active, handlers } = useChartFocus(data.length, x);
  if (!data.length) return null;

  const line = data.map((d, i) => `${i ? 'L' : 'M'}${x(i)},${y(d.value)}`).join('');
  const area = `${line}L${x(data.length - 1)},${y(0)}L${x(0)},${y(0)}Z`;
  const shown = active ?? data.length - 1;

  return (
    <div ref={ref} className="relative" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} tabIndex={0} role="img" aria-label={`${unit} per day. Use the arrow keys to read each day.`}
          className="block touch-none rounded outline-none focus-visible:ring-2 focus-visible:ring-brand" {...handlers}>
          <Axes ticks={ticks} labels={data.map((d) => d.label)} x={x} y={y} width={width} height={height} />
          <path d={area} fill="var(--color-brand)" fillOpacity={0.1} />
          <path d={line} fill="none" stroke="var(--color-brand)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {active !== null && <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={y(0)} stroke="var(--color-muted)" strokeOpacity={0.6} />}
          <circle cx={x(shown)} cy={y(data[shown].value)} r={4} fill="var(--color-brand)" stroke="var(--color-surface)" strokeWidth={2} />
          {active === null && (
            <text x={x(shown) + 10} y={y(data[shown].value)} dy="0.32em" className="fill-text text-xs font-bold tabular-nums">
              {data[shown].value.toLocaleString('en-US')}
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
