import { type IAuthenticate } from '@/application/interfaces/users/authenticate.interface';
import { type ISignup } from '@/application/interfaces/users/signup.interface';

export function mockSignupUsecase(): ISignup {
  class SignupUsecaseStub implements ISignup {
    async execute(
      _params: ISignup.Params,
    ): Promise<ResultOrError<ISignup.Result>> {
      return {
        data: {
          id: 'any_id',
        },
      };
    }
  }

  return new SignupUsecaseStub();
}

export function mockAuthenticateUsecase(): IAuthenticate {
  class AuthenticateUsecaseStub implements IAuthenticate {
    async execute(
      _params: IAuthenticate.Params,
    ): Promise<ResultOrError<IAuthenticate.Result>> {
      return {
        data: {
          id: 'any_id',
        },
      };
    }
  }

  return new AuthenticateUsecaseStub();
}
