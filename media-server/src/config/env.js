// Reads and validates the environment once; the rest of the app imports this frozen object.
import path from 'node:path';

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const list = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

export const config = Object.freeze({
  port: Number(process.env.PORT ?? 4000),
  corsOrigins: list(required('CORS_ORIGINS')),
  storageDir: path.resolve(process.env.STORAGE_DIR ?? './storage'),
  signingSecret: required('MEDIA_SIGNING_SECRET'),
  requireSignedVideos: process.env.REQUIRE_SIGNED_VIDEOS !== 'false',
  rateLimitPerMinute: Number(process.env.RATE_LIMIT_PER_MINUTE ?? 600),
});
