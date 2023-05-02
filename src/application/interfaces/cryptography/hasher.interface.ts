type IHasherParams = string;
type IHasherResult = string;

export namespace IHasher {
  export type Params = IHasherParams;
  export type Result = IHasherResult;
}

export interface IHasher {
  hash: (value: IHasher.Params) => Promise<IHasher.Result>;
}
