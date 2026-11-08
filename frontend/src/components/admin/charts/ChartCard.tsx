// A chart's card: title, subtitle, the chart, and its table view (every value readable without hovering).
import type { ReactNode } from 'react';
import type { Point } from './scale';

type Props = { title: string; subtitle: string; rows: Point[]; unit: string; children: ReactNode };

export function ChartCard({ title, subtitle, rows, unit, children }: Props) {
  return (
    <section aria-label={title} className="min-w-0 rounded-xl border border-line bg-surface p-5">
      <header className="mb-4">
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </header>
      {children}
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-muted hover:text-text">View as table</summary>
        <table className="mt-2 w-full tabular-nums">
          <thead>
            <tr className="text-left text-muted">
              <th scope="col" className="py-1 font-medium">Day</th>
              <th scope="col" className="py-1 text-right font-medium">{unit}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <td className="py-1">{row.label}</td>
                <td className="py-1 text-right">{row.value.toLocaleString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}
