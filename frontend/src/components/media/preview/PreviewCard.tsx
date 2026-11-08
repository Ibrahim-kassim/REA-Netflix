// The expanded hover card: grows out of the row card with a muted trailer, actions and details.
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import type { TitleCard } from '@/models/title';
import { LazyImage } from '../LazyImage';
import { MutedPreview } from '../MutedPreview';
import { TitleActions } from '@/components/title/TitleActions';
import { TitleFacts } from '@/components/title/TitleFacts';
import { useTitleModal } from '@/controllers/useTitleModal';
import { paths } from '@/routes/paths';
import { genreList } from '@/utils/format';

type Props = { title: TitleCard; rect: DOMRect; progress?: number; onClose: () => void };
const SCALE = 1.5;

export function PreviewCard({ title, rect, progress, onClose }: Props) {
  const [shown, setShown] = useState(false);
  const navigate = useNavigate();
  const modal = useTitleModal();
  const width = rect.width * SCALE;
  const left = Math.min(Math.max(12, rect.left + rect.width / 2 - width / 2), window.innerWidth - width - 12);
  const top = Math.max(8, rect.top - (rect.height * SCALE - rect.height) / 2);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    window.addEventListener('scroll', onClose, { passive: true });
    return () => (cancelAnimationFrame(frame), window.removeEventListener('scroll', onClose));
  }, [onClose]);

  return createPortal(
    <div
      onPointerLeave={onClose}
      style={{ left, top, width, transformOrigin: `${rect.left + rect.width / 2 - left}px top` }}
      className={`fixed z-50 overflow-hidden rounded-md bg-surface shadow-2xl shadow-black/80 transition duration-300 ease-[var(--ease-out-quint)] ${shown ? 'scale-100 opacity-100' : 'scale-[0.67] opacity-0'}`}
    >
      <div className="relative aspect-video">
        <LazyImage images={title.backdrop} alt="" sizes={`${Math.round(width)}px`} eager />
        <MutedPreview slug={title.slug} muted delayMs={700} />
        <span className="absolute bottom-2 left-3 text-lg font-black uppercase drop-shadow">{title.title}</span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <TitleActions slug={title.slug} onPlay={() => navigate(paths.watch(title.slug))}
          onMore={() => (onClose(), modal.open(title.slug))} />
        <TitleFacts title={title} />
        {progress !== undefined && (
          <div className="h-1 rounded bg-white/25"><div className="h-full rounded brand-gradient" style={{ width: `${progress * 100}%` }} /></div>
        )}
        <p className="text-sm text-text/90">{genreList(title.genres, 3)}</p>
      </div>
    </div>,
    document.body,
  );
}
