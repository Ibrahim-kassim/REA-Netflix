import type { ContinueItem, Ratings, TitleCard } from '@/models/title';
import { http } from './http';

export const activityApi = {
  continueWatching: (signal?: AbortSignal) => http<ContinueItem[]>('/continue', { signal }),
  saveProgress: (slug: string, position: number, duration: number) =>
    http<{ saved: boolean }>(`/progress/${slug}`, { method: 'PUT', body: { position, duration }, keepalive: true }),
  ratings: (signal?: AbortSignal) => http<Ratings>('/ratings', { signal }),
  rate: (slug: string, value: 1 | 0 | -1) => http<{ value: number }>(`/ratings/${slug}`, { method: 'PUT', body: { value } }),
  search: (q: string, signal?: AbortSignal) => http<TitleCard[]>(`/search?q=${encodeURIComponent(q)}`, { signal }),
};
