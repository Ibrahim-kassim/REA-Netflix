// GET /images/:kind/:size/:name — pre-sized posters/backdrops with year-long caching.
import { HttpError } from '../middlewares/errorHandler.js';
import { assertSafeName, storagePath } from '../utils/safePath.js';
import { statOr404 } from '../utils/fileStat.js';
import { CACHE, etagFor, isNotModified } from '../utils/httpCache.js';

const SIZES = Object.freeze({ posters: ['w342', 'w780'], backdrops: ['w780', 'w1280'] });

export const serveImage = async (req, res) => {
  const { kind, size } = req.params;
  if (!SIZES[kind]?.includes(size)) throw new HttpError(404, 'Unknown image size');
  const name = assertSafeName(req.params.name.replace(/\.jpg$/, ''));
  const file = storagePath('images', kind, size, `${name}.jpg`);
  const info = await statOr404(file);
  const etag = etagFor(info);
  res.set({ 'Cache-Control': CACHE.immutable, ETag: etag });
  if (isNotModified(req, etag)) return res.status(304).end();
  return res.type('image/jpeg').sendFile(file);
};
