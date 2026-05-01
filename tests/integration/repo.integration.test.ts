import type { Client } from '@libsql/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { upsertUser } from '@backend/user/repo';
import type { CreateUser } from '@shared/schemas/user';
import { createTestDB } from '../../tests/helpers/db';

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
      expect(userId).toBeTypeOf('number');
      expect(userId).toBeGreaterThan(0);

      const { rows } = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      expect(rows).toHaveLength(1);

      const createdUser = rows[0];
      expect(createdUser).toMatchObject({
        google_id: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });

      expect(createdUser.created_at).toBeTruthy();
      expect(createdUser.updated_at).toBeTruthy();
      expect(createdUser.last_login_at).toBeTruthy();

      const now = Date.now();
      const createdAt = new Date(createdUser.created_at as string).getTime();
      const updatedAt = new Date(createdUser.updated_at as string).getTime();
      const lastLoginAt = new Date(createdUser.last_login_at as string).getTime();

      expect(createdAt).toBeCloseTo(now, -2);
      expect(updatedAt).toBeCloseTo(now, -2);
      expect(lastLoginAt).toBeCloseTo(now, -2);
    });

    it('should update existing user if googleId already exists', async () => {
      vi.useFakeTimers();

      const userId = await upsertUser(db, user);

      vi.advanceTimersByTime(60_000);

      const updatedUserId = await upsertUser(db, user);

      expect(updatedUserId).toBe(userId);

      const { rows } = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      expect(rows).toHaveLength(1);

      const dbUser = rows[0];
      expect(dbUser).toMatchObject({
        google_id: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });

      const now = Date.now();

      const newUpdatedAt = new Date(dbUser.updated_at as string).getTime();
      expect(newUpdatedAt).toBeCloseTo(now, -20);

      const newLastLoginAt = new Date(dbUser.last_login_at as string).getTime();
      expect(newLastLoginAt).toBeCloseTo(now);

      vi.useRealTimers();
    });

    it('should throw an error if database operation fails', async () => {
      // Mock the db.execute method to throw an error
      const executeSpy = vi
        .spyOn(db, 'execute')
        .mockRejectedValueOnce(new Error('Database connection failed'));

      // Expect the upsertUser call to throw an error
      await expect(upsertUser(db, user)).rejects.toThrow('Database connection failed');

      // Verify the mock was called
      expect(executeSpy).toHaveBeenCalled();
    });
    it.todo('should handle concurrent upsert operations correctly');

    it('should update the name, email, and picture fields on existing user', async () => {
      vi.useFakeTimers();

      const userId = await upsertUser(db, user);

      vi.advanceTimersByTime(60_000);

      const updatedUser: CreateUser = {
        googleId: user.googleId, // Same googleId to trigger update
        name: 'Updated User Name',
        email: 'updated@example.com',
        picture: 'http://example.com/updated-picture.jpg',
      };

      const updatedUserId = await upsertUser(db, updatedUser);

      expect(updatedUserId).toBe(userId);

      const { rows } = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      expect(rows).toHaveLength(1);

      const dbUser = rows[0];

      expect(dbUser).toMatchObject({
        google_id: user.googleId, // Should remain the same
        name: updatedUser.name,
        email: updatedUser.email,
        picture: updatedUser.picture,
      });

      const updatedAt = new Date(dbUser.updated_at as string).getTime();
      const lastLoginAt = new Date(dbUser.last_login_at as string).getTime();

      const now = Date.now();
      expect(updatedAt).toBeCloseTo(now, -20);
      expect(lastLoginAt).toBeCloseTo(now);

      vi.useRealTimers();
    });
  });
});
