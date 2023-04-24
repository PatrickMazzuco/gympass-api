import { type IRegister } from '@/application/interfaces/register.interface';

export class RegisterUsecase implements IRegister {
  async execute(params: IRegister.Params): Promise<IRegister.Result> {
    const { name, email, password } = params;

    console.log(name, email, password);

    return {
      id: '123',
    };
  }
}
