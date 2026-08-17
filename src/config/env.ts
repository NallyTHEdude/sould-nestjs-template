import { z } from 'zod';

const envBoolean = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

export const configSchema = z.object({
  // Environment validations
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BASE_URL: z.string().url().default('http://localhost'),
  PORT: z.coerce.number().default(4000),

  // Server configurations
  USE_COOKIES: envBoolean.default(false),
  USE_CORS: envBoolean.default(false),
  USE_REDIS: envBoolean.default(false),
  USE_SESSION: envBoolean.default(false),

  // Database validations
  DATABASE_URL: z.string().url(),
});
