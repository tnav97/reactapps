/// <reference types="cypress" />

import { FakeUser } from '../../resources/setUpFakeUser';

export enum Splits {
  withoutSteps = 'withoutSteps',
  withSteps = 'withSteps',
}

export default class RegistrationPage {
  visit(design: Splits = Splits.withoutSteps) {
    cy.visit(`/?forceDesign=${design}`);
  }

  clickNextBtn() {
    cy.get('[data-testid="next"]').click();
  }

  clickPreviousBtn() {
    cy.get('[data-testid="previous"]').click();
  }

  clickLoginBtn() {
    cy.get('[data-testid="loginBtn"]').click();
  }

  clickTerms() {
    cy.get('[data-testid="terms"]').click();
  }

  setFirstName(value: string) {
    cy.get('[data-testid="firstName"]').type(value);
  }

  setLastName(value: string) {
    cy.get('[data-testid="lastName"]').type(value);
  }

  setEnrollmentDate(value: string) {
    cy.get('[data-testid="enrollmentDate"]').type(value, { force: true });
  }

  setCompanyName(value: string) {
    cy.get('[data-testid="companyName"]').type(value);
  }

  setEmail(value: string) {
    cy.get('[data-testid="email"]').type(value);
  }

  setPassword(value: string) {
    cy.get('[data-testid="password"]').type(value);
  }

  submitForm() {
    cy.get('[data-testid="createAccount"]').click();
  }

  getPrivacyPolicyLink() {
    return cy.get('[data-testid="Privacy-Link"]');
  }

  getToSLink() {
    return cy.get('[data-testid="ToS-Link"]');
  }

  completeRegistration(fakeUser: FakeUser) {
    cy.contains('Start your free 14-day trial today!');
    this.setFirstName(fakeUser.firstName);
    this.setLastName(fakeUser.lastName);
    this.setEnrollmentDate(fakeUser.enrollmentDate);
    this.setCompanyName(new Date().getTime().toString());
    this.setEmail(fakeUser.email);
    this.setPassword(fakeUser.password);
    this.clickTerms();
    this.submitForm();
  }
}
