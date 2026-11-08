import type { AdminStats, AdminTitle, AdminTitlePatch, AdminUser, Page } from '@/models/admin';
import { http } from './http';

export const ADMIN_PAGE_SIZE = 12;
type UserChange = Partial<Pick<AdminUser, 'role' | 'disabled'>>;

export const adminApi = {
  stats: (signal?: AbortSignal) => http<AdminStats>('/admin/stats', { signal }),
  titles: (signal?: AbortSignal) => http<AdminTitle[]>('/admin/titles', { signal }),
  updateTitle: (slug: string, body: AdminTitlePatch) => http<AdminTitle>(`/admin/titles/${slug}`, { method: 'PATCH', body }),
  deleteTitle: (slug: string) => http<{ deleted: string }>(`/admin/titles/${slug}`, { method: 'DELETE' }),
  users: (page: number, signal?: AbortSignal) => http<Page<AdminUser>>(`/admin/users?page=${page}&limit=${ADMIN_PAGE_SIZE}`, { signal }),
  updateUser: (id: string, body: UserChange) =>
    http<Pick<AdminUser, 'id' | 'email' | 'role' | 'disabled'>>(`/admin/users/${id}`, { method: 'PATCH', body }),
};
