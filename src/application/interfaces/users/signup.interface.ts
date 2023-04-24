import { type ResultOrError } from '@/presentation/types/result-or-error.type';

type ISignupParams = {
  name: string;
  email: string;
  password: string;
};

type ISignupResult = {
  id: string;
};

export namespace ISignup {
  export type Params = ISignupParams;
  export type Result = ISignupResult;
}

export interface ISignup {
  execute: (params: ISignup.Params) => Promise<ResultOrError<ISignup.Result>>;
}
