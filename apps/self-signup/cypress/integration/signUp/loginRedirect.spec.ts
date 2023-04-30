import RegistrationPage from '../../pages/signUp/registrationPage';

describe('Login button redirect', () => {
  const registrationPage: RegistrationPage = new RegistrationPage();

  it('redirects to the correct URL', () => {
    registrationPage.visit();
    registrationPage.clickLoginBtn();

    cy.location('href').should(
      'eq',
      'https://my.ecms-da.ecompliance.dev/Login'
    );
  });
});
