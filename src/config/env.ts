import { z } from 'zod';

export const configSchema = z.object({
  // Environment validations
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BASE_URL: z.string().url().default('http://localhost'),
  PORT: z.coerce.number().default(4000),

  // Database validations
  DATABASE_URL: z.string().url(),
});
