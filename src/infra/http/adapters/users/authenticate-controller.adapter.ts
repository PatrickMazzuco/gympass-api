import { type AuthenticateController } from '@/presentation/controllers/users/authenticate/authenticate.controller';
import { type AuthenticateRequest } from '../../routes/users.router';

export class AuthenticateControllerAdapter {
  static adapt(params: AuthenticateRequest): AuthenticateController.Params {
    const { email, password } = params.body;

    return {
      email,
      password,
    };
  }
}
