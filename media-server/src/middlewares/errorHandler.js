// JSON errors without stack traces; known errors carry a status.
import { logger } from '../utils/logger.js';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const notFound = (_req, _res, next) => next(new HttpError(404, 'Not found'));

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  const status = err.status ?? 500;
  if (status >= 500) logger.error(err.message);
  res.status(status).json({ error: status >= 500 ? 'Internal server error' : err.message });
};
