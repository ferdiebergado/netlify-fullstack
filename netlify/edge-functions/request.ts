import type { Context } from '@netlify/edge-functions';

export default (req: Request, { requestId }: Context) => {
  console.log('Received request:', {
    id: requestId,
    method: req.method,
    path: req.url,
    timestamp: new Date().toISOString(),
  });
};
