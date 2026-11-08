// Express app factory: security first, then routes, then error handling.
import express from 'express';
import { applySecurity } from './middlewares/security.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import { router } from './routes/index.js';

export const createApp = () => {
  const app = express();
  app.disable('x-powered-by');
  app.set('etag', false); // ETags are computed by utils/httpCache.js
  applySecurity(app);
  app.use(router);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};
