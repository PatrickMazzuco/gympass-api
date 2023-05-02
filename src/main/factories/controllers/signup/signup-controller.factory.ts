import { SignupUsecase } from '@/application/usecases/users/signup/signup.usecase';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
import { PrismaUsersRepository } from '@/infra/db/prisma/repositories/prisma-users.repository';
import { SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { SignupValidator } from '@/presentation/validators/users/signup.validator';

export const makeSignupController = (): SignupController => {
  const passwordHasher = new BcryptAdapter();
  const usersRepository = new PrismaUsersRepository();
  const signupUsecase = new SignupUsecase({
    passwordHasher,
    createUserRepository: usersRepository,
    emailExistsRepository: usersRepository,
  });

  const signupValidator = new SignupValidator();

  const controller = new SignupController({
    signupUsecase,
    validator: signupValidator,
  });

  return controller;
};
