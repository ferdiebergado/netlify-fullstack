import { getDb } from '@backend/db';
import { checkMethod } from '@backend/http';
import { respondWithError, UnauthorizedError } from '@backend/http/errors';
import { getSession } from '@backend/session';
import findUser from '@backend/user/repo';
import type { Profile } from '@shared/schemas/user';
import type { ApiResponse } from '@shared/types';

export default async (req: Request) => {
  try {
    checkMethod(req, ['GET']);

    const db = await getDb();
    const { userId } = await getSession(req);
    const user = await findUser(db, userId);

    if (!user) throw new UnauthorizedError('user not found');

    const data: Profile = {
      name: user.name,
      email: user.email,
      picture: user.picture,
    };

    const payload: ApiResponse<Profile> = {
      success: true,
      data,
    };

    return Response.json(payload);
  } catch (error) {
    return respondWithError(error);
  }
};
