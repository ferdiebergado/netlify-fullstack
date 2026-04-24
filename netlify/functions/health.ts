import type { Config, Context } from '@netlify/functions';

export const config: Config = {
  path: '/api/health',
};

export default (req: Request, ctx: Context) => {
  return Response.json({
    status: 'ok',
  });
};
