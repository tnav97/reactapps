/// <reference types="cypress" />

export default class TrialExtendedPage {
  clickContinueTrialButton() {
    cy.get('[data-testid="continueTrialButton"]').click();
  }

  confirmBodyContentIsPresent() {
    cy.containsAll([
      'Your free trial has been extended by 7 days!',
      'Continue free trial',
    ]);
  }
}
