// Admin overview: KPI row, plays per day, this week's top titles and new members per day.
import { AdminError, AdminHeader } from '@/components/admin/AdminHeader';
import { AreaChart } from '@/components/admin/charts/AreaChart';
import { ChartCard } from '@/components/admin/charts/ChartCard';
import { ColumnChart } from '@/components/admin/charts/ColumnChart';
import { StatTile } from '@/components/admin/StatTile';
import { TopTitles } from '@/components/admin/TopTitles';
import { Spinner } from '@/components/ui/Spinner';
import { useAdminDashboard } from '@/controllers/admin/useAdminDashboard';
import { lastWeek, toPoints, weekChange } from '@/utils/adminStats';

export default function AdminDashboardPage() {
  const { stats, error, posters, updatedAt } = useAdminDashboard();
  if (error) return <AdminError message={error.message} />;
  if (!stats) return <Spinner label="Loading the dashboard" />;

  const plays = toPoints(stats.playsByDay);
  const signups = toPoints(stats.signupsByDay);
  const time = new Date(updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader title="Dashboard" subtitle={`Live from the REAflix database · updated ${time}, refreshes every minute`} />
      {stats.hasSampleData && (
        <p className="rounded-lg border border-line bg-surface-2/60 px-4 py-3 text-sm text-muted">
          Includes sample viewers (marked “Sample” in Members) so the charts have history. Every real sign-up and play is added on top.
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-6">
        <StatTile label="Members" value={stats.users} note={`+${lastWeek(stats.signupsByDay)} in the last 7 days`} />
        <StatTile label="Profiles" value={stats.profiles} />
        <StatTile label="Titles" value={stats.titles} />
        <StatTile label="Plays, last 7 days" value={lastWeek(stats.playsByDay)} change={weekChange(stats.playsByDay)} />
        <StatTile label="Plays, last 24 hours" value={stats.playsToday} />
        <StatTile label="Hours watched" value={stats.watchHours} note="From saved viewing positions" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ChartCard title="Plays per day" subtitle="Last 14 days" rows={plays} unit="Plays">
          <AreaChart data={plays} unit="plays" height={300} />
        </ChartCard>
        <TopTitles items={stats.topTitles} posters={posters} />
      </div>
      <ChartCard title="New members per day" subtitle="Last 14 days" rows={signups} unit="Sign-ups">
        <ColumnChart data={signups} unit="sign-ups" />
      </ChartCard>
    </div>
  );
}
