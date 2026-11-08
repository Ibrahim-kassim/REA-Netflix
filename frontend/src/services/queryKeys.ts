// Every cache key in one factory. Profile-scoped data includes the profile id,
// so switching profiles shows that profile's rows, list and progress immediately.
type P = string | null;

export const queryKeys = {
  me: ['auth', 'me'] as const,
  profiles: ['profiles'] as const,
  top10: (kids = false) => ['titles', 'top10', kids] as const,
  title: (slug: string) => ['titles', 'detail', slug] as const,
  featured: (p: P) => ['p', p, 'featured'] as const,
  rows: (p: P) => ['p', p, 'rows'] as const,
  newest: (p: P) => ['p', p, 'new'] as const,
  similar: (p: P, slug: string) => ['p', p, 'similar', slug] as const,
  continue: (p: P) => ['p', p, 'continue'] as const,
  myList: (p: P) => ['p', p, 'my-list'] as const,
  ratings: (p: P) => ['p', p, 'ratings'] as const,
  search: (p: P, q: string) => ['p', p, 'search', q] as const,
  preview: (slug: string) => ['preview', slug] as const,
  stream: (p: P, slug: string) => ['p', p, 'stream', slug] as const,
  admin: {
    stats: ['admin', 'stats'] as const,
    titles: ['admin', 'titles'] as const,
    users: (page: number) => ['admin', 'users', page] as const,
  },
};
