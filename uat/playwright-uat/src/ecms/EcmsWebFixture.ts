import { Page, expect } from '@playwright/test';
import { env } from '../env';

export class EcmsWebFixture {
  private page: Page;

  private upgradeBtn;

  constructor(page: Page) {
    this.page = page;
    this.upgradeBtn = this.page.locator('.btn:text("Upgrade")');
  }

  async visit() {
    await this.page.goto(env('ECMS_WEB'));
  }

  async expectLoginPageIsOpen() {
    await expect(this.page.locator('h2:text("Login")')).toBeVisible();
  }

  async fillEmailPasswordAndLogin(user: { email: string; password: string }) {
    await this.page.fill('#emailAddress', user.email);
    await this.page.fill('#password', user.password);
    await this.page.click("input[value='Login']");
  }

  async expectDashboardIsVisible() {
    await Promise.all([
      expect(this.page.locator('a:text-is("Home")')).toBeVisible(),
      expect(this.page.locator('a:text-is("My Stuff")')).toBeVisible(),
    ]);
  }

  async clickOnUpgradeBtn() {
    await this.upgradeBtn.click();
  }

  async expectUpgradeBtnIsNotVisible() {
    await expect(this.upgradeBtn).not.toBeVisible();
  }

  async openSettings() {
    await this.page.$eval('text="Settings"', (element: HTMLAnchorElement) =>
      element.click()
    );
  }

  async expectSettingsPage(name: string, email: string, planName: string) {
    await expect(this.page.locator(`text="Plan:"`)).toBeVisible();
    await expect(this.page.locator(`text="${planName}"`)).toBeVisible();
    await expect(
      this.page.locator(`text="Billing Administrator:"`)
    ).toBeVisible();
    await expect(this.page.locator(`text="${name} [${email}]"`)).toBeVisible();
  }

  async clickOnManageSubscriptionBtn() {
    await this.page.click('a:text("Manage Subscription")');
  }

  async closeWelcomeDialog() {
    await this.page.mouse.click(10, 10);
  }

  async expectWelcomeDialog(
    name: string,
    activeSeats: number,
    availableSeats: number
  ) {
    const paymentSuccessIframe = this.page.frameLocator(
      '#payment-success-iframe'
    );

    await expect(
      paymentSuccessIframe.locator('[data-testid="welcome_to_paid_plan"]')
    ).toBeVisible();

    await expect(
      paymentSuccessIframe.locator(`text=Congratulations ${name},`)
    ).toBeVisible();

    await expect(
      paymentSuccessIframe.locator(
        `text=${activeSeats} active | ${availableSeats} available`
      )
    ).toBeVisible();

    await expect(
      paymentSuccessIframe.locator('[data-testid="inviteUsersBtn"]')
    ).toBeVisible();
  }
}
