/// <reference types="cypress" />

export class LeftHandPan {
  // Locators

  getExitSettingButton() {
    return cy.get('[data-testid=exit-settings-button]');
  }

  getUserManagementlink() {
    return cy.get('[data-testid=usersManagement]');
  }

  getUserManagementicon() {
    return cy.get('[data-testid="icon-person]');
  }

  getMyOrganizationlink() {
    return cy.get('[data-testid=myOrganization]');
  }

  // actions
  clickOnUserManagement() {
    this.getUserManagementlink().click();
  }
}
