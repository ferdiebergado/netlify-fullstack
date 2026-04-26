import { getDb } from '@backend/db';
import { checkMethod } from '@backend/http';
import { NotFoundError, respondWithError } from '@backend/http/errors';
import { getSession } from '@backend/session';
import { emptySessionCookie } from '@backend/session/cookie';
import { softDeleteSession } from '@backend/session/repo';
import type { Context } from '@netlify/functions';
import type { ApiResponse } from '@shared/types';

export default async (req: Request, ctx: Context) => {
  try {
    checkMethod(req, ['POST']);

    const db = await getDb();
    const { sessionId } = await getSession(req);
    const isDeleted = await softDeleteSession(db, sessionId);

    if (!isDeleted) throw new NotFoundError('Session not found or already deleted');

    const payload: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Signed out.',
      },
    };

    const sessionCookie = emptySessionCookie();
    ctx.cookies.set(sessionCookie);
    return Response.json(payload);
  } catch (error) {
    return respondWithError(error);
  }
};
