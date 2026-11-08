// The catalogue for admins: every title with its plays, and edits that refresh what viewers see.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AdminTitlePatch } from '@/models/admin';
import { adminApi } from '@/services/admin.api';
import { queryKeys } from '@/services/queryKeys';

export type TitleEdit = { slug: string; patch: AdminTitlePatch };

export function useAdminTitles() {
  return useQuery({ queryKey: queryKeys.admin.titles, queryFn: ({ signal }) => adminApi.titles(signal), staleTime: 30_000 });
}

export function useAdminTitlesController() {
  const client = useQueryClient();
  const titles = useAdminTitles();
  const update = useMutation({
    mutationFn: ({ slug, patch }: TitleEdit) => adminApi.updateTitle(slug, patch),
    onSuccess: () => {
      // A billboard or Top 10 change moves other titles too, and every viewer's home page.
      void client.invalidateQueries({ queryKey: queryKeys.admin.titles });
      void client.invalidateQueries({ queryKey: ['titles'] });
      void client.invalidateQueries({ queryKey: ['p'] });
    },
  });
  return { titles: titles.data ?? [], isPending: titles.isPending, error: titles.error, update };
}
