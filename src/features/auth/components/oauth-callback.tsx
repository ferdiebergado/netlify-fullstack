import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/app/routes';
import Spinner from '@/components/spinner';
import { useSignin, validateState } from '..';

export default function OauthCallback() {
  const [searchParams] = useSearchParams();
  const { isPending, isError, error, mutate: signin } = useSignin();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const stateFromUrl = searchParams.get('state');

    const isValidState = validateState(stateFromUrl);
    if (!isValidState || !code) return;

    signin(code, { onSuccess: () => navigate(state?.from ?? paths.dashboard, { replace: true }) });
  }, [navigate, searchParams, signin, state?.from]);

  if (isPending) return <Spinner text="Signing in..." />;

  if (isError)
    return (
      <p className="text-destructive">{error instanceof Error ? error.message : String(error)}</p>
    );

  // eslint-disable-next-line unicorn/no-null
  return null;
}
