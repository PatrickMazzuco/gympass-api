import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { InternalError } from '@/common/errors/internal.error';

export class UnexpectedError extends InternalError {
  constructor() {
    super(`Unexpected error`);
    this.name = this.constructor.name;
    this.type = ErrorType.UNEXPECTED_ERROR;
  }
}
