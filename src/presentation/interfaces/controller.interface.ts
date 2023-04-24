import { type ResponseOrError } from '../types/response-or-error.type';

export interface IController<TParams, TResult> {
  handle: (params: TParams) => Promise<ResponseOrError<TResult>>;
}
