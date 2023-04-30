import { Router, Response, NextFunction } from 'express';
import { Types } from '@alcumus/core';
import qs from 'querystring';
import { SafetyIntelligenceRequest } from './api/auth';

export default async function HomePage(router: Router) {
  router.get(
    '/',
    async (
      req: SafetyIntelligenceRequest,
      res: Response,
      next: NextFunction
    ) => {
      if (!req.initialState?.portalToken) {
        req.initialState = {
          ...req.initialState,
          portalToken: {
            accessToken: req.session.tokens?.accessToken,
            refreshToken: req.session.tokens?.refreshToken,
            expiresIn: req.session.tokens?.expiresIn,
          },
          featureToggle: {
            showUpdatePasswordButton:
              req.session.featureToggle?.showUpdatePasswordButton || 'false',
          },
        };
      }
      req.session.tokens = {
        accessToken: '',
        refreshToken: '',
        expiresIn: '',
      };
      req.session.featureToggle = {
        showUpdatePasswordButton: 'false',
      };
      req.session.save();
      next();
    }
  );

  router.get('/redirect', async (req: Types.Request, res: Response) => {
    try {
      const siWebHost = process.env.SAFETY_INTELLIGENCE_WEB_HOST as string;
      const alcumusPortalWebHost = process.env
        .ALCUMUS_PORTAL_WEB_HOST as string;

      if (!siWebHost?.length || !alcumusPortalWebHost?.length) {
        throw new Error(
          'One or more configuration is missing: SAFETY_INTELLIGENCE_WEB_HOST, ALCUMUS_PORTAL_WEB_HOST'
        );
      }

      res.json({
        message: 'Redirecting...',
        redirectUrl: `${alcumusPortalWebHost}/login?${qs.stringify({
          p: 'safetyIntelligence',
          cu: `${siWebHost}/api/auth/session`,
          rp: `${siWebHost}`,
        })}`,
      });
    } catch (err: any) {
      console.error(`ERROR: Redirect failed: ${err.message}`, err.stack);
      res.sendStatus(err.status || 500);
    }
  });

  router.get('/redirect/portal', async (req: Types.Request, res: Response) => {
    try {
      const siWebHost = process.env.SAFETY_INTELLIGENCE_WEB_HOST as string;
      const alcumusPortalWebHost = process.env
        .ALCUMUS_PORTAL_WEB_HOST as string;

      if (!alcumusPortalWebHost?.length) {
        throw new Error('Configuration is missing: ALCUMUS_PORTAL_WEB_HOST');
      }

      res.json({
        message: 'Redirecting...',
        redirectUrl: `${alcumusPortalWebHost}/login?${qs.stringify({
          p: 'safetyIntelligence',
          cu: `${siWebHost}/api/auth/session`,
          rp: `${siWebHost}`,
        })}`,
      });
    } catch (err: any) {
      console.error(`ERROR: Redirect failed: ${err.message}`, err.stack);
      res.sendStatus(err.status || 500);
    }
  });

  router.get(
    '/redirect/portal/login',
    async (req: Types.Request, res: Response) => {
      try {
        const siWebHost = process.env.SAFETY_INTELLIGENCE_WEB_HOST as string;
        const alcumusPortalWebHost = process.env
          .ALCUMUS_PORTAL_WEB_HOST as string;

        if (!alcumusPortalWebHost?.length) {
          throw new Error('Configuration is missing: ALCUMUS_PORTAL_WEB_HOST');
        }

        res.redirect(
          `${alcumusPortalWebHost}/login?${qs.stringify({
            p: 'safetyIntelligence',
            cu: `${siWebHost}/api/auth/session`,
            rp: `${siWebHost}`,
          })}`
        );
      } catch (err: any) {
        console.error(`ERROR: Redirect failed: ${err.message}`, err.stack);
        res.sendStatus(err.status || 500);
      }
    }
  );

  router.get(
    '/redirect/portal/logout',
    async (req: Types.Request, res: Response) => {
      try {
        const alcumusPortalWebHost = process.env
          .ALCUMUS_PORTAL_WEB_HOST as string;
        const siWebHost = process.env.SAFETY_INTELLIGENCE_WEB_HOST as string;

        if (!alcumusPortalWebHost?.length || !siWebHost?.length) {
          throw new Error(
            'Configuration is missing: ALCUMUS_PORTAL_WEB_HOST, SAFETY_INTELLIGENCE_WEB_HOST'
          );
        }

        res.json({
          message: 'Logging out...',
          redirectUrl: `${alcumusPortalWebHost}/logout?${qs.stringify({
            logout: true,
            rp: `${siWebHost}/redirect/portal/login`,
          })}`,
        });
      } catch (err: any) {
        console.error(`ERROR: Redirect failed: ${err.message}`, err.stack);
        res.sendStatus(err.status || 500);
      }
    }
  );
}
