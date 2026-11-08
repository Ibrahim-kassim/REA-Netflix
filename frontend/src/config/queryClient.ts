// Caching policy: data stays fresh for 5 minutes and is reused across pages without refetching.
import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/services/http';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000,
      gcTime: 30 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failures, error) => !(error instanceof ApiError && error.status < 500) && failures < 2,
    },
  },
});
