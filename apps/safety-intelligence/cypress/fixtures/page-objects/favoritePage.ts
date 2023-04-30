/// <reference types="cypress" />
import { BasePage } from './basePage';

export class FavoritePage extends BasePage {
  // Actions
  visit() {
    cy.visit('/favorite');
  }
}
