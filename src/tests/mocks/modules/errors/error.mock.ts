import { BaseError } from '@/common/errors/base.error';

export class MockError extends BaseError {
  constructor() {
    super('MockError');
  }
}
