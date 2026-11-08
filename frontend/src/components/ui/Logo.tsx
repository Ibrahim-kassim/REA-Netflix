// REAflix wordmark: bold "REA" + "flix", brand gradient (no external font needed).
// Pass size classes in className to change the default size.
import { BRAND } from '@/brand/brand';
import { cn } from '@/utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('select-none font-black tracking-tight', className ?? 'text-3xl md:text-4xl')} aria-label={BRAND.name}>
      <span className="text-brand-gradient">REA</span>
      <span className="text-text">flix</span>
    </span>
  );
}
