/// <reference types="cypress" />
import { BasePage } from './basePage';

export class PopularPage extends BasePage {
  // Getters
  // Actions
  visit() {
    return cy.visit('/popular');
  }
}
