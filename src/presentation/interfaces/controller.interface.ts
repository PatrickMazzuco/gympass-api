import { type ResultOrError } from '../types/result-or-error.type';

export interface IController<TParams, TResult> {
  handle: (params: TParams) => Promise<ResultOrError<TResult>>;
}
