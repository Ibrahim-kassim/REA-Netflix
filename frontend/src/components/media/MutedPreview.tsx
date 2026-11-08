// A muted, looping trailer that fades in over a still image (billboard and details modal).
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';
import { cn } from '@/utils/cn';

type Props = { slug: string; muted: boolean; delayMs?: number; className?: string; onEnded?: () => void };

export function MutedPreview({ slug, muted, delayMs = 1500, className, onEnded }: Props) {
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const link = useQuery({ queryKey: queryKeys.preview(slug), queryFn: ({ signal }) => titlesApi.preview(slug, signal), staleTime: 30 * 60_000 });

  useEffect(() => {
    const timer = window.setTimeout(() => setStart(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, slug]);

  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

  if (!start || !link.data) return null;
  return (
    <video
      ref={video}
      src={link.data.url}
      autoPlay
      muted={muted}
      playsInline
      preload="auto"
      onPlaying={() => setReady(true)}
      onEnded={onEnded}
      className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-1000', ready ? 'opacity-100' : 'opacity-0', className)}
    />
  );
}
