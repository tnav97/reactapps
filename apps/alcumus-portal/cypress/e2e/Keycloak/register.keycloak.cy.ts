import { nanoid } from 'nanoid';
import { KeycloakRegisterPage } from '../../fixtures/page-objects/login/registerPage';
import { describeWhenDisabled } from '../../support/e2e';

describeWhenDisabled(
  'Alcumus Portal - Keycloak Registration Workflow',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('Starting from Keycloak Registration Page ', () => {
      const userGuid = nanoid(10);
      const email = `user.${userGuid}@test.foo`;
      const password = 'Alcdev01!';
      const keycloakRegisterPage = new KeycloakRegisterPage();

      it('Registration rejects empty input', () => {
        keycloakRegisterPage.visit();
        keycloakRegisterPage.submitForm();
        keycloakRegisterPage
          .getFirstNameError()
          .contains('First name is required');
        keycloakRegisterPage
          .getLastNameError()
          .contains('Last name is required');
        keycloakRegisterPage
          .getEmailError()
          .contains('A valid email is required');
        keycloakRegisterPage
          .getUsernameError()
          .contains('A valid username is required');
        keycloakRegisterPage.getPasswordError().contains('Password is invalid');
        keycloakRegisterPage
          .getConfirmPasswordError()
          .contains('Please confirm password');
      });
      it('Registration rejects invalid email', () => {
        keycloakRegisterPage.visit();
        keycloakRegisterPage.enterEmail('foo@');
        keycloakRegisterPage.submitForm();
        keycloakRegisterPage
          .getEmailError()
          .contains('A valid email is required');
      });

      it('Registration rejects weak passwords', () => {
        keycloakRegisterPage.visit();
        keycloakRegisterPage.enterFirstName('User');
        keycloakRegisterPage.enterLastName(userGuid);
        keycloakRegisterPage.enterEmail(`user.${userGuid}@test.foo`);
        keycloakRegisterPage.enterUsername(`user${userGuid}`);
        keycloakRegisterPage.enterPassword('WeakPassword');
        keycloakRegisterPage.enterConfirmPassword('WeakPassword');
        keycloakRegisterPage.submitForm();

        keycloakRegisterPage
          .getRegistrationError()
          .contains(
            'Please enter a strong password containing alphabets, numbers and symbols'
          );
      });

      it('User can register successfully', () => {
        keycloakRegisterPage.visit();
        keycloakRegisterPage.enterFirstName('User');
        keycloakRegisterPage.enterLastName(userGuid);
        keycloakRegisterPage.enterEmail(email);
        keycloakRegisterPage.enterUsername(`user${userGuid}`);
        keycloakRegisterPage.enterPassword(password);
        keycloakRegisterPage.enterConfirmPassword(password);
        keycloakRegisterPage.submitForm();
        cy.url().should('include', '/register');
      });

      it('Maintains product code and callback url parameters when switching between signup and login', () => {
        keycloakRegisterPage.visitWithProductCodeAndCallbackUrl();
        cy.url().should(
          'include',
          '/register?p=safetyIntelligence&cu=http://localhost:3002/api/auth/session'
        );
        keycloakRegisterPage.clickLoginLink();
        cy.url().should(
          'include',
          '/login?p=safetyIntelligence&cu=http%3A%2F%2Flocalhost%3A3002%2Fapi%2Fauth%2Fsession'
        );
      });

      it('Prevents malformed submission when CSRF token is not present', () => {
        keycloakRegisterPage.visit();
        cy.clearCookie('_csrf');
        keycloakRegisterPage.enterFirstName('User');
        keycloakRegisterPage.enterLastName(userGuid);
        keycloakRegisterPage.enterEmail(email);
        keycloakRegisterPage.enterUsername(`user${userGuid}`);
        keycloakRegisterPage.enterPassword(password);
        keycloakRegisterPage.enterConfirmPassword(password);
        keycloakRegisterPage.submitForm();
        keycloakRegisterPage
          .getRegistrationError()
          .contains('Registration failed, please try again.');
      });
    });
  }
);
