// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration

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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Overwrites the visit command to add the _disableAnalytics query param to each request
 * which disables mixpanel tracking
 */

import { EmailHelper } from '../resources/emails/emailHelper';
import Login from '../pages/ecms/login/login';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      downloadMailHogEmail: typeof EmailHelper.downloadEmail;
      deleteAllMailHogMessages: typeof EmailHelper.deleteAllMailHogMessages;
      loginToECMS: typeof Login.toECMS;
      containsAll: typeof containsAll;
      excludesAll: typeof excludesAll;
    }
  }
}

const containsAll = (content: string[]): void => {
  content.forEach((contentItem) => cy.contains(contentItem));
};

const excludesAll = (content: string[]): void => {
  content.forEach((contentItem) =>
    cy.contains(contentItem).should('not.exist')
  );
};

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  return originalFn(url, {
    ...options,
    qs: { _disableAnalytics: true, ...options.qs },
  });
});

Cypress.Commands.add('downloadMailHogEmail', EmailHelper.downloadEmail);
Cypress.Commands.add('containsAll', containsAll);
Cypress.Commands.add('excludesAll', excludesAll);

Cypress.Commands.add(
  'deleteAllMailHogMessages',
  EmailHelper.deleteAllMailHogMessages
);

Cypress.Commands.add('loginToECMS', Login.toECMS);
