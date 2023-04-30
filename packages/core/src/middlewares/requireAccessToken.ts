import { NextFunction, Response } from 'express';
import { RequestHeaders } from '../constants';
import { Request } from '../types';

export default function requireAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers[RequestHeaders.AccessToken] && !req.session?.accessToken) {
    res.sendStatus(401);
  } else {
    next();
  }
}
