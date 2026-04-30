import { createClient, type Client } from '@libsql/client';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { MIGRATION_FILE } from '@backend/constants';

let schemaCache: string;

export async function createTestDB(): Promise<Client> {
  try {
    const db = createClient({
      url: ':memory:',
    });

    if (!schemaCache) {
      const schemaPath = path.resolve(MIGRATION_FILE);
      schemaCache = readFileSync(schemaPath, { encoding: 'utf8' });
    }

    await db.executeMultiple(schemaCache);

    return db;
  } catch (error) {
    console.error('Failed to initialize test DB:', error);
    throw error;
  }
}
