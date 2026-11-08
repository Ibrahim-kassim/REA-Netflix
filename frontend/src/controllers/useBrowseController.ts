// Data for the signed-in home page: billboard, Continue Watching, Top 10 and genre rows.
import { useQuery } from '@tanstack/react-query';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { activityApi } from '@/services/activity.api';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';

export function useBrowseController() {
  const { id, profile } = useActiveProfile();
  const kids = Boolean(profile?.kids);
  const featured = useQuery({ queryKey: queryKeys.featured(id), queryFn: ({ signal }) => titlesApi.featured(signal) });
  const rows = useQuery({ queryKey: queryKeys.rows(id), queryFn: ({ signal }) => titlesApi.rows(signal) });
  const top10 = useQuery({ queryKey: queryKeys.top10(kids), queryFn: ({ signal }) => titlesApi.top10(kids, signal) });
  const resume = useQuery({
    queryKey: queryKeys.continue(id),
    queryFn: ({ signal }) => activityApi.continueWatching(signal),
    staleTime: 0, // progress changes after every watch
  });
  return {
    featured: featured.data,
    rows: rows.data ?? [],
    top10: top10.data ?? [],
    continueWatching: resume.data ?? [],
    profileName: profile?.name ?? '',
    isLoading: featured.isPending || rows.isPending,
  };
}
