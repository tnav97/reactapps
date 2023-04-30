import { Response, Router } from 'express';
import { Types, Utilities } from '@alcumus/core';
import {
  sendProductRequestEmail,
  sendDemoRequestForExistingUser,
} from '../../models/email';
import { getAccessToken } from '../../../lib/utils';
import { getUserLogin } from '../../models/account';

export default async function email(router: Router) {
  router.post('/', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const account = await getUserLogin(accessToken);
    const emailBody = req.body;
    await sendProductRequestEmail({ ...emailBody, useremail: account.email });

    res.sendStatus(204);
  });

  router.post('/request-demo', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const account = await getUserLogin(accessToken);
    const emailBody = req.body;
    const isEcSupported: boolean = Utilities.ProcessEnv.getValueOrDefault(
      'ALCUMUS_PORTAL_SUPPORTED_APPLICATION_LOOKUP_KEYS',
      ''
    )
      .split(',')
      .includes('eCompliance');
    await sendDemoRequestForExistingUser({
      ...emailBody,
      useremail: account.email,
      receiversemail: isEcSupported
        ? 'csam@alcumus.com '
        : 'customersuccessenterprise@alcumusgroup.com',
    });

    res.sendStatus(204);
  });
}
