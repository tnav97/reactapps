/// <reference types="cypress" />

export default class VerifyAccount {
  resendVerificationEmail() {
    cy.get('[data-testid=resendEmailButton]').click();
  }

  completeEmailVerification() {
    cy.contains("You're almost there!");
    this.resendVerificationEmail();
    cy.contains('Verification email sent');
  }
}
