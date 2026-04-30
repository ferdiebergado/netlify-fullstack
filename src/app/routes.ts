import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import GuestLayout from '@/components/guest-layout';
import RequireGuest from '@/features/auth/components/require-guest';
import SigninPage from '@/features/auth/components/signin-page';

const OauthCallback = lazy(() => import('@/features/auth/components/oauth-callback'));
const Layout = lazy(() => import('@/components/layout'));
const RequireUser = lazy(() => import('@/features/auth/components/require-user'));
const Dashboard = lazy(() => import('./dashboard'));
const PageNotFound = lazy(() => import('./not-found'));

export const paths = {
  home: '/',
  signin: '/signin',
  signout: '/signout',
  oauthCallback: '/oauthcallback',
  me: '/me',
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
            path: paths.oauthCallback,
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
