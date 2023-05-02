export interface IController<TParams, TResult> {
  handle: (params: TParams) => Promise<ResultOrError<TResult>>;
}
