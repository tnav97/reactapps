/// <reference types="cypress" />

export class EditOrganizationLocationPage {
  // Locators

  getPageHeading() {
    return cy.get('div h4').eq(4);
  }

  getOrganizationLocationCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getAddress1() {
    return cy.get('[data-testid=addressLineInput]');
  }

  getCity() {
    return cy.get('[data-testid=cityInput]');
  }

  getState() {
    return cy.get('[data-testid=stateProvinceInput]');
  }

  getZip() {
    return cy.get('[data-testid=zipPostalCodeInput]');
  }

  getCountry() {
    return cy.get('[data-testid=countryInput]');
  }

  getCancelButton() {
    return cy.get('[data-testid=cancelButton]');
  }

  getSaveButton() {
    return cy.get('[data-testid=saveButton]');
  }

  // Actions

  clickOrganizationLocationCloseButton() {
    this.getOrganizationLocationCloseButton().click();
  }

  clickOrganizationLocationCancelButton() {
    this.getCancelButton().click();
  }

  clickOrganizationLocationSaveButton() {
    this.getSaveButton().click();
  }
}
