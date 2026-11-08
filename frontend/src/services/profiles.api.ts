import type { Profile, ProfileInput } from '@/models/profile';
import { http } from './http';

export const profilesApi = {
  list: (signal?: AbortSignal) => http<Profile[]>('/profiles', { signal }),
  create: (body: ProfileInput) => http<Profile>('/profiles', { method: 'POST', body }),
  update: (id: string, body: Partial<ProfileInput>) => http<Profile>(`/profiles/${id}`, { method: 'PATCH', body }),
  remove: (id: string) => http<{ deleted: string }>(`/profiles/${id}`, { method: 'DELETE' }),
};
