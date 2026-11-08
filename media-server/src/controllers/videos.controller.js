// GET /videos/:slug — full file or a byte range (206) for seeking.
import { assertSafeName, storagePath } from '../utils/safePath.js';
import { statOr404 } from '../utils/fileStat.js';
import { CACHE, etagFor, isNotModified } from '../utils/httpCache.js';
import { parseRange, streamFile } from '../services/stream.service.js';

export const streamVideo = async (req, res) => {
  const file = storagePath('videos', `${assertSafeName(req.params.slug)}.mp4`);
  const info = await statOr404(file);
  const etag = etagFor(info);
  res.set({ 'Accept-Ranges': 'bytes', 'Content-Type': 'video/mp4', 'Cache-Control': CACHE.video, ETag: etag });
  if (isNotModified(req, etag)) return res.status(304).end();

  const range = parseRange(req.headers.range, info.size);
  if (!range) {
    res.set('Content-Length', info.size);
    return streamFile(res, file, { start: 0, end: info.size - 1 });
  }
  res.status(206).set({
    'Content-Range': `bytes ${range.start}-${range.end}/${info.size}`,
    'Content-Length': range.end - range.start + 1,
  });
  return streamFile(res, file, range);
};
