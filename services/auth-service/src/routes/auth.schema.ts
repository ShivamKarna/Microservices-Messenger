import { z } from '@chatapp/common';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(7).max(255),
  }),
});
export const registerSchema = loginSchema.extend({
  body: z.object({
    displayName: z.string().min(3).max(30),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshSchema: z.string(),
  }),
});

export const revokeSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
  }),
});
