/// <reference types="cypress" />

export class EditUserEmailPage {
  // Locators
  getEditUserEmailHeading() {
    return cy.get('[data-testid=edit-email]');
  }

  getCloseEmailButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getWorningMessage() {
    return cy.get('[data-testid=edit-email-info]');
  }

  getEmail() {
    return cy.get('input[type=email]');
  }

  getCancelButton() {
    return cy.get('[data-testid=edit-email-cancel-button]');
  }

  getUpdateEmailButton() {
    return cy.get('[data-testid=edit-email-update-button]');
  }

  // //Actions

  clickCancelButton() {
    return this.getCancelButton().click();
  }

  clickUpdateUserProfileButton() {
    return this.getUpdateEmailButton().click();
  }

  clickCloseEmailButton() {
    return this.getCloseEmailButton().click();
  }
}
