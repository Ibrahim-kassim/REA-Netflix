// Saves where you are every 10 s, on pause and when you leave, so "Continue Watching" is exact.
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, type RefObject } from 'react';
import { activityApi } from '@/services/activity.api';
import { profileStore } from '@/services/profileStore';
import { queryKeys } from '@/services/queryKeys';

export function useProgressSaver(ref: RefObject<HTMLVideoElement | null>, slug: string) {
  const client = useQueryClient();
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const save = () => {
      if (v.duration > 0 && v.currentTime > 1) activityApi.saveProgress(slug, v.currentTime, v.duration).catch(() => {});
    };
    const interval = window.setInterval(() => !v.paused && save(), 10_000);
    v.addEventListener('pause', save);
    window.addEventListener('pagehide', save);
    return () => {
      window.clearInterval(interval);
      v.removeEventListener('pause', save);
      window.removeEventListener('pagehide', save);
      save();
      client.invalidateQueries({ queryKey: queryKeys.continue(profileStore.get()) });
    };
  }, [ref, slug, client]);
}
