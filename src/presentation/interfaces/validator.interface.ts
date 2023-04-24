import { type BaseError } from '@/common/errors/base.error';

export interface IValidator<T> {
  validate: (input: T) => BaseError | null;
}
