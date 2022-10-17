import { GuardedType, Sentinel } from '@Shared/types/common.cd';
import HttpException from '@Shared/utils/http-exceptions';

export const isOfType = <T extends Sentinel>(
  sentinel: T,
  value: unknown
): value is GuardedType<T> => typeof value === sentinel;

export const isErrorObject = (error: unknown): error is Error => {
  const isObject = isOfType('object', error);
  return isObject ? 'message' in error && 'stack' in error : false;
};

export const isHttpException = (error: unknown): error is HttpException => {
  const isObject = isOfType('object', error);
  return isObject
    ? 'code' in error && 'success' in error && error instanceof HttpException
    : false;
};
