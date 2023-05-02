import { type FastifyInstance } from 'fastify';
import { SignupControllerAdapter } from '../adapters/users/signup-controller.adapter';
import { makeSignupController } from '@/main/factories/controllers/signup/signup-controller.factory';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { HTTPResponseAdapter } from '../adapters/http-response.adapter';

export type SignupRequestBody = {
  name: string;
  email: string;
  password: string;
};

export type SignupRequest = {
  body: SignupRequestBody;
};

const signupController = makeSignupController();

const setupRoutes = (app: FastifyInstance): void => {
  app.post<{ Body: SignupRequestBody }>('/users', async (request, reply) => {
    const response = await signupController.handle(
      SignupControllerAdapter.adapt(request),
    );

    await HTTPResponseAdapter.adapt({
      controllerResponse: response,
      reply,
      statusCode: HttpStatusCode.CREATED,
    });
  });
};

export const UsersRouter = {
  setup: setupRoutes,
};
