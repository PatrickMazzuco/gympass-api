import { type FastifyReply } from 'fastify';
import { HTTPResponseAdapter } from './http-response.adapter';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { MockClientError } from '@/tests/mocks/modules/errors/error.mock';
import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { HTTPError } from '../errors/http.error';
import { ValidationError } from '@/presentation/errors/validation.error';
import { type ErrorMessage } from '@/presentation/validators/base.validator';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';

interface FastifyReplyMock {
  code: (status: number) => FastifyReplyMock;
  send: (data: any) => FastifyReplyMock;
}

function mockFastifyReply(): FastifyReplyMock {
  class FastifyReplyStub implements FastifyReplyMock {
    code(_status: number): FastifyReplyStub {
      return this;
    }

    send(_data: any): FastifyReplyStub {
      return this;
    }
  }

  return new FastifyReplyStub();
}

type SutTypes = {
  sut: typeof HTTPResponseAdapter;
  reply: FastifyReplyMock;
};

function makeSut(): SutTypes {
  const sut = HTTPResponseAdapter;
  const reply = mockFastifyReply();
  return {
    sut,
    reply,
  };
}

describe('HTTP Response Adapter', () => {
  it('Should call reply with correct values on success', async () => {
    const { sut, reply } = makeSut();
    const replyCodeSpy = vi.spyOn(reply, 'code').mockReturnValue(reply);
    const replySendSpy = vi.spyOn(reply, 'send').mockReturnValue(reply);

    const controllerResponse: ResultOrError<any> = {
      data: 'any_data',
    };

    await sut.adapt({
      reply: reply as FastifyReply,
      controllerResponse,
      statusCode: HttpStatusCode.CREATED,
    });

    expect(replyCodeSpy).toBeCalledWith(HttpStatusCode.CREATED);
    expect(replySendSpy).toBeCalledWith(controllerResponse.data);
  });

  it('Should throw the correct error on fail', async () => {
    const { sut, reply } = makeSut();

    const errorMessage = 'any_message';
    const controllerResponse: ResultOrError<any> = {
      error: new MockClientError({
        message: errorMessage,
        type: ErrorType.INPUT_ERROR,
      }),
    };

    await sut
      .adapt({
        reply: reply as FastifyReply,
        controllerResponse,
        statusCode: HttpStatusCode.CREATED,
      })
      .then(() => {
        throw new Error('Should not reach this point');
      })
      .catch((error) => {
        expect(error).toEqual(
          new HTTPError(errorMessage, HttpStatusCode.BAD_REQUEST, undefined),
        );
      });
  });

  it('Should return correct errors when validation error is returned', async () => {
    const { sut, reply } = makeSut();

    const errorMessages: ErrorMessage[] = [
      { field: 'any_field', errors: ['any_error'] },
      { field: 'another_field', errors: ['another_error', 'second_error'] },
    ];

    const controllerResponse: ResultOrError<any> = {
      error: new ValidationError(errorMessages),
    };

    await sut
      .adapt({
        reply: reply as FastifyReply,
        controllerResponse,
        statusCode: HttpStatusCode.CREATED,
      })
      .then(() => {
        throw new Error('Should not reach this point');
      })
      .catch((error) => {
        expect(error).toEqual(
          new HTTPError(
            'Validation error',
            HttpStatusCode.BAD_REQUEST,
            errorMessages,
          ),
        );
      });
  });

  it('Should throw internal server error when receiving unexpected error', async () => {
    const { sut, reply } = makeSut();

    const controllerResponse: ResultOrError<any> = {
      error: new UnexpectedError(),
    };

    await sut
      .adapt({
        reply: reply as FastifyReply,
        controllerResponse,
        statusCode: HttpStatusCode.CREATED,
      })
      .then(() => {
        throw new Error('Should not reach this point');
      })
      .catch((error) => {
        expect(error).toEqual(
          new HTTPError(
            'Unexpected error',
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            undefined,
          ),
        );
      });
  });

  it('Should throw internal server error when receiving an unknown error', async () => {
    const { sut, reply } = makeSut();

    const errorMessage = 'unexpected_error';
    const controllerResponse: ResultOrError<any> = {
      error: new Error(errorMessage),
    };

    await sut
      .adapt({
        reply: reply as FastifyReply,
        controllerResponse,
        statusCode: HttpStatusCode.CREATED,
      })
      .then(() => {
        throw new Error('Should not reach this point');
      })
      .catch((error) => {
        expect(error).toEqual(
          new HTTPError(
            errorMessage,
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            undefined,
          ),
        );
      });
  });
});
