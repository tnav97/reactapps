import { getApiKeyAxios } from '../fixtures/common/axios';
import { Portal } from '../fixtures/page-objects/portal';
import { LoginPage } from '../fixtures/page-objects/login/loginPage';
import { AzureADChangePasswordPage } from '../fixtures/page-objects/login/AzureADChangePasswordPage';
import { CreateUserRequest } from '../fixtures/users/typesV1';
import { Generators } from '../fixtures/common/generators';

describe('Password Migration Flows - Users Batch Import', () => {
  const loginPage = new LoginPage();
  const azureADChangePasswordPage = new AzureADChangePasswordPage();
  const portal = new Portal();
  let userToCreate: CreateUserRequest;
  let email: string;

  beforeEach(() => {
    email = Generators.email();
    userToCreate = {
      firstName: 'Bruce',
      lastName: 'Wayne',
      email,
      createAccount: true,
      password: Generators.password(),
    };
    const axiosInstance = getApiKeyAxios(false);

    cy.wrap(
      axiosInstance.post(
        Cypress.env('SERVICES_BASE_URL') + '/users/api/v1/users',
        userToCreate,
        {
          headers: {
            'x-api-key': Cypress.env('API_KEY'),
            'Content-Type': 'application/json',
          },
        }
      )
    );
    loginPage.visit();
  });

  it.skip('Credentials imported from Keycloak when user is imported and logs in for the first time', () => {
    const newPassword = Generators.password();
    loginPage.enterEmailAD(email);
    loginPage.enterPasswordAD(userToCreate.password as string);
    loginPage.clickSignInButtonAD();
    azureADChangePasswordPage.getSignInHeader();
    azureADChangePasswordPage.enterPassword(newPassword);
    azureADChangePasswordPage.enterConfirmPassword(newPassword);
    azureADChangePasswordPage.submitFormAD();
    portal.getGreeting().should('exist');
  });

  it.skip('Should be able to logout and login with the new credentials', () => {
    const newPassword = Generators.password();
    loginPage.enterEmailAD(email);
    loginPage.enterPasswordAD(userToCreate.password as string);
    loginPage.clickSignInButtonAD();
    azureADChangePasswordPage.getSignInHeader();
    azureADChangePasswordPage.enterPassword(newPassword);
    azureADChangePasswordPage.enterConfirmPassword(newPassword);
    azureADChangePasswordPage.submitFormAD();
    portal.getGreeting().should('exist');

    // logout and log back in
    portal.clickLogoutLink();
    loginPage.getSignInHeader().should('exist');
    loginPage.getSignInHeader().should('exist');
    cy.wait(1000);
    loginPage.enterEmailAD(email);
    loginPage.enterPasswordAD(newPassword);
    loginPage.clickSignInButtonAD();
    portal.getGreeting().should('exist');
    portal.clickLogoutLink();
  });
  it.skip('Enter incorrect password', () => {
    loginPage.enterEmailAD(email);
    loginPage.enterPasswordAD('wrongpassword');
    loginPage.clickSignInButtonAD();
    loginPage.getErrorMessageAD().contains('Credentials were not valid.');
  });
});
