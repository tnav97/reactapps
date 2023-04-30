import { Router, Request, Response } from 'express';
import startFreeTrial from '../../models/startFreeTrial';
import { getRecaptchaSecretKey } from '../../../lib/utils/getRecaptchaSecretKey';
import { Middlewares } from '@alcumus/core';
import { FeatureToggles } from '../../../common/constants/featureToggles';

export default async (router: Router) => {
  router.post(
    '/',
    FeatureToggles.useRecaptcha()
      ? Middlewares.verifyRecaptchaToken(getRecaptchaSecretKey())
      : Middlewares.noopMiddleware,
    async (req: Request, res: Response) => {
      res.json({ success: await startFreeTrial(req.body) });
    }
  );
};
