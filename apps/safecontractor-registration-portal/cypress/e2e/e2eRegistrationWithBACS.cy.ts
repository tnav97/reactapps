/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
  Pricing,
  DefaultCompanyDetails,
  Package,
} from '../../cypress/functions/registerFunctions.cy';

describe(
  'Register a contractor with default values (smoke)',
  { tags: '@smoke' },
  () => {
    EnterCreateAccount();
    DefaultQuestionnaireValues();
    Package();
    Pricing();
    DefaultCompanyDetails();
    it('Enter BACS payment ', () => {
      cy.get('[data-testid=paymentDetails]').click();
      cy.intercept('/api/basket').as('basket');
      cy.wait('@basket');
      cy.get('[data-testid=bacsSelected]').click();
      cy.get('[data-testid=SafeContractorMemberDiscounts]').click();
      cy.get('[data-testid=agreeTerms]').click();
      cy.get('[data-testid=payment]').click();
      cy.url().should('contain', 'registrationComplete');
      cy.get('[data-testid=registrationComplete]').should('be.visible');
    });
  }
);
