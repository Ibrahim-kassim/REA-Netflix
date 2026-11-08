// The signed-in user (or an error when signed out). Cached and shared by every component.
import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/services/auth.api';
import { queryKeys } from '@/services/queryKeys';

export function useSession() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: ({ signal }) => authApi.me(signal),
    retry: false,
    staleTime: 60_000,
  });
}
