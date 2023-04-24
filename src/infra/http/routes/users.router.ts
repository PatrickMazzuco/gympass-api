import { type FastifyInstance } from 'fastify';
import { RegisterControllerAdapter } from '../adapters/register-controller.adapter';
import { makeRegisterController } from '@/main/factories/controllers/register/register-controller.factory';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { ErrorType } from '@/presentation/errors/error-type.enum';

export type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
};

export type RegisterRequest = {
  body: RegisterRequestBody;
};

const setupRoutes = (app: FastifyInstance): void => {
  app.post<{ Body: RegisterRequestBody }>('/users', async (request, reply) => {
    const controller = makeRegisterController();

    const response = await controller.handle(
      RegisterControllerAdapter.adapt(request),
    );

    if (response.error) {
      let statusCode: HttpStatusCode;

      switch (response.error.type) {
        case ErrorType.INPUT_ERROR:
          statusCode = HttpStatusCode.BAD_REQUEST;
          break;
        case ErrorType.UNEXPECTED_ERROR:
          statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
          break;
        default:
          statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
      }

      return await reply.code(statusCode).send(response.error);
    }

    return await reply.code(HttpStatusCode.CREATED).send(response.data);
  });
};

export const UsersRouter = {
  setup: setupRoutes,
};
