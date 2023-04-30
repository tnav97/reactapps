import { nanoid } from 'nanoid';
import { Portal } from '../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../support/e2e';
import { AzureAdLoginPage } from '../../../fixtures/page-objects/login/loginPage';
import { AzureAdRegisterPage } from '../../../fixtures/page-objects/login/registerPage';

describeWhenEnabled(
  'Alcumus Portal - Signup - Registration Workflow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('create account verfications', () => {
      const userGuid = nanoid(10);
      const email = `user.${userGuid}@test.foo`;
      const password = 'Alcdev012!';
      const azureAdRegisterPage = new AzureAdRegisterPage();
      const azureAdloginPage = new AzureAdLoginPage();
      const portal = new Portal();

      beforeEach(() => {
        azureAdloginPage.visit();
        azureAdloginPage.clickSignUpLink();
      });

      it('C31461 Verify Create Account Page Load elements state', () => {
        azureAdRegisterPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Create account');
        azureAdRegisterPage
          .getFirstName()
          .invoke('attr', 'placeholder')
          .should('eq', 'First name');
        azureAdRegisterPage
          .getLastName()
          .invoke('attr', 'placeholder')
          .should('eq', 'Last name');
        azureAdRegisterPage
          .getEmail()
          .invoke('attr', 'placeholder')
          .should('eq', 'Email');
        azureAdRegisterPage
          .getPassword()
          .invoke('attr', 'placeholder')
          .should('eq', 'New password');
        azureAdRegisterPage
          .getConfirmPassword()
          .invoke('attr', 'placeholder')
          .should('eq', 'Confirm new password');
        azureAdRegisterPage
          .getSubmitButton()
          .should('not.be.enabled')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
        azureAdRegisterPage
          .getCancelButton()
          .should('be.enabled')
          .should('have.css', 'background-color', 'rgb(255, 255, 255)');
      });

      it('C31462 Verify Click cancel return to sign in page', () => {
        azureAdRegisterPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Create account');
        azureAdRegisterPage.clickCancelButton();
        azureAdloginPage.getSignInHeader().should('be.visible');
      });

      it('C31463 Rejects empty email field', () => {
        azureAdRegisterPage.enterFirstName('User');
        azureAdRegisterPage.enterLastName(userGuid);
        azureAdRegisterPage.enterPassword(password);
        azureAdRegisterPage.enterConfirmPassword(password);
        azureAdRegisterPage.getSubmitButton().should('be.disabled');
      });

      it('C31464 Rejects invalid email field', () => {
        azureAdRegisterPage.enterFirstName('User');
        azureAdRegisterPage.getSubmitButton().should('not.be.enabled');
        azureAdRegisterPage.enterLastName(userGuid);
        azureAdRegisterPage.getSubmitButton().should('not.be.enabled');
        azureAdRegisterPage.enterEmail(`user${userGuid}testfoo`);
        azureAdRegisterPage.getSubmitButton().should('not.be.enabled');
        azureAdRegisterPage.enterPassword(password);
        azureAdRegisterPage.getSubmitButton().should('not.be.enabled');
        azureAdRegisterPage.enterConfirmPassword(password);
        azureAdRegisterPage.getSubmitButton().should('be.enabled');
        azureAdRegisterPage.submitForm();
        azureAdRegisterPage
          .getErrorMessage()
          .should('contain', 'Please enter a valid email address.');
      });

      it('C31465 Verify User gets Registers with valid inputs', () => {
        azureAdRegisterPage.enterFirstName('User');
        azureAdRegisterPage.enterLastName(userGuid);
        azureAdRegisterPage.enterEmail(email);
        azureAdRegisterPage.enterPassword(password);
        azureAdRegisterPage.enterConfirmPassword(password);
        azureAdRegisterPage.submitForm();
        portal.getGreeting().should('exist');
      });
    });
  }
);
