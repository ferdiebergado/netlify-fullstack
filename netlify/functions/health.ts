import { Context } from '@netlify/functions';

export default (req: Request, ctx: Context) => {
  return Response.json({
    status: 'ok',
  });
};
