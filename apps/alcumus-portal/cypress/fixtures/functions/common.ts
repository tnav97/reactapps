/// <reference types="cypress" />
import getPayloads from 'xss-polyglots';

export class Common {
  // constants
  XSS_PAYLOADS = getPayloads();
}
