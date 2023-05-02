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
  Logger.error(error);

  if (error.statusCode) {
    await reply.code(error.statusCode).send({
      message: error.message,
    });
    return;
  }

  await reply.code(500).send({
    message: 'Internal server error',
  });
}
