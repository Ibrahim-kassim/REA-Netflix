// Members: every account, its profiles and plays; make admins or pause access. 12 per page, newest first.
import { useSearchParams } from 'react-router';
import { AdminError, AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { memberColumns } from '@/components/admin/members/memberColumns';
import { Spinner } from '@/components/ui/Spinner';
import { useAdminUsersController } from '@/controllers/admin/useAdminUsersController';
import { useSession } from '@/hooks/useSession';
import { ADMIN_PAGE_SIZE } from '@/services/admin.api';

export default function AdminUsersPage() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const { data, isPending, isPlaceholderData, error, pages, update } = useAdminUsersController(page);
  const { data: me } = useSession();
  if (error) return <AdminError message={error.message} />;
  const total = data?.total ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader title="Members" subtitle={`${total} accounts · newest first`} />
      {update.error && <p role="alert" className="rounded-lg bg-bad/10 px-4 py-3 text-sm text-bad">{update.error.message}</p>}
      {isPending || !data ? (
        <Spinner label="Loading members" />
      ) : (
        <DataTable caption="Members" rows={data.items} rowKey={(u) => u.id} dim={isPlaceholderData}
          columns={memberColumns(me?.id, (id, patch) => update.mutate({ id, patch }))} />
      )}
      <Pagination page={page} pages={pages} total={total} size={ADMIN_PAGE_SIZE} onPage={(p) => setParams({ page: String(p) })} />
    </div>
  );
}
