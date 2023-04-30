import { KeycloakForgotPasswordPage } from '../../fixtures/page-objects/login/forgotPasswordPage';
import { Common } from '../../fixtures/functions/common';
import { describeWhenDisabled } from '../../support/e2e';
import { KeycloakLoginPage } from '../../fixtures/page-objects/login/loginPage';

describeWhenDisabled(
  'Alcumus Portal - Keycloak | Forgot Password Workflow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('forgot password actions', () => {
      const keycloakForgotPasswordPage = new KeycloakForgotPasswordPage();
      const keycloakLoginPage = new KeycloakLoginPage();
      const common = new Common();

      it('Email sent by pressing Enter key', () => {
        const email = 'tester@alcumus.com';
        keycloakLoginPage.visit();
        keycloakLoginPage.enterEmail(email);
        keycloakLoginPage.clickNextButton();
        keycloakLoginPage.clickForgotPasswordLink();
        keycloakForgotPasswordPage.visit();
        keycloakForgotPasswordPage.enterEmail(email);
        cy.get('body').type('{enter}');
        keycloakForgotPasswordPage.getSuccessMessage().contains(email);
      });

      it('Rejects empty email', () => {
        keycloakForgotPasswordPage.visit();
        keycloakForgotPasswordPage.enterEmail(' ');
        keycloakForgotPasswordPage.submitForm();
        keycloakForgotPasswordPage
          .getErrorMessage()
          .contains('A valid email is required');
      });

      it('Rejects invalid email', () => {
        keycloakForgotPasswordPage.visit();
        keycloakForgotPasswordPage.enterEmail('Abc123!@#.com');
        keycloakForgotPasswordPage.submitForm();
        keycloakForgotPasswordPage
          .getErrorMessage()
          .contains('A valid email is required');
      });

      it('Rejects XSS payloads', () => {
        // uses npm package to iterate through xss payloads
        common.XSS_PAYLOADS.forEach((payload) => {
          keycloakForgotPasswordPage.visit();
          keycloakForgotPasswordPage.enterEmail(payload);
          keycloakForgotPasswordPage.submitForm();
          keycloakForgotPasswordPage
            .getErrorMessage()
            .contains('A valid email is required');
        });
      });
    });
  }
);
