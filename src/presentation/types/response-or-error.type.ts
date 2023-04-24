import { type Response } from '@/common/types/response.type';
import { type BaseError } from '../errors/base.error';

export type ResponseOrError<T> = Response<T, BaseError>;
