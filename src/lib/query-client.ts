import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) console.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      console.error(error.message || 'Operation failed');
    },
  }),
});
