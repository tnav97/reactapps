/// <reference types="cypress" />

export class InviteUserPage {
  // Navigation Command
  visit() {
    cy.visit('/admin/settings/users');
  }

  // Locators

  getPageHeading() {
    return cy.get('[data-testid=invite-user-modal-title]');
  }

  getCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getUserInfo() {
    return cy.get('div small');
  }

  getEmailText() {
    return cy.get('[data-testid=email]');
  }

  getRole() {
    return cy.get('[data-testid=roles]');
  }

  getRoleList() {
    return cy.get('ul[role=listbox]');
  }

  getApplicationAccess() {
    return cy.get('[data-testid=application-access]');
  }

  getAddAnotherUser() {
    return cy.get('[data-testid=add-another-user-button]');
  }

  getAddAnotherUserIcon() {
    return cy.get('[data-testid=icon-add]').eq(0);
  }

  getCancelButton() {
    return cy.get('[data-testid=inviteModalCancelButton]');
  }

  getSendInviteButton() {
    return cy.get('[data-testid=sendInviteButton]');
  }

  getEmailErrorMessage() {
    return cy.get('[data-testid=input-hint]');
  }

  getDiscardChangesHeader() {
    return cy.get('[data-testid=header-text]');
  }

  getDiscardChangesCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(2);
  }

  getDiscardChangesMessage() {
    return cy.get('[data-testid=message]');
  }

  getDiscardChangesCancelButton() {
    return cy.get('[data-testid=cancel-button]');
  }

  getDiscardChangesDiscardButton() {
    return cy.get('[data-testid=confirm-button]');
  }

  getDeleteButton() {
    return cy.get('[data-testid=icon-delete]');
  }

  // Actions

  clickCloseButton() {
    this.getCloseButton().click();
  }

  clickCancelButton() {
    this.getCancelButton().click();
  }

  clickAddAnotherUserButton() {
    this.getAddAnotherUser().click();
  }

  clickDeleteUserButton() {
    this.getDeleteButton().click();
  }

  clickDiscardChangesCloseButton() {
    this.getDiscardChangesCloseButton().click();
  }

  clickDiscardChangesCancelButton() {
    this.getDiscardChangesCancelButton().click();
  }

  clickDiscardChangesDiscardButton() {
    this.getDiscardChangesDiscardButton().click();
  }
}
