import type { RouteObject } from 'react-router';

import Layout from '@/components/layout';
import OauthCallback from '@/features/auth/components/oauth-callback';
import RequireGuest from '@/features/auth/components/require-guest';
import RequireUser from '@/features/auth/components/require-user';
import SigninPage from '@/features/auth/components/signin-page';
import Dashboard from './dashboard';
import Home from './home';
import PageNotFound from './not-found';

export const paths = {
  home: '/',
  signin: '/signin',
  signout: '/signout',
  dashboard: '/dashboard',
};

export const routes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      {
        path: paths.home,
        Component: Home,
      },
      {
        Component: RequireGuest,
        children: [
          {
            path: paths.signin,
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
            path: paths.dashboard,
            Component: Dashboard,
          },
        ],
      },
    ],
  },
  {
    path: '/*',
    Component: PageNotFound,
  },
];
