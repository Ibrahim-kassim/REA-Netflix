// The one button for the app: same look for <button> and router links.
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'light' | 'glass' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-bold transition duration-200 ease-[var(--ease-out-quint)] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none';
const variants: Record<Variant, string> = {
  primary: 'brand-gradient text-white shadow-lg shadow-brand/30 hover:brightness-110',
  light: 'bg-white text-ink hover:bg-white/85',
  glass: 'bg-white/15 text-white backdrop-blur hover:bg-white/25',
  ghost: 'text-text hover:bg-white/10',
};
const sizes: Record<Size, string> = { md: 'h-10 px-4 text-sm', lg: 'h-14 px-7 text-lg' };

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export const buttonClass = ({ variant = 'primary', size = 'md', className }: Omit<Common, 'children'>) =>
  cn(base, variants[variant], sizes[size], className);

export function Button({ variant, size, className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({ to, variant, size, className, children }: Common & { to: string }) {
  return (
    <Link to={to} className={buttonClass({ variant, size, className })}>
      {children}
    </Link>
  );
}
