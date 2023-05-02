import 'dotenv/config';
import { z } from 'zod';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(
      _env.error.format(),
      null,
      2,
    )}`,
  );
}

export const env = _env.data;
