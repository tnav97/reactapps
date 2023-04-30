/// <reference types="cypress" />

export class EditOrganizationDetailsPage {
  // Locators

  getPageHeading() {
    return cy.get('div h4').eq(4);
  }

  getOrganizationDetailsCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getOrganizationName() {
    return cy.get('[data-testid=organizationNameInput]');
  }

  getOrganizationType() {
    return cy.get('[data-testid=industryTypeSelect]');
  }

  getOrganizationSize() {
    return cy.get('[data-testid=organizationSizeSelect]');
  }

  getOrganizationWebsite() {
    return cy.get('[data-testid=websiteInput]');
  }

  getOrganizationLanguage() {
    return cy.get('[data-testid=languageSelect]');
  }

  getCancelButton() {
    return cy.get('[data-testid=cancelButton]');
  }

  getSaveButton() {
    return cy.get('[data-testid=saveButton]');
  }

  getErrorMessage() {
    return cy.get('[data-testid=input-hint]');
  }

  getOrganizationError() {
    return cy.get('[data-testid=input-hint]');
  }
  // Actions

  clickOrganizationDetailsCloseButton() {
    this.getOrganizationDetailsCloseButton().click();
  }

  clickOrganizationDetailsCancelButton() {
    this.getCancelButton().click();
  }

  clickOrganizationDetailsSaveButton() {
    this.getSaveButton().click();
  }
}
