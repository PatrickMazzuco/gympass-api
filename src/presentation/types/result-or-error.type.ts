import { type Response } from '@/common/types/response.type';
import { type BaseError } from '@/common/errors/base.error';

export type ResultOrError<T> = Response<T, BaseError>;
