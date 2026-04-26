import { ErrorBoundary } from 'react-error-boundary';
import Page from './page';
import Provider from './provider';

function Fallback() {
  return <div className="text-destructive text-center">Something went wrong</div>;
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider>
        <Page />
      </Provider>
    </ErrorBoundary>
  );
}
