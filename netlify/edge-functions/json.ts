import type { Config, Context } from '@netlify/edge-functions';
import type { ApiResponse } from '@shared/types/index.js';

export const config: Config = {
  method: ['POST', 'PUT', 'PATCH'],
};

export default (req: Request, ctx: Context) => {
  console.log('Validating content-type...');

  const contentType = req.headers.get('content-type');

  if (!contentType || !/^application\/json(;.*)?$/i.test(contentType)) {
    const payload: ApiResponse = {
      success: false,
      error: { code: 'UNSUPPORTED_CONTENT_TYPE', message: 'Unsupported data type' },
    };

    const meta = {
      requestId: ctx.requestId,
      contentType,
      ip: ctx.ip,
      geo: ctx.geo,
    };

    console.warn(payload.error, { meta });

    return Response.json(payload, { status: 415 });
  }
};
