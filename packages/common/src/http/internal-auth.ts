import type { RequestHandler } from 'express';
import { HttpError } from '../errors/http-error';

export interface InternalAuthOptions {
  headerName?: string;
  pathsToBeIgnored?: string[]; // Arary of paths to be ignored for authenticatoin.
}

const DEFAUTL_HEADER_NAME = 'x-internal-token';

export const createInternalAuthMiddleware = (
  expectedToken: string,
  options: InternalAuthOptions,
): RequestHandler => {
  const headerName = options.headerName?.toLowerCase() ?? DEFAUTL_HEADER_NAME;
  const pathsToBeIgnored = new Set(options.pathsToBeIgnored ?? []);

  return (req, _, next) => {
    if (pathsToBeIgnored.has(req.path)) {
      next();
      return;
    }
    const provided = req.headers[headerName];
    const token = Array.isArray(provided) ? provided[0] : provided;
    if (typeof token !== 'string' || token !== expectedToken) {
      next(new HttpError(401, 'Unauthorized'));
      return;
    }
    next();
  };
};
