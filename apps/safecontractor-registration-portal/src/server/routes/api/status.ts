import { Response, Request, Router } from 'express';
import { validateStatusHealth } from '../../models/statusHealth';

export default async function status(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const response = await validateStatusHealth();
    res.json({ response });
  });
}
