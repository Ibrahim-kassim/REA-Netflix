// Cache helpers: weak ETags from size + mtime, and 304 handling.
export const etagFor = (stat) => `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;

export const isNotModified = (req, etag) => req.headers['if-none-match'] === etag;

export const CACHE = Object.freeze({
  immutable: 'public, max-age=31536000, immutable',
  video: 'private, max-age=3600',
});
