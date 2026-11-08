// A signed, expiring video link (counted as one play) plus the resume position for this profile.
import { useQuery } from '@tanstack/react-query';
import { useActiveProfileId } from '@/hooks/useActiveProfile';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';

export function useWatchController(slug: string) {
  const id = useActiveProfileId();
  const stream = useQuery({
    queryKey: queryKeys.stream(id, slug),
    queryFn: ({ signal }) => titlesApi.stream(slug, signal),
    staleTime: Infinity, // one link per visit to the player
    gcTime: 0,
  });
  const details = useQuery({ queryKey: queryKeys.title(slug), queryFn: ({ signal }) => titlesApi.details(slug, signal) });
  return { link: stream.data, title: details.data, error: stream.error };
}
