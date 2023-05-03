/// <reference types="cypress" />

import { EnterCreateAccount } from '../fixtures/functions/registerFunctions.cy';

describe('referral codes', () => {
  EnterCreateAccount();
  it('Enter referral code', () => {
    cy.intercept(
      'GET',
      'https://devapi.safecontractor.net/registration_transformed/client-referral?code=GG9709-572533-14',
      {
        statusCode: 200,
        body: validReferral,
      }
    ).as('req');
    cy.get('[data-testid=startQuestions]').click();
    cy.get("[data-testid='referralYes']").click();
    cy.get("[data-testid='reffralCode']").clear().type('GG9709-572533-14');
    cy.get("[data-testid='verifyButton']").click();
    cy.get("[data-testid='employee']").click();
  });

  it('Verify the error message for Invalid/Used referral code', () => {
    cy.intercept(
      'GET',
      'https://devapi.safecontractor.net/registration_transformed/client-referral?code=GG9709-572533-14',
      {
        statusCode: 500,
        body: invalidReferral,
      }
    ).as('req');
    cy.get('[data-testid=referral]').click();
    cy.get("[data-testid='referralYes']").click();
    cy.get("[data-testid='reffralCode']").clear().type('AB0000-572533-14');
    cy.get("[data-testid='verifyButton']").click();
    cy.get("[data-testid='reffralCodeError']")
      .contains('Code not recognised')
      .should('be.visible');
  });
});

const validReferral = {
  id: 'a5f45967-6c82-41a7-b92e-c8b352b5af31',
  referralCode: 'GG9709-572533-14',
  clientId: '572533',
  scProductVersion: '3c563b44-e128-11ec-83a9-0242ac120002',
  mandatedAddOns: [
    {
      brand: 'SAFECONTRACTOR',
      addOns: [],
    },
  ],
  company: {
    id: '731932',
    coref: 'GG9709',
    name: 'Zuci Referral 21',
    address: {
      addressLine1: 'CF46 5HK',
      addressLine2: 'Mr',
      addressLine3: 'Thirty Six',
      town: null,
      county: null,
      postCode: null,
    },
    billingAddress: null,
    contactPerson: {
      title: null,
      firstName: 'Address 39',
      surname: 'Street 29',
      emailAddress: '8.662662664E9',
      telephoneNumber: null,
      mobileNumber: null,
    },
    noOfEmployees: null,
    organisationType: null,
    otherOrganisationType: null,
    registrationNumber: null,
    registrationYear: null,
    charityNumber: null,
    charityYear: null,
    website: null,
  },
};

const invalidReferral = {
  success: false,
  errors: ['Referral code invalid.'],
};
