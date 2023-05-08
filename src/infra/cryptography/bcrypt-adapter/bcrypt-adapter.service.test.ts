import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter.service';
import { describe, it, expect } from 'vitest';

type MockValues = {
  value: string;
};

const mockValues = (): MockValues => ({
  value: 'any_value',
});

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter();
};

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should be able to hash a password', async () => {
      const sut = makeSut();
      const { value } = mockValues();

      const result = await sut.hash(value);

      const doesPasswordMatchHash = await bcrypt.compare(value, result);

      expect(doesPasswordMatchHash).toBeTruthy();
    });
  });

  describe('compare()', () => {
    it('should return true if password matches hash', async () => {
      const sut = makeSut();
      const { value } = mockValues();

      const salt = await bcrypt.genSalt();
      const hashedValue = await bcrypt.hash(value, salt);

      const result = await sut.compare({
        value,
        hashedValue,
      });

      expect(result).toBeTruthy();
    });

    it('should return false if password does not match hash', async () => {
      const sut = makeSut();
      const { value } = mockValues();

      const salt = await bcrypt.genSalt();
      const hashedValue = await bcrypt.hash(value, salt);

      const result = await sut.compare({
        value: 'wrong_password',
        hashedValue,
      });

      expect(result).toBeFalsy();
    });
  });
});
