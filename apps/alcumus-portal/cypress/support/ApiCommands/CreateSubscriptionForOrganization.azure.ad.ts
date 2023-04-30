/// <reference types="cypress" />
import { Generators } from '../../fixtures/common/generators';
import { addYears } from 'date-fns';

function CreateSubscriptionForOrganization() {
  cy.fixture('organization/Organization_Details.json').as(
    'apiOrgnaizationDetails'
  );
  cy.get('@apiOrgnaizationDetails').then((val: any) => {
    cy.fixture('alcumusAdmintoken.json').as('apiToken');
    cy.get('@apiToken').then((val1: any) => {
      cy.request({
        method: 'GET',
        url:
          Cypress.env('SERVICES_BASE_URL') + '/subscriptions/api/v1/products',
        headers: {
          Authorization: 'Bearer ' + val1.token,
          'Content-Type': 'application/json',
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        cy.request({
          method: 'POST',
          url:
            Cypress.env('SERVICES_BASE_URL') +
            '/subscriptions/api/v1/subscriptions',
          headers: {
            Authorization: 'Bearer ' + val1.token,
            'Content-Type': 'application/json',
            'x-api-client-app': 'alcumus-portal',
          },
          body: {
            organizationId: val.id,
            applicationId: resp.body[0].applicationId,
            seats: 20,
            startDate: new Date(),
            endDate: addYears(new Date(), 1),
          },
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          cy.writeFile(
            'cypress/fixtures/organization/org_subscription.json',
            ''
          );
          cy.writeFile('cypress/fixtures/organization/org_subscription.json', {
            data: resp.body,
          });
          cy.fixture('organization/Organization_Details.json').as(
            'orgClientAdminUser'
          );
          cy.get('@orgClientAdminUser').then((clientAdmin: any) => {
            const subscription = resp.body;
            cy.request({
              method: 'GET',
              url:
                Cypress.env('SERVICES_BASE_URL') +
                `/users/api/v1/users/${clientAdmin.userId}/organizations/${clientAdmin.id}`,
              headers: {
                'x-api-key': Cypress.env('API_KEY'),
                'Content-Type': 'application/json',
              },
            }).then((resp) => {
              const userMembership = resp.body;
              cy.writeFile('cypress/fixtures/users/org_user_membership.json', {
                data: resp.body,
              });
              cy.request({
                method: 'POST',
                url:
                  Cypress.env('SERVICES_BASE_URL') +
                  `/subscriptions/api/v1/members/${userMembership.alcumusUserId}/applications`,
                headers: {
                  Authorization: 'Bearer ' + val1.token,
                  'Content-Type': 'application/json',
                  'x-api-client-app': 'alcumus-portal',
                },
                body: {
                  applicationIds: [subscription.application.applicationId],
                },
              }).then((resp) => {
                cy.writeFile(
                  'cypress/fixtures/subscriptions/org_user_subscription.json',
                  ''
                );
                cy.writeFile(
                  'cypress/fixtures/subscriptions/org_user_subscription.json',
                  { data: resp.body }
                );
              });
            });
          });
        });
      });
    });
  });
}

Cypress.Commands.add(
  'CreateSubscriptionForOrganization',
  CreateSubscriptionForOrganization
);
