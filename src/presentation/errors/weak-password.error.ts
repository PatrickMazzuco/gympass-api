import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { ClientError } from '@/common/errors/client.error';

export class WeakPasswordError extends ClientError {
  constructor() {
    super(
      `Weak password. Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character`,
    );
    this.name = this.constructor.name;
    this.type = ErrorType.INPUT_ERROR;
  }
}
