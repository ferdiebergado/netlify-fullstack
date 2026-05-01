import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/app/routes';
import SplashScreen from '@/components/splash-screen';
import { toast } from 'sonner';
import { validateState } from '..';
import { useSignin } from '../hooks';

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

    signin(code, {
      onSuccess: () => {
        toast.success('Successfully signed in!');
        navigate(state?.from ?? paths.home, { replace: true });
      },
    });
  }, [navigate, searchParams, signin, state?.from]);

  if (isPending) return <SplashScreen />;

  if (isError)
    return (
      <p className="text-destructive text-xl font-semibold">
        {error instanceof Error ? error.message : String(error)}
      </p>
    );

  // eslint-disable-next-line unicorn/no-null
  return null;
}
