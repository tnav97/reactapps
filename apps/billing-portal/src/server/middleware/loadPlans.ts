import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import { getPlans } from '../models/ECMS/productPlans';

/**
 * Preload plans from Billing Service into Redux state
 *
 * TODO: Use URL path element to figure out which product's plans to fetch
 * TODO: Use Redis to cache API calls
 *
 * @param req
 * @param res
 * @param next
 */
export default async function loadPlans(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (!req.initialState?.plans) {
    req.initialState = {
      ...req.initialState,
      plans: await getPlans(),
    };
  }
  next();
}
