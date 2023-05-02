import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { ClientError } from '@/common/errors/client.error';

export class UserAlreadyExistsError extends ClientError {
  constructor() {
    super('User already exists');
    this.name = this.constructor.name;
    this.type = ErrorType.DUPLICATED_RESOURCE_ERROR;
  }
}
