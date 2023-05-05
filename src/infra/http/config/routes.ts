import { type FastifyInstance } from 'fastify';
import { UsersRouter } from '../routes/users.router';
import { env } from '@/main/config/env';

const defaultPrefix = env.API_PREFIX;

export const setupRoutes = async (app: FastifyInstance): Promise<void> => {
  await app.register(UsersRouter.setup, { prefix: defaultPrefix });
};
