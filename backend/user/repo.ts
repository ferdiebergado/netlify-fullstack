/* eslint-disable unicorn/no-null */
import type { Client } from '@libsql/client';

import { UserSchema, type CreateUser, type User } from '@shared/schemas/user';
import type { UserRole } from '@shared/types';
import logger from '../logger';

export async function upsertUser(db: Client, user: CreateUser): Promise<User['id']> {
  logger.info('[DB]: Upserting user...');

  const sql = `
INSERT INTO users (google_id, name, email, picture, role, is_active)
VALUES (?, ?, ?, ?, ?, ?)
ON CONFLICT (google_id)
DO UPDATE SET last_login_at = ?
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

  return rows[0].id as unknown as number;
}

export type UserRow = {
  id: number;
  google_id: string;
  name?: string;
  email?: string;
  picture?: string;
  role: UserRole;
  is_active: number;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

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

  const user = rows[0] as unknown as UserRow;

  return mapUserRowToUser(user);
}

const mapUserRowToUser = (user: UserRow): User =>
  UserSchema.parse({
    id: user.id,
    googleId: user.google_id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    role: user.role,
    isActive: user.is_active,
    lastLoginAt: user.last_login_at,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    deletedAt: user.deleted_at,
  });
