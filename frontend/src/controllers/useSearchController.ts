import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { useActiveProfileId } from '@/hooks/useActiveProfile';
import { activityApi } from '@/services/activity.api';
import { queryKeys } from '@/services/queryKeys';

export function useSearchController() {
  const [params] = useSearchParams();
  const q = (params.get('q') ?? '').trim();
  const id = useActiveProfileId();
  const results = useQuery({
    queryKey: queryKeys.search(id, q),
    queryFn: ({ signal }) => activityApi.search(q, signal),
    enabled: q.length > 0,
  });
  return { q, results: results.data ?? [], isLoading: results.isFetching };
}
