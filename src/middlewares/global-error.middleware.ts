import {
  isErrorObject,
  isHttpException,
} from '@Shared/guards/common-types.guard';
import { GenericObject, IHttpResponse } from '@Shared/types/common.cd';
import HttpStatusCodes from '@Shared/types/http-status-codes';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const globalErrorMiddleware = (
  error: unknown,
  req: Request,
  res: Response<IHttpResponse<GenericObject | undefined>>,
  next: NextFunction
): void => {
  if (isHttpException(error)) {
    res.status(error.code).json({
      message: error.message,
      code: error.code,
      data: error.data,
      success: false,
    });

    return next();
  }

  if (isErrorObject(error)) {
    res.status(HttpStatusCodes.InternalServerError).json({
      message: error.message,
      code: HttpStatusCodes.InternalServerError,
      data: { error },
      success: false,
    });

    return next();
  }

  res.status(HttpStatusCodes.InternalServerError).json({
    message: 'Unexpected internal server error!',
    code: HttpStatusCodes.InternalServerError,
    success: false,
    data: { error }
  });


  return next();
};

export default globalErrorMiddleware as ErrorRequestHandler;
