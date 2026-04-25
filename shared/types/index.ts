export type UserRole = 'user' | 'admin';

export type ApiResponse<T = undefined> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: { code: string; message: string; details?: T } };
