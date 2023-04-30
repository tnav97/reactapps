import { Router, Request, Response } from 'express';
import activateAccount from '../../models/activateAccount';

export default async (router: Router) => {
  router.post('/', async (req: Request, res: Response) => {
    if (!req.body.invitationCode) {
      res.status(422).json({ errors: { invitationCode: 'required' } });
    } else {
      res.json(await activateAccount(req.body.invitationCode));
    }
  });
};
