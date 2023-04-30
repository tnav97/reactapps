import { NextFunction, Response } from 'express';
import { Types } from '@alcumus/core';

export default function requireAccessToken(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    res.sendStatus(401);
  } else {
    next();
  }
}
