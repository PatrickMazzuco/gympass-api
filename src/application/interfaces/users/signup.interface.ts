import { type ResultOrError } from '@/presentation/types/result-or-error.type';

type ISignupInput = {
  name: string;
  email: string;
  password: string;
};

type ISignupOutput = {
  id: string;
};

export namespace ISignup {
  export type Params = ISignupInput;
  export type Result = ISignupOutput;
}

export interface ISignup {
  execute: (params: ISignup.Params) => Promise<ResultOrError<ISignup.Result>>;
}
