import { type FastifyReply } from 'fastify';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { type BaseError } from '@/common/errors/base.error';
import Logger from '@/main/config/logger';
import { HTTPError } from '@/infra/http/errors/http.error';

type HTTPAdapterOptions = {
  controllerResponse: ResultOrError<any>;
  reply: FastifyReply;
  statusCode?: HttpStatusCode;
};

export type HTTPResponseError = {
  statusCode: HttpStatusCode;
  message: string;
  validationErrors?: Record<string, string[]>;
};
export class HTTPResponseAdapter {
  static async adapt({
    controllerResponse,
    reply,
    statusCode = HttpStatusCode.OK,
  }: HTTPAdapterOptions): Promise<void> {
    if (controllerResponse.error) {
      const error = buildHTTPErrorResponse(controllerResponse.error);

      throw new HTTPError(
        error.message,
        error.statusCode,
        error.validationErrors,
      );
    }

    return await reply.code(statusCode).send(controllerResponse.data);
  }
}

function getErrorStatusCode(error: BaseError): HttpStatusCode {
  let statusCode: HttpStatusCode;

  switch (error.type) {
    case ErrorType.INPUT_ERROR:
      statusCode = HttpStatusCode.BAD_REQUEST;
      break;
    case ErrorType.UNEXPECTED_ERROR:
      statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
      break;
    case ErrorType.DUPLICATED_RESOURCE_ERROR:
      statusCode = HttpStatusCode.CONFLICT;
      break;
    default:
      Logger.warn(
        `Error type ${error.type} not found. From error: ${error.message}`,
      );
      statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  }

  return statusCode;
}

function buildHTTPErrorResponse(error: any): HTTPResponseError {
  const statusCode = getErrorStatusCode(error);
  const response: HTTPResponseError = {
    statusCode,
    message: error.message,
  };

  if (error.content) {
    response.validationErrors = error.content;
  }

  return response;
}
