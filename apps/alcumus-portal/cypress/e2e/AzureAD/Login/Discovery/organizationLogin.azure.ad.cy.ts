import { describeWhenEnabled } from '../../../../support/e2e';
import { OrganizationSignInPage } from '../../../../fixtures/page-objects/login/discovery/OrganizationSignInPage';
import { AzureAdLoginPage } from '../../../../fixtures/page-objects/login/loginPage';

describeWhenEnabled(
  'Alcumus Portal - Organization SignIn Functional',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('Starting On Load Page Validation ', () => {
      const organizationSignInPage = new OrganizationSignInPage();
      const azureAdLoginPage = new AzureAdLoginPage();

      it('C31751 Verify Organization elements State on page load', () => {
        organizationSignInPage.visit();
        cy.url().should('include', 'login/discovery');
        organizationSignInPage
          .getPageHeading()
          .invoke('text')
          .should('eq', 'Sign in with your organization account');
        organizationSignInPage
          .getOrganizationDomainInput()
          .should('be.visible')
          .invoke('attr', 'placeholder')
          .should('eq', 'contoso');
        organizationSignInPage
          .getAdornmentInput()
          .should('be.visible')
          .invoke('text')
          .should('eq', '.alcumus.com');
        organizationSignInPage
          .getRememberMeInput()
          .invoke('attr', 'type')
          .should('eq', 'checkbox');
        organizationSignInPage
          .getRememberMeText()
          .invoke('text')
          .should('eq', 'Remember my organization');
        organizationSignInPage
          .getContinueButton()
          .should('be.visible')
          .should('be.disabled')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)')
          .should('contain', 'Continue');
        organizationSignInPage
          .getLogInButton()
          .should('be.visible')
          .should('not.be.disabled')
          .should('have.css', 'background-color', 'rgb(255, 255, 255)')
          .should('contain', 'Log in with email & password');
        organizationSignInPage.getDomainErrorMessage().should('not.exist');
        organizationSignInPage
          .getTermsAndCondition()
          .invoke('attr', 'href')
          .should('eq', 'https://www.ecompliance.com/legal/');
        organizationSignInPage
          .getTermsAndCondition()
          .invoke('text')
          .should('eq', 'Terms and Conditions');
        organizationSignInPage
          .getPrivacyPolicy()
          .invoke('text')
          .should('eq', 'Privacy Policy');
        organizationSignInPage
          .getPrivacyPolicy()
          .invoke('attr', 'href')
          .should('eq', 'https://www.ecompliance.com/privacy/');
      });

      it('C31752 Verify Continue button validation', () => {
        organizationSignInPage.visit();
        organizationSignInPage.getPageHeading().should('be.visible');
        organizationSignInPage.getOrganizationDomainInput().type('1');
        organizationSignInPage
          .getContinueButton()
          .should('not.be.disabled')
          .should('have.css', 'background-color', 'rgb(0, 108, 181)');
        organizationSignInPage.getOrganizationDomainInput().clear();
        organizationSignInPage
          .getContinueButton()
          .should('be.disabled')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
        organizationSignInPage.getOrganizationDomainInput().type(' ');
        organizationSignInPage
          .getContinueButton()
          .should('be.disabled')
          .should('have.css', 'background-color', 'rgba(0, 108, 181, 0.3)');
      });

      it('C31753 Verify Organization Domain field validation error', () => {
        organizationSignInPage.visit();
        organizationSignInPage.getPageHeading().should('be.visible');
        organizationSignInPage.getOrganizationDomainInput().type('1{enter}');
        organizationSignInPage
          .getDomainErrorMessage()
          .should('be.visible')
          .invoke('text')
          .should(
            'eq',
            'Could not locate organization domain. Please contact your organization administrator.'
          );
      });

      it('C31754 Verify valid Organization Domain name logs you in', () => {
        organizationSignInPage.visit();
        organizationSignInPage.getPageHeading().should('be.visible');
        organizationSignInPage
          .getOrganizationDomainInput()
          .type('alcumus{enter}');
        organizationSignInPage.clickContinueButton();
        organizationSignInPage.getDomainErrorMessage().should('not.exist');
      });

      it('C31755 Verify Login with Email and Password take you to correct page', () => {
        organizationSignInPage.visit();
        organizationSignInPage.getPageHeading().should('be.visible');
        organizationSignInPage.clickLoginWithEmailAndPasswordButton();
        azureAdLoginPage.getSignInHeader().should('be.visible');
      });
    });
  }
);
