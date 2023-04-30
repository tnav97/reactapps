/// <reference types="cypress" />

export class EditContactDetailsPage {
  // Locators

  getPageHeading() {
    return cy.get('div h4').eq(4);
  }

  getContactDetailsCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getEmailAddress() {
    return cy.get('[data-testid=emailAddressInput]');
  }

  getPhoneNumber() {
    return cy.get('[data-testid=phoneNumberInput]');
  }

  getFaxNumber() {
    return cy.get('[data-testid=faxNumberInput]');
  }

  getCancelButton() {
    return cy.get('[data-testid=cancelButton]');
  }

  getSaveButton() {
    return cy.get('[data-testid=saveButton]');
  }

  getContactDetailsError() {
    return cy.get('[data-testid=input-hint]');
  }

  // Actions

  clickContactDetailsCloseButton() {
    this.getContactDetailsCloseButton().click();
  }

  clickContactDetailsCancelButton() {
    this.getCancelButton().click();
  }

  clickContactDetailsSaveButton() {
    this.getSaveButton().click();
  }
}
