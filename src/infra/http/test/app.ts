import { type FastifyInstance } from 'fastify';
import { app } from '../config/app';
import { env } from '@/main/config/env';

const { PORT: port, HOST: host } = env;

export async function startTestHttpServer(): Promise<FastifyInstance> {
  await app.listen({
    port,
    host,
  });

  return await app;
}
