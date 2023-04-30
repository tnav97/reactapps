import { test as base } from '@playwright/test';
import { EcmsWebFixture } from '../../src/ecms/EcmsWebFixture';
import { EcmsBillingPortalIntegration } from '../../src/ecms/EcmsBillingPortalIntegration';
import { BillingPortalFixture } from '../../src/billing-portal/BillingPortalFixture';
import { StripeFixture } from '../../src/stripe/StripeFixture';

type Fixtures = {
  ecmsBillingPortal: EcmsBillingPortalIntegration;
  ecmsWeb: EcmsWebFixture;
  billingPortal: BillingPortalFixture;
  stripe: StripeFixture;
};

export const test = base.extend<Fixtures>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ecmsBillingPortal: async ({ page }, use) => {
    await use(new EcmsBillingPortalIntegration(page));
  },
  ecmsWeb: async ({ page }, use) => {
    await use(new EcmsWebFixture(page));
  },
  billingPortal: async ({ page }, use) => {
    await use(new BillingPortalFixture(page));
  },
  stripe: async ({ page }, use) => {
    await use(new StripeFixture(page));
  },
});

export { expect } from '@playwright/test';
