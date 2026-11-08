import type { BrowseRow, StreamLink, TitleCard, TitleDetails } from '@/models/title';
import { http } from './http';

type S = AbortSignal | undefined;

export const titlesApi = {
  top10: (kids: boolean, signal?: S) => http<TitleCard[]>(`/titles/top10${kids ? '?kids=1' : ''}`, { signal }),
  featured: (signal?: S) => http<TitleDetails>('/titles/featured', { signal }),
  newest: (signal?: S) => http<TitleCard[]>('/titles/new', { signal }),
  rows: (signal?: S) => http<BrowseRow[]>('/browse', { signal }),
  details: (slug: string, signal?: S) => http<TitleDetails>(`/titles/${slug}`, { signal }),
  similar: (slug: string, signal?: S) => http<TitleCard[]>(`/titles/${slug}/similar`, { signal }),
  preview: (slug: string, signal?: S) => http<StreamLink>(`/titles/${slug}/preview`, { signal }),
  stream: (slug: string, signal?: S) => http<StreamLink>(`/titles/${slug}/stream`, { signal }),
};
