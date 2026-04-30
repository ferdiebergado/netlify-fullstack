import type { Client } from '@libsql/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createTestDB } from '@backend/testing/db';
import { upsertUser } from '@backend/user/repo';
import type { CreateUser } from '@shared/schemas/user';

describe('UserRepo', () => {
  const user: CreateUser = {
    googleId: '123',
    name: 'Test User',
    email: 'test@example.com',
    picture: 'http://example.com/picture.jpg',
  };

  let db: Client;

  beforeEach(async () => {
    db = await createTestDB();
  });

  afterEach(() => {
    db.close();
  });

  describe('upsertUser', () => {
    it('should insert a new user if googleId does not exist', async () => {
      const userId = await upsertUser(db, user);
      // Assert that a user ID is returned
      expect(userId).toBeTypeOf('number');
      expect(userId).toBeGreaterThan(0);

      // Verify that the user was actually created in the database
      const { rows } = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      expect(rows).toHaveLength(1);

      const createdUser = rows[0];
      expect(createdUser).toMatchObject({
        google_id: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });

      // Verify timestamps are set
      expect(createdUser.created_at).toBeTruthy();
      expect(createdUser.updated_at).toBeTruthy();
      expect(createdUser.last_login_at).toBeTruthy();

      // Verify timestamps are recent (within last few seconds)
      const now = Date.now();
      const createdAt = new Date(createdUser.created_at as string).getTime();
      const updatedAt = new Date(createdUser.updated_at as string).getTime();
      const lastLoginAt = new Date(createdUser.last_login_at as string).getTime();

      expect(createdAt).toBeLessThanOrEqual(now);
      expect(updatedAt).toBeLessThanOrEqual(now);
      expect(lastLoginAt).toBeLessThanOrEqual(now);
    });

    it('should update existing user if googleId already exists', async () => {
      vi.useFakeTimers();

      // First create a user
      const userId = await upsertUser(db, user);

      // Get the original timestamps
      const { rows: originalRows } = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      const originalUser = originalRows[0];
      const originalUpdatedAt = new Date(originalUser.updated_at as string).getTime();
      const originalLastLoginAt = new Date(originalUser.last_login_at as string).getTime();

      vi.advanceTimersByTime(60_000);

      const updatedUserId = await upsertUser(db, user);

      // Should return the same user ID
      expect(updatedUserId).toBe(userId);

      // Verify that the user was updated in the database
      const { rows } = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      expect(rows).toHaveLength(1);

      const dbUser = rows[0];
      expect(dbUser).toMatchObject({
        google_id: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });

      // Verify timestamps were updated (should be newer than original)
      const newUpdatedAt = new Date(dbUser.updated_at as string).getTime();
      const newLastLoginAt = new Date(dbUser.last_login_at as string).getTime();

      expect(newUpdatedAt).toBeGreaterThan(originalUpdatedAt);
      expect(newLastLoginAt).toBeGreaterThan(originalLastLoginAt);

      vi.useRealTimers();
    });

    it.todo('should return the upserted user with id');
    it.todo('should throw an error if database operation fails');
    it.todo('should handle concurrent upsert operations correctly');
    it.todo('should not create duplicate users with the same googleId');
    it.todo('should update the name, email, and picture fields on existing user');
    it.todo('should return null if upsert operation fails');
  });
});
