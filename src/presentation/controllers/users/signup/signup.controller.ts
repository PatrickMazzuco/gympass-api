import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';
import { type IController } from '@/presentation/interfaces/controller.interface';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { type ResultOrError } from '@/presentation/types/result-or-error.type';

type SignupControllerInput = {
  name: string;
  email: string;
  password: string;
};

type SignupControllerOutput = {
  id: string;
};

type SignupControllerConstructor = {
  signup: ISignup;
  validator: IValidator<SignupController.Params>;
};

export namespace SignupController {
  export type Params = SignupControllerInput;
  export type Result = SignupControllerOutput;
  export type Config = SignupControllerConstructor;
}

export class SignupController
  implements IController<SignupController.Params, SignupController.Result>
{
  private readonly signup: ISignup;
  private readonly validator: IValidator<SignupController.Params>;

  constructor(config: SignupController.Config) {
    this.signup = config.signup;
    this.validator = config.validator;
  }

  async handle(
    params: SignupController.Params,
  ): Promise<ResultOrError<SignupController.Result>> {
    try {
      const error = this.validator.validate(params);

      if (error) {
        return {
          error,
        };
      }

      const { name, email, password } = params;

      const result = await this.signup.execute({ name, email, password });

      return result;
    } catch (error) {
      return {
        error: new UnexpectedError(),
      };
    }
  }
}
