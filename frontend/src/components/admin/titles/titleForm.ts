// The edit form's state (strings, as inputs hold them) and the patch it sends (numbers; null leaves the Top 10).
import type { AdminTitle, AdminTitlePatch } from '@/models/admin';

export const MATURITIES = ['All ages', '7+', '13+', '16+', '18+'] as const;
export const GENRES = ['animation', 'sci-fi', 'comedy', 'action', 'fantasy', 'family', 'drama', 'horror'] as const;

export type TitleForm = {
  title: string;
  year: string;
  runtime_min: string;
  maturity: string;
  description: string;
  genres: string[];
  top10_rank: string; // '' = not in the Top 10
  popularity: string;
  featured: boolean;
};

export const toForm = (t: AdminTitle): TitleForm => ({
  title: t.title,
  year: String(t.year),
  runtime_min: String(t.runtime_min),
  maturity: t.maturity,
  description: t.description,
  genres: t.genres,
  top10_rank: t.top10_rank ? String(t.top10_rank) : '',
  popularity: String(t.popularity ?? 0),
  featured: Boolean(t.featured),
});

export const toPatch = (f: TitleForm): AdminTitlePatch => ({
  title: f.title.trim(),
  year: Number(f.year),
  runtime_min: Number(f.runtime_min),
  maturity: f.maturity,
  description: f.description.trim(),
  genres: f.genres,
  top10_rank: f.top10_rank ? Number(f.top10_rank) : null,
  popularity: Number(f.popularity),
  featured: f.featured,
});
