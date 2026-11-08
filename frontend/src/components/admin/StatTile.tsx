// KPI tile: label, value (full under 10,000, compact above) and an optional weekly change or note.
import { cn } from '@/utils/cn';
import { compactNumber } from '@/utils/format';

type Props = { label: string; value: number; change?: number | null; note?: string };

export function StatTile({ label, value, change, note }: Props) {
  const tone = !change ? 'text-muted' : change > 0 ? 'text-good' : 'text-bad';
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{compactNumber(value)}</p>
      {change != null && (
        <p className={cn('mt-1 text-xs font-medium', tone)}>
          <span aria-hidden>{change > 0 ? '▲ ' : change < 0 ? '▼ ' : ''}</span>
          <span className="sr-only">{change > 0 ? 'Up ' : change < 0 ? 'Down ' : ''}</span>
          {change ? `${Math.abs(change)}%` : 'No change'} <span className="text-muted">vs the 7 days before</span>
        </p>
      )}
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}
