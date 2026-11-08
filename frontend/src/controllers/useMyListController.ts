// My List (per profile) with optimistic updates: the button reacts instantly, the server confirms after.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Profile } from '@/models/profile';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { listApi } from '@/services/list.api';
import { queryKeys } from '@/services/queryKeys';

type Toggle = { slug: string; add: boolean };

export function useMyListController() {
  const client = useQueryClient();
  const { id, profile } = useActiveProfile();
  const list = useQuery({ queryKey: queryKeys.myList(id), queryFn: ({ signal }) => listApi.get(signal) });

  const toggle = useMutation<void, Error, Toggle, { previous?: Profile[] }>({
    mutationFn: async ({ slug, add }) => {
      if (add) await listApi.add(slug);
      else await listApi.remove(slug);
    },
    onMutate: ({ slug, add }) => {
      const previous = client.getQueryData<Profile[]>(queryKeys.profiles);
      client.setQueryData<Profile[]>(queryKeys.profiles, (all) =>
        all?.map((p) => (p.id !== id ? p : { ...p, myList: add ? [...p.myList, slug] : p.myList.filter((s) => s !== slug) })),
      );
      return { previous };
    },
    onError: (_e, _v, context) => context?.previous && client.setQueryData(queryKeys.profiles, context.previous),
    onSettled: () => client.invalidateQueries({ queryKey: queryKeys.myList(id) }),
  });

  const isSaved = (slug: string) => Boolean(profile?.myList.includes(slug));
  return { titles: list.data ?? [], isLoading: list.isPending, isSaved, toggle };
}
