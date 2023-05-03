/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
  Pricing,
  DefaultCompanyDetails,
  Package,
} from '../fixtures/functions/registerFunctions.cy';

describe('Register a contractor with default values', () => {
  EnterCreateAccount();
  DefaultQuestionnaireValues();
  Package();
  Pricing();
  DefaultCompanyDetails();
  it('Enter Card/Cardholder Details ', () => {
    cy.get('[data-testid=paymentDetails]').click();
    cy.intercept('/api/basket').as('basket');
    cy.wait('@basket');
    cy.get('[data-testid=bacsSelected]').click();
    cy.get('[data-testid=SafeContractorMemberDiscounts]').click();
    cy.get('[data-testid=agreeTerms]').click();
    cy.get('[data-testid=payment]').click();
  });

  it('Verify Registration complete', () => {
    cy.url().should('contain', 'registrationComplete');
    cy.get('[data-testid=registrationComplete]').should('be.visible');
  });
});
