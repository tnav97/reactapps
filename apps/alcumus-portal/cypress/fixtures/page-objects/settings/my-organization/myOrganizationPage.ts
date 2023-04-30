/// <reference types="cypress" />

export class MyOrganizationPage {
  visit() {
    cy.visit('/settings/my-organization');
  }

  // Locators

  getPageHeading() {
    return cy.get('[data-testid=myOrganizationPageHeader]');
  }

  getSubHeading1() {
    return cy.get('[data-testid=organizationDetailsHeader]');
  }

  getOrganizationDetailsEidtButton() {
    return cy.get('[data-testid=organizationDetailsHeader] + button');
  }

  getOrganizationName() {
    return cy.get('[data-testid=OrganizationNameValue]');
  }

  getOrganizationType() {
    return cy.get('[data-testid=OrganizationIndustryTypeValue]');
  }

  getOrganizationSize() {
    return cy.get('[data-testid=OrganizationDetailsSizeValue]');
  }

  getOrganizationWebsite() {
    return cy.get('[data-testid=OrganizationDetailsWebsiteValue]');
  }

  getOrganizationLanguage() {
    return cy.get('[data-testid=OrganizationDetailsLanguageValue]');
  }

  getSubHeading2() {
    return cy.get('[data-testid=organizationContactInformationHeader]');
  }

  getContactDetailsEidtButton() {
    return cy.get(
      '[data-testid=organizationContactInformationHeader] + button'
    );
  }

  getEmailAddress() {
    return cy.get('[data-testid=organizationContactInformationEmailValue]');
  }

  getPhoneNumber() {
    return cy.get(
      '[data-testid=organizationContactInformationPhoneNumberValue]'
    );
  }

  getFaxNumber() {
    return cy.get('[data-testid=organizationContactInformationFaxValue]');
  }

  getSubHeading3() {
    return cy.get('[data-testid=organizationLocationHeader]');
  }

  getOrganizationLocationEditButton() {
    return cy.get('[data-testid=organizationLocationSection] button');
  }

  getAddress1() {
    return cy.get('[data-testid=organizationLocationAddressLine1Value]');
  }

  getCity() {
    return cy.get('[data-testid=organizationLocationCityValue]');
  }

  getState() {
    return cy.get('[data-testid=organizationLocationStateValue]');
  }

  getZip() {
    return cy.get('[data-testid=organizationLocationPostalCodeValue]');
  }

  getCountry() {
    return cy.get('[data-testid=organizationLocationCountryValue]');
  }

  // Actions

  clickOrganizationDetailsEditButton() {
    this.getOrganizationDetailsEidtButton().click();
  }

  clickContactDetailsEditButton() {
    this.getContactDetailsEidtButton().click();
  }

  clickOrganizationLoactionEditButton() {
    this.getOrganizationLocationEditButton().click();
  }
}
