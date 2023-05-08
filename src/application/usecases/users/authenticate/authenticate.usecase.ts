import { UsersError } from '@/application/errors/users.error';
import { type IHashCompare } from '@/application/interfaces/cryptography/hashCompare.interface';
import { type IFindUserByEmailRepository } from '@/application/interfaces/db/users/find-user-by-email.repository.interface';
import { type IAuthenticate } from '@/application/interfaces/users/authenticate.interface';

export namespace AuthenticateUsecase {
  export type Constructor = {
    findUserByEmailRepository: IFindUserByEmailRepository;
    passwordComparer: IHashCompare;
  };
}

export class AuthenticateUsecase implements IAuthenticate {
  private readonly findUserByEmailRepository: IFindUserByEmailRepository;
  private readonly passwordComparer: IHashCompare;

  constructor({
    findUserByEmailRepository,
    passwordComparer,
  }: AuthenticateUsecase.Constructor) {
    this.findUserByEmailRepository = findUserByEmailRepository;
    this.passwordComparer = passwordComparer;
  }

  async execute(
    params: IAuthenticate.Params,
  ): Promise<ResultOrError<IAuthenticate.Result>> {
    const user = await this.findUserByEmailRepository.findByEmail(params.email);

    if (!user) {
      return {
        error: new UsersError.InvalidCredentials(),
      };
    }

    const doesPasswordMatch = await this.passwordComparer.compare({
      value: params.password,
      hashedValue: user.password,
    });

    if (!doesPasswordMatch) {
      return {
        error: new UsersError.InvalidCredentials(),
      };
    }

    return {
      data: {
        id: user.id,
      },
    };
  }
}
