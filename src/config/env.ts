import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const urlSchema = z.string().refine(
  (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: 'Invalid URL',
  },
);

const envBoolean = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

export const configSchema = z.object({
  // Environment validations
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BASE_URL: urlSchema.default('http://localhost:4000'),
  PORT: z.coerce.number().default(4000),

  // Server configurations
  USE_COOKIES: envBoolean.default(false),
  USE_REDIS: envBoolean.default(false),
  USE_SESSION: envBoolean.default(false),
  USE_CORS: envBoolean.default(false),
  CORS_ORIGIN: urlSchema.default('http://localhost:3000'),

  // Database validations
  DATABASE_URL: z.string().url(),
});
