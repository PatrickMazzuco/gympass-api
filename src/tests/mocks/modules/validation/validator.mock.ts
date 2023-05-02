import { type BaseError } from '@/common/errors/base.error';
import { ValidationError } from '@/presentation/errors/validation.error';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { type ErrorMessage } from '@/presentation/validators/base.validator';

export function mockValidator<T>(): IValidator<T> {
  class ValidatorStub implements IValidator<T> {
    validate(_params: T): BaseError | null {
      return null;
    }
  }

  return new ValidatorStub();
}

export function mockValidationErrorMessage(): ErrorMessage {
  return {
    field: 'any_field',
    errors: ['any_error'],
  };
}

export function mockValidatorError(): ValidationError {
  const errorMessage = mockValidationErrorMessage();
  return new ValidationError([errorMessage]);
}
