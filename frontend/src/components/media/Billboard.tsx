// The billboard: still frame first, then a muted trailer; mute toggle and maturity tab on the right edge.
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { TitleDetails } from '@/models/title';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { PlayIcon, SoundIcon } from '@/components/ui/Icons';
import { useTitleModal } from '@/controllers/useTitleModal';
import { paths } from '@/routes/paths';
import { LazyImage } from './LazyImage';
import { MutedPreview } from './MutedPreview';

export function Billboard({ title }: { title: TitleDetails }) {
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const modal = useTitleModal();

  return (
    <section className="relative h-[56.25vw] max-h-[88vh] min-h-[480px] w-full overflow-hidden">
      <LazyImage images={title.backdrop} alt="" sizes="100vw" eager className="absolute inset-0" />
      <MutedPreview slug={title.slug} muted={muted} delayMs={2500} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative flex h-full max-w-xl flex-col justify-center gap-5 px-4 pt-16 md:px-12">
        <h1 className="text-5xl font-black uppercase leading-none tracking-tight drop-shadow-lg md:text-7xl">{title.title}</h1>
        {title.top10_rank && (
          <p className="flex items-center gap-2 text-lg font-bold md:text-2xl">
            <span className="grid size-9 place-items-center rounded-sm brand-gradient text-[10px] font-black leading-none">TOP<br />10</span>
            #{title.top10_rank} in Films Today
          </p>
        )}
        <p className="text-base text-white/95 drop-shadow md:text-xl">{title.description}</p>
        <div className="flex gap-3">
          <Button variant="light" size="lg" onClick={() => navigate(paths.watch(title.slug))}><PlayIcon /> Play</Button>
          <Button variant="glass" size="lg" onClick={() => modal.open(title.slug)}>ⓘ More Info</Button>
        </div>
      </div>
      <div className="absolute bottom-[30%] right-0 flex items-center gap-4">
        <IconButton label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted(!muted)}><SoundIcon muted={muted} /></IconButton>
        <span className="border-l-4 border-white/80 bg-ink/50 py-1.5 pl-3 pr-12 text-lg">{title.maturity}</span>
      </div>
    </section>
  );
}
