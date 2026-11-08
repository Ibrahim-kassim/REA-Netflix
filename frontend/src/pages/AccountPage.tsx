// Account overview: membership, profiles and sign-out.
import { Link } from 'react-router';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { useSession } from '@/hooks/useSession';
import { useAuthController } from '@/controllers/useAuthController';
import { paths } from '@/routes/paths';

export default function AccountPage() {
  const { data: user } = useSession();
  const { profiles } = useActiveProfile();
  const { logout } = useAuthController();

  return (
    <section className="mx-auto max-w-3xl px-6 pb-16 pt-32">
      <h1 className="mb-8 border-b border-line pb-4 text-4xl font-black">Account</h1>
      <dl className="grid gap-6 md:grid-cols-[180px_1fr]">
        <dt className="text-muted">Email</dt><dd>{user?.email}</dd>
        <dt className="text-muted">Plan</dt><dd>Free · Full HD · every open film</dd>
        <dt className="text-muted">Role</dt><dd className="capitalize">{user?.role}</dd>
        <dt className="text-muted">Profiles</dt>
        <dd className="flex flex-wrap gap-4">
          {profiles.map((p) => (
            <span key={p.id} className="flex items-center gap-2"><Avatar colour={p.avatar} className="size-8" />{p.name}{p.kids && ' (Kids)'}</span>
          ))}
          <Link to={paths.profiles} className="underline">Manage</Link>
        </dd>
      </dl>
      <Button variant="ghost" className="mt-10 border border-muted" onClick={() => logout.mutate()}>Sign out of REAflix</Button>
    </section>
  );
}
