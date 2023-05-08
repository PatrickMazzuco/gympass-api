import { type IAuthenticate } from '@/application/interfaces/users/authenticate.interface';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';
import { type IController } from '@/presentation/interfaces/controller.interface';
import { type IValidator } from '@/presentation/interfaces/validator.interface';

type AuthenticateControllerParams = {
  email: string;
  password: string;
};

type AuthenticateControllerResult = {
  id: string;
};

type AuthenticateControllerConstructor = {
  authenticateUsecase: IAuthenticate;
  validator: IValidator<AuthenticateController.Params>;
};

export namespace AuthenticateController {
  export type Params = AuthenticateControllerParams;
  export type Result = AuthenticateControllerResult;
  export type Config = AuthenticateControllerConstructor;
}

export class AuthenticateController
  implements
    IController<AuthenticateController.Params, AuthenticateController.Result>
{
  private readonly authenticateUsecase: IAuthenticate;
  private readonly validator: IValidator<AuthenticateController.Params>;

  constructor({
    authenticateUsecase,
    validator,
  }: AuthenticateController.Config) {
    this.authenticateUsecase = authenticateUsecase;
    this.validator = validator;
  }

  async handle(
    params: AuthenticateController.Params,
  ): Promise<ResultOrError<AuthenticateController.Result>> {
    try {
      const error = this.validator.validate(params);

      if (error) return { error };

      const { email, password } = params;

      const result = await this.authenticateUsecase.execute({
        email,
        password,
      });

      return result;
    } catch (error) {
      return {
        error: new UnexpectedError(),
      };
    }
  }
}
