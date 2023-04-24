import { BaseError } from './base.error';

export class ExternalServiceError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
