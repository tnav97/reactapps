/// <reference types="cypress" />

import { EnterCreateAccount } from '../../cypress/functions/registerFunctions.cy';

describe('referral codes', () => {
  EnterCreateAccount();
  it('Enter referral code', () => {
    const validRefferalCode = 'GG9709-572533-14';
    cy.get('[data-testid=startQuestions]').click();
    cy.get("[data-testid='referralYes']").click();
    cy.get("[data-testid='reffralCode']").clear().type(validRefferalCode);
    cy.get("[data-testid='verifyButton']").click();
    cy.get("[data-testid='employee']").click();
  });

  it('Verify the error message for Invalid/Used referral code', () => {
    const invalidReferralCode = 'AB0000-572533-14';
    cy.get('[data-testid=referral]').click();
    cy.get("[data-testid='referralYes']").click();
    cy.get("[data-testid='reffralCode']").clear().type(invalidReferralCode);
    cy.get("[data-testid='verifyButton']").click();
    cy.get("[data-testid='reffralCodeError']")
      .contains('Code not recognised')
      .should('be.visible');
  });
});
