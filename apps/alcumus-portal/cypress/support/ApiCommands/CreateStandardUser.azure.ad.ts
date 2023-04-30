/// <reference types="cypress" />
import { Generators } from '../../fixtures/common/generators';

function CreateStandardUser() {
  cy.fixture('organization/Organization_Details.json').as(
    'orgnaizationDetails'
  );
  cy.get('@orgnaizationDetails').then((val: any) => {
    const firstName = 'First' + Generators.numericId();
    const userEmail = firstName + '.LastName@' + val.emailDomain;
    cy.fixture('token.json').as('Token');
    cy.get('@Token').then((val1: any) => {
      cy.request({
        method: 'POST',
        url:
          Cypress.env('SERVICES_BASE_URL') +
          '/users/api/v1/organizations/' +
          val.id +
          '/users',
        headers: {
          Authorization: 'Bearer ' + val1.token,
          'Content-Type': 'application/json',
        },
        body: {
          firstName: firstName,
          lastName: 'LastName',
          roleId: 4,
          email: userEmail,
          password: 'Test1234!',
          confirmPassword: 'Test1234!',
        },
      }).then((resp) => {
        expect(resp.status).to.eq(201);
        expect(resp.body).has.property('userId');
        expect(resp.body).has.property('alcumusUserId');
        cy.writeFile('cypress/fixtures/users/Standard_User.json', ''); // clears the file before each tests
        cy.writeFile('cypress/fixtures/users/Standard_User.json', {
          userEmail: userEmail,
          password: 'Test1234!',
          firstName: firstName,
          lastName: 'LastName',
        });
      });
    });
  });
}

Cypress.Commands.add('CreateStandardUser', CreateStandardUser);
