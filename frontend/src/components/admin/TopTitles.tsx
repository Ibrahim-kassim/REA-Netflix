// Most-played titles this week: ranked bars in one hue (largest first), value at the tip; click to edit.
import { Link } from 'react-router';
import { LazyImage } from '@/components/media/LazyImage';
import type { AdminStats } from '@/models/admin';
import type { ImageSet } from '@/models/title';
import { paths } from '@/routes/paths';

type Props = { items: AdminStats['topTitles']; posters: Record<string, ImageSet> };

export function TopTitles({ items, posters }: Props) {
  const max = Math.max(1, ...items.map((t) => t.plays));
  return (
    <section aria-label="Top titles" className="min-w-0 rounded-xl border border-line bg-surface p-5">
      <header className="mb-4">
        <h2 className="font-bold">Top titles</h2>
        <p className="text-sm text-muted">Plays in the last 7 days</p>
      </header>
      {items.length === 0 && <p className="py-8 text-center text-sm text-muted">No plays this week yet.</p>}
      <ol className="flex flex-col gap-2">
        {items.map((t, i) => (
          <li key={t.slug}>
            <Link to={`${paths.adminTitles}?edit=${t.slug}`} className="group grid grid-cols-[1.25rem_2.5rem_minmax(0,1fr)] items-center gap-3 rounded-md p-1.5 transition hover:bg-white/5">
              <span className="text-center text-lg font-black text-muted">{i + 1}</span>
              <span className="aspect-[2/3] w-10 overflow-hidden rounded bg-surface-2">
                {posters[t.slug] && <LazyImage images={posters[t.slug]} alt="" sizes="40px" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{t.title}</span>
                <span className="mt-1.5 flex items-center gap-2">
                  <span className="h-2.5 rounded-r bg-brand transition group-hover:bg-brand-soft" style={{ width: `${(t.plays / max) * 78}%` }} />
                  <span className="text-xs font-bold tabular-nums">{t.plays.toLocaleString('en-US')}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
