import { SignupUsecase } from '@/application/usecases/users/signup/signup.usecase';
import { SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { SignupValidator } from '@/presentation/validators/users/signup.validator';

export const makeSignupController = (): SignupController => {
  const signupValidator = new SignupValidator();
  const signupUsecase = new SignupUsecase();
  const controller = new SignupController({
    signup: signupUsecase,
    validator: signupValidator,
  });

  return controller;
};
