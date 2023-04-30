/// <reference types="cypress" />

export class MyAccountPage {
  visit() {
    cy.visit('/settings/my-account');
  }

  // Locators

  getPageheading() {
    return cy.get('[data-testid=my-account]');
  }

  // User Profile
  getSubHeading1() {
    return cy.get('[data-testid=header]').eq(0);
  }

  getEditUserProfileButton() {
    return cy.get('[data-testid=EditUserProfileButton]');
  }

  getInformationHeader1() {
    return cy.get('[data-testid=subHeader]').eq(0);
  }

  getUserImage() {
    return cy.get('img.MuiAvatar-img');
  }

  getFirstNameHeading() {
    return cy.get('.jss198 small');
  }

  getFirstName() {
    return cy.get('[data-testid=firstName]');
  }

  getLastNameHeading() {
    return cy.get('.jss198 div:nth-child(2) small');
  }

  getLastName() {
    return cy.get('[data-testid=lastName]');
  }

  // Actions

  clickEditProfileButton() {
    return this.getEditUserProfileButton().click();
  }

  // End of User Profile section

  // Account Details

  getSubHeading2() {
    return cy.get('[data-testid=header]').eq(1);
  }

  getInformationHeader2() {
    return cy.get('[data-testid=subHeader]').eq(1);
  }

  getEmail() {
    return cy.get('[data-testid=email]');
  }

  getEditEmailButton() {
    return cy.get('[data-testid=editEmail]');
  }

  getPassword() {
    return cy.get('[data-testid=password]');
  }

  getEditPasswordButton() {
    return cy.get('[data-testid=editPassword]');
  }

  // Actions

  ClickEditEmailButton() {
    return cy.get('[data-testid=editEmail]').click();
  }

  ClickEditPasswordButton() {
    return cy.get('[data-testid=editPassword]').click();
  }

  // end of Accound Details section

  // Location and Language

  // Location

  getSubHeading3() {
    return cy.get('[data-testid=header]').eq(2);
  }

  getInformationHeader3() {
    return cy.get('[data-testid=subHeader]').eq(2);
  }

  getCountry() {
    return cy.get('[data-testid=country');
  }

  getLanguage() {
    return cy.get('[data-testid=language]');
  }

  getTimezone() {
    return cy.get('[data-testid=timezone]');
  }

  getEditLocationButton() {
    return cy.get('[data-testid=editLocaleButton]');
  }

  // Actions

  clickEditLocaleButton() {
    cy.get('[data-testid=editLocaleButton]').click();
  }
}
