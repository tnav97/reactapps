/// <reference types="cypress" />

import { EnterCreateAccount } from '../../cypress/functions/registerFunctions.cy';

describe('Validating subsidiary ', () => {
  EnterCreateAccount();
  it('Selecting Questionnaire values', () => {
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralNo]').click();
    cy.get('[data-testid=employee]').click();
    cy.get('[data-testid=fiftyOneEmployee]').click();
    cy.get('[data-testid=companyType]').click();
    cy.get('[data-testid=limitedCompany]').click();
    cy.get('[data-testid=SSIPQuestion]').click();
    cy.get('[data-testid=ssipNo]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
  });

  it('Verify Subsidiary for invalid error message', () => {
    cy.get('[data-testid=subsidiaryYes]').click();
    cy.get('[data-testid=companyName0]').should('be.enabled').type('test');
    cy.get('[data-testid=registrationNumber0]')
      .should('be.enabled')
      .type('2343');
    cy.get('[data-testid=registrationNumberError0]')
      .should('be.visible')
      .contains('Format must be XX123456 or 12345678');
  });

  it('Verify Subsidiary YES option wih delete ', () => {
    cy.get('[data-testid=subsidiaryYes]').click();
    cy.get('[data-testid=companyName0]')
      .clear()
      .should('be.enabled')
      .type('test');
    cy.get('[data-testid=registrationNumber0]')
      .clear()
      .should('be.enabled')
      .type('23434543');
    cy.get('[data-testid=addAnotherButton]').should('be.enabled').click();
    cy.get('[data-testid=companyName1]').should('be.enabled').type('test');
    cy.get('[data-testid=registrationNumber1]')
      .should('be.enabled')
      .type('23434543');
    cy.get('[data-testid=reset0]').should('be.visible');
    cy.get('[data-testid=remove1]').should('be.visible').click();
    cy.get('[data-testid=choosePlan]').should('be.enabled');
  });

  it('Check the value existing for YES after selecting No and then back to YES  ', () => {
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').should('be.enabled');
    cy.get('[data-testid=subsidiaryYes]').click();
    cy.get('[data-testid=companyName0]').should('be.visible');
    cy.get('[data-testid=registrationNumber0]').should('be.visible');
  });
});
