import { type IAuthenticate } from '@/application/interfaces/users/authenticate.interface';
import { AuthenticateUsecase } from '@/application/usecases/users/authenticate/authenticate.usecase';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
import { PrismaUsersRepository } from '@/infra/db/prisma/repositories/prisma-users.repository';

export function makeAuthenticateUsecase(): IAuthenticate {
  const passwordComparer = new BcryptAdapter();
  const usersRepository = new PrismaUsersRepository();
  const usecase = new AuthenticateUsecase({
    passwordComparer,
    findUserByEmailRepository: usersRepository,
  });

  return usecase;
}
