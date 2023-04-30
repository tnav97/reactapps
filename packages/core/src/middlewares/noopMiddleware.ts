import { NextFunction, Response } from 'express';
import { Request } from '../types';

/**
 * A no-op middleware, does nothing :)
 * @param req
 * @param res
 * @param next
 */
export default function noopMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
