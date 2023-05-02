import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';
import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { type IEmailExistsRepository } from '@/application/interfaces/db/users/email-exists.repository.interface';
import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { SignupUsecase } from './signup.usecase';
import { UserAlreadyExistsError } from '@/application/errors/user-already-exists.error';
import {
  mockCreateUserRepository,
  mockEmailExistsRepository,
} from '@/tests/mocks/modules/users/users-repository.mock';
import { mockHasher } from '@/tests/mocks/services/hash-service.mock';

function mockValues(): ISignup.Params {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };
}

type SutTypes = {
  sut: SignupUsecase;
  hasherStub: IHasher;
  createUserRepositoryStub: ICreateUserRepository;
  emailExistsRepositoryStub: IEmailExistsRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const createUserRepositoryStub = mockCreateUserRepository();
  const emailExistsRepositoryStub = mockEmailExistsRepository();
  const sut = new SignupUsecase({
    passwordHasher: hasherStub,
    createUserRepository: createUserRepositoryStub,
    emailExistsRepository: emailExistsRepositoryStub,
  });

  return {
    sut,
    hasherStub,
    createUserRepositoryStub,
    emailExistsRepositoryStub,
  };
};

describe('Signup Usecase', () => {
  it('should call email exists repository with correct value', async () => {
    const { sut, emailExistsRepositoryStub } = makeSut();

    const params = mockValues();

    const emailExistsSpy = vi.spyOn(emailExistsRepositoryStub, 'emailExists');
    const email = params.email;

    await sut.execute(params);

    expect(emailExistsSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if email exists repository throws', async () => {
    const { sut, emailExistsRepositoryStub } = makeSut();

    const params = mockValues();

    vi.spyOn(emailExistsRepositoryStub, 'emailExists').mockImplementationOnce(
      () => {
        throw new Error();
      },
    );

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow();
  });

  it('should return error if email already exists', async () => {
    const { sut, emailExistsRepositoryStub } = makeSut();

    const params = mockValues();

    vi.spyOn(emailExistsRepositoryStub, 'emailExists').mockReturnValueOnce(
      Promise.resolve(true),
    );

    const result = await sut.execute(params);

    expect(result.error).toEqual(new UserAlreadyExistsError());
  });

  it('should call password hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut();

    const params = mockValues();

    const hashSpy = vi.spyOn(hasherStub, 'hash');
    const valueToHash = params.password;

    await sut.execute(params);

    expect(hashSpy).toHaveBeenCalledWith(valueToHash);
  });

  it('should throw if password hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    const params = mockValues();

    vi.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow();
  });

  it('should call create user repository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();

    const params = mockValues();

    const createUserSpy = vi.spyOn(createUserRepositoryStub, 'create');
    const data = {
      name: params.name,
      email: params.email,
      password: 'any_hash',
    };

    await sut.execute(params);

    expect(createUserSpy).toHaveBeenCalledWith(data);
  });

  it('should throw if create user repository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut();

    const params = mockValues();

    vi.spyOn(createUserRepositoryStub, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow();
  });

  it('should return user id on success', async () => {
    const { sut } = makeSut();

    const params = mockValues();

    const result = await sut.execute(params);

    expect(result.data).toEqual({ id: 'any_id' });
  });
});
