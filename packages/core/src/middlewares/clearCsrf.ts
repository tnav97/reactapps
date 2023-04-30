import { NextFunction, Response } from 'express';
import { Request } from '../types';

export default function clearCsrf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.session.csrfToken = undefined;
  res.clearCookie('_csrf');
  next();
}
