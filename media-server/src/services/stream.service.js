// HTTP Range parsing for video streaming (RFC 9110, single range).
import { createReadStream } from 'node:fs';
import { HttpError } from '../middlewares/errorHandler.js';

const CHUNK = 1024 * 1024; // 1 MB per open-ended range keeps memory and latency low

export const parseRange = (header, size) => {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match) throw new HttpError(416, 'Malformed range');
  let start = match[1] === '' ? size - Number(match[2]) : Number(match[1]);
  let end = match[2] === '' || match[1] === '' ? Math.min(start + CHUNK - 1, size - 1) : Number(match[2]);
  end = Math.min(end, size - 1);
  if (start < 0 || start > end || start >= size) throw new HttpError(416, 'Range not satisfiable');
  return { start, end };
};

export const streamFile = (res, file, { start, end }) => {
  const stream = createReadStream(file, { start, end });
  stream.on('error', () => res.destroy());
  stream.pipe(res);
};
