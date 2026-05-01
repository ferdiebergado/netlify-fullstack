import { SESSION } from '@shared/constants';
import type { CreateSession, Session } from '@shared/schemas/session';
import type { CreateUser } from '@shared/schemas/user';
import { randBase64 } from '@shared/utils';
import { getDb } from '../db';
import { UnauthorizedError } from '../http/errors';
import { upsertUser } from '../user/repo';
import { createSession, touchSession } from './repo';

export async function initializeSession(user: CreateUser): Promise<Session> {
  const db = await getDb();
  const id = await upsertUser(db, user);
  const session = newSession(id);

  return await createSession(db, session);
}

export function newSession(userId: number): CreateSession {
  const sessionId = randBase64(SESSION.ID_LENGTH);
  const expiresAt = setExpiryDate();

  return {
    sessionId,
    userId,
    expiresAt,
  };
}

export async function getSession(req: Request): Promise<Session> {
  const db = await getDb();
  const sessionId = req.headers.get(SESSION.HEADER_NAME);
  if (!sessionId) throw new UnauthorizedError('no session ID provided');

  const session = await touchSession(db, sessionId);
  if (!session) throw new UnauthorizedError('session not found');

  return session;
}

export const setExpiryDate = (minutes = SESSION.DURATION_MINUTES): Date =>
  new Date(Date.now() + minutes * 60_000);
