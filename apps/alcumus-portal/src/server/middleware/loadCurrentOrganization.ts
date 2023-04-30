import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';

export function loadCurrentOrganization(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (req.session && req.session.currentOrganization) {
    req.initialState = {
      ...req.initialState,
      currentOrganization: {
        currentOrganization: req.session.currentOrganization,
      },
    };
  }
  next();
}
