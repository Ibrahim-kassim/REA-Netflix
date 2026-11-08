// Columns of the admin titles table: poster and name, maturity, genres, home-page placement, popularity, plays.
import type { Column } from '@/components/admin/DataTable';
import { LazyImage } from '@/components/media/LazyImage';
import type { AdminTitle } from '@/models/admin';
import { genreList, runtime } from '@/utils/format';

export const titleColumns = (onEdit: (slug: string) => void): Column<AdminTitle>[] => [
  {
    key: 'title',
    header: 'Title',
    cell: (t) => (
      <div className="flex items-center gap-3">
        <span className="aspect-[2/3] w-10 shrink-0 overflow-hidden rounded bg-surface-2"><LazyImage images={t.poster} alt="" sizes="40px" /></span>
        <span className="min-w-0">
          <span className="block truncate font-bold">{t.title}</span>
          <span className="text-xs text-muted">{t.year} · {runtime(t.runtime_min)}</span>
        </span>
      </div>
    ),
  },
  { key: 'maturity', header: 'Maturity', cell: (t) => <span className="rounded border border-white/30 px-1.5 text-xs">{t.maturity}</span> },
  { key: 'genres', header: 'Genres', cell: (t) => <span className="text-muted">{genreList(t.genres)}</span> },
  { key: 'placement', header: 'Home page', cell: (t) => <Placement title={t} /> },
  { key: 'popularity', header: 'Popularity', align: 'right', cell: (t) => t.popularity },
  { key: 'plays', header: 'Plays', align: 'right', cell: (t) => t.plays.toLocaleString('en-US') },
  {
    key: 'edit',
    header: '',
    align: 'right',
    cell: (t) => (
      <button type="button" onClick={() => onEdit(t.slug)} className="rounded-md border border-line px-3 py-1.5 text-xs font-bold hover:border-white">
        Edit
      </button>
    ),
  },
];

function Placement({ title }: { title: AdminTitle }) {
  if (!title.featured && !title.top10_rank) return <span className="text-muted">—</span>;
  return (
    <span className="flex flex-wrap gap-1.5 text-xs">
      {title.featured && <span className="brand-gradient rounded px-1.5 py-0.5 font-bold text-white">Billboard</span>}
      {title.top10_rank && <span className="rounded bg-white px-1.5 py-0.5 font-black text-ink">Top 10 · #{title.top10_rank}</span>}
    </span>
  );
}
