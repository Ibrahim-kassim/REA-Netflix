// Profile avatar: a brand-coloured square with a friendly face (drawn in SVG, scales to any size).
import type { Avatar as AvatarColour } from '@/models/profile';
import { cn } from '@/utils/cn';

const COLOURS: Record<AvatarColour, [string, string]> = {
  violet: ['#a78bfa', '#6d28d9'],
  pink: ['#f472b6', '#be185d'],
  amber: ['#fbbf24', '#b45309'],
  teal: ['#2dd4bf', '#0f766e'],
  blue: ['#60a5fa', '#1d4ed8'],
  lime: ['#a3e635', '#4d7c0f'],
};

export function Avatar({ colour, className }: { colour: AvatarColour; className?: string }) {
  const [from, to] = COLOURS[colour];
  const id = `av-${colour}`;
  return (
    <svg viewBox="0 0 100 100" className={cn('rounded-md', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="8" fill={`url(#${id})`} />
      <rect x="27" y="34" width="10" height="16" rx="5" fill="#fff" />
      <rect x="63" y="34" width="10" height="16" rx="5" fill="#fff" />
      <path d="M28 64 Q50 84 72 64" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}
