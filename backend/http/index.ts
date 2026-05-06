import * as z from 'zod';

import { BadRequestError, MethodNotAllowedError } from './errors';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export function checkMethod(req: Request, allowedMethods: HttpMethod[]) {
  const allowed = new Set<HttpMethod>(allowedMethods);

  if (!allowed.has(req.method as HttpMethod))
    throw new MethodNotAllowedError(`Method ${req.method} is not allowed`, allowedMethods);
}

const getFieldErrors = (error: unknown) =>
  error instanceof z.ZodError ? z.flattenError(error).fieldErrors : undefined;

export async function parseJson<T extends z.ZodType>(req: Request, schema: T): Promise<z.infer<T>> {
  try {
    const jsonData = await req.json();
    return schema.parse(jsonData);
  } catch (error) {
    throw new BadRequestError('Invalid JSON body', getFieldErrors(error));
  }
}

export function parseSearchParams<T extends z.ZodType>(req: Request, schema: T): z.infer<T> {
  try {
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    return schema.parse(params);
  } catch (error) {
    throw new BadRequestError('Invalid search params', getFieldErrors(error));
  }
}
