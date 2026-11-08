// Side panel to edit one title. Escape or the backdrop closes it; the API's field errors show inline.
import { useEffect, useState, type FormEvent } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import type { TitleEdit } from '@/controllers/admin/useAdminTitlesController';
import type { AdminTitle } from '@/models/admin';
import { ApiError } from '@/services/http';
import { TitleFields } from './TitleFields';
import { toForm, toPatch } from './titleForm';

type Props = { title: AdminTitle; onClose: () => void; save: UseMutationResult<AdminTitle, Error, TitleEdit> };

export function TitleEditor({ title, onClose, save }: Props) {
  const [form, setForm] = useState(() => toForm(title));
  const fieldErrors = save.error instanceof ApiError ? (save.error.fields ?? {}) : {};

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    save.mutate({ slug: title.slug, patch: toPatch(form) }, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onClose}>
      <form role="dialog" aria-modal aria-label={`Edit ${title.title}`} onSubmit={submit} onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-line bg-surface shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Edit title</p>
            <h2 className="text-xl font-bold">{title.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-full hover:bg-white/10">✕</button>
        </header>
        <TitleFields form={form} errors={fieldErrors} onChange={setForm} />
        <footer className="sticky bottom-0 mt-auto flex items-center justify-end gap-3 border-t border-line bg-surface px-6 py-4">
          {save.error && <p role="alert" className="mr-auto text-sm text-bad">{save.error.message}</p>}
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save changes'}</Button>
        </footer>
      </form>
    </div>
  );
}
