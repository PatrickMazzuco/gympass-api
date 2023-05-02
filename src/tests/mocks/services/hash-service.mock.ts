import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';

export function mockHasher(): IHasher {
  class HasherStub implements IHasher {
    async hash(_value: string): Promise<string> {
      return 'any_hash';
    }
  }
  return new HasherStub();
}
