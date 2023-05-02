import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';
import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { type ResultOrError } from '@/presentation/types/result-or-error.type';

type SignupUsecaseConstructor = {
  passwordHasher: IHasher;
};

export namespace SignupUsecase {
  export type Config = SignupUsecaseConstructor;
}
export class SignupUsecase implements ISignup {
  private readonly passwordHasher: IHasher;
  constructor(config: SignupUsecase.Config) {
    this.passwordHasher = config.passwordHasher;
  }

  async execute(
    params: ISignup.Params,
  ): Promise<ResultOrError<ISignup.Result>> {
    const { name, email, password } = params;

    const hashedPassword = await this.passwordHasher.hash(password);

    console.log({
      name,
      email,
      password,
      hashedPassword,
    });

    return {
      data: {
        id: '123',
      },
    };
  }
}
