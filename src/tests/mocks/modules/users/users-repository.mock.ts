import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { type IEmailExistsRepository } from '@/application/interfaces/db/users/email-exists.repository.interface';
import { type IFindUserByEmailRepository } from '@/application/interfaces/db/users/find-user-by-email.repository.interface';
import { type User } from '@/domain/entities/user.entity';

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

export function mockFindUserByEmailRepository(): IFindUserByEmailRepository {
  class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };
    }
  }
  return new FindUserByEmailRepositoryStub();
}
