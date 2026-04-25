import { getDb } from './lib/db';
import { checkMethod } from './lib/http';
import { respondWithError } from './lib/http/errors';

export default async (req: Request) => {
  try {
    checkMethod(req, ['GET']);

    await getDb();

    return Response.json({
      status: 'up',
    });
  } catch (error) {
    return respondWithError(error);
  }
};
