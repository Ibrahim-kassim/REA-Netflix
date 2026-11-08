import type { Credentials, SignupInput, User } from '@/models/user';
import { http } from './http';

export const authApi = {
  me: (signal?: AbortSignal) => http<User>('/auth/me', { signal }),
  login: (body: Credentials) => http<User>('/auth/login', { method: 'POST', body }),
  signup: (body: SignupInput) => http<User>('/auth/signup', { method: 'POST', body }),
  logout: () => http<{ signedOut: boolean }>('/auth/logout', { method: 'POST' }),
};
