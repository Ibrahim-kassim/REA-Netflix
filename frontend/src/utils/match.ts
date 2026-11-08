// "% Match": how well a title's genres fit what this profile liked or saved (no fake numbers).
import type { TitleCard } from '@/models/title';

export function matchScore(title: TitleCard, likedGenres: Map<string, number>): number {
  if (likedGenres.size === 0) {
    return title.top10_rank ? 99 - title.top10_rank * 2 : 82; // new profiles: popularity decides
  }
  const total = [...likedGenres.values()].reduce((a, b) => a + b, 0);
  const weight = title.genres.reduce((sum, g) => sum + (likedGenres.get(g) ?? 0), 0);
  return Math.min(99, Math.round(64 + 35 * (weight / total) * (likedGenres.size / title.genres.length)));
}

export function likedGenres(liked: TitleCard[]): Map<string, number> {
  const counts = new Map<string, number>();
  liked.forEach((t) => t.genres.forEach((g) => counts.set(g, (counts.get(g) ?? 0) + 1)));
  return counts;
}
