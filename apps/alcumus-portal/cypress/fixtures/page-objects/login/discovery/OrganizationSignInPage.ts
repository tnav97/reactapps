/// <reference types="cypress" />

export class OrganizationSignInPage {
  visit() {
    cy.visit('login/discovery');
  }

  getPageHeading() {
    return cy.get('div h4');
  }

  getOrganizationDomainInput() {
    return cy.get('[data-testid=domainInput]');
  }

  getAdornmentInput() {
    return cy.get('[data-testid=input-adornment]');
  }

  getRememberMeInput() {
    return cy.get('span.MuiIconButton-label > input');
  }

  getRememberMeText() {
    return cy.get('[data-testid=rememberMyDomain]');
  }

  getContinueButton() {
    return cy.get('[data-testid=nextButton]');
  }

  getLogInButton() {
    return cy.get('[data-testid=loginWithEmailAndPassword]');
  }

  getTermsAndCondition() {
    return cy.get('a[target=_blank]').eq(0);
  }

  getPrivacyPolicy() {
    return cy.get('a[target=_blank]').eq(1);
  }

  getDomainErrorMessage() {
    return cy.get('[data-testid=domainErrorMessage]');
  }

  // Actions

  clickContinueButton() {
    this.getContinueButton().click();
  }

  clickLoginWithEmailAndPasswordButton() {
    this.getLogInButton().click();
  }
}
