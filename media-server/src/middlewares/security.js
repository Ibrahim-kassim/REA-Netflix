// Security headers, CORS allow-list and rate limiting for every request.
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

export const applySecurity = (app) => {
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: (origin, done) => done(null, !origin || config.corsOrigins.includes(origin)),
      methods: ['GET', 'HEAD'],
      exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'ETag'],
    }),
  );
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: config.rateLimitPerMinute,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
    }),
  );
};
