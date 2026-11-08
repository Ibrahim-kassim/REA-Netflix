// Admin pages are for admin accounts only (the API checks the role again on every call).
import { Navigate, Outlet } from 'react-router';
import { Spinner } from '@/components/ui/Spinner';
import { useSession } from '@/hooks/useSession';
import { paths } from '@/routes/paths';

export function RequireAdmin() {
  const { data: user, isPending } = useSession();
  if (isPending) return <Spinner label="Checking access" />;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to={paths.browse} replace />;
}
