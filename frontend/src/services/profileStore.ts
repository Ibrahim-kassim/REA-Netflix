// The active profile id: kept in memory, remembered in localStorage (a per-device convenience only).
const KEY = 'reaflix.profile';
const listeners = new Set<() => void>();

const read = (): string | null => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

let current = read();

export const profileStore = {
  get: () => current,
  set(id: string | null) {
    current = id;
    try {
      if (id) localStorage.setItem(KEY, id);
      else localStorage.removeItem(KEY);
    } catch {
      /* storage blocked: memory still works for this tab */
    }
    listeners.forEach((notify) => notify());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
