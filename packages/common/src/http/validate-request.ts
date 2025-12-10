import { z } from 'zod';
import { HttpError } from '../errors/http-error';
import type { Response, Request, NextFunction } from 'express';
import type { AnyZodObject, ZodError, ZodTypeAny } from 'zod';

type Schema = AnyZodObject | ZodTypeAny;

export interface RequestValidationSchemas {
  body?: Schema;
  params?: Schema;
  query?: Schema;
}

const formattedErrors = (error: ZodError) =>
  error.errors.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const parsedBody = schemas.body.parse(req.body);
        req.body = parsedBody;
      }
      if (schemas.params) {
        const parsedParams = schemas.params.parse(req.params);
        req.params = parsedParams as Request['params'];
      }
      if (schemas.query) {
        const parsedQuery = schemas.query.parse(req.query);
        req.query = parsedQuery as Request['query'];
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpError(422, 'Validation failed', {
          errors: formattedErrors(error),
        });
      }
      next(error);
    }
  };
};
