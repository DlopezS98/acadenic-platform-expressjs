import { GuardedType, Sentinel } from '@Shared/types/common.cd';

export const isOfType = <T extends Sentinel>(
  sentinel: T,
  value: unknown
): value is GuardedType<T> => typeof value === sentinel;

export const isErrorObject = (error: unknown): error is Error => {
  const isObject = isOfType('object', error);
  return isObject ? 'message' in error && 'stack' in error : false;
};
