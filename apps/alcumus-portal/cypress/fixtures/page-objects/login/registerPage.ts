/// <reference types="cypress" />

export abstract class RegisterPage {
  abstract enterEmail(email): void;

  abstract enterPassword(password): void;

  abstract enterConfirmPassword(password): void;

  abstract enterFirstName(firstName): void;

  abstract enterLastName(lastName): void;
}

export class AzureAdRegisterPage extends RegisterPage {
  // Locators
  getPageHeading() {
    return cy.get('div.intro p');
  }

  getSubmitButton() {
    return cy.get('#continue');
  }

  getFirstName() {
    return cy.get('#givenName');
  }

  getLastName() {
    return cy.get('#surname');
  }

  getEmail() {
    return cy.get('#email');
  }

  getPassword() {
    return cy.get('#newPassword');
  }

  getConfirmPassword() {
    return cy.get('#reenterPassword');
  }

  getCancelButton() {
    return cy.get('#cancel');
  }

  // Actions

  enterEmail(email) {
    cy.get('#email').type(email);
  }

  enterPassword(password) {
    cy.get('#newPassword').type(password);
  }

  enterConfirmPassword(password) {
    cy.get('#reenterPassword').type(password);
  }

  enterFirstName(firstName) {
    cy.get('#givenName').type(firstName);
  }

  enterLastName(lastName) {
    cy.get('#surname').type(lastName);
  }

  clickCancelButton() {
    this.getCancelButton().click();
  }

  submitForm() {
    this.getSubmitButton().click();
  }

  getErrorMessage() {
    return cy.get(':nth-child(1) > .attrEntry > .error');
  }
}

export class KeycloakRegisterPage extends RegisterPage {
  visit() {
    cy.visit('/register');
  }

  getFirstNameError() {
    return cy.get('[data-testid="firstNameError"]');
  }

  getLastNameError() {
    return cy.get('[data-testid="lastNameError"]');
  }

  getEmailError() {
    return cy.get('[data-testid="emailError"]');
  }

  getUsernameError() {
    return cy.get('[data-testid="usernameError"]');
  }

  getPasswordError() {
    return cy.get('[data-testid="passwordError"]');
  }

  getConfirmPasswordError() {
    return cy.get('[data-testid="confirmPasswordError"]');
  }

  getRegistrationError() {
    return cy.get('[data-testid="registrationError"]');
  }

  // Keycloak Actions

  visitWithProductCodeAndCallbackUrl(
    productCode = 'safetyIntelligence',
    callbackUrl = 'http://localhost:3002/api/auth/session'
  ) {
    cy.visit(`/register?p=${productCode}&cu=${callbackUrl}`);
  }

  enterFirstName(firstName: string) {
    cy.get('[data-testid=firstNameInput]').type(firstName);
  }

  enterLastName(lastName: string) {
    cy.get('[data-testid=lastNameInput]').type(lastName);
  }

  enterEmail(email: string) {
    cy.get('[data-testid=emailInput]').type(email);
  }

  enterUsername(username: string) {
    cy.get('[data-testid=usernameInput]').type(username);
  }

  enterPassword(password: string) {
    cy.get('[data-testid=passwordInput]').type(password);
  }

  enterConfirmPassword(password: string) {
    cy.get('[data-testid=confirmPasswordInput]').type(password);
  }

  submitForm() {
    cy.get('[data-testid=submitButton]').click();
  }

  clickLoginLink() {
    cy.get('[data-testid=loginLink]').click();
  }
}
