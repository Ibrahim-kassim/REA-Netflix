// Routes with code splitting: each page is its own chunk, loaded on first visit.
// Signed in → "Who's watching?" → the app; admin pages also need the admin role.
import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router';
import { RequireAdmin } from '@/components/layout/RequireAdmin';
import { RequireAuth } from '@/components/layout/RequireAuth';
import { RequireProfile } from '@/components/layout/RequireProfile';
import { Spinner } from '@/components/ui/Spinner';
import { paths } from './paths';
import { TitleRedirect } from './TitleRedirect';

const page = (load: () => Promise<{ default: ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

export const router = createBrowserRouter([
  {
    // Shown while the first page's code loads.
    hydrateFallbackElement: <Spinner label="Loading REAflix" />,
    children: [
      {
        ...page(() => import('@/layouts/PublicLayout')),
        children: [
          { path: paths.home, ...page(() => import('@/pages/LandingPage')) },
          { path: paths.login, ...page(() => import('@/pages/LoginPage')) },
          { path: paths.signup, ...page(() => import('@/pages/SignupPage')) },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          { path: paths.profiles, ...page(() => import('@/pages/ProfilesPage')) },
          { path: paths.title(), element: <TitleRedirect /> },
          {
            element: <RequireProfile />,
            children: [
              {
                ...page(() => import('@/layouts/AppLayout')),
                children: [
                  { path: paths.browse, ...page(() => import('@/pages/BrowsePage')) },
                  { path: paths.newPopular, ...page(() => import('@/pages/NewPopularPage')) },
                  { path: paths.myList, ...page(() => import('@/pages/MyListPage')) },
                  { path: paths.search, ...page(() => import('@/pages/SearchPage')) },
                  { path: paths.account, ...page(() => import('@/pages/AccountPage')) },
                ],
              },
              { path: paths.watch(), ...page(() => import('@/pages/WatchPage')) },
            ],
          },
          {
            element: <RequireAdmin />,
            children: [
              {
                path: paths.admin,
                ...page(() => import('@/layouts/AdminLayout')),
                children: [
                  { index: true, ...page(() => import('@/pages/admin/AdminDashboardPage')) },
                  { path: paths.adminTitles, ...page(() => import('@/pages/admin/AdminTitlesPage')) },
                  { path: paths.adminUsers, ...page(() => import('@/pages/admin/AdminUsersPage')) },
                ],
              },
            ],
          },
        ],
      },
      { path: '*', ...page(() => import('@/pages/NotFoundPage')) },
    ],
  },
]);
