import { Router, Response } from 'express';
import { EXPIRED_TRIAL } from '../../../common/constants/cookies';
import { Request } from '../../types';

export default async (router: Router) => {
  router.get('/', (req: Request, res: Response) => {
    const invitationCode = req.query.invitationCode as string;
    if (invitationCode) {
      req.session.invitationCode = invitationCode;

      res.cookie(EXPIRED_TRIAL, invitationCode);
      res.redirect('/expired-trial');
    }
  });
};
