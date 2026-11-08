// The details modal lives in the URL (?title=slug), so it can be shared and closed with Back.
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export function useTitleModal() {
  const [params, setParams] = useSearchParams();
  const open = useCallback(
    (slug: string) => setParams((p) => { p.set('title', slug); return p; }, { preventScrollReset: true }),
    [setParams],
  );
  const close = useCallback(
    () => setParams((p) => { p.delete('title'); return p; }, { preventScrollReset: true }),
    [setParams],
  );
  return { slug: params.get('title'), open, close };
}
