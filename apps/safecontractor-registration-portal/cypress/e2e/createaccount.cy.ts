/// <reference types='cypress' />

import { EnterCreateAccount } from '../../cypress/functions/registerFunctions.cy';

describe('create-account-form-submittion', () => {
  EnterCreateAccount();

  it('Verify the response for invalid inputs', () => {
    const invalidemail = 'test.mail';
    const invalidpassword = 'pass123';
    cy.go('back');
    cy.get('[data-testid=email]').clear().type(invalidemail);
    cy.get('[data-testid=emailError]')
      .should('be.visible')
      .contains('Invalid email address');
    cy.get('[data-testid=passwordInput]').clear().type(invalidpassword);
    cy.get('[data-testid=passwordInputError]')
      .should('be.visible')
      .contains(
        'Password must be over 7 characters and contain all of the following: upper case, lower case, numbers and special characters'
      );
    cy.get('[data-testid=createAccount]').should('be.disabled');
  });
});
