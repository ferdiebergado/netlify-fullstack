import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import SplashScreen from '@/components/splash-screen';
import { Button } from '@/components/ui/button';
import Page from './page';
import Provider from './provider';

export default function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="text-destructive">
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Provider>
        <Suspense fallback={<SplashScreen />}>
          <Page />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  );
}
