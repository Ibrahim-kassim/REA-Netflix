// Mirrors the <video> element's state into React (play, time, duration, volume).
import { useEffect, useState, type RefObject } from 'react';

export type VideoState = { playing: boolean; current: number; duration: number; muted: boolean; volume: number };

const initial: VideoState = { playing: false, current: 0, duration: 0, muted: false, volume: 1 };

export function useVideoState(ref: RefObject<HTMLVideoElement | null>): VideoState {
  const [state, setState] = useState(initial);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => setState({ playing: !v.paused, current: v.currentTime, duration: v.duration || 0, muted: v.muted, volume: v.volume });
    const events = ['play', 'pause', 'timeupdate', 'durationchange', 'volumechange', 'loadedmetadata'];
    events.forEach((e) => v.addEventListener(e, sync));
    return () => events.forEach((e) => v.removeEventListener(e, sync));
  }, [ref]);
  return state;
}
