import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Fallback from './fallback';
import Page from './page';
import Provider from './provider';

export default function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={Fallback} onReset={reset}>
      <Provider>
        <Page />
      </Provider>
    </ErrorBoundary>
  );
}
