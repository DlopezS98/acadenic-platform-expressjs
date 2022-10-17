import { IHttpResponse } from '@Shared/types/common.cd';
import HttpStatusCodes from '@Shared/types/http-status-codes';

export function Ok(message: string): IHttpResponse;
export function Ok<T>(message: string, data: T): IHttpResponse<T>;
export function Ok<T>(message: string, data?: T): IHttpResponse<T> {
  const response: IHttpResponse<T> = {
    code: HttpStatusCodes.Ok,
    message,
    success: true,
    data,
  };

  return response;
}

export function BadRequest(message: string): IHttpResponse;
export function BadRequest<T>(message: string, data: T): IHttpResponse<T>;
export function BadRequest<T>(message: string, data?: T): IHttpResponse<T> {
  return {
    code: HttpStatusCodes.BadRequest,
    message,
    data,
    success: false,
  };
}

export function Unauthorized(message: string): IHttpResponse;
export function Unauthorized<T>(message: string, data: T): IHttpResponse<T>;
export function Unauthorized<T>(message: string, data?: T): IHttpResponse<T> {
  return {
    code: HttpStatusCodes.Unauthorized,
    message,
    data,
    success: false,
  };
}

export function InternalServerError(): IHttpResponse; 
export function InternalServerError(message: string): IHttpResponse; 
export function InternalServerError<T>(message: string, data: T): IHttpResponse<T>; 
export function InternalServerError<T>(message?: string, data?: T): IHttpResponse<T> {
  return {
    code: HttpStatusCodes.InternalServerError,
    message: message ?? 'Unexpected internal server error',
    success: false,
    data
  };
}