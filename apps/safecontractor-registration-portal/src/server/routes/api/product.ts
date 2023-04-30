import { Response, Request, Router } from 'express';
import { chooseProductPlan } from '../../models/choosePlan';

export default async function product(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const response = await chooseProductPlan(req.body);
    res.json({ response });
  });
}
