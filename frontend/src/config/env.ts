// Validated public settings from .env (fails fast in development if one is missing).
type Key = 'VITE_API_URL' | 'VITE_MEDIA_URL';

const read = (key: Key): string => {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing ${key} in frontend/.env`);
  return value.replace(/\/$/, '');
};

export const env = Object.freeze({ apiUrl: read('VITE_API_URL'), mediaUrl: read('VITE_MEDIA_URL') });
