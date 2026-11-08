// Admin shell: a sidebar (Dashboard, Titles, Members) beside the page; back to REAflix or sign out.
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router';
import { BackIcon, ChartIcon, FilmIcon, UsersIcon } from '@/components/admin/AdminIcons';
import { Logo } from '@/components/ui/Logo';
import { useAuthController } from '@/controllers/useAuthController';
import { useSession } from '@/hooks/useSession';
import { paths } from '@/routes/paths';
import { cn } from '@/utils/cn';

const links = [
  { to: paths.admin, label: 'Dashboard', Icon: ChartIcon, end: true },
  { to: paths.adminTitles, label: 'Titles', Icon: FilmIcon, end: false },
  { to: paths.adminUsers, label: 'Members', Icon: UsersIcon, end: false },
];

const item = 'flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition';

export default function AdminLayout() {
  const { data: user } = useSession();
  const { logout } = useAuthController();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b border-line bg-surface md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
        <div className="flex items-center gap-3 px-6 py-5">
          <Logo className="text-2xl" />
          <span className="brand-gradient rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Admin</span>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col">
          {links.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => cn(item, isActive ? 'bg-white/10 text-text' : 'text-muted hover:bg-white/5 hover:text-text')}>
              <Icon /> {label}
            </NavLink>
          ))}
          <Link to={paths.browse} className={cn(item, 'text-muted hover:text-text md:hidden')}><BackIcon /> REAflix</Link>
        </nav>
        <div className="mt-auto hidden border-t border-line p-4 text-sm md:block">
          <p className="truncate font-medium">{user?.name}</p>
          <p className="truncate text-muted">{user?.email}</p>
          <Link to={paths.browse} className="mt-4 flex items-center gap-2 text-muted hover:text-text"><BackIcon /> Back to REAflix</Link>
          <button type="button" onClick={() => logout.mutate()} className="mt-2 pl-6 text-muted hover:text-text">Sign out</button>
        </div>
      </aside>
      <main className="min-w-0 px-4 py-6 md:px-10 md:py-8">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
