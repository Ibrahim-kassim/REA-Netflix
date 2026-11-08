// Turns user input into a file path that can never leave the storage folder.
import path from 'node:path';
import { config } from '../config/env.js';
import { HttpError } from '../middlewares/errorHandler.js';

const SAFE_NAME = /^[a-z0-9-]{1,80}$/;

export const assertSafeName = (name) => {
  if (!SAFE_NAME.test(name)) throw new HttpError(400, 'Invalid media name');
  return name;
};

export const storagePath = (...parts) => {
  const full = path.resolve(config.storageDir, ...parts);
  if (!full.startsWith(config.storageDir + path.sep)) throw new HttpError(400, 'Invalid path');
  return full;
};
