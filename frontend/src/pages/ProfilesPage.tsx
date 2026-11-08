// "Who's watching?" — pick a profile, or manage them (add, rename, recolour, delete).
import { useState } from 'react';
import { Link } from 'react-router';
import type { Profile } from '@/models/profile';
import { Logo } from '@/components/ui/Logo';
import { Spinner } from '@/components/ui/Spinner';
import { ProfileTile } from '@/components/profiles/ProfileTile';
import { ProfileEditor } from '@/components/profiles/ProfileEditor';
import { useProfiles } from '@/hooks/useActiveProfile';
import { useSession } from '@/hooks/useSession';
import { paths } from '@/routes/paths';
import { useProfilesController } from '@/controllers/useProfilesController';

type Editing = Profile | 'new' | null;

export default function ProfilesPage() {
  const { data: profiles = [], isPending } = useProfiles();
  const { data: user } = useSession();
  const { choose, create, update, remove } = useProfilesController();
  const [managing, setManaging] = useState(false);
  const [editing, setEditing] = useState<Editing>(null);
  if (isPending) return <Spinner label="Loading profiles" />;

  if (editing) {
    const existing = editing === 'new' ? undefined : editing;
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <ProfileEditor initial={existing} onCancel={() => setEditing(null)}
          onSave={(data) => (existing ? update.mutate({ id: existing.id, data }) : create.mutate(data), setEditing(null))}
          onDelete={existing && profiles.length > 1 ? () => (remove.mutate(existing.id), setEditing(null)) : undefined} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-6">
      <Logo className="absolute left-8 top-6 text-3xl md:text-4xl" />
      <h1 className="text-4xl font-medium md:text-6xl">{managing ? 'Manage Profiles:' : "Who's watching?"}</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {profiles.map((p) => (
          <ProfileTile key={p.id} profile={p} managing={managing} onClick={() => (managing ? setEditing(p) : choose(p.id))} />
        ))}
        {profiles.length < 5 && (
          <button type="button" onClick={() => setEditing('new')} className="group flex w-28 flex-col items-center gap-3 md:w-36">
            <span className="grid aspect-square w-full place-items-center rounded-md text-7xl text-muted transition group-hover:bg-white group-hover:text-ink">+</span>
            <span className="text-muted md:text-lg">Add Profile</span>
          </button>
        )}
      </div>
      <button type="button" onClick={() => setManaging(!managing)}
        className={managing ? 'bg-white px-8 py-2 font-bold text-ink' : 'border border-muted px-8 py-2 tracking-widest text-muted hover:border-white hover:text-white'}>
        {managing ? 'Done' : 'MANAGE PROFILES'}
      </button>
      {user?.role === 'admin' && !managing && (
        <Link to={paths.admin} className="text-sm text-muted underline-offset-4 hover:text-text hover:underline">Open the Admin Dashboard →</Link>
      )}
    </main>
  );
}
