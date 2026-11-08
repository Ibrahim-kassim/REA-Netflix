// Add / edit a profile: name, colour and the kids switch.
import { useState, type FormEvent } from 'react';
import { AVATARS, type Profile, type ProfileInput } from '@/models/profile';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';

type Props = { initial?: Profile; onSave: (data: ProfileInput) => void; onDelete?: () => void; onCancel: () => void };

export function ProfileEditor({ initial, onSave, onDelete, onCancel }: Props) {
  const [form, setForm] = useState<ProfileInput>({ name: initial?.name ?? '', avatar: initial?.avatar ?? 'violet', kids: initial?.kids ?? false });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (form.name.trim()) onSave({ ...form, name: form.name.trim() });
  };

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <h1 className="mb-6 border-b border-line pb-4 text-4xl font-black">{initial ? 'Edit Profile' : 'Add Profile'}</h1>
      <div className="flex gap-6">
        <Avatar colour={form.avatar} className="size-28 shrink-0" />
        <div className="flex flex-1 flex-col gap-4">
          <Input label="Name" value={form.name} maxLength={20} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="flex gap-2" role="radiogroup" aria-label="Colour">
            {AVATARS.map((colour) => (
              <button key={colour} type="button" role="radio" aria-checked={form.avatar === colour} aria-label={colour}
                onClick={() => setForm({ ...form, avatar: colour })}
                className={cn('rounded-md ring-white transition', form.avatar === colour && 'ring-2')}>
                <Avatar colour={colour} className="size-10" />
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={form.kids} onChange={(e) => setForm({ ...form, kids: e.target.checked })} className="size-5 accent-brand" />
            <span>Kids profile <span className="text-muted">(only All ages and 7+ titles)</span></span>
          </label>
        </div>
      </div>
      <div className="mt-8 flex gap-3 border-t border-line pt-6">
        <Button type="submit" variant="light">Save</Button>
        <Button type="button" variant="ghost" className="border border-muted" onClick={onCancel}>Cancel</Button>
        {onDelete && <Button type="button" variant="ghost" className="ml-auto border border-muted" onClick={onDelete}>Delete Profile</Button>}
      </div>
    </form>
  );
}
