import { Router, Request, Response } from 'express';
import { getMessageFromApi } from '../../models/message';

export default async function test(router: Router) {
  router.get('/', (req: Request, res: Response) => {
    const message = getMessageFromApi();
    res.json({ message });
  });
}
