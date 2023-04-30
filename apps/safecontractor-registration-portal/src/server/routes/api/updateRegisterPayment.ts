import { Response, Request, Router } from 'express';
import { updateRegistrationPayment } from '../../models/updateRegistrationPayment';

export default async function updateRegisterPayment(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const response = await updateRegistrationPayment(req.body);
    res.json({ response });
  });
}
