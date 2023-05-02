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
