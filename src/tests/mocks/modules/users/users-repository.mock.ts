import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { type IEmailExistsRepository } from '@/application/interfaces/db/users/email-exists.repository.interface';

export function mockCreateUserRepository(): ICreateUserRepository {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create(_data: any): Promise<any> {
      return {
        id: 'any_id',
      };
    }
  }
  return new CreateUserRepositoryStub();
}

export function mockEmailExistsRepository(): IEmailExistsRepository {
  class EmailExistsRepositoryStub implements IEmailExistsRepository {
    async emailExists(_email: string): Promise<boolean> {
      return false;
    }
  }
  return new EmailExistsRepositoryStub();
}
