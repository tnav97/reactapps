/// <reference types="cypress" />

export class Portal {
  // Navigation Command
  visit() {
    cy.visit('/');
  }

  // Locators

  getGreeting() {
    return cy.get('[data-testid=greeting]');
  }

  getUserProfile() {
    return cy.get('[data-testid=profileImage]');
  }

  // Actions

  clickLogoutLink() {
    this.getUserProfile().click();
    cy.get('[data-testid=logoutLink]').click();
  }

  clickSettingsLink() {
    this.getUserProfile().click();
    cy.get('[data-testid=settings]').click();
  }

  clickUsersManagementLink() {
    cy.get('[data-testid=usersManagement]').click();
  }

  clickSubscriptionsLink() {
    cy.get('[data-testid=subscriptions]').click();
  }
}
