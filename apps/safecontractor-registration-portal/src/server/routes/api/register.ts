import { Response, Request, Router } from 'express';
import { registration } from '../../models/register';

export default async function register(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const response = await registration(req.body);
    res.json({ response });
  });
}
