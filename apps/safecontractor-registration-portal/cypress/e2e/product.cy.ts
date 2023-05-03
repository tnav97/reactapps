/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
} from '../fixtures/functions/registerFunctions.cy';

EnterCreateAccount();
DefaultQuestionnaireValues();
describe('Verify package recommandation', () => {
  it('Verify Standard', () => {
    cy.get('[data-testid=twentyWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportNo]').click();
    cy.get('[data-testid="choosePlan"]').click();
    cy.get('[data-testid=Standardplan]').should('contain', 'Standard plan');
  });

  it('Verify Express', () => {
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=responseTime]').click();
    cy.get('[data-testid=fiveWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportNo]').click();
    cy.get('[data-testid="choosePlan"]').click();
    cy.get('[data-testid=Expressplan]').should('contain', 'Express plan');
  });

  it('Verify Assisted', () => {
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=responseTime]').click();
    cy.get('[data-testid=twentyWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportYes]').click();
    cy.get('[data-testid="choosePlan"]').click();
    cy.get('[data-testid=Assistedplan]').should('contain', 'Assisted plan');
  });

  it('Verify Premier', () => {
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=responseTime]').click();
    cy.get('[data-testid=twoworkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportYes]').click();
    cy.get('[data-testid="choosePlan"]').click();
    cy.get('[data-testid=Premierplan]').should('contain', 'Premier plan');
  });
});
