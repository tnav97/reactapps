import { Router, Response } from 'express';
import contactSales from '../../models/contactSales';
import { Request } from '../../types';

export default async (router: Router) => {
  router.post('/', async (req: Request, res: Response) => {
    if (!req.session.invitationCode) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    res.json({
      success: await contactSales(req.session.invitationCode as string),
    });
  });
};
