import { Portal } from '../../fixtures/page-objects/portal';
import { KeycloakLoginPage } from '../../fixtures/page-objects/login/loginPage';
import { Common } from '../../fixtures/functions/common';
import { nanoid } from 'nanoid';
import { describeWhenDisabled } from '../../support/e2e';

describeWhenDisabled(
  'Alcumus Portal - Keycloak | Login Workflow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('Starting from Keycloak Login Page ', () => {
      const userGuid = nanoid(10);
      const password = 'Alcdev01!';
      const email = `user.${userGuid}@test.foo`;
      const keycloakLoginPage = new KeycloakLoginPage();
      const portal = new Portal();
      const common = new Common();

      before(() => {
        keycloakLoginPage.visit();
        cy.get('[data-testid=signupLink]').click();
        cy.registerWithKeycloak(userGuid, password);
        keycloakLoginPage.getSignInHeader();
      });

      it('Opens the correct login page', () => {
        keycloakLoginPage.visit();
        cy.contains('Log in');
      });

      it('Logs in through form submission successfully', () => {
        keycloakLoginPage.visit();
        keycloakLoginPage.enterEmail(email);
        keycloakLoginPage.clickNextButton();
        keycloakLoginPage.enterPassword(password);
        keycloakLoginPage.clickLoginButton();
        portal.getGreeting().should('exist');
      });

      it('Prevents malformed submission when CSRF token is not present', () => {
        keycloakLoginPage.visit();
        cy.clearCookie('_csrf');
        keycloakLoginPage.enterEmail(email);
        keycloakLoginPage.clickNextButton();
        keycloakLoginPage.enterPassword(password);
        keycloakLoginPage.clickLoginButton();
        keycloakLoginPage
          .getErrorMessage()
          .contains('Credentials could not be verified');
      });

      it('Logs in through form submission using Enter key', () => {
        keycloakLoginPage.getSignInHeader();
        cy.loginWithKeycloak(email, password);
        cy.get('body').type('{enter}');
        portal.getGreeting();
        portal.getGreeting().should('exist');
      });

      it('Rejects empty email/password', () => {
        keycloakLoginPage.visit();
        keycloakLoginPage.enterEmail(' ');
        keycloakLoginPage.clickNextButton();
        keycloakLoginPage.getErrorMessage().contains('valid email is required');
        keycloakLoginPage.enterEmail(email);
        keycloakLoginPage.clickNextButton();
        keycloakLoginPage.enterPassword(' ');
        keycloakLoginPage.clickLoginButton();
        keycloakLoginPage
          .getErrorMessage()
          .contains('Credentials could not be verified');
      });

      it('Rejects invalid password', () => {
        keycloakLoginPage.visit();
        keycloakLoginPage.enterEmail(email);
        keycloakLoginPage.clickNextButton();
        keycloakLoginPage.enterPassword('aA123456!@#');
        keycloakLoginPage.clickLoginButton();
        keycloakLoginPage
          .getErrorMessage()
          .contains('Credentials could not be verified');
      });

      it('Login page is reloaded after logout', () => {
        keycloakLoginPage.getSignInHeader();
        cy.loginWithKeycloak(email, password);
        portal.getGreeting();
        portal.clickLogoutLink();
        keycloakLoginPage.getSignInHeader();
        cy.url().should('include', '/login');
      });

      it('Rejects XSS Payloads', () => {
        // uses npm package to iterate through xss payloads
        common.XSS_PAYLOADS.forEach((payload: string) => {
          keycloakLoginPage.visit();
          keycloakLoginPage.enterEmail(payload);
          keycloakLoginPage.clickNextButton();
          keycloakLoginPage
            .getErrorMessage()
            .contains('A valid email is required');
        });
      });

      it('Maintains product code and callback url parameters when switching between login and signup', () => {
        keycloakLoginPage.visitWithProductCodeAndCallbackUrl();
        cy.url().should('include', '/login?p=safetyIntelligence');
        keycloakLoginPage.clickSignUpLink();
        cy.url().should('include', '/register?p=safetyIntelligence');
      });
    });
  }
);
