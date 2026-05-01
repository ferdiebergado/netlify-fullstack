import * as z from 'zod';
import logger from './logger';

const libsqlUrlSchema = z
  .string()
  .trim()
  .refine(
    value => {
      // 1. SQLite in-memory
      if (value === ':memory:') {
        return true;
      }

      // 2. File-based SQLite
      if (value.startsWith('file:')) {
        return true;
      }

      // 3. Remote libSQL-compatible services
      try {
        const url = new URL(value);

        if (url.protocol !== 'libsql:') return false;

        if (!url.hostname) return false;

        return true;
      } catch {
        return false;
      }
    },
    {
      message: 'Invalid libSQL database URL. Expected :memory:, file:path, or libsql://host',
    }
  );

const envSchema = z.object({
  HOST: z.url({ error: 'HOST must be a valid URL' }),
  DATABASE_URL: libsqlUrlSchema,
  TURSO_AUTH_TOKEN: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string({ error: 'GOOGLE_CLIENT_ID is not set.' }),
  GOOGLE_CLIENT_SECRET: z.string({ error: 'GOOGLE_CLIENT_SECRET is not set.' }),
  GOOGLE_REDIRECT_URI: z.url({ error: 'GOOGLE_REDIRECT_URI not set.' }),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  ENV: z.enum(['development', 'production', 'testing']).default('production'),
});

const { success, error, data } = envSchema.safeParse(process.env);
if (!success) {
  const msg = 'Invalid environment variable/s';
  logger.error({ error, errors: z.flattenError(error).fieldErrors }, msg);
  throw new Error(msg);
}

const config = {
  host: data.HOST,
  databaseUrl: data.DATABASE_URL,
  tursoAuthToken: data.TURSO_AUTH_TOKEN,
  googleClientId: data.GOOGLE_CLIENT_ID,
  googleClientSecret: data.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: data.GOOGLE_REDIRECT_URI,
  logLevel: data.LOG_LEVEL,
  env: data.ENV,
};

export default config;
