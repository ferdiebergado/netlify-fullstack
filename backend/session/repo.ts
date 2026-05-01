import type { Client, Row } from '@libsql/client';

import { SessionSchema, type CreateSession, type Session } from '@shared/schemas/session';
import { snakeToCamel } from '@shared/utils';
import logger from '../logger';

export async function createSession(db: Client, session: CreateSession): Promise<Session> {
  logger.info('[DB]: Creating session...');

  const sql = `
INSERT INTO sessions (session_id, user_id, expires_at)
VALUES (?, ?, ?)
RETURNING *
`;

  const { rows } = await db.execute(sql, [
    session.sessionId,
    session.userId,
    session.expiresAt.toISOString(),
  ]);
  return mapRowToSession(rows[0]);
}

export async function findSession(db: Client, id: string): Promise<Session | undefined> {
  logger.info('[DB]: Retrieving session...');

  const now = new Date().toISOString();

  const sql = `
SELECT *
FROM sessions
WHERE session_id = ? AND datetime(expires_at) > datetime(?) AND is_revoked = 0 AND deleted_at IS NULL
LIMIT 1
`;

  const { rows } = await db.execute(sql, [id, now]);

  if (rows.length === 0) {
    reportMissingSession(id);
    return;
  }

  return mapRowToSession(rows[0]);
}

export async function touchSession(db: Client, id: string): Promise<Session | undefined> {
  logger.info('Updating session...');

  const sql = `
UPDATE sessions
SET last_active_at = ?, updated_at = ?
WHERE session_id = ? AND datetime(expires_at) > datetime(?) AND is_revoked = 0 AND deleted_at IS NULL
RETURNING *
      `;

  const now = new Date().toISOString();

  const { rows } = await db.execute(sql, [now, now, id, now]);

  if (rows.length === 0) {
    reportMissingSession(id);
    return;
  }

  return mapRowToSession(rows[0]);
}

export async function softDeleteSession(db: Client, id: string): Promise<boolean> {
  const now = new Date().toISOString();

  const sql = `
UPDATE sessions
SET deleted_at = ?
WHERE session_id = ? AND datetime(expires_at) > datetime(?) AND is_revoked = 0 AND deleted_at IS NULL
    `;

  const { rowsAffected } = await db.execute(sql, [now, id, now]);

  return rowsAffected === 1;
}

export async function revokeSession(
  db: Client,
  sessionId: string,
  userId: number
): Promise<boolean> {
  logger.info('[DB]: Revoking session...');

  const now = new Date().toISOString();

  const sql = `
UPDATE sessions
SET is_revoked = 1, updated_at = ?
WHERE session_id = ? AND user_id = ? AND datetime(expires_at) > datetime(?) AND is_revoked = 0 AND deleted_at IS NULL
`;

  const { rowsAffected } = await db.execute(sql, [now, sessionId, userId, now]);

  return rowsAffected === 1;
}

const mapRowToSession = (row: Row): Session => SessionSchema.parse(snakeToCamel(row));

const reportMissingSession = (sessionId: string) => {
  logger.warn({ sessionId }, 'Session not found');
};
