type IEmailExistsRepositoryParams = string;
type IEmailExistsRepositoryResult = boolean;

export namespace IEmailExistsRepository {
  export type Params = IEmailExistsRepositoryParams;
  export type Result = IEmailExistsRepositoryResult;
}

export interface IEmailExistsRepository {
  emailExists: (
    email: IEmailExistsRepository.Params,
  ) => Promise<IEmailExistsRepository.Result>;
}
