// Members for admins: one page at a time (the next one prefetched); role and access changes show instantly.
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { AdminUser, Page } from '@/models/admin';
import { ADMIN_PAGE_SIZE, adminApi } from '@/services/admin.api';
import { queryKeys } from '@/services/queryKeys';

type Change = { id: string; patch: Partial<Pick<AdminUser, 'role' | 'disabled'>> };
type Context = { previous?: Page<AdminUser> };

export function useAdminUsersController(page: number) {
  const client = useQueryClient();
  const key = queryKeys.admin.users(page);
  const users = useQuery({ queryKey: key, queryFn: ({ signal }) => adminApi.users(page, signal), placeholderData: keepPreviousData });
  const pages = Math.max(1, Math.ceil((users.data?.total ?? 0) / ADMIN_PAGE_SIZE));

  useEffect(() => {
    if (page >= pages) return;
    void client.prefetchQuery({ queryKey: queryKeys.admin.users(page + 1), queryFn: ({ signal }) => adminApi.users(page + 1, signal) });
  }, [client, page, pages]);

  const update = useMutation<unknown, Error, Change, Context>({
    mutationFn: ({ id, patch }) => adminApi.updateUser(id, patch),
    onMutate: async ({ id, patch }) => {
      await client.cancelQueries({ queryKey: key });
      const previous = client.getQueryData<Page<AdminUser>>(key);
      client.setQueryData<Page<AdminUser>>(key, (old) => old && { ...old, items: old.items.map((u) => (u.id === id ? { ...u, ...patch } : u)) });
      return { previous };
    },
    onError: (_error, _change, context) => {
      if (context?.previous) client.setQueryData(key, context.previous);
    },
    onSettled: () => client.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });

  return { data: users.data, isPending: users.isPending, isPlaceholderData: users.isPlaceholderData, error: users.error, pages, update };
}
