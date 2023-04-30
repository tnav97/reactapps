/// <reference types="cypress" />

import {
  EnterCreateAccount,
  Pricing,
  Package,
  SSIPandSubsidiary,
} from '../../cypress/functions/registerFunctions.cy';

import {
  VerifyRegistrationFields,
  VerifyCharityFields,
  GotoCompanyType,
} from '../../cypress/functions/validation.cy';

describe('Verify company details additional fields for SOLE_TRADER_OR_PROPRIETOR', () => {
  EnterCreateAccount();
  it('Selecting company type as SOLE_TRADER_OR_PROPRIETOR', () => {
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralNo]').click();
    cy.get('[data-testid=employee]').click();
    cy.get('[data-testid=zeroEmployee]').click();
    cy.get('[data-testid=companyType]').click();
    cy.get('[data-testid=soleTraderorProprietor]').should('be.visible');
    cy.get('[data-testid=Partnership]').click();
    cy.get('[data-testid=zeroEmployeeError]').should('be.visible');
  });
});

describe('Verify company details additional fields for LIMITED_COMPANY', () => {
  EnterCreateAccount();
  it('Selecting company type as LIMITED_COMPANY', () => {
    cy.get('[data-testid=startQuestions]').click();
    cy.get('[data-testid=referralNo]').click();
    cy.get('[data-testid=employee]').click();
    cy.get('[data-testid=twoHundredEmployee]').click();
    cy.get('[data-testid=companyType]').click();
    cy.get('[data-testid=limitedCompany]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for  LIMITED_LIABILITY_PARTNERSHIP', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as  LIMITED_LIABILITY_PARTNERSHIP', () => {
    cy.get('[data-testid=limitedLiabilityPartnership]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for REGISTERED_SOCIAL_LANDLORD', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as REGISTERED_SOCIAL_LANDLORD', () => {
    cy.get('[data-testid=registeredSocialLandlord]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for PUBLIC_LIMITED_COMPANY', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as PUBLIC_LIMITED_COMPANY', () => {
    cy.get('[data-testid=publicLimitedCompany]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for CHARITY_AND_LIMITED_COMPANY', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as CHARITY_AND_LIMITED_COMPANY', () => {
    cy.get('[data-testid=charityandLimitedCompany]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyCharityFields();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for CHARITY_OR_VOLUNTARY_SECTOR', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as CHARITY_OR_VOLUNTARY_SECTOR', () => {
    cy.get('[data-testid=charityorVoluntarySector]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyCharityFields();
});

describe('Verify company details additional fields for LOCAL_AUTHORITY_COLLEGE', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as LOCAL_AUTHORITY_COLLEGE', () => {
    cy.get('[data-testid=localAuthorityCollege]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyCharityFields();
});

describe('Verify company details additional fields for UNIVERSITY', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as UNIVERSITY', () => {
    cy.get('[data-testid=University]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyCharityFields();
});

describe('Verify company details additional fields for COMPANY_LIMITED_BY_GUARANTEE', () => {
  EnterCreateAccount();
  GotoCompanyType();
  it('Selecting company type as COMPANY_LIMITED_BY_GUARANTEE', () => {
    cy.get('[data-testid=companyLimitedbyGuarantee]').click();
  });
  SSIPandSubsidiary();
  Package();
  Pricing();
  VerifyCharityFields();
});
