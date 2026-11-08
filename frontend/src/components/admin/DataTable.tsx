// Reusable admin table: each column says its header and how to draw a cell. Scrolls sideways on phones.
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type Column<T> = { key: string; header: string; cell: (row: T) => ReactNode; align?: 'left' | 'right' };

type Props<T> = { caption: string; columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; empty?: string; dim?: boolean };

export function DataTable<T>({ caption, columns, rows, rowKey, empty = 'Nothing here yet.', dim = false }: Props<T>) {
  const align = (c: Column<T>) => (c.align === 'right' ? 'text-right tabular-nums' : 'text-left');
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-line bg-surface transition-opacity', dim && 'opacity-60')}>
      <table className="w-full min-w-[760px] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn('px-4 py-3 font-medium', align(c))}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-muted">{empty}</td></tr>
          )}
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-line/60 transition last:border-0 hover:bg-white/[0.03]">
              {columns.map((c) => (
                <td key={c.key} className={cn('px-4 py-3', align(c))}>{c.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
