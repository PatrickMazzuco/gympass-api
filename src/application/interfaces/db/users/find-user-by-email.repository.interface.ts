import { type User } from '@/domain/entities/user.entity';

type IFindUserByEmailRepositoryParams = string;
type IFindUserByEmailRepositoryResult = User | null;

export namespace IFindUserByEmailRepository {
  export type Params = IFindUserByEmailRepositoryParams;
  export type Result = IFindUserByEmailRepositoryResult;
}

export interface IFindUserByEmailRepository {
  findByEmail: (
    email: IFindUserByEmailRepository.Params,
  ) => Promise<IFindUserByEmailRepository.Result>;
}
