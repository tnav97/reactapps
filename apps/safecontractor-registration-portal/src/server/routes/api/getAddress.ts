import { Response, Request, Router } from 'express';
import { findAddressLookup } from '../../models/findAddressLookup';

export default async function getAddress(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const code = (req.query.code as string)?.trim();
    if (!code) {
      res.status(400).json({ message: 'Bad Request, code not provided' });
    }
    const response = await findAddressLookup(code);
    res.json({ response });
  });
}
