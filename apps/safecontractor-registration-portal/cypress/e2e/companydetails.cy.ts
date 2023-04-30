/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
  Package,
  Pricing,
  DefaultCompanyDetails,
} from '../../cypress/functions/registerFunctions.cy';

describe('Register a contractor with default values', () => {
  EnterCreateAccount();
  DefaultQuestionnaireValues();
  Package();
  Pricing();
  DefaultCompanyDetails();
  it('Verify company details with valid inputs with billing address', () => {
    cy.fixture('defaultValues.json').then((company) => {
      cy.get('[data-testid="isBillingAddress"]').click();
      cy.get('[data-testid=toggleBillingAddress').click({ force: true });
      cy.get('[data-testid=billingAddress1]')
        .clear()
        .type(company.billingaddress1);
      cy.get('[data-testid=billingAddress2]')
        .clear()
        .type(company.billingaddress2);
      cy.get('[data-testid=billingCity]').clear().type(company.billingcity);
      cy.get('[data-testid=billingPostCode]').clear().type(company.postcode);
      cy.get('[data-testid=paymentDetails]').should('be.enabled');
    });
  });

  it('Verify company details with invalid inputs with billing address', () => {
    cy.fixture('defaultValues.json').then((company) => {
      cy.get('[data-testid=companyRegistrationNumberInput]')
        .clear()
        .type(company.invalidRegistartionNumber);
      cy.get('[data-testid=companyNameError]')
        .should('be.visible')
        .contains('Format must be XX123456 or 12345678');
      cy.get('[data-testid=registrationYearInput]')
        .clear()
        .type(company.invalidRegistartionYear);
      cy.get('[data-testid=registrationYearError]')
        .should('be.visible')
        .contains('Please enter a valid four-digit year');
      cy.get('[data-testid=postCode]').clear().type(company.invalidPostcode);
      cy.get('[data-testid=addressPostcodeError]')
        .should('be.visible')
        .contains('Please enter a valid UK post code');
      cy.get('[data-testid=landLineInput]')
        .clear()
        .type(company.invalidLandline);
      cy.get('[data-testid=landlinePhoneError]')
        .should('be.visible')
        .contains('Please enter a valid Landline Number');
      cy.get('[data-testid=mobilenumberInput]')
        .clear()
        .type(company.invalidMobile);
      cy.get('[data-testid=mobilePhoneError]')
        .should('be.visible')
        .contains('Please enter a valid UK mobile number');
      cy.get('[data-testid=billingPostCode]').type('87HD');
      cy.get('[data-testid=billingAddressPostcodeError]')
        .should('be.visible')
        .contains('Please enter a valid UK post code');
      cy.get('[data-testid=paymentDetails]').should('be.disabled');
    });
  });
});
