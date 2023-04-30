import { Request } from '../sessionTypes';
import { NextFunction, Response } from 'express';

export default async function loadSessionVariables(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const transferredSession = req.session.transferredSession;
  if (!req.initialState?.review && transferredSession) {
    req.initialState = {
      ...req.initialState,
      review: {
        ...req.initialState?.review,
        seats: transferredSession.seats,
        minSeats: transferredSession.seats,
        accountHolderEmail: transferredSession.accountHolderEmail,
        accountHolderName: transferredSession.accountHolderName,
      },
      confirmation: {
        ...req.initialState?.confirmation,
        checkoutSessionId: req.session.checkoutSessionId,
      },
    };
  }
  next();
}
