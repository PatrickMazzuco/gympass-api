import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { type IEmailExistsRepository } from '@/application/interfaces/db/users/email-exists.repository.interface';

export class PrismaUsersRepository
  implements ICreateUserRepository, IEmailExistsRepository
{
  async create(
    data: ICreateUserRepository.Params,
  ): Promise<ICreateUserRepository.Result> {
    return {
      id: 'any_id',
    };
  }

  async emailExists(
    email: IEmailExistsRepository.Params,
  ): Promise<IEmailExistsRepository.Result> {
    return true;
  }
}
