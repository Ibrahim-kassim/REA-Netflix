// Videos are only served with a short-lived signature issued by the API.
import { config } from '../config/env.js';
import { isValidSignature } from '../services/signature.service.js';
import { HttpError } from './errorHandler.js';

export const verifySignature = (req, _res, next) => {
  if (!config.requireSignedVideos) return next();
  const { exp, sig } = req.query;
  const ok = isValidSignature({ path: `/videos/${req.params.slug}`, exp, sig });
  return ok ? next() : next(new HttpError(403, 'Invalid or expired link'));
};
