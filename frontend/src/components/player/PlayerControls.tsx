// Bottom control bar: timeline, play/pause, ±10 s, volume, title, full screen.
import type { RefObject } from 'react';
import { PlayIcon, SoundIcon } from '@/components/ui/Icons';
import type { VideoState } from '@/hooks/player/useVideoState';
import { clock } from '@/utils/format';
import { ProgressBar } from './ProgressBar';
import { Back10Icon, Forward10Icon, FullscreenIcon, PauseIcon } from './PlayerIcons';

type Props = { video: RefObject<HTMLVideoElement | null>; shell: RefObject<HTMLElement | null>; state: VideoState; title: string };

export function PlayerControls({ video, shell, state, title }: Props) {
  const v = () => video.current;
  const skip = (s: number) => { const el = v(); if (el) el.currentTime = Math.min(el.duration, Math.max(0, el.currentTime + s)); };
  const toggle = () => { const el = v(); if (el) void (el.paused ? el.play() : el.pause()); };
  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : shell.current?.requestFullscreen());
  const button = 'text-3xl transition hover:scale-125 md:text-4xl';

  return (
    <div className="flex flex-col gap-3 bg-gradient-to-t from-black/90 to-transparent px-6 pb-6 pt-16">
      <div className="flex items-center gap-4">
        <ProgressBar current={state.current} duration={state.duration} onSeek={(s) => { const el = v(); if (el) el.currentTime = s; }} />
        <span className="w-16 text-right text-sm tabular-nums">{clock(state.duration - state.current)}</span>
      </div>
      <div className="flex items-center gap-6">
        <button type="button" aria-label={state.playing ? 'Pause' : 'Play'} onClick={toggle} className={button}>{state.playing ? <PauseIcon /> : <PlayIcon />}</button>
        <button type="button" aria-label="Back 10 seconds" onClick={() => skip(-10)} className={button}><Back10Icon /></button>
        <button type="button" aria-label="Forward 10 seconds" onClick={() => skip(10)} className={button}><Forward10Icon /></button>
        <div className="group flex items-center gap-2">
          <button type="button" aria-label={state.muted ? 'Unmute' : 'Mute'} onClick={() => { const el = v(); if (el) el.muted = !el.muted; }} className={button}>
            <SoundIcon muted={state.muted || state.volume === 0} />
          </button>
          <input type="range" min={0} max={1} step={0.05} value={state.muted ? 0 : state.volume} aria-label="Volume"
            onChange={(e) => { const el = v(); if (el) { el.volume = Number(e.target.value); el.muted = false; } }}
            className="w-0 accent-brand opacity-0 transition-all group-hover:w-24 group-hover:opacity-100" />
        </div>
        <p className="flex-1 truncate text-center text-lg font-bold md:text-xl">{title}</p>
        <button type="button" aria-label="Full screen" onClick={fullscreen} className={button}><FullscreenIcon /></button>
      </div>
    </div>
  );
}
