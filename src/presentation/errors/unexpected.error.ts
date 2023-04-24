import { BaseError } from '@/common/errors/base.error';
import { ErrorToken } from '@/common/enums/errors/error-name.enum';
import { ErrorType } from '@/common/enums/errors/error-type.enum';

export class UnexpectedError extends BaseError {
  constructor() {
    super(`Unexpected error.`);
    this.name = this.constructor.name;
    this.token = ErrorToken.UNEXPECTED;
    this.type = ErrorType.UNEXPECTED_ERROR;
  }
}
