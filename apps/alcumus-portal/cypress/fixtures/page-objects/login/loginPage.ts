/// <reference types="cypress" />
export abstract class LoginPage {
  // Locators //

  abstract getSignInHeader(): any;

  abstract getErrorMessage(): any;

  // Actions //
  abstract visit(): void;

  abstract visitWithProductCodeAndCallbackUrl(): void;

  abstract enterEmail(email: string): void;

  abstract enterPassword(password: string): void;

  abstract clickLoginButton(): void;

  abstract clickSignUpLink(): void;

  abstract clickForgotPasswordLink(): void;
}

export class KeycloakLoginPage extends LoginPage {
  // Locators //

  visit() {
    return cy.visit('/login');
  }

  visitWithProductCodeAndCallbackUrl(
    productCode = 'safetyIntelligence',
    callbackUrl = 'http://localhost:3002/api/auth/session'
  ) {
    return cy.visit(`/login?p=${productCode}&cu=${callbackUrl}`);
  }

  getSignInHeader() {
    return cy.get('h2').should('contain', 'Log in');
  }

  getErrorMessage() {
    return cy.get('[data-testid*=rrorMessage');
  }

  getSignInButton() {
    return cy.get('#next');
  }

  // Actions //

  enterEmail(email: string) {
    return cy.get('[data-testid=emailInput]').type(email, {
      parseSpecialCharSequences: false,
    });
  }

  clickNextButton() {
    return cy.get('[data-testid=nextButton]').click();
  }

  enterPassword(password: string) {
    return cy.get('[data-testid=passwordInput]').type(password);
  }

  clickLoginButton() {
    return cy.get('[data-testid=submitButton]').click();
  }

  clickSignUpLink() {
    cy.get('[data-testid=signupLink]').click();
  }

  clickForgotPasswordLink() {
    return cy.get('.jss31 > .jss27').click();
  }

  enterExternalEmail(email) {
    cy.get('[id=username]').type(email);
  }

  enterExternalPassword(password) {
    cy.get('[id=password]').type(password);
  }

  clickExternalLoginButton() {
    cy.get('[id=kc-login]').click();
  }
}

export class AzureAdLoginPage extends LoginPage {
  visit() {
    cy.visit('/login');
  }

  visitWithProductCodeAndCallbackUrl(
    productCode = 'safetyIntelligence',
    callbackUrl = Cypress.config('baseUrl') + 'api/auth/session'
  ) {
    cy.visit(`/login?p=${productCode}&cu=${callbackUrl}`);
  }

  // Locators

  getSignInHeader() {
    return cy.get('h2').should('contain', 'Sign in');
  }

  getErrorMessage() {
    return cy.get('.pageLevel > p');
  }

  getSignInButton() {
    return cy.get('#next');
  }

  getSessionErrorMessage() {
    return cy.get('.MuiTypography-root');
  }

  // Actions

  clickLoginButton(): void {
    this.getSignInButton().click();
  }

  enterEmail(email: string) {
    cy.get('#signInName').type(email, { parseSpecialCharSequences: false });
  }

  enterPassword(password: string) {
    cy.get('#password').type(password);
  }

  clickSignUpLink() {
    cy.get('.signupButton').click();
  }

  clickForgotPasswordLink() {
    cy.get('#forgotPassword', { timeout: 20000 }).click();
  }

  clickSignInButton() {
    return this.getSignInButton().click();
  }
}
