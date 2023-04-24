import { type IRegister } from '@/application/interfaces/register.interface';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';
import { type IController } from '@/presentation/interfaces/controller.interface';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { type ResponseOrError } from '@/presentation/types/response-or-error.type';

type RegisterControllerInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterControllerOutput = {
  id: string;
};

type RegisterControllerConstructor = {
  register: IRegister;
  validator: IValidator<RegisterController.Params>;
};

export namespace RegisterController {
  export type Params = RegisterControllerInput;
  export type Result = RegisterControllerOutput;
  export type Config = RegisterControllerConstructor;
}

export class RegisterController
  implements IController<RegisterController.Params, RegisterController.Result>
{
  private readonly register: IRegister;
  private readonly validator: IValidator<RegisterController.Params>;

  constructor(config: RegisterController.Config) {
    this.register = config.register;
    this.validator = config.validator;
  }

  async handle(
    params: RegisterController.Params,
  ): Promise<ResponseOrError<RegisterController.Result>> {
    try {
      const error = this.validator.validate(params);

      if (error) {
        return {
          error,
        };
      }

      const { name, email, password } = params;

      const result = await this.register.execute({ name, email, password });

      return {
        data: result,
      };
    } catch (error) {
      return {
        error: new UnexpectedError(),
      };
    }
  }
}
