import { type IHashCompare } from '@/application/interfaces/cryptography/hashCompare.interface';
import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';

export function mockHasher(): IHasher {
  class HasherStub implements IHasher {
    async hash(_value: string): Promise<string> {
      return 'any_hash';
    }
  }
  return new HasherStub();
}

export function mockHashCompare(): IHashCompare {
  class HashCompareStub implements IHashCompare {
    async compare(_params: IHashCompare.Params): Promise<IHashCompare.Result> {
      return true;
    }
  }

  return new HashCompareStub();
}
