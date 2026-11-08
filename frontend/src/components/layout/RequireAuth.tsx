// Route guard: waits for the session, sends signed-out visitors to Sign In (and back after).
import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { Spinner } from '@/components/ui/Spinner';
import { useSession } from '@/hooks/useSession';
import { paths } from '@/routes/paths';

export function RequireAuth({ children }: { children?: ReactNode }) {
  const { data: user, isPending } = useSession();
  const location = useLocation();
  if (isPending) return <Spinner label="Checking your session" />;
  if (!user) return <Navigate to={paths.login} replace state={{ from: location.pathname }} />;
  return children ?? <Outlet />;
}
