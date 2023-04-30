import { Router, Request, Response, NextFunction } from 'express';

export default async function HomePage(router: Router) {
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    next();
  });
}
