/// <reference types="cypress" />

export class EditUserPasswordPage {
  // Locators
  getEditUserPasswordHeading() {
    return cy.get('[data-testid=edit-password]');
  }

  getClosePasswordButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getPassword() {
    return cy.get('input[type=password]');
  }

  getCancelButton() {
    return cy.get('[data-testid=edit-password-cancel-button]');
  }

  getUpdateEmailButton() {
    return cy.get('[data-testid=edit-password-update-button]');
  }

  clickCancelButton() {
    return this.getCancelButton().click();
  }

  clickUpdatePasswordButton() {
    return this.getUpdateEmailButton().click();
  }

  clickClosePasswordButton() {
    return this.getClosePasswordButton().click();
  }
}
