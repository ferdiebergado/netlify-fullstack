import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import config from '@/config';
import { api } from '@/lib/http-client';
import type { Profile } from '@shared/schemas/user';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const STATE_KEY = 'oauth_state';
const QUERY_KEYS = {
  USER: ['user'] as const,
};

export function genGoogleAuthUrl(): string {
  const state = crypto.randomUUID();

  sessionStorage.setItem(STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: config.googleClientId,
    redirect_uri: config.googleRedirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
    state,
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export function validateState(returnedState: string | null): boolean {
  const expected = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);

  return !returnedState || returnedState !== expected;
}

const signin = async (code: string): Promise<Profile | null> =>
  await api.post<Profile>('/signin', { code });

export function useSignin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => signin(code),
    onSuccess: user => queryClient.setQueryData(QUERY_KEYS.USER, user),
  });
}

const fetchMe = async (): Promise<Profile | null> => await api.get<Profile>('/me');

export function useMe() {
  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: fetchMe,
    retry: false,
  });
}

const signout = async () => await api.post('/signout', {});

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
