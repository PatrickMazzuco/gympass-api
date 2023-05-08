// import { SignupUsecase } from '@/application/usecases/users/signup/signup.usecase';
// import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
// import { PrismaUsersRepository } from '@/infra/db/prisma/repositories/prisma-users.repository';
// import { SignupController } from '@/presentation/controllers/users/signup/signup.controller';
// import { SignupValidator } from '@/presentation/validators/users/signup.validator';

import { AuthenticateUsecase } from '@/application/usecases/users/authenticate/authenticate.usecase';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
import { PrismaUsersRepository } from '@/infra/db/prisma/repositories/prisma-users.repository';
import { AuthenticateController } from '@/presentation/controllers/users/authenticate/authenticate.controller';
import { AuthenticateValidator } from '@/presentation/validators/users/authenticate.validator';

export function makeAuthenticateController(): AuthenticateController {
  const passwordComparer = new BcryptAdapter();
  const usersRepository = new PrismaUsersRepository();
  const authenticateUsecase = new AuthenticateUsecase({
    passwordComparer,
    findUserByEmailRepository: usersRepository,
  });

  const authenticateValidator = new AuthenticateValidator();

  const controller = new AuthenticateController({
    authenticateUsecase,
    validator: authenticateValidator,
  });

  return controller;
}
