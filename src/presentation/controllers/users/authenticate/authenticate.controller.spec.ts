import { type IAuthenticate } from '@/application/interfaces/users/authenticate.interface';
import { AuthenticateController } from './authenticate.controller';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { mockAuthenticateUsecase } from '@/tests/mocks/modules/users/users-usecases.mock';
import {
  mockValidator,
  mockValidatorError,
} from '@/tests/mocks/modules/validation/validator.mock';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';
import { MockError } from '@/tests/mocks/modules/errors/error.mock';

function mockValues(): AuthenticateController.Params {
  return {
    email: 'any_email',
    password: 'any_password',
  };
}

type SutTypes = {
  sut: AuthenticateController;
  authenticateUsecase: IAuthenticate;
  validator: IValidator<AuthenticateController.Params>;
};

const makeSut = (): SutTypes => {
  const authenticateUsecase = mockAuthenticateUsecase();
  const validator = mockValidator<AuthenticateController.Params>();
  const sut = new AuthenticateController({
    authenticateUsecase,
    validator,
  });

  return {
    sut,
    authenticateUsecase,
    validator,
  };
};

describe('Authenticate Controller', () => {
  it('should call validator with correct values', async () => {
    const { sut, validator } = makeSut();

    const params = mockValues();

    const validateSpy = vi.spyOn(validator, 'validate');
    const data = params;

    await sut.handle(params);

    expect(validateSpy).toHaveBeenCalledWith(data);
  });

  it('should return error if validator returns error', async () => {
    const { sut, validator } = makeSut();

    const params = mockValues();
    const error = mockValidatorError();

    vi.spyOn(validator, 'validate').mockReturnValueOnce(error);

    const result = await sut.handle(params);

    expect(result.error).toEqual(error);
  });

  it('should call authenticateUsecase with correct values', async () => {
    const { sut, authenticateUsecase } = makeSut();

    const params = mockValues();

    const executeSpy = vi.spyOn(authenticateUsecase, 'execute');
    const data = params;

    await sut.handle(params);

    expect(executeSpy).toHaveBeenCalledWith(data);
  });

  it('should return unexpected error if authenticateUsecase throws', async () => {
    const { sut, authenticateUsecase } = makeSut();

    const params = mockValues();

    vi.spyOn(authenticateUsecase, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const result = await sut.handle(params);

    expect(result.error).toBeDefined();
    expect(result.error).toBeInstanceOf(UnexpectedError);
  });

  it('should return error if authenticateUsecase returns error', async () => {
    const { sut, authenticateUsecase } = makeSut();

    const params = mockValues();
    const error = new MockError();

    vi.spyOn(authenticateUsecase, 'execute').mockResolvedValue({
      error,
    });

    const result = await sut.handle(params);

    expect(result.error).toEqual(error);
  });

  it('should return the user id if authenticateUsecase succeeds', async () => {
    const { sut, authenticateUsecase } = makeSut();

    const params = mockValues();
    const userId = 'any_user_id';

    vi.spyOn(authenticateUsecase, 'execute').mockResolvedValue({
      data: { id: userId },
    });

    const result = await sut.handle(params);

    expect(result.data).toBeDefined();
    expect(result.data).toEqual({ id: userId });
  });
});
