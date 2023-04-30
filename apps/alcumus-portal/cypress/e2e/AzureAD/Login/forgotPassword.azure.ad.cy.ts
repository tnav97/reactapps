import { AzureAdForgotPasswordPage } from '../../../fixtures/page-objects/login/forgotPasswordPage';
import { Common } from '../../../fixtures/functions/common';
import { describeWhenEnabled } from '../../../support/e2e';
import { AzureAdLoginPage } from '../../../fixtures/page-objects/login/loginPage';
import standardUser from '../../../fixtures/users/Standard_User.json';

describeWhenEnabled(
  'Alcumus Portal - Azure AD | Forgot Password Workflow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    const azureAdForgotPasswordPage = new AzureAdForgotPasswordPage();
    const common = new Common();
    const azureAdloginPage = new AzureAdLoginPage();

    it('C31568 Verify page elements after submitting valid email', () => {
      const email = 'testuser1@alcumus.com';
      azureAdloginPage.visit();
      azureAdloginPage.clickForgotPasswordLink();
      azureAdForgotPasswordPage.enterEmail(standardUser.userEmail);
      azureAdForgotPasswordPage.submitForm();
      cy.get('#readOnlyEmail_intro').contains(
        'Verification is necessary. Please click Send button.'
      );
    });

    it('C31569 Rejects empty email', () => {
      azureAdloginPage.visit();
      azureAdloginPage.clickForgotPasswordLink();
      azureAdForgotPasswordPage.enterEmail(' ');
      azureAdForgotPasswordPage.submitForm();
      azureAdForgotPasswordPage
        .getErrorMessage()
        .contains('Please enter a valid email address.');
    });

    it('C31570 Rejects invalid email', () => {
      azureAdloginPage.visit();
      azureAdloginPage.clickForgotPasswordLink();
      azureAdForgotPasswordPage.enterEmail('Abc123!@#.com');
      azureAdForgotPasswordPage.submitForm();

      azureAdForgotPasswordPage
        .getErrorMessage()
        .contains('Please enter a valid email address.');
    });

    it('C31571 Rejects XSS payloads', () => {
      // uses npm package to iterate through xss payloads
      common.XSS_PAYLOADS.forEach((payload) => {
        azureAdloginPage.visit();
        azureAdloginPage.clickForgotPasswordLink();
        azureAdForgotPasswordPage.enterEmail(payload);
        azureAdForgotPasswordPage.submitForm();
        azureAdForgotPasswordPage
          .getErrorMessage()
          .contains('Please enter a valid email address.');
      });
    });
  }
);
