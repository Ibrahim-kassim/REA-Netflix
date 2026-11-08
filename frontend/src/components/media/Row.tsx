// A Netflix row: title, page dashes, arrows that page by a screen; items render once the row is near.
import { useRef, useState, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/utils/cn';

type Props = { title: string; count: number; children: ReactNode; placeholderClass?: string };

export function Row({ title, count, children, placeholderClass = 'aspect-video w-[46vw] md:w-[22vw] xl:w-[15.5vw]' }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const perPage = 6;
  const pages = Math.max(1, Math.ceil(count / perPage));

  const go = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' });
    setPage((p) => Math.min(pages - 1, Math.max(0, p + direction)));
  };

  return (
    <section ref={ref} className="group/row relative" aria-label={title}>
      <div className="flex items-end justify-between px-4 md:px-12">
        <h2 className="text-lg font-bold text-text/95 md:text-2xl">{title}</h2>
        {pages > 1 && (
          <div className="flex gap-0.5 opacity-0 transition group-hover/row:opacity-100" aria-hidden>
            {Array.from({ length: pages }, (_, i) => <span key={i} className={cn('h-0.5 w-3', i === page ? 'bg-white' : 'bg-white/30')} />)}
          </div>
        )}
      </div>
      <div ref={scroller} className="scrollbar-none flex snap-x gap-1.5 overflow-x-auto scroll-smooth px-4 py-3 md:px-12">
        {inView ? children : Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className={`shrink-0 ${placeholderClass}`} />)}
      </div>
      {page > 0 && <Arrow side="left" onClick={() => go(-1)} />}
      {pages > 1 && page < pages - 1 && <Arrow side="right" onClick={() => go(1)} />}
    </section>
  );
}

function Arrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={side === 'left' ? 'Previous' : 'Next'}
      className={cn('absolute bottom-3 top-10 z-10 hidden w-12 bg-ink/50 text-5xl text-white opacity-0 transition hover:bg-ink/70 group-hover/row:opacity-100 md:block', side === 'left' ? 'left-0 rounded-r' : 'right-0 rounded-l')}>
      {side === 'left' ? '‹' : '›'}
    </button>
  );
}
