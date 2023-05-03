/// <reference types="cypress" />

import {
  EnterCreateAccount,
  Pricing,
  Package,
} from '../fixtures/functions/registerFunctions.cy';

import {
  VerifyRegistrationFields,
  VerifyCharityFields,
  GotoCompanyType,
} from '../fixtures/functions/validation.cy';

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
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for  LIMITED_LIABILITY_PARTNERSHIP', () => {
  GotoCompanyType();
  it('Selecting company type as  LIMITED_LIABILITY_PARTNERSHIP', () => {
    cy.get('[data-testid=limitedLiabilityPartnership]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for REGISTERED_SOCIAL_LANDLORD', () => {
  GotoCompanyType();
  it('Selecting company type as REGISTERED_SOCIAL_LANDLORD', () => {
    cy.get('[data-testid=registeredSocialLandlord]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for PUBLIC_LIMITED_COMPANY', () => {
  GotoCompanyType();
  it('Selecting company type as PUBLIC_LIMITED_COMPANY', () => {
    cy.get('[data-testid=publicLimitedCompany]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for CHARITY_AND_LIMITED_COMPANY', () => {
  GotoCompanyType();
  it('Selecting company type as CHARITY_AND_LIMITED_COMPANY', () => {
    cy.get('[data-testid=charityandLimitedCompany]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyCharityFields();
  VerifyRegistrationFields();
});

describe('Verify company details additional fields for CHARITY_OR_VOLUNTARY_SECTOR', () => {
  GotoCompanyType();
  it('Selecting company type as CHARITY_OR_VOLUNTARY_SECTOR', () => {
    cy.get('[data-testid=charityorVoluntarySector]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyCharityFields();
});

describe('Verify company details additional fields for LOCAL_AUTHORITY_COLLEGE', () => {
  GotoCompanyType();
  it('Selecting company type as LOCAL_AUTHORITY_COLLEGE', () => {
    cy.get('[data-testid=localAuthorityCollege]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyCharityFields();
});

describe('Verify company details additional fields for UNIVERSITY', () => {
  GotoCompanyType();
  it('Selecting company type as UNIVERSITY', () => {
    cy.get('[data-testid=University]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyCharityFields();
});

describe('Verify company details additional fields for COMPANY_LIMITED_BY_GUARANTEE', () => {
  GotoCompanyType();
  it('Selecting company type as COMPANY_LIMITED_BY_GUARANTEE', () => {
    cy.get('[data-testid=companyLimitedbyGuarantee]').click();
    cy.get('[data-testid=subsidiaryBusiness]').click();
    cy.get('[data-testid=subsidiaryNo]').click();
    cy.get('[data-testid=responseTime]').click();
  });
  Package();
  Pricing();
  VerifyCharityFields();
});
