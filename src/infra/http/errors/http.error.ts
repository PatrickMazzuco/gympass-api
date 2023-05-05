import { type ErrorMessage } from '@/presentation/validators/base.validator';

export class HTTPError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly validationErrors?: ErrorMessage[],
  ) {
    super(message);
  }
}
