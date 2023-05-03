/// <reference types="cypress" />

import {
  EnterCreateAccount,
  Package,
  Pricing,
} from '../fixtures/functions/registerFunctions.cy';

describe('referral codes', () => {
  EnterCreateAccount();
  it('Enter referral code', () => {
    cy.intercept(
      'GET',
      'https://devapi.safecontractor.net/registration_transformed/client-referral?code=JS4329-572743-47',
      {
        statusCode: 200,
      }
    ).as('req');
    cy.fixture('referralResponse.json').then((referral) => {
      cy.get('[data-testid=startQuestions]').click();
      cy.get("[data-testid='referralYes']").click();
      cy.get("[data-testid='reffralCode']").clear().type(referral.referralCode);
      cy.get("[data-testid='verifyButton']").click();
      cy.get("[data-testid='employee']").click();
      cy.get('[data-testid=fiftyOneEmployee]').click();
      cy.get('[data-testid=companyType]').click();
      cy.get('[data-testid=limitedCompany]').click();
      cy.get('[data-testid=subsidiaryBusiness]').click();
      cy.get('[data-testid=subsidiaryNo]').click();
      cy.get('[data-testid=responseTime]').click();
    });
  });
  Package();
  Pricing();
  it('Verify company details value for valid referral code', () => {
    cy.fixture('referralResponse.json').then((referral) => {
      const addressLine2 = referral.company.address.addressLine2;
      const addressLine3 = referral.company.address.addressLine3;
      cy.get('[data-testid=companyNameInput]').should(
        'have.value',
        referral.company.name
      );
      cy.get('[data-testid=companyRegistrationNumberInput]').should(
        'have.value',
        referral.company.registrationNumber
      );
      cy.get('[data-testid=registrationYearInput]').should(
        'have.value',
        referral.company.registrationYear
      );
      cy.get('[data-testid=websiteInput]').should(
        'have.value',
        referral.company.website
      );
      cy.get('[data-testid=addressLine1]').should(
        'have.value',
        referral.company.address.addressLine1
      );
      cy.get('[data-testid=addressLine2]').should(
        'have.value',
        `${addressLine2} ${addressLine3}`
      );
      cy.get('[data-testid=city]').should(
        'have.value',
        referral.company.address.town
      );
      cy.get('[data-testid=postCode]').should(
        'have.value',
        referral.company.address.postCode
      );
      cy.get('[data-testid=landLineInput]').should(
        'have.value',
        referral.company.contactPerson.telephoneNumber
      );
      cy.get('[data-testid=mobilenumberInput]').should(
        'have.value',
        referral.company.contactPerson.mobileNumber
      );
    });
  });
});
