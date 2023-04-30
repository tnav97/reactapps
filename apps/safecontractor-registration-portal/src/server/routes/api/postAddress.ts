import { Response, Request, Router } from 'express';
import { postAddressLookup } from '../../models/postAddressLookup';

export default async function postAddress(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const response = await postAddressLookup(req.body);
    res.json({ response });
  });
}
