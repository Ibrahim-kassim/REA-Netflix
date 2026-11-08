// % Match for any title, from the genres of what this profile liked or saved.
import { useMemo } from 'react';
import type { TitleCard } from '@/models/title';
import { likedGenres, matchScore } from '@/utils/match';
import { useMyListController } from './useMyListController';
import { useRatingsController } from './useRatingsController';
import { useBrowseController } from './useBrowseController';

export function useMatch() {
  const { titles: saved } = useMyListController();
  const { ratings } = useRatingsController();
  const { rows } = useBrowseController();
  const genres = useMemo(() => {
    const bySlug = new Map(rows.flatMap((r) => r.titles).map((t) => [t.slug, t]));
    const liked = Object.entries(ratings).filter(([, v]) => v === 1).map(([s]) => bySlug.get(s)).filter(Boolean) as TitleCard[];
    return likedGenres([...saved, ...liked]);
  }, [rows, ratings, saved]);
  return (title: TitleCard) => matchScore(title, genres);
}
