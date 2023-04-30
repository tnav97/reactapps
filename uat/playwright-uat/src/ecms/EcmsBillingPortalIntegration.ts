import { MailhogApi } from '../mailhog';
import { EcmsApi } from './EcmsApi';
import { BillingServiceApi } from '../billing-service';
import { FakeUser } from '../fakeUser';
import { env } from '../env';
import { Page } from '@playwright/test';

export class EcmsBillingPortalIntegration {
  private mailhog: MailhogApi;
  private ecms: EcmsApi;
  private billingService: BillingServiceApi;

  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.billingService = new BillingServiceApi(
      env('BILLING_SERVICE_API'),
      env('BILLING_SERVICE_KEY')
    );

    this.mailhog = new MailhogApi(env('MAILHOG_URL'), env('MAILHOG_AUTH'));

    this.ecms = new EcmsApi({
      apiUrl: env('ECMS_API'),
      ecmsApiUsername: env('ECMS_CS_EMAIL'),
      ecmsApiPassword: env('ECMS_CS_PASSWORD'),
      ecmsSiteId: env('ECMS_CS_DEFAULT_SITE_ID'),
    });
  }

  async createAndSetupEcmsAccount(user: FakeUser) {
    const billingAccountId = await this.billingService.createBillingAccount({
      accountHolderEmail: user.email,
      accountHolderName: `${user.firstName} ${user.lastName}`,
    });

    const account = await this.ecms.createAccount({
      billingAccountId,
      ecmsCreateAccount: user,
    });

    await this.ecms.startFreeTrial(account);

    await this.page.waitForTimeout(3000);

    const emailHtml = await this.mailhog.getMessageFor(user.email);

    const invitationCodeRegex =
      /https?:\/\/.*\/.*\?invitationCode=([A-z0-9-]*)/g;

    const matches = invitationCodeRegex.exec(emailHtml);

    if (matches) {
      const invitationCode = matches[1];

      await this.ecms.activateAccount(invitationCode);

      return true;
    } else {
      throw new Error('Invitation code not found in email');
    }
  }
}
