import { SignupUsecase } from '@/application/usecases/users/signup/signup.usecase';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
import { SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { SignupValidator } from '@/presentation/validators/users/signup.validator';

export const makeSignupController = (): SignupController => {
  const passwordHasher = new BcryptAdapter();
  const signupUsecase = new SignupUsecase({
    passwordHasher,
  });
  const signupValidator = new SignupValidator();
  const controller = new SignupController({
    signup: signupUsecase,
    validator: signupValidator,
  });

  return controller;
};
