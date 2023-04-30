import { describeWhenEnabled } from '../../support/e2e';

describeWhenEnabled(
  'Alcumus Integration Service - My Endpoints',
  'FEATURE_TOGGLE_USE_AZURE_AD',
  () => {
    describe('portal-integration | my endpoints', () => {
      it('my/account', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/account',
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200);
            cy.fixture('users/Client_Admin_User.json').as('clientAdmin');
            cy.get('@clientAdmin').then((user: any) => {
              expect(resp.body).has.property('firstName', user.firstName);
              expect(resp.body).has.property('lastName', user.lastName);
              expect(resp.body).has.property('isEnabled', true);
              expect(resp.body).has.property(
                'userAccountType',
                'ORGANIZATION_ACCOUNT'
              );
              expect(resp.body).has.property('username', user.userEmail);
              expect(resp.body).has.property('loginAccountId');
              expect(resp.body).has.property('loginObjectId');
              expect(resp.body).has.property('authProviderName');
              expect(resp.body).has.property(
                'loginAccountPrimaryOrganizationId'
              );
            });
          });
        });
      });

      it('my/account - Invalid endpoint', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/account1',
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

      it('my/account - Invalid endpoint 2', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my1/account',
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

      it('my/account - unauthorized', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/account',
            failOnStatusCode: false,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(401);
          });
        });
      });

      it('my/memberships', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/memberships',
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200);
            cy.fixture('users/Client_Admin_User.json').as('clientAdmin');
            cy.get('@clientAdmin').then((user: any) => {
              expect(resp.body.length).to.equal(1);
              cy.fixture('subscriptions/org_user_subscription.json').as(
                'userSubscription'
              );
              cy.get('@userSubscription').then((subscription: any) => {
                const result = resp.body[0];
                expect(result).has.property('isEnabled', true);
                expect(result).has.property('organizationId');
                expect(result).has.property('organizationMemberId');
                expect(result).has.property('role');
                const role = result.role;
                expect(role).has.property('roleLookupKey', 'Client.Admin');
                expect(role).has.property('userId');
                expect(result).has.property('subscribedApplications');
                const subscribedApplications = result.subscribedApplications;
                expect(subscribedApplications.length).to.equal(1);
                cy.fixture('organization/org_subscription.json').as(
                  'orgSubscription'
                );
                cy.get('@orgSubscription').then((orgSubscription: any) => {
                  expect(subscribedApplications[0]).has.property(
                    'applicationLookupKey',
                    orgSubscription.data.application.applicationLookupKey
                  );
                  expect(subscribedApplications[0]).has.property(
                    'applicationId',
                    orgSubscription.data.application.applicationId
                  );
                });
              });
            });
          });
        });
      });

      it('my/memberships - Invalid endpoint 1', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/memberships1',
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

      it('my/memberships - Invalid endpoint 2', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my1/memberships',
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

      it('my/memberships - unautherized', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/memberships',
            failOnStatusCode: false,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(401);
          });
        });
      });

      it('my/licenses', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/licenses',
            headers: {
              Authorization: 'Bearer ' + val.token,
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.length).to.equal(1);
            expect(resp.body[0]).has.property('organizationId');
            expect(resp.body[0]).has.property('organizationMemberId');
            expect(resp.body[0]).has.property('subscriptionId');
            expect(resp.body[0]).has.property('organizationMemberId');
            expect(resp.body[0].applications[0]).has.property('applicationId');
            expect(resp.body[0].applications[0]).has.property(
              'applicationLookupKey'
            );
            expect(resp.body[0].applications[0]).has.property(
              'applicationName'
            );
          });
        });
      });

      it('my/licenses - invalid endpoint 1', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/licenses1',
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

      it('my/licenses - invalid endpoint 2', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my1/licenses',
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

      it('my/licenses - unauthorized', () => {
        cy.fixture('token.json').as('userToken');
        cy.get('@userToken').then((val: any) => {
          cy.request({
            method: 'GET',
            url:
              Cypress.env('SERVICES_BASE_URL') +
              '/portal-integration/api/v1/my/licenses',
            failOnStatusCode: false,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((resp) => {
            expect(resp.status).to.eq(401);
          });
        });
      });
    });
  }
);
