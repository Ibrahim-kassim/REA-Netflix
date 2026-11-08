// Thumbs up / down for the active profile, with optimistic updates.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Ratings } from '@/models/title';
import { useActiveProfileId } from '@/hooks/useActiveProfile';
import { activityApi } from '@/services/activity.api';
import { queryKeys } from '@/services/queryKeys';

export function useRatingsController() {
  const client = useQueryClient();
  const id = useActiveProfileId();
  const key = queryKeys.ratings(id);
  const ratings = useQuery({ queryKey: key, queryFn: ({ signal }) => activityApi.ratings(signal) });

  const rate = useMutation({
    mutationFn: ({ slug, value }: { slug: string; value: 1 | 0 | -1 }) => activityApi.rate(slug, value),
    onMutate: ({ slug, value }) =>
      client.setQueryData<Ratings>(key, (old = {}) => {
        const next = { ...old };
        if (value === 0) delete next[slug];
        else next[slug] = value;
        return next;
      }),
    onError: () => client.invalidateQueries({ queryKey: key }),
  });

  const ratingOf = (slug: string) => ratings.data?.[slug] ?? 0;
  return { ratings: ratings.data ?? {}, ratingOf, rate };
}
