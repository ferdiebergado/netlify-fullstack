import { Outlet, useLocation, useNavigate } from 'react-router';

import { paths } from '@/app/routes';
import { useEffect } from 'react';
import { useMe } from '../hooks';

export default function RequireGuest() {
  const { data: user } = useMe();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(state?.from ?? paths.home, { replace: true });
  }, [navigate, state?.from, user]);

  // eslint-disable-next-line unicorn/no-null
  if (user) return null;

  return <Outlet />;
}
