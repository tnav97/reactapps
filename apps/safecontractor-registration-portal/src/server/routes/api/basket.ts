import { Response, Request, Router } from 'express';
import { basketCode } from '../../models/basketCode';

export default async function basket(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const response = await basketCode(req.body);
    res.json({ response });
  });
}
