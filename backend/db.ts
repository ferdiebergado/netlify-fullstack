import { createClient, type Client, type Transaction } from '@libsql/client';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import config from './config';
import { MIGRATION_FILE } from './constants';
import { ServiceUnavailableError } from './http/errors';
import logger from './logger';

let db: Client | undefined;

export async function getDb(): Promise<Client> {
  if (!db) {
    db = createClient({
      url: config.databaseUrl,
      authToken: config.tursoAuthToken,
    });
  }

  try {
    const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='users'`;
    const { rows } = await db.execute(sql);

    if (rows.length === 0) {
      logger.info('Initializing database schema...');
      const schemaPath = path.resolve(MIGRATION_FILE);
      const schema = readFileSync(schemaPath, { encoding: 'utf8' });

      await db.executeMultiple(schema);
      logger.info('Database schema initialized successfully');
    } else {
      logger.info('Database schema already initialized');
    }
  } catch (error) {
    const msg = 'Failed to check or initialize the database';
    logger.error(error, msg);
    throw new ServiceUnavailableError(msg);
  }

  return db;
}

export async function runInTransaction<TArgs extends unknown[], TReturn>(
  db: Client,
  fn: (tx: Transaction, ...args: TArgs) => Promise<TReturn>,
  args: TArgs
): Promise<TReturn> {
  logger.info('Beginning transaction...');

  const tx = await db.transaction();

  try {
    const res = await fn(tx, ...args);
    logger.info('Committing transaction...');
    await tx.commit();
    return res;
  } catch (error) {
    logger.error(error, 'Transaction failed:');
    logger.info('Rolling back transaction...');
    await tx.rollback();
    throw error;
  } finally {
    logger.info('Closing transaction...');
    tx.close();
  }
}
