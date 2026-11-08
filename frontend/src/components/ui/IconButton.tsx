// Round icon buttons (play, add, like, more) used on cards, the preview and the modal.
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; solid?: boolean; children: ReactNode };

export function IconButton({ label, solid = false, className, children, ...rest }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'grid size-9 place-items-center rounded-full border-2 text-base transition hover:scale-110 md:size-10',
        solid ? 'border-white bg-white text-ink hover:bg-white/85' : 'border-white/60 bg-ink/60 text-white hover:border-white',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
