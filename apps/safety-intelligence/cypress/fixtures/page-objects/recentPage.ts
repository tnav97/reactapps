import { BasePage } from './basePage';

export class RecentPage extends BasePage {
  // Getters
  // Actions
  visit() {
    return cy.visit('/recent');
  }
}
