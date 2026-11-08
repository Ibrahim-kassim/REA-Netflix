// The Netflix-style 16:9 card used in every row. Hover opens the preview; click opens the details modal.
import { useRef } from 'react';
import type { TitleCard } from '@/models/title';
import { usePrefetchTitle } from '@/hooks/usePrefetchTitle';
import { useTitleModal } from '@/controllers/useTitleModal';
import { usePreview } from './preview/PreviewContext';
import { LazyImage } from './LazyImage';

type Props = { title: TitleCard; progress?: number };

export function LandscapeCard({ title, progress }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefetch = usePrefetchTitle();
  const preview = usePreview();
  const modal = useTitleModal();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => modal.open(title.slug)}
      onPointerEnter={() => {
        prefetch(title.slug);
        if (ref.current) preview.schedule(title, ref.current.getBoundingClientRect(), progress);
      }}
      onPointerLeave={preview.cancel}
      className="relative block aspect-video w-[46vw] shrink-0 snap-start overflow-hidden rounded bg-surface-2 text-left sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[15.5vw]"
      aria-label={title.title}
    >
      <LazyImage images={title.backdrop} alt="" sizes="(min-width: 1280px) 16vw, (min-width: 768px) 22vw, 46vw" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <span className="absolute bottom-2 left-3 right-3 text-sm font-black uppercase leading-tight tracking-wide drop-shadow md:text-base">
        {title.title}
      </span>
      {progress !== undefined && (
        <span className="absolute inset-x-3 bottom-1 h-1 rounded bg-white/30">
          <span className="block h-full rounded brand-gradient" style={{ width: `${Math.round(progress * 100)}%` }} />
        </span>
      )}
    </button>
  );
}
