import { type IHashCompare } from '@/application/interfaces/cryptography/hashCompare.interface';
import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements IHasher, IHashCompare {
  async hash(value: IHasher.Params): Promise<IHasher.Result> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }

  async compare({
    value,
    hashedValue,
  }: IHashCompare.Params): Promise<IHashCompare.Result> {
    const isValid = await bcrypt.compare(value, hashedValue);

    return isValid;
  }
}
