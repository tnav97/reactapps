import { Response, Router } from 'express';
import { Request } from '../../sessionTypes';
import { ErrorMessages } from '../../../common/constants/errorMesages';

export default function explorePlans(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const productName = req.query.product;
    if (productName) {
      return res.json(`/plans?product=${productName}`);
    }

    return res.status(404).json({ message: ErrorMessages.productNotFound });
  });
}
