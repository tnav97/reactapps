import { Page, expect } from '@playwright/test';

export class BillingPortalFixture {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectPricingPageToBeVisible() {
    await expect(this.page.locator(':text("Our pricing plans")')).toBeVisible();
  }

  async expectThankYouPageTobeVisible() {
    await expect(
      this.page.locator('"Thank you for subscribing!"')
    ).toBeVisible();
  }

  async clickOnFirstPlan() {
    await this.page.click('[data-testid="StarterButton"]');
  }

  async incrementSeats() {
    await this.page.click('[data-testid="incrementBtn"]');
  }

  async checkTermsCheckbox() {
    await this.page.check('input[type="checkbox"]');
  }

  async clickOnProceed() {
    const btn = this.page.locator(
      'button:has-text("Proceed to secure checkout")'
    );

    await expect(btn).not.toBeDisabled();

    await btn.click();
  }
}
