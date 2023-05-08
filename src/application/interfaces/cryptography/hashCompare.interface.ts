type IHashCompareParams = {
  value: string;
  hashedValue: string;
};

type IHashCompareResult = boolean;

export namespace IHashCompare {
  export type Params = IHashCompareParams;
  export type Result = IHashCompareResult;
}

export interface IHashCompare {
  compare: (value: IHashCompare.Params) => Promise<IHashCompare.Result>;
}
