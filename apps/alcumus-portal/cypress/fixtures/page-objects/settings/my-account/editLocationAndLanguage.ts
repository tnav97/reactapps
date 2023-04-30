/// <reference types="cypress" />

export class EditLocationAndLanguagePage {
  // Locators
  getPopupHeading() {
    return cy.get('div > h4').eq(5);
  }

  getCloseButton() {
    return cy.get('[data-testid=icon-close]').eq(1);
  }

  getCountryList() {
    return cy.get('[data-testid=preferredCountry]');
  }

  getLanguageList() {
    return cy.get('[data-testid=preferredLanguage]');
  }

  getTimezoneList() {
    return cy.get('[data-testid=preferredTimezone]');
  }

  getCancelButton() {
    return cy.get('[data-testid=cancelEditLocaleButton]');
  }

  getUpdateButton() {
    return cy.get('[data-testid=updateLocaleButton]');
  }

  // Actions

  clickCountryList() {
    return cy.get('ul[role=listbox] li span').eq(0).click();
  }

  clickLanguageList() {
    return cy.get('[data-value="en"]').click();
  }

  clickTimezoneList() {
    return cy.get('[data-value="Europe/London"]').click();
  }

  clickUpdateButton() {
    this.getUpdateButton().click();
  }

  clickCancelButton() {
    this.getCancelButton().click();
  }

  clickCloseButton() {
    this.getCloseButton().click();
  }
}
