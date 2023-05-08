// import { SignupUsecase } from '@/application/usecases/users/signup/signup.usecase';
// import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter.service';
// import { PrismaUsersRepository } from '@/infra/db/prisma/repositories/prisma-users.repository';
// import { SignupController } from '@/presentation/controllers/users/signup/signup.controller';
// import { SignupValidator } from '@/presentation/validators/users/signup.validator';

import { AuthenticateController } from '@/presentation/controllers/users/authenticate/authenticate.controller';
import { AuthenticateValidator } from '@/presentation/validators/users/authenticate.validator';
import { makeAuthenticateUsecase } from '../../usecases/authenticate-usecase.factory';

export function makeAuthenticateController(): AuthenticateController {
  const authenticateUsecase = makeAuthenticateUsecase();

  const authenticateValidator = new AuthenticateValidator();

  const controller = new AuthenticateController({
    authenticateUsecase,
    validator: authenticateValidator,
  });

  return controller;
}
