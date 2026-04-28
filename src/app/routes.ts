import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import GuestLayout from '@/components/guest-layout';
import OauthCallback from '@/features/auth/components/oauth-callback';
import RequireGuest from '@/features/auth/components/require-guest';
import RequireUser from '@/features/auth/components/require-user';
import Dashboard from './dashboard';
import PageNotFound from './not-found';

const Layout = lazy(() => import('@/components/layout'));
const SigninPage = lazy(() => import('@/features/auth/components/signin-page'));

export const paths = {
  home: '/',
  signin: '/signin',
  signout: '/signout',
};

export const routes: RouteObject[] = [
  {
    Component: GuestLayout,
    children: [
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
    ],
  },
  {
    Component: Layout,
    children: [
      {
        Component: RequireUser,
        children: [
          {
            path: paths.home,
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
