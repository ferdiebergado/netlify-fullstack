export const MIGRATION_FILE = 'init.sql';

export const SESSION = {
  COOKIE_NAME: '__Host-session',
  ID_LENGTH: 32,
  DURATION_MINUTES: 60 * 24 * 30 * 3, // 90 days
  HEADER_NAME: 'x-session-id',
} as const;
