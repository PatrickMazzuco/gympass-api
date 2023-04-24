import { ErrorToken } from '@/common/enums/errors/error-name.enum';
import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { BaseError } from '@/common/errors/base.error';

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
