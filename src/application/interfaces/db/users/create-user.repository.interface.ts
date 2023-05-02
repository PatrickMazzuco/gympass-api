type ICreateUserRepositoryParams = {
  name: string;
  email: string;
  password: string;
};
type ICreateUserRepositoryResult = {
  id: string;
};

export namespace ICreateUserRepository {
  export type Params = ICreateUserRepositoryParams;
  export type Result = ICreateUserRepositoryResult;
}

export interface ICreateUserRepository {
  create: (
    data: ICreateUserRepository.Params,
  ) => Promise<ICreateUserRepository.Result>;
}
