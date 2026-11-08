// The details window (Netflix's "jawbone"): trailer, actions, facts, More Like This and About.
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LazyImage } from '@/components/media/LazyImage';
import { MutedPreview } from '@/components/media/MutedPreview';
import { IconButton } from '@/components/ui/IconButton';
import { SoundIcon } from '@/components/ui/Icons';
import { useTitleModal } from '@/controllers/useTitleModal';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';
import { paths } from '@/routes/paths';
import { genreList } from '@/utils/format';
import { MoreLikeThis } from './MoreLikeThis';
import { TitleActions } from './TitleActions';
import { TitleFacts } from './TitleFacts';

export function TitleModal() {
  const { slug, close } = useTitleModal();
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);
  const { data: title } = useQuery({ queryKey: queryKeys.title(slug ?? ''), queryFn: ({ signal }) => titlesApi.details(slug ?? '', signal), enabled: Boolean(slug) });

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [slug, close]);

  if (!slug || !title) return null;
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black/70 px-2 py-8" onClick={close} role="dialog" aria-modal aria-label={title.title}>
      <article className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video">
          <LazyImage images={title.backdrop} alt="" sizes="900px" eager />
          <MutedPreview slug={title.slug} muted={muted} delayMs={900} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-ink text-xl">✕</button>
          <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-5">
            <h2 className="text-4xl font-black uppercase md:text-5xl">{title.title}</h2>
            <div className="flex items-center justify-between">
              <TitleActions slug={title.slug} onPlay={() => navigate(paths.watch(title.slug))} />
              <IconButton label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted(!muted)}><SoundIcon muted={muted} /></IconButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-8 pb-10">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-4"><TitleFacts title={title} /><p className="text-lg leading-relaxed">{title.description}</p></div>
            <dl className="text-sm text-muted">
              <dt className="inline">Genres: </dt><dd className="inline text-text">{genreList(title.genres, 5)}</dd><br />
              <dt className="inline">Studio: </dt><dd className="inline text-text">{title.credit}</dd>
            </dl>
          </div>
          <MoreLikeThis slug={title.slug} />
          <footer className="text-sm text-muted">
            <h3 className="mb-2 text-2xl font-bold text-text">About {title.title}</h3>
            {title.credit} · {title.year} · {title.license} · <a className="underline" href={title.source_url} target="_blank" rel="noreferrer noopener">source</a>
          </footer>
        </div>
      </article>
    </div>
  );
}
