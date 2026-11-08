// Placeholder shimmer while data or images load.
import { cn } from '@/utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-[var(--radius-card)] bg-surface-2', className)} />;
}
