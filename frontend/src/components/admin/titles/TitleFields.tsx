// The title form's fields: name, numbers, maturity, description, genres (1 to 5), Top 10 slot and billboard.
import { Field, controlClass } from '@/components/ui/Field';
import { cn } from '@/utils/cn';
import { genreLabel } from '@/utils/format';
import { GENRES, MATURITIES, type TitleForm } from './titleForm';

type Props = { form: TitleForm; errors: Record<string, string>; onChange: (form: TitleForm) => void };

export function TitleFields({ form, errors, onChange }: Props) {
  const set = <K extends keyof TitleForm>(key: K, value: TitleForm[K]) => onChange({ ...form, [key]: value });
  const toggle = (g: string) => set('genres', form.genres.includes(g) ? form.genres.filter((x) => x !== g) : [...form.genres, g]);

  return (
    <div className="flex flex-col gap-5 px-6 py-6">
      <Field label="Title" error={errors.title}>
        {(id) => <input id={id} autoFocus required maxLength={80} className={controlClass} value={form.title} onChange={(e) => set('title', e.target.value)} />}
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Year" error={errors.year}>
          {(id) => <input id={id} type="number" required min={1900} max={2100} className={controlClass} value={form.year} onChange={(e) => set('year', e.target.value)} />}
        </Field>
        <Field label="Minutes" error={errors.runtime_min}>
          {(id) => <input id={id} type="number" required min={1} max={600} className={controlClass} value={form.runtime_min} onChange={(e) => set('runtime_min', e.target.value)} />}
        </Field>
        <Field label="Maturity" error={errors.maturity}>
          {(id) => (
            <select id={id} className={controlClass} value={form.maturity} onChange={(e) => set('maturity', e.target.value)}>
              {MATURITIES.map((m) => <option key={m}>{m}</option>)}
            </select>
          )}
        </Field>
      </div>
      <Field label="Description" error={errors.description}>
        {(id) => (
          <textarea id={id} rows={4} required minLength={10} maxLength={400} className={cn(controlClass, 'h-auto py-2 leading-relaxed')}
            value={form.description} onChange={(e) => set('description', e.target.value)} />
        )}
      </Field>
      <fieldset>
        <legend className="mb-2 text-sm text-muted">Genres (1 to 5)</legend>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => {
            const on = form.genres.includes(g);
            return (
              <button key={g} type="button" aria-pressed={on} onClick={() => toggle(g)}
                disabled={on ? form.genres.length === 1 : form.genres.length >= 5}
                className={cn('rounded-full border px-3 py-1 text-sm transition disabled:opacity-40', on ? 'border-brand bg-brand/20 text-text' : 'border-line text-muted hover:border-white')}>
                {genreLabel(g)}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Top 10 position" error={errors.top10_rank}>
          {(id) => (
            <select id={id} className={controlClass} value={form.top10_rank} onChange={(e) => set('top10_rank', e.target.value)}>
              <option value="">Not in the Top 10</option>
              {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>#{i + 1}</option>)}
            </select>
          )}
        </Field>
        <Field label="Popularity (0–100)" error={errors.popularity}>
          {(id) => <input id={id} type="number" required min={0} max={100} className={controlClass} value={form.popularity} onChange={(e) => set('popularity', e.target.value)} />}
        </Field>
      </div>
      <p className="-mt-2 text-xs text-muted">Picking a Top 10 position another title holds swaps the two.</p>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" className="size-4 accent-brand" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
        Show on the home page billboard (replaces the current one)
      </label>
    </div>
  );
}
