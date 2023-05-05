import { type FastifyInstance } from 'fastify';
import { errorHandlerMiddleware } from '@/infra/http/middlewares/error-handler.middleware';

export const setupMiddlewares = (app: FastifyInstance): void => {
  app.setErrorHandler(errorHandlerMiddleware);
};
