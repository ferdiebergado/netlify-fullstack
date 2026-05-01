import type { Context } from '@netlify/edge-functions';

import { SESSION } from '@shared/constants.js';
import type { ApiResponse } from '@shared/types/index.js';

export default (req: Request, ctx: Context) => {
  console.log('Looking for active session...');

  const sessionId = ctx.cookies.get(SESSION.COOKIE_NAME);
  if (!sessionId) {
    const payload: ApiResponse = {
      success: false,
      error: { code: 'NO_SESSION_COOKIE', message: 'No session cookie' },
    };

    console.warn(payload.error.message);

    return Response.json(payload, { status: 401 });
  }

  req.headers.set(SESSION.HEADER_NAME, sessionId);
};
