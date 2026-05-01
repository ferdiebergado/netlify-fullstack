/* eslint-disable unicorn/no-null */
import type { Client, Row } from '@libsql/client';

import { UserIdSchema, UserSchema, type CreateUser, type User } from '@shared/schemas/user';
import { snakeToCamel } from '@shared/utils';
import logger from '../logger';

export async function upsertUser(db: Client, user: CreateUser): Promise<User['id']> {
  logger.info('[DB]: Upserting user...');

  const sql = `
INSERT INTO users (google_id, name, email, picture, role, is_active)
VALUES (?, ?, ?, ?, ?, ?)
ON CONFLICT (google_id)
DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  picture = EXCLUDED.picture,
  last_login_at = ?
RETURNING id
`;

  const { rows } = await db.execute(sql, [
    user.googleId,
    user.name ?? null,
    user.email ?? null,
    user.picture ?? null,
    user.role ?? 'user',
    user.isActive ?? 1,
    new Date().toISOString(),
  ]);

  return UserIdSchema.parse(rows[0]).id;
}

export default async function findUser(db: Client, id: number): Promise<User | undefined> {
  logger.info('[DB]: Finding user...');

  const sql = `
SELECT *
FROM users
WHERE id = ? AND is_active = 1
LIMIT 1
`;

  const { rows } = await db.execute(sql, [id]);

  if (rows.length === 0) {
    logger.warn({ userId: id }, 'user not found');
    return;
  }

  return mapRowToUser(rows[0]);
}

const mapRowToUser = (row: Row): User => UserSchema.parse(snakeToCamel(row));
