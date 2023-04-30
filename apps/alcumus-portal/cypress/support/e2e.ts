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
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// eslint-disable-next-line import/no-extraneous-dependencies
import registerCypressGrep from 'cypress-grep';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-mochawesome-reporter/register';
import './ApiCommands/createOrgnaisation.azure.ad';
import './ApiCommands/CreateStandardUser.azure.ad';
import './ApiCommands/CreateSubscriptionForOrganization.azure.ad';
import './ApiCommands/CreateAlcumusAdminUser.azure.ad';

import { TestEnvironmentInstance } from './testEnvironment';
import { ALL_SETTINGS } from './alcumusPortalSettings';
registerCypressGrep();
export {
  describeWhen,
  describeWhenEnabled,
  describeWhenDisabled,
} from './jestWrapper';

beforeEach(() => {
  TestEnvironmentInstance.initialize('local', ALL_SETTINGS);
});
