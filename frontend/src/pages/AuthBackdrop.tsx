// Shared full-screen backdrop for the auth pages (a real frame from one of the films).
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LazyImage } from '@/components/media/LazyImage';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';

export function AuthBackdrop({ children }: { children: ReactNode }) {
  const { data: top10 = [] } = useQuery({ queryKey: queryKeys.top10(false), queryFn: ({ signal }) => titlesApi.top10(false, signal) });
  const backdrop = top10[2];
  return (
    <section className="relative grid min-h-screen place-items-center px-4 pt-24">
      {backdrop && <LazyImage images={backdrop.backdrop} alt="" sizes="100vw" eager className="absolute inset-0" />}
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative w-full max-w-md">{children}</div>
    </section>
  );
}
