import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { SignupUsecase } from '@/application/usecases/users/signup/signup.usecase';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
import { PrismaUsersRepository } from '@/infra/db/prisma/repositories/prisma-users.repository';

export function makeSignupUsecase(): ISignup {
  const passwordHasher = new BcryptAdapter();
  const usersRepository = new PrismaUsersRepository();
  const usecase = new SignupUsecase({
    passwordHasher,
    createUserRepository: usersRepository,
    emailExistsRepository: usersRepository,
  });

  return usecase;
}
