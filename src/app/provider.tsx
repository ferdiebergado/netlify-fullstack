import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/features/theme/theme-provider';
import { queryClient } from '@/lib/query-client';

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
