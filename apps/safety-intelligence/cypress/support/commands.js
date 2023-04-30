// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { LoginPage } from '../fixtures/page-objects/loginPage';
import { NavBar } from '../fixtures/page-objects/navBar';

// TODO: Remove these timeouts when latency issues are fixed

Cypress.Commands.add('login', (email, password) => {
  const loginPage = new LoginPage();
  cy.visit('/');
  cy.wait(3000);
  cy.get('body', { timeout: 5000 }).then(($body) => {
    if ($body.find('[data-testid=userMenuIcon]').length > 0) {
      cy.logout();
    }
  });
  loginPage.getLoginHeader().should('exist');
  loginPage.enterEmail(email);
  loginPage.clickNextButton();
  loginPage.enterPassword(password);
  loginPage.clickLoginButton();

  cy.get('[data-testid="recordTable"]').should('exist');
});

Cypress.Commands.add('logout', () => {
  const navBar = new NavBar();
  const loginPage = new LoginPage();
  cy.get('[data-testid="SkeletonLoading"]')
    .should('not.exist')
    .then(() => {
      navBar.clickUserMenu();
      navBar.clickLogout();
    });
  loginPage.getLoginHeader().should('exist');
});

Cypress.Commands.add('interrupt', () => {
  // eslint-disable-next-line no-eval
  eval("window.top.document.body.querySelector('header button.stop').click()");
});
