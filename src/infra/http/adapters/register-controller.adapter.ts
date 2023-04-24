import { type RegisterController } from '@/presentation/controllers/users/register/register.controller';
import { type RegisterRequest } from '../routes/users.router';

export class RegisterControllerAdapter {
  static adapt(params: RegisterRequest): RegisterController.Params {
    const { name, email, password } = params.body;

    return {
      name,
      email,
      password,
    };
  }
}
