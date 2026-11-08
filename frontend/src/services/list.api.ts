import type { TitleCard } from '@/models/title';
import { http } from './http';

export const listApi = {
  get: (signal?: AbortSignal) => http<TitleCard[]>('/list', { signal }),
  add: (slug: string) => http<{ added: string }>(`/list/${slug}`, { method: 'PUT' }),
  remove: (slug: string) => http<{ removed: string }>(`/list/${slug}`, { method: 'DELETE' }),
};
