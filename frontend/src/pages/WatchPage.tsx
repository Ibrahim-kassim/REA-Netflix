// The player: resumes where you stopped, saves progress, auto-hiding controls and keyboard shortcuts.
// The <video> is always in the page (its link arrives a moment later) so the player hooks can attach to it.
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PlayerControls } from '@/components/player/PlayerControls';
import { Spinner } from '@/components/ui/Spinner';
import { useWatchController } from '@/controllers/useWatchController';
import { useAutoHide } from '@/hooks/player/useAutoHide';
import { usePlayerKeys } from '@/hooks/player/usePlayerKeys';
import { useProgressSaver } from '@/hooks/player/useProgressSaver';
import { useVideoState } from '@/hooks/player/useVideoState';
import { cn } from '@/utils/cn';

export default function WatchPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { link, title, error } = useWatchController(slug);
  const video = useRef<HTMLVideoElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const state = useVideoState(video);
  const { visible, poke } = useAutoHide(state.playing);
  usePlayerKeys(video, shell, poke);
  useProgressSaver(video, slug);
  const toggle = () => {
    const v = video.current;
    if (v?.src) void (v.paused ? v.play() : v.pause());
  };

  return (
    <div ref={shell} onPointerMove={poke} className={cn('fixed inset-0 z-50 bg-black', !visible && 'cursor-none')}>
      <video ref={video} src={link?.url} autoPlay playsInline preload="auto" controlsList="nodownload" onClick={toggle}
        onLoadedMetadata={(e) => {
          if (link?.resumeAt) e.currentTarget.currentTime = link.resumeAt;
        }}
        className="h-full w-full object-contain" />
      {error && <p className="absolute inset-0 grid place-items-center text-lg">This video can't play right now.</p>}
      {!error && !link && <div className="absolute inset-0 grid place-items-center"><Spinner label="Preparing video" /></div>}
      <div className={cn('pointer-events-none absolute inset-0 flex flex-col justify-between transition-opacity duration-300', visible ? 'opacity-100' : 'opacity-0')}>
        <button type="button" aria-label="Back" onClick={() => navigate(-1)} className="pointer-events-auto m-6 self-start text-4xl hover:scale-110">←</button>
        {!state.playing && state.duration > 0 && title && (
          <div className="max-w-xl px-10 text-left">
            <p className="text-muted">You're watching</p>
            <h1 className="text-5xl font-black">{title.title}</h1>
            <p className="mt-3 text-lg text-white/85">{title.description}</p>
          </div>
        )}
        <div className="pointer-events-auto">
          <PlayerControls video={video} shell={shell} state={state} title={title?.title ?? ''} />
        </div>
      </div>
    </div>
  );
}
