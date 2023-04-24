import { BaseError } from './base.error';
import { ErrorToken } from './error-name.enum';
import { ErrorType } from './error-type.enum';

export class WeakPasswordError extends BaseError {
  constructor() {
    super(
      `Weak password. Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character`,
    );
    this.name = this.constructor.name;
    this.token = ErrorToken.WEAK_PASSWORD;
    this.type = ErrorType.INPUT_ERROR;
  }
}
