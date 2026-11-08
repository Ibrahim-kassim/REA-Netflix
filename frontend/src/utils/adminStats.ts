// Turns the API's daily series into what the dashboard shows: chart points, weekly totals and changes.
import type { DayCount } from '@/models/admin';
import { shortDay } from './format';

export const toPoints = (days: DayCount[]) => days.map((d) => ({ label: shortDay(d.day), value: d.count }));

const total = (days: DayCount[]) => days.reduce((sum, d) => sum + d.count, 0);

export const lastWeek = (days: DayCount[]) => total(days.slice(-7));

// % change of the last 7 days against the 7 before (null when there is nothing to compare with).
export const weekChange = (days: DayCount[]): number | null => {
  const before = total(days.slice(-14, -7));
  return before ? Math.round(((lastWeek(days) - before) / before) * 100) : null;
};
