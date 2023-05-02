import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';
import { type IController } from '@/presentation/interfaces/controller.interface';
import { type IValidator } from '@/presentation/interfaces/validator.interface';

type SignupControllerParams = {
  name: string;
  email: string;
  password: string;
};

type SignupControllerResult = {
  id: string;
};

type SignupControllerConstructor = {
  signupUsecase: ISignup;
  validator: IValidator<SignupController.Params>;
};

export namespace SignupController {
  export type Params = SignupControllerParams;
  export type Result = SignupControllerResult;
  export type Config = SignupControllerConstructor;
}

export class SignupController
  implements IController<SignupController.Params, SignupController.Result>
{
  private readonly signupUsecase: ISignup;
  private readonly validator: IValidator<SignupController.Params>;

  constructor({ signupUsecase, validator }: SignupController.Config) {
    this.signupUsecase = signupUsecase;
    this.validator = validator;
  }

  async handle(
    params: SignupController.Params,
  ): Promise<ResultOrError<SignupController.Result>> {
    try {
      const error = this.validator.validate(params);

      if (error) return { error };

      const { name, email, password } = params;

      const result = await this.signupUsecase.execute({
        name,
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
