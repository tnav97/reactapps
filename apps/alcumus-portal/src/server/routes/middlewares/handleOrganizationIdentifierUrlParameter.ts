import { NextFunction, Response } from 'express';
import { EnvVariables } from '../../constants';
import OauthClient from '../../../lib/clients/oauth';
import { Types } from '@alcumus/core';

// todo determine if this function is adding value or not.
export async function redirectToOrganizationAuthPageIfExists(
  req: Types.Request,
  response: Response,
  next: NextFunction
) {
  const organizationIdentifier = req.query.oi as string | undefined;
  if (EnvVariables.FeatureToggles.UseAzureAd && organizationIdentifier) {
    try {
      const oauthClient = new OauthClient(EnvVariables.ServicesApiKey);
      const authUrl = await oauthClient.getLoginEndpoint(
        organizationIdentifier
      );
      req.initialState = {
        ...req.initialState,
        auth: {
          ...req.initialState?.auth,
          authUrl,
        },
      };
    } catch (err: any) {
      next();
    }
  }
  next();
}

export async function redirectToOrganizationAuthPageOrFail(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (EnvVariables.FeatureToggles.UseAzureAd) {
    try {
      const oauthClient = new OauthClient(EnvVariables.ServicesApiKey);
      const authUrl = await oauthClient.getLoginEndpoint(
        req.query.oi as string
      );
      req.initialState = {
        ...req.initialState,
        auth: {
          ...req.initialState?.auth,
          authUrl,
        },
      };
    } catch (err: any) {
      console.error(err.message, err.stack);
      return res.sendStatus(err.status === 404 ? 404 : 500);
    }
  }
  next();
}
