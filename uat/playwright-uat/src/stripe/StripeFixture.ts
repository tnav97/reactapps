import { expect, Page } from '@playwright/test';

export class StripeFixture {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectIsOnStripeCheckout() {
    await expect(this.page.url()).toMatch('https://checkout.stripe.com');
  }

  async expectIsOnStripeBillingPortal() {
    await expect(this.page.url()).toMatch('https://billing.stripe.com');
  }

  async returnToEcms() {
    await this.page.click('text=Return to Alcumus eCompliance (Dev)');
  }

  async fillCardDetails({
    cardNumber = '4111 1111 1111 1111',
    cardExpiry = '12 / 30',
    cardCvc = '123',
  }: {
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
  } = {}) {
    await this.page.fill('#cardNumber', cardNumber);
    await this.page.fill('#cardExpiry', cardExpiry);
    await this.page.fill('#cardCvc', cardCvc);
  }

  async fillNameDetails(name: string) {
    await this.page.fill('input[name="billingName"]', name);
  }

  async fixCanadianBillingAddress() {
    this.fillBillingAddress({
      country: 'Canada',
      line1: '123 King St.',
      line2: 'Unit 101',
      city: 'Toronto',
      state: 'Ontario',
      postalCode: 'A1A 1A1',
    });
  }

  async fillBillingAddress(address: {
    country: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
  }) {
    await this.page.selectOption('select[name="billingCountry"]', {
      label: address.country,
    });
    await this.page.fill('input[name="billingAddressLine1"]', address.line1);
    await this.page.fill('input[name="billingAddressLine2"]', address.line2);
    await this.page.fill('input[name="billingLocality"]', address.city);
    await this.page.selectOption('select[name="billingAdministrativeArea"]', {
      label: address.state,
    });
    await this.page.fill('input[name="billingPostalCode"]', address.postalCode);
  }

  async clickOnSubmit() {
    const subscribeButton = await this.page.locator(
      '[data-testid="hosted-payment-submit-button"]'
    );

    await expect(subscribeButton).toHaveClass(
      'SubmitButton SubmitButton--complete'
    );

    await this.page.waitForTimeout(1000);

    await subscribeButton.click();
  }
}
