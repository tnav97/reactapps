/// <reference types="cypress" />

import { EnterCreateAccount } from '../../cypress/functions/registerFunctions.cy';
import {
  GoToEmployee,
  GoToPaymentDetails,
  checkPrices,
  GoToPaymentWithSubsidiary,
} from '../../cypress/functions/pricingFunction.cy';
context('pricing', () => {
  describe('Verify pricing for 5 employees', () => {
    EnterCreateAccount();
    GoToEmployee();
    it('5 employee Limited Company', () => {
      cy.get('[data-testid=fiveEmployee]').click();
    });
    GoToPaymentDetails();
    checkPrices(5);
  });

  describe('Verify pricing for 100 employees', () => {
    EnterCreateAccount();
    GoToEmployee();
    it('100 employee Limited Company', () => {
      cy.get('[data-testid=fiftyOneEmployee]').click();
    });
    GoToPaymentDetails();
    checkPrices(100);
  });

  describe('Verify pricing for 1000+  employees', () => {
    EnterCreateAccount();
    GoToEmployee();
    it('1000+ employees Limited Company', () => {
      cy.get('[data-testid=thousandPlusEmployee]').click();
    });
    GoToPaymentDetails();
    checkPrices(1000);
  });

  describe('Verify pricing for 1000+  employees with Subsidiary', () => {
    EnterCreateAccount();
    GoToEmployee();
    it('1000+ employees Limited Company', () => {
      cy.get('[data-testid=thousandPlusEmployee]').click();
    });
    GoToPaymentWithSubsidiary();
    checkPrices('sub');
  });
});
