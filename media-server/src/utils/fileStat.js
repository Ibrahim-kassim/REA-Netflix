// Promise-based stat that maps "missing file" to a 404.
import { stat } from 'node:fs/promises';
import { HttpError } from '../middlewares/errorHandler.js';

export const statOr404 = async (file) => {
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new HttpError(404, 'Not found');
    return info;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(404, 'Not found');
  }
};
