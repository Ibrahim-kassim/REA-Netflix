// Small display formatters shared by cards and details.
export const runtime = (minutes: number): string =>
  minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}m`;

export const genreLabel = (slug: string): string =>
  slug === 'sci-fi' ? 'Sci-Fi' : slug.charAt(0).toUpperCase() + slug.slice(1);

export const genreList = (genres: string[], max = 3): string => genres.slice(0, max).map(genreLabel).join(' • ');

// 75 → "1:15", 3725 → "1:02:05"
export const clock = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rest = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${rest}` : `${m}:${rest}`;
};

// 1,284 in full; 12.9K / 4.2M once it reaches 10,000 (dashboard figures).
export const compactNumber = (n: number): string =>
  n < 10_000 ? n.toLocaleString('en-US') : new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

// "2026-11-08" → "Nov 8"
export const shortDay = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

// Any date the API sends → "Nov 8, 2026"
export const longDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
