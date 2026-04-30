import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { fetchMe, signin, signout } from "./api";

const QUERY_KEYS = {
  USER: ['user'] as const,
};

export function useSignin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => signin(code),
    onSuccess: user => queryClient.setQueryData(QUERY_KEYS.USER, user),
  });
}

export const useMe = () =>
  useSuspenseQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: fetchMe,
    retry: false,
  });

export function useSignout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey: QUERY_KEYS.USER });
      // eslint-disable-next-line unicorn/no-null
      queryClient.setQueryData(QUERY_KEYS.USER, null);
      queryClient.removeQueries();
    },
  });
}
