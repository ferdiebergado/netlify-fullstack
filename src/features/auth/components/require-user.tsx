import { paths } from '@/app/routes';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useMe } from '../hooks';

export default function RequireUser() {
  const { data: user } = useMe();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(paths.signin, { replace: true, state: { from: pathname } });
  }, [navigate, pathname, user]);

  // eslint-disable-next-line unicorn/no-null
  if (!user) return null;

  return <Outlet />;
}
