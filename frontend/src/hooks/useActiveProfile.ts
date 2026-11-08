// The profile being watched: id from the store, details from the cached profile list.
import { useQuery } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';
import { profilesApi } from '@/services/profiles.api';
import { profileStore } from '@/services/profileStore';
import { queryKeys } from '@/services/queryKeys';

export function useProfiles(enabled = true) {
  return useQuery({ queryKey: queryKeys.profiles, queryFn: ({ signal }) => profilesApi.list(signal), enabled });
}

export function useActiveProfileId() {
  return useSyncExternalStore(profileStore.subscribe, profileStore.get, profileStore.get);
}

export function useActiveProfile() {
  const id = useActiveProfileId();
  const { data: profiles, isPending } = useProfiles();
  const profile = profiles?.find((p) => p.id === id) ?? null;
  return { id, profile, profiles: profiles ?? [], isPending };
}
