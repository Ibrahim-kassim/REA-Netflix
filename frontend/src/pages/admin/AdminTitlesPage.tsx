// Catalogue management: search the films, see plays and home-page placement, open any title to edit it.
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AdminError, AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { TitleEditor } from '@/components/admin/titles/TitleEditor';
import { titleColumns } from '@/components/admin/titles/titleColumns';
import { Spinner } from '@/components/ui/Spinner';
import { useAdminTitlesController } from '@/controllers/admin/useAdminTitlesController';

export default function AdminTitlesPage() {
  const { titles, isPending, error, update } = useAdminTitlesController();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const editing = titles.find((t) => t.slug === params.get('edit'));

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? titles.filter((t) => t.title.toLowerCase().includes(q) || t.genres.some((g) => g.includes(q))) : titles;
  }, [titles, query]);

  const open = (slug: string) => {
    update.reset();
    setParams({ edit: slug }, { preventScrollReset: true });
  };
  const close = () => setParams({}, { replace: true, preventScrollReset: true });

  if (error) return <AdminError message={error.message} />;
  return (
    <div className="flex flex-col gap-6">
      <AdminHeader title="Titles" subtitle={`${titles.length} films in the catalogue · most popular first`}>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search titles or genres" aria-label="Search titles"
          className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm placeholder:text-muted focus:border-brand focus:outline-none sm:w-64" />
      </AdminHeader>
      {isPending ? (
        <Spinner label="Loading titles" />
      ) : (
        <DataTable caption="Titles" columns={titleColumns(open)} rows={shown} rowKey={(t) => t.slug} empty="No titles match your search." />
      )}
      {editing && <TitleEditor key={editing.slug} title={editing} onClose={close} save={update} />}
    </div>
  );
}
