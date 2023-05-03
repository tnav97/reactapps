/// <reference types="cypress" />

import { EnterCreateAccount } from '../fixtures/functions/registerFunctions.cy';

describe('create-account-form-submittion', () => {
  EnterCreateAccount();

  it('Verify the response for invalid inputs', () => {
    cy.fixture('users.json').then((newuser) => {
      const invalidemail = 'test.mail';
      const invalidpassword = 'alcumus123';
      cy.visit('/');
      cy.get("[data-testid='getStartedButton']").click();
      cy.get("[data-testid='firstNameInput']").clear().type(newuser.fname);
      cy.get("[data-testid='lastNameInput']").clear().type(newuser.lname);
      cy.get("[data-testid='email']").clear().type(invalidemail);
      cy.get("[data-testid='emailError']").should('be.visible');
      cy.get("[data-testid='passwordInput']").clear().type(invalidpassword);
      cy.get("[data-testid='passwordInputError']").should('be.visible');
      cy.get("[data-testid='createAccount']").should('be.disabled');
    });
  });
});
