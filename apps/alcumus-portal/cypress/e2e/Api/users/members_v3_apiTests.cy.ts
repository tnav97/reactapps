import { describeWhenEnabled } from '../../../support/e2e';
import organizationDetails from '../../../fixtures/organization/Organization_Details.json';

const endpoint = '/users/api/v3/members';
const organizationId = organizationDetails.id;
const orgid = organizationId.toString();
describeWhenEnabled(
  'Alcumus users Service - Members',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('users| members', () => {
      it('v3/members - Invalid endpoint', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url: Cypress.env('SERVICES_BASE_URL') + '/users/api/v3/member',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(404);
          });
        });
      });

      it('v3/members - Invalid endpoint 2', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url: Cypress.env('SERVICES_BASE_URL') + '/users/api/v4/members',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(404);
          });
        });
      });

      it('v3/members - unauthorized', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url: Cypress.env('SERVICES_BASE_URL') + endpoint,
            failOnStatusCode: false,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(401);
          });
        });
      });

      it('v3/members - only Organiztion id', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              endpoint +
              '?filter[organizationId]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).has.property(
              'message',
              "request/query/page must have required property 'number', request/query/page must have required property 'size'"
            );
          });
        });
      });

      it('v3/members - only page size', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url: Cypress.env('SERVICES_BASE_URL') + endpoint + '?page[size]=4',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(40);
            expect(resp.body).has.property(
              'message',
              "request/query/filter must have required property 'organizationId', request/query/page must have required property 'number'"
            );
          });
        });
      });

      it('v3/members - only page number', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') + endpoint + '?page[number]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).has.property(
              'message',
              "request/query/filter must have required property 'organizationId', request/query/page must have required property 'size'"
            );
          });
        });
      });

      it('v3/members - only page number and organization id', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              endpoint +
              '?filter[organizationId]=1&page[number]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).has.property(
              'message',
              "request/query/page must have required property 'size'"
            );
          });
        });
      });

      it('v3/members - only page number and page size', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              endpoint +
              '?page[size]=4&page[number]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(400);
            expect(resp.body).has.property(
              'message',
              "request/query/filter must have required property 'organizationId'"
            );
          });
        });
      });

      it('v3/members - with mandatory parameters', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              endpoint +
              '?filter[organizationId]=' +
              orgid +
              '&page[size]=4&page[number]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200);
          });
        });
      });

      it('v3/members - Validate meta element', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              endpoint +
              '?filter[organizationId]=' +
              orgid +
              '&page[size]=4&page[number]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).has.property('meta');
            expect(resp.body.meta).has.property('totalPages');
            expect(resp.body.meta).has.property('totalElements');
            expect(resp.body).has.property('data');
            expect(resp.body).has.property('links');
          });
        });
      });

      it('v3/members - Validate link element', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              endpoint +
              '?filter[organizationId]=' +
              orgid +
              '&page[size]=4&page[number]=1',
            failOnStatusCode: false,
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).has.property('links');
            expect(resp.body.links).has.property('prev', null);
            expect(resp.body.links).has.property('self');
            expect(resp.body.links).has.property('first');
            expect(resp.body.links).has.property('next');
            expect(resp.body.links).has.property('last');
          });
        });
      });
    });
  }
);
