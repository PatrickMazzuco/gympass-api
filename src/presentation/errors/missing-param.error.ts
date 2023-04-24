import { BaseError } from './base.error';
import { ErrorToken } from './error-name.enum';
import { ErrorType } from './error-type.enum';

export class MissingParamError extends BaseError {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = this.constructor.name;
    this.token = ErrorToken.MISSING_PARAM;
    this.type = ErrorType.INPUT_ERROR;
  }
}
