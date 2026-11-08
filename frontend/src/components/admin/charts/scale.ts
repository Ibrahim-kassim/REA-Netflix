// Chart maths shared by every chart: padding, clean axis ticks and one number style per axis.
export type Point = { label: string; value: number };

export const PAD = { top: 18, right: 36, bottom: 30, left: 44 };

// 0 → max, rounded up to a clean whole step (1, 2 or 5 × 10ⁿ), about `count` ticks.
export function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0, 1];
  const raw = max / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = Math.max(1, [1, 2, 5, 10].map((m) => m * power).find((s) => s >= raw) ?? raw);
  const top = Math.ceil(max / step) * step;
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
}

// Full numbers under 10,000 (1,000 / 2,000); compact once the axis reaches it (10K / 20K).
export const tickFormat = (ticks: number[]) => {
  const compact = (ticks[ticks.length - 1] ?? 0) >= 10_000;
  return (n: number) => (compact ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US'));
};

// A column with a 4px rounded top and a square foot on the baseline.
export function columnPath(cx: number, top: number, base: number, width: number): string {
  const height = base - top;
  if (height <= 0) return '';
  const r = Math.min(4, height, width / 2);
  const left = cx - width / 2;
  const right = cx + width / 2;
  return `M${left},${base}V${top + r}Q${left},${top} ${left + r},${top}H${right - r}Q${right},${top} ${right},${top + r}V${base}Z`;
}
