// Player chrome shows on mouse movement and hides after a few quiet seconds while playing.
import { useCallback, useEffect, useRef, useState } from 'react';

export function useAutoHide(playing: boolean, delayMs = 3000) {
  const [visible, setVisible] = useState(true);
  const timer = useRef<number | undefined>(undefined);

  const poke = useCallback(() => {
    setVisible(true);
    window.clearTimeout(timer.current);
    if (playing) timer.current = window.setTimeout(() => setVisible(false), delayMs);
  }, [playing, delayMs]);

  useEffect(() => {
    poke();
    return () => window.clearTimeout(timer.current);
  }, [poke]);

  return { visible: visible || !playing, poke };
}
