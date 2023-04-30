import { Request, Response, Router } from 'express';
import createECMSAccount from '../../models/createECMSAccount';
import createBillingAccount, {
  BillingAccountDto,
} from '../../models/createBillingAccount';
import { RegisterFormData } from '../../../client/redux/reducers/register-reducer';
import { getRecaptchaSecretKey } from '../../../lib/utils/getRecaptchaSecretKey';
import { Middlewares } from '@alcumus/core';
import { FeatureToggles } from '../../../common/constants/featureToggles';

export default async (router: Router) => {
  router.post(
    '/',
    FeatureToggles.useRecaptcha()
      ? Middlewares.verifyRecaptchaToken(getRecaptchaSecretKey())
      : Middlewares.noopMiddleware,
    async (req: Request, res: Response) => {
      const formData = req.body as RegisterFormData;

      let billingAccount: BillingAccountDto | undefined;

      if (FeatureToggles.createBillingAccount()) {
        billingAccount = await createBillingAccount({
          accountHolderName: `${formData.firstName} ${formData.lastName}`,
          accountHolderEmail: `${formData.email}`,
        });
      }

      const ecmsAccount = await createECMSAccount(formData, billingAccount?.id);
      if (ecmsAccount) {
        const response = {
          ...ecmsAccount,
        };
        res.json(response);
        return;
      }

      res.status(422).json(ecmsAccount);
    }
  );
};
