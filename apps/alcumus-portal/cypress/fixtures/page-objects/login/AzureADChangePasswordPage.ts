/// <reference types="cypress" />

export class AzureADChangePasswordPage {
  // Keycloak Getters

  getErrMsg() {
    return cy.get('[data-testid*=rrorMessage');
  }

  getSuccessMsg() {
    return cy.get('[data-testid=successMessage]').children('small');
  }

  enterPassword(password) {
    return cy.get('#newPassword').type(password);
  }

  enterConfirmPassword(password) {
    cy.wait(1000);
    return cy.get('#reenterPassword').type(password);
  }

  // Keycloak Actions
  getSignInHeader() {
    return cy.get('#newPassword_label');
  }

  submitForm() {
    return cy.get('[data-testid=submitButton]').click();
  }

  // Azure AD Actions

  submitFormAD() {
    return cy.get('#continue').click();
  }
}
