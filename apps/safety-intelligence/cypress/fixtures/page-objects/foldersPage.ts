/// <reference types="cypress" />
import { BasePage } from './basePage';

export class FoldersPage extends BasePage {
  // Getters
  getFolderTable() {
    return cy.get('[data-testid="recordTable"]');
  }

  // Actions
  clickCreateNew() {
    return cy.get('[data-testid="createNewButton"]').click();
  }

  clickCreateDashboard() {
    this.clickCreateNew();
    return cy.get('[data-testid="createDashboard"]').click();
  }

  clickCreateLook() {
    this.clickCreateNew();
    return cy.get('[data-testid="createLook"]').click();
  }

  clickCreateFolder() {
    this.clickCreateNew();
    return cy.get('[data-testid="createFolder"]').click();
  }
}
