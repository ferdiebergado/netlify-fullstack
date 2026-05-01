import ThemeProvider from '@/features/theme/theme-provider';
import { getCSPNonce } from '@/lib/csp';
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const nonce = getCSPNonce();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools styleNonce={nonce} />
    </QueryClientProvider>
  );
}
