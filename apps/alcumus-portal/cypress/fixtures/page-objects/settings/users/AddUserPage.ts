/// <reference types="cypress" />

export class AddUserPage {
  // Navigation Command
  visit() {
    cy.visit('/admin/settings/users');
  }

  // Locators

  getPageHeading() {
    return cy.get('[data-testid=add-user-modal-title]');
  }

  getFirstName() {
    return cy.get('[data-testid=firstName]');
  }

  getLastName() {
    return cy.get('[data-testid=lastName]');
  }

  getEmail() {
    return cy.get('[data-testid=email]');
  }

  getPhoneNumber() {
    return cy.get('[data-testid=phoneNumber]');
  }

  getPhoneHint() {
    return cy.get('[data-testid=input-hint]').eq(1);
  }

  getEmailHint() {
    return cy.get('[data-testid=input-hint]');
  }

  getRole() {
    return cy.get('[data-testid=baseSelect]').eq(1);
  }

  getRoleList() {
    return cy.get('ul[role=listbox]');
  }

  getApplicationAccess() {
    return cy.get('[data-testid=applicationAccess]');
  }

  getSendInviteHint() {
    return cy.get('[data-testid=sendInvite] +span');
  }

  getSendInviteCheckBox() {
    return cy.get('[data-testid=sendInvite] input');
  }

  getAddUserProcessHint() {
    return cy.get('div h6').eq(1);
  }

  getCancelButton() {
    return cy.get('[datatestid=add-user-cancel-button]');
  }

  getSaveButton() {
    return cy.get('[datatestid=add-user-save-button]');
  }

  getSaveAndAddNewButton() {
    return cy.get('[datatestid=add-user-and-new-save-button]');
  }

  getCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  // Actions

  clickCloseButton() {
    this.getCloseButton().click();
  }

  clickCancelButton() {
    this.getCancelButton().click();
  }

  clickSaveButton() {
    this.getSaveButton().click();
  }

  clickSaveAndAddNewButton() {
    this.getSaveAndAddNewButton().click();
  }

  clickSendInviteCheckbox() {
    this.getSendInviteCheckBox().click();
  }
}
