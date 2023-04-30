import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import { AlcumusProducts } from '../constants';

export default async function loadAlcumusProducts(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (!req.initialState?.products) {
    req.initialState = {
      ...req.initialState,
      products: {
        products: AlcumusProducts,
      },
    };
  }
  next();
}
