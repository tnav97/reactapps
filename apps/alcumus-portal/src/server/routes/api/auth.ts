import { NextFunction, Response, Router } from 'express';
import { Middlewares, Types } from '@alcumus/core';
import { AuthenticationError } from '../../errors/AuthenticationError';
import {
  getLoggedInUserProfile,
  logoutUser,
  registerUser,
  verifyCredentials,
} from '../../models/account';
import OauthClient from '../../../lib/clients/oauth';
import { EnvVariables } from '../../constants';
import { getOauthUrl, validateToken } from '../../models/authentication';
import { getOrganizationById } from '../../models/organizations';
import { getAccessToken, ROOT_TENANT_ID } from '../../../lib/utils';

async function setUserProfileInSession(
  req: Types.Request,
  accessToken: string,
  refreshToken: string
) {
  const { id, ...profile } = await getLoggedInUserProfile(req, accessToken);
  req.session.userId = id;
  req.session.user = profile;
  req.session.accessToken = accessToken;
  req.session.tokens = {
    accessToken,
    refreshToken,
    expiresIn: '',
  };

  if (profile.organizations && profile.organizations.length > 0) {
    req.session.currentOrganization = await getOrganizationById(
      profile.organizations[0].organizationId
    );
    req.session.isRootOrganizationMember =
      profile.organizations[0].organizationId === ROOT_TENANT_ID;
  }
}

export default async function auth(router: Router) {
  router.post(
    '/login',
    Middlewares.verifyCsrfToken,
    async (req: Types.Request, res: Response) => {
      if (EnvVariables.FeatureToggles.UseAzureAd) {
        return res.status(501).json({ message: 'Not implemented' });
      }

      try {
        const { email, password, organizationIdentifier } = req.body;
        const result = await verifyCredentials(
          req,
          email,
          password,
          organizationIdentifier
        );
        await setUserProfileInSession(
          req,
          result.accessToken,
          result.refreshToken
        );
        res.json(result);
      } catch (err: any) {
        console.error(
          `ERROR: Authentication failed: ${err.message}`,
          err.stack
        );
        const generalErrorMessage = 'Credentials could not be verified';
        if (err.isAxiosError) {
          res.status(err.response?.status || 500).json({
            message: err.response?.data?.message || generalErrorMessage,
          });
        } else if (err instanceof AuthenticationError) {
          res.status(401).json({ message: err.message });
        } else {
          res
            .status(err.status || 500)
            .json({ message: err.message || generalErrorMessage });
        }
      }
    }
  );

  router.post(
    '/register',
    Middlewares.verifyCsrfToken,
    async (req: Types.Request, res: Response) => {
      if (EnvVariables.FeatureToggles.UseAzureAd) {
        return res.status(501).json({ message: 'Not implemented' });
      }

      const { firstName, lastName, email, username, password } = req.body;
      if (
        !firstName?.length ||
        !lastName?.length ||
        !email?.length ||
        !username?.length ||
        !password?.length
      ) {
        res.status(400).json({ message: 'Unable to register request' });
      } else {
        await registerUser(req, firstName, lastName, email, username, password);
        // auto-login user
        const result = await verifyCredentials(req, email, password);
        await setUserProfileInSession(
          req,
          result.accessToken,
          result.refreshToken
        );
        res.status(201).json(result);
      }
    }
  );

  router.post('/forgot-password', async (req: Types.Request, res: Response) => {
    if (EnvVariables.FeatureToggles.UseAzureAd) {
      return res.status(501).json({ message: 'Not implemented' });
    }

    const { email } = req.body;
    // TODO: This should update password using backend endpoint
    if (email) {
      res.json({ message: 'Request accepted!' });
    }
  });

  router.delete(
    '/logout',
    async (req: Types.Request, res: Response, next: NextFunction) => {
      await logoutUser(req);
      next();
    },
    Middlewares.clearCsrf,
    (req: Types.Request, res: Response) => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.sendStatus(204);
      });
    }
  );

  router.post('/tokens/refresh', Middlewares.refreshTokens);

  router.post(
    '/authorize',
    Middlewares.verifyCsrfToken,
    async (req: Types.Request, res: Response) => {
      if (EnvVariables.FeatureToggles.UseAzureAd) {
        const { code, clientInfo } = req.body;
        if (!code || !clientInfo) {
          return res.status(400).json({
            message:
              'code or clientInfo is missing from request, unable to initialize session',
          });
        }
        const oauthClient: OauthClient = new OauthClient(
          EnvVariables.ServicesApiKey
        );
        const tokenResponse = await oauthClient.exchangeCodeForTokens(
          code,
          clientInfo
        );

        await setUserProfileInSession(
          req,
          tokenResponse.accessToken,
          tokenResponse.refreshToken
        );
        res.json(tokenResponse);
      } else {
        res.sendStatus(500);
      }
    }
  );

  router.get(
    '/url',
    Middlewares.verifyCsrfToken,
    async (req: Types.Request, res: Response) => {
      const organizationIdentifier = req.query.organizationIdentifier as
        | string
        | undefined;

      if (!EnvVariables.FeatureToggles.UseAzureAd) {
        return res.status(500).json({ message: 'Not supported' });
      }
      const authUrl = await getOauthUrl(req, { organizationIdentifier });
      res.status(200).send({
        authUrl,
      });
    }
  );

  router.get('/validate', async (req: Types.Request, res: Response) => {
    const accessToken: string = getAccessToken(req);
    const tokenValidityStatus = await validateToken(accessToken);
    res.sendStatus(tokenValidityStatus);
  });
}
