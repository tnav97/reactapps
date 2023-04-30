/// <reference types="cypress" />
import { BasePage } from './basePage';

export class ReportsPage extends BasePage {
  // Getters
  // Actions
  visit() {
    return cy.visit('/reports');
  }
}
