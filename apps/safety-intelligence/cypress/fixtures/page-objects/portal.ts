/// <reference types="cypress" />

export class Portal {
  // Navigation Command
  visit() {
    cy.visit('/');
  }

  // Getters
  getGreeting() {
    return cy.get('[data-testid=greeting]');
  }

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
