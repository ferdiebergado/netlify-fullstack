import type { RouteObject } from 'react-router';

import Layout from '@/components/layout';
import OauthCallback from '@/features/auth/components/oauth-callback';
import RequireGuest from '@/features/auth/components/require-guest';
import RequireUser from '@/features/auth/components/require-user';
import SigninPage from '@/features/auth/components/signin-page';
import Dashboard from './dashboard';
import Home from './home';

export const routes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        Component: RequireGuest,
        children: [
          {
            path: '/signin',
            Component: SigninPage,
          },
          {
            path: '/oauthcallback',
            Component: OauthCallback,
          },
        ],
      },
      {
        Component: RequireUser,
        children: [
          {
            path: '/dashboard',
            Component: Dashboard,
          },
        ],
      },
    ],
  },
];
