// HMAC-SHA256 signatures: sig = base64url(HMAC(secret, `${path}:${exp}`)); exp is a unix time in seconds.
import crypto from 'node:crypto';
import { config } from '../config/env.js';

const sign = (path, exp) =>
  crypto.createHmac('sha256', config.signingSecret).update(`${path}:${exp}`).digest('base64url');

export const isValidSignature = ({ path, exp, sig }) => {
  const expires = Number(exp);
  if (!Number.isInteger(expires) || typeof sig !== 'string') return false;
  if (expires < Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(sign(path, expires));
  const given = Buffer.from(sig);
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
};
