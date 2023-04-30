import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import { EnvVariables } from '../constants';

export default function loadFeatures(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (!req.initialState?.features) {
    req.initialState = {
      ...req.initialState,
      features: {
        disablePortalFeatures:
          EnvVariables.FeatureToggles.DisableDirectPortalLogin,
        useAzureAd: EnvVariables.FeatureToggles.UseAzureAd,
      },
    };
  }
  next();
}
