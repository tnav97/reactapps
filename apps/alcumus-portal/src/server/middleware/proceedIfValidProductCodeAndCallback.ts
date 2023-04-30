import { Response, NextFunction } from 'express';
import { Types } from '@alcumus/core';
import shouldAllowAuthWithRedirectionFlow from '../../lib/utils/shouldAllowAuthWithRedirectionFlow';
import { AuthConsumerCallbacksWhitelist } from '../constants';

export default function proceedIfValidProductCodeAndCallback(baseUrl: string) {
  return (req: Types.Request, res: Response, next: NextFunction) => {
    const product = (req.query.p as string)?.trim();
    const callbackUrl = (req.query.cu as string)?.trim();
    const organizationIdentifier = (req.query.oi as string)?.trim();

    const proceed = shouldAllowAuthWithRedirectionFlow(
      AuthConsumerCallbacksWhitelist,
      product,
      callbackUrl
    );

    if (proceed) {
      next();
    } else {
      const baseUrlWithQueryParam = `${baseUrl}${
        organizationIdentifier ? `?oi=${organizationIdentifier}` : ''
      }`;
      res.redirect(baseUrlWithQueryParam);
    }
  };
}
