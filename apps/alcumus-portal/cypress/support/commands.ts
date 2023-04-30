/// <reference types="cypress" />
/* eslint-disable */
/// <reference path="../custom.d.ts" />
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/no-namespace
// This is required for the typescript definitions for Cypress
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {
  KeycloakLoginPage,
  AzureAdLoginPage,
} from '../fixtures/page-objects/login/loginPage';
import { Portal } from '../fixtures/page-objects/portal';
import { AzureADChangePasswordPage } from '../fixtures/page-objects/login/AzureADChangePasswordPage';
import {
  KeycloakRegisterPage,
  AzureAdRegisterPage,
} from '../fixtures/page-objects/login/registerPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-localstorage-commands';
// Login Custom Command //
// TODO: Replace with API login for hybrid tests

Cypress.Commands.add(
  'loginWithKeycloak',
  function loginWithKeycloak(username: string, password: string): void {
    const keycloakLoginPage = new KeycloakLoginPage();
    const portal = new Portal();
    keycloakLoginPage.visit();
    keycloakLoginPage.enterEmail(username);
    keycloakLoginPage.clickNextButton();
    keycloakLoginPage.enterPassword(password);
    keycloakLoginPage.clickLoginButton();
    // stops the next command from being run too early
    portal.getUserProfile();
  }
);

Cypress.Commands.add(
  'loginWithAzureAd',
  (username: string, password: string) => {
    const azureAdLoginPage = new AzureAdLoginPage();
    const portal = new Portal();
    azureAdLoginPage.visit();
    azureAdLoginPage.enterEmail(username);
    azureAdLoginPage.enterPassword(password);
    azureAdLoginPage.clickSignInButton();
    portal.getGreeting().should('exist');
    portal.getUserProfile().should('be.visible');
  }
);

// New user changed password
Cypress.Commands.add(
  'newUserLoginChangePassword',
  (username: string, password: string, newPassword: string): void => {
    const azureAdLoginPage = new AzureAdLoginPage();
    const azureADChangePasswordPage = new AzureADChangePasswordPage();
    const portal = new Portal();
    azureAdLoginPage.visit();
    azureAdLoginPage.enterEmail(username);
    azureAdLoginPage.enterPassword(password);
    azureAdLoginPage.clickSignInButton();
    azureADChangePasswordPage.getSignInHeader();
    azureADChangePasswordPage.enterPassword(newPassword);
    azureADChangePasswordPage.enterConfirmPassword(newPassword);
    azureADChangePasswordPage.submitFormAD();
    portal.getGreeting().should('exist');
    portal.getUserProfile().should('be.visible');
  }
);

// Register Custom Commands //

Cypress.Commands.add(
  'registerWithKeycloak',
  (userGuid: string, password: string): void => {
    const keycloakRegisterPage = new KeycloakRegisterPage();
    const portal = new Portal();
    keycloakRegisterPage.visit();
    keycloakRegisterPage.enterFirstName('User');
    keycloakRegisterPage.enterLastName(userGuid);
    keycloakRegisterPage.enterEmail(`user.${userGuid}@test.foo`);
    keycloakRegisterPage.enterUsername(`user${userGuid}`);
    keycloakRegisterPage.enterPassword(password);
    keycloakRegisterPage.enterConfirmPassword(password);
    keycloakRegisterPage.submitForm();

    portal.getGreeting().should('exist');
    portal.clickLogoutLink();
  }
);

Cypress.Commands.add(
  'registerWithAzureAd',
  (userGuid: string, password: string): void => {
    const azureAdLoginPage = new AzureAdLoginPage();
    const azureAdRegisterPage = new AzureAdRegisterPage();
    const portal = new Portal();

    azureAdLoginPage.visit();
    azureAdLoginPage.clickSignUpLink();
    cy.get('#givenName');

    azureAdRegisterPage.enterFirstName('User');
    azureAdRegisterPage.enterLastName(userGuid);
    azureAdRegisterPage.enterEmail(`user.${userGuid}@test.foo`);
    azureAdRegisterPage.enterPassword(password);
    azureAdRegisterPage.enterConfirmPassword(password);
    azureAdRegisterPage.submitForm();
    portal.getGreeting().should('exist');
  }
);
