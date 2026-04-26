import { OAuth2Client } from 'google-auth-library';

import { GOOGLE_ACCOUNTS_ORIGIN } from '@shared/constants';
import type { CreateUser } from '@shared/schemas/user';
import config from './config';
import { getDb } from './db';
import { BadRequestError, UnauthorizedError } from './http/errors';
import { initializeSession } from './session';
import { upsertUser } from './user/repo';

export const oauthClient = new OAuth2Client({
  clientId: config.googleClientId,
  clientSecret: config.googleClientSecret,
  redirectUri: config.googleRedirectUri,
});

export async function verifyCode(oauthClient: OAuth2Client, code: string): Promise<CreateUser> {
  const {
    tokens: { id_token },
  } = await oauthClient.getToken(code);
  if (!id_token) throw new BadRequestError('Missing id token');

  const ticket = await oauthClient.verifyIdToken({
    idToken: id_token,
    audience: config.googleClientId,
  });

  const tokenPayload = ticket.getPayload();

  if (!tokenPayload) throw new UnauthorizedError('Invalid token payload');

  if (tokenPayload.iss !== GOOGLE_ACCOUNTS_ORIGIN) throw new UnauthorizedError('Invalid issuer');

  return {
    googleId: tokenPayload.sub,
    name: tokenPayload.name,
    email: tokenPayload.email,
    picture: tokenPayload.picture,
  };
}

export async function signin(
  code: string
): Promise<{ user: CreateUser; sessionId: string; expiresAt: Date }> {
  const user = await verifyCode(oauthClient, code);

  const db = await getDb();
  await upsertUser(db, user);
  const { sessionId, expiresAt } = await initializeSession(user);

  return { user, sessionId, expiresAt };
}
