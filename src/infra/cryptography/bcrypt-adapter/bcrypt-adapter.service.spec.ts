import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter.service';
import { describe, it, expect } from 'vitest';

vi.mock('bcrypt', () => {
  const genSalt = async (): Promise<string> => {
    return 'any_salt';
  };

  const hash = async (): Promise<string> => {
    return 'any_hash';
  };

  return {
    default: {
      genSalt,
      hash,
    },
  };
});

type MockValues = {
  original: string;
  hashed: string;
};

const mockValues = (): MockValues => ({
  original: 'any_value',
  hashed: 'any_hash',
});

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter();
};

describe('Bcrypt Adapter', () => {
  it('should call bcrypt hash with correct value', async () => {
    const sut = makeSut();
    const valueToHash = mockValues().original;

    const bcryptGenSaltSpy = vi.spyOn(bcrypt, 'genSalt');
    const bcryptHashSpy = vi.spyOn(bcrypt, 'hash');

    await sut.hash(valueToHash);

    expect(bcryptGenSaltSpy).toBeCalledTimes(1);
    expect(bcryptHashSpy).toBeCalledWith(valueToHash, 'any_salt');
  });

  it('should throw if bcrypt hash throws', async () => {
    const sut = makeSut();
    const valueToHash = mockValues().original;

    vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.hash(valueToHash);

    await expect(promise).rejects.toThrow();
  });

  it('should return the hashed password on success', async () => {
    const sut = makeSut();
    const valueToHash = mockValues().original;

    const hashedPassword = await sut.hash(valueToHash);

    expect(hashedPassword).toEqual('any_hash');
    expect(hashedPassword).not.toEqual(valueToHash);
  });
});
