import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { type ResultOrError } from '@/presentation/types/result-or-error.type';

export class SignupUsecase implements ISignup {
  async execute(
    params: ISignup.Params,
  ): Promise<ResultOrError<ISignup.Result>> {
    const { name, email, password } = params;

    console.log(name, email, password);

    return {
      data: {
        id: '123',
      },
    };
  }
}
