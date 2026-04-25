import type { ApiResponse } from '@shared/types';
import type { HttpMethod } from '.';
import logger from '../logger';

export class HttpError extends Error {
  readonly statusCode: number;
  readonly name: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class BadRequestError extends HttpError {
  readonly errors?: Record<string, string[]>;

  constructor(message = 'Bad request', errors?: Record<string, string[]>) {
    super(400, message);
    this.errors = errors;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class MethodNotAllowedError extends HttpError {
  allowedmethods: HttpMethod[] = [];

  constructor(message = 'Method Not Allowed', allowedMethods: HttpMethod[] = []) {
    super(405, message);
    this.allowedmethods = allowedMethods;
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message = 'Service Unavailable') {
    super(503, message);
  }
}

export function respondWithError(error: unknown) {
  const payload: ApiResponse = {
    success: false,
    error: { code: 'APP_ERROR', message: 'Something went wrong.' },
  };

  let statusCode = 500;

  if (error instanceof HttpError) {
    if (error instanceof MethodNotAllowedError) {
      return new Response(error.message, {
        status: error.statusCode,
        headers: {
          Allow: error.allowedmethods.join(', '),
        },
      });
    }

    payload.error.message = error.message;
    statusCode = error.statusCode;
  }

  switch (statusCode) {
    case 503: {
      logger.crit({ error }, 'Service Unavailable');
      break;
    }
    case 500: {
      logger.error(error, 'Internal Server Error');
      break;
    }
    default: {
      logger.notice({ error }, 'Client error');
      break;
    }
  }

  return Response.json(payload, { status: statusCode });
}
