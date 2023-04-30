/// <reference types="cypress" />

export class EditUserInfoPage {
  // Locators
  getEditUserProfileHeading() {
    return cy.get('[data-testid=edit-user-profile-modal]');
  }

  getEditUserProfileImage() {
    return cy.get('[data-testid=avatar] img');
  }

  getFirstName() {
    return cy.get('[data-testid=firstNameInput]');
  }

  getLastName() {
    return cy.get('[data-testid=lastNameInput]');
  }

  getCancelButton() {
    return cy.get('[data-testid=cancelButton]');
  }

  getUpdateUserProfileButton() {
    return cy.get('[data-testid=updateProfileButton]');
  }

  getCloseUserProfileButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  // Actions

  clickCancelButton() {
    return this.getCancelButton().click();
  }

  clickUpdateUserProfileButton() {
    return this.getUpdateUserProfileButton().click();
  }

  clickCloseUserProfileButton() {
    return this.getCloseUserProfileButton().click();
  }

  enterFirstName(firstName: string) {
    return this.getFirstName().clear().type(firstName);
  }

  enterLastName(lastName: string) {
    return this.getLastName().clear().type(lastName);
  }
}
