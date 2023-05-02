import { type IHasher } from '@/application/interfaces/cryptography/hasher.interface';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements IHasher {
  async hash(value: IHasher.Params): Promise<IHasher.Result> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }
}
