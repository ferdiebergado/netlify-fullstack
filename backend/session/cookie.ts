import { SESSION } from '@shared/constants';

type Cookie = {
  name: string;
  value: string;
  url?: string;
  domain?: string;
  path?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  partitioned?: boolean;
};

const BASE_COOKIE: Readonly<Omit<Cookie, 'name' | 'value'>> = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
};

export function bakeSessionCookie(sessionId: string, expiresAt: Date): Cookie {
  const deltaMs = expiresAt.getTime() - Date.now();
  const maxAge = Math.max(0, Math.floor(deltaMs / 1000));

  return {
    ...BASE_COOKIE,
    name: SESSION.COOKIE_NAME,
    value: sessionId,
    maxAge,
  };
}

export const emptySessionCookie = (): Cookie => ({
  ...BASE_COOKIE,
  name: SESSION.COOKIE_NAME,
  value: '',
  maxAge: 0,
});
