import { NextFunction, Response } from 'express';
import { RequestHeaders } from '../constants';
import { Request } from '../types';

export default function requireTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req.headers[RequestHeaders.AccessToken] ||
    !req.headers[RequestHeaders.RefreshToken]
  ) {
    res.sendStatus(401);
  } else {
    next();
  }
}
