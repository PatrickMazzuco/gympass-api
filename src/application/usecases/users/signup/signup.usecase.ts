import { UserAlreadyExistsError } from '@/application/errors/user-already-exists.error';
import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';
import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { type IEmailExistsRepository } from '@/application/interfaces/db/users/email-exists.repository.interface';
import { type ISignup } from '@/application/interfaces/users/signup.interface';

type SignupUsecaseConstructor = {
  passwordHasher: IHasher;
  createUserRepository: ICreateUserRepository;
  emailExistsRepository: IEmailExistsRepository;
};

export namespace SignupUsecase {
  export type Config = SignupUsecaseConstructor;
}
export class SignupUsecase implements ISignup {
  private readonly passwordHasher: IHasher;
  private readonly createUserRepository: ICreateUserRepository;
  private readonly emailExistsRepository: IEmailExistsRepository;

  constructor(config: SignupUsecase.Config) {
    this.passwordHasher = config.passwordHasher;
    this.createUserRepository = config.createUserRepository;
    this.emailExistsRepository = config.emailExistsRepository;
  }

  async execute({
    name,
    email,
    password,
  }: ISignup.Params): Promise<ResultOrError<ISignup.Result>> {
    const emailAlreadyExists = await this.emailExistsRepository.emailExists(
      email,
    );

    if (emailAlreadyExists) {
      return {
        error: new UserAlreadyExistsError(),
      };
    }

    const hashedPassword = await this.passwordHasher.hash(password);

    const { id } = await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      data: {
        id,
      },
    };
  }
}
