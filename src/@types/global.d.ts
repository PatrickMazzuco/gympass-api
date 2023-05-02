export {};

type Result<T> = {
  data: T;
  error?: never;
};

type Error<E> = {
  data?: never;
  error: E;
};

declare global {
  type Optional<T> = T | null;
  type Response<T, E> = Result<T> | Error<E>;
  type ResultOrError<T> = Response<T, BaseError>;
}
