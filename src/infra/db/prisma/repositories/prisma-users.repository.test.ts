import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { clearPrismaDatabase } from '../tests/utils';
import { PrismaUsersRepository } from './prisma-users.repository';

beforeEach(async () => {
  await clearPrismaDatabase();
});

function makeSut(): PrismaUsersRepository {
  return new PrismaUsersRepository();
}

describe('PrismaUsersRepository', () => {
  describe('create()', () => {
    it('should create a user', async () => {
      const sut = makeSut();
      const params: ICreateUserRepository.Params = {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };

      const result = await sut.create(params);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
        }),
      );
    });

    it('should throw an error if email already exists', async () => {
      const sut = makeSut();
      const params: ICreateUserRepository.Params = {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };

      await sut.create(params);

      await expect(sut.create(params)).rejects.toThrow();
    });
  });

  describe('emailExists()', () => {
    it('should return true if email exists', async () => {
      const sut = makeSut();
      const params: ICreateUserRepository.Params = {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };

      await sut.create(params);

      const result = await sut.emailExists(params.email);

      expect(result).toBe(true);
    });

    it('should return false if email does not exist', async () => {
      const sut = makeSut();
      const params: ICreateUserRepository.Params = {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };

      const result = await sut.emailExists(params.email);

      expect(result).toBe(false);
    });
  });
});
