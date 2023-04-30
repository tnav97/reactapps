import { NextFunction, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { Request } from '../types';

export default function addCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const csrfToken = uuidV4();
  req.session.csrfToken = csrfToken;
  res.cookie('_csrf', csrfToken);
  next();
}
