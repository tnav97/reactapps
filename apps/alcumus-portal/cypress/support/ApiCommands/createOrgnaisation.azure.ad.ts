/// <reference types="cypress" />
import { Generators } from '../../fixtures/common/generators';

function CreateOrganization() {
  const organizationName = Generators.organizationName();
  const userEmail = Generators.email().replace(
    'example.com',
    organizationName + 'example.com'
  );
  const firstName = 'First' + Generators.numericId();

  cy.request({
    method: 'POST',
    url: Cypress.env('SERVICES_BASE_URL') + '/tenants/api/v1/organizations',
    headers: {
      'x-api-key': Cypress.env('API_KEY'),
      'Content-Type': 'application/json',
    },
    body: {
      tenantName: 'QA' + organizationName,
      tenantIdentifier: 'QA' + organizationName,
      languageCode: 'EN',
      createAccount: true,
      organizationEmailDomain: organizationName + 'example.com',
      rootEmail: userEmail,
      rootPassword: 'Alcdev012!',
      rootFirstName: firstName,
      rootLastName: 'Lastname',
    },
  }).then((resp) => {
    expect(resp.status).to.eq(201);
    expect(resp.body).has.property('userId');
    cy.writeFile('cypress/fixtures/users/Client_Admin_User.json', ''); // clears the file before each tests
    cy.writeFile('cypress/fixtures/organization/Organization_Details.json', ''); // clears the file before each tests
    cy.writeFile('cypress/fixtures/users/Client_Admin_User.json', {
      userEmail: userEmail,
      password: 'Alcdev012!',
      firstName: firstName,
      lastName: 'Lastname',
    });
    cy.writeFile('cypress/fixtures/organization/Organization_Details.json', {
      id: resp.body.id,
      tenantName: resp.body.tenantName,
      tenantIdentifier: resp.body.tenantIdentifier,
      userId: resp.body.userId,
      emailDomain: organizationName + 'example.com',
    });
  });
}

Cypress.Commands.add('CreateOrganization', CreateOrganization);
