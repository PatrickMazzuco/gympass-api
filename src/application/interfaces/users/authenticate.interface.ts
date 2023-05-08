type IAuthenticateParams = {
  email: string;
  password: string;
};

type IAuthenticateResult = {
  id: string;
};

export namespace IAuthenticate {
  export type Params = IAuthenticateParams;
  export type Result = IAuthenticateResult;
}

export interface IAuthenticate {
  execute: (
    params: IAuthenticate.Params,
  ) => Promise<ResultOrError<IAuthenticate.Result>>;
}
