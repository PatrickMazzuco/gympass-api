type Result<T> = {
  data: T;
  error?: never;
};

type Error<E> = {
  data?: never;
  error: E;
};

export type Response<T, E> = Result<T> | Error<E>;
