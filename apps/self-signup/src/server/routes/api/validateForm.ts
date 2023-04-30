import { Router, Request, Response } from 'express';
import validateAccountCreation from '../../models/validateAccountCreation';

export default async (router: Router) => {
  router.post('/', async (req: Request, res: Response) => {
    const result = await validateAccountCreation(req.body);
    if (result.isValid) {
      res.json(result);
    } else {
      res.status(422).json(result);
    }
  });
};
