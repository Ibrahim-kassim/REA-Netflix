// A labelled form control with its error message (the label and error are tied to the control by id).
import { useId, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const controlClass =
  'h-11 w-full rounded-md border border-line bg-ink px-3 text-text placeholder:text-muted/60 focus:border-brand focus:outline-none';

type Props = { label: string; error?: string; className?: string; children: (id: string, describedBy?: string) => ReactNode };

export function Field({ label, error, className, children }: Props) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm text-muted">{label}</label>
      {children(id, error ? errorId : undefined)}
      {error && <p id={errorId} className="text-sm text-bad">{error}</p>}
    </div>
  );
}
