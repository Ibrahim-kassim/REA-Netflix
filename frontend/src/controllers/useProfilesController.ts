// Who's watching: choose, add, edit and delete profiles.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { ProfileInput } from '@/models/profile';
import { profilesApi } from '@/services/profiles.api';
import { profileStore } from '@/services/profileStore';
import { queryKeys } from '@/services/queryKeys';
import { paths } from '@/routes/paths';

export function useProfilesController() {
  const client = useQueryClient();
  const navigate = useNavigate();
  const refresh = () => client.invalidateQueries({ queryKey: queryKeys.profiles });

  const choose = (id: string) => {
    profileStore.set(id);
    navigate(paths.browse);
  };

  const create = useMutation({ mutationFn: (data: ProfileInput) => profilesApi.create(data), onSuccess: refresh });
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProfileInput> }) => profilesApi.update(id, data),
    onSuccess: refresh,
  });
  const remove = useMutation({
    mutationFn: (id: string) => profilesApi.remove(id),
    onSuccess: (_result, id) => {
      if (profileStore.get() === id) profileStore.set(null);
      refresh();
    },
  });

  return { choose, create, update, remove };
}
