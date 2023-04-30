import { Response, Router } from 'express';
import { Request } from '../../types';
import { Utilities } from '@alcumus/core';

export default async (router: Router) => {
  router.post('/', async (req: Request, res: Response) => {
    /* 
    TO DO
    calls to https://billing.qa.ecompliance.dev/api/???
    */
    const url = Utilities.ProcessEnv.getValueOrThrow('BILLING_PORTAL_WEB_HOST');
    res.send(url);
  });
};
