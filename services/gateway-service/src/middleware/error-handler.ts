import { HttpError } from '@chatapp/common';
import { logger } from '@/utils/logger';
import { HTTP_STATUS } from '@chatapp/common';
import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error({ err }, 'Unhandled Error occured');

  const error =
    err instanceof HttpError
      ? err
      : new HttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  const statusCode = error?.statusCode ?? 500;
  const message =
    statusCode >= 500 ? 'Internal Server Error' : (error?.message ?? 'Unknown Error! ');
  const payload = error?.details ? { message, details: error.details } : { message };
  res.status(statusCode).json(payload);
  next();
};

export { errorHandler };
