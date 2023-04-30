import { Response, Router } from 'express';
import { Request } from '../../sessionTypes';
import { getWelcomeToPaidPlansIframeUri } from '../../../lib/utils/getWelcomeToPaidPlansIframeUri';
import { getBillingServiceApiUrl } from '../../../lib/utils/billingServiceApi';
import Axios from 'axios';
import { SubscriptionDto } from '../../../types/subscriptionDto';
import { Buffer } from 'buffer';

export default function getSuccessRedirectUrl(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const transferredSession = req.session.transferredSession;
    const checkoutSessionId = req.session.checkoutSessionId;

    if (!transferredSession) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!checkoutSessionId) {
      res.status(400).json({ message: 'Checkout session is not yet created' });
      return;
    }

    const config = {
      headers: {
        Authorization: transferredSession.billingAccountToken,
      },
    };

    const subscription = (
      await Axios.get<SubscriptionDto>(
        getBillingServiceApiUrl(
          `/subscriptions/stripeCheckoutSessionId/${checkoutSessionId}`
        ),
        config
      )
    ).data;

    const welcomeToPaidPlansParams = await getWelcomeToPaidPlansIframeUri(
      transferredSession.accountHolderName,
      subscription
    );

    const encodedUri = Buffer.from(welcomeToPaidPlansParams).toString('base64');

    res.json(`${transferredSession.successUrl}?welcomeIframeURI=${encodedUri}`);
  });
}
