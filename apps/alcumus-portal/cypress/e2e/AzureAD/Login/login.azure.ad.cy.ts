import { Portal } from '../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../support/e2e';
import { AzureAdLoginPage } from '../../../fixtures/page-objects/login/loginPage';
import { Common } from '../../../fixtures/functions/common';
import standardUser from '../../../fixtures/users/Standard_User.json';

describeWhenEnabled(
  'Alcumus Portal - Azure AD | Login Workflow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('Starting from Azure AD Login Page ', () => {
      const azureAdloginPage = new AzureAdLoginPage();
      const portal = new Portal();
      const common = new Common();

      it('C31454 Opens the correct login page', () => {
        azureAdloginPage.visit();
        azureAdloginPage.getSignInButton().should('be.visible');
      });

      it('C31455 Verify Successful login', () => {
        azureAdloginPage.getSignInButton().should('be.visible');
        azureAdloginPage.enterEmail(standardUser.userEmail);
        azureAdloginPage.enterPassword(standardUser.password);
        azureAdloginPage.clickSignInButton();
        portal.getGreeting().should('exist');
      });

      it('C41201 Prevents malformed submission when CSRF token is not present', () => {
        cy.visit('/login?oi=none');
        azureAdloginPage.getSignInHeader().should('be.visible');
        cy.clearCookie('_csrf');
        azureAdloginPage.enterEmail(standardUser.userEmail);
        azureAdloginPage.enterPassword(standardUser.password);
        azureAdloginPage.clickSignInButton();
        azureAdloginPage
          .getSessionErrorMessage()
          .should('contain', 'Session could not be established');
      });

      it('C31456 Verify successful login through form submission using Enter key', () => {
        azureAdloginPage.visit();
        azureAdloginPage.getSignInHeader().should('be.visible');
        azureAdloginPage.enterEmail(standardUser.userEmail);
        azureAdloginPage.enterPassword(standardUser.password);
        cy.get('body').type('{enter}');
        portal.getGreeting();
        portal.getGreeting().should('exist');
      });

      it('C31457 Rejects empty email/password', () => {
        azureAdloginPage.visit();
        azureAdloginPage.getSignInButton().should('be.disabled');
        azureAdloginPage.enterEmail(standardUser.userEmail);
        azureAdloginPage.getSignInButton().should('be.disabled');
      });

      it('C31458 Rejects invalid password', () => {
        azureAdloginPage.visit();
        azureAdloginPage.enterEmail(standardUser.userEmail);
        azureAdloginPage.enterPassword('aA123456!@#');
        azureAdloginPage.clickSignInButton();
        azureAdloginPage
          .getErrorMessage()
          .contains(
            'The username or password provided in the request are invalid.'
          );
      });

      it('C31459 Verify Login page is reloaded after logout', () => {
        azureAdloginPage.visit();
        azureAdloginPage.getSignInHeader();
        cy.loginWithAzureAd(standardUser.userEmail, standardUser.password);
        portal.getGreeting();
        portal.clickLogoutLink();
        azureAdloginPage.getSignInHeader();
        cy.url().should('include', 'login');
      });

      it('C31460 verify email field Rejects XSS Payloads', () => {
        // uses npm package to iterate through xss payloads
        common.XSS_PAYLOADS.forEach((payload: string) => {
          azureAdloginPage.visit();
          azureAdloginPage.enterEmail(payload);
          azureAdloginPage.enterPassword(standardUser.userEmail);
          azureAdloginPage.clickSignInButton();
          azureAdloginPage.getErrorMessage().should('exist');
        });
      });

      it('C41202 Maintains callback url parameters when switching between login and signup', () => {
        azureAdloginPage.visitWithProductCodeAndCallbackUrl(
          'safetyIntelligence',
          'https://safety-intelligence.qa.ecompliance.dev/api/auth/session'
        );
        cy.url().should('include', 'authorize?client_id');
        azureAdloginPage.clickSignUpLink();
        cy.url().should('include', 'local=signup&csrf_token=');
      });
    });
  }
);
