import * as z from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),

  // Basic Profile
  googleId: z.string().min(1, 'Google ID is required'),
  email: z.email('Invalid email address').optional(),
  name: z.string().min(1, 'Name is required').optional(),
  picture: z.url('Invalid URL format').optional(),

  // Permissions
  role: z.enum(['user', 'admin']).optional(),

  isActive: z.preprocess(Boolean, z.boolean()).optional(),

  // Timestamps (ISO 8601 Strings)
  lastLoginAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  lastLoginAt: true,
  updatedAt: true,
  createdAt: true,
});

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const ProfileSchema = UserSchema.pick({
  name: true,
  email: true,
  picture: true,
});

export type Profile = z.infer<typeof ProfileSchema>;
