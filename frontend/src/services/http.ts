// One fetch wrapper for the whole app: base URL, cookies, profile header, JSON, timeouts and typed errors.
import { env } from '@/config/env';
import { profileStore } from './profileStore';

export class ApiError extends Error {
  readonly status: number;
  readonly fields?: Record<string, string>;

  constructor(status: number, message: string, fields?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Options = { method?: Method; body?: unknown; signal?: AbortSignal; keepalive?: boolean };

const TIMEOUT_MS = 15_000;

const headersFor = (body: unknown): HeadersInit => {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const profile = profileStore.get();
  if (profile) headers['X-Profile-Id'] = profile;
  return headers;
};

export async function http<T>(path: string, { method = 'GET', body, signal, keepalive }: Options = {}): Promise<T> {
  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const response = await fetch(`${env.apiUrl}${path}`, {
    method,
    credentials: 'include', // the session lives in an httpOnly cookie
    headers: headersFor(body),
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    keepalive, // lets "save my position" finish even while the page closes
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(response.status, json.error ?? 'Something went wrong', json.fields);
  return json.data as T;
}
