import type { Config, Context } from '@netlify/edge-functions';
import type { ApiResponse } from '@shared/types/index.js';

export const config: Config = {
  method: ['POST', 'PUT', 'PATCH', 'DELETE'],
};

export default (req: Request, ctx: Context) => {
  console.log('Checking fetch metadata...');

  const meta = {
    requestId: ctx.requestId,
    ip: ctx.ip,
    geo: ctx.geo,
  };

  const fetchSite = req.headers.get('sec-fetch-site');

  if (!fetchSite) {
    const payload: ApiResponse = {
      success: false,
      error: { code: 'MISSING_FETCH_METADATA', message: 'missing fetch metadata' },
    };
    console.warn(payload.error.message, { meta });

    return Response.json(payload, { status: 401 });
  }

  if (fetchSite !== 'same-origin') {
    const payload: ApiResponse = {
      success: false,
      error: { code: 'CROSS_ORIGIN_BLOCKED', message: 'cross-origin requests disallowed' },
    };
    console.warn(payload.error.message, { meta });
    return Response.json(payload, { status: 401 });
  }
};
