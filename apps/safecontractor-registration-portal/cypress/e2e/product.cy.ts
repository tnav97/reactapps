/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
} from '../../cypress/functions/registerFunctions.cy';

import { GoBackToResponseTime } from '../../cypress/functions/pricingFunction.cy';

EnterCreateAccount();
DefaultQuestionnaireValues();
describe('Verify Standard package recommandation', () => {
  it('Verify Standard', () => {
    cy.get('[data-testid=twentyWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportNo]').click();
    cy.get('[data-testid=choosePlan]').click();
    cy.contains(
      'Based on your responses, it looks like the best Plan for you is the Standard Plan.'
    );
  });
});

describe('Verify Express package recommandation', () => {
  GoBackToResponseTime();
  it('Verify Express', () => {
    cy.get('[data-testid=fiveWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportNo]').click();
    cy.get('[data-testid=choosePlan]').click();
    cy.contains(
      'Based on your responses, it looks like the best Plan for you is the Express Plan.'
    );
  });
});

describe('Verify Assisted package recommandation', () => {
  GoBackToResponseTime();
  it('Verify Assisted', () => {
    cy.get('[data-testid=twentyWorkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportYes]').click();
    cy.get('[data-testid=choosePlan]').click();
    cy.contains(
      'Based on your responses, it looks like the best Plan for you is the Assisted Plan.'
    );
  });
});

describe('Verify Premier package recommandation', () => {
  GoBackToResponseTime();
  it('Verify Premier', () => {
    cy.get('[data-testid=twoworkingDays]').click();
    cy.get('[data-testid=needSupport]').click();
    cy.get('[data-testid=doYouRequireSupportYes]').click();
    cy.get('[data-testid=choosePlan]').click();
    cy.contains(
      'Based on your responses, it looks like the best Plan for you is the Premier Plan.'
    );
  });
});
