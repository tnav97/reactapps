import { Response, Router } from 'express';
import { Request } from '../../sessionTypes';
import Axios from 'axios';
import {
  getBillingServiceApiUrl,
  getBillingServiceKey,
} from '../../../lib/utils/billingServiceApi';
import { GetStartedRequestDto } from '../../../types/getStartedRequestDto';

interface InitiatePlanDto {
  price: number;
  seats: number;
  successUrl: string;
  cancelUrl: string;
}

export default function getStartedRequestDto(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const requestDto = req.body as GetStartedRequestDto;
    const transferredSession = req.session.transferredSession;
    if (!transferredSession) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const config = {
      headers: {
        'x-api-key': getBillingServiceKey(),
        Authorization: transferredSession.billingAccountToken,
      },
    };

    const server = req.protocol + '://' + req.get('host');
    const response = await Axios.post<{
      url: string;
      checkoutSessionId: string;
    }>(
      getBillingServiceApiUrl(`/subscriptions/initiate`),
      {
        price: requestDto.priceId,
        seats: Math.max(requestDto.seats, transferredSession.seats),
        successUrl: `${server}/confirmation`,
        cancelUrl: transferredSession.cancelUrl,
      } as InitiatePlanDto,
      config
    );

    const { checkoutSessionId } = response.data;

    req.session.checkoutSessionId = checkoutSessionId;

    res.json(response.data);
  });
}
