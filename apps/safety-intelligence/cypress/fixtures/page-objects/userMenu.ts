/// <reference types="cypress" />

export class UserMenu {
  // Getters
  getUserProfile() {
    return cy.get('[data-testid=profileImage]');
  }

  getLogoutLink() {
    return cy.get('[data-testid=logoutLink]');
  }

  // Actions
  clickLogoutLink() {
    this.getUserProfile().click();
    this.getLogoutLink().click();
  }
}
