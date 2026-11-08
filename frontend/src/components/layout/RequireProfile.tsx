// Pages that need a profile send you to "Who's watching?" first (Netflix behaviour).
import { Navigate, Outlet } from 'react-router';
import { Spinner } from '@/components/ui/Spinner';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { paths } from '@/routes/paths';

export function RequireProfile() {
  const { profile, isPending } = useActiveProfile();
  if (isPending) return <Spinner label="Loading profile" />;
  return profile ? <Outlet /> : <Navigate to={paths.profiles} replace />;
}
