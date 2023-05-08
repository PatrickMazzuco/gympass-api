import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { clearPrismaDatabase } from '../tests/utils';
import { PrismaUsersRepository } from './prisma-users.repository';
import { mockUserEntiry } from '@/tests/mocks/modules/users/user.entity.mock';

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
      const mockUser = mockUserEntiry();
      const params: ICreateUserRepository.Params = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
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
      const mockUser = mockUserEntiry();
      const params: ICreateUserRepository.Params = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      };

      await sut.create(params);

      await expect(sut.create(params)).rejects.toThrow();
    });
  });

  describe('emailExists()', () => {
    it('should return true if email exists', async () => {
      const sut = makeSut();
      const mockUser = mockUserEntiry();
      const createUserParams: ICreateUserRepository.Params = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      };

      await sut.create(createUserParams);

      const result = await sut.emailExists(createUserParams.email);

      expect(result).toBe(true);
    });

    it('should return false if email does not exist', async () => {
      const sut = makeSut();
      const mockUser = mockUserEntiry();
      const createUserParams: ICreateUserRepository.Params = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      };

      const result = await sut.emailExists(createUserParams.email);

      expect(result).toBe(false);
    });
  });

  describe('findByEmail()', () => {
    it('should return a user if email exists', async () => {
      const sut = makeSut();
      const mockUser = mockUserEntiry();
      const createUserParams: ICreateUserRepository.Params = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      };

      await sut.create(createUserParams);

      const result = await sut.findByEmail(createUserParams.email);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: createUserParams.name,
          email: createUserParams.email,
          password: expect.any(String),
        }),
      );
    });

    it('should return null if email does not exist', async () => {
      const sut = makeSut();
      const mockUser = mockUserEntiry();
      const createUserParams: ICreateUserRepository.Params = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      };

      await sut.create(createUserParams);

      const result = await sut.findByEmail('invalid_email@test.com');

      expect(result).toBe(null);
    });
  });
});
