import { RegisterUsecase } from '@/application/usecases/users/register/register.usecase';
import { RegisterController } from '@/presentation/controllers/users/register/register.controller';
import { RegisterValidator } from '@/presentation/validators/users/register.validator';

export const makeRegisterController = (): RegisterController => {
  const registerUsecase = new RegisterUsecase();
  const registerValidator = new RegisterValidator();
  const controller = new RegisterController({
    register: registerUsecase,
    validator: registerValidator,
  });

  return controller;
};
