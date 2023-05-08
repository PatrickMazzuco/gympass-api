/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify from 'fastify';
import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';

const app = fastify();

setupMiddlewares(app);
setupRoutes(app);

export { app };
