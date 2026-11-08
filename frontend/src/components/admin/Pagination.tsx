// "Showing 13–24 of 38" with Previous / Next.
import { Button } from '@/components/ui/Button';

type Props = { page: number; pages: number; total: number; size: number; onPage: (page: number) => void };

export function Pagination({ page, pages, total, size, onPage }: Props) {
  const from = total ? (page - 1) * size + 1 : 0;
  const to = Math.min(total, page * size);
  return (
    <nav aria-label="Pages" className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
      <p>Showing {from}–{to} of {total}</p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="border border-line" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</Button>
        <span className="px-2">Page {page} of {pages}</span>
        <Button variant="ghost" className="border border-line" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</Button>
      </div>
    </nav>
  );
}
