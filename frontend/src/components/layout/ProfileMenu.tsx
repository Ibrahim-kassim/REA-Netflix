// Avatar + dropdown: switch profile, manage profiles, account, admin (admins only), sign out.
import { useState } from 'react';
import { Link } from 'react-router';
import { Avatar } from '@/components/ui/Avatar';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { useSession } from '@/hooks/useSession';
import { useAuthController } from '@/controllers/useAuthController';
import { useProfilesController } from '@/controllers/useProfilesController';
import { paths } from '@/routes/paths';

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { profile, profiles } = useActiveProfile();
  const { data: user } = useSession();
  const { choose } = useProfilesController();
  const { logout } = useAuthController();
  if (!profile) return null;

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="flex items-center gap-2" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Avatar colour={profile.avatar} className="size-8" />
        <span className={`text-xs transition ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full w-60 border border-line bg-ink/95 py-3 text-sm shadow-2xl">
          {profiles.filter((p) => p.id !== profile.id).map((p) => (
            <button key={p.id} type="button" role="menuitem" onClick={() => choose(p.id)} className="flex w-full items-center gap-3 px-4 py-1.5 hover:underline">
              <Avatar colour={p.avatar} className="size-8" /> {p.name}
            </button>
          ))}
          <MenuLink to={paths.profiles}>Manage Profiles</MenuLink>
          <MenuLink to={paths.account}>Account</MenuLink>
          {user?.role === 'admin' && <MenuLink to={paths.admin}>Admin Dashboard</MenuLink>}
          <button type="button" role="menuitem" onClick={() => logout.mutate()} className="mt-2 w-full border-t border-line px-4 pt-3 text-center hover:underline">
            Sign out of REAflix
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({ to, children }: { to: string; children: string }) {
  return <Link to={to} role="menuitem" className="block px-4 py-1.5 hover:underline">{children}</Link>;
}
