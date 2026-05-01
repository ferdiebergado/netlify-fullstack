import type { UnknownRecord } from 'type-fest';

import { API_BASE_URL } from '@shared/constants';
import type { ApiResponse } from '@shared/types';

const headers = { 'Content-Type': 'application/json' };

class ApiError extends Error {
  status = 500;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      ...options,
    });

    // eslint-disable-next-line unicorn/no-null
    if (res.status === 401) return null;

    const json = (await res.json()) as ApiResponse<T>;

    if (!json.success) throw new ApiError(json.error.message, res.status);

    // eslint-disable-next-line unicorn/no-null
    if (!json.data) return null;

    return json.data;
  } catch (error) {
    console.error('Request failed error:', error);
    if (error instanceof ApiError) throw error;

    throw new Error('Network error.', { cause: error });
  }
}

export const api = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, options),
  post: <T>(path: string, data: UnknownRecord = {}, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }),
  put: <T>(path: string, data: UnknownRecord, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    }),
  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: 'DELETE',
    }),
};
