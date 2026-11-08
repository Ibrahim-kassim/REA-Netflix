// Labelled input with an inline error message (accessible: label + aria-describedby).
import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export function Input({ label, error, className, ...rest }: Props) {
  const id = useId();
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 rounded-md border border-line bg-surface/80 px-4 text-text placeholder:text-muted/60 focus:border-brand focus:outline-none"
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-brand-2">
          {error}
        </p>
      )}
    </div>
  );
}
