import { type SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { type SignupRequest } from '../../routes/users.router';

export class SignupControllerAdapter {
  static adapt(params: SignupRequest): SignupController.Params {
    const { name, email, password } = params.body;

    return {
      name,
      email,
      password,
    };
  }
}
