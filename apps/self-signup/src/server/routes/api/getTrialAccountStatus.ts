import { Router, Response } from 'express';
import { Request } from '../../types';
import retrieveTrialAccountDetails from '../../models/retrieveTrialAccountDetails';

export default async (router: Router) => {
  router.get('/', async (req: Request, res: Response) => {
    const invitationCode = req.session.invitationCode as string;
    if (!invitationCode) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(await retrieveTrialAccountDetails(invitationCode));
  });
};
