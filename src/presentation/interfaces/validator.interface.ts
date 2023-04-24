import { type BaseError } from '../errors/base.error';

export interface IValidator<T> {
  validate: (input: T) => BaseError | null;
}
