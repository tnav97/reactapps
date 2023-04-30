/// <reference types="cypress" />

export abstract class ForgotPasswordPage {
  // Locators //

  abstract getErrorMessage(): any;

  // Actions //

  abstract enterEmail(email: string): void;

  abstract submitForm(): void;
}

export class AzureAdForgotPasswordPage extends ForgotPasswordPage {
  // Locators //

  getErrorMessage() {
    return cy.get('.attrEntry > .error');
  }

  // Actions //

  enterEmail(email) {
    cy.get('#email').type(email, {
      parseSpecialCharSequences: false,
    });
  }

  submitForm() {
    cy.get('#continue').click();
  }
}

export class KeycloakForgotPasswordPage extends ForgotPasswordPage {
  visit() {
    cy.visit('/forgot-password');
  }
  // Locators //

  getSuccessMessage() {
    return cy.get('[data-testid=successMessage]').children('small');
  }

  getErrorMessage() {
    return cy.get('[data-testid*=rrorMessage');
  }

  // Actions //

  enterEmail(email) {
    cy.get('[data-testid=emailInput]').type(email, {
      parseSpecialCharSequences: false,
    });
  }

  submitForm() {
    cy.get('[data-testid=submitButton]').click();
  }
}
