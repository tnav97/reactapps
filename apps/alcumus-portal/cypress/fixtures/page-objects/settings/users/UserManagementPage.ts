/// <reference types="cypress" />

export class UserManagementPage {
  // Navigation Command
  visit() {
    cy.visit('/admin/settings/users');
  }

  // Locators

  getPageHeading() {
    return cy.get('[data-testid=greeting] h4');
  }

  getUserCount() {
    return cy.get('[data-testid=greeting] h6');
  }

  getAddUserButton() {
    return cy.get('[data-testid=greeting] > div > .MuiButtonBase-root').eq(1);
  }

  getInvitedUsersButton() {
    return cy.get('[data-testid=greeting] > div > .MuiButtonBase-root').eq(0);
  }

  getSearchUserInput() {
    return cy.get('main input').eq(0);
  }

  getPermissionList() {
    return cy.get('[data-testid=baseSelect] div');
  }

  getStatusList() {
    return cy.get('[data-testid=memberStatusFilter]');
  }

  // Actions

  clickAddUserButton() {
    this.getAddUserButton().click();
  }

  clickInviteUsersButton() {
    this.getInvitedUsersButton().click();
  }

  inputNewUser(userGuid, password) {
    cy.get('[data-testid=firstName]').type('User');
    cy.get('[data-testid=lastName]').type(userGuid);
    cy.get('[data-testid=email]').type(`user.${userGuid}@test.foo`);
    cy.get('[data-testid=phoneNumber]').type('+12223334444');
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=confirmPassword]').type(password);
  }

  selectRole(role) {
    cy.get('[data-testid=baseSelect]').click();
    cy.get('[data-value=' + role + ']').click();
  }

  clickSaveButton() {
    cy.get('button > span')
      .contains(/^Save$/)
      .click();
  }

  clickSaveAndAddNewButton() {
    cy.get('button > span')
      .contains(/^Save & add new$/)
      .click();
  }

  clickCloseButton() {
    cy.get('[data-testid=icon-close]').click();
  }
}
