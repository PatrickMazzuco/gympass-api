import { BaseError } from './base.error';
import { ErrorToken } from './error-name.enum';
import { ErrorType } from './error-type.enum';

export class UnexpectedError extends BaseError {
  constructor() {
    super(`Unexpected error.`);
    this.name = this.constructor.name;
    this.token = ErrorToken.UNEXPECTED;
    this.type = ErrorType.UNEXPECTED_ERROR;
  }
}
