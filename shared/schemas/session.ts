import * as z from 'zod';

export const SessionSchema = z.object({
  id: z.number().int().positive(),
  sessionId: z.string(),
  userId: z.number().int().positive(),
  expiresAt: z.date(),
  isActive: z.preprocess(Boolean, z.boolean()).optional(),
  lastActiveAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().optional(),
});

export type Session = z.infer<typeof SessionSchema>;

export const CreateSessionSchema = SessionSchema.omit({
  id: true,
  lastActiveAt: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type CreateSession = z.infer<typeof CreateSessionSchema>;
