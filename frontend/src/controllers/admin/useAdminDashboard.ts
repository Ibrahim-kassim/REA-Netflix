// Dashboard data: live stats (refreshed every minute) and the poster of each top title.
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { ImageSet } from '@/models/title';
import { adminApi } from '@/services/admin.api';
import { queryKeys } from '@/services/queryKeys';
import { useAdminTitles } from './useAdminTitlesController';

export function useAdminDashboard() {
  const stats = useQuery({ queryKey: queryKeys.admin.stats, queryFn: ({ signal }) => adminApi.stats(signal), refetchInterval: 60_000 });
  const { data: titles } = useAdminTitles();
  const posters = useMemo<Record<string, ImageSet>>(() => Object.fromEntries((titles ?? []).map((t) => [t.slug, t.poster])), [titles]);
  return { stats: stats.data, error: stats.error, posters, updatedAt: stats.dataUpdatedAt };
}
