import * as z from 'zod';

z.config({
  jitless: true,
});

const envSchema = z.object({
  VITE_APP_TITLE: z.string().min(1),
  VITE_GOOGLE_CLIENT_ID: z.string({ error: 'VITE_GOOGLE_CLIENT_ID is not set.' }).min(1),
  VITE_GOOGLE_REDIRECT_URI: z.url({ error: 'VITE_GOOGLE_REDIRECT_URI is not set.' }).min(1),
  VITE_APP_HOST: z.url({ error: 'VITE_APP_HOST must be a valid URL' }),
});

const { success, error, data } = envSchema.safeParse(import.meta.env);
if (!success) {
  const errors = z.flattenError(error).fieldErrors;
  console.error('Environment variable validation failed:', errors);

  throw new Error('Invalid environment variables');
}

const config = {
  appTitle: data.VITE_APP_TITLE,
  googleClientId: data.VITE_GOOGLE_CLIENT_ID,
  googleRedirectUri: data.VITE_GOOGLE_REDIRECT_URI,
  appHost: data.VITE_APP_HOST,
};

export default config;
