import { type ISignup } from '@/application/interfaces/users/signup.interface';
import { SignupController } from './signup.controller';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { mockSignupUsecase } from '@/tests/mocks/modules/users/users-usecases.mock';
import {
  mockValidator,
  mockValidatorError,
} from '@/tests/mocks/modules/validation/validator.mock';
import { UnexpectedError } from '@/presentation/errors/unexpected.error';
import { MockError } from '@/tests/mocks/modules/errors/error.mock';

function mockValues(): SignupController.Params {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };
}

type SutTypes = {
  sut: SignupController;
  signupUsecase: ISignup;
  validator: IValidator<SignupController.Params>;
};

const makeSut = (): SutTypes => {
  const signupUsecase = mockSignupUsecase();
  const validator = mockValidator<SignupController.Params>();
  const sut = new SignupController({
    signupUsecase,
    validator,
  });

  return {
    sut,
    signupUsecase,
    validator,
  };
};

describe('Signup Controller', () => {
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

  it('should call signupUsecase with correct values', async () => {
    const { sut, signupUsecase } = makeSut();

    const params = mockValues();

    const executeSpy = vi.spyOn(signupUsecase, 'execute');
    const data = params;

    await sut.handle(params);

    expect(executeSpy).toHaveBeenCalledWith(data);
  });

  it('should return unexpected error if signupUsecase throws', async () => {
    const { sut, signupUsecase } = makeSut();

    const params = mockValues();

    vi.spyOn(signupUsecase, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const result = await sut.handle(params);

    expect(result.error).toBeDefined();
    expect(result.error).toBeInstanceOf(UnexpectedError);
  });

  it('should return error if signupUsecase returns error', async () => {
    const { sut, signupUsecase } = makeSut();

    const params = mockValues();
    const error = new MockError();

    vi.spyOn(signupUsecase, 'execute').mockResolvedValue({
      error,
    });

    const result = await sut.handle(params);

    expect(result.error).toEqual(error);
  });

  it('should return the user id if signupUsecase succeeds', async () => {
    const { sut, signupUsecase } = makeSut();

    const params = mockValues();
    const userId = 'any_user_id';

    vi.spyOn(signupUsecase, 'execute').mockResolvedValue({
      data: { id: userId },
    });

    const result = await sut.handle(params);

    expect(result.data).toBeDefined();
    expect(result.data).toEqual({ id: userId });
  });
});
