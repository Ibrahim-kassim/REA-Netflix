// Top 10 card: the big outlined rank number behind the poster (opens the details modal).
import type { TitleCard } from '@/models/title';
import { usePrefetchTitle } from '@/hooks/usePrefetchTitle';
import { useTitleModal } from '@/controllers/useTitleModal';
import { LazyImage } from './LazyImage';

type Props = { title: TitleCard; rank: number; onSelect?: () => void };

export function RankedCard({ title, rank, onSelect }: Props) {
  const prefetch = usePrefetchTitle();
  const modal = useTitleModal();
  return (
    <button type="button" onClick={onSelect ?? (() => modal.open(title.slug))} onPointerEnter={() => prefetch(title.slug)}
      className="group relative flex h-48 w-48 shrink-0 snap-start items-end md:h-60 md:w-60" aria-label={`${rank}. ${title.title}`}>
      <span aria-hidden className="absolute -bottom-3 -left-1 text-[9.5rem] font-black leading-none tracking-tighter text-ink md:text-[12rem]"
        style={{ WebkitTextStroke: '3px var(--color-muted)' }}>{rank}</span>
      <div className="relative z-10 ml-auto aspect-[2/3] h-full overflow-hidden rounded bg-surface-2 shadow-2xl shadow-black/60 transition duration-300 group-hover:scale-105">
        <LazyImage images={title.poster} alt={title.title} sizes="160px" />
      </div>
    </button>
  );
}
