/// <reference types="cypress-localstorage-commands" />
import { AzureAdLoginPage } from '../fixtures/page-objects/login/loginPage';
import { describeWhenEnabled } from '../support/e2e';

describeWhenEnabled(
  'Portal - Create Organization',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('Create data for all suite', () => {
      const NewPassword = 'Safety123!';
      it('Create organization User', () => {
        cy.CreateOrganization();
        cy.fixture('users/Client_Admin_User.json').as('clientAdminUser');
        cy.get('@clientAdminUser').then((val: any) => {
          cy.newUserLoginChangePassword(
            val.userEmail,
            val.password,
            NewPassword
          );
          const expectedKey = 'password';
          cy.readFile('cypress/fixtures/users/Client_Admin_User.json').then(
            (appDetails) => {
              appDetails[expectedKey] = NewPassword; // add (or overwrite) new key
              cy.writeFile(
                'cypress/fixtures/users/Client_Admin_User.json',
                appDetails
              );
            }
          );
        });
        cy.getLocalStorage('accessToken').then((Token) => {
          const a = Token?.replace('"', '').replace('"', '');
          cy.writeFile('cypress/fixtures/token.json', '');
          cy.writeFile('cypress/fixtures/token.json', { token: a });
        });
      });

      it('Create standard User', () => {
        cy.CreateStandardUser();
        cy.fixture('users/Standard_User.json').as('standardUserData');
        cy.get('@standardUserData').then((val: any) => {
          cy.newUserLoginChangePassword(
            val.userEmail,
            val.password,
            NewPassword
          );
          const expectedKey = 'password';
          cy.readFile('cypress/fixtures/users/Standard_User.json').then(
            (appDetails) => {
              appDetails[expectedKey] = NewPassword; // add (or overwrite) new key
              cy.writeFile(
                'cypress/fixtures/users/Standard_User.json',
                appDetails
              );
            }
          );
        });
      });

      it('Create api organization user with subscription', () => {
        const azureAdloginPage = new AzureAdLoginPage();
        azureAdloginPage.visit();
        cy.loginWithAzureAd('portaladmin@alcumus.com', 'Safety123!');
        cy.getLocalStorage('accessToken').then((Token) => {
          const a = Token?.replace('"', '').replace('"', '');
          cy.writeFile('cypress/fixtures/alcumusAdmintoken.json', '');
          cy.writeFile('cypress/fixtures/alcumusAdmintoken.json', { token: a });
        });
        cy.CreateSubscriptionForOrganization();
      });
    });
  }
);
