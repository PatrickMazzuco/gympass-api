import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { ClientError } from '@/common/errors/client.error';

export class ValidationError extends ClientError {
  constructor(content: any) {
    super('Validation error');
    this.name = this.constructor.name;
    this.type = ErrorType.INPUT_ERROR;
    this.content = content;
  }
}
