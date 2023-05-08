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

  const compare = async (): Promise<boolean> => {
    return true;
  };

  return {
    default: {
      genSalt,
      hash,
      compare,
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
  describe('hash()', () => {
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

  describe('compare()', () => {
    it('should call bcrypt compare with correct values', async () => {
      const sut = makeSut();
      const { original, hashed } = mockValues();

      const bcryptCompareSpy = vi.spyOn(bcrypt, 'compare');

      await sut.compare({ value: original, hashedValue: hashed });

      expect(bcryptCompareSpy).toBeCalledWith(original, hashed);
    });

    it('should throw if bcrypt compare throws', async () => {
      const sut = makeSut();
      const { original, hashed } = mockValues();

      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.compare({ value: original, hashedValue: hashed });

      await expect(promise).rejects.toThrow();
    });

    it('should return true if bcrypt compare returns true', async () => {
      const sut = makeSut();
      const { original, hashed } = mockValues();

      const result = await sut.compare({
        value: original,
        hashedValue: hashed,
      });

      expect(result).toBeTruthy();
    });
  });
});
