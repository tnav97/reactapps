import * as dotenv from 'dotenv';
import { getFakeUser } from '../../src/fakeUser';
import { test } from './fixtures';

dotenv.config();

test.describe('Upgrade from ECMS', () => {
  test('Successful checkout & manage subscription', async ({
    page,
    ecmsBillingPortal,
    ecmsWeb,
    billingPortal,
    stripe,
  }) => {
    const user = getFakeUser();

    const name = `${user.firstName} ${user.lastName}`;

    await ecmsBillingPortal.createAndSetupEcmsAccount(user);

    await ecmsWeb.visit();
    await ecmsWeb.expectLoginPageIsOpen();
    await ecmsWeb.fillEmailPasswordAndLogin(user);

    await ecmsWeb.expectDashboardIsVisible();

    await ecmsWeb.clickOnUpgradeBtn();

    await billingPortal.expectPricingPageToBeVisible();
    await billingPortal.clickOnFirstPlan();

    await billingPortal.incrementSeats();
    await billingPortal.checkTermsCheckbox();
    await billingPortal.clickOnProceed();

    await page.waitForNavigation();

    await stripe.expectIsOnStripeCheckout();

    // Stripe has already tested checkout, we do not need to test that again
    // However, we must create a stripe subscription object associated with the checkout
    // and there is no API to do that, therefore we will continue the integration test here

    await stripe.fillCardDetails();
    await stripe.fillNameDetails(name);
    await stripe.fixCanadianBillingAddress();

    await stripe.clickOnSubmit();
    await page.waitForNavigation();

    await billingPortal.expectThankYouPageTobeVisible();
    await page.waitForNavigation();

    await ecmsWeb.expectWelcomeDialog(name, 2, 18);
    await ecmsWeb.closeWelcomeDialog();

    await page.waitForNavigation();

    await ecmsWeb.expectUpgradeBtnIsNotVisible();
    await ecmsWeb.openSettings();

    await ecmsWeb.expectSettingsPage(name, user.email, 'Starter');
    await ecmsWeb.clickOnManageSubscriptionBtn();

    await stripe.expectIsOnStripeBillingPortal();
    await stripe.returnToEcms();

    await ecmsWeb.expectDashboardIsVisible();
  });
});
