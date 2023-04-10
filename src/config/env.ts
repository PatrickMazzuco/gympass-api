import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(_env.error.format())}`,
  );
}

export const env = _env.data;
