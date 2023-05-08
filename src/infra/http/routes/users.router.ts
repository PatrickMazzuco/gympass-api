import { type FastifyInstance, type FastifyPluginAsync } from 'fastify';
import { SignupControllerAdapter } from '../adapters/users/signup-controller.adapter';
import { makeSignupController } from '@/main/factories/controllers/signup/signup-controller.factory';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { HTTPResponseAdapter } from '../adapters/http-response.adapter';
import { AuthenticateControllerAdapter } from '../adapters/users/authenticate-controller.adapter';
import { makeAuthenticateController } from '@/main/factories/controllers/authenticate/authenticate-controller.factory';

export type SignupRequestBody = {
  name: string;
  email: string;
  password: string;
};

export type SignupRequest = {
  body: SignupRequestBody;
};

export type AuthenticateRequestBody = {
  email: string;
  password: string;
};

export type AuthenticateRequest = {
  body: AuthenticateRequestBody;
};

const signupController = makeSignupController();
const authenticateController = makeAuthenticateController();

const setupRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.post<{ Body: SignupRequestBody }>(`/users`, async (request, reply) => {
    const response = await signupController.handle(
      SignupControllerAdapter.adapt(request),
    );

    await HTTPResponseAdapter.adapt({
      controllerResponse: response,
      reply,
      statusCode: HttpStatusCode.CREATED,
    });
  });

  app.post<{ Body: AuthenticateRequestBody }>(
    '/users/auth',
    async (request, reply) => {
      const response = await authenticateController.handle(
        AuthenticateControllerAdapter.adapt(request),
      );

      await HTTPResponseAdapter.adapt({
        controllerResponse: response,
        reply,
        statusCode: HttpStatusCode.OK,
      });
    },
  );
};

export const UsersRouter = {
  setup: setupRoutes,
};
