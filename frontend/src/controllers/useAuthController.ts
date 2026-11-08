// Sign in / sign up / sign out: updates the cached session and moves the user to the right page.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import type { User } from '@/models/user';
import { authApi } from '@/services/auth.api';
import { profileStore } from '@/services/profileStore';
import { queryKeys } from '@/services/queryKeys';
import { paths } from '@/routes/paths';

export function useAuthController() {
  const client = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? paths.profiles; // Netflix asks "Who's watching?" after sign-in

  const onSignedIn = (user: User) => {
    client.setQueryData(queryKeys.me, user);
    navigate(from, { replace: true });
  };

  const login = useMutation({ mutationFn: authApi.login, onSuccess: onSignedIn });
  const signup = useMutation({ mutationFn: authApi.signup, onSuccess: onSignedIn });
  const logout = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      client.clear(); // nothing from the previous session stays in memory
      profileStore.set(null);
      navigate(paths.home, { replace: true });
    },
  });

  return { login, signup, logout };
}
