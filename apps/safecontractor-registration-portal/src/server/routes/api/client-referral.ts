import { Response, Request, Router } from 'express';
import { validateReferralCode } from '../../models/referralCode';

export default async function clientReferral(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const code = (req.query.code as string)?.trim();
    if (!code) {
      res.status(400).json({ message: 'Bad Request, code not provided' });
    }
    const response = await validateReferralCode(code);
    res.json({ response });
  });
}
