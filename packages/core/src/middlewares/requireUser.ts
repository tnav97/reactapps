import { NextFunction, Response } from 'express';
import { Request } from '../types';

export default function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId || !req.user?.userId) {
    res.sendStatus(401);
  } else {
    next();
  }
}
