import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import { EnvVariables } from '../constants';

/**
 * A middleware function that applies feature toggles looking at the environment.
 * This middleware is pluggable to any route handler.
 * @returns Middleware function that will evaluate environment variables to apply feature toggles
 */
export default function applyFeatureToggles(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  const {
    logout,
    p: productCode,
    cu: callbackUrl,
    rp: redirectPath,
  } = req.query;

  const requiresRedirectAfterAuth =
    (logout && redirectPath) || (productCode && callbackUrl && redirectPath);

  // Disable portal features based on feature toggle value set in environment variables
  if (
    EnvVariables.SafetyIntelligenceWebHost &&
    EnvVariables.FeatureToggles.DisableDirectPortalLogin &&
    !requiresRedirectAfterAuth
  ) {
    res.redirect(EnvVariables.SafetyIntelligenceWebHost, 307);
  } else {
    next();
  }
}
