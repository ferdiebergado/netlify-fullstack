import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: error => toast.error(error.message || 'Operation failed'),
  }),
});
