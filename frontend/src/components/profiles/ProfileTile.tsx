// One profile on the "Who's watching?" screen (pencil overlay in manage mode).
import type { Profile } from '@/models/profile';
import { Avatar } from '@/components/ui/Avatar';

type Props = { profile: Profile; managing: boolean; onClick: () => void };

export function ProfileTile({ profile, managing, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="group flex w-28 flex-col items-center gap-3 md:w-36">
      <span className="relative block w-full overflow-hidden rounded-md ring-white transition group-hover:ring-4 group-focus-visible:ring-4">
        <Avatar colour={profile.avatar} className="w-full" />
        {managing && <span className="absolute inset-0 grid place-items-center bg-black/55 text-4xl">✎</span>}
        {profile.kids && <span className="absolute bottom-1 right-1 rounded bg-white px-1.5 text-xs font-black text-ink">KIDS</span>}
      </span>
      <span className="text-muted transition group-hover:text-white md:text-lg">{profile.name}</span>
    </button>
  );
}
