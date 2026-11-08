import type { TitleDetails } from './title';

export interface DayCount {
  day: string; // YYYY-MM-DD
  count: number;
}

export interface AdminStats {
  users: number;
  profiles: number;
  titles: number;
  plays7d: number;
  playsToday: number;
  watchHours: number;
  signupsByDay: DayCount[];
  playsByDay: DayCount[];
  topTitles: { slug: string; title: string; plays: number }[];
  hasSampleData: boolean;
}

export interface AdminTitle extends TitleDetails {
  featured?: boolean;
  popularity: number;
  plays: number;
}

export type AdminTitlePatch = Partial<Pick<AdminTitle, 'title' | 'year' | 'maturity' | 'runtime_min' | 'genres' | 'description' | 'featured' | 'top10_rank' | 'popularity'>>;

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  disabled: boolean;
  sample?: boolean;
  created_at: string;
  profiles: number;
  plays: number;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
}
