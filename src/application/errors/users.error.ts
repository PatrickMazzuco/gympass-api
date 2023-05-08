import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { ClientError } from '@/common/errors/client.error';

export namespace UsersError {
  export class AlreadyExists extends ClientError {
    constructor() {
      super('User already exists');
      this.name = this.constructor.name;
      this.type = ErrorType.DUPLICATED_RESOURCE_ERROR;
    }
  }

  export class NotFound extends ClientError {
    constructor() {
      super('User not found');
      this.name = this.constructor.name;
      this.type = ErrorType.NOT_FOUND_ERROR;
    }
  }

  export class InvalidCredentials extends ClientError {
    constructor() {
      super('Invalid credentials');
      this.name = this.constructor.name;
      this.type = ErrorType.UNAUTHORIZED_ERROR;
    }
  }
}
