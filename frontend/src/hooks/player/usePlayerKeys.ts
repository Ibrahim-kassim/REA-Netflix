// Keyboard: Space/K play-pause · ←/→ 10 s · ↑/↓ volume · M mute · F full screen.
import { useEffect, type RefObject } from 'react';

export function usePlayerKeys(video: RefObject<HTMLVideoElement | null>, shell: RefObject<HTMLElement | null>, onAny: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const v = video.current;
      if (!v) return;
      const actions: Record<string, () => void> = {
        ' ': () => (v.paused ? v.play() : v.pause()),
        k: () => (v.paused ? v.play() : v.pause()),
        ArrowLeft: () => (v.currentTime = Math.max(0, v.currentTime - 10)),
        ArrowRight: () => (v.currentTime = Math.min(v.duration, v.currentTime + 10)),
        ArrowUp: () => (v.volume = Math.min(1, v.volume + 0.1)),
        ArrowDown: () => (v.volume = Math.max(0, v.volume - 0.1)),
        m: () => (v.muted = !v.muted),
        f: () => (document.fullscreenElement ? document.exitFullscreen() : shell.current?.requestFullscreen()),
      };
      const action = actions[e.key];
      if (action) {
        e.preventDefault();
        action();
        onAny();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [video, shell, onAny]);
}
