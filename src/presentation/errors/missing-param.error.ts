import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { ClientError } from '@/common/errors/client.error';

export class MissingParamError extends ClientError {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = this.constructor.name;
    this.type = ErrorType.INPUT_ERROR;
  }
}
