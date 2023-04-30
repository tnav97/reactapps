import { NextFunction, Response, Router } from 'express';
import { Middlewares, Types } from '@alcumus/core';
import qs from 'querystring';
import { logoutUser } from '../models/account';
import loadAlcumusProducts from '../middleware/loadAlcumusProducts';
import proceedIfValidProductCodeAndCallback from '../middleware/proceedIfValidProductCodeAndCallback';
import applyFeatureToggles from '../middleware/applyFeatureToggles';
import loadFeatures from '../middleware/loadFeatures';
import { EnvVariables } from '../constants';
import {
  redirectToOrganizationAuthPageIfExists,
  redirectToOrganizationAuthPageOrFail,
} from './middlewares/handleOrganizationIdentifierUrlParameter';
import { loadCurrentOrganization } from '../middleware/loadCurrentOrganization';
import { loadRoles } from '../middleware/loadRoles';

export default async function HomePage(router: Router) {
  router.get('/', applyFeatureToggles);

  router.get(
    '/login',
    Middlewares.addCsrfToken,
    applyFeatureToggles,
    proceedIfValidProductCodeAndCallback('/login'),
    redirectToOrganizationAuthPageOrFail
  );

  router.get(
    '/login/discovery',
    Middlewares.addCsrfToken,
    applyFeatureToggles,
    proceedIfValidProductCodeAndCallback('/login/discovery'),
    redirectToOrganizationAuthPageIfExists
  );

  router.get(
    '/login/credentials',
    Middlewares.addCsrfToken,
    applyFeatureToggles,
    proceedIfValidProductCodeAndCallback('/login/credentials'),
    redirectToOrganizationAuthPageOrFail
  );

  router.get(
    '/authorize',
    Middlewares.addCsrfToken,
    async (req: Types.Request, res: Response, next: NextFunction) => {
      if (EnvVariables.FeatureToggles.UseAzureAd) {
        const { error, error_description: errorDescription } = req.query;
        if (error && errorDescription) {
          res.redirect('/login');
          return;
        }
      }
      next();
    }
  );

  router.get(
    '/register',
    Middlewares.addCsrfToken,
    applyFeatureToggles,
    proceedIfValidProductCodeAndCallback('/register'),
    async (req: Types.Request, res: Response, next: NextFunction) => {
      const { p: product, cu: callbackUrl, rp: redirectPath } = req.query;
      if (EnvVariables.FeatureToggles.UseAzureAd) {
        const query = qs.stringify({
          ...(product &&
            callbackUrl && {
              p: product as string,
              cu: callbackUrl as string,
            }),
          ...(redirectPath && { rp: redirectPath as string }),
        });
        res.redirect(`/login${query.length ? `?${query}` : ''}`);
      }
      next();
    }
  );

  router.get(
    '/logout',
    applyFeatureToggles,
    async (req: Types.Request, res: Response, next: NextFunction) => {
      await logoutUser(req);

      req.session.destroy(() => {
        res.clearCookie('connect.sid');

        const { rp: redirectPath }: { rp?: string } = req.query;
        if (redirectPath) {
          next();
        } else {
          res.redirect('/login');
        }
      });
    }
  );

  // Ensure loading launch configuration for all products for necessary verifications to happen on client
  router.get(
    '*',
    loadAlcumusProducts,
    loadRoles,
    loadFeatures,
    loadCurrentOrganization
  );
}
