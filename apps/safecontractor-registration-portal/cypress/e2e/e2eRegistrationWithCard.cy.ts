/// <reference types="cypress" />

import {
  EnterCreateAccount,
  DefaultQuestionnaireValues,
  Pricing,
  DefaultCompanyDetails,
  CardPaymentSelection,
  Package,
} from '../fixtures/functions/registerFunctions.cy';

describe('Register a contractor with default values', () => {
  EnterCreateAccount();
  DefaultQuestionnaireValues();
  Package();
  Pricing();
  DefaultCompanyDetails();
  CardPaymentSelection();
});
