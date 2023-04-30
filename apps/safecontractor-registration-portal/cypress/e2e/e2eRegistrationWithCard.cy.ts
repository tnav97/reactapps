/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
  Pricing,
  DefaultCompanyDetails,
  CardPaymentSelection,
  Package,
} from '../../cypress/functions/registerFunctions.cy';

describe('Register a contractor with default values', () => {
  EnterCreateAccount();
  DefaultQuestionnaireValues();
  Package();
  Pricing();
  DefaultCompanyDetails();
  CardPaymentSelection();

  it('Enter Card/Cardholder Details ', () => {
    cy.get('#cardNumber').type('4444333322221111');
    cy.get('#expiryMonth').type('12');
    cy.get('#expiryYear').type('28');
    cy.get('#securityCode').type('123');
    cy.get('#submitButton').click();
    cy.url().should('contain', 'orderConfirmation');
    cy.get('[data-testid="orderConifrmation"]').should('be.visible');
  });
});
