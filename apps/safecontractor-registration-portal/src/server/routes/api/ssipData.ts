import { Response, Request, Router } from 'express';
import { getSsipData } from '../../models/getSsipData';

export default async function ssipData(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const response = await getSsipData();
    res.json({ response });
  });
}
