import Spinner from '@/components/spinner';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useMe } from '..';

export default function RequireUser() {
  const { isLoading, isError, error, data: user } = useMe();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <p className="text-destructive">{error instanceof Error ? error.message : String(error)}</p>
    );

  if (!user) navigate('/signin', { replace: true, state: { from: pathname } });

  return <Outlet />;
}
