import { type HTTPResponseError } from '@/infra/http/adapters/http-response.adapter';
import { HttpStatusCode } from '@/infra/http/enums/http-status-code.enum';
import { HTTPError } from '@/infra/http/errors/http.error';
import { Environment, env } from '@/main/config/env';
import Logger from '@/main/config/logger';
import {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';

export async function errorHandlerMiddleware(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  if (env.NODE_ENV !== Environment.PRODUCTION) {
    Logger.error(error.message);
  }

  if (error instanceof HTTPError) {
    const body: Omit<HTTPResponseError, 'statusCode'> = {
      message: error.message,
      validationErrors: error.validationErrors,
    };

    await reply.code(error.statusCode).send(body);
    return;
  }

  if (env.NODE_ENV !== Environment.PRODUCTION) {
    Logger.error(error.message);
  }

  await reply.code(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
    message: 'Internal server error',
  });
}
