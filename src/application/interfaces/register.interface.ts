type IRegisterInput = {
  name: string;
  email: string;
  password: string;
};

type IRegisterOutput = {
  id: string;
};

export namespace IRegister {
  export type Params = IRegisterInput;
  export type Result = IRegisterOutput;
}

export interface IRegister {
  execute: (params: IRegister.Params) => Promise<IRegister.Result>;
}
