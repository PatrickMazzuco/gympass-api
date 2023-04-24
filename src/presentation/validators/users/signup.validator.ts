import { type BaseError } from '@/common/errors/base.error';
import { type SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { MissingParamError } from '@/presentation/errors/missing-param.error';
import { WeakPasswordError } from '@/presentation/errors/weak-password.error';
import { type IValidator } from '@/presentation/interfaces/validator.interface';

export class SignupValidator implements IValidator<SignupController.Params> {
  validate(params: SignupController.Params): BaseError | null {
    const { name, email, password } = params;

    if (!name) {
      return new MissingParamError('name');
    }

    if (!email) {
      return new MissingParamError('email');
    }

    if (!password) {
      return new MissingParamError('password');
    }

    // Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
    const strongPasswordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return new WeakPasswordError();
    }

    return null;
  }
}
