import { paths } from '@/app/routes';
import { api } from '@/lib/http-client';
import type { Profile } from '@shared/schemas/user';

export const signin = async (code: string): Promise<Profile | null> =>
  await api.post(paths.signin, { code });

export const signout = async (): Promise<undefined|null> => await api.post(paths.signout);

export const fetchMe = async (): Promise<Profile | null> => await api.get(paths.me);
