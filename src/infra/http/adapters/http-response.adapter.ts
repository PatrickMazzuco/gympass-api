import { type ResultOrError } from '@/presentation/types/result-or-error.type';
import { type FastifyReply } from 'fastify';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { ErrorType } from '@/common/enums/errors/error-type.enum';

type HTTPAdapterOptions = {
  controllerResponse: ResultOrError<any>;
  reply: FastifyReply;
  statusCode?: HttpStatusCode;
};

export class HTTPResponseAdapter {
  static async adapt({
    controllerResponse,
    reply,
    statusCode = HttpStatusCode.OK,
  }: HTTPAdapterOptions): Promise<any> {
    if (controllerResponse.error) {
      let statusCode: HttpStatusCode;

      switch (controllerResponse.error.type) {
        case ErrorType.INPUT_ERROR:
          statusCode = HttpStatusCode.BAD_REQUEST;
          break;
        case ErrorType.UNEXPECTED_ERROR:
          statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
          break;
        default:
          statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
      }

      return await reply.code(statusCode).send(controllerResponse.error);
    }

    return await reply.code(statusCode).send(controllerResponse.data);
  }
}
