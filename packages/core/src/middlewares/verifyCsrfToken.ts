import { NextFunction, Response } from 'express';
import { Request } from '../types';

export default function verifyCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientCsrf = req.cookies._csrf;
  const serverCsrf = req.session.csrfToken;

  if (serverCsrf && clientCsrf !== serverCsrf) {
    res.sendStatus(403);
  } else {
    next();
  }
}
