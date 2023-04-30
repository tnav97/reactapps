import { Router, Response } from 'express';
import { Types, Utilities } from '@alcumus/core';
import axios from 'axios';

interface SafetyIntelligenceSession extends Types.ISession {
  featureToggle?: {
    showUpdatePasswordButton: string;
  };
}
export interface SafetyIntelligenceRequest extends Types.Request {
  session: SafetyIntelligenceSession;
}

export default async function loginRouter(router: Router) {
  router.post(
    '/session',
    async (req: SafetyIntelligenceRequest, res: Response) => {
      try {
        const { accessToken, refreshToken, accessTokenExpiry } = req.body;
        const changePassword =
          process.env
            .FEATURE_TOGGLE_SHOW_UPDATE_PASSWORD_BUTTON_FOR_SAFETY_INTELLIGENCE ||
          'false';

        req.session.tokens = {
          accessToken,
          refreshToken,
          expiresIn: accessTokenExpiry,
        };

        req.session.featureToggle = {
          showUpdatePasswordButton: changePassword,
        };

        req.session.save(() => {
          const { rp: redirectPath = '/' } = req.query;
          res.redirect(redirectPath as string);
        });
      } catch (err: any) {
        console.error(
          `ERROR: Initializing Session failed: ${err.message}`,
          err.stack
        );
        res.sendStatus(err.status || 500);
      }
    }
  );

  router.post('/logout', async (req: Types.Request, res: Response) => {
    try {
      const { refreshToken, accessToken } = req.body;
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
          'x-api-key': Utilities.ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
        },
      };
      await axios.post(
        `${process.env.SERVICES_HOST}/auth/api/v1/logout`,
        {
          refreshToken,
        },
        config
      );

      await req.session.destroy(() => {
        res.clearCookie('connect.sid');
      });

      res.redirect('/redirect/portal/logout');
    } catch (err: any) {
      console.error(
        `ERROR: Initializing Session failed: ${err.message}`,
        err.stack
      );
      res.sendStatus(err.status || 500);
    }
  });

  router.post('/refresh', async (req: Types.Request, res: Response) => {
    const { refreshToken, accessToken } = req.body;
    const config = {
      headers: {
        'x-access-token': accessToken,
        'x-api-key': Utilities.ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
      },
    };
    if (!refreshToken) {
      res.sendStatus(401);
    } else {
      try {
        const { data, status } = await axios.post(
          `${process.env.SERVICES_HOST}/auth/api/v1/tokens/refresh`,
          {
            refreshToken,
          },
          config
        );

        if (status === 200) {
          // Refresh the ongoing session on server side
          req.session.touch();
          // Return fresh tokens
          res.json(data);
        } else {
          res.sendStatus(403);
        }
      } catch (err: any) {
        console.error(`Refreshing tokens failed: ${err.message}`, err);
        if (err.isAxiosError) {
          if (err.response?.status === 401) {
            await req.session.destroy(() => {
              res.clearCookie('connect.sid');
            });

            res.redirect('/redirect/portal/logout');
          } else {
            res.status(err.response?.status || 403).json({
              message: 'Unable to refresh tokens',
            });
          }
        } else {
          res.status(500).json({ message: 'Server failed to refresh tokens' });
        }
      }
    }
  });
}
