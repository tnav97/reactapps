/// <reference types="cypress" />

export class LoginPage {
  // Navigation Command

  visit() {
    cy.visit('/login');
  }

  // Getters

  getErrorMessage() {
    return cy.get('[data-testid=errorMessage]');
  }

  getLoginHeader() {
    return cy.get('h2').should('contain', 'Log in');
  }

  // Actions

  enterEmail(email: string) {
    cy.get('[data-testid=emailInput]').type(email, {
      parseSpecialCharSequences: false,
    });
  }

  clickNextButton() {
    cy.get('[data-testid=nextButton]').click();
  }

  enterPassword(password: string) {
    cy.get('[data-testid=passwordInput]').type(password);
  }

  clickLoginButton() {
    cy.get('[data-testid=submitButton]').click();
  }
}
