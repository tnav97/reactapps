import { Portal } from '../../../../fixtures/page-objects/portal';
import { describeWhenEnabled } from '../../../../support/e2e';
import { KeycloakLoginPage } from '../../../../fixtures/page-objects/login/loginPage';

describeWhenEnabled(
  'Alcumus Portal - SAML Login Flow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('Starting from SAML Login Page ', () => {
      const keycloakLoginPage = new KeycloakLoginPage();
      const portal = new Portal();

      it('Redirects to SAML Login Page successfully', () => {
        cy.visit('/login?oi=acme');
        cy.url().should(
          'include',
          'wildbreeze-qa01.ecompliance.com/cloak/realms/Acme/'
        );
      });

      it('Can login successfully using SAML provider', () => {
        cy.visit('/login?oi=acme');
        keycloakLoginPage.enterExternalEmail('saml_user');
        keycloakLoginPage.enterExternalPassword('Alcdev01!');
        keycloakLoginPage.clickExternalLoginButton();
        portal.getGreeting();
        portal.clickLogoutLink();
      });
    });
  }
);
