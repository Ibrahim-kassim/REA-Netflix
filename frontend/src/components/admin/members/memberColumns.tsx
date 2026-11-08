// Columns of the members table, with role and access actions (an admin can't lock themself out).
import type { Column } from '@/components/admin/DataTable';
import type { AdminUser } from '@/models/admin';
import { cn } from '@/utils/cn';
import { longDate } from '@/utils/format';

type Change = (id: string, patch: Partial<Pick<AdminUser, 'role' | 'disabled'>>) => void;

export const memberColumns = (meId: string | undefined, change: Change): Column<AdminUser>[] => [
  {
    key: 'member',
    header: 'Member',
    cell: (u) => (
      <div className="flex items-center gap-3">
        <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 font-bold uppercase">{u.name.charAt(0)}</span>
        <span className="min-w-0">
          <span className="flex items-center gap-2 font-bold">
            {u.name}
            {u.sample && <span className="rounded bg-white/10 px-1.5 text-[10px] font-medium uppercase tracking-wider text-muted">Sample</span>}
          </span>
          <span className="block truncate text-xs text-muted">{u.email}</span>
        </span>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    cell: (u) => (u.role === 'admin' ? <span className="brand-gradient rounded px-2 py-0.5 text-xs font-bold text-white">Admin</span> : <span className="text-muted">Member</span>),
  },
  { key: 'profiles', header: 'Profiles', align: 'right', cell: (u) => u.profiles },
  { key: 'plays', header: 'Plays', align: 'right', cell: (u) => u.plays.toLocaleString('en-US') },
  { key: 'joined', header: 'Joined', cell: (u) => <span className="whitespace-nowrap text-muted">{longDate(u.created_at)}</span> },
  { key: 'status', header: 'Status', cell: (u) => <Status paused={Boolean(u.disabled)} /> },
  {
    key: 'actions',
    header: '',
    align: 'right',
    cell: (u) =>
      u.id === meId ? (
        <span className="text-xs text-muted">This is you</span>
      ) : (
        <span className="flex justify-end gap-2">
          <Action onClick={() => change(u.id, { role: u.role === 'admin' ? 'user' : 'admin' })}>{u.role === 'admin' ? 'Remove admin' : 'Make admin'}</Action>
          <Action onClick={() => change(u.id, { disabled: !u.disabled })}>{u.disabled ? 'Restore access' : 'Pause access'}</Action>
        </span>
      ),
  },
];

function Status({ paused }: { paused: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className={cn('size-2 rounded-full', paused ? 'bg-bad' : 'bg-good')} />
      {paused ? 'Paused' : 'Active'}
    </span>
  );
}

function Action({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button type="button" onClick={onClick} className="whitespace-nowrap rounded-md border border-line px-2.5 py-1 text-xs font-bold hover:border-white">
      {children}
    </button>
  );
}
