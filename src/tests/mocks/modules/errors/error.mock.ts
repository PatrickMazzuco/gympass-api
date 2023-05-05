import { ErrorType } from '@/common/enums/errors/error-type.enum';
import { BaseError } from '@/common/errors/base.error';
import { ClientError } from '@/common/errors/client.error';

export class MockError extends BaseError {
  constructor() {
    super('MockError');
  }
}

export type MockClientErrorParams = {
  message?: string;
  type?: ErrorType;
};

export class MockClientError extends ClientError {
  constructor({ message, type }: MockClientErrorParams = {}) {
    super(message ?? 'MockClientError');
    this.name = this.constructor.name;
    this.type = type ?? ErrorType.DUPLICATED_RESOURCE_ERROR;
  }
}
