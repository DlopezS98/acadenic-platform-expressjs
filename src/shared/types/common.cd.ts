import HttpStatusCodes from './http-status-codes';

export type ObjectKeys<T> = keyof T;

export interface TypeOfMap {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
  bigint: bigint;
  symbol: symbol;
  undefined: undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  function: Function;
}

export type Sentinel = ObjectKeys<TypeOfMap>;
export type GuardedType<T extends Sentinel> = TypeOfMap[T];

export interface IHttpResponse<T = null> {
  code: HttpStatusCodes;
  message: string;
  success: boolean;
  data?: T;
}

export type HttpRequestOptions<T> = Partial<Omit<IHttpResponse<T>, 'success'>>;

export type OptionalKeysOf<T> = {
  [K in keyof T]: Record<string, unknown> extends Pick<T, K> ? K : never;
}[keyof T];
/** Exclude required properties and get only the optional & turn them as required... */
export type OptionalKeys<T> = Required<Pick<T, OptionalKeysOf<T>>>;
/** Filter optinal properties and get only the required... */
export type RequiredKeys<T> = Omit<T, OptionalKeysOf<T>>;
/** Get a type with a specific property as optional */
export type PartialBy<T, K extends ObjectKeys<T>> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type MimeTypes =
  | 'application/pdf'
  | 'image/png'
  | 'video/mp4'
  | 'image/jpeg';
export type GenericObject = Record<string, unknown>;
