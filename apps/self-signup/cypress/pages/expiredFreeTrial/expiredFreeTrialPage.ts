/// <reference types="cypress" />

export default class ExpiredFreeTrialPage {
  clickContactSalesButton() {
    cy.get('[data-testid="contactSalesButton"]').click();
  }

  clickExtendTrialButton() {
    cy.get('[data-testid="extendTrialButton"]').click();
  }

  confirmBodyContentIsPresent() {
    cy.containsAll([
      'Your free trial has expired...',
      'Please select an option below to continue using Alcumus',
      'Extend my free trial',
      'Contact sales to subscribe',
    ]);
  }

  confirmTrialEndedContentIsPresent() {
    cy.containsAll([
      'Your free trial extension has come to an end.',
      'To continue using Alcumus, you will need to upgrade to a paid subscription.',
      'Contact sales to subscribe',
    ]);
  }
}
