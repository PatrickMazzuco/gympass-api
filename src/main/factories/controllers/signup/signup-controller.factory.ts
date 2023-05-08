import { SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { SignupValidator } from '@/presentation/validators/users/signup.validator';
import { makeSignupUsecase } from '../../usecases/signup-usecase.factory';

export const makeSignupController = (): SignupController => {
  const signupUsecase = makeSignupUsecase();

  const signupValidator = new SignupValidator();

  const controller = new SignupController({
    signupUsecase,
    validator: signupValidator,
  });

  return controller;
};
