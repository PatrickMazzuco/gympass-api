import { type IAuthenticate } from '@/application/interfaces/users/authenticate.interface';
import { AuthenticateUsecase } from './authenticate.usecase';
import { mockFindUserByEmailRepository } from '@/tests/mocks/modules/users/users-repository.mock';
import { mockHashCompare } from '@/tests/mocks/services/hash-service.mock';
import { UsersError } from '@/application/errors/users.error';
import { type IFindUserByEmailRepository } from '@/application/interfaces/db/users/find-user-by-email.repository.interface';
import { type IHashCompare } from '@/application/interfaces/cryptography/hashCompare.interface';

function mockValues(): IAuthenticate.Params {
  return {
    email: 'any_email',
    password: 'any_password',
  };
}

type SutTypes = {
  sut: AuthenticateUsecase;
  findUserByEmailRepository: IFindUserByEmailRepository;
  passwordComparer: IHashCompare;
};

const makeSut = (): SutTypes => {
  const passwordComparer = mockHashCompare();
  const findUserByEmailRepository = mockFindUserByEmailRepository();
  const sut = new AuthenticateUsecase({
    passwordComparer,
    findUserByEmailRepository,
  });

  return {
    sut,
    passwordComparer,
    findUserByEmailRepository,
  };
};

describe('Authenticate Usecase', () => {
  it('should call find user by email repository with correct value', async () => {
    const { sut, findUserByEmailRepository } = makeSut();

    const findUserByEmailSpy = vi.spyOn(
      findUserByEmailRepository,
      'findByEmail',
    );

    findUserByEmailSpy.mockResolvedValueOnce(null);

    const params = mockValues();
    const email = params.email;

    await sut.execute(params);

    expect(findUserByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if find user by email repository throws', async () => {
    const { sut, findUserByEmailRepository } = makeSut();

    const findUserByEmailSpy = vi.spyOn(
      findUserByEmailRepository,
      'findByEmail',
    );

    findUserByEmailSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    const params = mockValues();

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow();
  });

  it('should return error if user was not found', async () => {
    const { sut, findUserByEmailRepository } = makeSut();

    const findUserByEmailSpy = vi.spyOn(
      findUserByEmailRepository,
      'findByEmail',
    );

    findUserByEmailSpy.mockResolvedValueOnce(null);

    const params = mockValues();

    const result = await sut.execute(params);

    expect(result.error).toBeTruthy();
    expect(result.error).toEqual(new UsersError.InvalidCredentials());
  });

  it('should call password hash comparer with correct values', async () => {
    const { sut, passwordComparer } = makeSut();

    const params = mockValues();
    const password = params.password;

    const passwordCompareSpy = vi.spyOn(passwordComparer, 'compare');

    await sut.execute(params);

    expect(passwordCompareSpy).toHaveBeenCalledWith({
      value: password,
      hashedValue: 'any_password',
    });
  });

  it('should throw if password hash comparer throws', async () => {
    const { sut, passwordComparer } = makeSut();

    const params = mockValues();

    const passwordCompareSpy = vi.spyOn(passwordComparer, 'compare');

    passwordCompareSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow();
  });

  it('should return error if password is incorrect', async () => {
    const { sut, passwordComparer } = makeSut();

    const params = mockValues();

    const passwordCompareSpy = vi.spyOn(passwordComparer, 'compare');

    passwordCompareSpy.mockResolvedValueOnce(false);

    const result = await sut.execute(params);

    expect(result.error).toBeTruthy();
    expect(result.error).toEqual(new UsersError.InvalidCredentials());
  });

  it('should return user id on success', async () => {
    const { sut } = makeSut();

    const params = mockValues();

    const result = await sut.execute(params);

    expect(result.data).toEqual({ id: 'any_id' });
  });
});
