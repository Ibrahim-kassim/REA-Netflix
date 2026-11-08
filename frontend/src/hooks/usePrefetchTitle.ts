// Warms the cache when the pointer rests on a card, so the details modal opens instantly.
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';

export function usePrefetchTitle() {
  const client = useQueryClient();
  return useCallback(
    (slug: string) =>
      client.prefetchQuery({ queryKey: queryKeys.title(slug), queryFn: ({ signal }) => titlesApi.details(slug, signal) }),
    [client],
  );
}
